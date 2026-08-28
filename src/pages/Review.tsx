import { useState } from "react";
import { REVIEW_QUEUE } from "@/data/dashboard";
import { REVIEW_CRITERIA } from "@/data/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Label, TextArea, TextInput } from "@/components/ui/Form";
import { Card, Notice, SampleTag, Tag } from "@/components/ui/Surface";
import { cn, formatDateShort } from "@/lib/utils";

const SCALE = [
  { value: 1, label: "Not met" },
  { value: 2, label: "Partly" },
  { value: 3, label: "Met" },
  { value: 4, label: "Strong" },
];

type Decision = "approve" | "revise" | "reject" | null;

export default function Review() {
  const [selected, setSelected] = useState(REVIEW_QUEUE[0].id);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [decision, setDecision] = useState<Decision>(null);
  const [hours, setHours] = useState("");

  const item = REVIEW_QUEUE.find((r) => r.id === selected)!;
  const scored = Object.keys(scores).length;
  const complete = scored === REVIEW_CRITERIA.length;

  return (
    <>
      <PageHeader
        eyebrow="Reviewer interface"
        title="How submissions are evaluated"
        lead="A working preview of the tool reviewers use. Every score, decision, and hour award on this platform is entered here by a person who read the submission."
        tight
      >
        <div className="flex flex-wrap items-center gap-3">
          <SampleTag label="Internal tool preview" />
          <span className="text-[13px] text-faint">Signed in as a reviewer · Psychology, Public Health</span>
        </div>
      </PageHeader>

      <div className="u-shell py-10 lg:py-14">
        <Notice title="No automated approvals, ever." tone="accent" icon="user">
          Software screens submissions for completeness and originality before they reach this queue. It does not
          score, approve, or award hours. A reviewer makes the final determination on every submission and signs
          their name to it.
        </Notice>

        <div className="mt-8 grid gap-8 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-10">
          {/* Queue */}
          <aside>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">Review queue</p>
              <span className="u-num font-mono text-[11px] text-accent">{REVIEW_QUEUE.length}</span>
            </div>
            <ul className="space-y-2">
              {REVIEW_QUEUE.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => { setSelected(r.id); setScores({}); setDecision(null); setHours(""); }}
                    className={cn(
                      "w-full rounded-[10px] border p-4 text-left transition-colors duration-200",
                      selected === r.id ? "border-accent/40 bg-accent-soft/60" : "border-rule bg-surface hover:border-ink/20",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10.5px] text-faint">{r.id}</span>
                      {r.priority !== "Standard" && (
                        <Tag tone={r.priority === "Overdue" ? "flag" : "seal"}>{r.priority}</Tag>
                      )}
                    </div>
                    <p className="mt-2 text-[14px] font-medium leading-snug text-ink">{r.title}</p>
                    <p className="mt-1.5 text-[12.5px] text-muted">{r.author} · {r.field}</p>
                    <p className="mt-2 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.1em] text-faint">
                      <span>{formatDateShort(r.submitted)}</span>
                      <span>{r.words.toLocaleString()} words</span>
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Review form */}
          <div>
            <Card className="overflow-hidden">
              <div className="border-b border-rule bg-paper-deep/40 px-6 py-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10.5px] text-faint">{item.id}</p>
                    <h2 className="mt-1.5 max-w-[36ch] text-[22px] leading-snug tracking-[-0.012em]">{item.title}</h2>
                    <p className="mt-2 text-[13.5px] text-muted">
                      {item.author} · {item.field} · {item.type} · submitted {formatDateShort(item.submitted)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Hours requested</p>
                    <p className="u-num mt-1 font-display text-[28px] leading-none text-ink">{item.hoursRequested}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.flags.map((f) => <Tag key={f}>{f}</Tag>)}
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink">Evaluation criteria</p>
                  <p className="text-[12.5px] text-muted">
                    <span className="u-num font-mono text-accent">{scored}</span> of {REVIEW_CRITERIA.length} scored
                  </p>
                </div>

                <ul className="mt-5 space-y-px overflow-hidden rounded-[10px] border border-rule bg-rule">
                  {REVIEW_CRITERIA.map((c, i) => (
                    <li key={c.key} className="bg-surface p-4 sm:p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-[14rem] flex-1">
                          <p className="flex items-baseline gap-2.5">
                            <span className="font-mono text-[10px] tabular-nums text-faint">{String(i + 1).padStart(2, "0")}</span>
                            <span className="text-[15px] font-medium text-ink">{c.label}</span>
                          </p>
                          <p className="mt-1 pl-[1.9rem] text-[13px] leading-snug text-muted">{c.detail}</p>
                        </div>
                        <div className="flex gap-1" role="group" aria-label={`${c.label} score`}>
                          {SCALE.map((s) => (
                            <button
                              key={s.value}
                              onClick={() => setScores((prev) => ({ ...prev, [c.key]: s.value }))}
                              aria-pressed={scores[c.key] === s.value}
                              title={s.label}
                              className={cn(
                                "h-8 w-14 rounded-[6px] border text-[11.5px] transition-colors duration-200",
                                scores[c.key] === s.value
                                  ? "border-accent bg-accent text-white"
                                  : "border-rule bg-surface text-muted hover:border-ink/25 hover:text-ink",
                              )}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-5">
                  <div>
                    <Label htmlFor="feedback" required>Feedback to the student</Label>
                    <TextArea
                      id="feedback"
                      rows={5}
                      placeholder="Be specific and actionable. Name the section, quote the sentence, and say what would fix it."
                    />
                    <p className="mt-1.5 text-[12.5px] text-muted">
                      Students see this in full. It is the most valuable thing they get from the process.
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="internal" hint="Not shown to the student">Internal note</Label>
                    <TextArea id="internal" rows={2} placeholder="Notes for the editorial team or a second reviewer." />
                  </div>
                </div>

                {/* Hours */}
                <div className="mt-8 rounded-[10px] border border-seal/25 bg-seal-soft/50 p-5">
                  <div className="flex flex-wrap items-end justify-between gap-5">
                    <div>
                      <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-seal">
                        <Icon name="seal" size={14} />
                        Volunteer hours determination
                      </p>
                      <p className="mt-2 max-w-[46ch] text-[13.5px] leading-relaxed text-ink-soft">
                        Award hours only for requirements actually met. The project maximum is{" "}
                        <span className="u-num font-mono">{item.hoursRequested}</span>. Partial completion receives
                        partial hours; leave blank if the work does not qualify.
                      </p>
                    </div>
                    <div className="w-40">
                      <Label htmlFor="hours">Approved volunteer hours</Label>
                      <TextInput
                        id="hours"
                        type="number"
                        min={0}
                        max={item.hoursRequested}
                        step={0.5}
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        placeholder="0.0"
                        className="u-num font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Decision */}
                <div className="mt-8 border-t border-rule pt-6">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink">Decision</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      { key: "approve" as const, label: "Approve", note: "Meets the requirements", tone: "accent" },
                      { key: "revise" as const, label: "Request revisions", note: "Fixable gaps, resubmit", tone: "seal" },
                      { key: "reject" as const, label: "Reject", note: "Integrity violation only", tone: "flag" },
                    ].map((d) => (
                      <button
                        key={d.key}
                        onClick={() => setDecision(d.key)}
                        aria-pressed={decision === d.key}
                        className={cn(
                          "rounded-[10px] border p-4 text-left transition-colors duration-200",
                          decision === d.key
                            ? d.tone === "accent"
                              ? "border-accent bg-accent-soft"
                              : d.tone === "seal"
                                ? "border-seal/50 bg-seal-soft"
                                : "border-flag/50 bg-flag-soft"
                            : "border-rule bg-surface hover:border-ink/25",
                        )}
                      >
                        <span className="block text-[14.5px] font-medium text-ink">{d.label}</span>
                        <span className="mt-1 block text-[12.5px] text-muted">{d.note}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Button size="lg" icon="arrow-right" disabled={!decision || !complete}>
                      Submit review
                    </Button>
                    <Button variant="secondary" size="lg">Save and continue later</Button>
                    {(!complete || !decision) && (
                      <p className="text-[13px] text-muted">
                        {!complete && `${REVIEW_CRITERIA.length - scored} criteria left to score`}
                        {!complete && !decision && " · "}
                        {!decision && "no decision selected"}
                      </p>
                    )}
                  </div>
                  <p className="mt-4 text-[12.5px] text-faint">
                    Submitting records your name against this decision and notifies the student the same day.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
