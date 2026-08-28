import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PAPERS } from "@/data/papers";
import { FIELDS, fieldName } from "@/data/fields";
import { DATE_BANDS, DIFFICULTIES, READING_TIME_BANDS, RESEARCH_TYPES } from "@/data/taxonomy";
import { PageHeader } from "@/components/layout/PageHeader";
import { ResearchCard } from "@/components/research/ResearchCard";
import { DirectoryTabs } from "@/components/research/DirectoryTabs";
import { FieldGlyph } from "@/components/ui/FieldGlyph";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Checkbox, SearchInput, Select } from "@/components/ui/Form";
import { Hairline, SampleTag } from "@/components/ui/Surface";
import { cn, monthsSince } from "@/lib/utils";

type SortKey = "recent" | "popular" | "featured" | "alpha";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "recent", label: "Most recent" },
  { key: "popular", label: "Most read" },
  { key: "featured", label: "Featured" },
  { key: "alpha", label: "A–Z" },
];

const AUTHORS = Array.from(new Set(PAPERS.flatMap((p) => p.authors.map((a) => a.name)))).sort();

function FilterGroup({
  label, children, count,
}: { label: string; children: React.ReactNode; count?: number }) {
  return (
    <details open className="group border-b border-rule py-4 last:border-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink">{label}</span>
        <span className="flex items-center gap-2">
          {!!count && <span className="u-num font-mono text-[10.5px] text-accent">{count}</span>}
          <Icon name="chevron-down" size={14} className="text-faint transition-transform duration-300 group-open:rotate-180" />
        </span>
      </summary>
      <div className="mt-3.5 space-y-2.5">{children}</div>
    </details>
  );
}

export default function ResearchLibrary() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [fields, setFields] = useState<string[]>(params.get("field") ? [params.get("field")!] : []);
  const [types, setTypes] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [dateBand, setDateBand] = useState<string>("");
  const [readBands, setReadBands] = useState<string[]>([]);
  const [author, setAuthor] = useState("");
  const [flags, setFlags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>(((params.get("sort") as SortKey) || "recent"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggle = (list: string[], set: (v: string[]) => void, value: string) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = PAPERS.filter((p) => {
      if (q) {
        const haystack = [
          p.title, p.abstract, fieldName(p.field), p.type,
          ...p.tags, ...p.authors.map((a) => a.name), p.record,
        ].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (fields.length && !fields.includes(p.field) && !(p.secondaryField && fields.includes(p.secondaryField))) return false;
      if (types.length && !types.includes(p.type)) return false;
      if (levels.length && !levels.includes(p.difficulty)) return false;
      if (author && !p.authors.some((a) => a.name === author)) return false;
      if (dateBand) {
        const band = DATE_BANDS.find((b) => b.id === dateBand);
        if (band && monthsSince(p.published) > band.months) return false;
      }
      if (readBands.length) {
        const match = READING_TIME_BANDS.some((b) => readBands.includes(b.id) && b.test(p.readingMinutes));
        if (!match) return false;
      }
      if (flags.includes("featured") && !p.featured) return false;
      if (flags.includes("figure") && !p.figure) return false;
      return true;
    });

    out = [...out].sort((a, b) => {
      switch (sort) {
        case "popular": return b.reads - a.reads;
        case "featured": return Number(!!b.featured) - Number(!!a.featured) || b.reads - a.reads;
        case "alpha": return a.title.localeCompare(b.title);
        default: return b.published.localeCompare(a.published);
      }
    });
    return out;
  }, [query, fields, types, levels, dateBand, readBands, author, flags, sort]);

  const activeCount =
    fields.length + types.length + levels.length + readBands.length + flags.length + (author ? 1 : 0) + (dateBand ? 1 : 0);

  const clearAll = () => {
    setFields([]); setTypes([]); setLevels([]); setReadBands([]); setFlags([]);
    setAuthor(""); setDateBand(""); setQuery("");
    setParams({});
  };

  const filters = (
    <div className="rounded-card border border-rule bg-surface px-5 py-1">
      <FilterGroup label="Field" count={fields.length}>
        <div className="max-h-[15.5rem] space-y-2.5 overflow-y-auto pr-1">
          {FIELDS.map((f) => {
            const n = PAPERS.filter((p) => p.field === f.slug || p.secondaryField === f.slug).length;
            const selected = fields.includes(f.slug);
            return (
              <button
                key={f.slug}
                type="button"
                aria-pressed={selected}
                onClick={() => toggle(fields, setFields, f.slug)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-[5px] py-0.5 text-left text-[13.5px] transition-colors hover:text-ink",
                  n === 0 && "opacity-45",
                )}
              >
                <span
                  className={cn(
                    "flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[3px] border transition-colors",
                    selected ? "border-accent bg-accent text-white" : "border-rule bg-surface",
                  )}
                >
                  {selected && <Icon name="check" size={9} strokeWidth={3} />}
                </span>
                <span className="flex flex-1 items-center gap-2 text-ink-soft">
                  <FieldGlyph field={f.slug} size={15} />
                  {f.name}
                </span>
                <span className="u-num font-mono text-[10.5px] text-faint">{n}</span>
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup label="Research type" count={types.length}>
        {RESEARCH_TYPES.map((t) => (
          <Checkbox key={t} id={`type-${t}`} checked={types.includes(t)} onChange={() => toggle(types, setTypes, t)} label={t} />
        ))}
      </FilterGroup>

      <FilterGroup label="Difficulty" count={levels.length}>
        {DIFFICULTIES.map((d) => (
          <Checkbox key={d} id={`diff-${d}`} checked={levels.includes(d)} onChange={() => toggle(levels, setLevels, d)} label={d} />
        ))}
      </FilterGroup>

      <FilterGroup label="Publication date" count={dateBand ? 1 : 0}>
        <Select value={dateBand} onChange={(e) => setDateBand(e.target.value)} aria-label="Publication date">
          <option value="">Any time</option>
          {DATE_BANDS.map((b) => (
            <option key={b.id} value={b.id}>{b.label}</option>
          ))}
        </Select>
      </FilterGroup>

      <FilterGroup label="Author" count={author ? 1 : 0}>
        <Select value={author} onChange={(e) => setAuthor(e.target.value)} aria-label="Author">
          <option value="">All authors</option>
          {AUTHORS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </Select>
      </FilterGroup>

      <FilterGroup label="Reading time" count={readBands.length}>
        {READING_TIME_BANDS.map((b) => (
          <Checkbox key={b.id} id={`read-${b.id}`} checked={readBands.includes(b.id)} onChange={() => toggle(readBands, setReadBands, b.id)} label={b.label} />
        ))}
      </FilterGroup>

      <FilterGroup label="Status" count={flags.length}>
        <Checkbox id="flag-published" checked disabled onChange={() => {}} label="Published" description="Everything in the library has passed review." />
        <Checkbox id="flag-featured" checked={flags.includes("featured")} onChange={() => toggle(flags, setFlags, "featured")} label="Editor's selection" />
        <Checkbox id="flag-figure" checked={flags.includes("figure")} onChange={() => toggle(flags, setFlags, "figure")} label="Includes a data figure" />
      </FilterGroup>
    </div>
  );

  return (
    <>
      <PageHeader
        eyebrow="Research library"
        title="Every study, indexed and searchable"
        lead="Student research across twenty fields, filed by record number. Filter by field, method, difficulty, or how long you have to read."
      >
        <DirectoryTabs />
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <SampleTag label="Sample catalog" />
          <span className="text-[13px] text-faint">
            {PAPERS.length} example studies written for this preview build.
          </span>
        </div>
      </PageHeader>

      <div className="u-shell py-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">Filters</p>
                {activeCount > 0 && (
                  <button onClick={clearAll} className="text-[12.5px] text-accent hover:underline">
                    Clear all ({activeCount})
                  </button>
                )}
              </div>
              {filters}
            </div>
          </aside>

          <div>
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search research, topics, authors..."
              id="library-search"
            />

            <div className="mt-5 flex flex-wrap items-center gap-3 border-b border-rule pb-5">
              <p className="text-[13.5px] text-muted">
                <span className="u-num font-medium text-ink">{results.length}</span>{" "}
                {results.length === 1 ? "study" : "studies"}
                {activeCount > 0 && " matching your filters"}
              </p>

              <button
                onClick={() => setDrawerOpen(true)}
                className="inline-flex items-center gap-2 rounded-[7px] border border-rule bg-surface px-3 py-1.5 text-[13px] text-ink lg:hidden"
              >
                <Icon name="sliders" size={15} />
                Filters
                {activeCount > 0 && <span className="u-num font-mono text-[11px] text-accent">{activeCount}</span>}
              </button>

              <div className="ml-auto flex items-center gap-1.5">
                <span className="hidden font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint sm:inline">Sort</span>
                <div className="flex flex-wrap gap-1 rounded-[8px] border border-rule bg-surface p-1">
                  {SORTS.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setSort(s.key)}
                      aria-pressed={sort === s.key}
                      className={cn(
                        "rounded-[5px] px-2.5 py-1 text-[12.5px] transition-colors duration-200",
                        sort === s.key ? "bg-ink text-paper" : "text-muted hover:text-ink",
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {results.length > 0 ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {results.map((paper) => (
                  <ResearchCard key={paper.slug} paper={paper} className="h-full" />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-card border border-dashed border-rule bg-surface p-12 text-center">
                <p className="font-display text-[20px] text-ink">No studies match those filters</p>
                <p className="mx-auto mt-2 max-w-sm text-[14px] text-muted">
                  Try removing a filter, or search a broader term like a field name or a method.
                </p>
                <Button onClick={clearAll} variant="secondary" size="sm" className="mt-5">Clear all filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          drawerOpen ? "visible" : "invisible pointer-events-none",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <div
          className={cn("absolute inset-0 bg-ink/40 transition-opacity duration-300", drawerOpen ? "opacity-100" : "opacity-0")}
          onClick={() => setDrawerOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 max-h-[86vh] overflow-y-auto rounded-t-[16px] border-t border-rule bg-paper transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            drawerOpen ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-rule bg-paper px-5 py-4">
            <p className="font-display text-[19px]">Filters</p>
            <div className="flex items-center gap-3">
              {activeCount > 0 && (
                <button onClick={clearAll} className="text-[13px] text-accent">Clear all</button>
              )}
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filters"
                className="rounded-[6px] p-2 text-muted hover:bg-paper-deep"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
          </div>
          <div className="px-5 py-4">{filters}</div>
          <Hairline />
          <div className="sticky bottom-0 bg-paper px-5 py-4">
            <Button full size="lg" onClick={() => setDrawerOpen(false)}>
              Show {results.length} {results.length === 1 ? "study" : "studies"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
