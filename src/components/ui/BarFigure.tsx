import { cn } from "@/lib/utils";

/**
 * Figure rendering for study findings — hairline bars on a shared baseline.
 * Deliberately plain: the number is the point, the bar is the scale.
 */
export function BarFigure({
  caption, unit, series, label = "Figure 1",
}: {
  caption: string;
  unit: string;
  series: { label: string; value: number }[];
  label?: string;
}) {
  const max = Math.max(...series.map((s) => Math.abs(s.value)));
  const hasNegative = series.some((s) => s.value < 0);

  return (
    <figure className="my-8 rounded-[10px] border border-rule bg-paper-deep/40 p-5 sm:p-6">
      <figcaption className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-rule pb-4">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">{label}</span>
        <span className="flex-1 font-display text-[15px] leading-snug text-ink-soft">{caption}</span>
      </figcaption>
      <ul className="space-y-3.5">
        {series.map((s) => {
          const pct = (Math.abs(s.value) / max) * 100;
          const negative = s.value < 0;
          return (
            <li key={s.label} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 sm:grid-cols-[minmax(0,13rem)_1fr_auto]">
              <span className="text-[13.5px] leading-snug text-ink-soft">{s.label}</span>
              <span className="col-span-2 flex h-2 items-center sm:col-span-1 sm:order-2">
                <span className={cn("relative flex h-2 w-full", hasNegative && "justify-center")}>
                  <span
                    className={cn(
                      "h-2 rounded-[2px] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      negative ? "bg-flag/70" : "bg-accent/80",
                      hasNegative && "absolute top-0",
                      hasNegative && (negative ? "right-1/2" : "left-1/2"),
                    )}
                    style={{ width: `${hasNegative ? pct / 2 : pct}%` }}
                  />
                  {hasNegative && <span className="absolute left-1/2 top-[-3px] h-[14px] w-px bg-rule" />}
                </span>
              </span>
              <span className="u-num font-mono text-[13px] text-ink sm:order-3">
                {s.value > 0 && hasNegative ? "+" : ""}
                {s.value}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-5 border-t border-rule pt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">
        Units: {unit} · Sample data
      </p>
    </figure>
  );
}
