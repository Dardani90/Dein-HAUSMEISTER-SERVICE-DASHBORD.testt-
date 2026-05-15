"use client";
import { useState } from "react";
import { GR, GD, GL, BG, WH, TX, MU, BR, F } from "../../lib/theme";

export default function ReportPage() {
  const [objekt, setObjekt]             = useState("Wohnanlage Sonnenweg 12");
  const [melderName, setMelderName]     = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [file, setFile]                 = useState(null);
  const [submitting, setSubmitting]     = useState(false);
  const [done, setDone]                 = useState(false);
  const [error, setError]               = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    if (!beschreibung.trim()) { setError("Bitte Beschreibung eingeben."); return; }
    try {
      setSubmitting(true);
      setError("");
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          objekt,
          melderName: melderName.trim() || "Anonym",
          beschreibung: beschreibung.trim(),
          hasPhoto: !!file,
        }),
      });
      if (!res.ok) throw new Error("Meldung konnte nicht gespeichert werden.");
      setDone(true);
      setBeschreibung("");
      setFile(null);
    } catch (e) {
      setError(e.message || "Fehler beim Senden.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center",
      justifyContent: "center", padding: 24, fontFamily: F }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: 340 }}>
        <div style={{ width: 76, height: 76, borderRadius: 99, background: `linear-gradient(135deg,${GR},${GD})`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, color: "#fff",
          marginBottom: 22, boxShadow: `0 8px 28px ${GR}55` }}>✓</div>
        <div style={{ color: TX, fontWeight: 800, fontSize: 22, marginBottom: 10 }}>Meldung eingereicht!</div>
        <div style={{ color: MU, fontSize: 13, lineHeight: 1.7, marginBottom: 28 }}>
          Vielen Dank. Ihre Meldung wurde erfolgreich übermittelt.<br/>
          Die Hausverwaltung kümmert sich nun darum.
        </div>
        <button onClick={() => setDone(false)} style={{
          background: `linear-gradient(150deg,${GR},${GD})`, color: "#fff", border: "none",
          borderRadius: 13, padding: "13px 32px", fontSize: 14, fontWeight: 700,
          cursor: "pointer", fontFamily: F, boxShadow: `0 4px 14px ${GR}44`,
        }}>
          Weitere Meldung senden
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center",
      justifyContent: "center", padding: "24px 16px", fontFamily: F }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg,${GR},${GD})`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 14px" }}>🏠</div>
          <div style={{ color: TX, fontWeight: 900, fontSize: 20 }}>Schaden melden</div>
          <div style={{ color: MU, fontSize: 12, marginTop: 4 }}>Diese Meldung geht direkt an die Hausverwaltung.</div>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: WH, borderRadius: 12, padding: 13, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
            <div style={{ color: MU, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, marginBottom: 8 }}>OBJEKT</div>
            <select value={objekt} onChange={e => setObjekt(e.target.value)}
              style={{ width: "100%", background: BG, border: `1px solid ${BR}`,
                borderRadius: 9, padding: "9px 11px", fontSize: 12, color: TX, outline: "none", fontFamily: F }}>
              <option>Wohnanlage Sonnenweg 12</option>
              <option>Ahornweg 5</option>
              <option>Birkenstraße 3</option>
            </select>
          </div>
          <div style={{ background: WH, borderRadius: 12, padding: 13, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
            <div style={{ color: MU, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, marginBottom: 8 }}>NAME (OPTIONAL)</div>
            <input type="text" value={melderName} onChange={e => setMelderName(e.target.value)}
              placeholder="Max Mustermann" style={{ width: "100%", background: BG, border: `1px solid ${BR}`,
                borderRadius: 9, padding: "9px 11px", fontSize: 12, color: TX, outline: "none",
                fontFamily: F, boxSizing: "border-box" }}/>
          </div>
          <div style={{ background: WH, borderRadius: 12, padding: 13, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
            <div style={{ color: MU, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, marginBottom: 8 }}>BESCHREIBUNG *</div>
            <textarea value={beschreibung} onChange={e => setBeschreibung(e.target.value)}
              placeholder="Bitte kurz beschreiben, was passiert ist (Ort, Etage, Raum …)"
              style={{ width: "100%", minHeight: 90, background: BG, border: `1px solid ${BR}`,
                borderRadius: 9, padding: "8px 10px", fontSize: 12, color: TX, outline: "none",
                resize: "none", boxSizing: "border-box", fontFamily: F, lineHeight: 1.5 }}/>
          </div>
          <div style={{ background: WH, borderRadius: 12, padding: 13, boxShadow: "0 1px 5px rgba(0,0,0,0.07)" }}>
            <div style={{ color: MU, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, marginBottom: 8 }}>FOTO HINZUFÜGEN (OPTIONAL)</div>
            <div style={{ border: `2px dashed ${BR}`, borderRadius: 10, padding: "16px 0",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
              background: BG, cursor: "pointer", position: "relative" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: WH, border: `1px solid ${BR}`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📷</div>
              <span style={{ color: MU, fontSize: 11 }}>{file ? file.name : "Foto aufnehmen oder auswählen"}</span>
              <input type="file" accept="image/*" capture="environment"
                onChange={e => setFile(e.target.files?.[0] || null)}
                style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}/>
            </div>
          </div>
          {error && (
            <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10,
              padding: "10px 13px", color: "#DC2626", fontSize: 12 }}>{error}</div>
          )}
          <button type="submit" disabled={submitting} style={{
            background: submitting ? "#9CA3AF" : `linear-gradient(150deg,${GR},${GD})`,
            color: "#fff", border: "none", borderRadius: 13, padding: "13px 0",
            fontSize: 14, fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer",
            fontFamily: F, boxShadow: submitting ? "none" : `0 4px 14px ${GR}44`,
          }}>
            {submitting ? "Wird gesendet …" : "Meldung absenden"}
          </button>
          <div style={{ color: MU, fontSize: 10, textAlign: "center" }}>
            Mit dem Absenden stimmst du zu, dass deine Daten zur Bearbeitung der Meldung gespeichert werden.
          </div>
        </form>
      </div>
    </div>
  );
}
