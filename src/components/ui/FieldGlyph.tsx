import type { FieldSlug } from "@/data/fields";

/**
 * One hand-drawn glyph per academic field, on a shared 24-unit grid with a
 * 1.4 stroke so the whole catalog reads as a single line language.
 */
const GLYPHS: Record<FieldSlug, React.ReactNode> = {
  biology: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="10.4" cy="10.6" r="2.6" />
      <path d="M13.6 14.4c1.6.4 2.7 1.4 3.3 2.8M8 15.6c.6.9 1.4 1.5 2.4 1.8" />
    </>
  ),
  "medicine-health": (
    <>
      <path d="M3.5 12.5h3.2l1.8-4.6 2.9 9 2.2-5.6 1.4 2.9h5.5" />
      <path d="M4.6 8.2A4 4 0 0 1 12 6.4a4 4 0 0 1 7.4 1.8" />
    </>
  ),
  psychology: (
    <>
      <path d="M15.5 20.5v-2.8c2.6-1 4.3-3.4 4.3-6.2 0-4-3.4-7-7.6-7S4.6 7.5 4.6 11.5c0 1.9.8 3.5 2.1 4.7v4.3" />
      <path d="M12.2 8.6c-1.7 0-2.8 1.1-2.8 2.5s1.1 2.4 2.6 2.4c1.4 0 2.4.8 2.4 2" />
    </>
  ),
  neuroscience: (
    <>
      <circle cx="11.5" cy="11.5" r="3" />
      <path d="M11.5 8.5V4M14.5 11.5H20M9.2 13.7 5 18M13.6 13.9l3.4 4.6M9.2 9.3 5.4 7" />
      <circle cx="20" cy="11.5" r="1.1" /><circle cx="5" cy="18" r="1.1" /><circle cx="11.5" cy="4" r="1.1" />
    </>
  ),
  "computer-science": (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="1.5" />
      <rect x="10" y="10" width="4" height="4" rx="0.6" />
      <path d="M9.5 6.5V3.5M14.5 6.5V3.5M9.5 20.5v-3M14.5 20.5v-3M6.5 9.5h-3M6.5 14.5h-3M20.5 9.5h-3M20.5 14.5h-3" />
    </>
  ),
  "artificial-intelligence": (
    <>
      <circle cx="5.5" cy="7" r="2" /><circle cx="5.5" cy="17" r="2" />
      <circle cx="13" cy="12" r="2.2" /><circle cx="19.5" cy="8" r="1.8" /><circle cx="19.5" cy="16.5" r="1.8" />
      <path d="M7.4 7.8 11 10.9M7.3 16.2 11 13.2M15 10.9l3-1.8M15.1 13.2l2.9 2.1" />
    </>
  ),
  "environmental-science": (
    <>
      <path d="M12 15.5c0-5 2.8-8.4 8-9-.4 5.6-3.4 8.6-8 9ZM12 15.5c0-3.8-2-6.4-6-7 .3 4.2 2.6 6.5 6 7ZM12 15.5v5" />
      <path d="M3.5 20.5h17" />
    </>
  ),
  chemistry: (
    <>
      <path d="M10 3.5h4M10.8 3.5v6L5.2 18.2c-.7 1.2.1 2.3 1.4 2.3h10.8c1.3 0 2.1-1.1 1.4-2.3L13.2 9.5v-6" />
      <path d="M7.6 14.5h8.8" />
      <circle cx="11" cy="17" r="0.9" /><circle cx="14" cy="18.4" r="0.7" />
    </>
  ),
  physics: (
    <>
      <circle cx="12" cy="12" r="2.2" />
      <ellipse cx="12" cy="12" rx="9" ry="4" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-60 12 12)" />
    </>
  ),
  engineering: (
    <>
      <path d="M4 19.5 12 4l8 15.5H4Z" />
      <path d="M12 4v9.5M8.1 12h7.8M6.5 15.8h11" />
    </>
  ),
  economics: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="M7 15.5 11 11l3 2.6 5.5-7" />
      <path d="M19.5 6.6h-3.2M19.5 6.6v3.2" />
    </>
  ),
  business: (
    <>
      <path d="M3.5 20.5h17M5.5 20.5V9l6.5-4.5L18.5 9v11.5" />
      <path d="M9.5 20.5v-5h5v5M9.2 11.5h1.6M13.2 11.5h1.6" />
    </>
  ),
  finance: (
    <>
      <ellipse cx="12" cy="6.5" rx="7" ry="2.8" />
      <path d="M5 6.5v5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-5" />
      <path d="M5 11.5v5c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8v-5" />
    </>
  ),
  sociology: (
    <>
      <circle cx="12" cy="5.8" r="2.3" /><circle cx="5.5" cy="16.5" r="2.3" /><circle cx="18.5" cy="16.5" r="2.3" />
      <path d="M10.6 7.8 7 14.5M13.4 7.8 17 14.5M7.8 16.5h8.4" />
    </>
  ),
  "political-science": (
    <>
      <path d="M3.5 9 12 4l8.5 5M3.5 20.5h17M5.5 20.5V9.5M18.5 20.5V9.5M10 20.5V9.5M14 20.5V9.5" />
      <path d="M3.5 9h17" />
    </>
  ),
  history: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 6.8V12l3.6 2.2M12 4v1.4M20 12h-1.4M12 20v-1.4M4 12h1.4" />
    </>
  ),
  literature: (
    <>
      <path d="M12 7.2C10.3 5.6 7.9 5 4.5 5v13c3.4 0 5.8.6 7.5 2.2 1.7-1.6 4.1-2.2 7.5-2.2V5c-3.4 0-5.8.6-7.5 2.2Z" />
      <path d="M12 7.2v13" />
    </>
  ),
  education: (
    <>
      <path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z" />
      <path d="M6.5 10.8v5c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-5M21.5 8.5v6" />
    </>
  ),
  "public-health": (
    <>
      <path d="M12 3.5 19.5 6v6c0 4.2-3 7.2-7.5 8.5C7.5 19.2 4.5 16.2 4.5 12V6L12 3.5Z" />
      <path d="M12 8.6v6M9 11.6h6" />
    </>
  ),
  other: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4l5.7 8.3M17.7 12.7l-8.8 6.9M8.3 19.4 5.7 9.1M5.7 9.1l11.4 3.4" />
    </>
  ),
};

export function FieldGlyph({ field, size = 24 }: { field: FieldSlug; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {GLYPHS[field] ?? GLYPHS.other}
    </svg>
  );
}
