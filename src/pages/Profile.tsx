import { useParams, Link } from "react-router-dom";
import { STUDENT_BY_HANDLE, STUDENTS } from "@/data/students";
import { PAPER_BY_SLUG } from "@/data/papers";
import { FIELDS, fieldName } from "@/data/fields";
import { ResearchRow } from "@/components/research/ResearchCard";
import { FieldGlyph } from "@/components/ui/FieldGlyph";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Card, RecordId, SampleTag, Tag } from "@/components/ui/Surface";
import { formatDateShort } from "@/lib/utils";
import NotFound from "./NotFound";

export default function Profile() {
  const { handle } = useParams();
  const student = handle ? STUDENT_BY_HANDLE[handle] : undefined;
  if (!student) return <NotFound />;

  const papers = student.publishedSlugs.map((s) => PAPER_BY_SLUG[s]).filter(Boolean);
  const initials = student.name.split(" ").map((n) => n[0]).join("");
  const others = STUDENTS.filter((s) => s.handle !== student.handle).slice(0, 4);

  return (
    <>
      <header className="border-b border-rule bg-surface">
        <div className="u-shell py-12 lg:py-16">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div className="flex flex-wrap items-start gap-6">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[14px] border border-rule bg-paper-deep/50 font-display text-[28px] text-accent">
                {initials}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <RecordId>CB·STU·{String(10400 + student.name.length * 7).slice(0, 5)}</RecordId>
                  <SampleTag label="Sample profile" />
                </div>
                <h1 className="mt-2.5 text-[clamp(2rem,4.4vw,2.9rem)] leading-[1.06] tracking-[-0.02em]">
                  {student.name}
                </h1>
                <p className="mt-2 text-[15px] text-muted">
                  {student.role} · {student.school} · {student.gradYear}
                </p>
                <p className="mt-1 text-[13.5px] text-faint">{student.location}</p>
              </div>
            </div>

            <dl className="grid grid-cols-3 gap-x-8 gap-y-2">
              {[
                { term: "Published studies", value: String(papers.length) },
                { term: "Projects completed", value: String(student.completedProjects.length) },
                { term: "Verified hours", value: String(student.verifiedHours), seal: true },
              ].map((s) => (
                <div key={s.term}>
                  <dd className={`u-num font-display text-[32px] leading-none ${s.seal ? "text-seal" : "text-ink"}`}>
                    {s.value}
                  </dd>
                  <dt className="mt-2 max-w-[9ch] text-[12px] leading-snug text-muted">{s.term}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Interests</span>
            {student.academicInterests.map((interest) => {
              const field = FIELDS.find((f) => f.name === interest);
              return (
                <span key={interest} className="inline-flex items-center gap-1.5 rounded-[5px] border border-rule bg-paper-deep/50 px-2.5 py-1 text-[13px] text-ink-soft">
                  {field && <span className="text-accent"><FieldGlyph field={field.slug} size={14} /></span>}
                  {interest}
                </span>
              );
            })}
          </div>
        </div>
      </header>

      <div className="u-shell py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14">
          <div>
            <section>
              <p className="u-eyebrow">Biography</p>
              <p className="mt-4 max-w-[62ch] font-display text-[19px] leading-[1.55] text-ink-soft">{student.bio}</p>
            </section>

            <section className="mt-12 border-t border-rule pt-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="u-eyebrow">Research portfolio</p>
                  <h2 className="mt-2 text-[26px]">
                    {papers.length} published {papers.length === 1 ? "study" : "studies"}
                  </h2>
                </div>
              </div>
              {papers.length > 0 ? (
                <div className="mt-5">
                  {papers.map((p) => <ResearchRow key={p.slug} paper={p} />)}
                </div>
              ) : (
                <p className="mt-4 text-[14.5px] text-muted">No published studies yet.</p>
              )}
            </section>

            <section className="mt-12 border-t border-rule pt-8">
              <p className="u-eyebrow">Completed projects</p>
              <h2 className="mt-2 text-[26px]">Research work approved by reviewers</h2>
              <table className="mt-6 w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-rule">
                    {["Project", "Field", "Completed", "Hours"].map((h) => (
                      <th key={h} scope="col" className="pb-2.5 font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-faint">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {student.completedProjects.map((p) => (
                    <tr key={p.title} className="border-b border-rule-soft">
                      <td className="py-3.5 pr-4 text-[14.5px] text-ink">{p.title}</td>
                      <td className="py-3.5 pr-4 text-[13.5px] text-muted">{fieldName(p.field)}</td>
                      <td className="py-3.5 pr-4 font-mono text-[12px] text-muted">{formatDateShort(p.completed)}</td>
                      <td className="u-num py-3.5 font-mono text-[13.5px] text-seal">{p.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
            <Card className="p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Service</p>
              <p className="u-num mt-3 font-display text-[40px] leading-none text-seal">{student.verifiedHours}</p>
              <p className="mt-2 text-[13.5px] leading-snug text-muted">
                Verified research volunteer hours, approved by reviewers.
              </p>
              <p className="mt-3 border-t border-rule pt-3 text-[12px] leading-relaxed text-faint">
                Acceptance toward a school service requirement is decided by that school.
              </p>
            </Card>

            <Card className="p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Research interests</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {student.researchInterests.map((r) => <Tag key={r} tone="accent">{r}</Tag>)}
              </div>
            </Card>

            <Card className="p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Skills</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {student.skills.map((s) => <Tag key={s}>{s}</Tag>)}
              </div>
            </Card>

            <Card className="p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Awards & recognition</p>
              <ul className="mt-3 space-y-3">
                {student.awards.map((a) => (
                  <li key={a.title} className="flex items-start gap-2.5">
                    <Icon name="spark" size={14} className="mt-1 shrink-0 text-seal" />
                    <span>
                      <span className="block text-[13.5px] font-medium text-ink">{a.title}</span>
                      <span className="mt-0.5 block text-[12.5px] leading-snug text-muted">{a.detail}</span>
                      <span className="mt-0.5 block font-mono text-[10.5px] text-faint">{a.year}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Button to="/opportunities" variant="secondary" full icon="arrow-right">Start your own portfolio</Button>
          </aside>
        </div>

        <section className="mt-16 border-t border-rule pt-10">
          <p className="u-eyebrow">Other researchers</p>
          <h2 className="mt-2 text-[26px]">Students publishing in nearby fields</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <li key={s.handle}>
                <Link to={`/students/${s.handle}`} className="group block h-full rounded-card border border-rule bg-surface p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-[3px] hover:shadow-lift">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-rule bg-paper-deep/50 font-display text-[16px] text-accent">
                    {s.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <p className="mt-3.5 text-[15px] font-medium text-ink group-hover:text-accent">{s.name}</p>
                  <p className="mt-1 text-[12.5px] text-muted">{s.researchInterests.slice(0, 2).join(" · ")}</p>
                  <p className="u-num mt-3 border-t border-rule pt-3 font-mono text-[11.5px] text-faint">
                    {s.verifiedHours} verified hours
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
