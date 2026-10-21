import cvData from "./airtable-cv.json";

export type CvEntry = {
  id: string;
  order: number;
  year: string;
  title: string;
  titleKo?: string;
  organization: string;
  organizationKo?: string;
  description: string;
  descriptionKo?: string;
};

export type CvContent = {
  intro: string;
  introKo?: string;
  postscript?: string;
  postscriptKo?: string;
  entries: CvEntry[];
};

const fallbackCv: CvContent = {
  intro: "Hannah Yoo is an artist and designer working across visual identity, digital experiences, illustration, and painting. Her practice moves between precise systems and intuitive image-making, with each project shaped by close observation and clear visual language.",
  introKo: "",
  entries: [],
};

let cv: CvContent = cvData && typeof cvData === "object" ? (cvData as CvContent) : fallbackCv;

export const loadCv = async (): Promise<CvContent> => {
  cv = cvData && typeof cvData === "object" ? (cvData as CvContent) : fallbackCv;
  return cv;
};

export const getCv = (): CvContent => cv;
