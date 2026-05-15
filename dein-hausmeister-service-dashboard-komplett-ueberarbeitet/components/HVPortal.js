"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import WebBar from "./WebBar";
import Pill from "./Pill";
import { statusStyle } from "../lib/theme";
import { GR, GL, BG, WH, TX, MU, ML, BR, OR } from "../lib/theme";

export default function HVPortal() {
  const [nav, setNav] = useState("dashboard");
  const ITEMS = [
    ["dashboard","📊","Dashboard"],
    ["objekte","🏠","Objekte"],
    ["meldungen","📢","Meldungen"],
    ["aufgaben","✅","Aufgaben"],
    ["sonder","⭐","Sonderleistungen"],
    ["rechnungen","💶","Rechnungen"],
    ["dokumente","📄","Dokumente"],
    ["einstellungen","⚙️","Einstellungen"],
  ];

  const MELDUNGEN = [
    { id:"#2024-000123", s:"In Arbeit", typ:"Wasserschaden", obj:"Sonnenweg 12",   ti:"Heute, 11:05" },
    { id:"#2024-000122", s:"Neu",       typ:"Beleuchtung",   obj:"Ahornweg 5",     ti:"Heute, 09:15" },
    { id:"#2024-000121", s:"Zugewiesen",typ:"Heizung",       obj:"Birkenstraße 3", ti:"Gestern, 16:40" },
  ];

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar items={ITEMS} active={nav} onNav={setNav}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: BG, overflow: "hidden" }}>
        <WebBar title="Dashboard" avatar="H"/>
        <div style={{ flex: 1, overflow: "auto", padding: 20 }}>
          <div style={{ color: MU, fontSize: 12, marginBottom: 2 }}>Willkommen,</div>
          <div style={{ color: TX, fontWeight: 900, fontSize: 18, marginBottom: 20, letterSpacing: -0.3 }}>
            Hausverwaltung Muster GmbH
          </div>
          <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
            {[["24","Objekte",TX,"🏠"],["7","Offene Meldungen",OR,"📢"],["5","Offene Aufgaben",GR,"✅"]].map(([n, l, c, ic]) => (
              <div key={l} style={{ flex: 1, background: WH, borderRadius: 12, padding: "15px 18px",
                border: `1px solid ${BR}`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ color: MU, fontSize: 10, fontWeight: 700, marginBottom: 6, letterSpacing: 0.5 }}>
                      {l.toUpperCase()}
                    </div>
                    <div style={{ color: c, fontSize: 30, fontWeight: 900, letterSpacing: -1 }}>{n}</div>
                  </div>
                  <span style={{ fontSize: 22 }}>{ic}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: WH, borderRadius: 12, border: `1px solid ${BR}`,
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)", marginBottom: 18, overflow: "hidden" }}>
            <div style={{ padding: "13px 18px", borderBottom: `1px solid ${BR}`,
              display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: TX }}>Offene Meldungen</div>
              <button style={{ background: GL, color: "#2E7D32", border: "none", borderRadius: 7,
                padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Alle Meldungen anzeigen
              </button>
            </div>
            {MELDUNGEN.map((m, i) => {
              const { c } = statusStyle(m.s);
              return (
                <div key={m.id} style={{ padding: "12px 18px", display: "flex", alignItems: "center", gap: 12,
                  borderBottom: i < MELDUNGEN.length - 1 ? `1px solid ${BR}` : "", cursor: "pointer", transition: "background .12s" }}
                  onMouseEnter={e => e.currentTarget.style.background = BG}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div style={{ width: 8, height: 8, borderRadius: 99, background: c, flexShrink: 0 }}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 2 }}>
                      <span style={{ color: MU, fontSize: 11 }}>{m.id}</span>
                      <Pill s={m.s} small/>
                      <span style={{ color: ML, fontSize: 11 }}>{m.ti}</span>
                    </div>
                    <div style={{ color: TX, fontWeight: 700, fontSize: 13 }}>{m.typ}</div>
                    <div style={{ color: MU, fontSize: 11 }}>{m.obj}</div>
                  </div>
                  <span style={{ color: ML, fontSize: 16 }}>›</span>
                </div>
              );
            })}
          </div>
          <div style={{ background: WH, borderRadius: 12, border: `1px solid ${BR}`,
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)", overflow: "hidden" }}>
            <div style={{ padding: "13px 18px", borderBottom: `1px solid ${BR}`, fontWeight: 700, fontSize: 14, color: TX }}>
              Aufgaben
            </div>
            <div style={{ padding: "12px 18px", display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 18 }}>🔧</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: TX, fontWeight: 700, fontSize: 13 }}>Heizungswartung durchführen</div>
                <div style={{ color: MU, fontSize: 11 }}>Ahornweg 5 · Heute</div>
              </div>
              <Pill s="Offen" small/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
