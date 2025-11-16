"use client";

import { useMemo } from "react";
import StatusBadge from "./StatusBadge";
import ResponsibilityBadge from "./ResponsibilityBadge";

const STATUS_ORDER = {
  Eingegangen: 0,
  "In Bearbeitung": 1,
  Freigegeben: 2,
  Erledigt: 3
};

export default function TicketsTable({
  tickets,
  objektFilter,
  statusFilter,
  responsibilityFilter,
  onUpdateTicket
}) {
  const filtered = useMemo(() => {
    return tickets
      .filter(t =>
        objektFilter === "Alle Objekte" ? true : t.objekt === objektFilter
      )
      .filter(t =>
        statusFilter === "Jeder Status" ? true : t.status === statusFilter
      )
      .filter(t =>
        responsibilityFilter === "Jede Verantwortung"
          ? true
          : t.verantwortung === responsibilityFilter
      )
      .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status] || b.id - a.id);
  }, [tickets, objektFilter, statusFilter, responsibilityFilter]);

  const handleResponsibilityChange = async (id, verantwortung) => {
    await onUpdateTicket(id, { verantwortung });
  };

  const handleStatusChange = async (id, status) => {
    await onUpdateTicket(id, { status });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
            <th className="px-3 py-2 font-medium">#</th>
            <th className="px-3 py-2 font-medium">Objekt</th>
            <th className="px-3 py-2 font-medium">Beschreibung</th>
            <th className="px-3 py-2 font-medium">Name des Melders</th>
            <th className="px-3 py-2 font-medium">Status</th>
            <th className="px-3 py-2 font-medium">Verantwortung</th>
            <th className="px-3 py-2 font-medium text-right">Aktionen</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {filtered.map(ticket => (
            <tr key={ticket.id} className="hover:bg-slate-50">
              <td className="px-3 py-2 text-slate-500">{ticket.id}</td>
              <td className="px-3 py-2 whitespace-nowrap">{ticket.objekt}</td>
              <td className="px-3 py-2 max-w-xs">
                <div className="line-clamp-2">{ticket.beschreibung}</div>
                {ticket.hasPhoto && (
                  <div className="mt-1 text-[11px] text-slate-500">
                    📎 Foto vorhanden
                  </div>
                )}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-slate-700">
                {ticket.melderName || "–"}
              </td>
              <td className="px-3 py-2">
                <StatusBadge status={ticket.status} />
              </td>
              <td className="px-3 py-2">
                <ResponsibilityBadge value={ticket.verantwortung} />
              </td>
              <td className="px-3 py-2 text-right text-xs">
                <div className="flex gap-1 justify-end">
                  <select
                    className="px-2 py-1 rounded-lg border border-slate-200 bg-white"
                    value={ticket.status}
                    onChange={e => handleStatusChange(ticket.id, e.target.value)}
                  >
                    <option value="Eingegangen">Eingegangen</option>
                    <option value="In Bearbeitung">In Bearbeitung</option>
                    <option value="Freigegeben">Freigegeben</option>
                    <option value="Erledigt">Erledigt</option>
                  </select>
                  <select
                    className="px-2 py-1 rounded-lg border border-slate-200 bg-white"
                    value={ticket.verantwortung}
                    onChange={e =>
                      handleResponsibilityChange(ticket.id, e.target.value)
                    }
                  >
                    <option value="Hausmeister">Hausmeister</option>
                    <option value="Handwerker">Handwerker</option>
                  </select>
                </div>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td
                className="px-3 py-6 text-center text-slate-500 text-sm"
                colSpan={7}
              >
                Keine Meldungen für diese Filter gefunden.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
