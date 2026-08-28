import type { FieldSlug } from "./fields";

/**
 * SAMPLE CONTENT — Field Notes, the monthly briefing.
 *
 * Every item below is illustrative placeholder copy written for this preview
 * build. Nothing here reports a real event and no real journal, institution,
 * or author is named. Replace the array with edited items and real citations;
 * the `kind` label is what the card shows in place of a source until then.
 */

export type NewsKind =
  | "New study"
  | "Preprint"
  | "Dataset"
  | "Report"
  | "Method"
  | "Policy"
  | "Tool"
  | "Correction";

export interface NewsItem {
  id: string;
  headline: string;
  field: FieldSlug;
  secondaryField?: FieldSlug;
  date: string;
  kind: NewsKind;
  summary: string;
  whyItMatters: string;
  tags: string[];
  relatedProject?: string;
  relatedPaper?: string;
  featured?: boolean;
}

export const NEWS: NewsItem[] = [
  {
    id: "CB·NWS·0512",
    headline: "Open sleep-diary dataset covering 40,000 adolescents released for public research",
    field: "psychology",
    secondaryField: "public-health",
    date: "2026-08-21",
    kind: "Dataset",
    summary:
      "A multi-year adolescent health survey has released its sleep module — bedtimes, wake times, and self-rated quality — as a de-identified public file with a full codebook. Two years of the series are now downloadable without an application.",
    whyItMatters:
      "It is one of the three approved sources for our teen sleep project, and it is large enough to support subgroup analysis that smaller school surveys cannot.",
    tags: ["Sleep", "Open data", "Adolescents"],
    relatedProject: "teen-sleep-academic-performance",
    relatedPaper: "social-media-adolescent-sleep",
    featured: true,
  },
  {
    id: "CB·NWS·0511",
    headline: "Reporting checklist for medical AI adds a required external-validation section",
    field: "artificial-intelligence",
    secondaryField: "medicine-health",
    date: "2026-08-18",
    kind: "Policy",
    summary:
      "The widely used reporting guideline for clinical prediction models has been revised to require authors to state whether a model was tested on data from a site not represented in training, and to report the performance drop if it was.",
    whyItMatters:
      "Papers published after the revision are far easier to audit — the number our model-card project asks students to look for now has a named place in the manuscript.",
    tags: ["Model evaluation", "Reporting standards", "Clinical AI"],
    relatedProject: "ai-model-card-audit",
    relatedPaper: "machine-learning-early-disease-detection",
    featured: true,
  },
  {
    id: "CB·NWS·0509",
    headline: "Satellite land-surface temperature product moves to daily resolution",
    field: "environmental-science",
    date: "2026-08-14",
    kind: "Tool",
    summary:
      "A free satellite temperature product used in urban heat mapping has moved from eight-day composites to daily imagery, with a browser interface that no longer requires desktop GIS software.",
    whyItMatters:
      "Daily imagery means a heat-mapping project can compare a single hot afternoon against a mild one instead of averaging both away.",
    tags: ["Remote sensing", "Urban heat", "Open tools"],
    relatedProject: "urban-heat-island-mapping",
    relatedPaper: "urban-green-space-student-wellbeing",
    featured: true,
  },
  {
    id: "CB·NWS·0508",
    headline: "Large replication effort finds attention-training results hold at about half the reported size",
    field: "neuroscience",
    secondaryField: "education",
    date: "2026-08-11",
    kind: "New study",
    summary:
      "A coordinated replication across fourteen labs re-ran a set of widely cited attention-training experiments under a shared protocol. The direction of the effect held in most labs; the average magnitude came in near half of what the original reports described.",
    whyItMatters:
      "A useful case study in what replication does and does not overturn — the finding survived, the effect size did not.",
    tags: ["Replication", "Attention", "Effect size"],
    relatedPaper: "attention-restoration-study-breaks",
  },
  {
    id: "CB·NWS·0507",
    headline: "Soil resistome survey expands to 900 sampling sites across three continents",
    field: "biology",
    secondaryField: "public-health",
    date: "2026-08-07",
    kind: "New study",
    summary:
      "An international sampling collaboration published resistance-gene profiles for soils spanning agricultural, urban, and undeveloped land use, with all sequence data and site metadata deposited publicly.",
    whyItMatters:
      "Student culture-based surveys can now be placed against a molecular baseline for comparable land-use categories.",
    tags: ["Microbiology", "Antibiotic resistance", "Open data"],
    relatedPaper: "antibiotic-resistance-soil-isolates",
  },
  {
    id: "CB·NWS·0505",
    headline: "Trial registries begin publishing enrollment demographics as structured fields",
    field: "medicine-health",
    date: "2026-08-04",
    kind: "Policy",
    summary:
      "Several major trial registries now collect participant age, sex, and race or ethnicity in structured form rather than free text, making the data extractable without reading each record by hand.",
    whyItMatters:
      "Extraction for our clinical trial demographics review gets faster, and the screening log becomes reproducible.",
    tags: ["Clinical trials", "Demographics", "Registries"],
    relatedProject: "clinical-trial-diversity-review",
  },
  {
    id: "CB·NWS·0504",
    headline: "Benchmark leaderboards start reporting confidence intervals alongside scores",
    field: "computer-science",
    secondaryField: "artificial-intelligence",
    date: "2026-08-01",
    kind: "Method",
    summary:
      "A group of benchmark maintainers agreed to publish uncertainty estimates with every submitted score, after analyses showed many leaderboard gaps sat inside the noise of a single evaluation run.",
    whyItMatters:
      "The habit generalizes: a number without an interval tells you where a system landed once, not how it performs.",
    tags: ["Benchmarks", "Uncertainty", "Evaluation"],
  },
  {
    id: "CB·NWS·0503",
    headline: "Household finance survey adds a module on buy-now-pay-later use",
    field: "finance",
    secondaryField: "economics",
    date: "2026-07-29",
    kind: "Dataset",
    summary:
      "A national financial capability survey has added questions on short-term installment credit, including frequency of use, missed payments, and whether respondents recognized the products as borrowing.",
    whyItMatters:
      "It opens a question students can actually answer with public data: does financial literacy predict recognizing a product as debt?",
    tags: ["Household finance", "Credit", "Survey data"],
    relatedProject: "financial-literacy-curriculum-review",
    relatedPaper: "financial-literacy-college-students",
  },
  {
    id: "CB·NWS·0502",
    headline: "Freshwater microplastics group proposes a five-item minimum reporting set",
    field: "environmental-science",
    secondaryField: "chemistry",
    date: "2026-07-25",
    kind: "Method",
    summary:
      "A working group has proposed that every freshwater microplastic measurement be published with its mesh size, matrix, reporting unit, blank procedure, and identification method — the five variables that make cross-study comparison possible.",
    whyItMatters:
      "It is exactly the gap a student literature review in our library identified last spring.",
    tags: ["Microplastics", "Reporting standards", "Methods"],
    relatedPaper: "microplastics-freshwater-literature-review",
  },
  {
    id: "CB·NWS·0501",
    headline: "Room-temperature catalysis result withdrawn after independent labs fail to reproduce it",
    field: "chemistry",
    date: "2026-07-22",
    kind: "Correction",
    summary:
      "A widely shared catalysis finding has been withdrawn by its authors after three groups reported that the reaction did not proceed under the published conditions. The withdrawal notice details the instrument calibration error involved.",
    whyItMatters:
      "Read the withdrawal notice, not just the headline — it is a short, unusually clear account of how a measurement error becomes a published claim.",
    tags: ["Catalysis", "Reproducibility", "Retraction"],
  },
  {
    id: "CB·NWS·0499",
    headline: "Undergraduate telescope network opens observation time to high school students",
    field: "physics",
    date: "2026-07-18",
    kind: "Tool",
    summary:
      "A network of remotely operated telescopes has extended scheduling access to supervised secondary school groups, with a queue system and reduced-data downloads in standard formats.",
    whyItMatters:
      "Observation time is the usual barrier to a real astronomy project; a supervised group can now request it.",
    tags: ["Astronomy", "Instrumentation", "Access"],
  },
  {
    id: "CB·NWS·0498",
    headline: "Standard test protocol published for composites made from recycled feedstock",
    field: "engineering",
    date: "2026-07-15",
    kind: "Method",
    summary:
      "A standards body released a three-point bend protocol specific to recycled-content composites, covering sample geometry, curing conditions, and how to report discarded specimens.",
    whyItMatters:
      "Our materials project has been updated to follow it, which makes student results comparable to published work.",
    tags: ["Materials", "Testing", "Standards"],
    relatedProject: "materials-strength-testing",
  },
  {
    id: "CB·NWS·0496",
    headline: "Labor statistics series adds county-level detail for a decade of prior years",
    field: "economics",
    date: "2026-07-11",
    kind: "Dataset",
    summary:
      "A backfill of employment and payroll data to county level is now available for years that previously published only state totals, alongside documentation of how the smaller geographies were disclosed.",
    whyItMatters:
      "Local economic history projects gain a decade of comparison data that had to be requested individually before.",
    tags: ["Labor data", "Local economies", "Open data"],
    relatedPaper: "primary-sources-local-newspaper-history",
  },
  {
    id: "CB·NWS·0495",
    headline: "Small-business survey releases microdata for student and academic use",
    field: "business",
    date: "2026-07-08",
    kind: "Dataset",
    summary:
      "An annual small-business survey has published anonymized response-level data covering staffing, financing, and closure risk, replacing the summary tables that were previously the only public output.",
    whyItMatters:
      "Response-level data lets you ask your own question of the survey instead of reading someone else's cross-tab.",
    tags: ["Small business", "Microdata", "Survey"],
  },
  {
    id: "CB·NWS·0494",
    headline: "Municipal broadband programs required to publish adoption by census tract",
    field: "political-science",
    secondaryField: "economics",
    date: "2026-07-03",
    kind: "Policy",
    summary:
      "A state transparency rule now requires publicly funded broadband programs to report subscriber adoption at census-tract level on a fixed schedule, in a common format.",
    whyItMatters:
      "The normalization work that made our six-city comparison so slow largely disappears for programs covered by the rule.",
    tags: ["Broadband", "Transparency", "Local government"],
    relatedPaper: "municipal-broadband-policy-analysis",
  },
  {
    id: "CB·NWS·0492",
    headline: "Long-running community study publishes forty years of neighborhood interview transcripts",
    field: "sociology",
    secondaryField: "history",
    date: "2026-06-27",
    kind: "Dataset",
    summary:
      "A longitudinal community study has released four decades of de-identified interview transcripts with consent documentation, searchable by year and theme.",
    whyItMatters:
      "A rare chance to study interview methodology itself — the same questions asked of the same neighborhood across forty years.",
    tags: ["Oral history", "Qualitative data", "Longitudinal"],
    relatedProject: "local-oral-history",
  },
  {
    id: "CB·NWS·0491",
    headline: "State digitizes local newspaper microfilm archives through 1995",
    field: "history",
    date: "2026-06-24",
    kind: "Dataset",
    summary:
      "A state library completed digitization of local newspaper runs through 1995, with searchable text for most years and free access from any library card account.",
    whyItMatters:
      "Archival projects that previously required a trip to a county historical society can now start from home.",
    tags: ["Archives", "Primary sources", "Digitization"],
    relatedPaper: "primary-sources-local-newspaper-history",
  },
  {
    id: "CB·NWS·0489",
    headline: "Corpus of 19th-century periodicals released with page images and corrected text",
    field: "literature",
    date: "2026-06-20",
    kind: "Dataset",
    summary:
      "A digital humanities group published a corrected-text corpus of nineteenth-century literary periodicals, paired with page images so quotations can be checked against the original setting.",
    whyItMatters:
      "Close reading and computational text analysis can be done on the same source without switching editions.",
    tags: ["Digital humanities", "Corpora", "Periodicals"],
  },
  {
    id: "CB·NWS·0488",
    headline: "Multi-district study reports mixed results for later high school start times",
    field: "education",
    secondaryField: "psychology",
    date: "2026-06-17",
    kind: "New study",
    summary:
      "A study of districts that shifted start times later found gains in reported sleep duration but inconsistent effects on attendance and grades, with outcomes varying widely by transportation arrangement.",
    whyItMatters:
      "A good example of a policy whose effect depends on implementation details that headlines usually drop.",
    tags: ["School start times", "Policy evaluation", "Sleep"],
    relatedProject: "teen-sleep-academic-performance",
  },
  {
    id: "CB·NWS·0486",
    headline: "Food access maps switch from straight-line distance to transit travel time",
    field: "public-health",
    secondaryField: "sociology",
    date: "2026-06-13",
    kind: "Method",
    summary:
      "A federal food-access mapping tool added transit-time measures alongside its distance-based classification, after evaluations showed distance misclassified transit-dependent neighborhoods.",
    whyItMatters:
      "It is the measurement change a case study in our library argued for, now implemented at national scale.",
    tags: ["Food access", "Transit", "Measurement"],
    relatedPaper: "food-desert-transit-access-case-study",
  },
  {
    id: "CB·NWS·0484",
    headline: "Survey finds most published student research is never deposited anywhere permanent",
    field: "other",
    date: "2026-06-09",
    kind: "Report",
    summary:
      "A survey of secondary school research programs found that the large majority of completed student work exists only as a file on a personal device, with no dated copy in any repository.",
    whyItMatters:
      "Undeposited work is invisible and hard to defend as your own. Filing it somewhere with a date is the cheapest fix available.",
    tags: ["Student research", "Repositories", "Provenance"],
  },
  {
    id: "CB·NWS·0483",
    headline: "Open-weight models make headline-framing experiments runnable on a laptop",
    field: "artificial-intelligence",
    secondaryField: "sociology",
    date: "2026-06-05",
    kind: "Tool",
    summary:
      "A batch of small open-weight language models now runs locally on ordinary hardware, putting text-classification pipelines that once required cloud credits within reach of a school laptop.",
    whyItMatters:
      "Coding a few thousand headlines by hand is no longer the only option — though a human-coded subsample is still what makes the automated labels trustworthy.",
    tags: ["Open models", "Text analysis", "Accessibility"],
    relatedProject: "misinformation-headline-study",
  },
];

export const NEWS_KINDS: NewsKind[] = [
  "New study",
  "Preprint",
  "Dataset",
  "Report",
  "Method",
  "Policy",
  "Tool",
  "Correction",
];
