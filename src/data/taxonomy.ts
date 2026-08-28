export const RESEARCH_TYPES = [
  "Original Research",
  "Case Study",
  "Literature Review",
  "Data Analysis",
  "Research Report",
  "Systematic Review",
  "Experimental Study",
  "Policy Analysis",
] as const;
export type ResearchType = (typeof RESEARCH_TYPES)[number];

export const DIFFICULTIES = ["Introductory", "Intermediate", "Advanced"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

export const PROJECT_STATUSES = ["Open", "Filling Fast", "Waitlist", "Closed"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const SUBMISSION_STAGES = [
  "Draft",
  "Submitted",
  "Under Review",
  "Revision Requested",
  "Approved",
  "Published",
] as const;
export type SubmissionStage = (typeof SUBMISSION_STAGES)[number];

export const READING_TIME_BANDS = [
  { id: "short", label: "Under 8 min", test: (m: number) => m < 8 },
  { id: "medium", label: "8–15 min", test: (m: number) => m >= 8 && m <= 15 },
  { id: "long", label: "Over 15 min", test: (m: number) => m > 15 },
] as const;

export const DATE_BANDS = [
  { id: "3m", label: "Past 3 months", months: 3 },
  { id: "6m", label: "Past 6 months", months: 6 },
  { id: "12m", label: "Past year", months: 12 },
] as const;
