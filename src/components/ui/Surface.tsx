import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("u-eyebrow", className)}>{children}</p>;
}

export function SampleTag({ className, label = "Sample content" }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[4px] border border-rule bg-paper-deep/70 px-2 py-[3px]",
        "font-mono text-[10px] uppercase tracking-[0.14em] text-faint",
        className,
      )}
      title="Placeholder data for this preview build — replace with real content."
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-faint/60" />
      {label}
    </span>
  );
}

export function Card({
  children, className, as: As = "div", interactive = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "section";
  interactive?: boolean;
}) {
  return (
    <As
      className={cn(
        "rounded-card border border-rule bg-surface shadow-card",
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:border-rule/60 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </As>
  );
}

export function SectionHeading({
  eyebrow, title, lead, align = "left", action, className, id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center" | "between";
  action?: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      className={cn(
        "reveal",
        align === "center" && "mx-auto max-w-2xl text-center",
        align === "between" && "flex flex-wrap items-end justify-between gap-6",
        className,
      )}
    >
      <div className={cn(align === "center" ? "" : "max-w-2xl")}>
        {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
        <h2 id={id} className="text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.1]">
          {title}
        </h2>
        {lead && <p className="mt-4 text-[16.5px] leading-relaxed text-muted">{lead}</p>}
      </div>
      {action && <div className={cn(align === "center" && "mt-7 flex justify-center")}>{action}</div>}
    </div>
  );
}

export function Meta({
  icon, children, className,
}: { icon?: IconName; children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[12.5px] text-muted", className)}>
      {icon && <Icon name={icon} size={13} className="text-faint" />}
      {children}
    </span>
  );
}

export function Tag({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "accent" | "seal" | "flag" }) {
  const tones = {
    neutral: "border-rule bg-paper-deep/60 text-muted",
    accent: "border-accent/25 bg-accent-soft text-accent-ink",
    seal: "border-seal/30 bg-seal-soft text-seal",
    flag: "border-flag/25 bg-flag-soft text-flag",
  } as const;
  return (
    <span className={cn("inline-flex items-center rounded-[4px] border px-2 py-[3px] text-[11.5px] leading-none", tones[tone])}>
      {children}
    </span>
  );
}

export function RecordId({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("u-record", className)}>{children}</span>;
}

export function Hairline({ className }: { className?: string }) {
  return <hr className={cn("border-0 border-t border-rule", className)} />;
}

/** A framed advisory note — used wherever policy language must not be missed. */
export function Notice({
  title, children, tone = "neutral", icon = "alert",
}: {
  title: string;
  children: ReactNode;
  tone?: "neutral" | "seal" | "accent";
  icon?: IconName;
}) {
  const tones = {
    neutral: "border-rule bg-paper-deep/50 text-muted",
    seal: "border-seal/25 bg-seal-soft/60 text-ink-soft",
    accent: "border-accent/20 bg-accent-soft/60 text-ink-soft",
  } as const;
  const iconTone = { neutral: "text-faint", seal: "text-seal", accent: "text-accent" } as const;
  return (
    <div className={cn("rounded-[10px] border p-5", tones[tone])}>
      <div className="flex items-start gap-3">
        <Icon name={icon} size={17} className={cn("mt-0.5 shrink-0", iconTone[tone])} />
        <div>
          <p className="font-sans text-[13.5px] font-semibold tracking-tight text-ink">{title}</p>
          <div className="mt-1.5 text-[14px] leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
