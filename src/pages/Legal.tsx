import { PageHeader } from "@/components/layout/PageHeader";
import { Notice } from "@/components/ui/Surface";
import { ORG } from "@/data/site";

interface Clause {
  heading: string;
  body: string[];
}

const PRIVACY: Clause[] = [
  {
    heading: "What we collect",
    body: [
      "Account information you give us: name, email, school, graduation year, and anything you choose to put on your public profile.",
      "Work you submit: manuscripts, supporting files, declarations, and the review record attached to them.",
      "Basic usage data: which pages you visit and which studies you save, used to improve the library and nothing else.",
    ],
  },
  {
    heading: "What we do with it",
    body: [
      "We use your information to run the platform: matching you to projects, routing submissions to reviewers, recording approved hours, and issuing service records.",
      "We publish only what you choose to publish. Your profile is public if you make it public; a study appears in the library only if you agree to publication.",
      "We do not sell personal information, and we do not share it with advertisers.",
    ],
  },
  {
    heading: "Students under 18",
    body: [
      "Students under 13 need a parent or guardian to create and hold the account.",
      "A parent, guardian, or the student may request deletion of an account and its associated personal information at any time by writing to us.",
      "Published studies may remain in the library after account deletion, with author attribution removed on request.",
    ],
  },
  {
    heading: "Verification requests",
    body: [
      "When a school official verifies a service record using its code, we confirm the student name, project, reviewer, date, and approved hours associated with that record. We do not disclose other submissions, scores, or reviewer notes.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "You can edit or remove profile information, withdraw an unpublished submission, or delete your account. Email us and we will act within 30 days.",
    ],
  },
];

const TERMS: Clause[] = [
  {
    heading: "Who may use the platform",
    body: [
      "The platform is intended for high school students, their teachers and counselors, and our reviewers. Students under 13 require a parent or guardian account holder.",
    ],
  },
  {
    heading: "Your work stays yours",
    body: [
      "You keep ownership and copyright of everything you submit. By submitting, you grant us a non-exclusive license to review it, and — if you agree to publication — to publish it in the library with attribution.",
      "You may republish your own work anywhere. We ask that you cite the original record number.",
    ],
  },
  {
    heading: "Academic integrity",
    body: [
      "Submitting plagiarized work, fabricated data, or work you did not write is a violation of these terms and of our research integrity standards. Consequences range from withdrawal of a submission to removal of published work and revocation of previously awarded hours.",
      "Undisclosed AI generation of analysis, findings, or sources is treated as misrepresented authorship.",
    ],
  },
  {
    heading: "Volunteer hours",
    body: [
      "Hours are awarded by reviewers for work that meets a project's published requirements. Submitting work does not entitle you to hours, and the maximum listed on a project is a ceiling rather than a guarantee.",
      `${ORG.abbr} does not control whether any school, district, honor society, or scholarship program accepts these hours toward a service requirement. Confirm acceptance with that organization before relying on them.`,
      "We may correct or revoke a recorded hour award if we later determine the underlying work violated these terms.",
    ],
  },
  {
    heading: "Research involving people",
    body: [
      "You are responsible for following all applicable ethical and institutional requirements for research involving human participants, including supervision, informed consent, and any review your school requires. We do not accept submissions involving human participants without documented consent and an adult supervisor of record.",
    ],
  },
  {
    heading: "Availability and changes",
    body: [
      "This is a preview build. Features described here may change, and we will post material changes to these terms with a revision date.",
    ],
  },
];

export default function Legal({ kind }: { kind: "privacy" | "terms" }) {
  const isPrivacy = kind === "privacy";
  const clauses = isPrivacy ? PRIVACY : TERMS;

  return (
    <>
      <PageHeader
        eyebrow={isPrivacy ? "Privacy policy" : "Terms of use"}
        title={isPrivacy ? "What we collect and why" : "The agreement between us"}
        lead={
          isPrivacy
            ? "Plain language, because most of our readers are under eighteen. If something here is unclear, write to us and we will explain it."
            : "The rules for using the platform, submitting work, and earning hours — written to be read rather than skimmed."
        }
        tight
      />

      <div className="u-shell py-12 lg:py-16">
        <div className="max-w-[68ch]">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            Last revised · August 2026 · Sample document
          </p>

          <div className="mt-8 space-y-10">
            {clauses.map((clause, i) => (
              <section key={clause.heading} className="border-t border-rule pt-7">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[10.5px] tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="text-[22px] tracking-[-0.012em]">{clause.heading}</h2>
                </div>
                <div className="u-prose mt-4 pl-0 text-[16px] leading-[1.72] text-ink-soft sm:pl-[1.9rem]">
                  {clause.body.map((p, j) => <p key={j}>{p}</p>)}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12">
            <Notice title="This is placeholder legal text." tone="neutral">
              These clauses were written to show the structure and tone of the policy for this preview build. They
              are not legal advice and should be replaced with policies reviewed by counsel before launch.
            </Notice>
          </div>
        </div>
      </div>
    </>
  );
}
