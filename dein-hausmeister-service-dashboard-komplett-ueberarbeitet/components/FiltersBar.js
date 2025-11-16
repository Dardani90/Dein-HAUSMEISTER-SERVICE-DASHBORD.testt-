"use client";

export default function FiltersBar({
  objekt,
  setObjekt,
  status,
  setStatus,
  responsibility,
  setResponsibility
}) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <select
        className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm"
        value={objekt}
        onChange={e => setObjekt(e.target.value)}
      >
        <option value="Alle Objekte">Alle Objekte</option>
        <option value="Haus A">Haus A</option>
        <option value="Musterstraße 5">Musterstraße 5</option>
      </select>

      <select
        className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm"
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <option value="Jeder Status">Jeder Status</option>
        <option value="Eingegangen">Eingegangen</option>
        <option value="In Bearbeitung">In Bearbeitung</option>
        <option value="Freigegeben">Freigegeben</option>
        <option value="Erledigt">Erledigt</option>
      </select>

      <select
        className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm"
        value={responsibility}
        onChange={e => setResponsibility(e.target.value)}
      >
        <option value="Jede Verantwortung">Jede Verantwortung</option>
        <option value="Hausmeister">Hausmeister</option>
        <option value="Handwerker">Handwerker</option>
      </select>
    </div>
  );
}
