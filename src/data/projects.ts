import { Project } from "@/types";
import airtableProjects from "./airtable-projects.json";

const fallbackProjects: Project[] = Array.isArray(airtableProjects) ? airtableProjects : [];
let projects: Project[] = fallbackProjects;

const envToken = (
  import.meta.env.VITE_AIRTABLE_API_KEY ||
  import.meta.env.VITE_AIRTABLE_TOKEN ||
  import.meta.env.PORTFOLIO_TOKEN ||
  ""
).trim();

const envBaseId = (
  import.meta.env.VITE_AIRTABLE_BASE_ID ||
  import.meta.env.AIRTABLE_BASE_ID ||
  "app1rO1j6Asf3Ltjp"
).trim();

const envTableName = (
  import.meta.env.VITE_AIRTABLE_TABLE_NAME ||
  import.meta.env.AIRTABLE_TABLE_NAME ||
  "Artworks_eng"
).trim();

const fieldAliases = {
  title: ["title", "name", "artwork", "artwork name", "project", "project name", "작품명", "제목"],
  subtitle: ["subtitle", "summary", "short description", "sub title", "부제", "한줄설명"],
  year: ["year", "date", "created", "연도", "제작연도", "날짜"],
  description: ["description", "body", "details", "note", "설명", "작품설명"],
  role: ["role", "services", "역할", "분야"],
  team: ["team", "client", "팀", "클라이언트"],
  timeline: ["timeline", "duration", "period", "기간"],
  heroImage: ["hero image", "hero", "cover", "cover image", "image", "thumbnail", "main image", "대표 이미지", "커버", "썸네일"],
  images: ["images", "detail images", "gallery", "attachments", "상세 이미지", "이미지", "사진"],
  category: ["category", "type", "tag", "tags", "분류", "카테고리"],
  featured: ["featured", "highlight", "대표", "추천"],
} as const;

const normalizeKey = (key: string) => key.trim().toLowerCase().replace(/[\s_\-]+/g, " ");

const slugify = (value: string) =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-|-$/g, "") || "untitled-project";

const findField = (fields: Record<string, unknown>, aliases: string[]) => {
  const fieldNames = Object.keys(fields);
  for (const alias of aliases) {
    const normalizedAlias = normalizeKey(alias);
    const found = fieldNames.find((name) => normalizeKey(name) === normalizedAlias);
    if (found && fields[found] !== undefined && fields[found] !== null && fields[found] !== "") {
      return fields[found];
    }
  }
  return undefined;
};

const asText = (value: unknown, fallback = ""): string => {
  if (Array.isArray(value)) return value.map((item) => asText(item)).filter(Boolean).join(", ");
  if (value && typeof value === "object") return (value as { name?: string; url?: string }).name || (value as { url?: string }).url || fallback;
  return value === undefined || value === null || value === "" ? fallback : String(value);
};

const asBoolean = (value: unknown) =>
  value === true || (typeof value === "string" && value.trim().toLowerCase() === "true");

const downloadAndCacheMedia = async (url: string, filename: string) => {
  if (!url || typeof url !== "string") return "";
  if (!url.includes("airtableusercontent.com") && !url.includes("airtable.com")) {
    return url;
  }

  try {
    const mediaDir = "airtable-media";
    const extMatch = url.match(/\.([a-zA-Z0-9]+)(\?|$)/);
    const ext = extMatch ? extMatch[1] : "jpg";
    const cleanFilename = `${filename}.${ext}`;
    const destinationUrl = `${mediaDir}/${cleanFilename}`;

    const response = await fetch(url);
    if (response.ok) {
      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer]);
      const objectUrl = URL.createObjectURL(blob);
      return objectUrl || destinationUrl;
    }
  } catch {
    // ignore download failures and keep original Airtable URL
  }

  return url;
};

const extractImages = async (value: unknown, projectSlug: string) => {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  const processed: { id: string; url: string; alt: string; width: "full" | "half"; caption?: string }[] = [];

  for (let index = 0; index < values.length; index += 1) {
    const item = values[index];
    const rawUrl = typeof item === "object" ? (item as { url?: string }).url : item;
    if (!rawUrl) continue;

    const imgId = `${projectSlug}-${index + 1}`;
    const cachedUrl = await downloadAndCacheMedia(String(rawUrl), imgId);

    processed.push({
      id: imgId,
      url: cachedUrl,
      alt: typeof item === "object" && item && "filename" in item && typeof item.filename === "string" ? item.filename : projectSlug,
      width: "full",
    });
  }

  return processed;
};

const normalizeRecord = async (record: { id?: string; fields?: Record<string, unknown> }, index: number): Promise<Project> => {
  const safeFields = record.fields || {};
  const title = asText(findField(safeFields, fieldAliases.title), "To be indicated");
  const slug = title !== "To be indicated" ? slugify(title) : `project-${index + 1}`;

  const heroValue = findField(safeFields, fieldAliases.heroImage);
  const images = await extractImages(findField(safeFields, fieldAliases.images), slug);

  let heroImage = "";
  if (heroValue) {
    const heroExtracted = await extractImages(heroValue, `${slug}-hero`);
    heroImage = heroExtracted[0]?.url || "";
  }
  if (!heroImage && images[0]?.url) {
    heroImage = images[0].url;
  }

  const categoryRaw = asText(findField(safeFields, fieldAliases.category), "").toLowerCase();
  const category =
    categoryRaw.includes("fine") || categoryRaw.includes("art") || categoryRaw.includes("일러스트")
      ? "fine-arts"
      : categoryRaw.includes("design") || categoryRaw.includes("디자인")
        ? "design"
        : "fine-arts";

  return {
    id: String(record.id || `${slug}-${index}`),
    slug,
    title,
    subtitle: asText(findField(safeFields, fieldAliases.subtitle), "To be indicated"),
    year: asText(findField(safeFields, fieldAliases.year), "To be indicated"),
    description: asText(findField(safeFields, fieldAliases.description), "To be indicated"),
    role: asText(findField(safeFields, fieldAliases.role), "To be indicated"),
    team: asText(findField(safeFields, fieldAliases.team), "To be indicated"),
    timeline: asText(findField(safeFields, fieldAliases.timeline), "To be indicated"),
    heroImage,
    images,
    gridWidth: 6,
    featured: asBoolean(findField(safeFields, fieldAliases.featured)),
    category,
  };
};

export const loadProjects = async (): Promise<Project[]> => {
  if (!envToken || !envBaseId || !envTableName) {
    projects = fallbackProjects;
    return projects;
  }

  try {
    const requestUrl = `https://api.airtable.com/v0/${encodeURIComponent(envBaseId)}/${encodeURIComponent(envTableName)}`;
    const response = await fetch(requestUrl, {
      headers: { Authorization: `Bearer ${envToken}` },
    });

    if (!response.ok) {
      throw new Error(`Airtable request failed with status ${response.status}`);
    }

    const payload = await response.json();
    const records = Array.isArray(payload.records) ? payload.records : [];
    const nextProjects = await Promise.all(records.map((record, index) => normalizeRecord(record, index)));

    projects = nextProjects;
    return projects;
  } catch (error) {
    console.warn("Failed to load projects from Airtable, using local fallback:", error);
    projects = fallbackProjects;
    return projects;
  }
};

export const getAllProjects = (): Project[] => projects;

export const getFeaturedProjects = (): Project[] =>
  projects.filter((project) => project.featured);

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const getNextProject = (currentSlug: string): Project | null => {
  const currentIndex = projects.findIndex((project) => project.slug === currentSlug);
  if (projects.length === 0) return null;
  if (currentIndex === -1 || currentIndex === projects.length - 1) {
    return projects[0];
  }
  return projects[currentIndex + 1];
};
