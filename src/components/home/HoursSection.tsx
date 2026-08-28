import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useReveal } from "@/lib/utils";

const STEPS = [
  {
    title: "Choose a project",
    body: "Browse available research projects across different fields. Every listing states its requirements and the maximum hours available before you apply.",
    icon: "list" as const,
  },
  {
    title: "Complete the research",
    body: "Follow the project's research guidelines and complete the required work. Guides, datasets, and model submissions come with the project packet.",
    icon: "pen" as const,
  },
  {
    title: "Submit your work",
    body: "Submit your research paper, case study, literature review, analysis, or other approved contribution through the platform.",
    icon: "upload" as const,
  },
  {
    title: "Earn verified hours",
    body: "After review and approval, receive documented volunteer hours for qualifying work — recorded against your service record.",
    icon: "seal" as const,
  },
];

/**
 * The most prominent band on the page. It is also the one that most needs
 * qualifying language, so the caveat sits inside the section rather than
 * in a footnote nobody reads.
 */
export function HoursSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink text-paper" aria-labelledby="hours-heading">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(248,247,243,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(248,247,243,0.16) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(22,163,148,0.18), transparent 62%)" }}
        aria-hidden="true"
      />

      <div className="u-shell relative py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="reveal">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-seal">Earn volunteer hours through research</p>
            <h2 id="hours-heading" className="mt-4 text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.06] text-paper">
              Turn research into impact
            </h2>
            <p className="mt-6 max-w-[36rem] text-[16.5px] leading-relaxed text-paper/70">
              Participate in an approved research project and receive verified volunteer and service hours for
              qualifying contributions. Your hours are recorded against a service record you can download and
              hand to your school, your counselor, or a scholarship committee.
            </p>

            <div className="mt-8 rounded-[10px] border border-paper/15 bg-paper/[0.04] p-5">
              <div className="flex items-start gap-3">
                <Icon name="alert" size={18} className="mt-0.5 shrink-0 text-seal" />
                <div>
                  <p className="text-[14px] font-semibold text-paper">Hours are earned, not granted for submitting.</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-paper/65">
                    Submitting a paper does not by itself qualify you for hours. A reviewer awards hours only when the
                    defined project requirements are met and the work is approved. Submissions that fall short are
                    returned for revision.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button to="/opportunities" size="lg" icon="arrow-right" className="bg-accent-bright text-ink border-accent-bright hover:bg-paper hover:border-paper">
                Find a project
              </Button>
              <Button to="/about#hours-policy" variant="ghost" size="lg" className="text-paper/80 hover:bg-paper/10 hover:text-paper">
                Read the hour policy
              </Button>
            </div>
          </div>

          <ol className="grid gap-px overflow-hidden rounded-card border border-paper/12 bg-paper/12 sm:grid-cols-2">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="reveal group relative bg-ink p-6 transition-colors duration-300 hover:bg-[#151d2e]"
                style={{ "--reveal-delay": `${140 + i * 110}ms` } as React.CSSProperties}
              >
                <div className="flex items-center justify-between">
                  <span className="u-num font-mono text-[11px] tracking-[0.14em] text-paper/35">
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon name={step.icon} size={18} className={i === 3 ? "text-seal" : "text-accent-bright"} />
                </div>
                <h3 className="mt-4 font-sans text-[16px] font-semibold tracking-[-0.005em] text-paper">{step.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-paper/60">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
