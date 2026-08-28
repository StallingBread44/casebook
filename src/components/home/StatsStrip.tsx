import { STATS } from "@/data/site";
import { SampleTag } from "@/components/ui/Surface";
import { useReveal } from "@/lib/utils";

export function StatsStrip() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="border-b border-rule bg-surface" aria-label="Organization statistics">
      <div className="u-shell py-10">
        <div className="mb-6 flex items-center gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">By the numbers</p>
          <span className="h-px flex-1 bg-rule" />
          <SampleTag label="Placeholder figures" />
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="reveal border-l border-rule pl-5"
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <dd className="u-num font-display text-[clamp(2rem,4vw,2.75rem)] leading-none tracking-[-0.02em] text-ink">
                {stat.value}
              </dd>
              <dt className="mt-2.5 text-[14px] font-medium text-ink-soft">{stat.label}</dt>
              <p className="mt-1 text-[12.5px] leading-snug text-muted">{stat.note}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
