import { Link } from "react-router-dom";
import { INTEGRITY_PRINCIPLES } from "@/data/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Card, Notice, SectionHeading } from "@/components/ui/Surface";
import { useReveal } from "@/lib/utils";

const AI_RULES = [
  { allowed: true, text: "Brainstorming topics or narrowing a question before you begin" },
  { allowed: true, text: "Explaining a concept or a statistical method you're learning" },
  { allowed: true, text: "Grammar, spelling, and formatting checks on text you wrote" },
  { allowed: false, text: "Writing your abstract, analysis, discussion, or conclusion" },
  { allowed: false, text: "Generating citations or reference lists — models invent sources that don't exist" },
  { allowed: false, text: "Producing, filling in, or extrapolating data points" },
  { allowed: false, text: "Summarizing a paper you did not read and citing it as if you had" },
];

export default function Integrity() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <>
      <PageHeader
        eyebrow="Research integrity"
        title="What makes student research credible"
        lead="These standards apply to every submission, from an introductory literature review to an advanced experimental study. Reviewers check against them, and so should you before you submit."
      >
        <Button to="/submit" variant="secondary" icon="arrow-right">Go to the submission form</Button>
      </PageHeader>

      <div ref={ref} className="u-shell py-14 lg:py-20">
        <ul className="grid gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {INTEGRITY_PRINCIPLES.map((p, i) => (
            <li
              key={p.title}
              className="reveal bg-surface p-6"
              style={{ "--reveal-delay": `${Math.min(i * 60, 400)}ms` } as React.CSSProperties}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10.5px] tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="font-sans text-[16px] font-semibold tracking-[-0.005em] text-ink">{p.title}</h2>
              </div>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ul>

        {/* Human subjects */}
        <section id="human-subjects" className="mt-20 scroll-mt-28 border-t border-rule pt-14">
          <SectionHeading
            eyebrow="Research involving people"
            title="Human-subject research requires supervision"
            lead="Surveys, interviews, and experiments involving other people carry obligations that a school assignment does not."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
            <div className="u-prose max-w-[62ch] text-[16px] leading-[1.72] text-ink-soft">
              <p>
                Students must follow all applicable ethical requirements for research involving human participants,
                including the rules of their own school or district. We do not encourage students to conduct
                research involving human participants without appropriate adult supervision, informed consent, and
                institutional review where it applies.
              </p>
              <p>
                Any project on this platform that involves human participants requires an adult supervisor of
                record, completion of our research ethics module, and written informed consent from every
                participant — plus guardian consent where participants are minors. Submissions without documented
                consent are returned unreviewed.
              </p>
              <p>
                If your question would require sensitive data, vulnerable participants, or anything a reasonable
                adult would want to review first, talk to your supervisor and to us before you collect anything.
                Redesigning a study early costs an afternoon; discovering the problem after collection costs the
                whole project.
              </p>
            </div>
            <Card className="h-fit p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Required before any contact with participants</p>
              <ul className="mt-4 space-y-3">
                {[
                  "An adult supervisor of record who has agreed in writing",
                  "Completion of the CB research ethics module",
                  "Informed consent from every participant",
                  "Guardian consent for participants under 18",
                  "A stated plan for storing and anonymizing responses",
                  "A clear way for participants to withdraw",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[14px] leading-snug text-ink-soft">
                    <Icon name="check" size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* AI */}
        <section id="ai" className="mt-20 scroll-mt-28 border-t border-rule pt-14">
          <SectionHeading
            eyebrow="Responsible use of AI"
            title="Where the line sits"
            lead="AI tools can help you learn. They cannot do the research for you, and they cannot be trusted with your sources."
          />
          <ul className="mt-10 grid gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-2">
            {AI_RULES.map((rule) => (
              <li key={rule.text} className="flex items-start gap-3 bg-surface p-5">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    rule.allowed ? "bg-accent-soft text-accent" : "bg-flag-soft text-flag"
                  }`}
                >
                  <Icon name={rule.allowed ? "check" : "close"} size={12} strokeWidth={2.4} />
                </span>
                <span className="text-[14.5px] leading-snug text-ink-soft">{rule.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-[62ch] text-[14.5px] leading-relaxed text-muted">
            Every submission includes a declaration of AI use. Disclosing that you used a tool is never held against
            you. Failing to disclose it is treated as a misrepresentation of authorship.
          </p>
        </section>

        {/* Concerns */}
        <section className="mt-20 border-t border-rule pt-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <Notice title="If you're unsure, ask before you submit." tone="accent" icon="mail">
              Questions about citation, consent, data handling, or AI use are ordinary and welcome. Write to{" "}
              <span className="font-mono text-[13px]">editors@casebook.org</span> and we will answer before
              the deadline rather than after the review.
            </Notice>
            <Notice title="Reporting a concern about published work" tone="neutral" icon="alert">
              If you believe something in the library misstates a source, misrepresents data, or was not written by
              its stated author, tell us. We investigate every report, correct the record where warranted, and
              publish a note describing what changed. If the work in question is{" "}
              <em>yours</em>, start with{" "}
              <Link to="/protect-your-work#response" className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent">
                what to do when you find a copy
              </Link>
              .
            </Notice>
          </div>
        </section>

        <section className="mt-20 border-t border-rule pt-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="u-eyebrow">The other side of integrity</p>
              <h2 className="mt-3 max-w-[24ch] text-[clamp(1.7rem,3vw,2.3rem)] leading-tight">
                These standards protect your work too
              </h2>
              <p className="mt-4 max-w-[54ch] text-[15.5px] leading-relaxed text-muted">
                Everything above is about not taking someone else's work. The companion guide covers
                the reverse: building the dated record that proves a study is yours, choosing how
                others may reuse it, and what to do if you find a copy.
              </p>
            </div>
            <Button to="/protect-your-work" size="lg" icon="arrow-right">
              Keep your work from being plagiarized
            </Button>
          </div>
        </section>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-card border border-rule bg-surface p-8">
          <div>
            <h2 className="text-[24px]">Ready to submit?</h2>
            <p className="mt-2 max-w-[48ch] text-[15px] text-muted">
              Run through the submission checklist first. Most returned submissions fail on something the checklist
              would have caught.
            </p>
          </div>
          <Button to="/submit" size="lg" icon="arrow-right">Submit research</Button>
        </div>
      </div>
    </>
  );
}
