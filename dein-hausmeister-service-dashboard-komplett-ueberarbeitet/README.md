# Dein-Hausmeister-Service Dashboard

Dieses Projekt ist ein simples Dashboard für deinen Hausmeister-Service:

- Bewohner scannen einen QR-Code und können **Schäden melden** (mit Name & optional Foto-Hinweis).
- Die Hausverwaltung sieht alle Meldungen im **Dashboard**, kann filtern und
  entscheiden, ob **Hausmeister** oder **Handwerker** zuständig ist.
- Status-Workflow: `Eingegangen` → `In Bearbeitung` → `Freigegeben` → `Erledigt`.

> **Wichtig:** Die Tickets werden aktuell nur **im Arbeitsspeicher** gespeichert
> (In-Memory-Datenbank in `app/api/tickets/data.js`). Für den echten produktiven
> Einsatz solltest du eine richtige Datenbank (PostgreSQL, MySQL, Supabase etc.)
> anbinden.

## Tech-Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- React
- Tailwind CSS
- Deployment z. B. bei Vercel

## Entwicklung

```bash
npm install
npm run dev
```

Dann im Browser: http://localhost:3000

- `http://localhost:3000/` → Dashboard (Hausverwaltung)
- `http://localhost:3000/report` → Schaden melden (für Bewohner, QR-Code-Ziel)

## QR-Code verwenden

1. Projekt deployen (z. B. `https://dein-hausmeister-service-dashbord-f-iota.vercel.app`).
2. Die URL `https://deine-domain/report` in einen QR-Code-Generator einfügen.
3. QR-Code im Hausflur / Aufzug / Infotafel aushängen.

## Deployment auf Vercel

1. Repository bei GitHub anlegen und diesen Code pushen.
2. In Vercel ein neues Projekt erstellen und das GitHub-Repo verbinden.
3. Framework: **Next.js**
4. Build Command: `npm run build`
5. Output: `.next`

Fertig 🙂 Jetzt kannst du Bewohnern den QR-Code geben und im Dashboard arbeiten.

## Debug-Hinweise für Tests

- Das Formular unter `/report` zeigt im Erfolgsfall eine Debug-Zeile mit Ticket-ID und aktueller Ticketanzahl.
- Die API `POST /api/tickets` loggt Request-Body, angelegte Tickets und Fehler in die Server-Logs (z.B. Vercel Logs).
- Wenn die WhatsApp-Konfiguration (Token/Phone Number ID) fehlt, wird dies im Log vermerkt, die Meldung wird aber trotzdem gespeichert.
