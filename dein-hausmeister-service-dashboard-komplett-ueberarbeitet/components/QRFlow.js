"use client";
import { useState } from "react";
import Phone from "./Phone";
import MobHead from "./MobHead";
import GBtn from "./GBtn";
import { GR, GD, GL, BG, WH, TX, MU, BR, F } from "../lib/theme";

export default function QRFlow() {
  const [sc, setSc] = useState(0);
  const labels = ["QR-Code scannen", "Schaden melden", "Meldung eingereicht", "Status verfolgen"];

  const SCREENS = [
    <div key={0} style={{ flex: 1, background: "#0a0a0a", display: "flex", flexDirection: "column" }}>
      <MobHead title="QR-Code scannen"/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, padding: 24 }}>
        <div style={{ width: 190, height: 190, position: "relative" }}>
          {[
            { t: 0, l: 0, bt: "top",    bl: "left"  },
            { t: 0, r: 0, bt: "top",    bl: "right" },
            { b: 0, l: 0, bt: "bottom", bl: "left"  },
            { b: 0, r: 0, bt: "bottom", bl: "right" },
          ].map((pos, i) => (
            <div key={i} style={{
              position: "absolute",
              top:    pos.t !== undefined ? pos.t : undefined,
              bottom: pos.b !== undefined ? pos.b : undefined,
              left:   pos.l !== undefined ? pos.l : undefined,
              right:  pos.r !== undefined ? pos.r : undefined,
              width: 30, height: 30,
              borderTop:    pos.bt === "top"    ? `3px solid ${GR}` : "none",
              borderBottom: pos.bt === "bottom" ? `3px solid ${GR}` : "none",
              borderLeft:   pos.bl === "left"   ? `3px solid ${GR}` : "none",
              borderRight:  pos.bl === "right"  ? `3px solid ${GR}` : "none",
            }}/>
          ))}
          <div style={{
            position: "absolute", left: 4, right: 4, height: 2, top: "25%",
            background: `linear-gradient(90deg,transparent,${GR},transparent)`,
            animation: "scan 2s ease-in-out infinite",
          }}/>
          <div style={{
            position: "absolute", inset: 24, display: "grid",
            gridTemplateColumns: "repeat(6,1fr)", gap: 2, opacity: 0.5,
          }}>
            {Array(36).fill(0).map((_, i) => (
              <div key={i} style={{
                background: [0,1,2,3,4,5,6,12,18,24,30,31,32,33,34,35,7,8,9,10,11,25,26,27,28,29,16,17].includes(i)
                  ? GR : "transparent",
                borderRadius: 1,
              }}/>
            ))}
          </div>
        </div>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, textAlign: "center", lineHeight: 1.6 }}>
          Richte die Kamera auf den QR-Code<br/>am Objekt, um Schäden zu melden
        </p>
        <button onClick={() => setSc(1)} style={{
          background: GR, color: "#fff", border: "none",
          borderRadius: 22, padding: "9px 22px", fontSize: 12, fontWeight: 700, cursor: "pointer",
          boxShadow: `0 4px 14px ${GR}55`, fontFamily: F,
        }}>Demo: Weiter →</button>
      </div>
      <div style={{ display: "flex", background: "#111", borderTop: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
        {[["📷","Scan"],["🕐","Verlauf"]].map(([ic, lb], i) => (
          <div key={lb} style={{ flex: 1, padding: "10px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: 18, color: i === 0 ? GR : "rgba(255,255,255,0.4)" }}>{ic}</span>
            <span style={{ fontSize: 9, color: i === 0 ? GR : "rgba(255,255,255,0.4)", fontWeight: i === 0 ? 700 : 400 }}>{lb}</span>
          </div>
        ))}
      </div>
    </div>,

    <div key={1} style={{ flex: 1, background: BG, display: "flex", flexDirection: "column" }}>
      <MobHead back title="Schaden melden" onBack={() => setSc(0)}/>
      <div style={{ flex: 1, overflow: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ background: WH, borderRadius: 12, padding: 13, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
          <div style={{ color: MU, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, marginBottom: 8 }}>OBJEKT</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: GL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏠</div>
            <div>
              <div style={{ color: TX, fontWeight: 700, fontSize: 12 }}>Wohnanlage Sonnenweg 12</div>
              <div style={{ color: MU, fontSize: 10 }}>Sonnenweg 12, 12345 Musterstadt</div>
            </div>
          </div>
        </div>
        <div style={{ background: WH, borderRadius: 12, padding: 13, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
          <div style={{ color: MU, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, marginBottom: 8 }}>BESCHREIBUNG *</div>
          <textarea defaultValue="Wasserleck im Keller, es steht Wasser auf dem Boden."
            style={{ width: "100%", minHeight: 65, background: BG, border: `1px solid ${BR}`,
              borderRadius: 9, padding: "8px 10px", fontSize: 12, color: TX, outline: "none",
              resize: "none", boxSizing: "border-box", fontFamily: F, lineHeight: 1.5 }}/>
        </div>
        <div style={{ background: WH, borderRadius: 12, padding: 13, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
          <div style={{ color: MU, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, marginBottom: 8 }}>FOTO HINZUFÜGEN</div>
          <div style={{ border: `2px dashed ${BR}`, borderRadius: 10, padding: "18px 0",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 5, background: BG, cursor: "pointer" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: WH, border: `1px solid ${BR}`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📷</div>
            <span style={{ color: MU, fontSize: 11 }}>Foto aufnehmen oder auswählen</span>
          </div>
        </div>
        <GBtn label="Meldung senden" onClick={() => setSc(2)}/>
      </div>
    </div>,

    <div key={2} style={{ flex: 1, background: BG, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: 76, height: 76, borderRadius: 99, background: `linear-gradient(135deg,${GR},${GD})`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, color: "#fff",
        marginBottom: 22, boxShadow: `0 8px 28px ${GR}55` }}>✓</div>
      <div style={{ color: TX, fontWeight: 800, fontSize: 20, textAlign: "center", marginBottom: 8 }}>
        Meldung eingereicht!
      </div>
      <div style={{ color: MU, fontSize: 12, textAlign: "center", lineHeight: 1.7, marginBottom: 26 }}>
        Vielen Dank. Ihre Meldung wurde<br/>erfolgreich übermittelt.
      </div>
      <div style={{ background: WH, borderRadius: 13, padding: "14px 32px", textAlign: "center",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: 26 }}>
        <div style={{ color: MU, fontSize: 9, letterSpacing: 0.8, marginBottom: 4 }}>MELDUNGSNUMMER</div>
        <div style={{ color: TX, fontWeight: 900, fontSize: 18, letterSpacing: -0.3 }}>#2024-000123</div>
      </div>
      <GBtn label="Zurück zur Startseite" onClick={() => setSc(0)}/>
      <button onClick={() => setSc(3)} style={{ marginTop: 12, background: "none", border: "none",
        color: GR, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: F }}>
        Status verfolgen →
      </button>
    </div>,

    <div key={3} style={{ flex: 1, background: BG, display: "flex", flexDirection: "column" }}>
      <MobHead back title="Meldung #2024-000123" onBack={() => setSc(2)}/>
      <div style={{ flex: 1, overflow: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ background: WH, borderRadius: 12, padding: 13, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
          <div style={{ color: MU, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, marginBottom: 6 }}>OBJEKT</div>
          <div style={{ color: TX, fontWeight: 700, fontSize: 12 }}>Wohnanlage Sonnenweg 12</div>
          <div style={{ color: MU, fontSize: 10 }}>Sonnenweg 12, 12345 Musterstadt</div>
        </div>
        <div style={{ background: WH, borderRadius: 12, padding: 13, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
          <div style={{ color: MU, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, marginBottom: 8 }}>STATUS</div>
          <span style={{ background: "#FFF3E0", color: "#FB8C00", borderRadius: 20, padding: "3px 11px", fontSize: 11, fontWeight: 700 }}>In Arbeit</span>
        </div>
        <div style={{ background: WH, borderRadius: 12, padding: 13, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
          <div style={{ color: MU, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, marginBottom: 14 }}>VERLAUF</div>
          {[
            { time: "Heute, 10:15", lb: "Meldung eingegangen",       done: true           },
            { time: "Heute, 10:30", lb: "An Hausmeister zugewiesen", done: true           },
            { time: "Heute, 11:05", lb: "In Arbeit",                 done: false, now: true },
            { time: "Offen",        lb: "Erledigt",                  done: false          },
          ].map((st, i, a) => (
            <div key={i} style={{ display: "flex", gap: 10 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 18 }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 99, flexShrink: 0,
                  border: `2px solid ${st.done || st.now ? GR : BR}`,
                  background: st.done ? GR : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {st.done && <span style={{ color: "#fff", fontSize: 10, lineHeight: 1 }}>✓</span>}
                  {st.now  && <div style={{ width: 7, height: 7, borderRadius: 99, background: GR }}/>}
                </div>
                {i < a.length - 1 && <div style={{ width: 2, flex: 1, background: st.done ? GR : BR, margin: "2px 0" }}/>}
              </div>
              <div style={{ paddingBottom: i < a.length - 1 ? 12 : 0 }}>
                <div style={{ color: st.done || st.now ? TX : MU, fontWeight: 600, fontSize: 12 }}>{st.lb}</div>
                <div style={{ color: MU, fontSize: 10, marginTop: 1 }}>{st.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", background: WH, borderTop: `1px solid ${BR}`, flexShrink: 0 }}>
        {[["📋","Details"],["📈","Verlauf"]].map(([ic, lb], i) => (
          <div key={lb} style={{ flex: 1, padding: "10px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: 17, color: i === 1 ? GR : MU }}>{ic}</span>
            <span style={{ fontSize: 9, color: i === 1 ? GR : MU, fontWeight: i === 1 ? 700 : 400 }}>{lb}</span>
          </div>
        ))}
      </div>
    </div>,
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <Phone dark={sc === 0}>{SCREENS[sc]}</Phone>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {[0,1,2,3].map(i => (
            <div key={i} onClick={() => setSc(i)} style={{
              height: 7, borderRadius: 99, cursor: "pointer",
              width: sc === i ? 24 : 7,
              background: sc === i ? "#fff" : "rgba(255,255,255,0.25)",
              transition: "all .2s",
            }}/>
          ))}
        </div>
        <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>{sc + 1}/4 – {labels[sc]}</div>
      </div>
    </div>
  );
}
