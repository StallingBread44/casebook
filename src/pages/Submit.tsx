import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FIELDS } from "@/data/fields";
import { RESEARCH_TYPES } from "@/data/taxonomy";
import { SUBMISSION_CHECKLIST } from "@/data/dashboard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Checkbox, Label, Select, TextArea, TextInput } from "@/components/ui/Form";
import { Pipeline } from "@/components/ui/Pipeline";
import { Card, Notice, SampleTag } from "@/components/ui/Surface";
import { cn } from "@/lib/utils";

function FormSection({
  n, title, description, children,
}: { n: string; title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-rule pt-8">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">{n}</span>
        <div>
          <h2 className="text-[21px] tracking-[-0.01em]">{title}</h2>
          {description && <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{description}</p>}
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function FileField({
  id, label, hint, accept, required, note,
}: { id: string; label: string; hint?: string; accept: string; required?: boolean; note: string }) {
  const [name, setName] = useState<string | null>(null);
  return (
    <div>
      <Label htmlFor={id} hint={hint} required={required}>{label}</Label>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-center gap-4 rounded-[10px] border border-dashed p-5 transition-colors duration-200",
          name ? "border-accent/40 bg-accent-soft/50" : "border-rule bg-surface hover:border-ink/25 hover:bg-paper-deep/40",
        )}
      >
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-[8px] border", name ? "border-accent/30 bg-surface text-accent" : "border-rule bg-paper-deep/50 text-muted")}>
          <Icon name={name ? "check" : "upload"} size={18} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-medium text-ink">{name ?? "Choose a file or drag it here"}</span>
          <span className="mt-0.5 block text-[12.5px] text-muted">{note}</span>
        </span>
        {name && (
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); setName(null); }}
            className="rounded-[6px] p-2 text-faint hover:bg-surface hover:text-ink"
            aria-label={`Remove ${name}`}
          >
            <Icon name="close" size={15} />
          </button>
        )}
      </label>
      <input
        id={id}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => setName(e.target.files?.[0]?.name ?? null)}
      />
    </div>
  );
}

export default function Submit() {
  const [checked, setChecked] = useState<string[]>([]);
  const [declared, setDeclared] = useState(false);
  const [aiUse, setAiUse] = useState("none");
  const [submitted, setSubmitted] = useState(false);
  const [selectedField, setSelectedField] = useState("");

  const requiredIds = SUBMISSION_CHECKLIST.filter((c) => c.required).map((c) => c.id);
  const remaining = useMemo(
    () => requiredIds.filter((id) => !checked.includes(id)).length,
    [checked, requiredIds],
  );
  const ready = remaining === 0 && declared;

  const toggle = (id: string) =>
    setChecked((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));

  if (submitted) {
    return (
      <>
        <PageHeader
          eyebrow="Submission received"
          title="Your work is in the queue"
          lead="A reviewer in your field will be assigned within three business days. You'll get an email at each stage change, and your dashboard shows the current status at any time."
          tight
        />
        <div className="u-shell py-12">
          <Card className="mx-auto max-w-3xl p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-5">
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">Submission record</p>
                <p className="mt-1.5 font-mono text-[18px] text-ink">CB·SUB·4482</p>
              </div>
              <SampleTag label="Demo submission" />
            </div>
            <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">Status</p>
            <div className="mt-3 overflow-x-auto pb-2">
              <Pipeline current="Submitted" />
            </div>
            <div className="mt-8 space-y-3 border-t border-rule pt-6">
              {[
                "Completeness and originality screening — 1–3 days",
                "Reviewer assignment in your field — within 3 days",
                "Full review and decision — 10–14 days",
                "If approved: hours recorded and publication considered",
              ].map((line) => (
                <p key={line} className="flex items-start gap-2.5 text-[14.5px] text-ink-soft">
                  <Icon name="chevron-right" size={14} className="mt-1 shrink-0 text-accent" />
                  {line}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/dashboard" icon="arrow-right">Go to your dashboard</Button>
              <Button variant="secondary" onClick={() => setSubmitted(false)}>Submit another study</Button>
            </div>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Submit research"
        title="Submit your study for review"
        lead="Any student may submit work for review — whether it came from one of our projects or from something you did on your own. Everything is read by a reviewer before publication."
      >
        <div className="overflow-x-auto pb-2">
          <Pipeline current="Draft" />
        </div>
      </PageHeader>

      <div className="u-shell py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
          <form
            className="max-w-[62ch]"
            onSubmit={(e) => {
              e.preventDefault();
              if (ready) setSubmitted(true);
            }}
          >
            <FormSection n="01" title="Study details" description="How your work will be filed in the catalog.">
              <div>
                <Label htmlFor="title" required>Research title</Label>
                <TextInput id="title" required placeholder="e.g. How Social Media Usage Affects Adolescent Sleep Patterns" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="field" required>Academic field</Label>
                  <Select
                    id="field"
                    required
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                  >
                    <option value="" disabled>Select a field</option>
                    {FIELDS.map((f) => (
                      <option key={f.slug} value={f.slug}>{f.name}</option>
                    ))}
                  </Select>
                  {selectedField === "other" && (
                    <div className="mt-3">
                      <Label htmlFor="field-other" required>Name your field</Label>
                      <TextInput
                        id="field-other"
                        required
                        placeholder="e.g. Cognitive Linguistics, Urban Planning"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="type" required>Research type</Label>
                  <Select id="type" required defaultValue="">
                    <option value="" disabled>Select a type</option>
                    {RESEARCH_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="project" hint="Optional">Linked research project</Label>
                <Select id="project" defaultValue="">
                  <option value="">Independent submission — not tied to a project</option>
                  <option value="teen-sleep">Investigating Teen Sleep &amp; Academic Performance</option>
                  <option value="model-cards">Auditing Model Cards for Publicly Released AI Systems</option>
                  <option value="heat">Mapping Urban Heat Islands in Your Own City</option>
                </Select>
                <p className="mt-1.5 text-[12.5px] text-muted">
                  Only work linked to an approved project can qualify for volunteer hours.
                </p>
              </div>
            </FormSection>

            <FormSection n="02" title="Authorship" description="Everyone who did the work, in the order they should be credited.">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="author" required>Author name</Label>
                  <TextInput id="author" required placeholder="Your full name" />
                </div>
                <div>
                  <Label htmlFor="school" required>School</Label>
                  <TextInput id="school" required placeholder="Your high school" />
                </div>
              </div>
              <div>
                <Label htmlFor="coauthors" hint="Comma separated">Co-authors</Label>
                <TextInput id="coauthors" placeholder="Names of anyone who contributed to the research" />
              </div>
            </FormSection>

            <FormSection n="03" title="Abstract and keywords" description="What a reader sees before deciding to open the study.">
              <div>
                <Label htmlFor="abstract" hint="150–300 words" required>Abstract</Label>
                <TextArea id="abstract" required rows={7} placeholder="State the question, what you did, and what you found. Lead with the finding, not the topic." />
              </div>
              <div>
                <Label htmlFor="keywords" hint="3–6 terms" required>Keywords</Label>
                <TextInput id="keywords" required placeholder="Sleep, Adolescence, Survey research" />
              </div>
            </FormSection>

            <FormSection n="04" title="Methodology and sources" description="Reviewers check that a reader could repeat what you did.">
              <div>
                <Label htmlFor="methodology" required>Methodology summary</Label>
                <TextArea id="methodology" required rows={5} placeholder="Design, sample or sources, procedure, and analysis approach." />
              </div>
              <div>
                <Label htmlFor="data" required>Data and source information</Label>
                <TextArea id="data" required rows={4} placeholder="Where your data came from, when you accessed it, and any processing you did." />
              </div>
              <div>
                <Label htmlFor="references" required>References</Label>
                <TextArea id="references" required rows={5} placeholder="Paste your full reference list in the style you used." />
              </div>
            </FormSection>

            <FormSection n="05" title="Files" description="PDF or Word for the manuscript. Everything else is optional but helps reviewers.">
              <FileField id="paper" label="Full paper" accept=".pdf,.doc,.docx" required note="PDF or Word, up to 25 MB" />
              <FileField id="supporting" label="Supporting files" hint="Optional" accept="*" note="Data files, coding sheets, consent forms, images" />
            </FormSection>

            <FormSection n="06" title="Student declaration" description="Required on every submission. Reviewers read this before the manuscript.">
              <div>
                <Label htmlFor="ai" required>Use of AI tools</Label>
                <Select id="ai" value={aiUse} onChange={(e) => setAiUse(e.target.value)}>
                  <option value="none">I did not use AI tools on this work</option>
                  <option value="mechanical">Grammar, spelling, or formatting only</option>
                  <option value="brainstorm">Brainstorming or outlining, before I wrote the draft</option>
                  <option value="other">Other — described below</option>
                </Select>
                {aiUse !== "none" && (
                  <TextArea
                    className="mt-3"
                    rows={3}
                    placeholder="Describe exactly what you used and for which parts of the work."
                    aria-label="AI use description"
                  />
                )}
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                  AI may not write your analysis, generate your findings, or produce your sources.{" "}
                  <Link to="/integrity" className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent">
                    Read the full policy
                  </Link>
                  .
                </p>
              </div>

              <div className="rounded-[10px] border border-rule bg-surface p-5">
                <Checkbox
                  id="declaration"
                  checked={declared}
                  onChange={setDeclared}
                  label="I declare that this work is my own."
                  description="The research, analysis, and writing are mine. Every source is cited. No data has been fabricated or altered. Any human participants gave informed consent under adult supervision."
                />
              </div>
            </FormSection>

            <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-rule pt-8">
              <Button type="submit" size="lg" icon="arrow-right" disabled={!ready}>Submit for review</Button>
              <Button variant="secondary" size="lg">Save draft</Button>
              {!ready && (
                <p className="text-[13px] text-muted">
                  {remaining > 0 && `${remaining} checklist ${remaining === 1 ? "item" : "items"} left`}
                  {remaining > 0 && !declared && " · "}
                  {!declared && "declaration not signed"}
                </p>
              )}
            </div>
          </form>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <Card className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-rule bg-paper-deep/40 px-5 py-3.5">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink">Submission checklist</p>
                <span className="u-num font-mono text-[11px] text-accent">
                  {checked.length}/{SUBMISSION_CHECKLIST.length}
                </span>
              </div>
              <div className="space-y-3.5 p-5">
                {SUBMISSION_CHECKLIST.map((item) => (
                  <Checkbox
                    key={item.id}
                    id={`check-${item.id}`}
                    checked={checked.includes(item.id)}
                    onChange={() => toggle(item.id)}
                    label={
                      <>
                        {item.label}
                        {item.required && <span className="ml-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-flag">req</span>}
                      </>
                    }
                  />
                ))}
              </div>
              <div className="border-t border-rule px-5 py-4">
                <div className="h-1.5 overflow-hidden rounded-full bg-paper-deep">
                  <div
                    className="h-full rounded-full bg-accent transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ width: `${(checked.length / SUBMISSION_CHECKLIST.length) * 100}%` }}
                  />
                </div>
              </div>
            </Card>

            <div className="mt-4 space-y-4">
              <Notice title="Incomplete submissions are returned, not rejected." tone="neutral">
                Screening happens before review. If something is missing you'll hear within three days and can fix it
                without losing your place in the queue.
              </Notice>
              <Notice title="Submitting timestamps your work." tone="accent" icon="shield">
                Your upload is recorded with a date and a submission ID the moment it arrives — the
                strongest evidence of authorship you can hold.{" "}
                <Link to="/protect-your-work" className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent">
                  How to keep your work from being plagiarized
                </Link>
                .
              </Notice>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
