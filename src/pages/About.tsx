import { Link } from "react-router-dom";
import { ORG, REVIEW_CRITERIA, STATS } from "@/data/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Card, Notice, SampleTag, SectionHeading } from "@/components/ui/Surface";
import { useReveal } from "@/lib/utils";

const WHAT_WE_DO = [
  {
    icon: "list" as const,
    title: "We design research projects",
    body: "Every project starts with a question a high school student can genuinely answer, then gets a packet: approved data sources, a methodology walkthrough, a template, and annotated model submissions.",
  },
  {
    icon: "eye" as const,
    title: "We review student work",
    body: "Reviewers with backgrounds in each field read every submission against eight published criteria and write specific feedback. Most students revise at least once.",
  },
  {
    icon: "file" as const,
    title: "We publish a research library",
    body: "Approved work is added to the student's portfolio, and selected studies are published in the library each issue with a permanent record number and citation.",
  },
  {
    icon: "seal" as const,
    title: "We document service hours",
    body: "When approved work meets a project's stated requirements, reviewers record verified hours against a downloadable service record with a verification code.",
  },
];

const REVIEWERS = [
  { name: "Dr. Elena Vasquez", role: "Psychology, Medicine & Health", detail: "Clinical psychologist; reviews survey and human-subject work." },
  { name: "Marcus Lin", role: "Computer Science, AI, Engineering", detail: "Software engineer; reviews technical and computational submissions." },
  { name: "Dr. Amara Osei", role: "Environmental Science, Public Health", detail: "Environmental epidemiologist; reviews spatial and field work." },
  { name: "Priya Shah", role: "Economics, Finance, Social Sciences", detail: "Policy analyst; reviews quantitative and policy submissions." },
  { name: "Dr. Nathan Okoro", role: "History, Literature, Education", detail: "Historian; reviews archival, qualitative, and interview-based work." },
];

export default function About() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <>
      <PageHeader
        eyebrow="About the collective"
        title="Research should be accessible long before college"
        lead={`${ORG.name} is a student research publication. We give high school students structured opportunities to explore academic questions, develop real research skills, contribute meaningful work, and build a portfolio of scholarship.`}
      >
        <dl className="flex flex-wrap gap-x-10 gap-y-5">
          {STATS.map((s) => (
            <div key={s.label}>
              <dd className="u-num font-display text-[30px] leading-none text-ink">{s.value}</dd>
              <dt className="mt-1.5 text-[12.5px] text-muted">{s.label}</dt>
            </div>
          ))}
          <SampleTag className="self-end" label="Placeholder figures" />
        </dl>
      </PageHeader>

      <div ref={ref} className="u-shell py-14 lg:py-20">
        {/* Mission */}
        <section id="mission" className="scroll-mt-28 grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <div>
            <p className="u-eyebrow">Our mission</p>
            <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.3rem)] leading-tight">Take student questions seriously</h2>
          </div>
          <div className="u-prose max-w-[62ch] text-[16.5px] leading-[1.72] text-ink-soft">
            <p>
              We believe research should be accessible to students long before college. Our goal is to give high
              school students opportunities to explore academic questions, develop research skills, contribute
              meaningful work, and build a portfolio of scholarship.
            </p>
            <p>
              Most students meet research for the first time as a citation in a textbook — finished, authoritative,
              and made by someone else. The gap between reading a study and making one looks enormous from the
              outside, and it mostly isn't. What it takes is a well-framed question, a method you can defend, and
              somebody willing to tell you honestly where your reasoning breaks.
            </p>
            <p>
              That last part is the work we do. Reviewers read every submission and write real feedback. Students
              revise. The result is not a certificate for participating — it is a piece of work that had to survive
              somebody's scrutiny before it was published.
            </p>
          </div>
        </section>

        {/* What we do */}
        <section id="what-we-do" className="mt-20 scroll-mt-28 border-t border-rule pt-14">
          <SectionHeading eyebrow="What we do" title="Four things, done carefully" />
          <ul className="mt-10 grid gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-2">
            {WHAT_WE_DO.map((item, i) => (
              <li
                key={item.title}
                className="reveal bg-surface p-6 sm:p-7"
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <Icon name={item.icon} size={20} className="text-accent" />
                <h3 className="mt-4 font-sans text-[16.5px] font-semibold tracking-[-0.005em] text-ink">{item.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Why it matters */}
        <section id="why" className="mt-20 scroll-mt-28 border-t border-rule pt-14">
          <SectionHeading
            eyebrow="Why student research matters"
            title="The skill transfers; the topic often doesn't"
            lead="A student who has run one honest analysis reads everything differently afterward."
          />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "You learn to check claims",
                body: "Once you have seen how a finding is produced, headlines stop being facts and start being claims with methods behind them. That habit outlasts any particular project.",
              },
              {
                title: "You learn to be wrong usefully",
                body: "Every submission gets criticism. Learning to read hard feedback, separate the signal from your ego, and revise is most of what graduate research actually is.",
              },
              {
                title: "You build something durable",
                body: "A published study with your name and a record number is specific. It is more useful in an application, an interview, or a conversation than a list of activities.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="reveal border-t-2 border-accent/25 pt-5"
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <h3 className="font-display text-[19px] leading-snug text-ink">{item.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How projects work */}
        <section id="projects" className="mt-20 scroll-mt-28 border-t border-rule pt-14">
          <SectionHeading
            eyebrow="How our research projects work"
            align="between"
            title="Six steps, from discovery to credit"
            lead="Discover, learn, research, submit, review, publish. Each step has stated requirements and a stated timeline, published before you apply."
            action={<Button to="/how-it-works" variant="secondary" icon="arrow-right">Read the full walkthrough</Button>}
          />
        </section>

        {/* Volunteer hour policy */}
        <section id="hours-policy" className="mt-20 scroll-mt-28 border-t border-rule pt-14">
          <SectionHeading eyebrow="Volunteer hour policy" title="How hours are earned, and what they are worth" />
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
            <div className="u-prose max-w-[62ch] text-[16px] leading-[1.72] text-ink-soft">
              <p>
                Students may earn verified volunteer and service hours for completing approved research projects and
                contributing qualifying work. Hours are awarded by a reviewer, on the basis of work that meets the
                requirements published with each project.
              </p>
              <p>
                <strong className="font-semibold text-ink">Submitting a paper does not earn hours.</strong> A
                submission that misses stated requirements is returned with specific revisions. Partial completion
                may receive partial hours. The maximum shown on a project listing is a ceiling, not an expectation.
              </p>
              <p>
                Approved hours are recorded against your service record with the project, the date, the reviewer,
                and a verification code an adult can use to confirm the record with us directly.
              </p>
            </div>
            <div className="space-y-4">
              <Notice title="We cannot promise your school will accept these hours." tone="seal" icon="alert">
                Schools, districts, honor societies, and scholarship programs set their own rules about which
                organizations count toward service requirements. Some accept outside research organizations; some do
                not; some require pre-approval. Confirm with your counselor or program coordinator{" "}
                <em>before</em> you start a project if the hours are the reason you're doing it.
              </Notice>
              <Card className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">What a service record shows</p>
                <ul className="mt-3 space-y-2 text-[14px] text-ink-soft">
                  {["Student name and school", "Organization and reviewer", "Project completed and date approved", "Number of approved hours", "Verification code and status"].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <Icon name="check" size={13} strokeWidth={2} className="mt-1 shrink-0 text-accent" />
                      {line}
                    </li>
                  ))}
                </ul>
                <Button to="/dashboard" variant="quiet" className="mt-4" icon="arrow-right">See a sample service record</Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Integrity */}
        <section id="integrity" className="mt-20 scroll-mt-28 border-t border-rule pt-14">
          <SectionHeading
            eyebrow="Research integrity"
            align="between"
            title="The standards every submission is held to"
            lead="Academic honesty, proper citation, transparent methodology, responsible AI use, accurate reporting, and respect for anyone involved in the research."
            action={<Button to="/integrity" variant="secondary" icon="arrow-right">Read the integrity standards</Button>}
          />
        </section>

        {/* Review process */}
        <section id="review" className="mt-20 scroll-mt-28 border-t border-rule pt-14">
          <SectionHeading
            eyebrow="Our review process"
            title="Eight criteria, one reviewer, real feedback"
            lead="Reviewers are adults with a background in the field they read for. They score submissions against published criteria and write notes a student can act on."
          />

          <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {REVIEW_CRITERIA.map((c, i) => (
              <div
                key={c.key}
                className="reveal bg-surface p-5"
                style={{ "--reveal-delay": `${i * 50}ms` } as React.CSSProperties}
              >
                <p className="font-mono text-[10px] tabular-nums text-faint">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2.5 font-sans text-[14.5px] font-semibold text-ink">{c.label}</h3>
                <p className="mt-1.5 text-[13px] leading-snug text-muted">{c.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <Card className="p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Our reviewers</p>
              <ul className="mt-4 divide-y divide-rule">
                {REVIEWERS.map((r) => (
                  <li key={r.name} className="py-3.5 first:pt-0 last:pb-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-[15px] font-medium text-ink">{r.name}</p>
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-faint">{r.role}</p>
                    </div>
                    <p className="mt-1 text-[13.5px] text-muted">{r.detail}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-rule pt-3 text-[12.5px] text-faint">
                Reviewer profiles are placeholder content for this preview build.
              </p>
            </Card>
            <div className="space-y-4">
              <Notice title="Reviewers decide, not software." tone="accent" icon="user">
                Submissions are screened automatically for completeness and originality, but every approval,
                revision request, and hour award is made by a person who read the work.
              </Notice>
              <Card className="p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Typical timeline</p>
                <ul className="mt-3 space-y-2.5 text-[14px] text-ink-soft">
                  <li className="flex justify-between gap-4"><span>Completeness screening</span><span className="font-mono text-[12.5px] text-muted">1–3 days</span></li>
                  <li className="flex justify-between gap-4"><span>Reviewer assignment</span><span className="font-mono text-[12.5px] text-muted">3 days</span></li>
                  <li className="flex justify-between gap-4"><span>Full review and decision</span><span className="font-mono text-[12.5px] text-muted">10–14 days</span></li>
                  <li className="flex justify-between gap-4"><span>Revision round, if needed</span><span className="font-mono text-[12.5px] text-muted">7 days</span></li>
                </ul>
                <Button to="/review" variant="quiet" className="mt-4" icon="arrow-right">See the reviewer interface</Button>
              </Card>
            </div>
          </div>
        </section>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 rounded-card border border-rule bg-surface p-8">
          <div>
            <h2 className="text-[24px]">Questions we haven't answered?</h2>
            <p className="mt-2 max-w-[48ch] text-[15px] text-muted">
              Counselors and teachers are welcome to contact us directly about verification, supervision, or setting
              up a school cohort.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/contact" icon="arrow-right">Contact us</Button>
            <Link
              to="/integrity"
              className="inline-flex h-11 items-center rounded-[8px] border border-rule px-5 text-[14px] text-ink transition-colors hover:border-ink/30"
            >
              Research integrity
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
