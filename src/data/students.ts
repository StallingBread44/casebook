import type { FieldSlug } from "./fields";

/** SAMPLE CONTENT — fictional student profiles for this preview build. */
export interface Student {
  handle: string;
  name: string;
  role: string;
  school: string;
  gradYear: string;
  location: string;
  joined: string;
  bio: string;
  academicInterests: string[];
  researchInterests: string[];
  skills: string[];
  publishedSlugs: string[];
  completedProjects: { title: string; field: FieldSlug; completed: string; hours: number }[];
  verifiedHours: number;
  awards: { title: string; detail: string; year: string }[];
}

export const STUDENTS: Student[] = [
  {
    handle: "alex-johnson",
    name: "Alex Johnson",
    role: "High School Researcher",
    school: "Franklin High School",
    gradYear: "Class of 2026",
    location: "Columbus, Ohio",
    joined: "2024-09-01",
    bio: "I started with a mapping project about grocery stores near my house and ended up caring a lot about how we measure access to things. Mostly I work with public datasets and open mapping tools. Currently looking for a project on adolescent health outcomes.",
    academicInterests: ["Neuroscience", "Psychology", "Biology"],
    researchInterests: ["Food access", "Health geography", "Adolescent wellbeing"],
    skills: ["QGIS", "Spreadsheet analysis", "Literature review", "Data visualization", "APA citation"],
    publishedSlugs: ["food-desert-transit-access-case-study"],
    completedProjects: [
      { title: "Mapping Urban Heat Islands in Your Own City", field: "environmental-science", completed: "2025-11-14", hours: 6 },
      { title: "Transit Access and Grocery Availability", field: "public-health", completed: "2026-01-20", hours: 9.5 },
      { title: "How Headline Framing Changes What Readers Remember", field: "sociology", completed: "2026-04-02", hours: 5 },
      { title: "Investigating Teen Sleep & Academic Performance", field: "psychology", completed: "2026-06-30", hours: 8 },
    ],
    verifiedHours: 28.5,
    awards: [
      { title: "Reviewer's Distinction", detail: "Awarded to submissions approved without revision requests.", year: "2026" },
      { title: "Regional Science Fair — Second Place", detail: "Health & Medicine division.", year: "2025" },
    ],
  },
  {
    handle: "maya-okonkwo",
    name: "Maya Okonkwo",
    role: "High School Researcher",
    school: "Riverbend High School",
    gradYear: "Class of 2026",
    location: "Portland, Oregon",
    joined: "2024-02-11",
    bio: "Survey design is underrated. I like the part of research where you argue about what a question is actually measuring before anyone collects anything. I run our school's peer research club.",
    academicInterests: ["Psychology", "Public Health", "Statistics"],
    researchInterests: ["Sleep and circadian rhythm", "Survey methodology", "Adolescent behavior"],
    skills: ["Survey design", "Regression analysis", "R", "Academic writing", "Peer review"],
    publishedSlugs: ["social-media-adolescent-sleep"],
    completedProjects: [
      { title: "Investigating Teen Sleep & Academic Performance", field: "psychology", completed: "2025-12-08", hours: 8 },
      { title: "How Headline Framing Changes What Readers Remember", field: "sociology", completed: "2026-02-19", hours: 5 },
    ],
    verifiedHours: 21.5,
    awards: [
      { title: "Editor's Selection", detail: "Featured in Vol. 4, No. 2.", year: "2026" },
    ],
  },
  {
    handle: "rafael-duarte",
    name: "Rafael Duarte",
    role: "High School Researcher",
    school: "Northgate Academy",
    gradYear: "Class of 2026",
    location: "Austin, Texas",
    joined: "2023-10-05",
    bio: "Mostly I read machine learning papers and check whether the numbers mean what the abstract says they mean. Long-term I want to work on evaluation methodology.",
    academicInterests: ["Computer Science", "Artificial Intelligence", "Mathematics"],
    researchInterests: ["Model evaluation", "Clinical AI", "Reproducibility"],
    skills: ["Python", "Systematic review", "Technical reading", "Data extraction", "LaTeX"],
    publishedSlugs: ["machine-learning-early-disease-detection"],
    completedProjects: [
      { title: "Auditing Model Cards for Publicly Released AI Systems", field: "artificial-intelligence", completed: "2025-08-30", hours: 10 },
      { title: "Reporting of Participant Demographics in Recent Clinical Trials", field: "medicine-health", completed: "2026-02-27", hours: 12 },
      { title: "How Headline Framing Changes What Readers Remember", field: "sociology", completed: "2026-05-16", hours: 5 },
    ],
    verifiedHours: 34,
    awards: [
      { title: "Reviewer's Distinction", detail: "Awarded to submissions approved without revision requests.", year: "2026" },
      { title: "Peer Reviewer Corps", detail: "Selected to give structured feedback on student submissions.", year: "2025" },
    ],
  },
  {
    handle: "amara-bello",
    name: "Amara Bello",
    role: "High School Researcher",
    school: "Lincoln Park High School",
    gradYear: "Class of 2026",
    location: "Chicago, Illinois",
    joined: "2025-01-22",
    bio: "I map things. Trees, temperatures, bus routes. My first project took two weekends and I have not stopped since.",
    academicInterests: ["Environmental Science", "Urban Planning", "Public Health"],
    researchInterests: ["Urban canopy", "Environmental equity", "Spatial analysis"],
    skills: ["QGIS", "Remote sensing", "Census data", "Technical writing"],
    publishedSlugs: ["urban-green-space-student-wellbeing"],
    completedProjects: [
      { title: "Mapping Urban Heat Islands in Your Own City", field: "environmental-science", completed: "2025-06-11", hours: 6 },
      { title: "Urban Green Spaces and Student Wellbeing", field: "environmental-science", completed: "2026-04-15", hours: 7.5 },
    ],
    verifiedHours: 13.5,
    awards: [{ title: "First Publication", detail: "Vol. 4, No. 1.", year: "2026" }],
  },
  {
    handle: "sofia-nakamura",
    name: "Sofia Nakamura",
    role: "High School Researcher",
    school: "Hilltop Preparatory",
    gradYear: "Class of 2026",
    location: "San Jose, California",
    joined: "2024-05-30",
    bio: "Interested in attention, memory, and why study advice is mostly folklore. I run small within-subjects experiments and try to be honest about what they can show.",
    academicInterests: ["Neuroscience", "Psychology", "Education"],
    researchInterests: ["Sustained attention", "Learning science", "Experimental design"],
    skills: ["Experimental design", "Cognitive testing", "Statistics", "Data visualization"],
    publishedSlugs: ["attention-restoration-study-breaks"],
    completedProjects: [
      { title: "Investigating Teen Sleep & Academic Performance", field: "psychology", completed: "2025-10-02", hours: 8 },
      { title: "How Headline Framing Changes What Readers Remember", field: "sociology", completed: "2026-01-08", hours: 5 },
    ],
    verifiedHours: 18,
    awards: [{ title: "Editor's Selection", detail: "Featured in Vol. 3, No. 4.", year: "2026" }],
  },
  {
    handle: "theo-marchetti",
    name: "Theo Marchetti",
    role: "High School Researcher",
    school: "Cedar Ridge High School",
    gradYear: "Class of 2027",
    location: "Madison, Wisconsin",
    joined: "2025-03-14",
    bio: "Lab person. I like protocols, sterile technique, and the specific satisfaction of a plate count that comes out where you expected. Supervised by my AP Bio teacher.",
    academicInterests: ["Biology", "Chemistry", "Medicine"],
    researchInterests: ["Microbiology", "Antibiotic resistance", "Environmental sampling"],
    skills: ["Aseptic technique", "Culture methods", "Lab documentation", "Scientific writing"],
    publishedSlugs: ["antibiotic-resistance-soil-isolates"],
    completedProjects: [
      { title: "Comparative Strength Testing of Recycled Composites", field: "engineering", completed: "2025-12-19", hours: 12 },
    ],
    verifiedHours: 12,
    awards: [{ title: "Safety & Protocol Commendation", detail: "Complete lab documentation across a full project.", year: "2026" }],
  },
];

export const STUDENT_BY_HANDLE: Record<string, Student> = Object.fromEntries(
  STUDENTS.map((s) => [s.handle, s]),
);
