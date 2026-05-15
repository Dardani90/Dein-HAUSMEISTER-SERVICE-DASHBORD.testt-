"use client";
import { useState } from "react";
import QRFlow from "../components/QRFlow";
import HausmeisterApp from "../components/HausmeisterApp";
import AdminPortal from "../components/AdminPortal";
import HVPortal from "../components/HVPortal";
import Rechnungen from "../components/Rechnungen";
import { GR, GD } from "../lib/theme";

const TABS = [
  ["qr",  "📱", "Bewohner QR"],
  ["app", "🔧", "Hausmeister App"],
  ["adm", "🛡️", "Admin Portal"],
  ["hv",  "🏢", "HV Portal"],
  ["inv", "💶", "Rechnungen"],
];

export default function App() {
  const [view, setView] = useState("qr");
  const mobile = view === "qr" || view === "app";

  return (
    <div style={{ minHeight: "100vh", background: "#0e1822", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#091120", borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "stretch", padding: "0 20px", gap: 0, flexShrink: 0, overflowX: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingRight: 24,
          borderRight: "1px solid rgba(255,255,255,0.07)", marginRight: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg,${GR},${GD})`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🏠</div>
          <div>
            <div style={{ color: "#fff", fontSize: 11, fontWeight: 900, letterSpacing: -0.2 }}>DEIN HAUSMEISTER</div>
            <div style={{ color: GR, fontSize: 8, fontWeight: 700, letterSpacing: 2 }}>BETA v0.2</div>
          </div>
        </div>
        {TABS.map(([k, ic, lb]) => (
          <button key={k} onClick={() => setView(k)} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "0 16px", border: "none",
            background: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: view === k ? 700 : 500,
            fontSize: 12, color: view === k ? "#fff" : "rgba(255,255,255,0.4)",
            borderBottom: view === k ? `2.5px solid ${GR}` : "2.5px solid transparent",
            transition: "all .15s", whiteSpace: "nowrap",
          }}>
            <span style={{ fontSize: 14 }}>{ic}</span>{lb}
          </button>
        ))}
      </div>

      {mobile ? (
        <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center",
          padding: "36px 24px" }}>
          {view === "qr"  && <QRFlow/>}
          {view === "app" && <HausmeisterApp/>}
        </div>
      ) : (
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {view === "adm" && <AdminPortal/>}
          {view === "hv"  && <HVPortal/>}
          {view === "inv" && <Rechnungen/>}
        </div>
      )}
    </div>
  );
}
