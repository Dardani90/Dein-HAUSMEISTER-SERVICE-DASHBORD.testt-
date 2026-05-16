"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import WebBar from "./WebBar";
import { GR, GD, GL, BG, WH, TX, T2, MU, ML, BR, B2, BL, OR } from "../lib/theme";

const INIT_ROLLEN = [
  { id:1, name:"Max Mustermann",  email:"max@hausmeister.de",   telefon:"0176 12345678", objekte:["Ahornweg 5","Sonnenweg 12"],  berechtigungen:["Aufgaben verwalten","Meldungen bearbeiten","QR-Codes scannen"], status:"Aktiv",   erstellt:"01.05.2024" },
  { id:2, name:"Anna Schmidt",    email:"anna@hausmeister.de",  telefon:"0171 98765432", objekte:["Birkenstraße 3"],             berechtigungen:["Aufgaben verwalten","Meldungen bearbeiten","Rechnungen einsehen","QR-Codes scannen","Berichte erstellen"], status:"Aktiv",   erstellt:"15.04.2024" },
  { id:3, name:"Peter Müller",    email:"peter@hausmeister.de", telefon:"0172 11223344", objekte:["Eichenweg 7"],                berechtigungen:["Aufgaben verwalten","QR-Codes scannen"], status:"Inaktiv", erstellt:"20.03.2024" },
];

const INIT_INV = [
  { nr:"RE-2024-000123", hausmeister:"Max Mustermann", datum:"14.05.2024", betrag:"150,00 €", s:"Bezahlt" },
  { nr:"RE-2024-000122", hausmeister:"Anna Schmidt",   datum:"10.05.2024", betrag:"300,00 €", s:"Bezahlt" },
  { nr:"RE-2024-000121", hausmeister:"Max Mustermann", datum:"08.05.2024", betrag:"500,00 €", s:"Offen"   },
  { nr:"RE-2024-000120", hausmeister:"Peter Müller",   datum:"05.05.2024", betrag:"150,00 €", s:"Bezahlt" },
];

const OBJEKTE_LIST    = ["Ahornweg 5","Ahornweg 7","Sonnenweg 12","Birkenstraße 3","Eichenweg 7"];
const BERECHT_LIST    = ["Aufgaben verwalten","Meldungen bearbeiten","Rechnungen einsehen","QR-Codes scannen","Berichte erstellen"];

const rolleStyle  = s => s === "Aktiv"   ? { c: GR, bg: GL }         : { c: MU, bg: B2         };
const invStyle    = s => s === "Bezahlt" ? { c: GR, bg: GL }         : { c: OR, bg: "#FFF3E0"  };

const toggle = (arr, val) => arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

export default function HausmeisterService() {
  const [nav, setNav]         = useState("rollen");
  const [rollen, setRollen]   = useState(INIT_ROLLEN);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]       = useState({ name:"", email:"", telefon:"", objekte:[], berechtigungen:[] });
  const [formErr, setFormErr] = useState("");
  const [invSel, setInvSel]   = useState(0);

  const ITEMS = [
    ["rollen",       "👷", "Hausmeister-Rollen"],
    ["rechnungen",   "💶", "Rechnungen"],
    ["einstellungen","⚙️", "Einstellungen"],
  ];

  const handleCreate = () => {
    if (!form.name.trim()) { setFormErr("Name ist erforderlich."); return; }
    const heute = new Date().toLocaleDateString("de-DE", { day:"2-digit", month:"2-digit", year:"numeric" });
    setRollen(prev => [{ id: Date.now(), ...form, status:"Aktiv", erstellt: heute }, ...prev]);
    setForm({ name:"", email:"", telefon:"", objekte:[], berechtigungen:[] });
    setFormErr("");
    setShowForm(false);
  };

  /* ── Rollen-Ansicht ──────────────────────────────────────── */
  const RollenView = () => (
    <div style={{ flex:1, overflow:"auto", padding:20 }}>
      {/* Statistik */}
      <div style={{ display:"flex", gap:14, marginBottom:18 }}>
        {[
          [rollen.filter(r=>r.status==="Aktiv").length,   "Aktive Hausmeister", GR, "👷"],
          [rollen.filter(r=>r.status==="Inaktiv").length, "Inaktive",           MU, "⏸️"],
          [rollen.length,                                  "Gesamt",             BL, "📋"],
        ].map(([n, l, c, ic]) => (
          <div key={l} style={{ flex:1, background:WH, borderRadius:12, padding:"15px 18px",
            border:`1px solid ${BR}`, boxShadow:"0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <div>
                <div style={{ color:MU, fontSize:10, fontWeight:700, letterSpacing:.5, marginBottom:6 }}>{l.toUpperCase()}</div>
                <div style={{ color:c, fontSize:30, fontWeight:900, letterSpacing:-1 }}>{n}</div>
              </div>
              <span style={{ fontSize:22 }}>{ic}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabelle + Formular */}
      <div style={{ background:WH, borderRadius:12, border:`1px solid ${BR}`,
        boxShadow:"0 1px 4px rgba(0,0,0,0.05)", overflow:"hidden" }}>

        {/* Header */}
        <div style={{ padding:"13px 18px", borderBottom:`1px solid ${BR}`,
          display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ fontWeight:700, fontSize:14, color:TX }}>Hausmeister-Rollen verwalten</div>
          <button onClick={() => { setShowForm(v => !v); setFormErr(""); }} style={{
            background: showForm ? BG : GR, color: showForm ? MU : "#fff",
            border: showForm ? `1px solid ${BR}` : "none", borderRadius:8,
            padding:"7px 16px", fontSize:12, fontWeight:700, cursor:"pointer",
            fontFamily:"inherit", transition:"all .15s",
            boxShadow: showForm ? "none" : `0 4px 12px ${GR}44`,
          }}>
            {showForm ? "✕ Abbrechen" : "+ Neue Rolle erstellen"}
          </button>
        </div>

        {/* Erstellungsformular */}
        {showForm && (
          <div style={{ padding:"20px 22px", borderBottom:`1px solid ${BR}`, background:BG }}>
            <div style={{ fontWeight:700, fontSize:13, color:TX, marginBottom:16 }}>
              Neue Hausmeister-Rolle erstellen
            </div>
            {/* Basisdaten */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:16 }}>
              {[["NAME *","name","text","Max Mustermann"],["E-MAIL","email","email","max@beispiel.de"],["TELEFON","telefon","tel","0176 12345678"]].map(([label, key, type, ph]) => (
                <div key={key}>
                  <div style={{ color:MU, fontSize:9, fontWeight:800, letterSpacing:.8, marginBottom:6 }}>{label}</div>
                  <input type={type} value={form[key]} placeholder={ph}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    style={{ width:"100%", background:WH, border:`1px solid ${BR}`,
                      borderRadius:8, padding:"9px 11px", fontSize:12, color:TX,
                      outline:"none", fontFamily:"inherit", boxSizing:"border-box" }}/>
                </div>
              ))}
            </div>
            {/* Objekte + Berechtigungen */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
              <div style={{ background:WH, borderRadius:10, padding:"14px 16px", border:`1px solid ${BR}` }}>
                <div style={{ color:MU, fontSize:9, fontWeight:800, letterSpacing:.8, marginBottom:10 }}>OBJEKTE ZUWEISEN</div>
                <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                  {OBJEKTE_LIST.map(obj => (
                    <label key={obj} style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer" }}>
                      <input type="checkbox" checked={form.objekte.includes(obj)}
                        onChange={() => setForm(f => ({ ...f, objekte: toggle(f.objekte, obj) }))}
                        style={{ accentColor:GR, width:14, height:14 }}/>
                      <span style={{ fontSize:12, color:TX }}>{obj}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div style={{ background:WH, borderRadius:10, padding:"14px 16px", border:`1px solid ${BR}` }}>
                <div style={{ color:MU, fontSize:9, fontWeight:800, letterSpacing:.8, marginBottom:10 }}>BERECHTIGUNGEN</div>
                <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                  {BERECHT_LIST.map(b => (
                    <label key={b} style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer" }}>
                      <input type="checkbox" checked={form.berechtigungen.includes(b)}
                        onChange={() => setForm(f => ({ ...f, berechtigungen: toggle(f.berechtigungen, b) }))}
                        style={{ accentColor:GR, width:14, height:14 }}/>
                      <span style={{ fontSize:12, color:TX }}>{b}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {formErr && (
              <div style={{ color:"#DC2626", fontSize:12, background:"#FEF2F2", border:"1px solid #FECACA",
                borderRadius:8, padding:"8px 12px", marginBottom:12 }}>{formErr}</div>
            )}
            <button onClick={handleCreate} style={{
              background:`linear-gradient(150deg,${GR},${GD})`, color:"#fff", border:"none",
              borderRadius:9, padding:"11px 28px", fontSize:13, fontWeight:700,
              cursor:"pointer", fontFamily:"inherit", boxShadow:`0 4px 12px ${GR}44`,
            }}>
              ✓ Rolle erstellen
            </button>
          </div>
        )}

        {/* Tabellen-Header */}
        <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1.4fr 1fr 2fr 0.8fr 0.9fr",
          padding:"9px 18px", background:B2, borderBottom:`1px solid ${BR}` }}>
          {["Name","E-Mail","Telefon","Berechtigungen","Status","Erstellt"].map(h => (
            <div key={h} style={{ color:MU, fontSize:10, fontWeight:700, letterSpacing:.5 }}>{h}</div>
          ))}
        </div>

        {/* Rollen-Zeilen */}
        {rollen.map((r, i) => {
          const { c, bg } = rolleStyle(r.status);
          return (
            <div key={r.id} style={{ display:"grid", gridTemplateColumns:"1.4fr 1.4fr 1fr 2fr 0.8fr 0.9fr",
              padding:"13px 18px", borderBottom: i < rollen.length-1 ? `1px solid ${BR}` : "",
              alignItems:"center", transition:"background .1s" }}
              onMouseEnter={e => e.currentTarget.style.background = BG}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <div style={{ fontWeight:700, color:TX, fontSize:13 }}>{r.name}</div>
              <div style={{ color:MU, fontSize:12 }}>{r.email}</div>
              <div style={{ color:MU, fontSize:12 }}>{r.telefon}</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                {r.berechtigungen.length > 0
                  ? r.berechtigungen.map(b => (
                      <span key={b} style={{ background:GL, color:"#2E7D32", fontSize:10,
                        fontWeight:600, padding:"2px 8px", borderRadius:20 }}>{b}</span>
                    ))
                  : <span style={{ color:ML, fontSize:11 }}>Keine</span>
                }
              </div>
              <span style={{ background:bg, color:c, borderRadius:20,
                padding:"3px 11px", fontSize:11, fontWeight:700 }}>{r.status}</span>
              <div style={{ color:MU, fontSize:12 }}>{r.erstellt}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ── Rechnungen-Ansicht ──────────────────────────────────── */
  const RechnungenView = () => {
    const cur = INIT_INV[invSel];
    return (
      <div style={{ flex:1, overflow:"auto", padding:20 }}>
        <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:14 }}>
          <button style={{ background:GR, color:"#fff", border:"none", borderRadius:8,
            padding:"8px 16px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
            display:"flex", gap:6, alignItems:"center", boxShadow:`0 4px 12px ${GR}44` }}>
            <span style={{ fontSize:16 }}>+</span> Neue Rechnung
          </button>
        </div>

        {/* Tabelle */}
        <div style={{ background:WH, borderRadius:12, border:`1px solid ${BR}`,
          boxShadow:"0 1px 4px rgba(0,0,0,0.05)", overflow:"hidden", marginBottom:20 }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1.5fr 1fr 1fr 1fr",
            padding:"9px 18px", background:B2, borderBottom:`1px solid ${BR}` }}>
            {["Rechnungsnr.","Hausmeister","Datum","Betrag","Status"].map(h => (
              <div key={h} style={{ color:MU, fontSize:10, fontWeight:700, letterSpacing:.5 }}>{h}</div>
            ))}
          </div>
          {INIT_INV.map((inv, i) => {
            const { c, bg } = invStyle(inv.s);
            return (
              <div key={inv.nr} onClick={() => setInvSel(i)} style={{
                display:"grid", gridTemplateColumns:"2fr 1.5fr 1fr 1fr 1fr",
                padding:"12px 18px", cursor:"pointer", transition:"background .12s",
                borderBottom: i < INIT_INV.length-1 ? `1px solid ${BR}` : "",
                background: invSel===i ? GL : "transparent" }}
                onMouseEnter={e => { if(invSel!==i) e.currentTarget.style.background=B2; }}
                onMouseLeave={e => { if(invSel!==i) e.currentTarget.style.background="transparent"; }}>
                <div style={{ color:BL, fontSize:12, fontWeight:600 }}>{inv.nr}</div>
                <div style={{ color:T2, fontSize:12 }}>{inv.hausmeister}</div>
                <div style={{ color:T2, fontSize:12 }}>{inv.datum}</div>
                <div style={{ color:TX, fontSize:12, fontWeight:700 }}>{inv.betrag}</div>
                <span style={{ background:bg, color:c, borderRadius:20,
                  padding:"2px 10px", fontSize:11, fontWeight:700 }}>{inv.s}</span>
              </div>
            );
          })}
        </div>

        {/* Vorschau */}
        <div style={{ background:WH, borderRadius:12, border:`1px solid ${BR}`,
          boxShadow:"0 1px 4px rgba(0,0,0,0.05)", padding:22 }}>
          <div style={{ fontWeight:700, fontSize:14, color:TX, marginBottom:16 }}>
            Rechnungsvorschau ({cur.nr})
          </div>
          <div style={{ border:`1px solid ${BR}`, borderRadius:10, padding:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                <div style={{ width:34, height:34, borderRadius:8,
                  background:`linear-gradient(135deg,${GR},${GD})`,
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🏠</div>
                <div>
                  <div style={{ fontWeight:800, fontSize:13 }}>Hausmeister-Service</div>
                  <div style={{ color:MU, fontSize:10 }}>Musterstraße 1 · 12345 Musterstadt</div>
                </div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontWeight:800, fontSize:16, color:TX }}>Rechnung</div>
                <div style={{ color:MU, fontSize:11 }}>{cur.nr}</div>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:20, fontSize:12 }}>
              <div>
                <div style={{ color:MU, fontSize:10, marginBottom:3 }}>Hausmeister</div>
                <div style={{ fontWeight:700 }}>{cur.hausmeister}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ color:MU, fontSize:10, marginBottom:3 }}>Datum</div>
                <div style={{ fontWeight:700 }}>{cur.datum}</div>
              </div>
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr style={{ borderBottom:`2px solid ${BR}`, background:B2 }}>
                  {["Beschreibung","Menge","Einzelpreis","Gesamt"].map(h => (
                    <th key={h} style={{ padding:"7px 8px", textAlign:"left", color:MU, fontWeight:700, fontSize:10 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom:`1px solid ${BR}` }}>
                  <td style={{ padding:"9px 8px", color:T2 }}>Hausmeister-Service Leistung</td>
                  <td style={{ padding:"9px 8px" }}>2,0 h</td>
                  <td style={{ padding:"9px 8px" }}>75,00 €</td>
                  <td style={{ padding:"9px 8px", fontWeight:700 }}>{cur.betrag}</td>
                </tr>
              </tbody>
            </table>
            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:14, paddingTop:14,
              borderTop:`2px solid ${TX}` }}>
              <div style={{ textAlign:"right" }}>
                <div style={{ color:MU, fontSize:11, marginBottom:2 }}>Gesamtbetrag</div>
                <div style={{ fontWeight:900, fontSize:22, color:TX, letterSpacing:-.5 }}>{cur.betrag}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ── Render ──────────────────────────────────────────────── */
  const titles = { rollen:"Hausmeister-Rollen", rechnungen:"Rechnungen", einstellungen:"Einstellungen" };

  return (
    <div style={{ display:"flex", height:"100%" }}>
      <Sidebar items={ITEMS} active={nav} onNav={setNav}/>
      <div style={{ flex:1, display:"flex", flexDirection:"column", background:BG, overflow:"hidden" }}>
        <WebBar title={titles[nav]} avatar="HS"/>
        <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
          {nav === "rollen"       && <RollenView/>}
          {nav === "rechnungen"   && <RechnungenView/>}
          {nav === "einstellungen" && (
            <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center",
              color:MU, fontSize:13 }}>Einstellungen – demnächst verfügbar</div>
          )}
        </div>
      </div>
    </div>
  );
}
