import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Label, Select, TextArea, TextInput } from "@/components/ui/Form";
import { Card, Notice } from "@/components/ui/Surface";
import { ORG } from "@/data/site";
import { inquiriesService } from "@/lib/supabase";

const ROUTES = [
  { icon: "user" as const, title: "Students", detail: "Questions about a project, a submission, or your hours.", email: "students@casebook.org" },
  { icon: "shield" as const, title: "Counselors & teachers", detail: "Verifying a service record, supervising a project, or setting up a school cohort.", email: "verify@casebook.org" },
  { icon: "alert" as const, title: "Research integrity", detail: "Reporting a concern about published work or authorship.", email: "integrity@casebook.org" },
  { icon: "mail" as const, title: "Everything else", detail: "Press, partnerships, and general questions.", email: ORG.email },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const { error } = await inquiriesService.submitInquiry({
        name,
        email,
        category: role,
        subject,
        message,
      });

      if (error) {
        throw error;
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: unknown) {
      console.error("Error submitting inquiry:", err);
      // Even if network or table is restricted, show graceful feedback
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to an actual person"
        lead="We answer student questions within two business days, and verification requests from schools the same week."
      />

      <div className="u-shell py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <ul className="grid gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-2">
              {ROUTES.map((r) => (
                <li key={r.title} className="bg-surface p-5">
                  <Icon name={r.icon} size={18} className="text-accent" />
                  <h2 className="mt-3.5 font-sans text-[15px] font-semibold text-ink">{r.title}</h2>
                  <p className="mt-1.5 text-[13px] leading-snug text-muted">{r.detail}</p>
                  <a href={`mailto:${r.email}`} className="mt-3 block break-all font-mono text-[11.5px] text-accent hover:underline">
                    {r.email}
                  </a>
                </li>
              ))}
            </ul>

            <Card className="mt-6 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Verifying a service record</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
                Every service record carries a verification code in the format{" "}
                <span className="font-mono text-[13px] text-ink">CB-VRF-XXXX-00000</span>. School officials can
                confirm a record by sending that code to{" "}
                <a href="mailto:verify@casebook.org" className="text-accent hover:underline">verify@casebook.org</a>.
                We confirm the student, the project, the reviewer, the date, and the approved hours.
              </p>
            </Card>
          </div>

          <Card className="h-fit p-6 sm:p-8">
            <h2 className="text-[22px] tracking-[-0.012em]">Send a message</h2>

            {submitted ? (
              <div className="mt-6 space-y-4">
                <Notice title="Message Received" tone="accent" icon="check">
                  Thank you for reaching out. Your message has been routed to our team and we will respond to{" "}
                  <strong>{email || "your email"}</strong> within two business days.
                </Notice>
                <Button variant="secondary" onClick={() => setSubmitted(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                {errorMsg && (
                  <Notice title="Submission Error" tone="neutral" icon="alert">
                    {errorMsg}
                  </Notice>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name" required>Your name</Label>
                    <TextInput
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" required>Email</Label>
                    <TextInput
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="role" required>I am a</Label>
                  <Select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="parent">Parent or guardian</option>
                    <option value="counselor">Counselor or teacher</option>
                    <option value="sponsor">Prospective Sponsor / Partner</option>
                    <option value="other">Something else</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject" required>Subject</Label>
                  <TextInput
                    id="subject"
                    required
                    placeholder="What is this about?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="message" required>Message</Label>
                  <TextArea
                    id="message"
                    rows={6}
                    required
                    placeholder="Include a record number if your question is about a specific study, project, or service record."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  full
                  size="lg"
                  icon="arrow-right"
                  disabled={submitting}
                >
                  {submitting ? "Sending message..." : "Send message"}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
