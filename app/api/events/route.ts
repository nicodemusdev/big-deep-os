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

// GET /api/events — fetch all Big Deep events from Google Calendar
export async function GET() {
  try {
    const auth     = getAuth();
    const calendar = google.calendar({ version: "v3", auth });

    const res = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin:    new Date("2026-04-01").toISOString(),
      timeMax:    new Date("2027-12-31").toISOString(),
      maxResults: 250,
      singleEvents: true,
      orderBy:    "startTime",
    });

    const events = (res.data.items || []).map((e) => ({
      id:          e.id,
      title:       e.summary,
      description: e.description || "",
      location:    e.location    || "",
      start:       e.start?.date || e.start?.dateTime || "",
      end:         e.end?.date   || e.end?.dateTime   || "",
      allDay:      !!e.start?.date,
      colorId:     e.colorId    || "",
      htmlLink:    e.htmlLink   || "",
    }));

    return NextResponse.json(events);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("GET /api/events error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST /api/events — create a new event
export async function POST(request: Request) {
  try {
    const auth     = getAuth();
    const calendar = google.calendar({ version: "v3", auth });

    const body = await request.json();
    const { title, description, location, start, end, allDay, colorId } = body;

    if (!title || !start || !end) {
      return NextResponse.json(
        { error: "title, start, and end are required" },
        { status: 400 }
      );
    }

    const startObj = allDay
      ? { date: start }
      : { dateTime: start, timeZone: "America/New_York" };

    const endObj = allDay
      ? { date: end }
      : { dateTime: end, timeZone: "America/New_York" };

    const event = await calendar.events.insert({
      calendarId: CALENDAR_ID,
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
    console.error("POST /api/events error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
