# CaseBook

A production-style frontend for a youth research organization — a student research
publication where high school researchers read published studies, join structured research
projects, submit their own work for review, and earn verified service hours for approved work.

React 19 · TypeScript · Tailwind CSS v4 · React Router 7 · Vite

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build
npm run lint
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home — hero, field catalog, featured studies, volunteer-hours band, six-step process, testimonials |
| `/research` | Research library — search, eight filter groups, four sort orders |
| `/research/:slug` | Academic paper layout with abstract, sections, figure, references, citation tool, sidebar |
| `/opportunities` | Research opportunities directory with difficulty/status filters and four sorts |
| `/news` | Field Notes — the monthly briefing, filterable by major and item type |
| `/opportunities/:slug` | Project detail — requirements, resources, hour breakdown, application panel |
| `/submit` | Submission form, checklist, declaration, and status pipeline |
| `/how-it-works` | Full six-step walkthrough with you-do / we-do split and FAQ |
| `/about` | Mission, what we do, why student research matters, hour policy, integrity, review process |
| `/integrity` | Research integrity standards, human-subject rules, AI policy |
| `/protect-your-work` | Keeping your own work from being plagiarized — evidence chain, habits, licensing, response steps |
| `/dashboard` | Student dashboard — hours ledger, active projects, service record (`?record=1` opens it) |
| `/students/:handle` | Public academic profile / portfolio |
| `/review` | Reviewer interface concept — eight criteria, hour determination, decision |
| `/signin` | Sign in / create account |
| `/contact`, `/privacy`, `/terms` | Contact routes and policy documents |

## Sample content

Everything readable on the site is placeholder material written for this build and marked as
such — a banner sits above the header, and `SampleTag` chips label statistics, testimonials,
studies, listings, and the demo account. All of it lives in `src/data/`:

- `papers.ts` — 10 studies with full sections, figures, and references
- `projects.ts` — 8 research opportunities with requirements and hour breakdowns
- `students.ts` — 6 student profiles
- `news.ts` — 22 Field Notes items covering all 20 majors
- `dashboard.ts` — demo hour ledger, active projects, submission checklist, reviewer queue
- `site.ts` — organization details, statistics, testimonials, review criteria, integrity principles
- `fields.ts`, `taxonomy.ts`, `process.ts` — the 20 fields, research types, and the six-step process

Replacing a data file replaces the corresponding content site-wide; no copy is hard-coded into
components except section headings and explanatory prose.

## Navigation

Six entries: Research · News · Submit Research · How It Works · Protect Your Work · About.

**Research is one entry covering two routes.** `/research` (published studies) and `/opportunities`
(open projects) are one section — `DirectoryTabs` sits at the top of both so either half is one
click from the other, and the nav item stays current on both. That pairing is declared by `covers`
on the nav entry in `Header.tsx`; add a path there to fold another route under an existing item.

Six full-length labels need 1280px, so the desktop bar appears at `xl`; below that the hamburger
menu carries the same six entries plus both CTAs.

## Volunteer-hour language

Hours are described consistently as reviewer-awarded, never automatic, and never guaranteed to be
accepted by a student's school. That language appears on the home band, opportunities index,
project detail, dashboard, service record, about page, and footer. If you change it, change it in
all of those places.

## Design system

Tokens are declared once in `src/styles.css` under `@theme`:

- **Paper** `#F8F7F3`, **surface** `#FFFFFF`, **ink** `#101826`, hairline **rule** `#E5E2DA`
- **Accent** pine-teal `#0E6E63` / `#16A394`
- **Seal** `#A8801F` — reserved exclusively for verified hours and service records
- **Newsreader** (display) · **IBM Plex Sans** (body) · **IBM Plex Mono** (record IDs, meta, data)

Shared primitives live in `src/components/ui/` (Button, Card, Notice, Tag, form controls,
Pipeline, BarFigure, a hand-drawn `Icon` set, and one `FieldGlyph` per academic field). The hero
diagram is `src/components/home/FieldLattice.tsx`.

## Accessibility and behavior notes

- Semantic landmarks, skip link, visible focus rings, labeled form controls, `aria-pressed` on
  toggle chips, and a dialog role on the service record (Escape closes it)
- All motion is behind `motion-safe` / `prefers-reduced-motion`
- Scroll reveals use one IntersectionObserver per section via `useReveal`
- "Download PDF" opens the browser print dialog; print styles strip navigation, sidebars, and
  related content so the paper or the service record prints on its own
- Responsive from 320px up; the library and opportunities filters collapse into a bottom sheet

## Performance

Home and the 404 ship in the entry chunk (~92 kB gzip); every other route is lazy-loaded behind a
`Suspense` boundary inside the layout, so navigation keeps the header and footer mounted.

## Not built (frontend-only build)

No backend: sign-in, submission, contact, and application forms validate and update local state
but do not persist. Saved studies and review decisions are in-memory.
