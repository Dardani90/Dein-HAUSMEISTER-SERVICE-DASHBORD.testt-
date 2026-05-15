"use client";
import { useState } from "react";
import Phone from "./Phone";
import BotNav from "./BotNav";
import MobHead from "./MobHead";
import GBtn from "./GBtn";
import Pill from "./Pill";
import { GR, GD, GL, BG, WH, TX, T2, MU, ML, BR, OR, F } from "../lib/theme";

const TASKS = [
  { id:1, ico:"🔧", t:"Heizungswartung",          l:"Ahornweg 5",     ti:"09:00",        s:"o" },
  { id:2, ico:"🗑️", t:"Mülltonnen bereitstellen",  l:"Ahornweg 5",     ti:"11:00",        s:"i" },
  { id:3, ico:"🏠", t:"Spielplatzkontrolle",        l:"Sonnenweg 12",   ti:"14:00",        s:"o" },
  { id:4, ico:"💡", t:"Beleuchtung prüfen",         l:"Ahornweg 7",     ti:"Morgen 08:00", s:"o" },
  { id:5, ico:"🏚", t:"Dachrinnenreinigung",        l:"Birkenstraße 3", ti:"15.05.",       s:"e" },
];
const dotC = s => s === "e" ? GR : s === "i" ? OR : ML;

export default function HausmeisterApp() {
  const [tab, setTab]       = useState("d");
  const [atab, setAtab]     = useState("o");
  const [detail, setDetail] = useState(false);
  const [edit, setEdit]     = useState(false);
  const [route, setRoute]   = useState(false);

  const filtered = atab === "o" ? TASKS.filter(t => t.s === "o")
    : atab === "i" ? TASKS.filter(t => t.s === "i")
    : TASKS.filter(t => t.s === "e");

  if (edit) return (
    <Phone>
      <div style={{ flex: 1, background: BG, display: "flex", flexDirection: "column" }}>
        <MobHead back title="Meldung bearbeiten" onBack={() => setEdit(false)}/>
        <div style={{ flex: 1, overflow: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: WH, borderRadius: 12, padding: 13, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
            <div style={{ color: MU, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, marginBottom: 8 }}>STATUS</div>
            <select defaultValue="In Arbeit" style={{ width: "100%", background: BG, border: `1px solid ${BR}`,
              borderRadius: 9, padding: "9px 11px", fontSize: 12, color: TX, outline: "none", fontFamily: F }}>
              {["Neu","Zugewiesen","In Arbeit","Erledigt"].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div style={{ background: WH, borderRadius: 12, padding: 13, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
            <div style={{ color: MU, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, marginBottom: 8 }}>NOTIZ</div>
            <textarea defaultValue="Leck gefunden und provisorisch abgedichtet. Klempner ist informiert."
              style={{ width: "100%", minHeight: 70, background: BG, border: `1px solid ${BR}`,
                borderRadius: 9, padding: "8px 10px", fontSize: 12, color: TX, outline: "none",
                resize: "none", boxSizing: "border-box", fontFamily: F }}/>
          </div>
          <div style={{ background: WH, borderRadius: 12, padding: 13, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
            <div style={{ color: MU, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, marginBottom: 8 }}>FOTOS</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["Vorher","Nachher"].map(l => (
                <div key={l} style={{ flex: 1, aspectRatio: "4/3", background: BG, border: `1.5px dashed ${BR}`,
                  borderRadius: 9, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <span style={{ fontSize: 18 }}>📷</span>
                  <span style={{ color: MU, fontSize: 9 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <GBtn label="Speichern" onClick={() => { setEdit(false); setDetail(false); }}/>
        </div>
        <BotNav active={tab} onTab={k => { setEdit(false); setDetail(false); setTab(k); }}/>
      </div>
    </Phone>
  );

  if (detail) return (
    <Phone>
      <div style={{ flex: 1, background: BG, display: "flex", flexDirection: "column" }}>
        <MobHead back title="#2024-000123" right="⋯" onBack={() => setDetail(false)}/>
        <div style={{ flex: 1, overflow: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: WH, borderRadius: 12, padding: 13, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
            <div style={{ color: MU, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, marginBottom: 6 }}>OBJEKT</div>
            <div style={{ color: TX, fontWeight: 700, fontSize: 12 }}>Wohnanlage Sonnenweg 12</div>
            <div style={{ color: MU, fontSize: 10 }}>Sonnenweg 12, 12345 Musterstadt</div>
          </div>
          <div style={{ background: WH, borderRadius: 12, padding: 13, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
            <div style={{ color: MU, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, marginBottom: 6 }}>BESCHREIBUNG</div>
            <div style={{ color: T2, fontSize: 12, lineHeight: 1.6 }}>
              Wasserleck im Keller, es steht Wasser auf dem Boden. Leck gefunden und provisorisch abgedichtet.
            </div>
          </div>
          <div style={{ background: WH, borderRadius: 12, padding: 13, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
            <div style={{ color: MU, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, marginBottom: 8 }}>FOTO</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {["Vorher","Nachher"].map(l => (
                <div key={l} style={{ aspectRatio: "4/3", background: BG, borderRadius: 9,
                  border: `1.5px dashed ${BR}`, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <span style={{ fontSize: 22 }}>📷</span>
                  <span style={{ color: MU, fontSize: 9 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: WH, borderRadius: 12, padding: 13, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
            <div style={{ color: MU, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, marginBottom: 8 }}>STATUS</div>
            <Pill s="In Arbeit"/>
          </div>
          <div style={{ background: WH, borderRadius: 12, padding: 13, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
            <div style={{ color: MU, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, marginBottom: 8 }}>ARBEITSZEIT</div>
            <div style={{ display: "flex", gap: 20 }}>
              {[["Start","14.05.2024 11:20"],["Ende","14.05.2024 12:05"]].map(([l, v]) => (
                <div key={l}>
                  <div style={{ color: MU, fontSize: 9 }}>{l}</div>
                  <div style={{ fontWeight: 600, fontSize: 11, marginTop: 1 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <GBtn label="Als erledigt markieren" onClick={() => setDetail(false)}/>
            <GBtn label="Weitere Aktionen" variant="out" onClick={() => setEdit(true)}/>
          </div>
        </div>
        <BotNav active={tab} onTab={k => { setDetail(false); setTab(k); }}/>
      </div>
    </Phone>
  );

  if (route) return (
    <Phone>
      <div style={{ flex: 1, background: BG, display: "flex", flexDirection: "column" }}>
        <MobHead back title="Tagesroute" onBack={() => setRoute(false)}/>
        <div style={{ height: 168, background: "#dce8dc", flexShrink: 0, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#cfe8cf,#b8d8b8)" }}/>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <path d="M35,135 C70,80 110,100 150,65 C185,38 220,55 270,40"
              stroke="#fff" strokeWidth="7" fill="none" strokeLinecap="round"/>
            <path d="M35,135 C70,80 110,100 150,65 C185,38 220,55 270,40"
              stroke={GR} strokeWidth="2.5" fill="none" strokeDasharray="8,5"/>
          </svg>
          {[[35,135,1],[110,90,2],[185,55,3],[265,42,4]].map(([x, y, n]) => (
            <div key={n} style={{
              position: "absolute", left: x - 13, top: y - 13, width: 26, height: 26,
              borderRadius: 99, background: GR, border: "2.5px solid #fff", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11,
              boxShadow: `0 2px 8px ${GR}66`,
            }}>{n}</div>
          ))}
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "0 12px" }}>
          {[["1","Ahornweg 5","09:00"],["2","Sonnenweg 12","11:00"],["3","Birkenstraße 3","13:00"],["4","Eichenweg 7","15:00"]].map(([n, a, t], i, arr) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0",
              borderBottom: i < arr.length - 1 ? `1px solid ${BR}` : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: GL, border: `1.5px solid ${GR}33`,
                display: "flex", alignItems: "center", justifyContent: "center", color: GR, fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{n}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: TX, fontWeight: 700, fontSize: 13 }}>{a}</div>
              </div>
              <div style={{ color: GR, fontWeight: 700, fontSize: 13 }}>{t}</div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 10, padding: "10px 0" }}>
            {[["24,3 km","Distanz"],["~52 Min.","Fahrzeit"],["7","Aufgaben"]].map(([v, l]) => (
              <div key={l} style={{ flex: 1, background: WH, borderRadius: 10, padding: "10px 8px",
                textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ color: TX, fontWeight: 800, fontSize: 14 }}>{v}</div>
                <div style={{ color: MU, fontSize: 9, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <BotNav active={tab} onTab={k => { setRoute(false); setTab(k); }}/>
      </div>
    </Phone>
  );

  const mainScreens = {
    d: (
      <div style={{ flex: 1, background: BG, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, overflow: "auto" }}>
          <div style={{ background: `linear-gradient(140deg,${GR},${GD})`, margin: 12, borderRadius: 14,
            padding: "14px 16px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: -8, top: -8, fontSize: 56, opacity: 0.08 }}>🏠</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 10 }}>Guten Morgen,</div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>Max Mustermann</div>
                <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 10, marginTop: 1 }}>Dienstag, 14. Mai 2024</div>
              </div>
              <span style={{ color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 16 }}>✕</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, margin: "0 12px" }}>
            {[["8","Meine Aufgaben"],["3","Offene Meldungen"],["2","Fällige Routinearbeiten"],["1","Sonderaufträge"]].map(([n, l]) => (
              <div key={l} style={{ background: WH, borderRadius: 12, padding: "12px 13px", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <div style={{ color: TX, fontWeight: 900, fontSize: 24 }}>{n}</div>
                <div style={{ color: MU, fontSize: 10, marginTop: 2, lineHeight: 1.3 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "14px 12px 0" }}>
            <div style={{ color: TX, fontWeight: 800, fontSize: 13, marginBottom: 8 }}>Heute</div>
            {[
              ["09:00","🔧","Heizungswartung","Obj.: Ahornweg 5"],
              ["11:00","🗑️","Mülltonnen bereitstellen","Obj.: Ahornweg 5"],
              ["14:00","🏠","Spielplatzkontrolle","Obj.: Ahornweg 5"],
            ].map(([t, ic, ti, sub]) => (
              <div key={ti} onClick={() => setDetail(true)} style={{ display: "flex", gap: 10, padding: "9px 0",
                borderBottom: `1px solid ${BR}`, alignItems: "center", cursor: "pointer" }}>
                <span style={{ color: MU, fontSize: 11, fontWeight: 600, width: 36, flexShrink: 0 }}>{t}</span>
                <span style={{ fontSize: 16 }}>{ic}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: TX, fontWeight: 700, fontSize: 12 }}>{ti}</div>
                  <div style={{ color: MU, fontSize: 10 }}>{sub}</div>
                </div>
                <span style={{ color: ML, fontSize: 16 }}>›</span>
              </div>
            ))}
          </div>
        </div>
        <BotNav active="d" onTab={setTab}/>
      </div>
    ),
    t: (
      <div style={{ flex: 1, background: BG, display: "flex", flexDirection: "column" }}>
        <div style={{ background: WH, padding: "10px 14px", borderBottom: `1px solid ${BR}`, flexShrink: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: TX }}>Aufgaben</div>
        </div>
        <div style={{ display: "flex", background: WH, borderBottom: `1px solid ${BR}`, flexShrink: 0 }}>
          {[["o","Offen"],["i","In Arbeit"],["e","Erledigt"]].map(([k, l]) => (
            <div key={k} onClick={() => setAtab(k)} style={{ flex: 1, padding: "9px 0", textAlign: "center",
              fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all .15s",
              color: atab === k ? GR : MU,
              borderBottom: atab === k ? `2.5px solid ${GR}` : "2.5px solid transparent" }}>{l}</div>
          ))}
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "10px 12px" }}>
          {filtered.map(task => (
            <div key={task.id} onClick={() => setDetail(true)} style={{ background: WH, borderRadius: 12,
              padding: "11px 13px", marginBottom: 8, display: "flex", alignItems: "center", gap: 10,
              cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div style={{ width: 9, height: 9, borderRadius: 99, background: dotC(task.s), flexShrink: 0 }}/>
              <span style={{ fontSize: 16 }}>{task.ico}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: TX, fontWeight: 700, fontSize: 12 }}>{task.t}</div>
                <div style={{ color: MU, fontSize: 10 }}>{task.l} · {task.ti}</div>
              </div>
              <span style={{ color: ML, fontSize: 16 }}>›</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: 28, color: MU, fontSize: 12 }}>Keine Aufgaben</div>
          )}
        </div>
        <div style={{ padding: "10px 12px", background: WH, borderTop: `1px solid ${BR}`, flexShrink: 0 }}>
          <GBtn label="+ Aufgabe erstellen"/>
        </div>
        <BotNav active="t" onTab={setTab}/>
      </div>
    ),
    m: (
      <div style={{ flex: 1, background: BG, display: "flex", flexDirection: "column" }}>
        <div style={{ background: WH, padding: "10px 14px", borderBottom: `1px solid ${BR}`, flexShrink: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 14 }}>Meldungen</div>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "10px 12px" }}>
          {[
            { id:"#2024-000123", obj:"Wohnanlage Sonnenweg 12", typ:"Wasserschaden", s:"In Arbeit", ti:"Heute, 11:05" },
            { id:"#2024-000122", obj:"Ahornweg 5",              typ:"Beleuchtung",   s:"Neu",       ti:"Heute, 09:15" },
            { id:"#2024-000121", obj:"Birkenstraße 3",          typ:"Heizung",       s:"Zugewiesen",ti:"Gestern" },
          ].map(m => (
            <div key={m.id} onClick={() => setDetail(true)} style={{ background: WH, borderRadius: 12, padding: "12px 13px",
              marginBottom: 8, cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ color: MU, fontSize: 10 }}>{m.id}</span>
                <Pill s={m.s} small/>
              </div>
              <div style={{ color: TX, fontWeight: 700, fontSize: 12 }}>{m.obj}</div>
              <div style={{ color: MU, fontSize: 10, marginTop: 2 }}>{m.typ} · {m.ti}</div>
            </div>
          ))}
        </div>
        <BotNav active="m" onTab={setTab}/>
      </div>
    ),
    x: (
      <div style={{ flex: 1, background: BG, display: "flex", flexDirection: "column" }}>
        <div style={{ background: WH, padding: "10px 14px", borderBottom: `1px solid ${BR}`, flexShrink: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 14 }}>Mehr</div>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "10px 12px" }}>
          {[
            { ic:"🗺️", lb:"Tagesroute",       sub:"4 Stopps geplant",    action: () => setRoute(true) },
            { ic:"❄️",  lb:"Winterdienst",      sub:"Glättegefahr aktiv!", action: null },
            { ic:"📦",  lb:"Material anfragen", sub:"Streusalz, Lampen…",  action: null },
            { ic:"📷",  lb:"Fotos hochladen",   sub:"Vorher-/Nachher",     action: null },
            { ic:"🎤",  lb:"Spracheingabe",     sub:"Diktat für Berichte", action: null },
          ].map(item => (
            <div key={item.lb} onClick={item.action || undefined} style={{ background: WH, borderRadius: 12,
              padding: "12px 13px", marginBottom: 8, display: "flex", gap: 12, alignItems: "center",
              cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: GL,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.ic}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: TX, fontWeight: 700, fontSize: 13 }}>{item.lb}</div>
                <div style={{ color: MU, fontSize: 10 }}>{item.sub}</div>
              </div>
              <span style={{ color: ML, fontSize: 16 }}>›</span>
            </div>
          ))}
        </div>
        <BotNav active="x" onTab={setTab}/>
      </div>
    ),
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <Phone>{mainScreens[tab]}</Phone>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["d","t","m","x"].map(k => (
            <div key={k} onClick={() => setTab(k)} style={{
              height: 7, borderRadius: 99, cursor: "pointer",
              width: tab === k ? 24 : 7,
              background: tab === k ? "#fff" : "rgba(255,255,255,0.25)",
              transition: "all .2s",
            }}/>
          ))}
        </div>
        <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>
          {{"d":"Dashboard","t":"Aufgaben","m":"Meldungen","x":"Mehr"}[tab]}
        </div>
      </div>
    </div>
  );
}
