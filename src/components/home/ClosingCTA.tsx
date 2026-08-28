import { Button } from "@/components/ui/Button";
import { useReveal } from "@/lib/utils";

export function ClosingCTA() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="u-shell py-20 lg:py-28">
      <div className="reveal relative overflow-hidden rounded-card border border-rule bg-surface">
        <div className="pointer-events-none absolute inset-0 u-hairgrid opacity-60" aria-hidden="true" />
        <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="u-eyebrow">Start this week</p>
            <h2 className="mt-4 max-w-[20ch] text-[clamp(1.9rem,4vw,2.8rem)] leading-[1.08]">
              Your first study is closer than you think.
            </h2>
            <p className="mt-5 max-w-[42ch] text-[16px] leading-relaxed text-muted">
              Pick a project, read the packet, do the work. Reviewers will tell you honestly what is working and what
              is not — which is the part that makes it worth putting on an application.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button to="/opportunities" size="lg" icon="arrow-right">Find a project</Button>
            <Button to="/research" variant="secondary" size="lg">Read a study first</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
