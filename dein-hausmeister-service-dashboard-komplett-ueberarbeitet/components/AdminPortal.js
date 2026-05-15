"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import WebBar from "./WebBar";
import { GR, GL, BG, WH, TX, T2, MU, ML, BR, B2, OR, BL, RE } from "../lib/theme";

export default function AdminPortal() {
  const [nav, setNav] = useState("dashboard");
  const ITEMS = [
    ["dashboard","📊","Dashboard"],
    ["hausverwaltungen","🏢","Hausverwaltungen"],
    ["nutzer","👥","Nutzer"],
    ["objekte","🏠","Objekte"],
    ["qrcodes","📱","QR-Codes"],
    ["preise","💎","Pakete & Preise"],
    ["rechnungen","💶","Rechnungen"],
    ["audit","📋","Audit-Log"],
    ["einstellungen","⚙️","Einstellungen"],
  ];

  const raw = [8,12,7,19,14,22,17,11,20,15,18,13,17,19];
  const mx = Math.max(...raw);
  const pts = raw.map((v, i) => ({ x: (i / (raw.length - 1)) * 100, y: 88 - (v / mx) * 76 }));
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ");
  const area = line + ` L${pts[pts.length - 1].x},100 L${pts[0].x},100 Z`;

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar items={ITEMS} active={nav} onNav={setNav}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: BG, overflow: "hidden" }}>
        <WebBar title="Dashboard" avatar="A"/>
        <div style={{ flex: 1, overflow: "auto", padding: 20 }}>
          <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
            {[["12","Hausverwaltungen","🏢",TX],["45","Hausmeister","🔧",GR],["312","Objekte","🏠",BL]].map(([n, l, ic, c]) => (
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
          <div style={{ background: WH, borderRadius: 12, padding: "13px 18px", marginBottom: 18,
            border: `1px solid ${BR}`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "#FEF2F2",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📢</div>
            <div>
              <div style={{ color: MU, fontSize: 11 }}>Offene Meldungen</div>
              <div style={{ color: RE, fontWeight: 900, fontSize: 26, letterSpacing: -1 }}>128</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
            <div style={{ background: WH, borderRadius: 12, padding: "16px 18px",
              border: `1px solid ${BR}`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: TX, marginBottom: 18 }}>Meldungen (letzte 14 Tage)</div>
              <div style={{ height: 110, position: "relative", marginBottom: 20 }}>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none"
                  style={{ width: "100%", height: "100%", overflow: "visible" }}>
                  <defs>
                    <linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={GR} stopOpacity=".18"/>
                      <stop offset="100%" stopColor={GR} stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d={area} fill="url(#cg2)"/>
                  <path d={line} stroke={GR} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="2.2" fill={GR}/>)}
                </svg>
                <div style={{ position: "absolute", bottom: -18, left: 0, right: 0,
                  display: "flex", justifyContent: "space-between" }}>
                  {["01","02","03","04","05","06","07","08","09","10","11","12","13","14"].map(d => (
                    <span key={d} style={{ color: ML, fontSize: 8 }}>{d}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ background: WH, borderRadius: 12, padding: "16px 18px",
              border: `1px solid ${BR}`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: TX, marginBottom: 14 }}>Letzte Aktivitäten</div>
              {[
                ["Max Mustermann hat eine Meldung abgeschlossen","Heute, 11:20",GR],
                ["Neue Sonderleistung gebucht","Heute, 11:00",BL],
                ["Rechnung RE-2024-00123 erstellt","Heute, 10:15",OR],
              ].map(([t, ti, c], i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "9px 0",
                  borderBottom: i < 2 ? `1px solid ${BR}` : "", alignItems: "flex-start" }}>
                  <div style={{ width: 7, height: 7, borderRadius: 99, background: c, marginTop: 5, flexShrink: 0 }}/>
                  <div>
                    <div style={{ color: T2, fontSize: 12 }}>{t}</div>
                    <div style={{ color: ML, fontSize: 10, marginTop: 1 }}>{ti}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
