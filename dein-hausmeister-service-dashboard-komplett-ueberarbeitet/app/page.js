"use client";

import { useEffect, useState } from "react";
import FiltersBar from "../components/FiltersBar";
import TicketsTable from "../components/TicketsTable";

export default function DashboardPage() {
  const [tab, setTab] = useState("meldungen");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [objektFilter, setObjektFilter] = useState("Alle Objekte");
  const [statusFilter, setStatusFilter] = useState("Jeder Status");
  const [responsibilityFilter, setResponsibilityFilter] =
    useState("Jede Verantwortung");
  const [error, setError] = useState("");

  const loadTickets = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/tickets");
      if (!res.ok) throw new Error("Fehler beim Laden der Meldungen");
      const data = await res.json();
      setTickets(data.tickets);
    } catch (e) {
      setError(e.message || "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleUpdateTicket = async (id, updates) => {
    try {
      setError("");
      const res = await fetch(`/api/tickets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error("Update fehlgeschlagen");
      const data = await res.json();
      setTickets(data.tickets);
    } catch (e) {
      console.error(e);
      setError(e.message || "Update fehlgeschlagen");
    }
  };

  const qrUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/report`
      : "https://dein-hausmeister-service-dashbord-f-iota.vercel.app/report";

  return (
    <>
      <header className="app-header">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Dein Hausmeister-Service Logo"
            className="h-12 w-auto"
          />
          <div className="flex flex-col">
            <div className="text-base font-semibold text-slate-800">
              Dein Hausmeister-Service
            </div>
            <div className="text-xs text-slate-500 -mt-1">
              Zuhause ist das Wichtigste
            </div>
          </div>
        </div>


      </header>

      <main className="app-main space-y-4">
        <nav className="app-nav">
          <button
            className={`app-nav-button ${
              tab === "meldungen"
                ? "app-nav-button-active"
                : "app-nav-button-inactive"
            }`}
            onClick={() => setTab("meldungen")}
          >
            Meldungen
          </button>
          <button
            className={`app-nav-button ${
              tab === "verlauf"
                ? "app-nav-button-active"
                : "app-nav-button-inactive"
            }`}
            onClick={() => setTab("verlauf")}
          >
            Verlauf
          </button>
        </nav>

        <section className="card">
          <div className="card-header">
            <h2 className="card-title">
              {tab === "meldungen"
                ? "Aktuelle Schadenmeldungen"
                : "Verlauf & Historie"}
            </h2>
            <FiltersBar
              objekt={objektFilter}
              setObjekt={setObjektFilter}
              status={statusFilter}
              setStatus={setStatusFilter}
              responsibility={responsibilityFilter}
              setResponsibility={setResponsibilityFilter}
            />
          </div>
          <div className="card-body">
            {loading && (
              <div className="text-sm text-slate-500 mb-2">
                Lade Meldungen …
              </div>
            )}
            {error && (
              <div className="mb-3 text-xs text-rose-600 bg-rose-50 border border-rose-200 px-3 py-2 rounded-xl">
                {error}
              </div>
            )}
            <TicketsTable
              tickets={tickets}
              objektFilter={objektFilter}
              statusFilter={statusFilter}
              responsibilityFilter={responsibilityFilter}
              onUpdateTicket={handleUpdateTicket}
            />
          </div>
        </section>
      </main>
    </>
  );
}
