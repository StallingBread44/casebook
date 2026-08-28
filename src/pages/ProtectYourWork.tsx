import { useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Checkbox } from "@/components/ui/Form";
import { Card, Notice, SectionHeading, Tag } from "@/components/ui/Surface";
import { ORG } from "@/data/site";
import { useReveal } from "@/lib/utils";

/**
 * The inverse of the integrity page: that one is about not taking other people's
 * work, this one is about holding onto your own. Structured around evidence —
 * what proves authorship, at which point, and what to do when it is questioned.
 */

const PLATFORM_PROTECTIONS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "clock",
    title: "Timestamped from your first upload",
    body: "Every draft, file, and revision you upload is recorded with a date and time under your account. That log is the single most useful thing you can have if authorship is ever questioned.",
  },
  {
    icon: "file",
    title: "A permanent record number",
    body: "Published work receives a citable record — CB·PSY·0142 — that points to you, your school, and a publication date. A copy without that number is traceable back to the original.",
  },
  {
    icon: "shield",
    title: "Originality screening before review",
    body: "Submissions are screened against published sources and against the rest of our library before a reviewer sees them. Screening catches copying in both directions.",
  },
  {
    icon: "pen",
    title: "A signed authorship declaration",
    body: "Every submission carries your declaration naming who did the work and what tools you used. It is part of the permanent record of the paper.",
  },
];

const HABITS: { n: string; title: string; body: string; detail: string[] }[] = [
  {
    n: "01",
    title: "Keep the trail, not just the paper",
    body: "Authorship is proved by process, not by the finished file.",
    detail: [
      "Write in a tool that keeps version history — a cloud document, or a folder committed to version control. Dated drafts showing a paper getting better over weeks are far harder to dispute than a single finished PDF.",
      "Keep your notes, your data files, your search logs, and the dead ends. Nobody who copied your work has those.",
    ],
  },
  {
    n: "02",
    title: "Sign every file you send",
    body: "Your name and record number belong inside the document, not just in the filename.",
    detail: [
      "Put your name, school, date, and — once you have one — your CB record number in the header or footer of every page. Filenames get changed; page furniture usually does not.",
      "Send PDFs rather than editable documents when someone only needs to read it. A PDF is a snapshot; a shared document is an invitation to edit.",
    ],
  },
  {
    n: "03",
    title: "Decide who is allowed to reuse it",
    body: "Your work is copyrighted from the moment you write it, but nobody can guess your terms.",
    detail: [
      "Add one line stating your terms — all rights reserved, or a Creative Commons license if you want the work shared with credit. Stating terms turns a vague situation into a clear one.",
      "Publishing on CB does not transfer your copyright. You keep ownership of everything you submit and can republish it anywhere.",
    ],
  },
  {
    n: "04",
    title: "Be careful where you circulate drafts",
    body: "Most student work is copied from places the author shared it themselves.",
    detail: [
      "Group chats, public study servers, essay-swap sites, and shared class folders are the common leaks. Share read-only links with named people instead of files with a group.",
      "Turn off public commenting and link sharing on cloud documents once you no longer need feedback.",
    ],
  },
  {
    n: "05",
    title: "Publish it somewhere findable",
    body: "A public, dated, indexed copy is your strongest deterrent.",
    detail: [
      "Copying is easy; copying something that already appears under someone else's name at a searchable address is a bad idea and most people know it.",
      "Once your study is in the library, a search for a distinctive sentence from it returns your version with your name on it.",
    ],
  },
  {
    n: "06",
    title: "Check the rules before you submit elsewhere",
    body: "Competitions and journals have their own terms, and some conflict.",
    detail: [
      "Some contests require work that has never been published; some journals ask for exclusive rights. Read the terms before you enter, not after.",
      "If a program's terms would require you to hand over ownership, ask us — we can tell you what our publication does and does not affect.",
    ],
  },
];

const LICENSES = [
  {
    name: "All rights reserved",
    line: "© 2026 Your Name. All rights reserved.",
    allows: "Reading and quoting with citation, as fair use allows.",
    stops: "Republishing, translating, or reusing your text without asking you first.",
    fit: "The default. Best if you may submit the work to a competition or journal later.",
  },
  {
    name: "CC BY-NC",
    line: "Licensed under CC BY-NC 4.0.",
    allows: "Anyone may share and build on the work for non-commercial purposes, with credit to you.",
    stops: "Commercial reuse, and any use that drops your name.",
    fit: "Good if you want teachers and other students to use your work freely.",
  },
  {
    name: "CC BY-NC-ND",
    line: "Licensed under CC BY-NC-ND 4.0.",
    allows: "Anyone may share the whole work, unchanged, with credit to you.",
    stops: "Edited versions, remixes, and commercial reuse.",
    fit: "Good if you want the work spread widely but kept intact.",
  },
];

const RESPONSE_STEPS = [
  {
    title: "Capture the evidence first",
    body: "Screenshot the copy with its URL and date visible, and save a copy of the page. Copies disappear quickly once the person knows they have been noticed.",
  },
  {
    title: "Line the two up",
    body: "Note the specific passages, figures, or data that match, and the dates on each version. Specific overlaps carry an argument; a general resemblance does not.",
  },
  {
    title: "Tell us",
    body: `Write to ${ORG.email.replace("editors", "integrity")} with your record number and what you found. We investigate every report and we do it quietly — you will not be publicly named for reporting.`,
  },
  {
    title: "Let us contact the other side",
    body: "Where the copy is on our platform we can remove it, revoke hours awarded for it, and publish a correction. Where it is elsewhere, we can confirm in writing that you are the documented author and when you filed the work.",
  },
  {
    title: "Escalate only if it stays unresolved",
    body: "For copies on a school assignment or another publication, your evidence and our written confirmation are what a teacher, editor, or platform will ask for. Involve an adult before you contact a stranger directly.",
  },
];

const CHECKLIST = [
  "Drafts are stored somewhere with version history",
  "Notes, data, and sources are saved alongside the manuscript",
  "Your name and school appear inside the document on every page",
  "Shared links are read-only and go to named people",
  "A license or rights line appears on the first page",
  "The final version is published or filed with a record number",
  "You know where your record number and submission date are recorded",
];

export default function ProtectYourWork() {
  const ref = useReveal<HTMLDivElement>();
  const [done, setDone] = useState<string[]>([]);
  const toggle = (item: string) =>
    setDone((prev) => (prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]));

  return (
    <>
      <PageHeader
        eyebrow="Protecting your work"
        title="How to keep your work from being plagiarized"
        lead="Your research is yours from the moment you write it. Keeping it that way is mostly about evidence: what you can show, and when you can show it was yours."
        breadcrumb={[{ label: "Research integrity", to: "/integrity" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/submit" icon="arrow-right">Submit and timestamp your work</Button>
          <Button to="/integrity" variant="secondary">Read the integrity standards</Button>
        </div>
      </PageHeader>

      <div ref={ref} className="u-shell py-14 lg:py-20">
        {/* The provenance chain — the page's central idea in one diagram */}
        <section aria-labelledby="provenance">
          <SectionHeading
            id="provenance"
            eyebrow="Start here"
            title="Authorship is a chain of dated evidence"
            lead="Almost every dispute comes down to one question: who can show the earlier version? Each step below leaves a record that the next one builds on."
          />

          <ol className="reveal mt-10 grid gap-px overflow-hidden rounded-card border border-rule bg-rule md:grid-cols-2 xl:grid-cols-4">
            {[
              { stage: "While you write", evidence: "Dated drafts, notes, data files, search logs", strength: "Weak alone, decisive in combination" },
              { stage: "When you submit", evidence: "Upload timestamp, signed declaration, submission ID", strength: "Independently recorded, not editable by you" },
              { stage: "During review", evidence: "Reviewer notes, revision history, screening result", strength: "A third party read it and can say when" },
              { stage: "After publication", evidence: "Permanent record number, public date, citation", strength: "Findable by anyone searching a line of it" },
            ].map((step, i) => (
              <li key={step.stage} className="relative bg-surface p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i === 3 && <Icon name="seal" size={15} className="text-seal" />}
                </div>
                <h3 className="mt-3.5 font-sans text-[15.5px] font-semibold tracking-[-0.005em] text-ink">
                  {step.stage}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{step.evidence}</p>
                <p className="mt-4 border-t border-rule pt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-faint">
                  {step.strength}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* What the platform does */}
        <section className="mt-20 border-t border-rule pt-14" aria-labelledby="what-we-do-for-you">
          <SectionHeading
            id="what-we-do-for-you"
            eyebrow="What we do for you"
            title="Four records you get without asking"
            lead="Working through the platform builds most of the evidence trail automatically."
          />
          <ul className="mt-10 grid gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-2">
            {PLATFORM_PROTECTIONS.map((item, i) => (
              <li
                key={item.title}
                className="reveal bg-surface p-6 sm:p-7"
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <Icon name={item.icon} size={20} className="text-accent" />
                <h3 className="mt-4 font-sans text-[16px] font-semibold tracking-[-0.005em] text-ink">{item.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-[62ch] text-[14.5px] leading-relaxed text-muted">
            None of this requires publication. Work you submit but never publish still has an upload
            timestamp and a submission ID recorded under your account.
          </p>
        </section>

        {/* Habits */}
        <section className="mt-20 border-t border-rule pt-14" aria-labelledby="habits">
          <SectionHeading
            id="habits"
            eyebrow="What you do"
            title="Six habits that make copying pointless"
            lead="None of these take real time. Together they mean anyone who copies your work is holding the weaker version of it."
          />
          <ol className="mt-10 space-y-4">
            {HABITS.map((habit, i) => (
              <li
                key={habit.n}
                className="reveal"
                style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              >
                <Card className="grid gap-6 p-6 sm:p-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
                  <div className="flex items-start gap-4">
                    <span className="mt-1 font-mono text-[12px] tabular-nums text-accent">{habit.n}</span>
                    <div>
                      <h3 className="text-[22px] leading-tight tracking-[-0.012em]">{habit.title}</h3>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{habit.body}</p>
                    </div>
                  </div>
                  <div className="u-prose text-[15px] leading-[1.7] text-muted">
                    {habit.detail.map((p, j) => <p key={j}>{p}</p>)}
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        </section>

        {/* Licensing */}
        <section className="mt-20 border-t border-rule pt-14" aria-labelledby="licensing">
          <SectionHeading
            id="licensing"
            eyebrow="Stating your terms"
            title="Pick a line and put it on page one"
            lead="You own your work either way. A rights line tells readers what they may do with it, which is what stops most casual reuse before it happens."
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-rule bg-rule lg:grid-cols-3">
            {LICENSES.map((license, i) => (
              <div
                key={license.name}
                className="reveal flex flex-col bg-surface p-6"
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-sans text-[16px] font-semibold tracking-[-0.005em] text-ink">{license.name}</h3>
                  {i === 0 && <Tag tone="accent">Default</Tag>}
                </div>
                <p className="mt-3 rounded-[6px] border border-rule bg-paper-deep/50 px-3 py-2 font-mono text-[11.5px] leading-relaxed text-ink-soft">
                  {license.line}
                </p>
                <dl className="mt-4 flex-1 space-y-3 text-[13.5px] leading-snug">
                  <div>
                    <dt className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-accent">Allows</dt>
                    <dd className="mt-1 text-ink-soft">{license.allows}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-flag">Stops</dt>
                    <dd className="mt-1 text-ink-soft">{license.stops}</dd>
                  </div>
                </dl>
                <p className="mt-5 border-t border-rule pt-3.5 text-[13px] leading-snug text-muted">
                  {license.fit}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Notice title="Copyright is automatic. Proof of date is not." tone="neutral">
              In the United States and most countries your work is protected by copyright the moment
              you write it down — no registration, no symbol, no fee. What registration and
              timestamps add is the ability to prove <em>when</em> it existed and that it was yours.
              That is the gap the habits on this page close. This is general information about how
              copyright works, not legal advice.
            </Notice>
          </div>
        </section>

        {/* If it happens */}
        <section className="mt-20 border-t border-rule pt-14" aria-labelledby="response">
          <SectionHeading
            id="response"
            eyebrow="If it happens anyway"
            title="What to do when you find a copy"
            lead="Move in this order. The first step is the one students skip and the one that matters most."
          />
          <ol className="mt-10 space-y-px overflow-hidden rounded-card border border-rule bg-rule">
            {RESPONSE_STEPS.map((step, i) => (
              <li key={step.title} className="flex items-start gap-5 bg-surface p-6">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rule bg-paper-deep/40 font-mono text-[11px] tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-sans text-[15.5px] font-semibold tracking-[-0.005em] text-ink">{step.title}</h3>
                  <p className="mt-1.5 max-w-[68ch] text-[14.5px] leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Notice title="Don't confront someone alone." tone="seal" icon="alert">
              Bring an adult in before you contact a person you don't know, and never post an
              accusation publicly before it has been checked. If you are wrong, a public accusation
              is the harder thing to undo — and if you are right, a quiet correction gets your name
              back on the work faster.
            </Notice>
            <Notice title="Similar isn't the same as copied." tone="neutral">
              Two students can ask the same question of the same public dataset and reach the same
              answer. Copyright covers your expression — your sentences, structure, and figures — not
              the underlying idea or facts. Look for matching wording, matching mistakes, and
              matching formatting before you conclude anything.
            </Notice>
          </div>
        </section>

        {/* Checklist */}
        <section className="mt-20 border-t border-rule pt-14" aria-labelledby="checklist">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <p className="u-eyebrow">Before you share it</p>
              <h2 id="checklist" className="mt-3 text-[clamp(1.7rem,3vw,2.3rem)] leading-tight">
                The seven-line check
              </h2>
              <p className="mt-4 max-w-[42ch] text-[15.5px] leading-relaxed text-muted">
                Run this before a paper leaves your hands — to a teacher, a contest, a group chat, or
                us. It takes about two minutes.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button to="/submit" icon="arrow-right">Submit your research</Button>
                <Button to="/contact" variant="secondary">Ask us a question</Button>
              </div>
            </div>
            <Card className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-rule bg-paper-deep/40 px-6 py-3.5">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink">Pre-share check</p>
                <span className="u-num font-mono text-[11px] text-accent">
                  {done.length}/{CHECKLIST.length}
                </span>
              </div>
              <ul className="px-6 py-2">
                {CHECKLIST.map((item) => (
                  <li key={item} className="border-b border-rule py-3.5 last:border-0">
                    <Checkbox
                      id={`protect-${item.slice(0, 12).replace(/\s/g, "-")}`}
                      checked={done.includes(item)}
                      onChange={() => toggle(item)}
                      label={item}
                    />
                  </li>
                ))}
              </ul>
              <div className="border-t border-rule px-6 py-4">
                <div className="h-1.5 overflow-hidden rounded-full bg-paper-deep">
                  <div
                    className="h-full rounded-full bg-accent transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ width: `${(done.length / CHECKLIST.length) * 100}%` }}
                  />
                </div>
              </div>
            </Card>
          </div>
        </section>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-card border border-rule bg-surface p-8">
          <div>
            <h2 className="text-[24px]">Think something of yours was copied?</h2>
            <p className="mt-2 max-w-[52ch] text-[15px] text-muted">
              Write to{" "}
              <a
                href={`mailto:${ORG.email.replace("editors", "integrity")}`}
                className="font-mono text-[14px] text-accent hover:underline"
              >
                {ORG.email.replace("editors", "integrity")}
              </a>{" "}
              with your record number and what you found. We investigate every report, and reports
              stay confidential.
            </p>
          </div>
          <Link
            to="/integrity"
            className="inline-flex h-11 items-center rounded-[8px] border border-rule px-5 text-[14px] text-ink transition-colors hover:border-ink/30"
          >
            Research integrity standards
          </Link>
        </div>
      </div>
    </>
  );
}
