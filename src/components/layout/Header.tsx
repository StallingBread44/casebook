import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { ORG } from "@/data/site";
import { useAuth } from "@/lib/auth";

/** `covers` lets one nav entry own several routes — Research holds both directories. */
const NAV: { label: string; to: string; covers?: string[] }[] = [
  { label: "Research", to: "/research", covers: ["/opportunities"] },
  { label: "News", to: "/news" },
  { label: "Submit Research", to: "/submit" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Protect Your Work", to: "/protect-your-work" },
  { label: "About", to: "/about" },
  { label: "Sponsors", to: "/sponsors" },
];

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group flex items-center gap-2.5"
      aria-label={`${ORG.name} — home`}
    >
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" className="shrink-0">
        <circle cx="16" cy="16" r="12.5" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-rule" />
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="text-accent origin-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[36deg]"
        >
          <path d="M16 6.5l7.4 10.8M23.4 17.3l-11.4 9M12 26.3L8.6 12.9M8.6 12.9l14.8 4.4" />
        </g>
        <circle cx="16" cy="16" r="2.4" className="fill-accent" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap font-display text-[19px] font-medium tracking-[-0.015em] text-ink">{ORG.short}</span>
      </span>
    </Link>
  );
}

function useNavMatch() {
  const { pathname } = useLocation();
  return (item: { to: string; covers?: string[] }) =>
    [item.to, ...(item.covers ?? [])].some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    );
}

export function Header() {
  const [scrolled, setScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > 8);
  const [open, setOpen] = useState(false);
  const isCurrent = useNavMatch();
  const { user, isDemo, signOut, profile } = useAuth();

  const isAuthenticated = Boolean(user || isDemo);
  const displayName = profile?.first_name || (user?.email ? user.email.split("@")[0] : "Dashboard");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 print:hidden",
          scrolled
            ? "border-rule bg-paper/85 shadow-[0_1px_20px_-12px_rgba(16,24,38,0.4)] backdrop-blur-md"
            : "border-transparent bg-paper",
        )}
      >
        <div className="u-shell flex h-[68px] items-center justify-between gap-6">
          <Wordmark onClick={() => setOpen(false)} />

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    aria-current={isCurrent(item) ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-9 items-center whitespace-nowrap rounded-[6px] px-2.5 text-[14px] transition-colors duration-200",
                      isCurrent(item) ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-[1px] h-[2px] origin-left rounded-full bg-accent transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isCurrent(item) ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            {isAuthenticated ? (
              <>
                <Button to="/dashboard" variant="secondary" size="sm" icon="user">
                  {displayName}
                </Button>
                <Button onClick={signOut} variant="ghost" size="sm">
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button to="/signin" variant="ghost" size="sm">
                  Sign in
                </Button>
                <Button to="/signin?tab=create" size="sm" icon="arrow-right">
                  Get started
                </Button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-[8px] text-ink transition-colors hover:bg-ink/[0.05] xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </header>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-x-0 bottom-0 top-[calc(68px+29px)] z-40 bg-paper transition-[opacity,visibility] duration-300 xl:hidden print:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        hidden={!open}
      >
        <nav aria-label="Mobile" className="u-shell flex h-full flex-col pb-10 pt-6">
          <ul className="flex flex-col">
            {NAV.map((item, i) => (
              <li key={item.to} style={{ transitionDelay: `${i * 40}ms` }}>
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrent(item) ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between border-b border-rule py-4 font-display text-[22px] transition-colors",
                    isCurrent(item) ? "text-accent" : "text-ink",
                  )}
                >
                  {item.label}
                  <Icon name="arrow-right" size={18} className="text-faint" />
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Button to="/dashboard" size="lg" full icon="arrow-right" onClick={() => setOpen(false)}>
                  My Dashboard ({displayName})
                </Button>
                <Button onClick={() => { signOut(); setOpen(false); }} variant="secondary" size="lg" full>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button to="/signin?tab=create" size="lg" full icon="arrow-right" onClick={() => setOpen(false)}>
                  Get started
                </Button>
                <Button to="/signin" variant="secondary" size="lg" full onClick={() => setOpen(false)}>
                  Sign in
                </Button>
              </>
            )}
          </div>
          <p className="mt-auto pt-8 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            {ORG.abbr} · {ORG.volume} · Sample content
          </p>
        </nav>
      </div>
    </>
  );
}
