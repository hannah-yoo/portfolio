import { Project } from "@/types";

export const getProjectWebsiteUrl = (project: Project): string | undefined => {
  const isWebDesign = [...(project.medium ?? []), ...(project.tags ?? []), project.role, project.roleKo]
    .join(" ")
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .split(/[,;|]/)
    .some((value) => /\bweb(?:site)?\s+design\b|웹(?:사이트)?\s*디자인/i.test(value.trim()));

  if (!isWebDesign) return undefined;

  const description = [project.topDescription, project.topDescriptionKo].filter(Boolean).join(" ");
  const match = description.match(/(?:https?:\/\/|www\.)[^\s<>"']+/i)?.[0];
  if (!match) return undefined;

  try {
    const candidate = match.replace(/[),.;!?]+$/, "");
    const url = new URL(candidate.startsWith("www.") ? `https://${candidate}` : candidate);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
};

export const removeProjectWebsiteUrl = (description: string, websiteUrl?: string) =>
  websiteUrl ? description.replace(/(?:https?:\/\/|www\.)[^\s<>"']+/i, "").trim() : description;
