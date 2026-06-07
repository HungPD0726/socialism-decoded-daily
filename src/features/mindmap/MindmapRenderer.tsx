import { useRef, useState } from "react";
import type { DailyQuote } from "@/features/learning/data/dailyQuotes";

type Node = {
  label: string;
  fullText?: string;
  children: Node[];
};

/** Extract a short label from a quote string (first ~5 words) */
function shortLabel(text: string, maxWords = 6): string {
  const words = text.trim().split(/\s+/);
  const label = words.slice(0, maxWords).join(" ");
  return words.length > maxWords ? label + "…" : label;
}

/** Build the tree from quotes grouped by context */
function buildTree(quotes: DailyQuote[], chapterTitle: string): Node {
  const contextMap = new Map<string, DailyQuote[]>();
  for (const q of quotes) {
    const list = contextMap.get(q.context) ?? [];
    list.push(q);
    contextMap.set(q.context, list);
  }

  return {
    label: chapterTitle,
    children: Array.from(contextMap.entries()).map(([ctx, items]) => ({
      label: ctx.replace(/^Chương \d+ - /, ""),
      children: items.map((q) => ({
        label: shortLabel(q.quote),
        fullText: q.quote,
        children: [],
      })),
    })),
  };
}

// ── Layout constants ──────────────────────────────────────────
const CX = 550; // SVG centre x
const CY = 420; // SVG centre y
const R1 = 175; // radius for level-1 nodes (context)
const R2 = 330; // radius for level-2 nodes (keywords)
const SVG_W = 1100;
const SVG_H = 840;

// Hue palette for branches
const BRANCH_HUES = [0, 30, 60, 120, 180, 210, 270, 310];

type Layout1 = { label: string; x: number; y: number; angle: number; color: string; children: Layout2[] };
type Layout2 = { label: string; fullText?: string; x: number; y: number; angle: number; color: string };

function computeLayout(root: Node): { l1: Layout1[] } {
  const n1 = root.children.length;

  const l1: Layout1[] = root.children.map((branch, bi) => {
    const angle = (2 * Math.PI * bi) / n1 - Math.PI / 2;
    const hue = BRANCH_HUES[bi % BRANCH_HUES.length];
    const color = `hsl(${hue} 55% 42%)`;
    const x = CX + R1 * Math.cos(angle);
    const y = CY + R1 * Math.sin(angle);

    const n2 = branch.children.length;
    const spread = Math.PI / Math.max(n2, 1) / 1.4;

    const children: Layout2[] = branch.children.map((leaf, li) => {
      const leafAngle = angle + (li - (n2 - 1) / 2) * spread;
      return {
        label: leaf.label,
        fullText: leaf.fullText,
        x: CX + R2 * Math.cos(leafAngle),
        y: CY + R2 * Math.sin(leafAngle),
        angle: leafAngle,
        color: `hsl(${hue} 40% 35%)`,
      };
    });

    return { label: branch.label, x, y, angle, color, children };
  });

  return { l1 };
}

// ── Tooltip ───────────────────────────────────────────────────
type TooltipInfo = { x: number; y: number; text: string } | null;

// ── Component ─────────────────────────────────────────────────
type Props = {
  quotes: DailyQuote[];
  chapterTitle: string;
  chapterNumber: number;
};

export function MindmapRenderer({ quotes, chapterTitle, chapterNumber }: Props) {
  const root = buildTree(quotes, chapterTitle);
  const { l1 } = computeLayout(root);
  const [tooltip, setTooltip] = useState<TooltipInfo>(null);
  const [hoveredBranch, setHoveredBranch] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const showTooltip = (svgX: number, svgY: number, text: string) => {
    setTooltip({ x: svgX, y: svgY, text });
  };
  const hideTooltip = () => setTooltip(null);

  return (
    <div className="relative w-full overflow-auto rounded-sm border border-border bg-card">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label={`Sơ đồ tư duy chủ đề ${chapterNumber}: ${chapterTitle}`}
        role="img"
        className="w-full min-w-[640px]"
      >
        <defs>
          {l1.map((branch, bi) => (
            <radialGradient key={`grad-${bi}`} id={`grad-${bi}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={branch.color} stopOpacity="0.15" />
              <stop offset="100%" stopColor={branch.color} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {/* Background sectors (subtle) */}
        {l1.map((branch, bi) => {
          const isHovered = hoveredBranch === bi;
          return (
            <g key={`sector-${bi}`} opacity={isHovered ? 1 : 0.5}>
              <line
                x1={CX}
                y1={CY}
                x2={branch.x}
                y2={branch.y}
                stroke={branch.color}
                strokeWidth={isHovered ? 2.5 : 1.5}
                strokeLinecap="round"
                opacity={0.6}
              />
              {branch.children.map((leaf, li) => (
                <g key={`branch-${bi}-leaf-${li}`}>
                  <line
                    x1={branch.x}
                    y1={branch.y}
                    x2={leaf.x}
                    y2={leaf.y}
                    stroke={branch.color}
                    strokeWidth={isHovered ? 1.5 : 1}
                    strokeLinecap="round"
                    opacity={0.45}
                    strokeDasharray={isHovered ? "none" : "4 3"}
                  />
                </g>
              ))}
            </g>
          );
        })}

        {/* Centre node */}
        <g>
          <circle cx={CX} cy={CY} r={58} fill="var(--color-primary)" opacity={0.95} />
          <circle cx={CX} cy={CY} r={58} fill="none" stroke="white" strokeWidth={2} opacity={0.2} />
          <foreignObject x={CX - 50} y={CY - 32} width={100} height={64}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "12px",
                fontWeight: 600,
                color: "white",
                textAlign: "center",
                lineHeight: 1.3,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {chapterTitle}
            </div>
          </foreignObject>
        </g>

        {/* Level-1 nodes (context / branch) */}
        {l1.map((branch, bi) => {
          const isHovered = hoveredBranch === bi;
          const r = 44;
          return (
            <g
              key={`l1-${bi}`}
              onMouseEnter={() => setHoveredBranch(bi)}
              onMouseLeave={() => setHoveredBranch(null)}
              style={{ cursor: "default" }}
            >
              <circle
                cx={branch.x}
                cy={branch.y}
                r={r}
                fill={branch.color}
                opacity={isHovered ? 0.95 : 0.8}
              />
              <foreignObject x={branch.x - r + 6} y={branch.y - r + 8} width={(r - 6) * 2} height={(r - 8) * 2}>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "9.5px",
                    fontWeight: 600,
                    color: "white",
                    textAlign: "center",
                    lineHeight: 1.25,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {branch.label}
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* Level-2 nodes (keywords / leaves) */}
        {l1.map((branch, bi) => {
          const isHovered = hoveredBranch === bi;
          return branch.children.map((leaf, li) => {
            const r = 28;
            return (
              <g
                key={`l2-${bi}-${li}`}
                onMouseEnter={(e) => {
                  setHoveredBranch(bi);
                  if (leaf.fullText) {
                    const svgRect = svgRef.current?.getBoundingClientRect();
                    if (svgRect) {
                      const scaleX = SVG_W / svgRect.width;
                      const scaleY = SVG_H / svgRect.height;
                      const mx = (e.clientX - svgRect.left) * scaleX;
                      const my = (e.clientY - svgRect.top) * scaleY;
                      showTooltip(mx, my, leaf.fullText);
                    }
                  }
                }}
                onMouseLeave={() => {
                  setHoveredBranch(null);
                  hideTooltip();
                }}
                style={{ cursor: leaf.fullText ? "pointer" : "default" }}
              >
                <circle
                  cx={leaf.x}
                  cy={leaf.y}
                  r={r}
                  fill={branch.color}
                  opacity={isHovered ? 0.75 : 0.45}
                />
                <foreignObject x={leaf.x - r + 3} y={leaf.y - r + 5} width={(r - 3) * 2} height={(r - 5) * 2}>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "7.5px",
                      color: "var(--color-foreground)",
                      textAlign: "center",
                      lineHeight: 1.2,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {leaf.label}
                  </div>
                </foreignObject>
              </g>
            );
          });
        })}

        {/* Tooltip */}
        {tooltip && (
          <g>
            <rect
              x={Math.min(tooltip.x + 12, SVG_W - 250)}
              y={Math.max(tooltip.y - 60, 4)}
              width={238}
              height={56}
              rx={4}
              fill="var(--color-foreground)"
              opacity={0.94}
            />
            <foreignObject
              x={Math.min(tooltip.x + 16, SVG_W - 246)}
              y={Math.max(tooltip.y - 56, 8)}
              width={230}
              height={48}
            >
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "9px",
                  color: "var(--color-background)",
                  lineHeight: 1.4,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {tooltip.text}
              </div>
            </foreignObject>
          </g>
        )}
      </svg>

      <p className="px-4 pb-3 text-center text-[10px] text-muted-foreground print:hidden">
        Di chuyển chuột lên nút lá để xem nội dung đầy đủ
      </p>
    </div>
  );
}
