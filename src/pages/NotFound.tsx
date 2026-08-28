import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="u-shell flex min-h-[62vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Record not found · 404</p>
      <h1 className="mt-5 max-w-[16ch] text-[clamp(2rem,5vw,3rem)] leading-[1.08]">
        That record isn't in the catalog.
      </h1>
      <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-muted">
        The study or project you're looking for may have been renumbered, or the link may be incomplete.
        The library search is the fastest way to find it.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/research" icon="arrow-right">Search the library</Button>
        <Button to="/" variant="secondary">Back to home</Button>
      </div>
    </div>
  );
}
