let nextId = 5;

/**
 * In-Memory-Datenbank – nur Demo!
 * Für den echten Betrieb solltest du eine echte Datenbank einbinden
 * (z.B. PostgreSQL, PlanetScale, Supabase etc.).
 */
let TICKETS = [
  {
    id: 4,
    objekt: "Haus A",
    beschreibung: "Rohrbruch",
    status: "Freigegeben",
    verantwortung: "Handwerker",
    melderName: "Herr Schmidt",
    hasPhoto: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    objekt: "Musterstraße 5",
    beschreibung: "Heizung defekt",
    status: "In Bearbeitung",
    verantwortung: "Hausmeister",
    melderName: "Frau Müller",
    hasPhoto: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    objekt: "Haus A",
    beschreibung: "Türschloss klemmt",
    status: "Erledigt",
    verantwortung: "Hausmeister",
    melderName: "Anonym",
    hasPhoto: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 1,
    objekt: "Musterstraße 5",
    beschreibung: "Wasserleck im Keller",
    status: "Eingegangen",
    verantwortung: "Hausmeister",
    melderName: "Frau Beispiel",
    hasPhoto: true,
    createdAt: new Date().toISOString()
  }
];

export function getTickets() {
  return TICKETS.slice().sort((a, b) => b.id - a.id);
}

export function addTicket({ objekt, beschreibung, melderName, hasPhoto }) {
  const ticket = {
    id: nextId++,
    objekt,
    beschreibung,
    melderName,
    status: "Eingegangen",
    verantwortung: "Hausmeister",
    hasPhoto: !!hasPhoto,
    createdAt: new Date().toISOString()
  };
  TICKETS.push(ticket);
  return ticket;
}

export function updateTicket(id, updates) {
  const idx = TICKETS.findIndex(t => t.id === id);
  if (idx === -1) return null;
  TICKETS[idx] = {
    ...TICKETS[idx],
    ...updates
  };
  return TICKETS[idx];
}
