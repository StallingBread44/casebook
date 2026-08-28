import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow, title, lead, children, breadcrumb, tight = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  breadcrumb?: { label: string; to: string }[];
  tight?: boolean;
}) {
  return (
    <header className="relative overflow-hidden border-b border-rule bg-surface">
      <div className="pointer-events-none absolute inset-0 u-hairgrid opacity-50" aria-hidden="true" />
      <div className={cn("u-shell relative", tight ? "py-10 lg:py-12" : "py-14 lg:py-20")}>
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">
              {breadcrumb.map((crumb) => (
                <li key={crumb.to} className="flex items-center gap-1.5">
                  <Link to={crumb.to} className="transition-colors hover:text-accent">
                    {crumb.label}
                  </Link>
                  <Icon name="chevron-right" size={11} className="text-rule" />
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="u-eyebrow u-fade">{eyebrow}</p>
        <h1 className="u-rise mt-4 max-w-[22ch] text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.06] tracking-[-0.02em]">
          {title}
        </h1>
        {lead && (
          <p className="u-rise mt-6 max-w-[52ch] text-[16.5px] leading-[1.62] text-muted" style={{ animationDelay: "100ms" }}>
            {lead}
          </p>
        )}
        {children && <div className="u-rise mt-8" style={{ animationDelay: "180ms" }}>{children}</div>}
      </div>
    </header>
  );
}
