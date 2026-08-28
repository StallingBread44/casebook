import { Link } from "react-router-dom";
import { TESTIMONIALS } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { SampleTag, SectionHeading } from "@/components/ui/Surface";
import { useReveal } from "@/lib/utils";

export function Testimonials() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="border-y border-rule bg-surface py-20 lg:py-28" aria-labelledby="student-voices">
      <div className="u-shell">
        <SectionHeading
          id="student-voices"
          eyebrow="Student researchers"
          align="between"
          title="What students say about the work"
          action={<SampleTag label="Placeholder testimonials" />}
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <li
              key={t.name}
              className="reveal border-t-2 border-accent/25 pt-6"
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <figure className="flex h-full flex-col">
              <Icon name="quote" size={22} className="text-accent/30" />
              <blockquote className="mt-4 flex-1 font-display text-[18px] leading-[1.45] tracking-[-0.005em] text-ink-soft">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-rule pt-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-rule bg-paper-deep/60 font-mono text-[12px] text-muted">
                  {t.name.charAt(0)}
                </span>
                <span className="leading-tight">
                  {t.handle ? (
                    <Link to={`/students/${t.handle}`} className="text-[14px] font-medium text-ink hover:text-accent">
                      {t.name}
                    </Link>
                  ) : (
                    <span className="text-[14px] font-medium text-ink">{t.name}</span>
                  )}
                  <span className="mt-0.5 block font-mono text-[10.5px] uppercase tracking-[0.1em] text-faint">
                    {t.detail} · {t.field}
                  </span>
                </span>
              </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
