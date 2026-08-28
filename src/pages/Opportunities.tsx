import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PROJECTS } from "@/data/projects";
import { FIELDS, fieldName } from "@/data/fields";
import { DIFFICULTIES, PROJECT_STATUSES } from "@/data/taxonomy";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectCard } from "@/components/project/ProjectCard";
import { DirectoryTabs } from "@/components/research/DirectoryTabs";
import { FilterChip, SearchInput, Select } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import { Notice, SampleTag } from "@/components/ui/Surface";
import { cn, daysUntil } from "@/lib/utils";

type SortKey = "deadline" | "hours" | "difficulty" | "time";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "deadline", label: "Closing soonest" },
  { key: "hours", label: "Most hours" },
  { key: "difficulty", label: "Easiest first" },
  { key: "time", label: "Shortest commitment" },
];

const LEVEL_ORDER = { Introductory: 0, Intermediate: 1, Advanced: 2 } as const;

export default function Opportunities() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState("");
  const [field, setField] = useState("");
  const [levels, setLevels] = useState<string[]>(
    params.get("difficulty") ? [params.get("difficulty")!] : [],
  );
  const [statuses, setStatuses] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("deadline");

  const toggle = (list: string[], set: (v: string[]) => void, value: string) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = PROJECTS.filter((p) => {
      if (q) {
        const hay = [p.title, p.summary, fieldName(p.field), p.deliverable, ...p.skills].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (field && p.field !== field && p.secondaryField !== field) return false;
      if (levels.length && !levels.includes(p.difficulty)) return false;
      if (statuses.length && !statuses.includes(p.status)) return false;
      return true;
    });
    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "hours": return b.maxHours - a.maxHours;
        case "difficulty": return LEVEL_ORDER[a.difficulty] - LEVEL_ORDER[b.difficulty];
        case "time": return parseInt(a.timeCommitment) - parseInt(b.timeCommitment);
        default: return a.deadline.localeCompare(b.deadline);
      }
    });
  }, [query, field, levels, statuses, sort]);

  const totalHours = PROJECTS.filter((p) => p.status !== "Closed").reduce((sum, p) => sum + p.maxHours, 0);
  const openCount = PROJECTS.filter((p) => p.status === "Open" || p.status === "Filling Fast").length;
  const closingSoon = PROJECTS.filter((p) => daysUntil(p.deadline) > 0 && daysUntil(p.deadline) <= 45).length;

  return (
    <>
      <PageHeader
        eyebrow="Research opportunities"
        title="Projects you can actually join"
        lead="Structured research projects with defined questions, provided resources, and a stated maximum of verified hours. Pick one, do the work, submit it for review."
      >
        <DirectoryTabs />
        <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
          {[
            { term: "Open projects", value: String(openCount) },
            { term: "Closing within 45 days", value: String(closingSoon) },
            { term: "Hours available across the board", value: `${totalHours}` },
          ].map((s) => (
            <div key={s.term}>
              <dd className="u-num font-display text-[28px] leading-none text-ink">{s.value}</dd>
              <dt className="mt-1.5 text-[12.5px] text-muted">{s.term}</dt>
            </div>
          ))}
        </dl>
      </PageHeader>

      <div className="u-shell py-10 lg:py-14">
        <Notice title="Hours are a maximum, not a promise." tone="seal" icon="seal">
          Each listing shows the most hours a reviewer may award for fully meeting that project's requirements.
          Partial or incomplete work receives partial hours or a revision request. Before you start, check whether
          your school or program accepts service hours from an outside organization — some do not.
        </Notice>

        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <SearchInput value={query} onChange={setQuery} placeholder="Search projects, fields, skills..." />
          <Select
            value={field}
            onChange={(e) => setField(e.target.value)}
            aria-label="Filter by field"
            className="lg:w-56"
          >
            <option value="">All fields</option>
            {FIELDS.filter((f) => PROJECTS.some((p) => p.field === f.slug || p.secondaryField === f.slug)).map((f) => (
              <option key={f.slug} value={f.slug}>{f.name}</option>
            ))}
          </Select>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-rule pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Difficulty</span>
            {DIFFICULTIES.map((d) => (
              <FilterChip key={d} active={levels.includes(d)} onClick={() => toggle(levels, setLevels, d)}>
                {d}
              </FilterChip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Status</span>
            {PROJECT_STATUSES.map((s) => (
              <FilterChip
                key={s}
                active={statuses.includes(s)}
                onClick={() => toggle(statuses, setStatuses, s)}
                count={PROJECTS.filter((p) => p.status === s).length}
              >
                {s}
              </FilterChip>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-faint sm:inline">Sort</span>
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

        <div className="mt-6 flex items-center gap-3">
          <p className="text-[13.5px] text-muted">
            <span className="u-num font-medium text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "project" : "projects"}
          </p>
          <SampleTag label="Sample listings" />
        </div>

        {results.length > 0 ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {results.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-card border border-dashed border-rule bg-surface p-12 text-center">
            <p className="font-display text-[20px] text-ink">No projects match those filters</p>
            <p className="mx-auto mt-2 max-w-sm text-[14px] text-muted">
              New projects open every few weeks. Try widening the field or difficulty.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-5"
              onClick={() => {
                setQuery(""); setField(""); setLevels([]); setStatuses([]);
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
