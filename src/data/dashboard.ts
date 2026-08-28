import type { SubmissionStage } from "./taxonomy";

/** SAMPLE CONTENT — demo dashboard state for a fictional signed-in student. */

export const DEMO_STUDENT = {
  handle: "alex-johnson",
  name: "Alex Johnson",
  school: "Franklin High School",
  gradYear: "Class of 2026",
  memberSince: "September 2024",
  recordId: "CB·STU·10428",
};

export interface HourEntry {
  id: string;
  project: string;
  field: string;
  submitted: string;
  hours: number;
  status: "Approved" | "Pending review" | "Needs revision";
  reviewer?: string;
  note?: string;
}

export const HOUR_LEDGER: HourEntry[] = [
  {
    id: "CB·HRS·2261",
    project: "Investigating Teen Sleep & Academic Performance",
    field: "Psychology",
    submitted: "2026-06-30",
    hours: 8,
    status: "Approved",
    reviewer: "Dr. Elena Vasquez",
    note: "Full requirements met. Figure and limitations section exceeded the rubric.",
  },
  {
    id: "CB·HRS·2118",
    project: "How Headline Framing Changes What Readers Remember",
    field: "Sociology",
    submitted: "2026-04-02",
    hours: 5,
    status: "Approved",
    reviewer: "Priya Shah",
    note: "Approved after one revision round.",
  },
  {
    id: "CB·HRS·1974",
    project: "Transit Access and Grocery Availability",
    field: "Public Health",
    submitted: "2026-01-20",
    hours: 9.5,
    status: "Approved",
    reviewer: "Dr. Amara Osei",
    note: "Published in Vol. 3, No. 3.",
  },
  {
    id: "CB·HRS·1802",
    project: "Mapping Urban Heat Islands in Your Own City",
    field: "Environmental Science",
    submitted: "2025-11-14",
    hours: 6,
    status: "Approved",
    reviewer: "Dr. Amara Osei",
  },
  {
    id: "CB·HRS·2340",
    project: "Auditing Model Cards for Publicly Released AI Systems",
    field: "Artificial Intelligence",
    submitted: "2026-08-14",
    hours: 10,
    status: "Pending review",
    note: "In the reviewer queue. Typical turnaround is 10–14 days.",
  },
  {
    id: "CB·HRS·2298",
    project: "What Do State Financial Literacy Requirements Actually Require?",
    field: "Finance",
    submitted: "2026-07-22",
    hours: 7,
    status: "Needs revision",
    reviewer: "Priya Shah",
    note: "Comparison matrix is incomplete for four assigned states. Resubmit with all rows coded.",
  },
];

export interface ActiveProject {
  title: string;
  field: string;
  stage: SubmissionStage;
  due: string;
  progress: number;
  maxHours: number;
  nextStep: string;
}

export const ACTIVE_PROJECTS: ActiveProject[] = [
  {
    title: "Auditing Model Cards for Publicly Released AI Systems",
    field: "Artificial Intelligence",
    stage: "Under Review",
    due: "2026-09-30",
    progress: 100,
    maxHours: 10,
    nextStep: "No action needed — reviewer assigned 12 days ago.",
  },
  {
    title: "What Do State Financial Literacy Requirements Actually Require?",
    field: "Finance",
    stage: "Revision Requested",
    due: "2026-10-01",
    progress: 80,
    maxHours: 7,
    nextStep: "Complete the matrix for AK, MS, NH, and WY, then resubmit.",
  },
  {
    title: "Local Oral History: Documenting a Neighborhood's Change",
    field: "History",
    stage: "Draft",
    due: "2026-12-01",
    progress: 25,
    maxHours: 9,
    nextStep: "Ethics module complete. Upload your supervisor confirmation next.",
  },
];

export const SAVED_STUDIES = [
  "machine-learning-early-disease-detection",
  "attention-restoration-study-breaks",
  "microplastics-freshwater-literature-review",
];

export const SUBMISSION_CHECKLIST = [
  { id: "template", label: "Manuscript follows the CB template for its research type", required: true },
  { id: "wordcount", label: "Length is within the range stated in the project requirements", required: true },
  { id: "abstract", label: "Abstract is 150–300 words and states the finding, not just the topic", required: true },
  { id: "citations", label: "Every source cited in text appears in the reference list, and vice versa", required: true },
  { id: "figures", label: "Figures and tables are numbered, captioned, and referenced in the text", required: false },
  { id: "data", label: "Data source, access date, and any processing steps are documented", required: true },
  { id: "limits", label: "Limitations section names specific threats to your interpretation", required: true },
  { id: "consent", label: "If people were involved: consent forms and supervisor confirmation attached", required: false },
  { id: "ai", label: "AI assistance is disclosed in the declaration below", required: true },
  { id: "own", label: "The analysis and writing are your own work", required: true },
];

/** Sample queue for the reviewer interface concept. */
export interface ReviewItem {
  id: string;
  title: string;
  author: string;
  field: string;
  type: string;
  submitted: string;
  words: number;
  hoursRequested: number;
  flags: string[];
  priority: "Standard" | "Overdue" | "Second review";
}

export const REVIEW_QUEUE: ReviewItem[] = [
  {
    id: "CB·SUB·4471",
    title: "Auditing Model Cards for Publicly Released AI Systems",
    author: "Alex Johnson",
    field: "Artificial Intelligence",
    type: "Research Report",
    submitted: "2026-08-14",
    words: 1840,
    hoursRequested: 10,
    flags: ["Coding sheet attached", "AI use disclosed"],
    priority: "Standard",
  },
  {
    id: "CB·SUB·4468",
    title: "Pollinator Counts Across Three Suburban Garden Types",
    author: "Jordan Reyes",
    field: "Biology",
    type: "Experimental Study",
    submitted: "2026-08-09",
    words: 2410,
    hoursRequested: 9,
    flags: ["Raw data attached"],
    priority: "Overdue",
  },
  {
    id: "CB·SUB·4455",
    title: "Local Ballot Measure Turnout, 2016–2024",
    author: "Simone Petrov",
    field: "Political Science",
    type: "Data Analysis",
    submitted: "2026-08-02",
    words: 1560,
    hoursRequested: 6,
    flags: ["Second reviewer requested", "Citation check pending"],
    priority: "Second review",
  },
];
