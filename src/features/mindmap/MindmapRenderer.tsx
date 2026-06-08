import { useRef, useState, useEffect } from "react";
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  Search, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2, 
  Network, 
  GitMerge, 
  X, 
  BookOpen, 
  User
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { DailyQuote } from "@/features/learning/data/dailyQuotes";

type Node = {
  label: string;
  fullText?: string;
  author?: string;
  day?: number;
  month?: number;
  children: Node[];
};

type ColorTheme = "marxist" | "emerald" | "indigo" | "neon";

// Dải màu sắc cho từng nhánh theo chủ đề
const THEME_HUES: Record<ColorTheme, number[]> = {
  marxist: [15, 35, 45, 10, 25, 50, 360, 5],
  emerald: [135, 150, 165, 115, 125, 155, 175, 140],
  indigo: [215, 230, 245, 260, 275, 290, 205, 220],
  neon: [310, 185, 335, 195, 280, 160, 320, 295],
};

type ThemeConfig = {
  primary: string;
  primaryLight: string;
  cardBg: string;
  glow: string;
  name: string;
};

const THEME_CONFIGS: Record<ColorTheme, ThemeConfig> = {
  marxist: {
    primary: "#743027",
    primaryLight: "rgba(116, 48, 39, 0.08)",
    cardBg: "var(--color-card)",
    glow: "rgba(116, 48, 39, 0.45)",
    name: "Mác-xít Đỏ",
  },
  emerald: {
    primary: "#1b4d3e",
    primaryLight: "rgba(27, 77, 62, 0.08)",
    cardBg: "var(--color-card)",
    glow: "rgba(27, 77, 62, 0.45)",
    name: "Lục bảo",
  },
  indigo: {
    primary: "#1d3557",
    primaryLight: "rgba(29, 53, 87, 0.08)",
    cardBg: "var(--color-card)",
    glow: "rgba(29, 53, 87, 0.45)",
    name: "Đại dương",
  },
  neon: {
    primary: "#7b2cbf",
    primaryLight: "rgba(123, 44, 191, 0.08)",
    cardBg: "var(--color-card)",
    glow: "rgba(123, 44, 191, 0.45)",
    name: "Cyberpunk",
  },
};

/** Extract a short label from a quote string (first ~6 words) */
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
        author: q.author,
        day: q.day,
        month: q.month,
        children: [],
      })),
    })),
  };
}

// ── Layout constants ──────────────────────────────────────────
const CX = 550; // SVG center x for radial layout
const CY = 420; // SVG center y for radial layout
const R1 = 175; // radius for level-1 nodes (context)
const R2 = 340; // radius for level-2 nodes (leaves)
const SVG_W = 1100;
const SVG_H = 840;

type Layout2 = { 
  id: string; 
  label: string; 
  fullText?: string; 
  author?: string;
  day?: number;
  month?: number;
  x: number; 
  y: number; 
  angle: number; 
  color: string; 
};

type Layout1 = { 
  id: string;
  label: string; 
  x: number; 
  y: number; 
  angle: number; 
  color: string; 
  children: Layout2[]; 
  originalChildCount: number;
};

function computeLayout(
  root: Node, 
  layoutMode: "radial" | "tree",
  colorTheme: ColorTheme,
  collapsedBranches: Set<string>
): { l1: Layout1[]; svgW: number; svgH: number } {
  const hues = THEME_HUES[colorTheme];

  if (layoutMode === "radial") {
    const n1 = root.children.length;

    const l1: Layout1[] = root.children.map((branch, bi) => {
      const branchId = `branch-${bi}`;
      const isCollapsed = collapsedBranches.has(branchId);
      const angle = (2 * Math.PI * bi) / n1 - Math.PI / 2;
      const hue = hues[bi % hues.length];
      const color = `hsl(${hue} 55% 42%)`;
      const x = CX + R1 * Math.cos(angle);
      const y = CY + R1 * Math.sin(angle);

      const n2 = branch.children.length;
      const spread = Math.PI / Math.max(n2, 1) / 1.35;

      const children: Layout2[] = isCollapsed 
        ? [] 
        : branch.children.map((leaf, li) => {
            const leafAngle = angle + (li - (n2 - 1) / 2) * spread;
            return {
              id: `leaf-${bi}-${li}`,
              label: leaf.label,
              fullText: leaf.fullText,
              author: leaf.author,
              day: leaf.day,
              month: leaf.month,
              x: CX + R2 * Math.cos(leafAngle),
              y: CY + R2 * Math.sin(leafAngle),
              angle: leafAngle,
              color: `hsl(${hue} 55% 42%)`,
            };
          });

      return { 
        id: branchId, 
        label: branch.label, 
        x, 
        y, 
        angle, 
        color, 
        children,
        originalChildCount: n2
      };
    });

    return { l1, svgW: SVG_W, svgH: SVG_H };
  } else {
    // Tree Layout (Horizontal Hierarchy)
    let totalLeaves = 0;
    root.children.forEach((branch, bi) => {
      const branchId = `branch-${bi}`;
      if (!collapsedBranches.has(branchId)) {
        totalLeaves += Math.max(1, branch.children.length);
      } else {
        totalLeaves += 1; // takes 1 row spot when collapsed
      }
    });

    const leafSpacing = 58;
    const treeH = Math.max(840, totalLeaves * leafSpacing + 120);
    const treeW = 1100;
    
    let currentLeafIdx = 0;

    const l1: Layout1[] = root.children.map((branch, bi) => {
      const branchId = `branch-${bi}`;
      const isCollapsed = collapsedBranches.has(branchId);
      const hue = hues[bi % hues.length];
      const color = `hsl(${hue} 55% 42%)`;
      const n2 = branch.children.length;

      const children: Layout2[] = isCollapsed
        ? []
        : branch.children.map((leaf, li) => {
            const y = 80 + currentLeafIdx * leafSpacing;
            currentLeafIdx++;
            return {
              id: `leaf-${bi}-${li}`,
              label: leaf.label,
              fullText: leaf.fullText,
              author: leaf.author,
              day: leaf.day,
              month: leaf.month,
              x: 840, // Leaf column
              y,
              angle: 0,
              color: `hsl(${hue} 50% 40%)`,
            };
          });

      let branchY = 0;
      if (!isCollapsed && n2 > 0) {
        const minY = children[0].y;
        const maxY = children[children.length - 1].y;
        branchY = (minY + maxY) / 2;
      } else {
        const y = 80 + currentLeafIdx * leafSpacing;
        currentLeafIdx++;
        branchY = y;
      }

      return {
        id: branchId,
        label: branch.label,
        x: 460, // Branch column
        y: branchY,
        angle: 0,
        color,
        children,
        originalChildCount: n2
      };
    });

    return { l1, svgW: treeW, svgH: treeH };
  }
}

type SelectedNodeInfo = {
  type: "root" | "branch" | "leaf";
  id: string;
  label: string;
  fullText?: string;
  author?: string;
  day?: number;
  month?: number;
  color: string;
  totalChildren?: number;
  originalChildCount?: number;
};

type Props = {
  quotes: DailyQuote[];
  chapterTitle: string;
  chapterNumber: number;
};

export function MindmapRenderer({ quotes, chapterTitle, chapterNumber }: Props) {
  const root = buildTree(quotes, chapterTitle);
  const [layoutMode, setLayoutMode] = useState<"radial" | "tree">("radial");
  const [colorTheme, setColorTheme] = useState<ColorTheme>("marxist");
  const [collapsedBranches, setCollapsedBranches] = useState<Set<string>>(new Set());
  
  // Dynamic config based on active theme
  const themeConfig = THEME_CONFIGS[colorTheme];

  // Layout values based on mode, theme, and collapse state
  const { l1, svgW, svgH } = computeLayout(root, layoutMode, colorTheme, collapsedBranches);

  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNode, setSelectedNode] = useState<SelectedNodeInfo | null>(null);
  const [hoveredBranch, setHoveredBranch] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Zoom and Pan state
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Refs
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom & pan on layout change
  useEffect(() => {
    handleReset();
    setSelectedNode(null);
  }, [layoutMode]);

  // Fullscreen change listener
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  // Sync selectedNode state if collapsed/expanded from canvas
  useEffect(() => {
    if (selectedNode && selectedNode.type === "branch") {
      const match = l1.find((b) => b.id === selectedNode.id);
      if (match) {
        setSelectedNode({
          ...selectedNode,
          totalChildren: match.children.length
        });
      }
    }
  }, [collapsedBranches]);

  // Copy helper
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Toggle branch collapse
  const toggleBranchCollapse = (branchId: string) => {
    setCollapsedBranches((prev) => {
      const next = new Set(prev);
      if (next.has(branchId)) {
        next.delete(branchId);
      } else {
        next.add(branchId);
      }
      return next;
    });
  };

  // Zoom & Pan Event Handlers
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button !== 0) return; // Left click only
    setIsDragging(true);
    setDragStart({ x: e.clientX - translateX, y: e.clientY - translateY });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    setTranslateX(e.clientX - dragStart.x);
    setTranslateY(e.clientY - dragStart.y);
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX - translateX, y: touch.clientY - translateY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (isDragging && e.touches.length === 1) {
      const touch = e.touches[0];
      setTranslateX(touch.clientX - dragStart.x);
      setTranslateY(touch.clientY - dragStart.y);
    }
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const zoomFactor = 1.15;
    const nextScale = e.deltaY < 0 ? scale * zoomFactor : scale / zoomFactor;
    const boundedScale = Math.max(0.35, Math.min(4.5, nextScale));
    
    // Zoom relative to pointer
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const dx = mouseX - translateX;
    const dy = mouseY - translateY;

    const ratio = boundedScale / scale;
    setTranslateX(mouseX - dx * ratio);
    setTranslateY(mouseY - dy * ratio);
    setScale(boundedScale);
  };

  const handleZoom = (factor: number) => {
    const nextScale = scale * factor;
    const boundedScale = Math.max(0.35, Math.min(4.5, nextScale));
    
    // Zoom toward the center
    const container = containerRef.current;
    if (!container) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const dx = width / 2 - translateX;
    const dy = height / 2 - translateY;
    const ratio = boundedScale / scale;
    
    setTranslateX(width / 2 - dx * ratio);
    setTranslateY(height / 2 - dy * ratio);
    setScale(boundedScale);
  };

  const handleReset = () => {
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error("Fullscreen error:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Node highlight checker
  const isNodeActive = (id: string, branchIdx?: number, leafIdx?: number) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase().trim();

    if (id === "root") {
      return (
        chapterTitle.toLowerCase().includes(q) ||
        l1.some((branch) => {
          if (branch.label.toLowerCase().includes(q)) return true;
          return branch.children.some(
            (leaf) =>
              leaf.label.toLowerCase().includes(q) ||
              (leaf.fullText && leaf.fullText.toLowerCase().includes(q))
          );
        })
      );
    }

    if (id.startsWith("branch-")) {
      const bi = parseInt(id.replace("branch-", ""), 10);
      const branch = l1[bi];
      if (!branch) return false;
      
      const branchMatches = branch.label.toLowerCase().includes(q);
      const anyChildMatches = branch.children.some(
        (leaf) =>
          leaf.label.toLowerCase().includes(q) ||
          (leaf.fullText && leaf.fullText.toLowerCase().includes(q))
      );
      return branchMatches || anyChildMatches;
    }

    if (id.startsWith("leaf-")) {
      if (branchIdx === undefined || leafIdx === undefined) return false;
      const leaf = l1[branchIdx]?.children[leafIdx];
      if (!leaf) return false;

      const leafMatches =
        leaf.label.toLowerCase().includes(q) ||
        (leaf.fullText && leaf.fullText.toLowerCase().includes(q));
      const parentMatches = l1[branchIdx].label.toLowerCase().includes(q);
      return leafMatches || parentMatches;
    }

    return false;
  };

  // Export SVG as PNG
  const exportAsPNG = () => {
    const svg = svgRef.current;
    if (!svg) return;

    const clonedSvg = svg.cloneNode(true) as SVGSVGElement;
    
    // Reset transform on cloned svg group
    const innerGroup = clonedSvg.querySelector("#zoom-group");
    if (innerGroup) {
      innerGroup.removeAttribute("style");
      innerGroup.setAttribute("transform", "translate(0, 0) scale(1)");
    }

    clonedSvg.setAttribute("width", String(svgW));
    clonedSvg.setAttribute("height", String(svgH));

    const svgString = new XMLSerializer().serializeToString(clonedSvg);
    
    const isDarkMode = document.documentElement.classList.contains("dark");
    const bgColor = isDarkMode ? "#161312" : "#FAF8F5";
    const fgColor = isDarkMode ? "#EAE5E3" : "#2E2422";
    const cardColor = isDarkMode ? "#201B1A" : "#FFFFFF";
    const primaryColor = colorTheme === "marxist" 
      ? (isDarkMode ? "#c04e3e" : "#743027") 
      : themeConfig.primary;

    let resolvedSvgString = svgString
      .replace(/var\(--color-background\)/g, bgColor)
      .replace(/var\(--color-foreground\)/g, fgColor)
      .replace(/var\(--color-card\)/g, cardColor)
      .replace(/var\(--color-primary\)/g, primaryColor)
      .replace(/var\(--color-border\)/g, isDarkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)");

    const svgBlob = new Blob([resolvedSvgString], { type: "image/svg+xml;charset=utf-8" });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);
    const image = new Image();
    
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = svgW;
      canvas.height = svgH;
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = bgColor;
        context.fillRect(0, 0, svgW, svgH);
        context.drawImage(image, 0, 0);
        const png = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = png;
        downloadLink.download = `so-do-tu-duy-chuong-${chapterNumber}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
      URL.revokeObjectURL(blobURL);
    };
    image.src = blobURL;
  };

  const handleSvgClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedNode(null);
    }
  };

  const zoomGroupStyle = {
    transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
    transformOrigin: "0 0",
    transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
  };

  const isSearchActive = searchQuery.length > 0;
  const isRootActive = isNodeActive("root");
  const rootFill = colorTheme === "marxist" ? "var(--color-primary)" : themeConfig.primary;

  return (
    <div 
      ref={containerRef} 
      className={`relative flex flex-col md:flex-row overflow-hidden rounded-md border border-border bg-card shadow-sm transition-all duration-300 ${
        isFullscreen ? "fixed inset-0 z-50 h-screen w-screen" : "h-[650px] w-full"
      }`}
    >
      {/* ── Main Canvas View ── */}
      <div className="relative flex-1 h-full overflow-hidden bg-background/50">
        
        {/* Floating Controls (Top Left) */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 rounded-md bg-card/85 p-1.5 shadow-md border border-border backdrop-blur-md">
          <button
            onClick={() => handleZoom(1.3)}
            title="Phóng to"
            className="flex h-8 w-8 items-center justify-center rounded-sm text-foreground hover:bg-muted transition-colors"
          >
            <ZoomIn className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={() => handleZoom(0.7)}
            title="Thu nhỏ"
            className="flex h-8 w-8 items-center justify-center rounded-sm text-foreground hover:bg-muted transition-colors"
          >
            <ZoomOut className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={handleReset}
            title="Khôi phục góc nhìn"
            className="flex h-8 w-8 items-center justify-center rounded-sm text-foreground hover:bg-muted transition-colors"
          >
            <RotateCcw className="h-4.5 w-4.5" />
          </button>
          
          <div className="h-px bg-border my-1" />

          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
            className="flex h-8 w-8 items-center justify-center rounded-sm text-foreground hover:bg-muted transition-colors"
          >
            {isFullscreen ? <Minimize2 className="h-4.5 w-4.5" /> : <Maximize2 className="h-4.5 w-4.5" />}
          </button>

          <button
            onClick={exportAsPNG}
            title="Tải ảnh sơ đồ (PNG)"
            className="flex h-8 w-8 items-center justify-center rounded-sm text-foreground hover:bg-muted transition-colors"
          >
            <Download className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Layout & Theme Panel (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-10 flex flex-col sm:flex-row gap-2 rounded-md bg-card/85 p-1.5 shadow-md border border-border backdrop-blur-md">
          {/* Layout Switcher */}
          <div className="flex rounded-sm bg-muted/40 p-0.5 border border-border/50">
            <button
              onClick={() => setLayoutMode("radial")}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-sm transition-all ${
                layoutMode === "radial" 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Network className="h-3.5 w-3.5" />
              Tỏa tròn
            </button>
            <button
              onClick={() => setLayoutMode("tree")}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-sm transition-all ${
                layoutMode === "tree" 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GitMerge className="h-3.5 w-3.5" />
              Cây ngang
            </button>
          </div>
          
          <div className="h-px w-full sm:h-6 sm:w-px bg-border my-0.5 sm:my-0 sm:mx-1" />

          {/* Theme Palette Picker */}
          <div className="flex items-center gap-1.5 bg-muted/40 p-0.5 rounded-sm border border-border/50">
            {(["marxist", "emerald", "indigo", "neon"] as ColorTheme[]).map((theme) => {
              const cfg = THEME_CONFIGS[theme];
              const isActive = colorTheme === theme;
              return (
                <button
                  key={theme}
                  onClick={() => setColorTheme(theme)}
                  title={cfg.name}
                  className={`relative flex h-6 w-6 items-center justify-center rounded-sm transition-all ${
                    isActive ? "ring-2 ring-ring scale-110 shadow-sm" : "opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: theme === "marxist" ? "var(--color-primary)" : cfg.primary }}
                >
                  {isActive && <Check className="h-3 w-3 text-white stroke-[3.5]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Input (Top Right) */}
        <div className="absolute top-4 right-4 z-10 w-64">
          <div className="relative flex items-center bg-card/85 shadow-md border border-border rounded-md px-2.5 py-1.5 backdrop-blur-md focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
            <Search className="h-4 w-4 text-muted-foreground shrink-0 mr-2" />
            <input
              type="text"
              placeholder="Tìm nội dung/trích dẫn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm border-none focus:outline-none text-foreground"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="hover:text-primary transition-colors text-muted-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Legend (Bottom Right, hidden on mobile) */}
        <div className="absolute bottom-4 right-4 z-10 hidden md:flex items-center gap-4 rounded-md bg-card/85 p-2 shadow-sm border border-border text-[10px] text-muted-foreground backdrop-blur-md select-none">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>Chủ đề</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-orange-600" />
            <span>Khái niệm / Nhánh</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30 border border-muted-foreground" />
            <span>Trích dẫn (Lá)</span>
          </div>
        </div>

        {/* SVG Mindmap */}
        <svg
          ref={svgRef}
          viewBox={`0 0 ${svgW} ${svgH}`}
          aria-label={`Sơ đồ tư duy chủ đề ${chapterNumber}: ${chapterTitle}`}
          role="img"
          onClick={handleSvgClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUpOrLeave}
          onWheel={handleWheel}
          className={`w-full h-full select-none touch-none bg-background/20 transition-all ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {/* Defs for glow effects and filters */}
          <defs>
            <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g id="zoom-group" style={zoomGroupStyle}>
            
            {/* ── CONNECTION LINES ── */}
            {l1.map((branch, bi) => {
              const isBranchActive = isNodeActive(branch.id);
              const branchOpacity = isSearchActive ? (isBranchActive ? 0.95 : 0.05) : 0.6;
              const hoverState = hoveredBranch === bi;

              // Connections from Root to Branch
              let rootToBranchPath = "";
              if (layoutMode === "radial") {
                rootToBranchPath = `M ${CX} ${CY} L ${branch.x} ${branch.y}`;
              } else {
                const rootRightEdge = 130 + 100;
                const branchLeftEdge = 460 - 90;
                const rootCenterY = svgH / 2;
                rootToBranchPath = `M ${rootRightEdge} ${rootCenterY} C ${(rootRightEdge + branchLeftEdge) / 2} ${rootCenterY}, ${(rootRightEdge + branchLeftEdge) / 2} ${branch.y}, ${branchLeftEdge} ${branch.y}`;
              }

              return (
                <g key={`lines-branch-${bi}`}>
                  <path
                    d={rootToBranchPath}
                    fill="none"
                    stroke={branch.color}
                    strokeWidth={isBranchActive && isSearchActive ? 4 : (hoverState ? 3 : 2)}
                    strokeLinecap="round"
                    opacity={branchOpacity}
                    className="transition-all duration-300"
                    style={{
                      strokeDasharray: layoutMode === "radial" && !hoverState ? "none" : undefined,
                    }}
                  />

                  {/* Connections from Branch to Leaves */}
                  {branch.children.map((leaf, li) => {
                    const isLeafActive = isNodeActive(leaf.id, bi, li);
                    const leafLineOpacity = isSearchActive ? (isLeafActive ? 0.95 : 0.05) : 0.4;
                    const isSelected = selectedNode?.id === leaf.id;

                    let branchToLeafPath = "";
                    if (layoutMode === "radial") {
                      branchToLeafPath = `M ${branch.x} ${branch.y} L ${leaf.x} ${leaf.y}`;
                    } else {
                      const branchRightEdge = 460 + 90;
                      const leafLeftEdge = 840 - 120;
                      branchToLeafPath = `M ${branchRightEdge} ${branch.y} C ${(branchRightEdge + leafLeftEdge) / 2} ${branch.y}, ${(branchRightEdge + leafLeftEdge) / 2} ${leaf.y}, ${leafLeftEdge} ${leaf.y}`;
                    }

                    return (
                      <path
                        key={`line-leaf-${bi}-${li}`}
                        d={branchToLeafPath}
                        fill="none"
                        stroke={branch.color}
                        strokeWidth={isLeafActive && isSearchActive ? 3.5 : (isSelected ? 2.5 : 1.2)}
                        strokeLinecap="round"
                        opacity={leafLineOpacity}
                        className="transition-all duration-300"
                        style={{
                          strokeDasharray: layoutMode === "radial" && !hoverState && !isSelected ? "4 3" : undefined,
                        }}
                      />
                    );
                  })}
                </g>
              );
            })}

            {/* ── CENTRAL ROOT NODE ── */}
            <g
              onClick={() => setSelectedNode({
                type: "root",
                id: "root",
                label: chapterTitle,
                color: rootFill,
                totalChildren: l1.length
              })}
              className="cursor-pointer group animate-fade-in"
              opacity={isSearchActive ? (isRootActive ? 1.0 : 0.15) : 1.0}
            >
              {layoutMode === "radial" ? (
                <>
                  <circle 
                    cx={CX} 
                    cy={CY} 
                    r={60} 
                    fill={rootFill}
                    className="transition-all duration-300 shadow-md group-hover:scale-105 group-hover:brightness-110" 
                    stroke={selectedNode?.id === "root" ? "var(--color-foreground)" : "white"}
                    strokeWidth={selectedNode?.id === "root" ? 3.5 : 1}
                    filter={selectedNode?.id === "root" ? "url(#glow-filter)" : undefined}
                  />
                  {selectedNode?.id === "root" && (
                    <circle cx={CX} cy={CY} r={65} fill="none" stroke={rootFill} strokeWidth={1.5} opacity={0.6} className="animate-pulse" />
                  )}
                  <foreignObject x={CX - 52} y={CY - 35} width={104} height={70}>
                    <div className="h-full flex items-center justify-center text-center font-display font-bold text-[12px] leading-tight text-white select-none overflow-hidden text-ellipsis line-clamp-4 px-1">
                      {chapterTitle}
                    </div>
                  </foreignObject>
                </>
              ) : (
                <>
                  <rect
                    x={30}
                    y={svgH / 2 - 32}
                    width={200}
                    height={64}
                    rx={12}
                    fill={rootFill}
                    className="transition-all duration-300 shadow-md group-hover:scale-105 group-hover:brightness-110"
                    stroke={selectedNode?.id === "root" ? "var(--color-foreground)" : "white"}
                    strokeWidth={selectedNode?.id === "root" ? 3 : 1}
                    filter={selectedNode?.id === "root" ? "url(#glow-filter)" : undefined}
                  />
                  {selectedNode?.id === "root" && (
                    <rect x={26} y={svgH / 2 - 36} width={208} height={72} rx={14} fill="none" stroke={rootFill} strokeWidth={1.5} opacity={0.6} className="animate-pulse" />
                  )}
                  <foreignObject x={38} y={svgH / 2 - 24} width={184} height={48}>
                    <div className="h-full flex items-center justify-center text-center font-display font-bold text-[12.5px] leading-snug text-white select-none overflow-hidden text-ellipsis line-clamp-3">
                      {chapterTitle}
                    </div>
                  </foreignObject>
                </>
              )}
            </g>

            {/* ── LEVEL-1 BRANCH NODES ── */}
            {l1.map((branch, bi) => {
              const isBranchActive = isNodeActive(branch.id);
              const branchOpacity = isSearchActive ? (isBranchActive ? 1.0 : 0.15) : 1.0;
              const isSelected = selectedNode?.id === branch.id;
              const isCollapsed = collapsedBranches.has(branch.id);

              return (
                <g key={`branch-wrapper-${bi}`}>
                  <g
                    onClick={() => setSelectedNode({
                      type: "branch",
                      id: branch.id,
                      label: branch.label,
                      color: branch.color,
                      totalChildren: branch.children.length,
                      originalChildCount: branch.originalChildCount
                    })}
                    onMouseEnter={() => setHoveredBranch(bi)}
                    onMouseLeave={() => setHoveredBranch(null)}
                    className="cursor-pointer group"
                    opacity={branchOpacity}
                  >
                    {layoutMode === "radial" ? (
                      <>
                        <circle
                          cx={branch.x}
                          cy={branch.y}
                          r={45}
                          fill={branch.color}
                          className="transition-all duration-300 shadow-sm group-hover:scale-105 group-hover:brightness-110"
                          stroke={isSelected ? "var(--color-foreground)" : "white"}
                          strokeWidth={isSelected ? 3.5 : 1}
                          filter={isSelected || (isSearchActive && isBranchActive) ? "url(#glow-filter)" : undefined}
                        />
                        {isSelected && (
                          <circle cx={branch.x} cy={branch.y} r={50} fill="none" stroke={branch.color} strokeWidth={1.5} opacity={0.6} className="animate-pulse" />
                        )}
                        <foreignObject x={branch.x - 39} y={branch.y - 32} width={78} height={64}>
                          <div className="h-full flex items-center justify-center text-center font-sans font-bold text-[9.5px] leading-tight text-white select-none overflow-hidden text-ellipsis line-clamp-4">
                            {branch.label}
                          </div>
                        </foreignObject>
                      </>
                    ) : (
                      <>
                        <rect
                          x={370}
                          y={branch.y - 24}
                          width={180}
                          height={48}
                          rx={8}
                          fill={branch.color}
                          className="transition-all duration-300 shadow-sm group-hover:scale-105 group-hover:brightness-110"
                          stroke={isSelected ? "var(--color-foreground)" : "white"}
                          strokeWidth={isSelected ? 3 : 1}
                          filter={isSelected || (isSearchActive && isBranchActive) ? "url(#glow-filter)" : undefined}
                        />
                        {isSelected && (
                          <rect x={366} y={branch.y - 28} width={188} height={56} rx={10} fill="none" stroke={branch.color} strokeWidth={1.5} opacity={0.6} className="animate-pulse" />
                        )}
                        <foreignObject x={378} y={branch.y - 18} width={164} height={36}>
                          <div className="h-full flex items-center justify-center text-center font-sans font-bold text-[10px] leading-snug text-white select-none overflow-hidden text-ellipsis line-clamp-3">
                            {branch.label}
                          </div>
                        </foreignObject>
                      </>
                    )}
                  </g>

                  {/* Collapse / Expand Handle (+/- Button) */}
                  {branch.originalChildCount > 0 && (
                    (() => {
                      // Calculate handle position
                      let handleX = 0;
                      let handleY = 0;
                      if (layoutMode === "radial") {
                        handleX = branch.x + 45 * Math.cos(branch.angle);
                        handleY = branch.y + 45 * Math.sin(branch.angle);
                      } else {
                        handleX = 550; // exact right edge of branch card
                        handleY = branch.y;
                      }

                      return (
                        <g
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBranchCollapse(branch.id);
                          }}
                          opacity={branchOpacity}
                          className="cursor-pointer group/toggle transition-all"
                        >
                          <circle
                            cx={handleX}
                            cy={handleY}
                            r={7.5}
                            fill="var(--color-card)"
                            stroke={branch.color}
                            strokeWidth={1.5}
                            className="transition-all group-hover/toggle:r-9 group-hover/toggle:fill-primary group-hover/toggle:stroke-primary"
                          />
                          {/* Minus Line */}
                          <line
                            x1={handleX - 4}
                            y1={handleY}
                            x2={handleX + 4}
                            y2={handleY}
                            stroke={branch.color}
                            strokeWidth={1.5}
                          />
                          {/* Plus Line (only visible if collapsed) */}
                          {isCollapsed && (
                            <line
                              x1={handleX}
                              y1={handleY - 4}
                              x2={handleX}
                              y2={handleY + 4}
                              stroke={branch.color}
                              strokeWidth={1.5}
                            />
                          )}
                        </g>
                      );
                    })()
                  )}
                </g>
              );
            })}

            {/* ── LEVEL-2 LEAF NODES (QUOTES) ── */}
            {l1.map((branch, bi) => {
              const isHovered = hoveredBranch === bi;
              return branch.children.map((leaf, li) => {
                const isLeafActive = isNodeActive(leaf.id, bi, li);
                const leafOpacity = isSearchActive ? (isLeafActive ? 1.0 : 0.15) : 1.0;
                const isSelected = selectedNode?.id === leaf.id;

                return (
                  <g
                    key={`leaf-node-${bi}-${li}`}
                    onClick={() => setSelectedNode({
                      type: "leaf",
                      id: leaf.id,
                      label: leaf.label,
                      fullText: leaf.fullText,
                      author: leaf.author,
                      day: leaf.day,
                      month: leaf.month,
                      color: branch.color
                    })}
                    className="cursor-pointer group"
                    opacity={leafOpacity}
                  >
                    {layoutMode === "radial" ? (
                      <>
                        <circle
                          cx={leaf.x}
                          cy={leaf.y}
                          r={30}
                          fill={isSelected ? "var(--color-card)" : (isHovered ? branch.color : "var(--color-card)")}
                          className="transition-all duration-300 shadow-sm group-hover:scale-105"
                          stroke={isSelected ? "var(--color-foreground)" : branch.color}
                          strokeWidth={isSelected ? 3 : 1.5}
                          opacity={isSelected ? 1 : 0.9}
                          filter={isSelected || (isSearchActive && isLeafActive) ? "url(#glow-filter)" : undefined}
                        />
                        <foreignObject x={leaf.x - 26} y={leaf.y - 22} width={52} height={44}>
                          <div 
                            className="h-full flex items-center justify-center text-center font-sans text-[7.5px] leading-snug select-none overflow-hidden text-ellipsis line-clamp-3"
                            style={{
                              color: isSelected ? "var(--color-foreground)" : (isHovered ? "white" : "var(--color-foreground)"),
                              fontWeight: isSelected || isHovered ? 600 : 400
                            }}
                          >
                            {leaf.label}
                          </div>
                        </foreignObject>
                      </>
                    ) : (
                      <>
                        <rect
                          x={720}
                          y={leaf.y - 20}
                          width={240}
                          height={40}
                          rx={6}
                          fill="var(--color-card)"
                          className="transition-all duration-300 shadow-sm group-hover:scale-[1.02] group-hover:brightness-105"
                          stroke={isSelected ? "var(--color-foreground)" : branch.color}
                          strokeWidth={isSelected ? 3 : 1.5}
                          style={{
                            fillOpacity: isSelected ? 1 : 0.9,
                          }}
                          filter={isSelected || (isSearchActive && isLeafActive) ? "url(#glow-filter)" : undefined}
                        />
                        {/* A small decorative left indicator bar using branch color */}
                        <rect
                          x={720.5}
                          y={leaf.y - 19.5}
                          width={5}
                          height={39}
                          rx={1}
                          fill={branch.color}
                        />
                        <foreignObject x={733} y={leaf.y - 15} width={220} height={30}>
                          <div 
                            className="h-full flex items-center justify-start text-left font-sans text-[11px] leading-normal select-none overflow-hidden text-ellipsis line-clamp-2 pr-1"
                            style={{
                              color: "var(--color-foreground)",
                              fontWeight: isSelected ? 600 : 400
                            }}
                          >
                            {leaf.label}
                          </div>
                        </foreignObject>
                      </>
                    )}
                  </g>
                );
              });
            })}
          </g>
        </svg>

        {/* Swipe Prompt for Mobile */}
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden text-center text-[10px] text-muted-foreground bg-card/80 px-3 py-1.5 rounded-full border border-border shadow-sm backdrop-blur-sm pointer-events-none select-none">
          Vuốt để di chuyển · Dùng bộ điều khiển để thu phóng
        </p>
      </div>

      {/* ── Detail Sidebar (Glassmorphic Slide-in) ── */}
      <div 
        className={`relative w-full md:w-[380px] h-[220px] md:h-full border-t md:border-t-0 md:border-l border-border bg-card/90 backdrop-blur-md flex flex-col transition-all duration-300 shrink-0 ${
          selectedNode ? "translate-y-0 md:translate-x-0" : "hidden"
        }`}
      >
        {/* Close Button */}
        <button 
          onClick={() => setSelectedNode(null)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded-sm"
          title="Đóng bảng chi tiết"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between h-full">
          {selectedNode ? (
            <div className="space-y-5 flex-1 flex flex-col justify-between">
              
              {/* Top part */}
              <div className="space-y-4">
                
                {/* Header Tag */}
                <div className="flex items-center gap-2">
                  <span 
                    className="inline-block h-2.5 w-2.5 rounded-full shrink-0" 
                    style={{ backgroundColor: selectedNode.color.startsWith('var') ? 'var(--color-primary)' : selectedNode.color }} 
                  />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {selectedNode.type === "root" && "Chủ đề chính"}
                    {selectedNode.type === "branch" && "Nhánh ý kiến / Bối cảnh"}
                    {selectedNode.type === "leaf" && `Ngày ${String(selectedNode.day).padStart(2, "0")} / Th. ${selectedNode.month}`}
                  </span>
                </div>

                {/* Node Title */}
                <h3 className="font-display text-xl leading-tight text-foreground">
                  {selectedNode.label}
                </h3>

                {/* Main Text Content */}
                {selectedNode.type === "leaf" && selectedNode.fullText && (
                  <div className="relative mt-4 bg-muted/40 border-l-2 pl-4 py-3 pr-2 text-foreground/90 rounded-r-md">
                    <p className="font-display text-sm md:text-base italic leading-relaxed">
                      “{selectedNode.fullText}”
                    </p>
                    {selectedNode.author && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                        <User className="h-3 w-3" />
                        <span>{selectedNode.author}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Stats and Controls for Central/Branch Nodes */}
                {selectedNode.type !== "leaf" && (
                  <div className="bg-muted/30 border border-border p-4 rounded-sm space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {selectedNode.type === "root" ? "Số nhánh con:" : "Số bài học hiển thị:"}
                      </span>
                      <span className="font-bold text-foreground">
                        {selectedNode.totalChildren}
                        {selectedNode.type === "branch" && selectedNode.originalChildCount !== undefined && (
                          <span className="text-muted-foreground font-normal"> / {selectedNode.originalChildCount}</span>
                        )}
                      </span>
                    </div>

                    {selectedNode.type === "branch" && selectedNode.originalChildCount && selectedNode.originalChildCount > 0 && (
                      <div className="pt-2 border-t border-border/50">
                        <button
                          onClick={() => toggleBranchCollapse(selectedNode.id)}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-sm bg-card hover:bg-muted border border-border px-3 py-1.5 text-[11px] font-semibold text-foreground transition-all"
                        >
                          {collapsedBranches.has(selectedNode.id) ? (
                            <>
                              <Maximize2 className="h-3 w-3" />
                              Mở rộng các bài học
                            </>
                          ) : (
                            <>
                              <Minimize2 className="h-3 w-3" />
                              Thu gọn các bài học
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {selectedNode.type === "root" && (
                      <div className="text-muted-foreground text-[11px] leading-relaxed pt-2 border-t border-border/50">
                        Chứa toàn bộ cấu trúc lý luận của chủ đề bài học. Nhấp vào các nhánh con và lá trích dẫn xung quanh để đi sâu vào chi tiết.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom part (Action buttons) */}
              {selectedNode.type === "leaf" && (
                <div className="mt-6 pt-4 border-t border-border/60 flex flex-col gap-2 shrink-0">
                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(selectedNode.fullText || "")}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all border ${
                      copied 
                        ? "bg-emerald-600 border-emerald-600 text-white" 
                        : "bg-card hover:bg-muted border-border text-foreground"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        Đã sao chép!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Sao chép câu trích dẫn
                      </>
                    )}
                  </button>

                  {/* Read Article Button */}
                  {selectedNode.month && (
                    <Link
                      to="/chuong/$chapter"
                      params={{ chapter: String(selectedNode.month) }}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-sm bg-primary hover:bg-primary/95 text-primary-foreground px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Đọc toàn bài học
                    </Link>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground px-4 py-10">
              <Network className="h-10 w-10 mb-4 text-muted-foreground/40 stroke-[1.5]" />
              <p className="text-xs leading-relaxed max-w-[240px]">
                Chọn bất kỳ nút nào trên sơ đồ để xem đầy đủ nội dung bài học, tác giả và bối cảnh chi tiết.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
