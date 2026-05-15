"use client";
import { WH, BR, GR, MU } from "../lib/theme";

export default function BotNav({ active, onTab }) {
  return (
    <div style={{
      height: 64, background: WH, borderTop: `1px solid ${BR}`,
      display: "flex", justifyContent: "space-around", alignItems: "center", flexShrink: 0,
    }}>
      {[["d","🏠","Dashboard"],["t","✅","Aufgaben"],["m","🔔","Meldungen"],["x","☰","Mehr"]].map(([k, ic, lb]) => (
        <div key={k} onClick={() => onTab(k)} style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 2, cursor: "pointer", flex: 1, userSelect: "none",
        }}>
          <span style={{
            fontSize: 18, filter: active === k ? "none" : "grayscale(100%)",
            opacity: active === k ? 1 : 0.4, transition: "all .15s",
          }}>{ic}</span>
          <span style={{ fontSize: 9, color: active === k ? GR : MU, fontWeight: active === k ? 700 : 400 }}>
            {lb}
          </span>
        </div>
      ))}
    </div>
  );
}
