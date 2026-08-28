import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PROJECT_BY_SLUG, PROJECTS } from "@/data/projects";
import { fieldName } from "@/data/fields";
import { FieldGlyph } from "@/components/ui/FieldGlyph";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ProjectCard, ProjectStatusBadge } from "@/components/project/ProjectCard";
import { Card, Notice, RecordId, SampleTag, Tag } from "@/components/ui/Surface";
import { daysUntil, formatDate } from "@/lib/utils";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = slug ? PROJECT_BY_SLUG[slug] : undefined;
  const [saved, setSaved] = useState(false);

  if (!project) return <NotFound />;

  const days = daysUntil(project.deadline);
  const related = PROJECTS.filter(
    (p) => p.slug !== project.slug && (p.field === project.field || p.difficulty === project.difficulty),
  ).slice(0, 3);
  const totalBreakdown = project.hoursBreakdown.reduce((sum, h) => sum + parseFloat(h.hours), 0);

  return (
    <>
      <header className="border-b border-rule bg-surface">
        <div className="u-shell py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">
              <li><Link to="/opportunities" className="hover:text-accent">Research opportunities</Link></li>
              <li><Icon name="chevron-right" size={11} className="text-rule" /></li>
              <li>{fieldName(project.field)}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 text-accent">
              <FieldGlyph field={project.field} size={20} />
              <span className="text-[13px] font-medium text-ink">
                {fieldName(project.field)}
                {project.secondaryField && ` / ${fieldName(project.secondaryField)}`}
              </span>
            </span>
            <span className="h-3.5 w-px bg-rule" />
            <RecordId>{project.record}</RecordId>
            <ProjectStatusBadge status={project.status} />
            <SampleTag label="Sample listing" />
          </div>

          <h1 className="u-rise mt-5 max-w-[22ch] text-[clamp(2rem,4.4vw,3rem)] leading-[1.08] tracking-[-0.02em]">
            {project.title}
          </h1>
          <p className="u-rise mt-5 max-w-[58ch] text-[16.5px] leading-relaxed text-muted" style={{ animationDelay: "80ms" }}>
            {project.summary}
          </p>
        </div>
      </header>

      <div className="u-shell py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
          <div className="max-w-[68ch]">
            <section className="border-l-2 border-accent pl-6">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">Research question</p>
              <p className="mt-3 font-display text-[21px] leading-[1.42] tracking-[-0.008em] text-ink">
                {project.researchQuestion}
              </p>
            </section>

            <section className="mt-10 border-t border-rule pt-8">
              <h2 className="text-[24px] tracking-[-0.012em]">About this project</h2>
              <div className="u-prose mt-4 text-[16.5px] leading-[1.72] text-ink-soft">
                {project.description.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </section>

            <section className="mt-10 border-t border-rule pt-8">
              <h2 className="text-[24px] tracking-[-0.012em]">What you have to submit</h2>
              <p className="mt-3 text-[15px] text-muted">
                These are the requirements a reviewer checks against. Meeting all of them is what qualifies the work
                for hours.
              </p>
              <ul className="mt-6 space-y-3">
                {project.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-3 rounded-[8px] border border-rule bg-surface p-4">
                    <Icon name="check" size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-accent" />
                    <span className="text-[14.5px] leading-relaxed text-ink-soft">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10 border-t border-rule pt-8">
              <h2 className="text-[24px] tracking-[-0.012em]">What we give you</h2>
              <ul className="mt-6 grid gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-2">
                {project.resources.map((r) => (
                  <li key={r.label} className="bg-surface p-5">
                    <div className="flex items-center gap-2">
                      <Icon name="file" size={15} className="text-accent" />
                      <p className="text-[14px] font-semibold text-ink">{r.label}</p>
                    </div>
                    <p className="mt-1.5 text-[13px] leading-snug text-muted">{r.note}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">
                Resources unlock when your application is accepted
              </p>
            </section>

            <section className="mt-10 border-t border-rule pt-8">
              <h2 className="text-[24px] tracking-[-0.012em]">How the hours break down</h2>
              <p className="mt-3 text-[15px] text-muted">
                An estimate of where the work goes. Reviewers award hours against completed requirements, not against
                time you report spending.
              </p>
              <table className="mt-6 w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-rule">
                    <th scope="col" className="pb-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-faint">Stage</th>
                    <th scope="col" className="pb-2.5 text-right font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-faint">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {project.hoursBreakdown.map((h) => (
                    <tr key={h.task} className="border-b border-rule-soft">
                      <td className="py-3 text-[14.5px] text-ink-soft">{h.task}</td>
                      <td className="u-num py-3 text-right font-mono text-[13.5px] text-ink">{h.hours}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="pt-3 text-[14px] font-semibold text-ink">Maximum awardable</td>
                    <td className="u-num pt-3 text-right font-mono text-[14px] font-semibold text-seal">
                      {Math.min(totalBreakdown, project.maxHours)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <div className="mt-10">
              <Notice title="Approval is a judgment call, not a formula." tone="seal" icon="seal">
                A reviewer reads your submission against the requirements above and decides how many hours it earns,
                up to {project.maxHours}. Work that misses requirements comes back with specific revisions rather than
                a rejection — you can resubmit.{" "}
                <Link to="/about#hours-policy" className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent">
                  Read the full hour policy
                </Link>
                .
              </Notice>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <Card className="overflow-hidden">
              <div className="border-b border-rule bg-paper-deep/40 px-5 py-3.5">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink">Project information</p>
              </div>
              <dl className="divide-y divide-rule">
                {[
                  { term: "Field", value: fieldName(project.field) },
                  { term: "Deliverable", value: project.deliverable },
                  { term: "Difficulty", value: project.difficulty },
                  { term: "Estimated time", value: project.timeCommitment },
                  { term: "Volunteer hours", value: `Up to ${project.maxHours} verified`, seal: true },
                  { term: "Applications close", value: formatDate(project.deadline) },
                  { term: "Cohort", value: `${project.spotsRemaining} of ${project.cohortSize} spots left` },
                  { term: "Reviewer", value: project.mentor.name },
                ].map((row) => (
                  <div key={row.term} className="flex items-baseline justify-between gap-4 px-5 py-3">
                    <dt className="text-[12.5px] text-muted">{row.term}</dt>
                    <dd className={`text-right text-[13.5px] ${row.seal ? "font-medium text-seal" : "text-ink"}`}>
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="space-y-2 border-t border-rule p-4">
                <Button full size="md" icon="arrow-right" to="/signin?tab=create">
                  {project.status === "Waitlist" ? "Join the waitlist" : "Apply to this project"}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  full
                  iconLeft={saved ? "check" : "bookmark"}
                  onClick={() => setSaved((v) => !v)}
                >
                  {saved ? "Saved" : "Save for later"}
                </Button>
                {days > 0 && (
                  <p className="pt-1 text-center font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint">
                    {days} days to apply
                  </p>
                )}
              </div>
            </Card>

            <Card className="mt-4 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Skills assumed</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.skills.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
              <p className="mt-4 border-t border-rule pt-3 text-[13px] leading-relaxed text-muted">
                Missing one of these? Apply anyway and say so in your note — reviewers pair students with the
                resources they need.
              </p>
            </Card>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-rule pt-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="u-eyebrow">Similar openings</p>
                <h2 className="mt-2 text-[26px]">Other projects to consider</h2>
              </div>
              <Button to="/opportunities" variant="quiet" icon="arrow-right">All opportunities</Button>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
