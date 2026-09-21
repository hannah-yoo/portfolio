import { existsSync } from "node:fs";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

// Automatically load local .env / .env.local if present
for (const envFileName of [".env.local", ".env"]) {
  const envFilePath = path.join(rootDir, envFileName);
  if (existsSync(envFilePath)) {
    try {
      process.loadEnvFile(envFilePath);
    } catch {
      // ignore parsing errors
    }
  }
}

const rawToken =
  process.env.PORTFOLIO_TOKEN ||
  process.env.AIRTABLE_API_KEY ||
  process.env.AIRTABLE_TOKEN ||
  process.env.AIRTABLE_PAT ||
  "";

const token = rawToken.trim().replace(/^["']|["']$/g, "");

const baseId = process.env.AIRTABLE_BASE_ID || "app1rO1j6Asf3Ltjp";
const tableName = process.env.AIRTABLE_TABLE_NAME || "Artworks_eng";
const outputPath = path.join(rootDir, "src", "data", "airtable-projects.json");
const cvTableName = process.env.AIRTABLE_CV_TABLE_NAME || "cv_eng";
const cvOutputPath = path.join(rootDir, "src", "data", "airtable-cv.json");
const mediaDir = path.join(rootDir, "public", "airtable-media");

const fieldAliases = {
  title: ["title", "name", "artwork", "artwork name", "project", "project name", "작품명", "제목"],
  subtitle: ["subtitle", "summary", "short description", "sub title", "부제", "한줄설명"],
  year: ["year", "date", "created", "연도", "제작연도", "날짜"],
  description: ["description", "body", "details", "note", "설명", "작품설명"],
  role: ["role", "services", "역할", "분야"],
  team: ["team", "client", "팀", "클라이언트"],
  timeline: ["timeline", "duration", "period", "기간"],
  heroImage: [
    "hero image",
    "hero",
    "cover",
    "cover image",
    "image",
    "thumbnail",
    "main image",
    "대표 이미지",
    "커버",
    "썸네일",
  ],
  images: ["images", "detail images", "gallery", "attachments", "상세 이미지", "이미지", "사진"],
  category: ["category", "type", "tag", "tags", "분류", "카테고리"],
  featured: ["featured", "highlight", "대표", "추천"],
};

const normalizeKey = (key) => key.trim().toLowerCase().replace(/[\s_\-]+/g, " ");

const slugify = (value) =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-|-$/g, "") || "untitled-project";

const findField = (fields, aliases) => {
  const fieldNames = Object.keys(fields);
  for (const alias of aliases) {
    const normAlias = normalizeKey(alias);
    const found = fieldNames.find((name) => normalizeKey(name) === normAlias);
    if (found && fields[found] !== undefined && fields[found] !== null && fields[found] !== "") {
      return fields[found];
    }
  }
  return undefined;
};

const asText = (value, fallback = "") => {
  if (Array.isArray(value)) return value.map((item) => asText(item)).filter(Boolean).join(", ");
  if (value && typeof value === "object") return value.name || value.url || fallback;
  return value === undefined || value === null || value === "" ? fallback : String(value);
};

const asBoolean = (value) =>
  value === true || (typeof value === "string" && value.trim().toLowerCase() === "true");

const cvFieldAliases = {
  intro: ["intro", "introduction", "about", "bio", "소개"],
  order: ["order", "sort", "순서"],
  year: ["year", "period", "연도", "기간"],
  title: ["title", "role", "position", "degree", "활동", "직함", "학위"],
  organization: ["organization", "company", "school", "client", "기관", "회사", "학교"],
  description: ["description", "details", "note", "설명", "상세"],
};

// Downloads image locally so Airtable expiring attachment URLs don't break after 2 hours
const downloadAndCacheMedia = async (url, filename) => {
  if (!url || typeof url !== "string") return "";
  // If not an airtable attachment URL, keep original
  if (!url.includes("airtableusercontent.com") && !url.includes("airtable.com")) {
    return url;
  }

  try {
    await mkdir(mediaDir, { recursive: true });
    const extMatch = url.match(/\.([a-zA-Z0-9]+)(\?|$)/);
    const ext = extMatch ? extMatch[1] : "jpg";
    const cleanFilename = `${filename}.${ext}`;
    const destinationPath = path.join(mediaDir, cleanFilename);

    const res = await fetch(url);
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      await writeFile(destinationPath, Buffer.from(buffer));
      return `airtable-media/${cleanFilename}`;
    }
  } catch (err) {
    console.warn(`[Sync] Warning: Failed to download ${filename} locally:`, err.message);
  }
  return url;
};

const extractImages = async (value, projectSlug) => {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  const processed = [];

  for (let index = 0; index < values.length; index++) {
    const item = values[index];
    const rawUrl = typeof item === "object" ? item.url : item;
    if (!rawUrl) continue;

    const imgId = `${projectSlug}-${index + 1}`;
    const cachedUrl = await downloadAndCacheMedia(rawUrl, imgId);

    processed.push({
      id: imgId,
      url: cachedUrl,
      alt: typeof item === "object" && item.filename ? item.filename : projectSlug,
      width: "full",
    });
  }

  return processed;
};

const TO_BE_INDICATED = "To be indicated";

const normalizeCvRecords = (records) => {
  let intro = "";
  const entries = [];

  records.forEach(({ id, fields }, index) => {
    const safeFields = fields || {};
    const recordIntro = asText(findField(safeFields, cvFieldAliases.intro));
    if (recordIntro && !intro) intro = recordIntro;

    const title = asText(findField(safeFields, cvFieldAliases.title));
    const organization = asText(findField(safeFields, cvFieldAliases.organization));
    const year = asText(findField(safeFields, cvFieldAliases.year));
    const description = asText(findField(safeFields, cvFieldAliases.description));
    if (title || organization || year || description) {
      entries.push({
        id: String(id || `cv-${index + 1}`),
        order: Number(findField(safeFields, cvFieldAliases.order)) || index + 1,
        year,
        title,
        organization,
        description,
      });
    }
  });

  return {
    intro,
    entries: entries.sort((first, second) => first.order - second.order),
  };
};

const normalizeRecord = async ({ id, fields }, index) => {
  const title = asText(findField(fields, fieldAliases.title), TO_BE_INDICATED);
  const slug = title !== TO_BE_INDICATED ? slugify(title) : `project-${index + 1}`;

  const heroValue = findField(fields, fieldAliases.heroImage);
  const images = await extractImages(findField(fields, fieldAliases.images), slug);

  let heroImage = "";
  if (heroValue) {
    const heroExtracted = await extractImages(heroValue, `${slug}-hero`);
    heroImage = heroExtracted[0]?.url || "";
  }
  if (!heroImage && images[0]?.url) {
    heroImage = images[0].url;
  }

  const categoryRaw = asText(findField(fields, fieldAliases.category), "").toLowerCase();
  const category =
    categoryRaw.includes("fine") || categoryRaw.includes("art") || categoryRaw.includes("일러스트")
      ? "fine-arts"
      : categoryRaw.includes("design") || categoryRaw.includes("디자인")
      ? "design"
      : "fine-arts";

  return {
    id,
    slug,
    title,
    subtitle: asText(findField(fields, fieldAliases.subtitle), TO_BE_INDICATED),
    year: asText(findField(fields, fieldAliases.year), TO_BE_INDICATED),
    description: asText(findField(fields, fieldAliases.description), TO_BE_INDICATED),
    role: asText(findField(fields, fieldAliases.role), TO_BE_INDICATED),
    team: asText(findField(fields, fieldAliases.team), TO_BE_INDICATED),
    timeline: asText(findField(fields, fieldAliases.timeline), TO_BE_INDICATED),
    heroImage,
    images,
    gridWidth: 6,
    featured: asBoolean(findField(fields, fieldAliases.featured)),
    category,
  };
};

async function syncAirtable() {
  const isCI = Boolean(process.env.CI || process.env.GITHUB_ACTIONS);
  console.log(`\n[Sync] PORTFOLIO_TOKEN status: ${token ? `Found (length: ${token.length})` : "NOT FOUND"}`);

  if (!token) {
    if (isCI) {
      console.log("::error title=Missing Airtable Token::PORTFOLIO_TOKEN is missing or empty in GitHub Actions! Please verify your Repository Secret name.");
      throw new Error(
        "❌ PORTFOLIO_TOKEN is missing in GitHub Actions! Please check repository secrets or environment secrets."
      );
    }
    console.warn("\n⚠️  [Sync] PORTFOLIO_TOKEN is not set locally.");
    console.warn("👉 Add your token to .env to fetch artworks from Airtable:");
    console.warn("   PORTFOLIO_TOKEN=patXXXXXXXXXXXXXXX.XXXXXXXXXXXXX\n");

    if (existsSync(outputPath)) {
      try {
        const existing = JSON.parse(await readFile(outputPath, "utf8"));
        if (Array.isArray(existing) && existing.length > 0) {
          console.log(`ℹ️  [Sync] Preserving ${existing.length} existing project(s) in airtable-projects.json.\n`);
          return;
        }
      } catch {}
    }

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, "[]\n");
    return;
  }

  console.log(`🔄 [Sync] Fetching from Airtable (Base: ${baseId}, Table: ${tableName})...`);
  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
  const records = [];
  let offset;

  try {
    do {
      const requestUrl = new URL(url);
      if (offset) requestUrl.searchParams.set("offset", offset);

      const response = await fetch(requestUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Airtable API error (HTTP ${response.status} ${response.statusText}): ${errorText}`);
      }

      const payload = await response.json();
      records.push(...(payload.records || []));
      offset = payload.offset;
    } while (offset);

    if (records.length === 0) {
      console.warn("⚠️  [Sync] Airtable returned 0 records. Check if the table has data.");
    } else {
      console.log(`✓ [Sync] Received ${records.length} record(s). Sample fields:`, Object.keys(records[0]?.fields || {}));
    }

    const projects = [];
    for (let i = 0; i < records.length; i++) {
      projects.push(await normalizeRecord(records[i], i));
    }

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(projects, null, 2)}\n`);
    console.log(`✅ [Sync] Successfully synced ${projects.length} project(s) to src/data/airtable-projects.json\n`);

    try {
      const cvUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(cvTableName)}`;
      const cvRecords = [];
      let cvOffset;

      do {
        const cvRequestUrl = new URL(cvUrl);
        if (cvOffset) cvRequestUrl.searchParams.set("offset", cvOffset);
        const cvResponse = await fetch(cvRequestUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!cvResponse.ok) {
          throw new Error(`Airtable CV API error (HTTP ${cvResponse.status} ${cvResponse.statusText})`);
        }
        const cvPayload = await cvResponse.json();
        cvRecords.push(...(cvPayload.records || []));
        cvOffset = cvPayload.offset;
      } while (cvOffset);

      await writeFile(cvOutputPath, `${JSON.stringify(normalizeCvRecords(cvRecords), null, 2)}\n`);
      console.log(`✅ [Sync] Successfully synced CV from ${cvTableName}\n`);
    } catch (cvError) {
      console.warn(`⚠️  [Sync] Could not sync CV table ${cvTableName}: ${cvError.message}`);
      console.warn("ℹ️  [Sync] Keeping existing airtable-cv.json.\n");
    }
  } catch (err) {
    console.error(`\n❌ [Sync] Error fetching from Airtable:`, err.message);
    if (isCI) {
      console.log(`::error title=Airtable API Failure::${err.message}`);
      throw err;
    }
    if (existsSync(outputPath)) {
      console.warn("ℹ️  [Sync] Keeping existing cached airtable-projects.json.\n");
    } else {
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, "[]\n");
    }
  }
}

await syncAirtable();
