import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Checkbox, Label, Select, TextInput } from "@/components/ui/Form";
import { Card, SampleTag } from "@/components/ui/Surface";
import { ORG, STATS } from "@/data/site";
import { cn } from "@/lib/utils";

export default function SignIn() {
  const [params] = useSearchParams();
  const [tab, setTab] = useState<"signin" | "create">(params.get("tab") === "create" ? "create" : "signin");
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="u-shell grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20 lg:py-20">
      <div className="lg:pt-6">
        <p className="u-eyebrow">{tab === "create" ? "Create an account" : "Welcome back"}</p>
        <h1 className="mt-4 max-w-[16ch] text-[clamp(2rem,4.4vw,3rem)] leading-[1.06] tracking-[-0.02em]">
          {tab === "create" ? "Start your research portfolio" : "Sign in to your portfolio"}
        </h1>
        <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-muted">
          {tab === "create"
            ? "An account lets you apply to projects, submit research, track review status, and download your service record. It is free."
            : "Pick up where you left off — active projects, submissions in review, and your verified hours."}
        </p>

        <ul className="mt-10 space-y-4 border-t border-rule pt-8">
          {[
            { icon: "list" as const, text: "Apply to research projects across twenty fields" },
            { icon: "upload" as const, text: "Submit your own studies for review and publication" },
            { icon: "seal" as const, text: "Track verified hours and download a service record" },
            { icon: "user" as const, text: "Build a public academic profile you can share" },
          ].map((item) => (
            <li key={item.text} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] border border-rule bg-surface text-accent">
                <Icon name={item.icon} size={14} />
              </span>
              <span className="text-[14.5px] leading-snug text-ink-soft">{item.text}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-rule pt-8">
          {STATS.slice(0, 3).map((s) => (
            <div key={s.label}>
              <dd className="u-num font-display text-[24px] leading-none text-ink">{s.value}</dd>
              <dt className="mt-1.5 text-[12px] text-muted">{s.label}</dt>
            </div>
          ))}
          <SampleTag className="self-end" label="Placeholder figures" />
        </dl>
      </div>

      <Card className="h-fit overflow-hidden">
        <div className="flex border-b border-rule">
          {([
            { key: "signin" as const, label: "Sign in" },
            { key: "create" as const, label: "Create account" },
          ]).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              aria-pressed={tab === t.key}
              className={cn(
                "flex-1 px-4 py-4 text-[14px] transition-colors duration-200",
                tab === t.key ? "bg-ink text-paper" : "text-muted hover:text-ink",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form className="space-y-5 p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
          {tab === "create" && (
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="first" required>First name</Label>
                <TextInput id="first" required autoComplete="given-name" />
              </div>
              <div>
                <Label htmlFor="last" required>Last name</Label>
                <TextInput id="last" required autoComplete="family-name" />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="email" required>Email</Label>
            <TextInput id="email" type="email" required autoComplete="email" placeholder="you@school.edu" />
          </div>

          {tab === "create" && (
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="school" required>School</Label>
                <TextInput id="school" required />
              </div>
              <div>
                <Label htmlFor="grad" required>Graduation year</Label>
                <Select id="grad" defaultValue="">
                  <option value="" disabled>Select</option>
                  {[2026, 2027, 2028, 2029, 2030].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </Select>
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="password" required>Password</Label>
            <TextInput id="password" type="password" required autoComplete={tab === "create" ? "new-password" : "current-password"} />
            {tab === "create" && (
              <p className="mt-1.5 text-[12.5px] text-muted">At least 12 characters.</p>
            )}
          </div>

          {tab === "create" ? (
            <Checkbox
              id="terms"
              checked={agreed}
              onChange={setAgreed}
              label={
                <>
                  I agree to the{" "}
                  <Link to="/terms" className="text-accent underline decoration-accent/30 underline-offset-2">terms of use</Link>{" "}
                  and the{" "}
                  <Link to="/integrity" className="text-accent underline decoration-accent/30 underline-offset-2">research integrity standards</Link>.
                </>
              }
            />
          ) : (
            <div className="flex items-center justify-between">
              <Checkbox id="remember" checked={false} onChange={() => {}} label="Keep me signed in" />
              <button type="button" className="text-[13px] text-accent hover:underline">Forgot password?</button>
            </div>
          )}

          <Button type="submit" full size="lg" icon="arrow-right" disabled={tab === "create" && !agreed}>
            {tab === "create" ? "Create account" : "Sign in"}
          </Button>

          <p className="border-t border-rule pt-5 text-center text-[13px] text-muted">
            This is a preview build — accounts are not live yet.{" "}
            <Link to="/dashboard" className="text-accent hover:underline">Open the demo dashboard</Link> to see what
            students get.
          </p>
        </form>
      </Card>

      <p className="text-[12.5px] text-faint lg:col-span-2">
        {ORG.name} · Students under 13 need a parent or guardian to create the account.
      </p>
    </div>
  );
}
