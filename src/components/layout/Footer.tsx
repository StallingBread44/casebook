import { Link } from "react-router-dom";
import { FOOTER_NAV, ORG } from "@/data/site";
import { Icon } from "@/components/ui/Icon";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M7.5 3.5h9a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4ZM12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2ZM17 6.6v.02",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M4.5 9.5v11M4.5 4.6v.02M10 20.5v-11M10 13.4c0-2.2 1.6-3.9 3.7-3.9 2.1 0 3.8 1.4 3.8 4v7",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    path: "M2.8 8.2c0-1.6 1.2-2.9 2.8-3 2.1-.2 4.2-.2 6.4-.2s4.3 0 6.4.2c1.6.1 2.8 1.4 2.8 3v7.6c0 1.6-1.2 2.9-2.8 3-2.1.2-4.2.2-6.4.2s-4.3 0-6.4-.2c-1.6-.1-2.8-1.4-2.8-3V8.2ZM10 9.4l4.6 2.6L10 14.6V9.4Z",
  },
  {
    label: "Email",
    href: "mailto:editors@casebook.org",
    path: "M3.5 5.5h17v13h-17v-13ZM3.5 6.5 12 13l8.5-6.5",
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-rule bg-surface print:hidden">
      <div className="u-shell py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)]">
          <div>
            <p className="font-display text-[26px] leading-none tracking-[-0.02em] text-ink">{ORG.short}</p>
            <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-muted">
              A student research publication. High school researchers read, run, and publish studies across
              twenty-plus academic fields — and earn verified service hours for approved work.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-rule text-muted transition-colors duration-200 hover:border-ink/25 hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_NAV.map((group) => (
              <div key={group.heading}>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{group.heading}</p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label + link.to}>
                      <Link
                        to={link.to}
                        className="text-[14px] text-muted transition-colors duration-200 hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-rule pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
              © {new Date().getFullYear()} {ORG.name} · {ORG.volume}
            </p>
            <p className="flex items-center gap-2 text-[12.5px] text-faint">
              <Icon name="alert" size={13} />
              Verified hours are awarded by reviewers. Confirm your school accepts them before you start.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
