import { PROCESS_STEPS } from "@/data/process";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Card, Notice, SectionHeading } from "@/components/ui/Surface";
import { useReveal } from "@/lib/utils";

const FAQ = [
  {
    q: "Do I need research experience to start?",
    a: "No. Introductory projects assume you have never read a research paper before and walk you through every tool. Most students start there and move up.",
  },
  {
    q: "How long does a project take?",
    a: "Between six and eighteen hours depending on the project, spread over a few weeks. Every listing states its own estimate, and the estimates are honest rather than optimistic.",
  },
  {
    q: "What happens if my work isn't approved?",
    a: "Almost nothing is rejected outright. Reviewers request revisions with specific notes, and you resubmit. Rejection is reserved for plagiarism, fabricated data, or misrepresented authorship.",
  },
  {
    q: "Will my study definitely be published?",
    a: "No. Approval and publication are separate decisions. Approved work qualifies for hours and joins your portfolio; the editors select a subset for the public library each issue.",
  },
  {
    q: "Can I submit research I did somewhere else?",
    a: "Yes, through the submission form as an independent submission. It can be reviewed and published, but only work tied to an approved project qualifies for volunteer hours.",
  },
  {
    q: "Is there a cost?",
    a: "No. Reading, participating, submitting, and downloading your service record are all free.",
  },
];

export default function HowItWorks() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="From curious to published, step by step"
        lead="Every student takes the same path. Here is exactly what you do, what we do, and how long each part actually takes."
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/opportunities" icon="arrow-right">Browse projects</Button>
          <Button to="/research" variant="secondary">Read a published study</Button>
        </div>
      </PageHeader>

      <div ref={ref} className="u-shell py-14 lg:py-20">
        <ol className="space-y-5">
          {PROCESS_STEPS.map((step, i) => (
            <li key={step.n} className="reveal" style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
              <Card className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
                <div>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[13px] tabular-nums text-accent">{step.n}</span>
                    <div>
                      <h2 className="text-[26px] leading-tight tracking-[-0.015em]">{step.title}</h2>
                      <p className="mt-2 text-[15.5px] leading-relaxed text-ink-soft">{step.short}</p>
                    </div>
                  </div>
                  <div className="u-prose mt-5 pl-0 text-[15px] leading-[1.7] text-muted sm:pl-[3.25rem]">
                    {step.detail.map((p, j) => <p key={j}>{p}</p>)}
                  </div>
                </div>

                <div className="grid gap-px overflow-hidden rounded-[10px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-1">
                  <div className="bg-paper-deep/40 p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">You do</p>
                    <ul className="mt-3 space-y-2">
                      {step.youDo.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[13.5px] leading-snug text-ink-soft">
                          <Icon name="check" size={13} strokeWidth={2} className="mt-0.5 shrink-0 text-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-surface p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">We do</p>
                    <ul className="mt-3 space-y-2">
                      {step.weDo.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[13.5px] leading-snug text-muted">
                          <Icon name="check" size={13} strokeWidth={2} className="mt-0.5 shrink-0 text-faint" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 border-t border-rule pt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
                      Typical time · {step.typical}
                    </p>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <Notice title="Hours are awarded at step six, by a person." tone="seal" icon="seal">
            Nothing about volunteer hours is automatic. A reviewer decides whether the submitted work met the
            project's stated requirements and records the hours that work earned — which may be fewer than the
            listed maximum. Confirm with your school or program that it accepts service hours from an outside
            organization before you rely on them.
          </Notice>
        </div>

        <section className="mt-20">
          <SectionHeading eyebrow="Common questions" title="Before you start" align="left" />
          <div className="mt-8 grid items-start gap-x-10 gap-y-0 md:grid-cols-2">
            {FAQ.map((item) => (
              <details key={item.q} className="group border-b border-rule py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <span className="text-[16px] font-medium leading-snug text-ink">{item.q}</span>
                  <Icon
                    name="chevron-down"
                    size={16}
                    className="mt-1 shrink-0 text-faint transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-card border border-rule bg-surface p-8">
          <div>
            <h2 className="text-[24px]">Ready to pick one?</h2>
            <p className="mt-2 max-w-[46ch] text-[15px] text-muted">
              Introductory projects take a weekend and assume nothing. That is the honest place to start.
            </p>
          </div>
          <Button to="/opportunities?difficulty=Introductory" size="lg" icon="arrow-right">See introductory projects</Button>
        </div>
      </div>
    </>
  );
}
