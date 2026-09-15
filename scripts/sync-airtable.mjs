import { mkdir, writeFile } from "node:fs/promises";

const token = process.env.PORTFOLIO_TOKEN;
const baseId = "app1rO1j6Asf3Ltjp";
const tableName = "Artworks_eng";
const outputPath = new URL("../src/data/airtable-projects.json", import.meta.url);

const fieldAliases = {
  title: ["title", "name", "artwork", "project", "작품명"],
  subtitle: ["subtitle", "summary", "short description", "부제"],
  year: ["year", "date", "연도"],
  description: ["description", "body", "details", "설명"],
  role: ["role", "services", "역할"],
  team: ["team", "팀"],
  timeline: ["timeline", "duration", "기간"],
  heroImage: ["hero image", "hero", "cover", "image", "thumbnail", "대표 이미지"],
  images: ["images", "detail images", "gallery", "상세 이미지"],
  category: ["category", "type", "분류"],
  featured: ["featured", "대표"],
};

const slugify = (value) =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "untitled-project";

const findField = (fields, aliases) => {
  const fieldName = Object.keys(fields).find((name) =>
    aliases.some((alias) => name.trim().toLowerCase() === alias)
  );
  return fieldName ? fields[fieldName] : undefined;
};

const asText = (value, fallback = "") => {
  if (Array.isArray(value)) return value.map((item) => asText(item)).filter(Boolean).join(", ");
  if (value && typeof value === "object") return value.name || value.url || fallback;
  return value === undefined || value === null || value === "" ? fallback : String(value);
};

const asImages = (value, title) => {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values
    .map((item, index) => {
      const url = typeof item === "object" ? item.url : item;
      if (!url) return null;
      return {
        id: `${slugify(title)}-${index + 1}`,
        url,
        alt: typeof item === "object" && item.filename ? item.filename : title,
        width: "full",
      };
    })
    .filter(Boolean);
};

const asBoolean = (value) =>
  value === true || (typeof value === "string" && value.trim().toLowerCase() === "true");

const TO_BE_INDICATED = "To be indicated";

const normalizeRecord = ({ id, fields }) => {
  const title = asText(findField(fields, fieldAliases.title), TO_BE_INDICATED);
  const heroValue = findField(fields, fieldAliases.heroImage);
  const images = asImages(findField(fields, fieldAliases.images), title);
  const heroImages = asImages(heroValue, title);
  const heroImage = heroImages[0]?.url || images[0]?.url || "";
  const category = asText(findField(fields, fieldAliases.category), "design").toLowerCase();

  return {
    id,
    slug: slugify(title),
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
    category: category.includes("fine") || category.includes("art") ? "fine-arts" : "design",
  };
};

if (!token) {
  await writeFile(outputPath, "[]\n");
  console.log("PORTFOLIO_TOKEN is not set; no Airtable projects were synced.");
} else {
  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
  const records = [];
  let offset;

  do {
    const requestUrl = new URL(url);
    if (offset) requestUrl.searchParams.set("offset", offset);
    const response = await fetch(requestUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`Airtable request failed (${response.status} ${response.statusText})`);
    }

    const payload = await response.json();
    records.push(...(payload.records || []));
    offset = payload.offset;
  } while (offset);

  const projects = records.map(normalizeRecord);
  await mkdir(new URL("../src/data/", import.meta.url), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(projects, null, 2)}\n`);
  console.log(`Synced ${projects.length} project(s) from Airtable.`);
}
