import { useEffect } from "react";
import { createPortal } from "react-dom";
import { DEMO_STUDENT, HOUR_LEDGER } from "@/data/dashboard";
import { ORG } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { formatDate } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

/**
 * The service record. It is the artifact a counselor actually sees, so it is
 * designed to be printed: fixed structure, verification code, and an explicit
 * statement of what the document does and does not certify.
 */
export function ServiceRecord({ onClose }: { onClose: () => void }) {
  const { user, profile } = useAuth();
  const approved = HOUR_LEDGER.filter((h) => h.status === "Approved");
  const total = approved.reduce((sum, h) => sum + h.hours, 0);

  const studentFirstName = profile?.first_name || user?.user_metadata?.first_name || "Samuel";
  const studentLastName = profile?.last_name || user?.user_metadata?.last_name || "";
  const studentFullName = `${studentFirstName} ${studentLastName}`.trim();
  const studentSchool = profile?.school || user?.user_metadata?.school || DEMO_STUDENT.school;
  const studentGradYear = profile?.grade || user?.user_metadata?.grade || DEMO_STUDENT.gradYear;
  const studentRecordId = user?.id ? `CB·STU·${user.id.slice(0, 4).toUpperCase()}` : DEMO_STUDENT.recordId;

  useEffect(() => {
    document.body.classList.add("is-record-open");
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("is-record-open");
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/60 p-4 sm:p-8 print:static print:overflow-visible print:bg-transparent print:p-0" role="dialog" aria-modal="true" aria-label="Service record">
      <div className="mx-auto max-w-3xl">
        <div className="mb-3 flex items-center justify-between print:hidden">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-paper/80">Official Service Record</p>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-[6px] bg-paper/10 px-3 py-1.5 text-[13px] text-paper hover:bg-paper/20"
          >
            <Icon name="close" size={15} /> Close
          </button>
        </div>

        <article className="rounded-card border border-rule bg-surface p-8 shadow-pop sm:p-12 print:border-0 print:p-0 print:shadow-none">
          <header className="flex flex-wrap items-start justify-between gap-6 border-b-2 border-ink pb-6">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true">
                <circle cx="16" cy="16" r="13" fill="none" stroke="var(--color-rule)" strokeWidth="1.2" />
                <g fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinejoin="round">
                  <path d="M16 6.5l7.4 10.8M23.4 17.3l-11.4 9M12 26.3L8.6 12.9M8.6 12.9l14.8 4.4" />
                </g>
                <circle cx="16" cy="16" r="2.4" fill="var(--color-accent)" />
              </svg>
              <div>
                <p className="font-display text-[22px] leading-none text-ink">{ORG.name}</p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  Record of verified service hours
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Issued</p>
              <p className="font-mono text-[12.5px] text-ink">{formatDate("2026-08-26")}</p>
            </div>
          </header>

          <div className="grid gap-6 py-7 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Student</p>
              <p className="mt-1.5 font-display text-[24px] leading-tight text-ink">{studentFullName}</p>
              <p className="mt-1 text-[13.5px] text-muted">
                {studentSchool} · {studentGradYear}
              </p>
              <p className="mt-1 font-mono text-[11px] text-faint">{studentRecordId}</p>
            </div>
            <div className="sm:text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Total approved hours</p>
              <p className="u-num mt-1 font-display text-[44px] leading-none text-seal">{total}</p>
              <p className="mt-1 text-[13px] text-muted">
                across {approved.length} approved {approved.length === 1 ? "project" : "projects"}
              </p>
            </div>
          </div>

          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-y border-rule">
                <th scope="col" className="py-2.5 font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-faint">Project completed</th>
                <th scope="col" className="py-2.5 font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-faint">Approved</th>
                <th scope="col" className="py-2.5 text-right font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-faint">Hours</th>
              </tr>
            </thead>
            <tbody>
              {approved.map((h) => (
                <tr key={h.id} className="border-b border-rule-soft align-top">
                  <td className="py-3 pr-4 text-[14px] text-ink">
                    {h.project}
                    <span className="mt-0.5 block text-[12px] text-muted">{h.field} · Reviewer: {h.reviewer}</span>
                  </td>
                  <td className="py-3 pr-4 font-mono text-[12px] text-muted">{formatDate(h.submitted)}</td>
                  <td className="u-num py-3 text-right font-mono text-[13.5px] text-ink">{h.hours}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={2} className="pt-4 text-[14px] font-semibold text-ink">Total verified</td>
                <td className="u-num pt-4 text-right font-mono text-[15px] font-semibold text-seal">{total}</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-8 grid gap-5 border-t border-rule pt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Verification</p>
              <p className="mt-1.5 font-mono text-[13px] text-ink">CB-VRF-8KD2-10428</p>
              <p className="mt-1.5 max-w-[46ch] text-[12.5px] leading-relaxed text-muted">
                A school official may verify this record with the code above at
                casebook.org/verify, or by writing to {ORG.email}.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 print:hidden">
              <Button variant="secondary" size="sm" icon="download" onClick={() => window.print()}>
                Print / Save PDF
              </Button>
              <Button size="sm" icon="share" onClick={() => navigator.clipboard?.writeText(window.location.href)}>
                Copy link
              </Button>
            </div>
          </div>

          <footer className="mt-8 border-t border-rule pt-4 text-[11.5px] leading-relaxed text-faint">
            This document certifies only that the submissions named above met the published criteria of the CaseBook
            collective on the dates indicated. It does not certify classroom attendance, non-research volunteer hours, or
            character outside the submitted scholarship.
          </footer>
        </article>
      </div>
    </div>,
    document.body,
  );
}
