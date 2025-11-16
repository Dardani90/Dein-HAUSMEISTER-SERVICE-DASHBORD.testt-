"use client";

import { useState } from "react";

export default function ReportPage() {
  const [objekt, setObjekt] = useState("Haus A");
  const [melderName, setMelderName] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    if (!beschreibung.trim()) {
      setError("Bitte Beschreibung eingeben.");
      setDebugInfo("Debug: Beschreibung war leer, Request wurde nicht gesendet.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setDone(false);
      setDebugInfo("Debug: Sende Anfrage an /api/tickets …");

      const payload = {
        objekt,
        melderName: melderName.trim() || "Anonym",
        beschreibung: beschreibung.trim(),
        hasPhoto: !!file
      };

      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok)
        throw new Error("Meldung konnte nicht gespeichert werden.");

      const data = await res.json();
      console.log("Debug: Antwort von /api/tickets:", data);

      setDone(true);
      setBeschreibung("");
      setFile(null);
      setDebugInfo(
        `Debug: Ticket wurde erfolgreich gespeichert. Ticket-ID: ${
          data?.ticket?.id ?? "unbekannt"
        } (insgesamt: ${data?.tickets?.length ?? "?"} Tickets).`
      );
    } catch (e) {
      console.error(e);
      setError(e.message || "Fehler beim Senden.");
      setDebugInfo(
        `Debug: Fehler beim Senden der Meldung: ${
          e.message || "Unbekannter Fehler"
        }`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10 bg-slate-100">
      <div className="card max-w-lg w-full">
        <div className="card-header flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Dein Hausmeister-Service Logo"
            className="h-14 w-auto mb-2"
          />
          <h1 className="card-title">Schaden melden</h1>
          <p className="text-xs text-slate-500">
            Diese Meldung geht direkt an die Hausverwaltung.
          </p>
        </div>
        <form className="card-body space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Objekt
            </label>
            <select
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm"
              value={objekt}
              onChange={e => setObjekt(e.target.value)}
            >
              <option value="Haus A">Haus A</option>
              <option value="Musterstraße 5">Musterstraße 5</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Name des Melders (optional)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm"
              placeholder="Max Mustermann"
              value={melderName}
              onChange={e => setMelderName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Beschreibung des Schadens
            </label>
            <textarea
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm min-h-[100px]"
              placeholder="Bitte kurz beschreiben, was passiert ist (Ort, Etage, Raum …)"
              value={beschreibung}
              onChange={e => setBeschreibung(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Foto anhängen (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="w-full text-xs text-slate-600"
              onChange={e => setFile(e.target.files?.[0] || null)}
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Fotos helfen, den Schaden schneller einzuschätzen. Es wird nur
              gespeichert, dass ein Foto vorhanden ist – die eigentliche
              Datei-Anbindung kannst du später im Backend ergänzen.
            </p>
          </div>

          {error && (
            <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 px-3 py-2 rounded-xl">
              {error}
            </div>
          )}

          {done && (
            <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl">
              Vielen Dank! Deine Meldung wurde übermittelt. Die Hausverwaltung
              kümmert sich nun darum.
            </div>
          )}

          {debugInfo && (
            <div className="text-[11px] text-slate-600 bg-slate-100 border border-dashed border-slate-300 px-3 py-2 rounded-xl">
              <span className="font-semibold">Debug:</span> {debugInfo}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm font-medium shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Meldung wird gesendet …" : "Meldung absenden"}
          </button>

          <p className="text-[11px] text-slate-400 text-center">
            Mit dem Absenden stimmst du zu, dass deine Daten zur Bearbeitung der
            Meldung gespeichert werden.
          </p>
        </form>
      </div>
    </main>
  );
}
