import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PAPER_BY_SLUG, relatedPapers, type Paper } from "@/data/papers";
import { fieldName } from "@/data/fields";
import { ORG } from "@/data/site";
import { STUDENT_BY_HANDLE } from "@/data/students";
import { BarFigure } from "@/components/ui/BarFigure";
import { Button } from "@/components/ui/Button";
import { FieldGlyph } from "@/components/ui/FieldGlyph";
import { Icon } from "@/components/ui/Icon";
import { ResearchRow } from "@/components/research/ResearchCard";
import { Card, Notice, RecordId, SampleTag, Tag } from "@/components/ui/Surface";
import { cn, formatDate } from "@/lib/utils";
import NotFound from "./NotFound";

const SECTIONS = [
  { id: "abstract", label: "Abstract" },
  { id: "question", label: "Research question" },
  { id: "background", label: "Background" },
  { id: "methodology", label: "Methodology" },
  { id: "findings", label: "Findings" },
  { id: "discussion", label: "Discussion" },
  { id: "conclusion", label: "Conclusion" },
  { id: "references", label: "References" },
];

function Section({
  n, id, title, paragraphs, children,
}: {
  n: string;
  id: string;
  title: string;
  paragraphs?: string[];
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-rule pt-8">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">§ {n}</span>
        <h2 className="text-[24px] leading-tight tracking-[-0.012em]">{title}</h2>
      </div>
      <div className="u-prose text-[16.5px] leading-[1.72] text-ink-soft">
        {paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
        {children}
      </div>
    </section>
  );
}

function citations(paper: Paper) {
  const authors = paper.authors.map((a) => a.name);
  const year = paper.published.slice(0, 4);
  const apaAuthors = authors
    .map((n) => {
      const parts = n.split(" ");
      return `${parts[parts.length - 1]}, ${parts[0][0]}.`;
    })
    .join(", & ");
  return {
    APA: `${apaAuthors} (${year}). ${paper.title}. ${ORG.name}, ${paper.volume}. Record ${paper.record}.`,
    MLA: `${authors.join(", and ")}. "${paper.title}." ${ORG.name}, ${paper.volume}, ${year}, record ${paper.record}.`,
    Chicago: `${authors.join(" and ")}. "${paper.title}." ${ORG.name} ${paper.volume} (${year}). Record ${paper.record}.`,
    BibTeX: `@article{${paper.slug.replace(/-/g, "")}${year},\n  title = {${paper.title}},\n  author = {${authors.join(" and ")}},\n  journal = {${ORG.name}},\n  volume = {${paper.volume}},\n  year = {${year}},\n  note = {Record ${paper.record}}\n}`,
  };
}

export default function ResearchDetail() {
  const { slug } = useParams();
  const paper = slug ? PAPER_BY_SLUG[slug] : undefined;
  const [citeOpen, setCiteOpen] = useState(false);
  const [citeStyle, setCiteStyle] = useState<"APA" | "MLA" | "Chicago" | "BibTeX">("APA");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  if (!paper) return <NotFound />;

  const related = relatedPapers(paper);
  const cites = citations(paper);

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied("error");
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <>
      <header className="border-b border-rule bg-surface">
        <div className="u-shell py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="mb-6 print:hidden">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">
              <li><Link to="/research" className="hover:text-accent">Research library</Link></li>
              <li><Icon name="chevron-right" size={11} className="text-rule" /></li>
              <li>
                <Link to={`/research?field=${paper.field}`} className="hover:text-accent">
                  {fieldName(paper.field)}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 text-accent">
              <FieldGlyph field={paper.field} size={20} />
              <span className="text-[13px] font-medium text-ink">{fieldName(paper.field)}</span>
            </span>
            <span className="h-3.5 w-px bg-rule" />
            <RecordId>{paper.record}</RecordId>
            <span className="h-3.5 w-px bg-rule" />
            <RecordId>{paper.volume}</RecordId>
            {paper.featured && <Tag tone="accent">Editor's selection</Tag>}
            <SampleTag />
          </div>

          <h1 className="u-rise mt-5 max-w-[24ch] text-[clamp(2rem,4.6vw,3.15rem)] leading-[1.08] tracking-[-0.02em]">
            {paper.title}
          </h1>

          <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Authors</p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                {paper.authors.map((a) => {
                  const linked = a.handle && STUDENT_BY_HANDLE[a.handle];
                  return (
                    <li key={a.name} className="leading-tight">
                      {linked ? (
                        <Link to={`/students/${a.handle}`} className="text-[15px] font-medium text-ink hover:text-accent">
                          {a.name}
                        </Link>
                      ) : (
                        <span className="text-[15px] font-medium text-ink">{a.name}</span>
                      )}
                      <span className="mt-0.5 block text-[12.5px] text-muted">
                        {a.school}
                        {a.grade && ` · ${a.grade}`}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="text-[13px] text-muted">
              <p>
                Published <span className="text-ink">{formatDate(paper.published)}</span>
              </p>
              <p className="mt-1">{ORG.name}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="u-shell py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14 print:block">
          <article className="max-w-[68ch] print:max-w-none">
            {/* Abstract sits in its own frame, the way a journal sets it */}
            <section id="abstract" className="scroll-mt-28 rounded-card border border-rule bg-surface p-6 sm:p-8">
              <div className="mb-4 flex items-baseline gap-3">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">Abstract</span>
                <span className="h-px flex-1 bg-rule" />
              </div>
              <p className="font-display text-[18px] leading-[1.6] text-ink-soft">{paper.abstract}</p>
              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-rule pt-5">
                <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">Keywords</span>
                {paper.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </section>

            <div className="mt-10 space-y-10">
              <section id="question" className="scroll-mt-28 border-l-2 border-accent pl-6">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">Research question</p>
                <p className="mt-3 font-display text-[21px] leading-[1.42] tracking-[-0.008em] text-ink">
                  {paper.researchQuestion}
                </p>
              </section>

              <Section n="01" id="background" title="Background" paragraphs={paper.background} />
              <Section n="02" id="methodology" title="Methodology" paragraphs={paper.methodology} />
              <Section n="03" id="findings" title="Findings">
                {paper.findings.map((p, i) => <p key={i}>{p}</p>)}
                {paper.figure && (
                  <BarFigure
                    caption={paper.figure.caption}
                    unit={paper.figure.unit}
                    series={paper.figure.series}
                  />
                )}
              </Section>
              <Section n="04" id="discussion" title="Discussion" paragraphs={paper.discussion} />
              <Section n="05" id="conclusion" title="Conclusion" paragraphs={paper.conclusion} />

              <section id="references" className="scroll-mt-28 border-t border-rule pt-8">
                <div className="mb-5 flex items-baseline gap-3">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">§ 06</span>
                  <h2 className="text-[24px] leading-tight tracking-[-0.012em]">References</h2>
                </div>
                <ol className="space-y-3.5">
                  {paper.references.map((ref, i) => (
                    <li key={i} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-2 text-[14.5px] leading-relaxed text-ink-soft">
                      <span className="u-num font-mono text-[12px] text-faint">[{i + 1}]</span>
                      <span>{ref}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <Notice title="Sample publication" tone="neutral" icon="alert">
                This study was written as placeholder content for this preview build. Its data, findings, and
                references are illustrative and should not be cited as real research.
              </Notice>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit print:hidden">
            <Card className="overflow-hidden">
              <div className="border-b border-rule bg-paper-deep/40 px-5 py-3.5">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink">Research information</p>
              </div>
              <dl className="divide-y divide-rule">
                {[
                  { term: "Field", value: fieldName(paper.field) },
                  ...(paper.secondaryField ? [{ term: "Secondary field", value: fieldName(paper.secondaryField) }] : []),
                  { term: "Research type", value: paper.type },
                  { term: "Difficulty", value: paper.difficulty },
                  { term: "Reading time", value: `${paper.readingMinutes} minutes` },
                  { term: "Published", value: formatDate(paper.published) },
                  { term: "Record", value: paper.record, mono: true },
                ].map((row) => (
                  <div key={row.term} className="flex items-baseline justify-between gap-4 px-5 py-3">
                    <dt className="text-[12.5px] text-muted">{row.term}</dt>
                    <dd className={cn("text-right text-[13.5px] text-ink", row.mono && "font-mono text-[12px]")}>
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="space-y-2 border-t border-rule p-4">
                <Button full iconLeft="download" onClick={() => window.print()}>Download PDF</Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="secondary" size="sm" iconLeft="quote" onClick={() => setCiteOpen((v) => !v)}>
                    Cite
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    iconLeft="share"
                    onClick={() => copy(window.location.href, "link")}
                  >
                    {copied === "link" ? "Copied" : "Share"}
                  </Button>
                </div>
                <Button
                  variant={saved ? "ghost" : "secondary"}
                  size="sm"
                  full
                  iconLeft={saved ? "check" : "bookmark"}
                  onClick={() => setSaved((v) => !v)}
                >
                  {saved ? "Saved to your library" : "Save"}
                </Button>
              </div>
            </Card>

            {citeOpen && (
              <Card className="mt-4 overflow-hidden">
                <div className="flex border-b border-rule">
                  {(["APA", "MLA", "Chicago", "BibTeX"] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => setCiteStyle(style)}
                      className={cn(
                        "flex-1 px-2 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.1em] transition-colors",
                        citeStyle === style ? "bg-ink text-paper" : "text-muted hover:text-ink",
                      )}
                    >
                      {style}
                    </button>
                  ))}
                </div>
                <div className="p-4">
                  <p className="whitespace-pre-wrap break-words font-mono text-[11.5px] leading-relaxed text-ink-soft">
                    {cites[citeStyle]}
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    full
                    className="mt-3"
                    iconLeft={copied === "cite" ? "check" : "file"}
                    onClick={() => copy(cites[citeStyle], "cite")}
                  >
                    {copied === "cite" ? "Citation copied" : "Copy citation"}
                  </Button>
                </div>
              </Card>
            )}

            <nav aria-label="Contents" className="mt-4 hidden lg:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Contents</p>
              <ul className="mt-3 space-y-1.5 border-l border-rule">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px block border-l border-transparent py-0.5 pl-4 text-[13px] text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>

        {/* Related research */}
        <section className="mt-16 border-t border-rule pt-10 print:hidden">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="u-eyebrow">Related research</p>
              <h2 className="mt-2 text-[26px]">Read next</h2>
            </div>
            <Button to="/research" variant="quiet" icon="arrow-right">Browse the full library</Button>
          </div>
          <div className="mt-6 grid gap-x-10 md:grid-cols-2">
            {related.map((p) => (
              <ResearchRow key={p.slug} paper={p} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
