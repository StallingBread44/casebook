import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

/* Home and the 404 ship in the entry chunk; every other route loads on demand. */
const ResearchLibrary = lazy(() => import("@/pages/ResearchLibrary"));
const ResearchDetail = lazy(() => import("@/pages/ResearchDetail"));
const Opportunities = lazy(() => import("@/pages/Opportunities"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const Submit = lazy(() => import("@/pages/Submit"));
const HowItWorks = lazy(() => import("@/pages/HowItWorks"));
const News = lazy(() => import("@/pages/News"));
const About = lazy(() => import("@/pages/About"));
const Integrity = lazy(() => import("@/pages/Integrity"));
const ProtectYourWork = lazy(() => import("@/pages/ProtectYourWork"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Profile = lazy(() => import("@/pages/Profile"));
const Review = lazy(() => import("@/pages/Review"));
const SignIn = lazy(() => import("@/pages/SignIn"));
const Contact = lazy(() => import("@/pages/Contact"));
const Legal = lazy(() => import("@/pages/Legal"));
const Sponsors = lazy(() => import("@/pages/Sponsors"));

function RouteFallback() {
  return (
    <div className="u-shell flex min-h-[60vh] items-center py-24" role="status" aria-live="polite">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">Loading…</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        element={
          <Suspense fallback={<RouteFallback />}>
            <Layout />
          </Suspense>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/research" element={<ResearchLibrary />} />
        <Route path="/research/:slug" element={<ResearchDetail />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/opportunities/:slug" element={<ProjectDetail />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/integrity" element={<Integrity />} />
        <Route path="/protect-your-work" element={<ProtectYourWork />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students/:handle" element={<Profile />} />
        <Route path="/review" element={<Review />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Legal kind="privacy" />} />
        <Route path="/terms" element={<Legal kind="terms" />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
