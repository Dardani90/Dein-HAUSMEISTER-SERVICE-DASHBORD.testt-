"use client";
import { GR, GD, SB } from "../lib/theme";

export default function Sidebar({ items, active, onNav }) {
  return (
    <div style={{ width: 206, background: SB, display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "16px 14px 13px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: `linear-gradient(135deg,${GR},${GD})`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0,
          }}>🏠</div>
          <div style={{ color: "#fff", fontSize: 11, fontWeight: 800, lineHeight: 1.25 }}>
            Hausmeister<br/>Management
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "8px 6px" }}>
        {items.map(([k, ic, lb]) => (
          <div key={k} onClick={() => onNav(k)} style={{
            display: "flex", alignItems: "center", gap: 9,
            padding: "8px 10px", borderRadius: 7, cursor: "pointer", marginBottom: 1, transition: "all .12s",
            background: active === k ? "rgba(67,160,71,0.15)" : "transparent",
            color: active === k ? "#fff" : "rgba(255,255,255,0.5)",
            borderLeft: active === k ? `2px solid ${GR}` : "2px solid transparent",
          }}
          onMouseEnter={e => { if (active !== k) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
          onMouseLeave={e => { if (active !== k) e.currentTarget.style.background = "transparent"; }}>
            <span style={{ fontSize: 14 }}>{ic}</span>
            <span style={{ fontSize: 12, fontWeight: active === k ? 700 : 400 }}>{lb}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
