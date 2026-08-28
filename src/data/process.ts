export interface ProcessStep {
  n: string;
  title: string;
  short: string;
  detail: string[];
  youDo: string[];
  weDo: string[];
  typical: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    n: "01",
    title: "Discover",
    short: "Find a project that matches your interests.",
    detail: [
      "Browse the opportunities directory by field, difficulty, and time commitment. Every listing states the research question, the deliverable, the skills assumed, and the maximum hours available before you commit to anything.",
    ],
    youDo: ["Browse and shortlist projects", "Check the deadline and time commitment", "Apply to one project"],
    weDo: ["Publish full requirements up front", "Confirm your spot within five days"],
    typical: "20–40 minutes",
  },
  {
    n: "02",
    title: "Learn",
    short: "Review the research question, requirements, methodology, and resources.",
    detail: [
      "Accepted students receive the project packet: the framing of the question, the approved data sources, a methodology walkthrough, the submission template, and two annotated model submissions from previous cohorts.",
      "Projects involving human participants also require the research ethics module before any work begins.",
    ],
    youDo: ["Read the packet end to end", "Complete any required module", "Post questions in the project thread"],
    weDo: ["Provide datasets, templates, and worked examples", "Answer questions within two business days"],
    typical: "1–2 hours",
  },
  {
    n: "03",
    title: "Research",
    short: "Conduct your research and create your final submission.",
    detail: [
      "This is the bulk of the work and the part that is genuinely yours. You collect or locate your data, run your analysis, and write it up against the template for your research type.",
      "Keep your working files. Reviewers may ask to see the analysis behind a figure.",
    ],
    youDo: ["Do the research", "Draft the manuscript", "Produce your figures and reference list"],
    weDo: ["Hold optional office hours", "Review your outline on request before you draft"],
    typical: "4–12 hours",
  },
  {
    n: "04",
    title: "Submit",
    short: "Upload your work through the platform.",
    detail: [
      "Submit through the research submission form with your manuscript, supporting files, references, and the student declaration covering authorship and any AI assistance.",
      "The submission checklist has to be complete. Incomplete submissions are returned without review, which costs you a week.",
    ],
    youDo: ["Complete the checklist", "Upload manuscript and supporting files", "Sign the declaration"],
    weDo: ["Screen for completeness and originality", "Assign a reviewer in your field"],
    typical: "30 minutes",
  },
  {
    n: "05",
    title: "Review",
    short: "Reviewers evaluate the submission against predefined criteria.",
    detail: [
      "A reviewer with a background in your field scores the work on eight criteria — question, methodology, evidence, analysis, writing, citation, originality, and ethics — and writes specific, actionable feedback.",
      "Most submissions receive at least one revision request. That is the normal path, not a bad outcome.",
    ],
    youDo: ["Read the feedback carefully", "Revise and resubmit if asked"],
    weDo: ["Return a decision within 10–14 days", "Explain every requested revision"],
    typical: "10–14 days for a decision",
  },
  {
    n: "06",
    title: "Publish & receive credit",
    short: "Approved work may be published, added to your portfolio, and qualify for verified hours.",
    detail: [
      "Approved submissions are added to your research portfolio and may be selected for publication in the library with a permanent record number.",
      "If the work met the project's defined requirements, your reviewer records the approved hours against your service record, which you can download at any time.",
    ],
    youDo: ["Download your service record", "Choose whether to publish under your full name"],
    weDo: ["Record approved hours", "Issue a verification code with each service record"],
    typical: "Same week as approval",
  },
];
