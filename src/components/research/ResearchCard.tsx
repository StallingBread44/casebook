import { Link } from "react-router-dom";
import type { Paper } from "@/data/papers";
import { fieldName } from "@/data/fields";
import { FieldGlyph } from "@/components/ui/FieldGlyph";
import { Icon } from "@/components/ui/Icon";
import { Card, Meta, RecordId, Tag } from "@/components/ui/Surface";
import { cn, formatDateShort } from "@/lib/utils";

export function ResearchCard({ paper, className }: { paper: Paper; className?: string }) {
  return (
    <Card as="article" interactive className={cn("group relative flex flex-col p-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-[7px] border border-rule bg-paper-deep/50 text-accent">
            <FieldGlyph field={paper.field} size={19} />
          </span>
          <div className="leading-tight">
            <p className="text-[12.5px] font-medium text-ink">{fieldName(paper.field)}</p>
            <RecordId>{paper.record}</RecordId>
          </div>
        </div>
        {paper.featured && <Tag tone="accent">Featured</Tag>}
      </div>

      <h3 className="mt-5 text-[20px] leading-[1.22] tracking-[-0.01em]">
        <Link
          to={`/research/${paper.slug}`}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px]">
            {paper.title}
          </span>
        </Link>
      </h3>

      <p className="mt-2.5 text-[13px] text-muted">
        {paper.authors.map((a) => a.name).join(", ")}
      </p>

      <p className="mt-3.5 line-clamp-3 flex-1 text-[14px] leading-relaxed text-muted">{paper.abstract}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <Tag>{paper.type}</Tag>
        {paper.tags.slice(0, 2).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-rule pt-4">
        <Meta icon="calendar">{formatDateShort(paper.published)}</Meta>
        <Meta icon="clock">{paper.readingMinutes} min read</Meta>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[13px] font-medium text-accent transition-colors group-hover:text-accent-ink">
          Read study
          <Icon
            name="arrow-right"
            size={14}
            className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
          />
        </span>
      </div>
    </Card>
  );
}

/** Dense list row for related research and profile portfolios. */
export function ResearchRow({ paper }: { paper: Paper }) {
  return (
    <Link
      to={`/research/${paper.slug}`}
      className="group flex items-start gap-4 border-b border-rule py-4 transition-colors last:border-0 hover:bg-paper-deep/30"
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border border-rule bg-surface text-accent">
        <FieldGlyph field={paper.field} size={17} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-medium leading-snug text-ink transition-colors group-hover:text-accent">
          {paper.title}
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-muted">
          <span>{fieldName(paper.field)}</span>
          <span className="text-rule">·</span>
          <span>{paper.type}</span>
          <span className="text-rule">·</span>
          <span>{paper.readingMinutes} min</span>
        </span>
      </span>
      <Icon
        name="arrow-up-right"
        size={15}
        className="mt-1 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
      />
    </Link>
  );
}
