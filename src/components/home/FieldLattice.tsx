import { useId } from "react";
import { FIELDS } from "@/data/fields";

/**
 * The signature: an aperture opening onto the catalog.
 * Six blades frame a lattice of academic fields — node size follows the number
 * of studies filed under each field, edges mark shared-method neighbours.
 */

const C = 210;
const IRIS = 122;

const rad = (deg: number) => (deg * Math.PI) / 180;
const px = (angle: number, r: number) => ({
  x: C + Math.cos(rad(angle)) * r,
  y: C + Math.sin(rad(angle)) * r,
});

/** Six-blade iris: hexagon vertices plus a tangential blade edge from each. */
const BLADES = Array.from({ length: 6 }, (_, i) => {
  const a = i * 60 - 90;
  const p1 = px(a, IRIS);
  const p2 = px(a + 60, IRIS);
  const outer = px(a + 60, IRIS + 74);
  return { d: `M${p1.x.toFixed(1)} ${p1.y.toFixed(1)} L${p2.x.toFixed(1)} ${p2.y.toFixed(1)} L${outer.x.toFixed(1)} ${outer.y.toFixed(1)}` };
});

/** Hand-placed so the composition reads well; codes come from the real catalog. */
const NODES: { code: string; angle: number; r: number; size: number; label?: string }[] = [
  { code: "PSY", angle: -104, r: 58, size: 9, label: "Psychology" },
  { code: "AIN", angle: -22, r: 78, size: 8, label: "Artificial Intelligence" },
  { code: "PBH", angle: 66, r: 70, size: 7.5, label: "Public Health" },
  { code: "BIO", angle: 152, r: 66, size: 7 },
  { code: "ENV", angle: 196, r: 90, size: 6.5, label: "Environmental Science" },
  { code: "CSC", angle: -62, r: 100, size: 6 },
  { code: "NEU", angle: -142, r: 96, size: 5.5 },
  { code: "MED", angle: 26, r: 104, size: 5.5 },
  { code: "ECO", angle: 108, r: 100, size: 5 },
  { code: "PHY", angle: 168, r: 34, size: 4.5 },
  { code: "EDU", angle: 6, r: 44, size: 4.5 },
  { code: "SOC", angle: 92, r: 36, size: 4 },
  { code: "HIS", angle: -172, r: 108, size: 4 },
  { code: "FIN", angle: 44, r: 62, size: 4 },
  { code: "ENG", angle: -84, r: 108, size: 4 },
];

const EDGES: [number, number][] = [
  [0, 2], [0, 11], [0, 6], [1, 5], [1, 7], [1, 10], [2, 3], [2, 8], [3, 4],
  [3, 9], [4, 12], [5, 14], [6, 9], [7, 13], [8, 11], [10, 13], [0, 1], [2, 4],
];

const points = NODES.map((n) => ({ ...n, ...px(n.angle, n.r) }));
const studiesByCode = Object.fromEntries(FIELDS.map((f) => [f.code, f.studies]));

export function FieldLattice() {
  const gid = useId().replace(/:/g, "");

  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <svg
        viewBox="-160 -10 760 440"
        className="w-full"
        role="img"
        aria-label="Abstract aperture diagram: academic fields plotted as connected nodes, sized by the number of studies filed under each."
      >
        <defs>
          <radialGradient id={`glow-${gid}`} cx="50%" cy="46%" r="52%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="72%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <clipPath id={`iris-${gid}`}>
            <circle cx={C} cy={C} r={IRIS} />
          </clipPath>
        </defs>

        {/* Lens barrel: two hairline rings and a graduated tick scale */}
        <circle cx={C} cy={C} r={196} fill="none" stroke="var(--color-rule)" strokeWidth="1" />
        <circle cx={C} cy={C} r={182} fill="none" stroke="var(--color-rule-soft)" strokeWidth="1" />
        <g stroke="var(--color-faint)" strokeWidth="1">
          {Array.from({ length: 72 }, (_, i) => {
            const a = i * 5 - 90;
            const major = i % 6 === 0;
            const p1 = px(a, 182);
            const p2 = px(a, major ? 170 : 176);
            return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} opacity={major ? 1 : 0.6} />;
          })}
        </g>

        <circle cx={C} cy={C} r={166} fill={`url(#glow-${gid})`} />

        {/* Sweep hand — one slow rotation, the only continuous motion here */}
        <g className="origin-center motion-safe:[animation:sweep_36s_linear_infinite]" style={{ transformOrigin: `${C}px ${C}px` }}>
          <line x1={C} y1={C} x2={C} y2={C - 174} stroke="var(--color-accent)" strokeWidth="1" opacity="0.22" />
          <circle cx={C} cy={C - 174} r="2.5" fill="var(--color-accent)" opacity="0.35" />
        </g>

        {/* Iris blades */}
        <g stroke="var(--color-accent)" strokeWidth="1.7" fill="none" strokeLinejoin="round" opacity="0.8">
          {BLADES.map((b, i) => (
            <path
              key={i}
              d={b.d}
              className="motion-safe:[stroke-dasharray:280] motion-safe:[stroke-dashoffset:280] motion-safe:[animation:dash_1.1s_cubic-bezier(0.22,1,0.36,1)_forwards]"
              style={{ animationDelay: `${140 + i * 70}ms` }}
            />
          ))}
        </g>

        <g clipPath={`url(#iris-${gid})`}>
          {/* Citation edges */}
          <g stroke="var(--color-accent)" strokeWidth="0.9" opacity="0.45">
            {EDGES.map(([a, b], i) => (
              <line
                key={i}
                x1={points[a].x}
                y1={points[a].y}
                x2={points[b].x}
                y2={points[b].y}
                className="motion-safe:[stroke-dasharray:200] motion-safe:[stroke-dashoffset:200] motion-safe:[animation:dash_1s_cubic-bezier(0.22,1,0.36,1)_forwards]"
                style={{ animationDelay: `${560 + i * 45}ms` }}
              />
            ))}
          </g>

          {/* Field nodes */}
          {points.map((p, i) => (
            <g
              key={p.code}
              className="motion-safe:[animation:fade_0.7s_ease-out_both,drift_var(--dur)_ease-in-out_infinite]"
              style={
                {
                  animationDelay: `${700 + i * 55}ms, ${i * 300}ms`,
                  "--dur": `${9 + (i % 5) * 1.7}s`,
                  "--dx": `${(i % 3) - 1.2}px`,
                  "--dy": `${((i + 1) % 3) - 1.4}px`,
                } as React.CSSProperties
              }
            >
              <circle cx={p.x} cy={p.y} r={p.size + 5} fill="var(--color-accent)" opacity="0.1" />
              <circle cx={p.x} cy={p.y} r={p.size} fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1.5" />
              <circle cx={p.x} cy={p.y} r={p.size * 0.36} fill="var(--color-accent)" opacity="0.85" />
            </g>
          ))}
        </g>

        {/* Labels are pulled out to a common gutter on hairline elbow leaders */}
        {points
          .filter((p) => p.label)
          .map((p, i) => {
            const out = px(p.angle, 176);
            const left = out.x < C;
            const gutter = left ? 4 : 416;
            return (
              <g
                key={p.code}
                className="lattice-labels motion-safe:[animation:fade_0.8s_ease-out_both]"
                style={{ animationDelay: `${1200 + i * 130}ms` }}
              >
                <polyline
                  points={`${p.x},${p.y} ${out.x},${out.y} ${gutter},${out.y}`}
                  fill="none"
                  stroke="var(--color-rule)"
                  strokeWidth="1"
                />
                <circle cx={out.x} cy={out.y} r="1.8" fill="var(--color-faint)" />
                <text
                  x={left ? gutter - 8 : gutter + 8}
                  y={out.y - 3}
                  textAnchor={left ? "end" : "start"}
                  className="fill-ink font-mono"
                  style={{ fontSize: "9.5px", letterSpacing: "0.05em", textTransform: "uppercase" }}
                >
                  {p.label}
                </text>
                <text
                  x={left ? gutter - 8 : gutter + 8}
                  y={out.y + 10}
                  textAnchor={left ? "end" : "start"}
                  className="fill-faint font-mono"
                  style={{ fontSize: "9.5px", letterSpacing: "0.06em" }}
                >
                  {studiesByCode[p.code]} studies
                </text>
              </g>
            );
          })}
      </svg>
    </div>
  );
}
