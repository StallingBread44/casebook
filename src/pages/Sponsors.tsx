import { useState, useEffect, useCallback, useMemo } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, SectionHeading, Tag, Meta, Notice } from "@/components/ui/Surface";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useReveal, cn } from "@/lib/utils";
import { sponsorsService } from "@/lib/supabase";

/* ─────────────────────────────────────────────────────────────
   Types & Data
   ───────────────────────────────────────────────────────────── */
export interface Sponsor {
  id: string;
  name: string;
  org: string;
  tagline: string;
  category: "Healthcare" | "Technology" | "Real Estate" | "Education";
  heroImage: string;
  logo: string | null;
  url: string;
  description: string;
  highlights: string[];
  location: string;
  founded?: string;
  supportArea: string;
}

export const SPONSORS: Sponsor[] = [
  {
    id: "american-kidney-institute",
    name: "American Kidney Institute",
    org: "American Kidney Institute",
    tagline: "Premier Nephrology & Dialysis Clinical Care · America",
    category: "Healthcare",
    heroImage: "/americankidneyinstitute.png",
    logo: "/sponsor-aki-logo.jpg",
    url: "https://americankidneyinstitute.com/",
    description:
      "American Kidney Institute is a premier clinical nephrology and urology hospital committed to delivering world-class kidney care. Their clinical mission bridges American medical standards with compassionate, accessible treatment for patients.",
    highlights: [
      "Specialized nephrology & urology clinical care",
      "State-of-the-art dialysis center & patient monitoring",
      "Kidney transplant services & post-operative care",
      "24/7 emergency nephrology & critical care unit",
    ],
    location: "America",
    founded: "2024",
    supportArea: "Clinical Health & Medical Research Fellowship",
  },
  {
    id: "efftronics",
    name: "Efftronics Systems",
    org: "Efftronics Systems Pvt. Ltd.",
    tagline: "End-to-End Smart Solutions & IoT Infrastructure",
    category: "Technology",
    heroImage: "/effetronics.jpeg",
    logo: "/sponsor-efftronics-logo.svg",
    url: "https://www.efftronics.com",
    description:
      "Efftronics is a leading electronics manufacturer delivering innovative smart solutions for Smart Cities, Buildings, Railway Signaling, and IoT ecosystems. Their automation and digitization products power vibrant, connected communities across India.",
    highlights: [
      "Smart City infrastructure & IoT data platforms",
      "Railway signaling, train control & safety systems",
      "Building automation & intelligent energy monitoring",
      "Indigenous electronics manufacturing (Make in India)",
    ],
    location: "Vijayawada, India",
    founded: "1997",
    supportArea: "Computational Systems & Embedded Engineering Grant",
  },
  {
    id: "kosh-realty",
    name: "Kosh Realty",
    org: "Kosh Realty",
    tagline: "Real Estate Advisory, Valuation & Investment",
    category: "Real Estate",
    heroImage: "/sponsor-kosh.jpg",
    logo: "/sponsor-kosh-logo.png",
    url: "https://www.koshrealty.com/15/our_team/15",
    description:
      "Kosh Realty is a dedicated real estate advisory firm connecting buyers, sellers, and investors with residential and commercial properties. Their experienced team delivers personalized market analytics, valuation research, and trusted guidance through every transaction.",
    highlights: [
      "Residential & commercial sales and acquisitions",
      "Buyer, seller & institutional representation",
      "Investment property consulting & portfolio growth",
      "Regional market analysis, trends & property valuation",
    ],
    location: "Phoenix, USA",
    supportArea: "Economic Analysis & Urban Geography Project Support",
  },
  {
    id: "nitsdata",
    name: "NITSDATA",
    org: "NITSDATA",
    tagline: "Software Development & Talent Solutions",
    category: "Technology",
    heroImage: "/sponsor-nitsdata.jpg",
    logo: "/sponsor-nitsdata-logo.png",
    url: "https://nitsdata.com/",
    description:
      "NITSDATA is a Frisco, TX-based technology and talent solutions firm specializing in software development, product engineering, data analytics, cloud architecture, and executive recruiting. They help education and enterprise clients navigate complex digital transformation challenges.",
    highlights: [
      "Custom software engineering & full-stack development",
      "Data analytics pipelines & cloud infrastructure",
      "Technical talent acquisition & executive search",
      "Enterprise product testing, QA & DevOps solutions",
    ],
    location: "Frisco, TX · Hyderabad, India",
    founded: "2020",
    supportArea: "Data Science & Technical Review Mentorship",
  },
  {
    id: "jei-learning",
    name: "JEI Learning Center",
    org: "JEI Learning Center — Frisco",
    tagline: "Individualized Math & English Tutoring",
    category: "Education",
    heroImage: "/sponsor-jei.jpg",
    logo: "/sponsor-jei-logo.png",
    url: "https://jeilearning.com/frisco/",
    description:
      "JEI Learning Center Frisco provides individualized Math, English, and Reading programs for K-12 students using JEI's proven Self-Learning System. Free diagnostic assessments identify each student's exact learning baseline, and structured instruction builds lasting academic confidence.",
    highlights: [
      "Comprehensive diagnostic academic assessments",
      "Individualized, self-paced learning pathways",
      "Foundational Math, English & Reading comprehension",
      "Small-group tutoring, after-school & weekend sessions",
    ],
    location: "Frisco, TX",
    founded: "2018",
    supportArea: "K-12 Educational Access & Scholar Outreach",
  },
  {
    id: "absolute-milk",
    name: "Absolute Milk",
    org: "Absolute Milk (VK Dairy)",
    tagline: "Farm-Fresh Dairy & Sustainable Agriculture · Hyderabad, India",
    category: "Healthcare",
    heroImage: "/absolutemilk.png",
    logo: null,
    url: "https://absolutemilk.com/",
    description:
      "Absolute Milk is a farm-to-table dairy producer delivering pure, unadulterated milk and dairy products. Their farm-first infrastructure combines ethical animal care with modern cold-chain processing standards to provide clean, wholesome nutrition.",
    highlights: [
      "Farm-to-home fresh dairy production & supply chain",
      "Zero-adulteration quality testing & cold chain preservation",
      "Sustainable livestock welfare & nutritional science",
      "Community nutrition outreach & agricultural research support",
    ],
    location: "Hyderabad, India",
    founded: "2018",
    supportArea: "Nutritional Science & Agricultural Supply Chain Research",
  },
  {
    id: "pratap-hospital",
    name: "Pratap Hospital",
    org: "Pratap Super-Speciality Hospital",
    tagline: "Plastic, Cosmetic & Reconstructive Surgery · Vijayawada, India",
    category: "Healthcare",
    heroImage: "/pratap.png",
    logo: null,
    url: "https://prataphospital.com/#facilities",
    description:
      "Pratap Hospital is a premier super-speciality hospital in Vijayawada, led by Dr. Pratap Duggirala (MS, MCh). Specializing in cosmetic, reconstructive, hand, burns, and microsurgery, the hospital delivers high-precision clinical care with advanced operating facilities.",
    highlights: [
      "Advanced reconstructive, cosmetic & microsurgical procedures",
      "Dedicated burn intensive care & trauma stabilization units",
      "State-of-the-art laminar airflow operating theaters",
      "Clinical fellowship & surgical outcome research mentorship",
    ],
    location: "Vijayawada, India",
    founded: "2009",
    supportArea: "Clinical Surgical Research & Reconstructive Medicine Fellowship",
  },
  {
    id: "anuradha-timber",
    name: "Anuradha Timbers",
    org: "Anuradha Timbers International",
    tagline: "Architectural Hardwoods & Sustainable Timber · Hyderabad, India",
    category: "Real Estate",
    heroImage: "/anuradhatimber.png",
    logo: null,
    url: "http://anuradhatimber.com/",
    description:
      "Anuradha Timbers International is a premier importer and processor of seasoned architectural hardwoods and exotic timbers. They supply sustainable wood solutions for bespoke architecture, structural design, and specialized heritage restoration.",
    highlights: [
      "Imported sustainable hardwoods (Teak, Rosewood, Oak, Merbau)",
      "Precision seasoning, kiln-drying & wood preservation technology",
      "Architectural woodwork & sustainable material engineering",
      "Environmental timber research & sustainable forestry advocacy",
    ],
    location: "Hyderabad, India",
    founded: "1989",
    supportArea: "Sustainable Materials, Forestry Science & Environmental Design Grant",
  },
];

const CATEGORIES = ["All", "Healthcare", "Technology", "Education", "Real Estate"] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

/* ─────────────────────────────────────────────────────────────
   Modal Component
   ───────────────────────────────────────────────────────────── */
function SponsorModal({
  sponsor,
  onClose,
}: {
  sponsor: Sponsor;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`sponsor-modal-title-${sponsor.id}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-card border border-rule bg-surface shadow-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with close button and logo */}
        <div className="relative h-44 sm:h-52 w-full shrink-0 overflow-hidden border-b border-rule bg-paper-deep">
          <img
            src={sponsor.heroImage}
            alt=""
            className={cn(
              "h-full w-full",
              sponsor.id === "anuradha-timber"
                ? "object-contain bg-paper-deep p-3 rounded-xl"
                : ["absolute-milk", "pratap-hospital"].includes(sponsor.id)
                ? "object-contain bg-paper-deep p-3"
                : "object-cover",
            )}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent pointer-events-none" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-[6px] border border-rule/80 bg-surface/90 text-ink transition-colors hover:bg-surface hover:text-accent focus-visible:outline-2"
            aria-label="Close sponsor details"
          >
            <Icon name="close" size={15} />
          </button>

          {/* Logo badge overlay */}
          {sponsor.logo && (
            <div className="absolute bottom-3 left-4 flex h-11 w-28 items-center justify-center rounded-[6px] border border-rule bg-surface/95 p-1.5 shadow-sm">
              <img
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          )}
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Header row */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Tag tone="accent">{sponsor.category}</Tag>
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                {sponsor.location}
              </span>
            </div>
            <h2
              id={`sponsor-modal-title-${sponsor.id}`}
              className="mt-2.5 font-display text-[26px] sm:text-[30px] font-medium leading-tight text-ink"
            >
              {sponsor.org}
            </h2>
            <p className="mt-1 font-mono text-[11.5px] uppercase tracking-[0.08em] text-accent">
              {sponsor.tagline}
            </p>
          </div>

          {/* Description */}
          <div className="text-[15px] leading-relaxed text-ink-soft">
            <p>{sponsor.description}</p>
          </div>

          {/* Key Offerings & Programs */}
          <div className="rounded-[10px] border border-rule bg-paper-deep/40 p-5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
              Focus Areas & Capabilities
            </p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {sponsor.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13.5px] text-ink-soft">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Partnership Support Note */}
          <Notice
            title="Partnership Commitment"
            tone="accent"
            icon="seal"
          >
            {sponsor.supportArea} — supporting student research packets, dataset curation, and domain mentorship for CaseBook scholars.
          </Notice>

          {/* Meta summary table */}
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-px overflow-hidden rounded-[8px] border border-rule bg-rule text-[12.5px]">
            <div className="bg-surface p-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">Headquarters</dt>
              <dd className="mt-1 font-medium text-ink">{sponsor.location}</dd>
            </div>
            {sponsor.founded && (
              <div className="bg-surface p-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">Established</dt>
                <dd className="mt-1 font-medium text-ink">{sponsor.founded}</dd>
              </div>
            )}
            <div className="bg-surface p-3 col-span-2 sm:col-span-1">
              <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">Discipline</dt>
              <dd className="mt-1 font-medium text-ink">{sponsor.category}</dd>
            </div>
          </dl>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule bg-paper px-6 py-4">
          <Button onClick={onClose} variant="secondary" size="sm">
            Close
          </Button>
          <Button
            href={sponsor.url}
            variant="primary"
            size="sm"
            icon="arrow-up-right"
            ariaLabel={`Visit official website of ${sponsor.name}`}
          >
            Visit official website
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Sponsor Card Component
   ───────────────────────────────────────────────────────────── */
function SponsorCard({
  sponsor,
  onClick,
}: {
  sponsor: Sponsor;
  onClick: () => void;
}) {
  return (
    <Card
      as="article"
      interactive
      className="group relative flex flex-col overflow-hidden p-0 text-left transition-all duration-300"
    >
      {/* Clickable Overlay for card */}
      <button
        type="button"
        id={`sponsor-card-${sponsor.id}`}
        onClick={onClick}
        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        aria-label={`View details for ${sponsor.name}`}
      />

      {/* Hero Image Section */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden border-b border-rule bg-paper-deep">
        <img
          src={sponsor.heroImage}
          alt=""
          className={cn(
            "h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]",
            sponsor.id === "anuradha-timber"
              ? "object-contain bg-paper-deep p-3 rounded-xl"
              : ["absolute-milk", "pratap-hospital"].includes(sponsor.id)
              ? "object-contain bg-paper-deep p-3"
              : "object-cover",
          )}
          aria-hidden="true"
          loading="lazy"
        />

        {/* Category Tag */}
        <div className="absolute right-3 top-3 z-2">
          <Tag tone="accent">{sponsor.category}</Tag>
        </div>

        {/* Logo Badge */}
        {sponsor.logo && (
          <div className="absolute bottom-3 left-4 z-2 flex h-10 w-24 items-center justify-center rounded-[6px] border border-rule bg-surface/95 px-2 py-1 shadow-sm backdrop-blur-xs">
            <img
              src={sponsor.logo}
              alt=""
              className="max-h-full max-w-full object-contain"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {/* Body Section */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <h3 className="font-display text-[20px] font-medium leading-[1.2] text-ink transition-colors duration-200 group-hover:text-accent">
            {sponsor.name}
          </h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
            {sponsor.tagline}
          </p>

          <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-muted">
            {sponsor.description}
          </p>

          {/* Key highlights preview */}
          <ul className="mt-4 space-y-1.5 border-t border-rule-soft pt-3.5">
            {sponsor.highlights.slice(0, 2).map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[12.5px] text-ink-soft"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-rule pt-4 text-[12.5px]">
          <Meta icon="calendar">{sponsor.location}</Meta>
          <span className="inline-flex items-center gap-1.5 font-medium text-accent transition-colors group-hover:text-accent-ink">
            Learn more
            <Icon
              name="arrow-right"
              size={13}
              className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Sponsors Page Component
   ───────────────────────────────────────────────────────────── */
export default function Sponsors() {
  const [sponsorsList, setSponsorsList] = useState<Sponsor[]>(SPONSORS);
  const [selected, setSelected] = useState<Sponsor | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const ref = useReveal<HTMLDivElement>();

  useEffect(() => {
    async function loadSponsors() {
      try {
        const { data, error } = await sponsorsService.getSponsors();
        if (!error && data && data.length > 0) {
          const localMap = new Map(SPONSORS.map((s) => [s.id, s]));
          const mapped: Sponsor[] = data.map((d) => {
            const local = localMap.get(d.id);
            return {
              id: d.id,
              name: d.name,
              org: d.org,
              tagline: d.tagline,
              category: (d.category || local?.category || "Healthcare") as Sponsor["category"],
              heroImage:
                d.id === "american-kidney-institute" || d.hero_image === "/sponsor-aki.jpg"
                  ? "/americankidneyinstitute.png"
                  : d.id === "absolute-milk"
                  ? "/absolutemilk.png"
                  : d.id === "pratap-hospital"
                  ? "/pratap.png"
                  : d.hero_image || local?.heroImage || "",
              logo: d.logo ?? local?.logo ?? null,
              url: d.url,
              description: d.description,
              highlights: d.highlights || local?.highlights || [],
              location:
                d.id === "american-kidney-institute"
                  ? "America"
                  : d.id === "kosh-realty"
                  ? "Phoenix, USA"
                  : d.location || local?.location || "",
              founded: d.founded || local?.founded || undefined,
              supportArea: d.support_area || local?.supportArea || "",
            };
          });

          // Merge any sponsors from SPONSORS that aren't yet in the remote database
          const existingIds = new Set(mapped.map((m) => m.id));
          const additions = SPONSORS.filter((s) => !existingIds.has(s.id));
          setSponsorsList([...mapped, ...additions]);
        }
      } catch (err) {
        console.error("Error loading sponsors from Supabase:", err);
      }
    }
    loadSponsors();
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  const filteredSponsors = useMemo(() => {
    if (activeCategory === "All") return sponsorsList;
    return sponsorsList.filter((s) => s.category === activeCategory);
  }, [activeCategory, sponsorsList]);

  return (
    <>
      <PageHeader
        eyebrow="Institutional & community support"
        title="Our sponsors & research partners"
        lead="CaseBook is supported by organizations that provide project grants, data access, and domain mentorship. Their partnership ensures student research packets, review feedback, and publications remain 100% tuition-free."
      >
        <dl className="flex flex-wrap gap-x-10 gap-y-4">
          <div>
            <dd className="u-num font-display text-[30px] leading-none text-ink">5</dd>
            <dt className="mt-1.5 text-[12.5px] text-muted">Partner organizations</dt>
          </div>
          <div>
            <dd className="u-num font-display text-[30px] leading-none text-ink">4</dd>
            <dt className="mt-1.5 text-[12.5px] text-muted">Sectors represented</dt>
          </div>
          <div>
            <dd className="u-num font-display text-[30px] leading-none text-accent">100%</dd>
            <dt className="mt-1.5 text-[12.5px] text-muted">Free for student researchers</dt>
          </div>
        </dl>
      </PageHeader>

      <div ref={ref} className="u-shell py-14 lg:py-20">
        {/* Category Filter & Section Intro */}
        <section id="sponsors-directory" className="scroll-mt-28">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Directory of Partners"
              title="Supporting organizations"
              lead="Explore the companies, clinics, and learning centers investing in high school scholarship."
            />

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "rounded-[6px] border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-all duration-200",
                      isSelected
                        ? "border-accent bg-accent text-white shadow-sm"
                        : "border-rule bg-surface text-muted hover:border-ink/20 hover:text-ink",
                    )}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sponsors Card Grid */}
          <div
            id="sponsors-grid"
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredSponsors.map((sponsor) => (
              <SponsorCard
                key={sponsor.id}
                sponsor={sponsor}
                onClick={() => setSelected(sponsor)}
              />
            ))}
          </div>
        </section>

        {/* Partnership & Sponsorship Section */}
        <section id="become-sponsor" className="mt-20 scroll-mt-28 border-t border-rule pt-14">
          <SectionHeading
            eyebrow="Partnership & Sponsorship"
            title="Invest in the next generation of researchers"
            lead="We partner with healthcare systems, technology leaders, academic institutions, and regional businesses to fund student research guides, reviewer stipends, and open publication."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "spark" as const,
                title: "Research Project Grants",
                body: "Underwrite domain packets, real-world data sources, compute resources, and verified laboratory curricula for student scholars.",
              },
              {
                icon: "eye" as const,
                title: "Reviewer & Mentorship Fellowship",
                body: "Support domain specialists and graduate researchers who read every student draft and write thorough, instructive feedback.",
              },
              {
                icon: "shield" as const,
                title: "Open-Access Publishing",
                body: "Help keep our peer-reviewed research library, methodology archives, and verified service record system completely open and free.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="reveal rounded-card border border-rule bg-surface p-6 sm:p-7 shadow-card"
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-rule bg-paper-deep/60 text-accent">
                  <Icon name={item.icon} size={20} />
                </div>
                <h3 className="mt-4 font-sans text-[16px] font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* Action Box */}
          <div className="mt-10 rounded-card border border-rule bg-paper-deep/60 p-8 sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h3 className="font-display text-[22px] font-medium text-ink">
                  Interested in sponsoring a research track or student cohort?
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                  We work closely with sponsoring organizations to develop tailored research challenges, sponsor awards, and connect with motivated young scholars.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button to="/contact" variant="primary" size="md" icon="arrow-right">
                  Get in touch
                </Button>
                <Button to="/about" variant="secondary" size="md">
                  About our mission
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal */}
      {selected && (
        <SponsorModal sponsor={selected} onClose={handleClose} />
      )}
    </>
  );
}
