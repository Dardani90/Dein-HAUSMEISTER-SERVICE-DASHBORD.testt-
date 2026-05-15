export const F  = "var(--font-figtree), 'Figtree', system-ui, sans-serif";
export const GR = "#43A047", GD = "#2E7D32", GL = "#E8F5E9";
export const BG = "#F4F6F9", WH = "#FFFFFF";
export const TX = "#111827", T2 = "#374151", MU = "#6B7280", ML = "#9CA3AF";
export const BR = "#E5E7EB", B2 = "#F9FAFB";
export const OR = "#FB8C00", BL = "#2563EB", RE = "#DC2626", PU = "#7C3AED";
export const SB = "#1C2538";

export const statusStyle = s => ({
  "In Arbeit":  { c: OR, bg: "#FFF3E0" },
  "Neu":        { c: BL, bg: "#EFF6FF" },
  "Zugewiesen": { c: PU, bg: "#F5F3FF" },
  "Erledigt":   { c: GR, bg: GL        },
  "Offen":      { c: MU, bg: B2        },
  "Bezahlt":    { c: GR, bg: GL        },
}[s] || { c: MU, bg: B2 });
