import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Checkbox, Label, Select, TextInput } from "@/components/ui/Form";
import { Card, Notice, SampleTag } from "@/components/ui/Surface";
import { ORG, STATS } from "@/data/site";
import { cn } from "@/lib/utils";
import { authService } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

export default function SignIn() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { demoSignIn } = useAuth();

  const [tab, setTab] = useState<"signin" | "create">(params.get("tab") === "create" ? "create" : "signin");
  const [agreed, setAgreed] = useState(false);

  // Sync tab with URL search params
  useEffect(() => {
    const t = params.get("tab");
    if (t === "create" || t === "signin") {
      setTab(t);
    }
  }, [params]);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("2026");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (tab === "create") {
        if (!agreed) {
          setErrorMsg("Please agree to the terms of use and research standards.");
          setLoading(false);
          return;
        }

        const { data, error } = await authService.signUp(email, password, {
          first_name: firstName,
          last_name: lastName,
          school,
          grade,
        });

        if (error) throw error;

        if (data.session) {
          navigate("/dashboard");
        } else {
          setSuccessMsg("Account registered successfully! If email confirmation is enabled in your project, check your inbox or explore the dashboard directly.");
          setTimeout(() => navigate("/dashboard"), 2500);
        }
      } else {
        const { data, error } = await authService.signIn(email, password);
        if (error) throw error;
        if (data.user) {
          navigate("/dashboard");
        }
      }
    } catch (err: unknown) {
      console.error("Auth error:", err);
      const msg = err instanceof Error ? err.message : "Authentication failed. Please check your credentials.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    demoSignIn();
    navigate("/dashboard");
  };

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
          <SampleTag className="self-end" label="Live database linked" />
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
              type="button"
              onClick={() => {
                setTab(t.key);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              aria-pressed={tab === t.key}
              className={cn(
                "flex-1 px-4 py-4 text-[14px] font-medium transition-colors duration-200",
                tab === t.key ? "bg-ink text-paper" : "text-muted hover:text-ink",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form className="space-y-5 p-6 sm:p-8" onSubmit={handleSubmit}>
          {errorMsg && (
            <Notice title="Authentication Notice" tone={errorMsg.toLowerCase().includes("rate limit") ? "seal" : "neutral"} icon="alert">
              <p>{errorMsg}</p>
              {errorMsg.toLowerCase().includes("rate limit") ? (
                <div className="mt-3 space-y-2 text-[12.5px] text-muted border-t border-rule pt-2.5">
                  <p>
                    <strong>Why this happens:</strong> Supabase limits automated confirmation emails on free projects (3/hour).
                  </p>
                  <p>
                    <strong>Quick Fix in Supabase:</strong> In your Supabase Dashboard, go to <em>Authentication → Providers → Email</em> and toggle <strong>"Confirm email"</strong> to <strong>OFF</strong>.
                  </p>
                  <div className="pt-1">
                    <Button type="button" size="sm" variant="secondary" onClick={handleDemoAccess}>
                      Continue to Dashboard as Demo Student →
                    </Button>
                  </div>
                </div>
              ) : tab === "signin" ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => { setTab("create"); setErrorMsg(null); }}
                    className="text-[13px] font-medium text-accent hover:underline"
                  >
                    Need an account? Register here →
                  </button>
                </div>
              ) : null}
            </Notice>
          )}

          {successMsg && (
            <Notice title="Account Notice" tone="accent" icon="check">
              {successMsg}
            </Notice>
          )}

          {tab === "create" && (
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="first" required>First name</Label>
                <TextInput
                  id="first"
                  required
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="last" required>Last name</Label>
                <TextInput
                  id="last"
                  required
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="email" required>Email</Label>
            <TextInput
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {tab === "create" && (
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="school" required>School</Label>
                <TextInput
                  id="school"
                  required
                  placeholder="Your high school"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="grad" required>Graduation year</Label>
                <Select
                  id="grad"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  {[2026, 2027, 2028, 2029, 2030].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </Select>
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="password" required>Password</Label>
            <TextInput
              id="password"
              type="password"
              required
              autoComplete={tab === "create" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {tab === "create" && (
              <p className="mt-1.5 text-[12.5px] text-muted">At least 6 characters.</p>
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
              <button
                type="button"
                onClick={() => setErrorMsg("Password resets are sent to your registered email.")}
                className="text-[13px] text-accent hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <Button
            type="submit"
            full
            size="lg"
            icon="arrow-right"
            disabled={loading || (tab === "create" && !agreed)}
          >
            {loading ? "Processing..." : tab === "create" ? "Create account" : "Sign in"}
          </Button>

          <div className="border-t border-rule pt-4 text-center">
            <p className="text-[13px] text-muted mb-3">Testing or exploring without an account?</p>
            <Button
              type="button"
              variant="secondary"
              full
              size="md"
              icon="arrow-right"
              onClick={handleDemoAccess}
            >
              Continue to Student Dashboard
            </Button>
          </div>
        </form>
      </Card>

      <p className="text-[12.5px] text-faint lg:col-span-2">
        {ORG.name} · Students under 13 need a parent or guardian to create the account.
      </p>
    </div>
  );
}
