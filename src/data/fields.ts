export type FieldSlug =
  | "biology"
  | "medicine-health"
  | "psychology"
  | "neuroscience"
  | "computer-science"
  | "artificial-intelligence"
  | "environmental-science"
  | "chemistry"
  | "physics"
  | "engineering"
  | "economics"
  | "business"
  | "finance"
  | "sociology"
  | "political-science"
  | "history"
  | "literature"
  | "education"
  | "public-health"
  | "other";

export interface Field {
  slug: FieldSlug;
  /** Three-letter catalog code used in record IDs, e.g. CB·PSY·0142 */
  code: string;
  name: string;
  blurb: string;
  /** Sample count — placeholder data, replace with real totals. */
  studies: number;
}

export const FIELDS: Field[] = [
  { slug: "biology", code: "BIO", name: "Biology", blurb: "Cells, organisms, genetics, and ecology.", studies: 41 },
  { slug: "medicine-health", code: "MED", name: "Medicine & Health", blurb: "Clinical questions, treatment, and care systems.", studies: 36 },
  { slug: "psychology", code: "PSY", name: "Psychology", blurb: "Behavior, cognition, development, and mental health.", studies: 58 },
  { slug: "neuroscience", code: "NEU", name: "Neuroscience", blurb: "Brain structure, signaling, and the science of attention.", studies: 24 },
  { slug: "computer-science", code: "CSC", name: "Computer Science", blurb: "Algorithms, systems, security, and human-computer interaction.", studies: 47 },
  { slug: "artificial-intelligence", code: "AIN", name: "Artificial Intelligence", blurb: "Machine learning, model evaluation, and applied AI ethics.", studies: 39 },
  { slug: "environmental-science", code: "ENV", name: "Environmental Science", blurb: "Climate, ecosystems, land use, and conservation.", studies: 33 },
  { slug: "chemistry", code: "CHM", name: "Chemistry", blurb: "Reactions, materials, and analytical methods.", studies: 21 },
  { slug: "physics", code: "PHY", name: "Physics", blurb: "Mechanics, optics, astrophysics, and modeling.", studies: 19 },
  { slug: "engineering", code: "ENG", name: "Engineering", blurb: "Design, prototyping, testing, and failure analysis.", studies: 28 },
  { slug: "economics", code: "ECO", name: "Economics", blurb: "Markets, incentives, labor, and public policy effects.", studies: 26 },
  { slug: "business", code: "BUS", name: "Business", blurb: "Strategy, operations, marketing, and organizations.", studies: 22 },
  { slug: "finance", code: "FIN", name: "Finance", blurb: "Investment, risk, household money, and literacy.", studies: 18 },
  { slug: "sociology", code: "SOC", name: "Sociology", blurb: "Communities, institutions, inequality, and culture.", studies: 25 },
  { slug: "political-science", code: "POL", name: "Political Science", blurb: "Governance, elections, civic participation, and policy.", studies: 20 },
  { slug: "history", code: "HIS", name: "History", blurb: "Archival work, primary sources, and historiography.", studies: 17 },
  { slug: "literature", code: "LIT", name: "Literature", blurb: "Close reading, literary theory, and comparative study.", studies: 14 },
  { slug: "education", code: "EDU", name: "Education", blurb: "Learning science, curriculum, equity, and schooling.", studies: 31 },
  { slug: "public-health", code: "PBH", name: "Public Health", blurb: "Population health, prevention, and health systems.", studies: 34 },
  { slug: "other", code: "OTH", name: "Other", blurb: "Interdisciplinary work that doesn't fit one shelf.", studies: 12 },
];

export const FIELD_BY_SLUG: Record<string, Field> = Object.fromEntries(
  FIELDS.map((f) => [f.slug, f]),
) as Record<string, Field>;

export function fieldName(slug: FieldSlug): string {
  return FIELD_BY_SLUG[slug]?.name ?? "Other";
}
export function fieldCode(slug: FieldSlug): string {
  return FIELD_BY_SLUG[slug]?.code ?? "OTH";
}
