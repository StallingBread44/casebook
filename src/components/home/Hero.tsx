import { Button } from "@/components/ui/Button";
import { FieldLattice } from "./FieldLattice";
import { ORG } from "@/data/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-rule">
      <div className="pointer-events-none absolute inset-0 u-hairgrid opacity-[0.55]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(120%_80%_at_70%_-10%,rgba(22,163,148,0.07),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="u-shell relative grid items-center gap-14 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 lg:py-24">
        <div>
          <p className="u-fade flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">
            <span className="text-accent">{ORG.abbr}</span>
            <span className="h-px w-6 bg-rule" />
            <span>{ORG.volume}</span>
            <span className="h-px w-6 bg-rule" />
            <span>Est. {ORG.founded}</span>
          </p>

          <h1 className="u-rise mt-6 text-[clamp(2.5rem,6.2vw,4.35rem)] font-normal leading-[1.04] tracking-[-0.022em]">
            Research. Explore.
            <br />
            Contribute.{" "}
            <em className="font-normal italic text-accent">Make an impact.</em>
          </h1>

          <p
            className="u-rise mt-7 max-w-[34rem] text-[17px] leading-[1.62] text-muted"
            style={{ animationDelay: "120ms" }}
          >
            Explore research across disciplines, complete meaningful research projects, and build your academic
            portfolio while earning verified volunteer hours.
          </p>

          <div className="u-rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "220ms" }}>
            <Button to="/research" size="lg" icon="arrow-right">Explore research</Button>
            <Button to="/opportunities" variant="secondary" size="lg">Start a research project</Button>
          </div>

          <div
            className="u-rise mt-10 flex items-start gap-3 border-l-2 border-accent/25 pl-4"
            style={{ animationDelay: "320ms" }}
          >
            <p className="max-w-[30rem] text-[13.5px] leading-relaxed text-muted">
              Every study here was written by a high school student and read by a reviewer before it was published.
              Hours are awarded by those reviewers — never automatically.
            </p>
          </div>
        </div>

        <div className="relative">
          <FieldLattice />
          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            The catalog, by field · Sample figures
          </p>
        </div>
      </div>
    </section>
  );
}
