/**
 * SAMPLE CONTENT — placeholder metrics and testimonials.
 * Every value in this file is illustrative. Swap in real figures before launch;
 * the components read from here and nowhere else.
 */

export const ORG = {
  name: "CaseBook",
  short: "CaseBook",
  abbr: "CB",
  tagline: "Student research, published.",
  founded: "2021",
  volume: "Vol. 4, No. 2",
  email: "editors@casebook.org",
};

export interface Stat {
  value: string;
  label: string;
  note: string;
}

export const STATS: Stat[] = [
  { value: "500+", label: "Research projects", note: "Across the full catalog since 2021." },
  { value: "1,200+", label: "Student researchers", note: "Currently enrolled in a project or published." },
  { value: "8,000+", label: "Volunteer hours verified", note: "Approved by reviewers, not auto-granted." },
  { value: "20+", label: "Academic fields", note: "From biology to literature." },
];

export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
  handle?: string;
  field: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I had never read a real paper before this. My reviewer sent back two pages of notes on my first draft and I rewrote the whole methods section. The published version is the first thing I've made that I'd show someone.",
    name: "Maya O.",
    detail: "Grade 12 · Portland, OR",
    handle: "maya-okonkwo",
    field: "Psychology",
  },
  {
    quote:
      "The hours were the reason I signed up and the least interesting part by the end. What stuck was learning that you can check a claim yourself instead of taking the abstract's word for it.",
    name: "Rafael D.",
    detail: "Grade 12 · Austin, TX",
    handle: "rafael-duarte",
    field: "Artificial Intelligence",
  },
  {
    quote:
      "I picked the heat mapping project because it said no experience needed, and it meant it. Two weekends later I had a map of my own city and something real to talk about in my college interviews.",
    name: "Amara B.",
    detail: "Grade 12 · Chicago, IL",
    handle: "amara-bello",
    field: "Environmental Science",
  },
];

export const REVIEW_CRITERIA = [
  { key: "question", label: "Research question", detail: "Specific, answerable, and stated before the analysis." },
  { key: "methodology", label: "Methodology", detail: "Appropriate to the question and described well enough to repeat." },
  { key: "evidence", label: "Evidence", detail: "Claims are supported by what was actually collected or cited." },
  { key: "analysis", label: "Analysis", detail: "Reasoning is sound and limitations are named honestly." },
  { key: "writing", label: "Writing quality", detail: "Clear, organized, and readable by a non-specialist." },
  { key: "citation", label: "Citation quality", detail: "Complete, correctly formatted, and traceable to primary sources." },
  { key: "originality", label: "Originality", detail: "The contribution is the student's own work and thinking." },
  { key: "ethics", label: "Ethical considerations", detail: "Consent, supervision, data handling, and AI use are disclosed." },
] as const;

export const INTEGRITY_PRINCIPLES = [
  {
    title: "Academic honesty",
    body: "Submit work you actually did. If someone helped, say who and how. Misrepresenting authorship is the one thing we treat as disqualifying rather than correctable.",
  },
  {
    title: "Proper citation",
    body: "Every claim that isn't yours gets a citation a reader can follow to the source. Cite what you read, not what you found cited elsewhere.",
  },
  {
    title: "No plagiarism",
    body: "Copied text, paraphrase without attribution, and reused figures without permission all count. Submissions are screened before review.",
  },
  {
    title: "Transparent methodology",
    body: "Describe what you did in enough detail that another student could repeat it — including the parts that didn't work.",
  },
  {
    title: "Responsible use of AI",
    body: "AI tools may help you brainstorm, outline, or check grammar. They may not write your analysis, invent your sources, or generate your findings. Disclose what you used and how in the declaration on every submission.",
  },
  {
    title: "Accurate reporting",
    body: "Report what you found, including null and inconvenient results. A study that found nothing, honestly reported, is publishable here.",
  },
  {
    title: "Respect for participants",
    body: "If people are involved, their consent, privacy, and right to withdraw come before your project.",
  },
  {
    title: "Appropriate sourcing",
    body: "Prefer primary sources and peer-reviewed work. When you use popular or advocacy sources, say why and treat them accordingly.",
  },
  {
    title: "No fabricated data",
    body: "Do not invent, alter, or selectively delete data points. Reviewers may request your raw data and analysis files for any submission.",
  },
];

export const FOOTER_NAV = [
  {
    heading: "Read",
    links: [
      { label: "Research library", to: "/research" },
      { label: "Field notes (news)", to: "/news" },
      { label: "Featured studies", to: "/research?sort=featured" },
      { label: "Browse by field", to: "/research" },
      { label: "Current issue", to: "/research?sort=recent" },
    ],
  },
  {
    heading: "Participate",
    links: [
      { label: "Research opportunities", to: "/opportunities" },
      { label: "Submit research", to: "/submit" },
      { label: "How it works", to: "/how-it-works" },
      { label: "Volunteer hours", to: "/dashboard" },
    ],
  },
  {
    heading: "Organization",
    links: [
      { label: "About us", to: "/about" },
      { label: "Research integrity", to: "/integrity" },
      { label: "Protecting your work", to: "/protect-your-work" },
      { label: "Review process", to: "/about#review" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", to: "/privacy" },
      { label: "Terms of use", to: "/terms" },
      { label: "Volunteer hour policy", to: "/about#hours-policy" },
      { label: "Accessibility", to: "/contact" },
    ],
  },
];
