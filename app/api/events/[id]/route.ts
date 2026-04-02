import { NextResponse } from "next/server";
import { google } from "googleapis";

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!;

function getAuth() {
  const clientId     = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Missing Google OAuth env vars. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN in Vercel."
    );
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return oauth2Client;
}

// PATCH /api/events/[id] — update an existing event
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth     = getAuth();
    const calendar = google.calendar({ version: "v3", auth });
    const { id }   = await params;
    const body     = await request.json();
    const { title, description, location, start, end, allDay, colorId } = body;

    const startObj = allDay
      ? { date: start }
      : { dateTime: start, timeZone: "America/New_York" };
    const endObj = allDay
      ? { date: end }
      : { dateTime: end, timeZone: "America/New_York" };

    const event = await calendar.events.patch({
      calendarId: CALENDAR_ID,
      eventId:    id,
      requestBody: {
        summary:     title,
        description: description || "",
        location:    location    || "",
        start:       startObj,
        end:         endObj,
        colorId:     colorId || undefined,
      },
    });

    return NextResponse.json({
      id:          event.data.id,
      title:       event.data.summary,
      description: event.data.description || "",
      location:    event.data.location    || "",
      start:       event.data.start?.date || event.data.start?.dateTime || "",
      end:         event.data.end?.date   || event.data.end?.dateTime   || "",
      allDay:      !!event.data.start?.date,
      colorId:     event.data.colorId || "",
      htmlLink:    event.data.htmlLink || "",
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("PATCH /api/events/[id] error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// DELETE /api/events/[id] — delete an event
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth     = getAuth();
    const calendar = google.calendar({ version: "v3", auth });
    const { id }   = await params;

    await calendar.events.delete({
      calendarId: CALENDAR_ID,
      eventId:    id,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("DELETE /api/events/[id] error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
