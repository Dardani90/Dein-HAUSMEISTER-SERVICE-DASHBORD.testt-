import { NextResponse } from "next/server";
import { getTickets, updateTicket } from "../data";

export async function PATCH(_request, { params }) {
  const id = Number(params.id);
  if (!id) {
    return NextResponse.json({ error: "Ungültige ID" }, { status: 400 });
  }

  try {
    const body = await _request.json();
    const allowed = {};
    if (body.status) allowed.status = body.status;
    if (body.verantwortung) allowed.verantwortung = body.verantwortung;

    const updated = updateTicket(id, allowed);
    if (!updated) {
      return NextResponse.json({ error: "Ticket nicht gefunden" }, { status: 404 });
    }

    const tickets = getTickets();
    return NextResponse.json({ ticket: updated, tickets });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Fehler beim Aktualisieren des Tickets." },
      { status: 500 }
    );
  }
}
