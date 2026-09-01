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
    label: "Email",
    href: "mailto:contact@casebookresearch.com",
    path: "M3.5 5.5h17v13h-17v-13ZM3.5 6.5 12 13l8.5-6.5",
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-rule bg-surface print:hidden">
      <div className="u-shell py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)]">
          <div>
            <div className="flex items-center">
              <img
                src="/CASEBOOK.png"
                alt={ORG.name}
                className="h-8 w-auto object-contain"
              />
            </div>
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
              © {new Date().getFullYear()} {ORG.name}
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
