import { SUBMISSION_STAGES, type SubmissionStage } from "@/data/taxonomy";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

/**
 * The submission pipeline. Order carries real information here — a paper
 * cannot reach "Published" without passing through review — so the stages
 * are numbered and directional.
 */
export function Pipeline({
  current, compact = false, className,
}: { current: SubmissionStage; compact?: boolean; className?: string }) {
  const currentIndex = SUBMISSION_STAGES.indexOf(current);
  const isRevision = current === "Revision Requested";

  return (
    <ol className={cn("flex flex-wrap items-stretch gap-y-3", compact ? "gap-x-1" : "gap-x-2", className)}>
      {SUBMISSION_STAGES.map((stage, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        const revisionStage = stage === "Revision Requested";
        return (
          <li key={stage} className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-2 rounded-[6px] border px-2.5 py-1.5 transition-colors duration-300",
                active && !isRevision && "border-accent bg-accent text-white",
                active && isRevision && "border-flag bg-flag-soft text-flag",
                done && "border-rule bg-surface text-muted",
                !done && !active && "border-dashed border-rule bg-transparent text-faint",
              )}
            >
              <span
                className={cn(
                  "font-mono text-[10px] tabular-nums",
                  active && !isRevision ? "text-white/70" : done ? "text-faint" : "text-faint/70",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={cn("text-[12.5px] font-medium whitespace-nowrap", compact && "text-[12px]")}>{stage}</span>
              {done && <Icon name="check" size={12} strokeWidth={2.2} className="text-accent" />}
            </div>
            {i < SUBMISSION_STAGES.length - 1 && (
              <span
                className={cn(
                  "h-px w-3 shrink-0",
                  i < currentIndex ? "bg-accent/50" : "bg-rule",
                  revisionStage && "opacity-60",
                )}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function StageBadge({ stage }: { stage: SubmissionStage }) {
  const tone =
    stage === "Published" || stage === "Approved"
      ? "border-accent/30 bg-accent-soft text-accent-ink"
      : stage === "Revision Requested"
        ? "border-flag/25 bg-flag-soft text-flag"
        : stage === "Under Review"
          ? "border-seal/30 bg-seal-soft text-seal"
          : "border-rule bg-paper-deep/60 text-muted";
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-[3px] text-[11.5px] leading-none", tone)}>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {stage}
    </span>
  );
}
