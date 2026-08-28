import { NavLink } from "react-router-dom";
import { PAPERS } from "@/data/papers";
import { PROJECTS } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * The library and the opportunities directory are one section under a single
 * nav entry: what has been published, and what is open to work on. This switch
 * appears at the top of both so either half is one click from the other.
 */
const TABS = [
  { to: "/research", label: "Published studies", count: PAPERS.length },
  {
    to: "/opportunities",
    label: "Open opportunities",
    count: PROJECTS.filter((p) => p.status !== "Closed").length,
  },
];

export function DirectoryTabs() {
  return (
    <nav aria-label="Research sections" className="inline-flex rounded-[9px] border border-rule bg-surface p-1">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end
          className={({ isActive }) =>
            cn(
              "inline-flex items-center gap-2 rounded-[6px] px-3.5 py-2 text-[13.5px] transition-colors duration-200",
              isActive ? "bg-ink text-paper" : "text-muted hover:text-ink",
            )
          }
        >
          {({ isActive }) => (
            <>
              {tab.label}
              <span className={cn("u-num font-mono text-[11px]", isActive ? "text-paper/60" : "text-faint")}>
                {tab.count}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
