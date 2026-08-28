import type { FieldSlug } from "./fields";
import type { Difficulty, ResearchType } from "./taxonomy";

/**
 * SAMPLE CONTENT — every study below is illustrative placeholder material
 * written for this preview build. Replace this array with real published
 * work; the shape is stable and every page reads from it.
 */

export interface PaperFigure {
  caption: string;
  unit: string;
  series: { label: string; value: number }[];
}

export interface Paper {
  slug: string;
  /** Catalog record, e.g. CB·PSY·0142 */
  record: string;
  title: string;
  authors: { name: string; handle?: string; school: string; grade?: string }[];
  field: FieldSlug;
  secondaryField?: FieldSlug;
  type: ResearchType;
  difficulty: Difficulty;
  published: string; // ISO date
  readingMinutes: number;
  tags: string[];
  abstract: string;
  researchQuestion: string;
  background: string[];
  methodology: string[];
  findings: string[];
  figure?: PaperFigure;
  discussion: string[];
  conclusion: string[];
  references: string[];
  featured?: boolean;
  /** Sample engagement counts used for the "Most popular" sort. */
  reads: number;
  volume: string;
}

export const PAPERS: Paper[] = [
  {
    slug: "social-media-adolescent-sleep",
    record: "CB·PSY·0142",
    title: "How Social Media Usage Affects Adolescent Sleep Patterns",
    authors: [
      { name: "Maya Okonkwo", handle: "maya-okonkwo", school: "Riverbend High School", grade: "Class of 2026" },
      { name: "Devin Park", handle: "devin-park", school: "Riverbend High School", grade: "Class of 2027" },
    ],
    field: "psychology",
    secondaryField: "public-health",
    type: "Original Research",
    difficulty: "Intermediate",
    published: "2026-06-18",
    readingMinutes: 12,
    tags: ["Sleep", "Adolescence", "Screen time", "Survey research"],
    abstract:
      "Adolescents in the United States report shorter sleep duration than any prior measured generation, and screen-based media is the most frequently named suspect. This study surveyed 412 students across four public high schools on evening media use, bedtime, and self-reported sleep quality, then compared self-report against a two-week sleep diary kept by a 68-student subsample. Later evening use was associated with later bedtimes and lower sleep-quality ratings, but total daily screen time alone was a weak predictor. Timing and content type — specifically interactive, notification-driven use within the hour before bed — accounted for substantially more variance than duration.",
    researchQuestion:
      "Does the timing and type of evening social media use predict adolescent sleep duration and quality more strongly than total daily screen time?",
    background: [
      "The American Academy of Sleep Medicine recommends 8–10 hours of sleep nightly for teenagers, yet national survey data consistently show a majority of high school students sleeping under seven hours on school nights. The gap has widened over the same period that smartphone ownership among adolescents approached saturation, which has made the two trends easy to link and hard to disentangle.",
      "Most widely circulated claims rest on total screen time — a single daily number that treats a two-hour afternoon video call and twenty minutes of scrolling at midnight as equivalent. Sleep researchers have argued for over a decade that this is the wrong unit of measurement, since displacement of sleep opportunity, pre-sleep cognitive arousal, and light exposure all depend on when use occurs and what the use demands of the user.",
      "This study was designed around that critique. Rather than asking whether screens are harmful, it asks which properties of use — duration, timing, or interactivity — carry the association with sleep outcomes in a high school population.",
    ],
    methodology: [
      "A 34-item survey was distributed through health classes at four public high schools in a single metropolitan district, yielding 412 usable responses (grades 9–12; 54% female, 44% male, 2% another gender identity or declined). The instrument captured typical bedtime and wake time on school nights, a five-point sleep-quality rating adapted from the Pittsburgh Sleep Quality Index, daily screen-time totals read directly from device settings, and a structured recall of the final hour before bed.",
      "Media use was coded into three categories: passive (video, music, reading), interactive (messaging, commenting, posting, gaming), and mixed. Timing was binned into 30-minute intervals relative to self-reported bedtime.",
      "A subsample of 68 students who volunteered kept a two-week sleep diary recording bedtime, estimated sleep-onset latency, wake time, and a nightly quality rating. Diary entries were used to check self-report accuracy rather than to establish independent effects.",
      "Analysis used multiple linear regression with sleep duration and quality rating as outcomes, entering total screen time, last-hour interactive use, and last-hour passive use as predictors, with grade level and reported extracurricular load as controls. All procedures were reviewed by a faculty sponsor; participation was voluntary, anonymous, and required parental consent for students under 18.",
    ],
    findings: [
      "Total daily screen time was a weak predictor of sleep duration (β = −0.11, p = .07) and did not reach significance for sleep quality. Interactive use within the hour before bed was the strongest single predictor in both models, associated with roughly 34 fewer minutes of sleep on average and a 0.8-point drop on the five-point quality scale.",
      "Passive use in the same window showed a smaller and less consistent association. Students who reported keeping a phone within reach overnight reported 1.4 more nighttime awakenings per week than those who charged devices outside the bedroom.",
      "Diary data from the subsample tracked survey self-report closely for bedtime (r = .81) but diverged for sleep-onset latency, which students underestimated in the survey by a median of 11 minutes.",
    ],
    figure: {
      caption: "Mean reported school-night sleep duration by last-hour media pattern (n = 412).",
      unit: "hours",
      series: [
        { label: "No media in final hour", value: 7.9 },
        { label: "Passive media only", value: 7.4 },
        { label: "Mixed", value: 6.9 },
        { label: "Interactive media", value: 6.5 },
      ],
    },
    discussion: [
      "The pattern points away from a simple dose-response story. If screen exposure alone drove sleep loss, total daily time would carry the association; it did not. What predicted shorter and worse sleep was interactive use in the pre-sleep window — the kind of use that invites a reply, sustains a conversation, and has no natural stopping point.",
      "That reading is consistent with the cognitive-arousal literature, but this study cannot establish direction. Students who are already having trouble falling asleep may reach for a phone precisely because they are awake, which would produce the same correlation. The diary subsample was self-selected and small, and every measure of sleep here is self-reported rather than actigraphic.",
      "The self-report gap on sleep-onset latency deserves attention on its own. Students appear to notice when they went to bed but not how long they lay awake, which means surveys asking only about bedtime may systematically overstate adolescent sleep.",
    ],
    conclusion: [
      "Among 412 high school students, when and how adolescents used media before bed predicted sleep outcomes more strongly than how much they used it overall. Interventions framed around total screen-time reduction may be aiming at the least informative variable.",
      "A stronger follow-up would pair actigraphy with randomized assignment to a device-free pre-sleep hour. Until then, the practical implication is narrow but usable: the last hour is the one that matters, and interactive media is the harder habit to set down.",
    ],
    references: [
      "American Academy of Sleep Medicine. (2016). Recommended amount of sleep for pediatric populations: A consensus statement. Journal of Clinical Sleep Medicine, 12(6), 785–786.",
      "Buysse, D. J., et al. (1989). The Pittsburgh Sleep Quality Index: A new instrument for psychiatric practice and research. Psychiatry Research, 28(2), 193–213.",
      "Carskadon, M. A. (2011). Sleep in adolescents: The perfect storm. Pediatric Clinics of North America, 58(3), 637–647.",
      "Hale, L., & Guan, S. (2015). Screen time and sleep among school-aged children and adolescents: A systematic literature review. Sleep Medicine Reviews, 21, 50–58.",
      "Orben, A., & Przybylski, A. K. (2019). The association between adolescent well-being and digital technology use. Nature Human Behaviour, 3(2), 173–182.",
    ],
    featured: true,
    reads: 4820,
    volume: "Vol. 4, No. 2",
  },
  {
    slug: "machine-learning-early-disease-detection",
    record: "CB·AIN·0118",
    title: "Analyzing the Effectiveness of Machine Learning in Early Disease Detection",
    authors: [
      { name: "Rafael Duarte", handle: "rafael-duarte", school: "Northgate Academy", grade: "Class of 2026" },
    ],
    field: "artificial-intelligence",
    secondaryField: "medicine-health",
    type: "Systematic Review",
    difficulty: "Advanced",
    published: "2026-05-30",
    readingMinutes: 16,
    tags: ["Machine learning", "Diagnostics", "Model evaluation", "Clinical AI"],
    abstract:
      "Claims that machine learning can detect disease earlier than clinicians are now common in both press coverage and peer-reviewed literature. This systematic review screened 214 studies published between 2019 and 2025 on ML-based early detection across oncology, ophthalmology, and cardiology, and retained 47 that reported external validation on a population distinct from the training set. Reported performance dropped substantially between internal and external validation in 38 of 47 studies, with a median AUC decrease of 0.09. Studies that documented data provenance and demographic composition of the training set were markedly less likely to show large external drops.",
    researchQuestion:
      "How much of the reported diagnostic performance of machine learning models for early disease detection survives external validation, and which reporting practices predict a smaller drop?",
    background: [
      "Diagnostic machine learning has advanced quickly enough that regulatory bodies now clear dozens of algorithms annually. The headline metric is almost always area under the receiver operating characteristic curve (AUC), reported on a held-out split of the same dataset used for training.",
      "A held-out split shares acquisition equipment, patient demographics, labeling conventions, and institutional practice with the training data. External validation — testing on data from a different site or population — is the standard that clinical adoption actually requires, and it is reported far less often.",
      "This review does not evaluate whether ML detection works. It evaluates how reliably published performance figures transfer, and whether reporting quality is a usable signal for readers who cannot audit the models themselves.",
    ],
    methodology: [
      "Searches were run in PubMed, IEEE Xplore, and arXiv for studies published January 2019 through December 2025 using combinations of 'early detection', 'screening', 'machine learning', and 'deep learning' with disease-area terms. Preprints were included but flagged separately.",
      "Inclusion required: a diagnostic or screening task, a reported discrimination metric, and at least one evaluation on data collected at a site or from a population not represented in training. Studies reporting only cross-validation on a single dataset were excluded.",
      "Each retained study was coded on eleven items adapted from the TRIPOD-AI reporting checklist, including dataset provenance, demographic reporting, class balance, calibration reporting, and code or model availability.",
      "Because outcome metrics and disease areas varied, results are summarized descriptively rather than pooled. No meta-analytic estimate is reported, and this review was not preregistered — both are limitations, not oversights.",
    ],
    findings: [
      "Of 214 screened studies, 47 met the external-validation requirement — 22 percent. Among those, median internal AUC was 0.94 and median external AUC was 0.85.",
      "Nine studies showed external performance within 0.02 of internal performance. Eight of those nine reported training-set demographics in full; among the studies with the largest drops, fewer than a third did.",
      "Calibration was reported in 14 of 47 studies. Sensitivity at a clinically specified operating point — the number a screening program would actually use — appeared in 19.",
      "Code or trained weights were available for 11 studies. Availability was not associated with smaller performance drops, but it was the only item that made independent verification possible at all.",
    ],
    figure: {
      caption: "Reporting-checklist items present, share of the 47 externally validated studies.",
      unit: "% of studies",
      series: [
        { label: "Dataset provenance", value: 62 },
        { label: "Training demographics", value: 45 },
        { label: "Operating-point sensitivity", value: 40 },
        { label: "Calibration", value: 30 },
        { label: "Code or weights released", value: 23 },
      ],
    },
    discussion: [
      "The central finding is unglamorous: most published early-detection models have never been tested outside the conditions that produced them, and among those that have, roughly a tenth of an AUC point goes missing. For a screening tool operating near a decision threshold, that difference is not academic.",
      "The association between demographic reporting and performance stability is correlational and easily explained by a third factor — research groups careful enough to document their data are likely careful in other ways. It is still a practical heuristic for a reader deciding how much weight to give a result.",
      "This review inherits the biases of its sources. Studies with disappointing external results are less likely to be published at all, so the observed median drop is probably optimistic. Screening and coding were performed by a single reviewer, which introduces error that a second independent coder would have caught.",
    ],
    conclusion: [
      "External validation remains the exception rather than the rule in published machine learning work on early disease detection, and reported performance systematically overstates what transfers to new populations.",
      "For student readers, the usable takeaway is a reading protocol: before accepting a performance claim, find out what data trained the model, who was in it, and whether the number quoted came from the same source as the training data.",
    ],
    references: [
      "Collins, G. S., et al. (2024). TRIPOD+AI statement: Updated guidance for reporting clinical prediction models that use regression or machine learning methods. BMJ, 385, e078378.",
      "Futoma, J., et al. (2020). The myth of generalisability in clinical research and machine learning in health care. The Lancet Digital Health, 2(9), e489–e492.",
      "Kelly, C. J., et al. (2019). Key challenges for delivering clinical impact with artificial intelligence. BMC Medicine, 17(1), 195.",
      "Wynants, L., et al. (2020). Prediction models for diagnosis and prognosis of covid-19: Systematic review and critical appraisal. BMJ, 369, m1328.",
      "Zech, J. R., et al. (2018). Variable generalization performance of a deep learning model to detect pneumonia in chest radiographs. PLOS Medicine, 15(11), e1002683.",
    ],
    featured: true,
    reads: 6140,
    volume: "Vol. 4, No. 2",
  },
  {
    slug: "financial-literacy-college-students",
    record: "CB·FIN·0097",
    title: "The Economic Impact of Financial Literacy Among College Students",
    authors: [
      { name: "Priya Raghunathan", handle: "priya-raghunathan", school: "Westlake STEM Magnet", grade: "Class of 2027" },
      { name: "Jonah Weiss", school: "Westlake STEM Magnet", grade: "Class of 2026" },
    ],
    field: "finance",
    secondaryField: "economics",
    type: "Data Analysis",
    difficulty: "Intermediate",
    published: "2026-05-12",
    readingMinutes: 10,
    tags: ["Financial literacy", "Student debt", "Public datasets", "Regression"],
    abstract:
      "Using three waves of a publicly available national financial capability dataset, this analysis examines whether measured financial literacy among 18–24 year olds enrolled in postsecondary education predicts borrowing behavior, emergency savings, and high-cost credit use. Literacy scores were associated with lower reliance on high-cost borrowing and higher likelihood of holding a three-month emergency buffer, but the association with total student loan balance was near zero once parental education and household income were controlled.",
    researchQuestion:
      "Among enrolled college students aged 18–24, is measured financial literacy associated with borrowing behavior and short-term financial resilience after accounting for family background?",
    background: [
      "Financial education mandates have expanded rapidly at the state level, usually justified by the claim that students who understand interest, inflation, and diversification will borrow more carefully. The evidence base behind that claim is more mixed than the policy debate suggests.",
      "Two measurement problems recur. Literacy is typically assessed with a short three-to-five item quiz, and outcomes such as loan balance are heavily determined by family resources rather than by any decision the student makes. Studies that omit family background tend to report much larger literacy effects.",
    ],
    methodology: [
      "Data came from three waves of a national financial capability study, restricted to respondents aged 18–24 currently enrolled in a two- or four-year institution (n ≈ 5,900 pooled). All data are public, de-identified, and were accessed under the distributor's standard terms.",
      "The independent variable was the standard five-item literacy index. Outcomes were: any use of high-cost borrowing in the prior 12 months, presence of three months of emergency savings, and total education debt reported in bands.",
      "Logistic regression was used for the binary outcomes and ordered logistic regression for debt bands. Models were run first unadjusted, then adjusted for age, parental education, household income band, enrollment intensity, and employment status. Survey weights were applied.",
    ],
    findings: [
      "Unadjusted, each additional correct literacy item was associated with a 19 percent lower odds of high-cost borrowing. Adjusted for family background, the association attenuated but remained meaningful at 11 percent lower odds per item.",
      "The odds of holding three months of emergency savings rose with literacy in both unadjusted and adjusted models.",
      "For total education debt, the adjusted coefficient was small and did not reach conventional significance. Parental education and household income band were by far the dominant predictors.",
    ],
    figure: {
      caption: "Adjusted change in odds per additional correct literacy item.",
      unit: "% change in odds",
      series: [
        { label: "High-cost borrowing", value: -11 },
        { label: "Emergency savings (3 mo.)", value: 14 },
        { label: "Total education debt", value: -2 },
      ],
    },
    discussion: [
      "Financial literacy appears to matter most for the decisions students actually control month to month — whether to carry a balance, whether to use a payday or pawn product, whether to hold a buffer. It appears to matter little for the size of an education loan, which is largely set by tuition and family contribution before the student weighs in.",
      "This is a cross-sectional association and cannot support a causal claim. Literacy scores may proxy for numeracy, conscientiousness, or exposure to financially stable adults. A five-item index is also a coarse instrument.",
    ],
    conclusion: [
      "Financial literacy tracked short-term financial resilience among enrolled students but not total education debt once family background was accounted for.",
      "Policy framed around literacy as a solution to student debt is aiming at an outcome literacy does not appear to move. Framed around avoiding high-cost credit and building a buffer, the case is stronger.",
    ],
    references: [
      "FINRA Investor Education Foundation. (2022). National Financial Capability Study: Methodology report.",
      "Fernandes, D., Lynch, J. G., & Netemeyer, R. G. (2014). Financial literacy, financial education, and downstream financial behaviors. Management Science, 60(8), 1861–1883.",
      "Lusardi, A., & Mitchell, O. S. (2014). The economic importance of financial literacy: Theory and evidence. Journal of Economic Literature, 52(1), 5–44.",
      "Urban, C., et al. (2020). The effects of high school personal financial education policies on financial behavior. Economics of Education Review, 78, 101786.",
    ],
    featured: true,
    reads: 3310,
    volume: "Vol. 4, No. 1",
  },
  {
    slug: "urban-green-space-student-wellbeing",
    record: "CB·ENV·0131",
    title: "Urban Green Spaces and Their Relationship With Student Wellbeing",
    authors: [
      { name: "Amara Bello", handle: "amara-bello", school: "Lincoln Park High School", grade: "Class of 2026" },
    ],
    field: "environmental-science",
    secondaryField: "public-health",
    type: "Case Study",
    difficulty: "Introductory",
    published: "2026-04-27",
    readingMinutes: 9,
    tags: ["Green space", "Wellbeing", "Urban planning", "GIS"],
    abstract:
      "This case study examines eleven public high schools in one mid-sized city, pairing satellite-derived tree canopy and park-access measures within a half-mile of each campus against school-level wellbeing indicators drawn from a district climate survey. Schools in the highest canopy tertile reported higher scores on belonging and perceived safety, though the relationship weakened once neighborhood median income was accounted for. The study is framed as a descriptive case rather than a causal test.",
    researchQuestion:
      "Do high schools with greater surrounding tree canopy and park access report higher student wellbeing indicators, and does that pattern hold within income strata?",
    background: [
      "Exposure to green space has been linked to lower reported stress, better attention restoration, and improved mood across a range of populations. Much of the school-focused work has been conducted in elementary settings or in countries with different urban forms.",
      "Green space is also unevenly distributed. In most American cities, canopy cover correlates strongly with historic disinvestment patterns, which means any raw association between greenery and wellbeing risks restating an income gradient in ecological language.",
    ],
    methodology: [
      "Tree canopy percentage and park area within a 0.5-mile network buffer of each campus were computed from a public municipal GIS layer and a national land-cover dataset using open-source tools.",
      "Wellbeing indicators came from the district's annual school climate survey, which is published at school level: belonging, perceived safety, and school connectedness, each reported as a percent-favorable score.",
      "Schools were grouped into canopy tertiles. Because n = 11, analysis is descriptive: group means, ranges, and a within-tertile comparison against neighborhood median household income from census data. No inferential test is reported, and none would be appropriate at this sample size.",
    ],
    findings: [
      "Schools in the top canopy tertile averaged 71 percent favorable on belonging versus 58 percent in the bottom tertile. Perceived safety showed a similar gap.",
      "Canopy cover and neighborhood median income were themselves highly correlated across the eleven campuses, so the tertiles differ on much more than trees.",
      "Two schools broke the pattern: one high-canopy campus in a lower-income neighborhood scored above the district mean on belonging, and one low-canopy campus with a recently renovated courtyard scored near the top on connectedness.",
    ],
    discussion: [
      "With eleven schools, the honest description is a pattern worth investigating rather than a finding. The two off-pattern schools are the most interesting cases here, since both suggest that accessible, maintained outdoor space on campus may matter separately from canopy in the surrounding blocks.",
      "School-level survey aggregates also cannot speak to individual student experience, and the climate survey was not designed as a wellbeing instrument.",
    ],
    conclusion: [
      "Surrounding greenery tracked school wellbeing indicators in this eleven-school case, but the association is entangled with neighborhood income and cannot be separated at this scale.",
      "A useful next step is student-level data at a single campus before and after a schoolyard greening project, which would hold neighborhood conditions fixed.",
    ],
    references: [
      "Browning, M., & Rigolon, A. (2019). School green space and its impact on academic performance: A systematic literature review. International Journal of Environmental Research and Public Health, 16(3), 429.",
      "Kuo, M., Barnes, M., & Jordan, C. (2019). Do experiences with nature promote learning? Frontiers in Psychology, 10, 305.",
      "Nesbitt, L., et al. (2019). Who has access to urban vegetation? A spatial analysis of distributional green equity. Landscape and Urban Planning, 181, 51–79.",
    ],
    featured: true,
    reads: 2470,
    volume: "Vol. 4, No. 1",
  },
  {
    slug: "antibiotic-resistance-soil-isolates",
    record: "CB·BIO·0088",
    title: "Screening Local Soil Isolates for Antibiotic-Resistant Bacterial Growth",
    authors: [{ name: "Theo Marchetti", handle: "theo-marchetti", school: "Cedar Ridge High School", grade: "Class of 2027" }],
    field: "biology",
    type: "Experimental Study",
    difficulty: "Advanced",
    published: "2026-04-09",
    readingMinutes: 14,
    tags: ["Microbiology", "Antibiotic resistance", "Culture methods", "Lab work"],
    abstract:
      "Soil samples from six sites varying in agricultural and residential land use were cultured and screened for growth on media containing ampicillin and tetracycline at standard screening concentrations. Resistant colony-forming units per gram were highest in samples taken adjacent to livestock operations and lowest in an undeveloped preserve. All work was conducted under school laboratory supervision at biosafety level 1 with non-clinical environmental isolates.",
    researchQuestion:
      "Does the density of antibiotic-resistant culturable bacteria in soil differ across sites with different land use in one county?",
    background: [
      "Environmental reservoirs of antibiotic resistance genes are an established concern in public health, and agricultural antibiotic use is one documented contributor. Soil is a practical medium for student-level surveys because sampling is non-invasive and culture methods are within the reach of a supervised high school lab.",
      "Culture-based screening captures only the fraction of soil bacteria that grow on standard media — a small minority — so results describe culturable resistant organisms rather than the full resistome.",
    ],
    methodology: [
      "Six sites were sampled: two adjacent to livestock operations, two residential, one municipal park, one undeveloped preserve. Three replicate cores were taken per site at 5 cm depth using sterilized tools.",
      "Samples were serially diluted in sterile saline and plated on nutrient agar, nutrient agar with ampicillin (100 µg/mL), and nutrient agar with tetracycline (15 µg/mL). Plates were incubated at 30 °C for 48 hours and colonies counted at dilutions yielding 30–300 CFU.",
      "Resistant fraction was computed as CFU on antibiotic media divided by CFU on plain nutrient agar for each replicate. All culturing, handling, and disposal followed BSL-1 procedures under a supervising instructor; no clinical or human-derived samples were used, and no isolates were characterized beyond growth.",
    ],
    findings: [
      "Mean ampicillin-resistant fraction ranged from 0.9 percent at the preserve site to 7.6 percent adjacent to livestock. Tetracycline-resistant fractions followed the same ordering at lower magnitudes.",
      "Replicate variance within sites was substantial, particularly at the residential sites, where one core produced a resistant fraction three times the site mean.",
      "Total culturable counts did not differ systematically across sites, so the resistant fraction differences are not an artifact of overall bacterial density.",
    ],
    figure: {
      caption: "Mean ampicillin-resistant fraction of culturable soil bacteria by site type.",
      unit: "% of CFU",
      series: [
        { label: "Livestock-adjacent", value: 7.6 },
        { label: "Residential", value: 4.1 },
        { label: "Municipal park", value: 2.8 },
        { label: "Undeveloped preserve", value: 0.9 },
      ],
    },
    discussion: [
      "The site ordering matches what the agricultural-use literature would predict, which is reassuring but not independent evidence. With six sites and three replicates each, this is a descriptive survey; land use is confounded with soil composition, moisture, and prior land history, none of which were measured.",
      "Growth on antibiotic-containing media indicates phenotypic resistance under these conditions only. Confirming genotype would require molecular work beyond the scope and biosafety level of this study.",
    ],
    conclusion: [
      "Culturable antibiotic-resistant bacteria were more abundant in livestock-adjacent soil than in undeveloped soil in this county survey.",
      "The method is reproducible in a supervised high school lab and could support a larger multi-site sampling design, ideally paired with soil chemistry measurement.",
    ],
    references: [
      "Berendonk, T. U., et al. (2015). Tackling antibiotic resistance: The environmental framework. Nature Reviews Microbiology, 13(5), 310–317.",
      "CDC. (2019). Antibiotic resistance threats in the United States. U.S. Department of Health and Human Services.",
      "Forsberg, K. J., et al. (2014). Bacterial phylogeny structures soil resistomes across habitats. Nature, 509(7502), 612–616.",
    ],
    reads: 1980,
    volume: "Vol. 4, No. 1",
  },
  {
    slug: "attention-restoration-study-breaks",
    record: "CB·NEU·0076",
    title: "Break Structure and Sustained Attention During Extended Study Sessions",
    authors: [{ name: "Sofia Nakamura", handle: "sofia-nakamura", school: "Hilltop Preparatory", grade: "Class of 2026" }],
    field: "neuroscience",
    secondaryField: "education",
    type: "Experimental Study",
    difficulty: "Intermediate",
    published: "2026-03-22",
    readingMinutes: 11,
    tags: ["Attention", "Study habits", "Cognitive testing", "Within-subjects"],
    abstract:
      "Forty-two students completed three 90-minute study sessions under different break conditions — no break, two screen-based breaks, and two movement breaks — in a counterbalanced within-subjects design. Sustained attention was measured with a brief continuous performance task at the start and end of each session. Movement breaks were associated with the smallest end-of-session decline in attention; screen-based breaks performed no better than no break at all.",
    researchQuestion:
      "Does the type of break taken during a long study session affect the decline in sustained attention measured at the end of the session?",
    background: [
      "Sustained attention declines predictably over time on task — the vigilance decrement — and break-taking is the standard countermeasure. Popular study advice specifies break timing in detail while saying almost nothing about what a break should contain.",
      "Attention restoration theory predicts that restorative activity should differ from the demanding task along specific dimensions. A break spent on a phone may share the demand profile of the work it interrupts.",
    ],
    methodology: [
      "Forty-two volunteers (grades 10–12) each completed three 90-minute supervised study sessions on their own coursework, separated by at least 48 hours, in a counterbalanced order across three conditions: continuous work, two 7-minute screen breaks, two 7-minute walking breaks.",
      "Attention was measured with a 4-minute continuous performance task administered at minute 0 and minute 90. The outcome was change in correct-response rate and mean reaction-time variability.",
      "Participants logged perceived effort and self-rated focus after each session. Condition order was randomized per participant; the researcher administering the task was not blind to condition, which is a limitation.",
    ],
    findings: [
      "Correct-response rate declined in all three conditions. The mean decline was 9.4 percentage points with no break, 8.1 with screen breaks, and 3.6 with movement breaks.",
      "Reaction-time variability increased least in the movement condition.",
      "Self-rated focus did not distinguish the conditions; participants rated screen breaks as more refreshing than walking breaks despite performing worse after them.",
    ],
    figure: {
      caption: "Mean decline in continuous-performance accuracy over a 90-minute session.",
      unit: "pp decline",
      series: [
        { label: "No break", value: 9.4 },
        { label: "Screen break", value: 8.1 },
        { label: "Movement break", value: 3.6 },
      ],
    },
    discussion: [
      "The divergence between measured performance and self-rated refreshment is the most useful result here: students appear to be poor judges of which breaks restore attention. That has direct implications for advice that tells students to take breaks without specifying what kind.",
      "Sessions used participants' own coursework, so cognitive load varied across sessions and participants. The unblinded administration and modest sample also mean the effect size should be treated as provisional.",
    ],
    conclusion: [
      "Movement breaks preserved sustained attention across a long study session better than screen breaks, which were indistinguishable from working straight through.",
      "Replication with blinded administration and standardized task material would strengthen the claim considerably.",
    ],
    references: [
      "Ariga, A., & Lleras, A. (2011). Brief and rare mental breaks keep you focused. Cognition, 118(3), 439–443.",
      "Kaplan, S. (1995). The restorative benefits of nature: Toward an integrative framework. Journal of Environmental Psychology, 15(3), 169–182.",
      "Warm, J. S., Parasuraman, R., & Matthews, G. (2008). Vigilance requires hard mental work and is stressful. Human Factors, 50(3), 433–441.",
    ],
    reads: 2905,
    volume: "Vol. 3, No. 4",
  },
  {
    slug: "municipal-broadband-policy-analysis",
    record: "CB·POL·0064",
    title: "Municipal Broadband Programs: A Comparative Policy Analysis of Six Cities",
    authors: [
      { name: "Grace Whitfield", handle: "grace-whitfield", school: "Eastern Shore High School", grade: "Class of 2026" },
      { name: "Ibrahim Sesay", school: "Eastern Shore High School", grade: "Class of 2026" },
    ],
    field: "political-science",
    secondaryField: "economics",
    type: "Policy Analysis",
    difficulty: "Intermediate",
    published: "2026-03-04",
    readingMinutes: 13,
    tags: ["Broadband", "Local government", "Digital divide", "Comparative policy"],
    abstract:
      "Six municipal broadband initiatives launched between 2010 and 2021 are compared on governance model, financing structure, stated equity goals, and publicly reported adoption. Programs structured as public utilities reported higher adoption in low-income census tracts than public-private partnerships, though the two groups differed in starting conditions. Reporting practices varied so widely that cross-city comparison required substantial normalization.",
    researchQuestion:
      "How do governance and financing models of municipal broadband programs relate to reported adoption in low-income areas?",
    background: [
      "Roughly one in five American households lacks a home broadband subscription, and the gap tracks income closely. Cities have responded with a range of models, from fully municipal fiber utilities to subsidized partnerships with incumbent providers.",
      "Evaluation is complicated by the fact that cities choose their model based on local conditions — legal restrictions, existing infrastructure, political composition — so outcome differences partly reflect selection rather than program design.",
    ],
    methodology: [
      "Six cities were selected to vary on governance model while remaining comparable in population band (100,000–500,000). Sources were city council records, program annual reports, bond documents, and FCC broadband deployment data.",
      "Each program was coded on governance model, capital source, subsidy design, stated equity commitment, and reported adoption rate overall and in tracts below the city median income.",
      "Where adoption was reported on different bases, figures were normalized to households passed. Cases where normalization was not possible are flagged rather than estimated.",
    ],
    findings: [
      "Three utility-model programs reported low-income tract adoption between 34 and 51 percent; three partnership programs reported 19 to 33 percent.",
      "Only two of six programs published adoption broken out by income or geography without a records request.",
      "Every program with an explicit affordability tier in its enabling ordinance reported higher low-income adoption than programs where affordability was left to operator discretion.",
    ],
    discussion: [
      "The utility-versus-partnership gap is real in the reported numbers but should not be read as a clean policy verdict. Cities that chose the utility model tended to face fewer state preemption constraints and had more favorable existing conduit, both of which independently ease deployment.",
      "The stronger and less confounded observation concerns codification: writing an affordability tier into the ordinance, rather than into a contract negotiated later, tracked with better low-income outcomes across both governance models.",
    ],
    conclusion: [
      "Governance model correlated with equity outcomes across six municipal broadband programs, but codified affordability requirements were the more consistent distinguishing feature.",
      "Standardized public reporting requirements would make this class of comparison far more tractable for future analysts.",
    ],
    references: [
      "Federal Communications Commission. (2024). Broadband deployment report.",
      "Gillett, S. E., et al. (2006). Measuring the economic impact of broadband deployment. U.S. Economic Development Administration.",
      "Whitacre, B., Gallardo, R., & Strover, S. (2014). Broadband's contribution to economic growth in rural areas. Telecommunications Policy, 38(11), 1011–1023.",
    ],
    reads: 1620,
    volume: "Vol. 3, No. 4",
  },
  {
    slug: "microplastics-freshwater-literature-review",
    record: "CB·ENV·0059",
    title: "Microplastic Accumulation in Freshwater Systems: A Literature Review",
    authors: [{ name: "Daniel Ferreira", handle: "daniel-ferreira", school: "Bayview High School", grade: "Class of 2027" }],
    field: "environmental-science",
    secondaryField: "chemistry",
    type: "Literature Review",
    difficulty: "Introductory",
    published: "2026-02-14",
    readingMinutes: 8,
    tags: ["Microplastics", "Freshwater", "Sampling methods", "Review"],
    abstract:
      "This review synthesizes 31 studies of microplastic concentration in rivers and lakes published between 2016 and 2025, focusing on how sampling mesh size and reporting units affect comparability. Reported concentrations span six orders of magnitude across studies, and most of that spread is attributable to methodological differences rather than to real environmental variation.",
    researchQuestion:
      "How much of the variation in reported freshwater microplastic concentrations is explained by differences in sampling and reporting methodology?",
    background: [
      "Microplastic contamination of freshwater is now documented on every continent, but the field grew faster than its standards. Studies use different net mesh sizes, different density-separation media, and report concentrations per cubic meter, per liter, or per kilogram of sediment.",
      "Mesh size matters enormously because particle abundance rises steeply as size decreases. A 333 µm net and a 20 µm net sampling the same water can differ by two orders of magnitude.",
    ],
    methodology: [
      "Thirty-one studies were located through Web of Science and Google Scholar and retained if they reported a numeric concentration, a stated mesh or filter size, and a described separation protocol.",
      "Each was coded for mesh size, matrix (surface water, water column, sediment), reporting unit, polymer identification method, and whether procedural blanks were run.",
      "Studies were grouped by mesh band and reported concentration ranges compared within and across bands. No conversion between incompatible units was attempted.",
    ],
    findings: [
      "Studies using filters below 50 µm reported median concentrations roughly 100 times higher than those using 300 µm or larger nets.",
      "Procedural blanks were reported in 18 of 31 studies. Polymer identification by spectroscopy rather than visual sorting appeared in 21.",
      "Only nine studies reported concentrations in units that permitted direct comparison with more than half the rest of the set.",
    ],
    discussion: [
      "The practical conclusion for a reader is that a single reported microplastic concentration carries almost no meaning without its mesh size attached. Cross-study comparison, including in several widely cited summaries, frequently ignores this.",
      "As a student review conducted by one person without a second screener, this synthesis is subject to selection and coding error, and the search was limited to English-language publications.",
    ],
    conclusion: [
      "Methodological heterogeneity, not environmental variation, dominates the spread in reported freshwater microplastic concentrations.",
      "Field-wide adoption of a minimum reporting set — mesh size, matrix, unit, blank procedure, identification method — would do more for comparability than additional sampling.",
    ],
    references: [
      "Koelmans, A. A., et al. (2019). Microplastics in freshwaters and drinking water: Critical review and assessment of data quality. Water Research, 155, 410–422.",
      "Hidalgo-Ruz, V., et al. (2012). Microplastics in the marine environment: A review of the methods used for identification and quantification. Environmental Science & Technology, 46(6), 3060–3075.",
      "Prata, J. C., et al. (2019). Methods for sampling and detection of microplastics in water and sediment. TrAC Trends in Analytical Chemistry, 110, 150–159.",
    ],
    reads: 2140,
    volume: "Vol. 3, No. 3",
  },
  {
    slug: "food-desert-transit-access-case-study",
    record: "CB·PBH·0051",
    title: "Transit Access and Grocery Availability: A Neighborhood Case Study",
    authors: [{ name: "Alex Johnson", handle: "alex-johnson", school: "Franklin High School", grade: "Class of 2026" }],
    field: "public-health",
    secondaryField: "sociology",
    type: "Case Study",
    difficulty: "Introductory",
    published: "2026-01-28",
    readingMinutes: 7,
    tags: ["Food access", "Transit", "GIS", "Community health"],
    abstract:
      "This case study maps grocery availability against public transit service in four adjacent neighborhoods, measuring travel time to the nearest full-service grocery store by bus versus car. Two neighborhoods classified as having adequate grocery access by straight-line distance had transit travel times exceeding 40 minutes each way, suggesting that distance-based food access measures understate the burden for households without a vehicle.",
    researchQuestion:
      "Does straight-line distance to a grocery store accurately represent food access for households relying on public transit?",
    background: [
      "Federal food-access measures commonly define a low-access area by distance — typically one mile in urban settings — to the nearest supermarket. Distance is easy to compute and easy to map, which is much of its appeal.",
      "Households without a car experience distance through transit schedules, transfers, and the practical limit of what a person can carry. A mile across a highway with one hourly bus is not the same mile as a mile down a sidewalk.",
    ],
    methodology: [
      "Four adjacent neighborhoods were selected, two above and two below the federal low-access distance threshold. Grocery locations were verified in person and by phone rather than taken from a commercial database.",
      "Travel time was computed from each neighborhood's population-weighted center to the nearest verified full-service grocery using a public transit routing API at 10:00 on a weekday, and by car using the same origin-destination pair.",
      "Vehicle access rates came from census estimates. No human subjects were involved.",
    ],
    findings: [
      "Car travel times ranged from 4 to 11 minutes across all four neighborhoods. Transit times ranged from 12 to 47 minutes.",
      "The two neighborhoods that met the federal distance standard had the longest transit times, both requiring a transfer.",
      "Verification found two stores listed in commercial databases that had closed and one that stocked no fresh produce despite being categorized as a supermarket.",
    ],
    discussion: [
      "Distance-based classification misclassified the two neighborhoods with the worst practical access in this case. The finding is local and involves four neighborhoods, so it demonstrates a measurement problem rather than quantifying one.",
      "The database verification result is a methodological note worth carrying forward: food-access studies relying on unverified commercial listings will include stores that do not exist and stores that do not sell food.",
    ],
    conclusion: [
      "Straight-line distance understated food access burden for transit-dependent households in all four neighborhoods studied.",
      "Transit-time-based measures are computable with public routing APIs and would be a straightforward improvement to neighborhood food access assessment.",
    ],
    references: [
      "Ver Ploeg, M., et al. (2009). Access to affordable and nutritious food: Measuring and understanding food deserts. USDA Economic Research Service.",
      "Widener, M. J. (2018). Spatial access to food: Retiring the food desert metaphor. Physiology & Behavior, 193, 257–260.",
      "Liese, A. D., et al. (2010). Validation of 3 food outlet databases. American Journal of Epidemiology, 172(11), 1324–1333.",
    ],
    reads: 1780,
    volume: "Vol. 3, No. 3",
  },
  {
    slug: "primary-sources-local-newspaper-history",
    record: "CB·HIS·0043",
    title: "Reading a Town Through Its Newspaper: Local Coverage of Industrial Closure, 1978–1992",
    authors: [{ name: "Nora Lindqvist", handle: "nora-lindqvist", school: "Millbrook Regional High", grade: "Class of 2027" }],
    field: "history",
    secondaryField: "sociology",
    type: "Research Report",
    difficulty: "Advanced",
    published: "2025-12-11",
    readingMinutes: 15,
    tags: ["Archival research", "Deindustrialization", "Primary sources", "Local history"],
    abstract:
      "Drawing on fourteen years of a single local newspaper's archive, this report traces how coverage of a mill closure shifted from economic reporting to civic identity narrative across three phases. The analysis uses a coded sample of 486 articles and situates the local account against county employment records, arguing that the paper's framing lagged material conditions by roughly four years.",
    researchQuestion:
      "How did local newspaper framing of industrial closure change over time, and how closely did that framing track measurable economic conditions?",
    background: [
      "Deindustrialization has been studied extensively at national and regional scale. Local newspapers offer a finer-grained record of how communities narrated the change to themselves while it was happening.",
      "A single paper is not a neutral instrument. Ownership, advertiser relationships, and the personal position of an editor all shape coverage, and those influences are part of what the source can tell us.",
    ],
    methodology: [
      "The full run of the paper from 1978 to 1992 was consulted on microfilm at the county historical society. Articles mentioning the mill, employment, or the local economy were identified by index and by page-by-page scan of front sections for a 20 percent sample of issues.",
      "486 articles were coded on frame (economic, political, civic identity, human interest), sourcing (company, union, official, resident), and valence toward the closure.",
      "County-level employment and payroll figures were drawn from published state labor department series for the same period. Coding was performed by the author; a second coder reviewed a 10 percent subsample with 84 percent agreement.",
    ],
    findings: [
      "Coverage fell into three phases: technical economic reporting (1978–1983), political conflict and blame attribution (1984–1988), and civic identity and memory (1989–1992).",
      "Company sources dominated the first phase, accounting for 61 percent of quoted sources; resident voices rose from 8 percent to 37 percent by the third phase.",
      "County manufacturing employment began declining measurably in 1980, four years before the paper's coverage shifted from routine economic reporting to conflict framing.",
    ],
    discussion: [
      "The lag between measurable decline and changed framing is the report's central observation. It is consistent with a paper dependent on a major local employer for advertising and access, though the archive alone cannot demonstrate that mechanism.",
      "Sampling 20 percent of issues risks missing episodic coverage, and coding frames is interpretive work. The 84 percent inter-coder agreement is adequate but not high, and disagreements clustered on the boundary between political and civic-identity frames.",
    ],
    conclusion: [
      "Local coverage of the closure moved through distinct framing phases that trailed the underlying economic decline by several years.",
      "The archive supports a fuller institutional history if paired with company records and editor correspondence, both of which are held locally and remain unexamined.",
    ],
    references: [
      "Cowie, J., & Heathcott, J. (Eds.). (2003). Beyond the ruins: The meanings of deindustrialization. Cornell University Press.",
      "High, S. (2003). Industrial sunset: The making of North America's rust belt, 1969–1984. University of Toronto Press.",
      "Linkon, S. L., & Russo, J. (2002). Steeltown U.S.A.: Work and memory in Youngstown. University Press of Kansas.",
    ],
    reads: 1290,
    volume: "Vol. 3, No. 2",
  },
];

export const PAPER_BY_SLUG: Record<string, Paper> = Object.fromEntries(
  PAPERS.map((p) => [p.slug, p]),
);

export function relatedPapers(paper: Paper, limit = 3): Paper[] {
  const scored = PAPERS.filter((p) => p.slug !== paper.slug).map((p) => {
    let score = 0;
    if (p.field === paper.field) score += 3;
    if (p.secondaryField && p.secondaryField === paper.field) score += 2;
    if (paper.secondaryField && p.field === paper.secondaryField) score += 2;
    if (p.type === paper.type) score += 1;
    score += p.tags.filter((t) => paper.tags.includes(t)).length;
    return { p, score };
  });
  return scored
    .sort((a, b) => b.score - a.score || b.p.reads - a.p.reads)
    .slice(0, limit)
    .map((s) => s.p);
}
