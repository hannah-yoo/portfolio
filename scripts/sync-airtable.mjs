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
const tableName = process.env.AIRTABLE_TABLE_NAME || "collections";
const airtableViewId = process.env.AIRTABLE_VIEW_ID || "viwraXnT87X1NKzpC";
const outputPath = path.join(rootDir, "src", "data", "airtable-projects.json");
const cvTableName = process.env.AIRTABLE_CV_TABLE_NAME || "cv";
const cvOutputPath = path.join(rootDir, "src", "data", "airtable-cv.json");
const introTableName = process.env.AIRTABLE_INTRO_TABLE_NAME || "intro";

const fieldAliases = {
  title: ["title", "name", "artwork", "artwork name", "project", "project name", "작품명", "제목"],
  titleKo: ["title ko", "title korean", "korean title", "제목 한국어", "한국어 제목"],
  subtitle: ["subtitle", "summary", "short description", "sub title", "부제", "한줄설명"],
  subtitleKo: ["subtitle ko", "subtitle korean", "korean subtitle", "부제 한국어"],
  year: ["year", "project term", "date", "created", "연도", "제작연도", "날짜"],
  description: ["description", "body", "details", "note", "설명", "작품설명"],
  descriptionKo: ["description ko", "description korean", "korean description", "설명 한국어"],
  topDescription: ["top description"],
  topDescriptionKo: ["top description ko", "top description korean"],
  middleDescription: ["middle description"],
  middleDescriptionKo: ["middle description ko", "middle description korean"],
  middleDescriptionAfterImage: ["middle description after image"],
  bottomDescription: ["bottom description"],
  bottomDescriptionKo: ["bottom description ko", "bottom description korean"],
  bottomDescriptionAfterImage: ["bottom description after image"],
  topDescriptionAfterImage: ["top description after image"],
  role: ["role", "services", "역할", "분야"],
  roleKo: ["role ko", "role korean", "korean role", "역할 한국어"],
  team: ["team", "client", "팀", "클라이언트"],
  teamKo: ["team ko", "team korean", "korean team", "client ko", "클라이언트 한국어"],
  timeline: ["timeline", "duration", "period", "기간"],
  timelineKo: ["timeline ko", "timeline korean", "korean timeline", "기간 한국어"],
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
  images: ["images", "photos", "photo gallery", "detail images", "gallery", "attachments", "상세 이미지", "이미지", "사진"],
  category: ["category", "type", "tag", "tags", "분류", "카테고리"],
  tags: ["tags", "subcategories", "work types", "disciplines", "labels"],
  medium: ["medium", "mediums", "design disciplines", "매체"],
  mediumKo: ["medium ko", "medium korean", "korean medium", "매체 한국어"],
  featured: ["featured", "highlight", "대표", "추천"],
  externalUrl: ["url", "link", "external url", "project url", "article url", "링크"],
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
  if (value && typeof value === "object") return value.name || value.text || value.url || fallback;
  return value === undefined || value === null || value === "" ? fallback : String(value);
};

const asBoolean = (value) =>
  value === true || (typeof value === "string" && value.trim().toLowerCase() === "true");

const asImagePosition = (value) => {
  if (value === undefined || value === null || String(value).trim() === "") return undefined;
  const position = Number(value);
  return Number.isInteger(position) && position >= 0 ? position : undefined;
};

const cvFieldAliases = {
  intro: ["intro", "introduction", "about", "bio", "소개"],
  introKo: ["intro ko", "intro korean", "korean intro", "소개 한국어"],
  postscript: ["postscript", "ps", "post script"],
  postscriptKo: ["postscript ko", "postscript korean", "korean postscript", "추가 소개 한국어"],
  order: ["order", "sort", "순서"],
  year: ["year", "period", "연도", "기간"],
  title: ["title", "project", "role", "position", "degree", "활동", "직함", "학위"],
  titleKo: ["title ko", "project ko", "title korean", "korean title", "직함 한국어", "활동 한국어"],
  organization: ["organization", "company", "school", "client", "기관", "회사", "학교"],
  organizationKo: ["organization ko", "organization korean", "korean organization", "기관 한국어"],
  description: ["description", "details", "note", "설명", "상세"],
  descriptionKo: ["description ko", "description korean", "korean description", "설명 한국어"],
};

const extractImages = (value, projectSlug, groupId) => {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  const processed = [];

  for (let index = 0; index < values.length; index++) {
    const item = values[index];
    const rawUrl = typeof item === "object" ? item.url : item;
    if (!rawUrl) continue;

    const imgId = `${groupId || projectSlug}-${index + 1}`;

    processed.push({
      id: imgId,
      url: rawUrl,
      thumbnailUrl:
        typeof item === "object" && item.thumbnails?.full?.url
          ? item.thumbnails.full.url
          : rawUrl,
      alt: typeof item === "object" && item.filename ? item.filename : projectSlug,
      width: item.layoutWidth || "full",
      groupId,
      layout: item.layout || "single",
    });
  }

  return processed;
};

const TO_BE_INDICATED = "To be indicated";

const normalizeCvRecords = (records) => {
  let intro = "";
  let introKo = "";
  let postscript = "";
  let postscriptKo = "";
  const entries = [];

  records.forEach(({ id, fields }, index) => {
    const safeFields = fields || {};
    const recordIntro = asText(findField(safeFields, cvFieldAliases.intro));
    if (recordIntro && !intro) intro = recordIntro;
    const recordIntroKo = asText(findField(safeFields, cvFieldAliases.introKo));
    if (recordIntroKo && !introKo) introKo = recordIntroKo;
    const recordPostscript = asText(findField(safeFields, cvFieldAliases.postscript));
    if (recordPostscript && !postscript) postscript = recordPostscript;
    const recordPostscriptKo = asText(findField(safeFields, cvFieldAliases.postscriptKo));
    if (recordPostscriptKo && !postscriptKo) postscriptKo = recordPostscriptKo;

    const title = asText(findField(safeFields, cvFieldAliases.title));
    const titleKo = asText(findField(safeFields, cvFieldAliases.titleKo));
    const organization = asText(findField(safeFields, cvFieldAliases.organization));
    const organizationKo = asText(findField(safeFields, cvFieldAliases.organizationKo));
    const year = asText(findField(safeFields, cvFieldAliases.year));
    const description = asText(findField(safeFields, cvFieldAliases.description));
    const descriptionKo = asText(findField(safeFields, cvFieldAliases.descriptionKo));
    if (title || titleKo || organization || organizationKo || year || description || descriptionKo) {
      entries.push({
        id: String(id || `cv-${index + 1}`),
        order: Number(findField(safeFields, cvFieldAliases.order)) || index + 1,
        year,
        title,
        titleKo,
        organization,
        organizationKo,
        description,
        descriptionKo,
      });
    }
  });

  return {
    intro,
    introKo,
    postscript,
    postscriptKo,
    entries: entries.sort((first, second) => first.order - second.order),
  };
};

const normalizeIntroRecords = (records) => {
  let intro = "";
  let introKo = "";
  let postscript = "";
  let postscriptKo = "";

  for (const { fields = {} } of records) {
    intro ||= asText(findField(fields, cvFieldAliases.intro));
    introKo ||= asText(findField(fields, cvFieldAliases.introKo));
    postscript ||= asText(findField(fields, cvFieldAliases.postscript));
    postscriptKo ||= asText(findField(fields, cvFieldAliases.postscriptKo));
  }

  return { intro, introKo, postscript, postscriptKo };
};

const normalizeRecord = async ({ id, fields }) => {
  const title = asText(findField(fields, fieldAliases.title), TO_BE_INDICATED);
  if (title === TO_BE_INDICATED) return null;
  const slug = slugify(title);

  const heroValue = findField(fields, fieldAliases.heroImage);
  const galleryImages = findField(fields, fieldAliases.images);
  const galleryValues = Array.isArray(galleryImages)
    ? galleryImages
    : galleryImages
      ? [galleryImages]
      : [];
  const numberedImages = Object.entries(fields)
    .map(([name, value]) => ({
      match: normalizeKey(name).match(/^(?:image|photo|이미지|사진) (\d+)$/i),
      value,
    }))
    .filter(({ match }) => match && Number(match[1]) >= 2 && Number(match[1]) <= 10)
    .sort((first, second) => Number(first.match[1]) - Number(second.match[1]));
  const images = numberedImages.length
    ? numberedImages.flatMap(({ match, value }) => {
      const fieldNumber = Number(match[1]);
      const attachments = Array.isArray(value) ? value : value ? [value] : [];
      const layoutForAttachment = attachments.length === 2
        ? "pair"
        : attachments.length > 2
          ? "mosaic"
          : "single";
      return extractImages(
        attachments.map((attachment) => ({
          ...attachment,
          layoutWidth: layoutForAttachment === "pair" ? "half" : "full",
          layout:
            layoutForAttachment === "mosaic"
              ? attachment === attachments[0]
                ? "mosaic-lead"
                : "mosaic-tile"
              : "single",
        })),
        slug,
        `${slug}-${fieldNumber}`
      );
    })
    : extractImages(galleryValues, slug);

  let heroImage = "";
  let heroThumbnail = "";
  if (heroValue) {
    const heroExtracted = extractImages(heroValue, `${slug}-hero`);
    heroImage = heroExtracted[0]?.url || "";
    heroThumbnail = heroExtracted[0]?.thumbnailUrl || "";
  }
  if (!heroImage && images[0]?.url) {
    heroImage = images[0].url;
    heroThumbnail = images[0].thumbnailUrl || "";
  }

  const categoryRaw = asText(findField(fields, fieldAliases.category), "").toLowerCase();
  if (["engineering", "broadcast", "broadcasts"].includes(categoryRaw.trim())) return null;
  if (!categoryRaw.trim()) return null;
  const category =
    categoryRaw.includes("photograph") ||
    categoryRaw.includes("photo") ||
    categoryRaw.includes("video") ||
    categoryRaw.includes("사진") ||
    categoryRaw.includes("영상") ||
    categoryRaw.includes("촬영")
      ? "photography-video"
      : categoryRaw.includes("article") ||
        categoryRaw.includes("writing") ||
        categoryRaw.includes("fine art") ||
        categoryRaw.includes("fine-arts") ||
        categoryRaw.includes("미술") ||
        categoryRaw.includes("글")
      ? "fine-arts"
      : categoryRaw.includes("design") || categoryRaw.includes("디자인")
      ? "design"
      : categoryRaw.includes("fine art") || categoryRaw.includes("article") || categoryRaw.includes("writing") || categoryRaw.includes("미술") || categoryRaw.includes("글")
      ? "fine-arts"
      : null;
  if (!category) return null;

  return {
    id,
    slug,
    title,
    titleKo: asText(findField(fields, fieldAliases.titleKo)),
    subtitle: asText(findField(fields, fieldAliases.subtitle)),
    subtitleKo: asText(findField(fields, fieldAliases.subtitleKo)),
    year: asText(findField(fields, fieldAliases.year)),
    description: asText(findField(fields, fieldAliases.description)),
    descriptionKo: asText(findField(fields, fieldAliases.descriptionKo)),
    topDescription: asText(findField(fields, fieldAliases.topDescription)),
    topDescriptionKo: asText(findField(fields, fieldAliases.topDescriptionKo)),
    middleDescription: asText(findField(fields, fieldAliases.middleDescription)),
    middleDescriptionKo: asText(findField(fields, fieldAliases.middleDescriptionKo)),
    middleDescriptionAfterImage: asImagePosition(findField(fields, fieldAliases.middleDescriptionAfterImage)),
    bottomDescription: asText(findField(fields, fieldAliases.bottomDescription)),
    bottomDescriptionKo: asText(findField(fields, fieldAliases.bottomDescriptionKo)),
    bottomDescriptionAfterImage: asImagePosition(findField(fields, fieldAliases.bottomDescriptionAfterImage)),
    topDescriptionAfterImage: asImagePosition(findField(fields, fieldAliases.topDescriptionAfterImage)),
    role: asText(findField(fields, fieldAliases.role)),
    roleKo: asText(findField(fields, fieldAliases.roleKo)),
    team: asText(findField(fields, fieldAliases.team)),
    teamKo: asText(findField(fields, fieldAliases.teamKo)),
    timeline: asText(findField(fields, fieldAliases.timeline)),
    timelineKo: asText(findField(fields, fieldAliases.timelineKo)),
    heroImage,
    heroThumbnail,
    externalUrl: asText(findField(fields, fieldAliases.externalUrl)),
    images,
    tags: asText(findField(fields, fieldAliases.tags))
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    medium: asText(findField(fields, fieldAliases.medium))
      .split(",")
      .map((medium) => medium.trim())
      .filter(Boolean),
    mediumKo: asText(findField(fields, fieldAliases.mediumKo))
      .split(",")
      .map((medium) => medium.trim())
      .filter(Boolean),
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
      requestUrl.searchParams.set("view", airtableViewId);

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
      const project = await normalizeRecord(records[i]);
      if (project) projects.push(project);
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

      const cvContent = normalizeCvRecords(cvRecords);
      let introContent = { intro: "", introKo: "", postscript: "", postscriptKo: "" };

      try {
        const introUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(introTableName)}`;
        const introRecords = [];
        let introOffset;

        do {
          const introRequestUrl = new URL(introUrl);
          if (introOffset) introRequestUrl.searchParams.set("offset", introOffset);
          const introResponse = await fetch(introRequestUrl, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!introResponse.ok) {
            throw new Error(`Airtable intro API error (HTTP ${introResponse.status} ${introResponse.statusText})`);
          }
          const introPayload = await introResponse.json();
          introRecords.push(...(introPayload.records || []));
          introOffset = introPayload.offset;
        } while (introOffset);

        introContent = normalizeIntroRecords(introRecords);
        console.log(`✅ [Sync] Successfully synced intro from ${introTableName}`);
      } catch (introError) {
        console.warn(`⚠️  [Sync] Could not sync intro table ${introTableName}: ${introError.message}`);
        console.warn(`ℹ️  [Sync] Keeping legacy intro fields from ${cvTableName}.`);
      }

      await writeFile(cvOutputPath, `${JSON.stringify({
        ...cvContent,
        intro: introContent.intro || cvContent.intro,
        introKo: introContent.introKo || cvContent.introKo,
        postscript: introContent.postscript || cvContent.postscript,
        postscriptKo: introContent.postscriptKo || cvContent.postscriptKo,
      }, null, 2)}\n`);
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
