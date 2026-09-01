import { PAPERS } from "@/data/papers";
import { ResearchCard } from "@/components/research/ResearchCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Surface";
import { useReveal } from "@/lib/utils";

export function FeaturedResearch() {
  const ref = useReveal<HTMLElement>();
  const featured = PAPERS.filter((p) => p.featured).slice(0, 4);

  return (
    <section ref={ref} className="border-y border-rule bg-surface py-20 lg:py-28" aria-labelledby="featured-research">
      <div className="u-shell">
        <SectionHeading
          id="featured-research"
          eyebrow="Featured research"
          align="between"
          title="Selected from the current issue"
          lead="Four studies chosen by our editors. Each one was written by a high school student, revised at least once, and approved before publication."
          action={<Button to="/research?sort=featured" variant="secondary" icon="arrow-right">See all studies</Button>}
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {featured.map((paper, i) => (
            <div key={paper.slug} className="reveal" style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
              <ResearchCard paper={paper} className="h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
