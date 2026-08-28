import { Link } from "react-router-dom";
import type { Project } from "@/data/projects";
import { fieldName } from "@/data/fields";
import { FieldGlyph } from "@/components/ui/FieldGlyph";
import { Icon } from "@/components/ui/Icon";
import { Card, Meta, RecordId, Tag } from "@/components/ui/Surface";
import { cn, daysUntil, formatDateShort } from "@/lib/utils";

const STATUS_TONE = {
  Open: "border-accent/30 bg-accent-soft text-accent-ink",
  "Filling Fast": "border-seal/30 bg-seal-soft text-seal",
  Waitlist: "border-rule bg-paper-deep/70 text-muted",
  Closed: "border-rule bg-paper-deep/70 text-faint",
} as const;

export function ProjectStatusBadge({ status }: { status: Project["status"] }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-[3px] text-[11.5px] leading-none", STATUS_TONE[status])}>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const days = daysUntil(project.deadline);

  return (
    <Card as="article" interactive className="group relative flex flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-[7px] border border-rule bg-paper-deep/50 text-accent">
            <FieldGlyph field={project.field} size={19} />
          </span>
          <div className="leading-tight">
            <p className="text-[12.5px] font-medium text-ink">
              {fieldName(project.field)}
              {project.secondaryField && (
                <span className="text-muted"> / {fieldName(project.secondaryField)}</span>
              )}
            </p>
            <RecordId>{project.record}</RecordId>
          </div>
        </div>
        <ProjectStatusBadge status={project.status} />
      </div>

      <h3 className="mt-5 text-[19px] leading-[1.25] tracking-[-0.01em]">
        <Link to={`/opportunities/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px]">
            {project.title}
          </span>
        </Link>
      </h3>

      <p className="mt-3 line-clamp-3 flex-1 text-[14px] leading-relaxed text-muted">{project.summary}</p>

      {/* The three numbers a student actually decides on */}
      <dl className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-[8px] border border-rule bg-rule">
        {[
          { term: "Difficulty", value: project.difficulty },
          { term: "Time", value: project.timeCommitment },
          { term: "Hours up to", value: `${project.maxHours}`, seal: true },
        ].map((item) => (
          <div key={item.term} className="bg-surface px-3 py-2.5">
            <dt className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-faint">{item.term}</dt>
            <dd className={cn("mt-1 text-[13px] font-medium leading-tight", item.seal ? "u-num text-seal" : "text-ink")}>
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <Tag>{project.deliverable}</Tag>
        {project.skills.slice(0, 2).map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-rule pt-4">
        <Meta icon="calendar">
          {days > 0 ? `Applications close ${formatDateShort(project.deadline)}` : "Closed"}
        </Meta>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[13px] font-medium text-accent">
          View project
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
