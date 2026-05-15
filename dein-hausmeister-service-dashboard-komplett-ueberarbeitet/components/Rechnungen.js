"use client";
import { useState } from "react";
import WebBar from "./WebBar";
import Pill from "./Pill";
import { GR, GD, GL, BG, WH, TX, T2, MU, BR, B2, BL } from "../lib/theme";

const INV = [
  { nr:"RE-2024-000123", kunde:"Muster GmbH", datum:"14.05.2024", betrag:"150,00 €", s:"Bezahlt" },
  { nr:"RE-2024-000122", kunde:"Muster GmbH", datum:"10.05.2024", betrag:"300,00 €", s:"Bezahlt" },
  { nr:"RE-2024-000121", kunde:"Muster GmbH", datum:"08.05.2024", betrag:"500,00 €", s:"Offen"   },
  { nr:"RE-2024-000120", kunde:"Muster GmbH", datum:"05.05.2024", betrag:"150,00 €", s:"Bezahlt" },
  { nr:"RE-2024-000119", kunde:"Muster GmbH", datum:"01.05.2024", betrag:"300,00 €", s:"Bezahlt" },
];

export default function Rechnungen() {
  const [sel, setSel] = useState(0);
  const cur = INV[sel];

  return (
    <div style={{ background: BG, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <WebBar title="Rechnungen" avatar="H"/>
      <div style={{ flex: 1, overflow: "auto", padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
          <button style={{ background: GR, color: "#fff", border: "none", borderRadius: 8,
            padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
            display: "flex", gap: 6, alignItems: "center", boxShadow: `0 4px 12px ${GR}44` }}>
            <span style={{ fontSize: 16 }}>+</span> Neue Rechnung
          </button>
        </div>
        <div style={{ background: WH, borderRadius: 12, border: `1px solid ${BR}`,
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)", overflow: "hidden", marginBottom: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 1fr 1fr",
            padding: "9px 18px", background: B2, borderBottom: `1px solid ${BR}` }}>
            {["Rechnungsnr.","Kunde","Datum","Betrag","Status"].map(h => (
              <div key={h} style={{ color: MU, fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>{h}</div>
            ))}
          </div>
          {INV.map((inv, i) => (
            <div key={inv.nr} onClick={() => setSel(i)} style={{
              display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 1fr 1fr",
              padding: "12px 18px", cursor: "pointer", transition: "background .12s",
              borderBottom: i < INV.length - 1 ? `1px solid ${BR}` : "",
              background: sel === i ? GL : "transparent" }}
              onMouseEnter={e => { if (sel !== i) e.currentTarget.style.background = B2; }}
              onMouseLeave={e => { if (sel !== i) e.currentTarget.style.background = "transparent"; }}>
              <div style={{ color: BL, fontSize: 12, fontWeight: 600 }}>{inv.nr}</div>
              <div style={{ color: T2, fontSize: 12 }}>{inv.kunde}</div>
              <div style={{ color: T2, fontSize: 12 }}>{inv.datum}</div>
              <div style={{ color: TX, fontSize: 12, fontWeight: 700 }}>{inv.betrag}</div>
              <div><Pill s={inv.s} small/></div>
            </div>
          ))}
        </div>
        <div style={{ background: WH, borderRadius: 12, border: `1px solid ${BR}`,
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)", padding: 22 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: TX, marginBottom: 16 }}>
            Rechnungsvorschau ({cur.nr})
          </div>
          <div style={{ border: `1px solid ${BR}`, borderRadius: 10, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: `linear-gradient(135deg,${GR},${GD})`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏠</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 13 }}>Hausmeister Management</div>
                  <div style={{ color: MU, fontSize: 10 }}>Musterstraße 1 · 12345 Musterstadt</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: TX }}>Rechnung</div>
                <div style={{ color: MU, fontSize: 11 }}>{cur.nr}</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20, fontSize: 12 }}>
              <div>
                <div style={{ color: MU, fontSize: 10, marginBottom: 3 }}>Kunde</div>
                <div style={{ fontWeight: 700 }}>Muster GmbH</div>
                <div style={{ color: MU, fontSize: 11 }}>Kundennr.: 10001</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: MU, fontSize: 10, marginBottom: 3 }}>Datum</div>
                <div style={{ fontWeight: 700 }}>{cur.datum}</div>
              </div>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${BR}`, background: B2 }}>
                  {["Beschreibung","Menge","Einzelpreis","Gesamt"].map(h => (
                    <th key={h} style={{ padding: "7px 8px", textAlign: "left", color: MU, fontWeight: 700, fontSize: 10 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: `1px solid ${BR}` }}>
                  <td style={{ padding: "9px 8px", color: T2 }}>Sonderleistung (1–2 Stunden)</td>
                  <td style={{ padding: "9px 8px" }}>2,0 h</td>
                  <td style={{ padding: "9px 8px" }}>75,00 €</td>
                  <td style={{ padding: "9px 8px", fontWeight: 700 }}>150,00 €</td>
                </tr>
              </tbody>
            </table>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14, paddingTop: 14,
              borderTop: `2px solid ${TX}` }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: MU, fontSize: 11, marginBottom: 2 }}>Gesamtbetrag</div>
                <div style={{ fontWeight: 900, fontSize: 22, color: TX, letterSpacing: -0.5 }}>{cur.betrag}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
