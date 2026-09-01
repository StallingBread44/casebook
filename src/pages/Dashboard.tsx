import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ACTIVE_PROJECTS, DEMO_STUDENT, HOUR_LEDGER, SAVED_STUDIES } from "@/data/dashboard";
import { PAPER_BY_SLUG, PAPERS } from "@/data/papers";
import { STUDENT_BY_HANDLE } from "@/data/students";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServiceRecord } from "@/components/dashboard/ServiceRecord";
import { ResearchRow } from "@/components/research/ResearchCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { StageBadge } from "@/components/ui/Pipeline";
import { Card, Notice, RecordId } from "@/components/ui/Surface";
import { cn, formatDateShort, useCountUp } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

type Tab = "active" | "submitted" | "published" | "saved";

const TABS: { key: Tab; label: string }[] = [
  { key: "active", label: "Active projects" },
  { key: "submitted", label: "Submitted" },
  { key: "published", label: "Published research" },
  { key: "saved", label: "Saved studies" },
];

const STATUS_STYLES = {
  Approved: "text-accent",
  "Pending review": "text-seal",
  "Needs revision": "text-flag",
} as const;

export default function Dashboard() {
  const { user, profile, isDemo } = useAuth();
  const [params, setParams] = useSearchParams();
  const [tab, setTab] = useState<Tab>("active");
  const recordOpen = params.get("record") === "1";

  const studentFirstName = profile?.first_name || user?.user_metadata?.first_name || "Samuel";
  const studentSchool = profile?.school || user?.user_metadata?.school || DEMO_STUDENT.school;
  const studentGradYear = profile?.grade || user?.user_metadata?.grade || DEMO_STUDENT.gradYear;
  const studentRecordId = user?.id ? `CB·STU·${user.id.slice(0, 4).toUpperCase()}` : DEMO_STUDENT.recordId;
  const isRealAccount = Boolean(user && !isDemo);

  const setRecordOpen = (open: boolean) => {
    const next = new URLSearchParams(params);
    if (open) next.set("record", "1");
    else next.delete("record");
    setParams(next, { replace: true });
  };

  const approved = HOUR_LEDGER.filter((h) => h.status === "Approved");
  const pending = HOUR_LEDGER.filter((h) => h.status === "Pending review");
  const revision = HOUR_LEDGER.filter((h) => h.status === "Needs revision");
  const totalApproved = approved.reduce((s, h) => s + h.hours, 0);
  const { ref: countRef, value } = useCountUp(totalApproved);

  const student = STUDENT_BY_HANDLE[DEMO_STUDENT.handle];
  const published = PAPERS.filter((p) => student?.publishedSlugs.includes(p.slug));
  const saved = SAVED_STUDIES.map((s) => PAPER_BY_SLUG[s]).filter(Boolean);

  return (
    <>
      <PageHeader
        eyebrow="Your dashboard"
        title={`Welcome back, ${studentFirstName}`}
        lead="Your projects, submissions, and verified service hours in one place."
        tight
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <RecordId>{studentRecordId}</RecordId>
          <span className="text-[13px] text-muted">{studentSchool} · {studentGradYear}</span>
          {isRealAccount && (
            <span className="inline-flex items-center gap-1.5 rounded-[4px] border border-accent/30 bg-accent-soft px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.14em] text-accent-ink">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Verified Account
            </span>
          )}
        </div>
      </PageHeader>

      <div className="u-shell py-10 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-8">
          {/* Hours panel — the reason most students are here */}
          <Card className="relative overflow-hidden">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(168,128,31,0.10),transparent_65%)]" aria-hidden="true" />
            <div className="relative p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-seal">Verified volunteer hours</p>
                <Icon name="seal" size={20} className="text-seal" />
              </div>

              <p className="mt-5 flex items-baseline gap-3">
                <span ref={countRef} className="u-num font-display text-[clamp(3.4rem,9vw,5rem)] leading-[0.9] tracking-[-0.03em] text-ink">
                  {value.toFixed(1)}
                </span>
                <span className="font-display text-[20px] text-muted">verified hours</span>
              </p>

              <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-[10px] border border-rule bg-rule">
                {[
                  { term: "Approved", value: totalApproved, tone: "text-accent", count: approved.length },
                  { term: "Pending", value: pending.reduce((s, h) => s + h.hours, 0), tone: "text-seal", count: pending.length },
                  { term: "Needs revision", value: revision.reduce((s, h) => s + h.hours, 0), tone: "text-flag", count: revision.length },
                ].map((item) => (
                  <div key={item.term} className="bg-surface px-4 py-3.5">
                    <dt className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-faint">{item.term}</dt>
                    <dd className={cn("u-num mt-1.5 font-display text-[26px] leading-none", item.tone)}>{item.value}</dd>
                    <p className="mt-1.5 text-[11.5px] text-muted">
                      {item.count} {item.count === 1 ? "submission" : "submissions"}
                    </p>
                  </div>
                ))}
              </dl>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button iconLeft="download" onClick={() => setRecordOpen(true)}>Download service record</Button>
                <Button to="/opportunities" variant="secondary" icon="arrow-right">Find another project</Button>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Notice title="Check with your school before you count on these hours." tone="seal" icon="alert">
              Schools, districts, and honor societies decide for themselves whether they accept service hours from an
              outside research organization. Ask your counselor before you start — not after you finish.{" "}
              <Link to="/about#hours-policy" className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent">
                Read the hour policy
              </Link>
              .
            </Notice>

            <Card className="p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Next actions</p>
              <ul className="mt-4 space-y-3.5">
                {[
                  { text: "Your research submission is currently in the review queue — typical decision time is 10–14 days", to: "/review", cta: "View queue" },
                ].map((item) => (
                  <li key={item.text} className="flex items-start justify-between gap-4 border-b border-rule pb-3.5 last:border-0 last:pb-0">
                    <span className="text-[13.5px] leading-snug text-ink-soft">{item.text}</span>
                    <Link to={item.to} className="shrink-0 text-[13px] text-accent hover:underline">{item.cta}</Link>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* My research */}
        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-4">
            <div>
              <p className="u-eyebrow">My research</p>
              <h2 className="mt-2 text-[26px]">Everything you're working on</h2>
            </div>
            <Link to={`/students/${DEMO_STUDENT.handle}`} className="inline-flex items-center gap-1.5 text-[13.5px] text-accent hover:underline">
              View public profile
              <Icon name="arrow-up-right" size={14} />
            </Link>
          </div>

          <div role="tablist" aria-label="My research" className="mt-5 flex flex-wrap gap-1 rounded-[8px] border border-rule bg-surface p-1">
            {TABS.map((t) => {
              const count =
                t.key === "active" ? ACTIVE_PROJECTS.length
                : t.key === "submitted" ? HOUR_LEDGER.length
                : t.key === "published" ? published.length
                : saved.length;
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={tab === t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-[6px] px-3.5 py-2 text-[13.5px] transition-colors duration-200",
                    tab === t.key ? "bg-ink text-paper" : "text-muted hover:text-ink",
                  )}
                >
                  {t.label}
                  <span className={cn("u-num font-mono text-[11px]", tab === t.key ? "text-paper/60" : "text-faint")}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            {tab === "active" && (
              <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {ACTIVE_PROJECTS.map((p) => (
                  <li key={p.title}>
                    <Card className="flex h-full flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[12.5px] text-muted">{p.field}</p>
                        <StageBadge stage={p.stage} />
                      </div>
                      <h3 className="mt-3 font-sans text-[15.5px] font-semibold leading-snug tracking-[-0.005em] text-ink">
                        {p.title}
                      </h3>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-[11.5px] text-muted">
                          <span>Progress</span>
                          <span className="u-num font-mono">{p.progress}%</span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-paper-deep">
                          <div className="h-full rounded-full bg-accent transition-[width] duration-700" style={{ width: `${p.progress}%` }} />
                        </div>
                      </div>
                      <p className="mt-4 flex-1 text-[13px] leading-snug text-muted">{p.nextStep}</p>
                      <div className="mt-4 flex items-center justify-between border-t border-rule pt-3 text-[12px]">
                        <span className="text-muted">Due {formatDateShort(p.due)}</span>
                        <span className="u-num font-mono text-seal">Up to {p.maxHours} hrs</span>
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>
            )}

            {tab === "submitted" && (
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[46rem] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-rule bg-paper-deep/40">
                        {["Record", "Project", "Submitted", "Hours", "Status", "Reviewer note"].map((h) => (
                          <th key={h} scope="col" className="px-4 py-3 font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-faint">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {HOUR_LEDGER.map((h) => (
                        <tr key={h.id} className="border-b border-rule-soft align-top last:border-0">
                          <td className="px-4 py-3.5 font-mono text-[11.5px] text-faint">{h.id}</td>
                          <td className="px-4 py-3.5 text-[14px] text-ink">
                            {h.project}
                            <span className="mt-0.5 block text-[12px] text-muted">{h.field}</span>
                          </td>
                          <td className="px-4 py-3.5 font-mono text-[12px] text-muted">{formatDateShort(h.submitted)}</td>
                          <td className="u-num px-4 py-3.5 font-mono text-[13px] text-ink">{h.hours}</td>
                          <td className="px-4 py-3.5">
                            <span className={cn("inline-flex items-center gap-1.5 text-[13px]", STATUS_STYLES[h.status])}>
                              <span className="h-1.5 w-1.5 rounded-full bg-current" />
                              {h.status}
                            </span>
                          </td>
                          <td className="max-w-[20rem] px-4 py-3.5 text-[13px] leading-snug text-muted">{h.note ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {tab === "published" && (
              published.length > 0 ? (
                <Card className="px-6 py-2">
                  {published.map((p) => <ResearchRow key={p.slug} paper={p} />)}
                </Card>
              ) : (
                <EmptyState
                  title="Nothing published yet"
                  body="Approved work is added to your portfolio, and editors select studies for the library each issue."
                  cta={{ label: "Browse projects", to: "/opportunities" }}
                />
              )
            )}

            {tab === "saved" && (
              saved.length > 0 ? (
                <Card className="px-6 py-2">
                  {saved.map((p) => <ResearchRow key={p.slug} paper={p} />)}
                </Card>
              ) : (
                <EmptyState
                  title="No saved studies"
                  body="Save a study from any research page to keep it here."
                  cta={{ label: "Open the library", to: "/research" }}
                />
              )
            )}
          </div>
        </section>

        {/* Hours by project */}
        <section className="mt-12 border-t border-rule pt-10">
          <p className="u-eyebrow">Hours by project</p>
          <h2 className="mt-2 text-[26px]">Where your hours came from</h2>
          <ul className="mt-6 space-y-2.5">
            {HOUR_LEDGER.map((h) => {
              const max = Math.max(...HOUR_LEDGER.map((e) => e.hours));
              return (
                <li key={h.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-5 gap-y-2 rounded-[8px] border border-rule bg-surface px-5 py-3.5 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_auto]">
                  <span className="text-[14px] text-ink">
                    {h.project}
                    <span className="mt-0.5 block text-[12px] text-muted">{h.field} · {formatDateShort(h.submitted)}</span>
                  </span>
                  <span className="col-span-2 flex h-2 items-center sm:col-span-1">
                    <span className="h-2 w-full rounded-[2px] bg-paper-deep">
                      <span
                        className={cn(
                          "block h-2 rounded-[2px]",
                          h.status === "Approved" ? "bg-accent/80" : h.status === "Pending review" ? "bg-seal/60" : "bg-flag/50",
                        )}
                        style={{ width: `${(h.hours / max) * 100}%` }}
                      />
                    </span>
                  </span>
                  <span className={cn("u-num text-right font-mono text-[13.5px]", STATUS_STYLES[h.status])}>{h.hours} hrs</span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {recordOpen && <ServiceRecord onClose={() => setRecordOpen(false)} />}
    </>
  );
}

function EmptyState({ title, body, cta }: { title: string; body: string; cta: { label: string; to: string } }) {
  return (
    <div className="rounded-card border border-dashed border-rule bg-surface p-12 text-center">
      <p className="font-display text-[20px] text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-[14px] text-muted">{body}</p>
      <Button to={cta.to} variant="secondary" size="sm" className="mt-5">{cta.label}</Button>
    </div>
  );
}
