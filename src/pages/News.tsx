import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { NEWS, NEWS_KINDS, type NewsItem } from "@/data/news";
import { FIELDS, fieldName, type FieldSlug } from "@/data/fields";
import { PAPER_BY_SLUG } from "@/data/papers";
import { PROJECT_BY_SLUG } from "@/data/projects";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { FieldGlyph } from "@/components/ui/FieldGlyph";
import { Icon } from "@/components/ui/Icon";
import { FilterChip, Label, Select, TextInput } from "@/components/ui/Form";
import { Card, Notice, RecordId, SampleTag, Tag } from "@/components/ui/Surface";
import { cn, formatDate, formatDateShort, useReveal } from "@/lib/utils";

const KIND_TONE: Record<string, string> = {
  Dataset: "border-accent/25 bg-accent-soft text-accent-ink",
  Tool: "border-accent/25 bg-accent-soft text-accent-ink",
  Policy: "border-seal/30 bg-seal-soft text-seal",
  Correction: "border-flag/25 bg-flag-soft text-flag",
};

function KindTag({ kind }: { kind: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[4px] border px-2 py-[3px] text-[11.5px] leading-none",
        KIND_TONE[kind] ?? "border-rule bg-paper-deep/60 text-muted",
      )}
    >
      {kind}
    </span>
  );
}

/** Links from an item back into the platform — the reason it is on this page. */
function ItemLinks({ item }: { item: NewsItem }) {
  const paper = item.relatedPaper ? PAPER_BY_SLUG[item.relatedPaper] : undefined;
  const project = item.relatedProject ? PROJECT_BY_SLUG[item.relatedProject] : undefined;
  if (!paper && !project) return null;

  return (
    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-rule pt-4">
      {project && (
        <Link
          to={`/opportunities/${project.slug}`}
          className="group inline-flex items-center gap-2 text-[13px] text-accent hover:text-accent-ink"
        >
          <Icon name="list" size={14} />
          Work on this: {project.title}
          <Icon name="arrow-right" size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
      {paper && (
        <Link
          to={`/research/${paper.slug}`}
          className="group inline-flex items-center gap-2 text-[13px] text-muted hover:text-accent"
        >
          <Icon name="file" size={14} />
          Related study in the library
          <Icon name="arrow-right" size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

function LeadStory({ item }: { item: NewsItem }) {
  return (
    <Card className="reveal relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 u-hairgrid opacity-[0.35]" aria-hidden="true" />
      <div className="relative p-7 sm:p-9">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 text-accent">
            <FieldGlyph field={item.field} size={20} />
            <span className="text-[13px] font-medium text-ink">{fieldName(item.field)}</span>
          </span>
          <span className="h-3.5 w-px bg-rule" />
          <KindTag kind={item.kind} />
          <span className="text-[12.5px] text-muted">{formatDate(item.date)}</span>
          <SampleTag />
        </div>

        <h2 className="mt-5 max-w-[26ch] text-[clamp(1.6rem,3.2vw,2.35rem)] leading-[1.12] tracking-[-0.018em]">
          {item.headline}
        </h2>
        <p className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-muted">{item.summary}</p>

        <div className="mt-5 border-l-2 border-accent/30 pl-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">Why it matters</p>
          <p className="mt-1.5 max-w-[58ch] text-[14.5px] leading-relaxed text-ink-soft">{item.whyItMatters}</p>
        </div>

        <ItemLinks item={item} />
      </div>
    </Card>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Card as="article" className="reveal p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="flex items-center gap-2 text-accent">
          <FieldGlyph field={item.field} size={17} />
          <span className="text-[12.5px] font-medium text-ink">{fieldName(item.field)}</span>
        </span>
        {item.secondaryField && (
          <span className="text-[12.5px] text-muted">/ {fieldName(item.secondaryField)}</span>
        )}
        <span className="h-3 w-px bg-rule" />
        <KindTag kind={item.kind} />
        <span className="ml-auto flex items-center gap-2.5">
          <span className="text-[12.5px] text-muted">{formatDateShort(item.date)}</span>
          <RecordId>{item.id}</RecordId>
        </span>
      </div>

      <h3 className="mt-4 max-w-[46ch] text-[21px] leading-[1.24] tracking-[-0.012em]">{item.headline}</h3>
      <p className="mt-3 max-w-[70ch] text-[14.5px] leading-relaxed text-muted">{item.summary}</p>

      <div className="mt-4 border-l-2 border-accent/25 pl-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">Why it matters</p>
        <p className="mt-1.5 max-w-[64ch] text-[14px] leading-relaxed text-ink-soft">{item.whyItMatters}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <ItemLinks item={item} />
    </Card>
  );
}

export default function News() {
  const ref = useReveal<HTMLDivElement>();
  const [field, setField] = useState<FieldSlug | "">("");
  const [kind, setKind] = useState<string>("");

  const sorted = useMemo(() => [...NEWS].sort((a, b) => b.date.localeCompare(a.date)), []);

  const results = useMemo(
    () =>
      sorted.filter((item) => {
        if (field && item.field !== field && item.secondaryField !== field) return false;
        if (kind && item.kind !== kind) return false;
        return true;
      }),
    [sorted, field, kind],
  );

  const fieldsWithNews = FIELDS.filter((f) =>
    NEWS.some((n) => n.field === f.slug || n.secondaryField === f.slug),
  );
  const countFor = (slug: string) =>
    NEWS.filter((n) => n.field === slug || n.secondaryField === slug).length;

  const [lead, ...rest] = results;
  const showLead = !field && !kind;

  return (
    <>
      <PageHeader
        eyebrow="Field notes"
        title="What's new in each major"
        lead="A monthly briefing on the research news that changes what a student can actually work on — new datasets, method standards, tools, and results, sorted by field."
      >
        <div className="flex flex-wrap items-center gap-3">
          <SampleTag label="Sample briefing" />
          <span className="text-[13px] text-faint">
            {NEWS.length} example items across {fieldsWithNews.length} fields, written for this preview build.
          </span>
        </div>
      </PageHeader>

      <div ref={ref} className="u-shell py-10 lg:py-14">
        {/* Field selector — the page's organizing idea */}
        <section aria-label="Filter by major">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Browse by major</p>
            {(field || kind) && (
              <button
                onClick={() => {
                  setField("");
                  setKind("");
                }}
                className="text-[12.5px] text-accent hover:underline"
              >
                Show every field
              </button>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <FilterChip active={!field} onClick={() => setField("")} count={NEWS.length}>
              All fields
            </FilterChip>
            {fieldsWithNews.map((f) => (
              <FilterChip
                key={f.slug}
                active={field === f.slug}
                onClick={() => setField(field === f.slug ? "" : f.slug)}
                count={countFor(f.slug)}
              >
                <span className="flex items-center gap-1.5">
                  <FieldGlyph field={f.slug} size={14} />
                  {f.name}
                </span>
              </FilterChip>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-b border-rule pb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Type</span>
            {NEWS_KINDS.filter((k) => NEWS.some((n) => n.kind === k)).map((k) => (
              <FilterChip key={k} active={kind === k} onClick={() => setKind(kind === k ? "" : k)}>
                {k}
              </FilterChip>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-12">
          <div>
            <p className="mb-5 text-[13.5px] text-muted">
              <span className="u-num font-medium text-ink">{results.length}</span>{" "}
              {results.length === 1 ? "item" : "items"}
              {field && ` in ${fieldName(field as FieldSlug)}`}
              {kind && ` · ${kind}`}
            </p>

            {results.length === 0 ? (
              <div className="rounded-card border border-dashed border-rule bg-surface p-12 text-center">
                <p className="font-display text-[20px] text-ink">Nothing filed under that combination yet</p>
                <p className="mx-auto mt-2 max-w-sm text-[14px] text-muted">
                  Field Notes runs monthly. Try another type, or browse every field.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-5"
                  onClick={() => {
                    setField("");
                    setKind("");
                  }}
                >
                  Show every field
                </Button>
              </div>
            ) : (
              <div className="space-y-5">
                {showLead && lead && <LeadStory item={lead} />}
                {(showLead ? rest : results).map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
            <Card className="p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Get the digest</p>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
                One email a month with the items filed under the majors you pick. No other mail.
              </p>
              <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <Label htmlFor="digest-field">Your major</Label>
                  <Select id="digest-field" defaultValue={field || ""}>
                    <option value="">Every field</option>
                    {FIELDS.map((f) => (
                      <option key={f.slug} value={f.slug}>
                        {f.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="digest-email">Email</Label>
                  <TextInput id="digest-email" type="email" placeholder="you@school.edu" />
                </div>
                <Button type="submit" full size="sm" icon="arrow-right">
                  Subscribe
                </Button>
                <p className="text-center text-[12px] text-faint">Preview build — nothing is sent yet.</p>
              </form>
            </Card>

            {field && (
              <Card className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  More in {fieldName(field as FieldSlug)}
                </p>
                <div className="mt-3 space-y-2">
                  <Link
                    to={`/research?field=${field}`}
                    className="group flex items-center justify-between gap-3 rounded-[7px] border border-rule px-3 py-2.5 text-[13.5px] text-ink transition-colors hover:border-ink/25"
                  >
                    Published studies
                    <Icon name="arrow-right" size={14} className="text-faint transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/opportunities"
                    className="group flex items-center justify-between gap-3 rounded-[7px] border border-rule px-3 py-2.5 text-[13.5px] text-ink transition-colors hover:border-ink/25"
                  >
                    Open projects
                    <Icon name="arrow-right" size={14} className="text-faint transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </Card>
            )}

            <Notice title="How we choose items" tone="neutral" icon="eye">
              Field Notes covers things that change what a student can do this month: a dataset that
              opened, a method that became standard, a tool that got cheaper. Results are included
              when they are large, replicated, or usefully wrong.
            </Notice>

            <Notice title="Sample briefing" tone="accent" icon="alert">
              Every item on this page is placeholder copy for this preview build. No real event,
              journal, or institution is described. Replace{" "}
              <span className="font-mono text-[12.5px]">src/data/news.ts</span> with edited items and
              real citations.
            </Notice>
          </aside>
        </div>
      </div>
    </>
  );
}
