import { Link } from "react-router-dom";
import { PROCESS_STEPS } from "@/data/process";
import { SectionHeading } from "@/components/ui/Surface";
import { Button } from "@/components/ui/Button";
import { useReveal } from "@/lib/utils";

export function ProcessSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="u-shell py-20 lg:py-28" aria-labelledby="how-projects-work">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="how-projects-work"
            eyebrow="How research projects work"
            title="Six steps, and none of them are automatic"
            lead="The same path every student takes, from finding a project to holding a published study and a service record."
          />
          <div className="reveal mt-8 flex flex-wrap gap-3">
            <Button to="/how-it-works" variant="secondary" icon="arrow-right">Read the full walkthrough</Button>
          </div>
        </div>

        <ol className="relative">
          <span className="absolute left-[19px] top-2 bottom-2 w-px bg-rule" aria-hidden="true" />
          {PROCESS_STEPS.map((step, i) => (
            <li
              key={step.n}
              className="reveal relative grid grid-cols-[40px_minmax(0,1fr)] gap-5 pb-9 last:pb-0"
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-rule bg-surface font-mono text-[11px] tabular-nums text-accent">
                {step.n}
              </span>
              <div className="pt-1.5">
                <h3 className="font-sans text-[17px] font-semibold tracking-[-0.008em] text-ink">{step.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{step.short}</p>
                <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">
                  Typical time · {step.typical}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="reveal mt-14 border-t border-rule pt-6 text-[13.5px] text-muted">
        Not sure where you fit? The{" "}
        <Link to="/opportunities?difficulty=Introductory" className="text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
          introductory projects
        </Link>{" "}
        assume no prior research experience and take a weekend.
      </p>
    </section>
  );
}
