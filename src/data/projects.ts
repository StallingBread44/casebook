import type { FieldSlug } from "./fields";
import type { Difficulty, ProjectStatus, ResearchType } from "./taxonomy";

/**
 * SAMPLE CONTENT — illustrative research opportunities for this preview build.
 * Hour figures are maximums available on approval, never guarantees.
 */
export interface Project {
  slug: string;
  record: string;
  title: string;
  field: FieldSlug;
  secondaryField?: FieldSlug;
  deliverable: ResearchType;
  difficulty: Difficulty;
  timeCommitment: string;
  maxHours: number;
  skills: string[];
  deadline: string; // ISO
  status: ProjectStatus;
  spotsRemaining: number;
  cohortSize: number;
  summary: string;
  description: string[];
  researchQuestion: string;
  requirements: string[];
  resources: { label: string; note: string }[];
  mentor: { name: string; role: string };
  hoursBreakdown: { task: string; hours: string }[];
}

export const PROJECTS: Project[] = [
  {
    slug: "teen-sleep-academic-performance",
    record: "CB·OPP·0231",
    title: "Investigating Teen Sleep & Academic Performance",
    field: "psychology",
    secondaryField: "public-health",
    deliverable: "Data Analysis",
    difficulty: "Intermediate",
    timeCommitment: "8–12 hours",
    maxHours: 8,
    skills: ["Reading research papers", "Spreadsheets", "Basic statistics", "Academic writing"],
    deadline: "2026-10-15",
    status: "Open",
    spotsRemaining: 14,
    cohortSize: 40,
    summary:
      "Analyze existing research and publicly available datasets to investigate relationships between sleep patterns and academic performance among adolescents.",
    description: [
      "Sleep and grades are correlated in almost every dataset that measures both. What that correlation means is far less settled — sleep may drive performance, performance pressure may drive sleep loss, or both may follow from something else entirely.",
      "In this project you will work with a public adolescent health dataset, produce a focused analysis of one relationship within it, and write it up as a short data analysis paper. You are not collecting new data and you will not work with human participants.",
      "The strongest submissions in past cohorts have been the narrow ones: one clearly stated question, one defensible method, and an honest account of what the data cannot tell you.",
    ],
    researchQuestion:
      "Is self-reported school-night sleep duration associated with academic outcomes among adolescents, and does the association hold after accounting for at least two plausible confounders?",
    requirements: [
      "Use one of the three approved public datasets listed in the project packet.",
      "State a single research question and pre-specify your outcome measure before running the analysis.",
      "Report at least one unadjusted and one adjusted model, and describe your controls.",
      "Produce one figure or table that a reader could interpret without the surrounding text.",
      "Write 1,200–2,500 words following the CB data analysis template.",
      "Include a limitations section that names at least three specific threats to your interpretation.",
    ],
    resources: [
      { label: "Project packet (PDF)", note: "Question framing, dataset links, and the submission template." },
      { label: "Approved datasets", note: "Three public adolescent health surveys with codebooks." },
      { label: "Statistics primer", note: "Regression walkthrough written for students without a stats course." },
      { label: "Two model submissions", note: "Prior approved papers, annotated by reviewers." },
    ],
    mentor: { name: "Dr. Elena Vasquez", role: "Faculty reviewer — Psychology" },
    hoursBreakdown: [
      { task: "Background reading and question framing", hours: "2" },
      { task: "Dataset preparation and analysis", hours: "3" },
      { task: "Drafting and figure production", hours: "2" },
      { task: "Revision after reviewer feedback", hours: "1" },
    ],
  },
  {
    slug: "ai-model-card-audit",
    record: "CB·OPP·0244",
    title: "Auditing Model Cards for Publicly Released AI Systems",
    field: "artificial-intelligence",
    secondaryField: "computer-science",
    deliverable: "Research Report",
    difficulty: "Advanced",
    timeCommitment: "10–14 hours",
    maxHours: 10,
    skills: ["Technical reading", "Structured coding", "Documentation analysis"],
    deadline: "2026-09-30",
    status: "Filling Fast",
    spotsRemaining: 4,
    cohortSize: 25,
    summary:
      "Apply a standardized rubric to the published documentation of widely used AI models and report what is disclosed, what is omitted, and what changed between versions.",
    description: [
      "When an AI model is released publicly, it usually ships with documentation describing its training data, intended uses, and known limitations. The quality of that documentation varies enormously and almost nobody checks it systematically.",
      "You will apply a 14-item rubric to the documentation for a set of assigned models, record what you find, and write a report on the patterns. No coding is required — this is careful reading and structured recording.",
      "Cohort submissions are pooled into an annual public dataset, with contributing students credited by name.",
    ],
    researchQuestion:
      "What proportion of publicly released AI systems disclose training data provenance, evaluation methodology, and known limitations, and how has disclosure changed over successive model versions?",
    requirements: [
      "Code all assigned models on every rubric item; partial coding is not accepted.",
      "Record a direct quote or a 'not disclosed' marker as evidence for each item.",
      "Flag any item where reasonable readers could disagree, with a note explaining why.",
      "Submit both the completed coding sheet and a 1,000–2,000 word report.",
      "Do not rely on secondary summaries — code from primary documentation only.",
    ],
    resources: [
      { label: "Rubric v3.2", note: "The 14-item coding instrument with definitions and edge cases." },
      { label: "Model assignment list", note: "Assigned on acceptance; five to eight models per student." },
      { label: "Calibration exercise", note: "Two pre-coded examples to check your reading against." },
    ],
    mentor: { name: "Marcus Lin", role: "Reviewer — Computer Science & AI" },
    hoursBreakdown: [
      { task: "Rubric training and calibration", hours: "1.5" },
      { task: "Coding assigned models", hours: "5" },
      { task: "Report drafting", hours: "2.5" },
      { task: "Revision", hours: "1" },
    ],
  },
  {
    slug: "urban-heat-island-mapping",
    record: "CB·OPP·0219",
    title: "Mapping Urban Heat Islands in Your Own City",
    field: "environmental-science",
    secondaryField: "public-health",
    deliverable: "Case Study",
    difficulty: "Introductory",
    timeCommitment: "6–9 hours",
    maxHours: 6,
    skills: ["Open-source mapping tools", "Public data", "Descriptive writing"],
    deadline: "2026-11-01",
    status: "Open",
    spotsRemaining: 31,
    cohortSize: 60,
    summary:
      "Use free satellite land-surface temperature data to map heat variation across your own city and describe how it lines up with tree canopy and land use.",
    description: [
      "Surface temperature can vary by more than 15 degrees across a single city on a summer afternoon, and the pattern is rarely random. This project puts free satellite data and a browser-based mapping tool in your hands to document that pattern where you live.",
      "This is our most common first project. The tooling is guided step by step and no prior GIS experience is expected.",
    ],
    researchQuestion:
      "How does land-surface temperature vary across neighborhoods in one city, and what land-cover characteristics accompany the hottest and coolest areas?",
    requirements: [
      "Produce at least one map of land-surface temperature for your chosen city.",
      "Compare a minimum of four neighborhoods with distinct land-cover profiles.",
      "Cite the satellite product, acquisition date, and processing steps you used.",
      "Write 800–1,500 words describing the pattern without overstating causation.",
    ],
    resources: [
      { label: "Step-by-step mapping guide", note: "Screenshots for every step, no software installation required." },
      { label: "Data source list", note: "Satellite products and municipal land-cover layers." },
      { label: "Worked example", note: "A completed case study for a mid-sized city." },
    ],
    mentor: { name: "Dr. Amara Osei", role: "Faculty reviewer — Environmental Science" },
    hoursBreakdown: [
      { task: "Guided tool walkthrough", hours: "1.5" },
      { task: "Map production", hours: "2" },
      { task: "Writing", hours: "2" },
      { task: "Revision", hours: "0.5" },
    ],
  },
  {
    slug: "financial-literacy-curriculum-review",
    record: "CB·OPP·0208",
    title: "What Do State Financial Literacy Requirements Actually Require?",
    field: "finance",
    secondaryField: "education",
    deliverable: "Policy Analysis",
    difficulty: "Intermediate",
    timeCommitment: "8–10 hours",
    maxHours: 7,
    skills: ["Policy document reading", "Comparative analysis", "Structured writing"],
    deadline: "2026-10-01",
    status: "Open",
    spotsRemaining: 9,
    cohortSize: 30,
    summary:
      "Compare state-level personal finance education mandates on required hours, content standards, teacher preparation, and assessment.",
    description: [
      "Most states now require some form of personal finance instruction, and the requirements are far less similar than the headlines suggest. A one-semester standalone course and a unit embedded in an economics class both count as a mandate.",
      "You will read the actual statutory and standards language for assigned states and record what each one requires along a common set of dimensions.",
    ],
    researchQuestion:
      "How do state personal finance education mandates differ in required instructional time, content coverage, teacher preparation, and student assessment?",
    requirements: [
      "Work from primary statutory or state board standards documents, not advocacy summaries.",
      "Complete the comparison matrix for every assigned state.",
      "Quote the operative language for each requirement you record.",
      "Write 1,000–1,800 words identifying the dimensions with the widest variation.",
    ],
    resources: [
      { label: "Comparison matrix template", note: "Nine dimensions with coding definitions." },
      { label: "State document index", note: "Direct links to statutes and standards for all 50 states." },
    ],
    mentor: { name: "Priya Shah", role: "Reviewer — Economics & Finance" },
    hoursBreakdown: [
      { task: "Orientation and matrix training", hours: "1" },
      { task: "Document reading and coding", hours: "3.5" },
      { task: "Writing", hours: "2" },
      { task: "Revision", hours: "0.5" },
    ],
  },
  {
    slug: "clinical-trial-diversity-review",
    record: "CB·OPP·0252",
    title: "Reporting of Participant Demographics in Recent Clinical Trials",
    field: "medicine-health",
    secondaryField: "public-health",
    deliverable: "Systematic Review",
    difficulty: "Advanced",
    timeCommitment: "12–16 hours",
    maxHours: 12,
    skills: ["Literature searching", "Screening protocols", "Data extraction"],
    deadline: "2026-09-20",
    status: "Waitlist",
    spotsRemaining: 0,
    cohortSize: 20,
    summary:
      "Screen recently published trials in an assigned therapeutic area and extract how participant demographics are reported against enrollment guidance.",
    description: [
      "Who is enrolled in a clinical trial determines who its results apply to. Reporting practices remain uneven despite two decades of guidance.",
      "This is our most demanding project. It follows a formal screening protocol with defined inclusion criteria and a structured extraction form, and it is the closest thing on the platform to graduate-level systematic review work.",
    ],
    researchQuestion:
      "How completely do recently published clinical trials in the assigned therapeutic area report participant demographic composition?",
    requirements: [
      "Follow the provided screening protocol exactly and log every exclusion with a reason.",
      "Extract all fields on the standardized form for every included trial.",
      "Report a PRISMA-style flow count of records screened, excluded, and included.",
      "Write 1,500–3,000 words following the review template.",
      "Submit your full screening log alongside the manuscript.",
    ],
    resources: [
      { label: "Screening protocol", note: "Inclusion and exclusion criteria with worked examples." },
      { label: "Extraction form", note: "Structured spreadsheet with field definitions." },
      { label: "Database search guide", note: "Building and documenting a reproducible search." },
    ],
    mentor: { name: "Dr. Elena Vasquez", role: "Faculty reviewer — Medicine & Health" },
    hoursBreakdown: [
      { task: "Protocol training", hours: "2" },
      { task: "Screening", hours: "4" },
      { task: "Extraction", hours: "3" },
      { task: "Writing and revision", hours: "3" },
    ],
  },
  {
    slug: "local-oral-history",
    record: "CB·OPP·0198",
    title: "Local Oral History: Documenting a Neighborhood's Change",
    field: "history",
    secondaryField: "sociology",
    deliverable: "Research Report",
    difficulty: "Intermediate",
    timeCommitment: "10–14 hours",
    maxHours: 9,
    skills: ["Interviewing", "Transcription", "Archival research", "Narrative writing"],
    deadline: "2026-12-01",
    status: "Open",
    spotsRemaining: 11,
    cohortSize: 20,
    summary:
      "Conduct supervised oral history interviews and situate them against archival records to document how one neighborhood changed over a defined period.",
    description: [
      "Oral history captures what documents leave out. It also involves real people, which means it comes with real obligations.",
      "Because this project involves human participants, it requires an adult supervisor of record, written informed consent from every interviewee, and completion of our research ethics module before any interview takes place. Submissions without documented consent are not reviewed.",
    ],
    researchQuestion:
      "How do residents describe a specific change in their neighborhood, and how does that account compare with the documentary record?",
    requirements: [
      "Complete the CB research ethics module before contacting any participant.",
      "Identify an adult supervisor of record and submit their confirmation.",
      "Obtain and submit written informed consent from every interviewee, including guardian consent for minors.",
      "Conduct at least three interviews using the provided semi-structured guide.",
      "Compare interview accounts against at least two archival or documentary sources.",
      "Write 1,500–3,000 words. Anonymize participants unless they consent to attribution in writing.",
    ],
    resources: [
      { label: "Research ethics module", note: "Required. Consent, minors, sensitive topics, and withdrawal." },
      { label: "Consent form templates", note: "Participant and guardian versions." },
      { label: "Interview guide", note: "Semi-structured questions and follow-up prompts." },
      { label: "Transcription guidance", note: "Conventions and accessibility considerations." },
    ],
    mentor: { name: "Dr. Nathan Okoro", role: "Faculty reviewer — History" },
    hoursBreakdown: [
      { task: "Ethics module and consent preparation", hours: "2" },
      { task: "Interviews", hours: "3" },
      { task: "Transcription and archival comparison", hours: "2.5" },
      { task: "Writing and revision", hours: "1.5" },
    ],
  },
  {
    slug: "materials-strength-testing",
    record: "CB·OPP·0226",
    title: "Comparative Strength Testing of Recycled Composite Materials",
    field: "engineering",
    secondaryField: "chemistry",
    deliverable: "Experimental Study",
    difficulty: "Advanced",
    timeCommitment: "12–18 hours",
    maxHours: 12,
    skills: ["Lab safety", "Measurement", "Experimental design", "Technical writing"],
    deadline: "2026-10-20",
    status: "Filling Fast",
    spotsRemaining: 3,
    cohortSize: 15,
    summary:
      "Fabricate and test composite samples using recycled feedstock, following a standardized protocol, and report strength characteristics against control samples.",
    description: [
      "This is a hands-on project requiring access to a school lab or makerspace with supervision. You will fabricate composite samples using a defined protocol, test them to failure, and report the results.",
      "Applicants must confirm access to appropriate facilities and a supervising instructor before acceptance.",
    ],
    researchQuestion:
      "How does the flexural strength of composites made with recycled feedstock compare to equivalent samples made with virgin material?",
    requirements: [
      "Confirm supervised lab or makerspace access at application.",
      "Fabricate a minimum of five samples per condition using the standard protocol.",
      "Record all measurements on the provided data sheet, including failed and discarded samples.",
      "Report means, ranges, and every deviation from protocol.",
      "Submit photographs of the test setup and representative failures.",
    ],
    resources: [
      { label: "Fabrication protocol", note: "Materials, ratios, curing conditions, and safety requirements." },
      { label: "Testing procedure", note: "Three-point bend setup and measurement conventions." },
      { label: "Data sheet", note: "Structured recording template." },
    ],
    mentor: { name: "Marcus Lin", role: "Reviewer — Engineering" },
    hoursBreakdown: [
      { task: "Protocol study and safety review", hours: "2" },
      { task: "Sample fabrication and curing", hours: "4" },
      { task: "Testing and data recording", hours: "3" },
      { task: "Analysis and writing", hours: "3" },
    ],
  },
  {
    slug: "misinformation-headline-study",
    record: "CB·OPP·0261",
    title: "How Headline Framing Changes What Readers Remember",
    field: "sociology",
    secondaryField: "psychology",
    deliverable: "Literature Review",
    difficulty: "Introductory",
    timeCommitment: "6–8 hours",
    maxHours: 5,
    skills: ["Literature searching", "Summarizing", "Citation practice"],
    deadline: "2026-11-15",
    status: "Open",
    spotsRemaining: 22,
    cohortSize: 45,
    summary:
      "Synthesize existing experimental research on headline framing and recall into a structured literature review for a student audience.",
    description: [
      "Before you can run a study, you have to know what has already been run. This project teaches literature review as a skill in its own right: searching systematically, reading critically, and synthesizing rather than summarizing one paper at a time.",
      "It is the best starting point for students who want research experience but do not yet have a specific question of their own.",
    ],
    researchQuestion:
      "What does experimental research show about how headline framing affects what readers recall from a news article?",
    requirements: [
      "Locate and read at least 12 peer-reviewed sources, documenting your search strategy.",
      "Organize the review thematically rather than one paragraph per paper.",
      "Identify at least two points where the literature disagrees.",
      "Write 1,000–2,000 words in APA style with a complete reference list.",
    ],
    resources: [
      { label: "Search strategy worksheet", note: "Building and recording a reproducible search." },
      { label: "Synthesis guide", note: "How to write thematically instead of paper-by-paper." },
      { label: "Citation clinic", note: "APA formatting with common student errors." },
    ],
    mentor: { name: "Priya Shah", role: "Reviewer — Social Sciences" },
    hoursBreakdown: [
      { task: "Search and source collection", hours: "1.5" },
      { task: "Reading and note-taking", hours: "2" },
      { task: "Writing", hours: "1.5" },
      { task: "Citation check and revision", hours: "0.5" },
    ],
  },
];

export const PROJECT_BY_SLUG: Record<string, Project> = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p]),
);
