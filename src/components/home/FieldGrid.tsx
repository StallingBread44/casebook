import { Link } from "react-router-dom";
import { FIELDS } from "@/data/fields";
import { FieldGlyph } from "@/components/ui/FieldGlyph";
import { SectionHeading } from "@/components/ui/Surface";
import { Button } from "@/components/ui/Button";
import { useReveal } from "@/lib/utils";

export function FieldGrid() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="u-shell py-20 lg:py-28" aria-labelledby="explore-research">
      <SectionHeading
        id="explore-research"
        eyebrow="Explore research"
        align="between"
        title="Twenty fields, one catalog"
        lead="Every study is filed under a field and a record number. Start where you are curious — the introductory work in each field assumes nothing."
        action={<Button to="/research" variant="secondary" icon="arrow-right">Open the library</Button>}
      />

      <ul className="mt-12 grid gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {FIELDS.map((field, i) => (
          <li
            key={field.slug}
            className="reveal bg-surface"
            style={{ "--reveal-delay": `${Math.min(i * 35, 420)}ms` } as React.CSSProperties}
          >
            <Link
              to={`/research?field=${field.slug}`}
              className="group flex h-full flex-col p-5 transition-colors duration-300 hover:bg-paper-deep/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-accent transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
                  <FieldGlyph field={field.slug} size={26} />
                </span>
                <span className="u-num font-mono text-[10.5px] tracking-[0.08em] text-faint">
                  {field.code} · {field.studies}
                </span>
              </div>
              <h3 className="mt-4 font-sans text-[15px] font-semibold tracking-[-0.005em] text-ink">{field.name}</h3>
              <p className="mt-1.5 text-[13px] leading-snug text-muted">{field.blurb}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
