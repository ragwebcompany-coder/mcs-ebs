import type { Locale } from "@/lib/i18n";

/*
  The signature.

  A portolan chart plots a course by radiating rhumb lines from a fixed point.
  Here the fixed point is the programme; the four waypoints along the course
  line are its four semesters. The concentric rings are isobaths — which happen
  to be the same shape an economist draws for an indifference curve. Every mark
  on this chart encodes something: nothing is here for texture alone.
*/

/*
  The chart lives in the right half of the hero, clear of the headline column.
  Everything is plotted east of x≈420 so no mark ever competes with the type.
*/
const ORIGIN = { x: 430, y: 470 };
const RHUMB_COUNT = 16;
const RADIUS = 820;

/*
  Waypoints: the four semesters, plotted west to east.
  `slice` crops roughly 75px from each side of the viewBox at hero proportions,
  so every mark and its label stays inside x ∈ [430, 1090].
*/
const waypoints = [
  { x: 430, y: 476, sem: "Α", label: { el: "Θεμέλιο", en: "Foundation" } },
  { x: 636, y: 356, sem: "Β", label: { el: "Στρατηγική", en: "Strategy" } },
  { x: 820, y: 404, sem: "Γ", label: { el: "Εξειδίκευση", en: "Specialism" } },
  { x: 992, y: 254, sem: "Δ", label: { el: "Έρευνα", en: "Research" } },
];

/** Depth soundings — the programme's real figures, scattered as chart marks. */
const soundings = [
  { x: 500, y: 624, v: "2006" },
  { x: 726, y: 600, v: "12" },
  { x: 606, y: 186, v: "120" },
  { x: 940, y: 572, v: "40+" },
  { x: 1046, y: 470, v: "4" },
  { x: 840, y: 146, v: "6500" },
];

function rhumbLines() {
  return Array.from({ length: RHUMB_COUNT }, (_, index) => {
    const angle = (index / RHUMB_COUNT) * Math.PI * 2;
    return {
      key: index,
      x2: ORIGIN.x + Math.cos(angle) * RADIUS,
      y2: ORIGIN.y + Math.sin(angle) * RADIUS,
      delay: 300 + index * 45,
    };
  });
}

export function Portolan({ locale }: { locale: Locale }) {
  return (
    <svg
      viewBox="0 0 1280 720"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="portolan-depth" cx="34%" cy="65%" r="78%">
          <stop offset="0%" stopColor="#0e3358" stopOpacity="0.8" />
          <stop offset="55%" stopColor="#08203a" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#05121f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="portolan-course" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#c4972f" />
          <stop offset="70%" stopColor="#e3be72" />
          <stop offset="100%" stopColor="#f0dcaa" />
        </linearGradient>
      </defs>

      {/* Depth wash beneath the linework */}
      <rect width="1280" height="720" fill="url(#portolan-depth)" />

      {/* Rhumb lines — the navigator's bearing network */}
      <g stroke="#1b5c93" strokeWidth="1" opacity="0.42">
        {rhumbLines().map((line) => (
          <line
            key={line.key}
            x1={ORIGIN.x}
            y1={ORIGIN.y}
            x2={line.x2}
            y2={line.y2}
            className="draw-line"
            style={{ "--dash": RADIUS, "--delay": `${line.delay}ms` } as React.CSSProperties}
          />
        ))}
      </g>

      {/* Isobaths — depth contours around the origin */}
      <g fill="none" stroke="#1b5c93" strokeWidth="1" opacity="0.34">
        {[128, 236, 348, 470, 604].map((r, index) => (
          <circle
            key={r}
            cx={ORIGIN.x}
            cy={ORIGIN.y}
            r={r}
            className="draw-line"
            style={
              {
                "--dash": 2 * Math.PI * r,
                "--delay": `${180 + index * 130}ms`,
              } as React.CSSProperties
            }
          />
        ))}
      </g>

      {/* The course line: four semesters, plotted */}
      <path
        d="M 430 476 C 508 410, 558 354, 636 356 S 748 428, 820 404 S 934 308, 992 254"
        fill="none"
        stroke="url(#portolan-course)"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="draw-line"
        style={{ "--dash": 1000, "--delay": "700ms" } as React.CSSProperties}
      />

      {/* Waypoints */}
      {waypoints.map((point, index) => (
        <g
          key={point.sem}
          className="fix-position"
          style={
            {
              "--delay": `${1300 + index * 220}ms`,
              transformOrigin: `${point.x}px ${point.y}px`,
            } as React.CSSProperties
          }
        >
          <circle cx={point.x} cy={point.y} r="15" fill="#05121f" opacity="0.85" />
          <circle
            cx={point.x}
            cy={point.y}
            r="7.5"
            fill="none"
            stroke="#e3be72"
            strokeWidth="2"
          />
          <circle cx={point.x} cy={point.y} r="2.5" fill="#e3be72" />
          <text
            x={point.x + 20}
            y={point.y - 12}
            fill="#e3be72"
            fontFamily="var(--font-mono)"
            fontSize="14"
            fontWeight="600"
            letterSpacing="0.08em"
          >
            {point.sem}
          </text>
          <text
            x={point.x + 20}
            y={point.y + 6}
            fill="#9db3c4"
            fontFamily="var(--font-mono)"
            fontSize="10.5"
            letterSpacing="0.14em"
            style={{ textTransform: "uppercase" }}
          >
            {point.label[locale]}
          </text>
        </g>
      ))}

      {/* Soundings — plotted depth figures */}
      <g
        fill="#4d8ab8"
        fontFamily="var(--font-mono)"
        fontSize="12"
        opacity="0.55"
        className="plot-in"
        style={{ "--delay": "2100ms" } as React.CSSProperties}
      >
        {soundings.map((s) => (
          <text key={s.v} x={s.x} y={s.y}>
            {s.v}
          </text>
        ))}
      </g>

      {/* Compass mark at the origin — the only place the signal red appears */}
      <g
        className="fix-position"
        style={
          {
            "--delay": "1100ms",
            transformOrigin: `${ORIGIN.x}px ${ORIGIN.y}px`,
          } as React.CSSProperties
        }
      >
        <path
          d={`M ${ORIGIN.x} ${ORIGIN.y - 38} L ${ORIGIN.x + 6} ${ORIGIN.y} L ${ORIGIN.x} ${ORIGIN.y + 38} L ${ORIGIN.x - 6} ${ORIGIN.y} Z`}
          fill="#d22b45"
          opacity="0.9"
        />
      </g>
    </svg>
  );
}
