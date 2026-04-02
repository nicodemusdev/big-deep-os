import { NextResponse } from "next/server";
import { google } from "googleapis";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_WORKSHEET_ID!;

function getAuth() {
  const clientId     = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Google OAuth env vars.");
  }
  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return oauth2Client;
}

// ─── Types ──────────────────────────────────────────────────────────────────

export type SavedField = {
  sectionId:    string;
  sectionLabel: string;
  fieldId:      string;
  fieldLabel:   string;
  fieldType:    "check" | "input";
  value:        string; // "true"/"false" for checks, text for inputs
};

export type CampaignMeta = {
  id:        string;   // sheetId (numeric) as string
  title:     string;   // tab name: "campaignName — date"
  campaign:  string;
  savedBy:   string;
  savedAt:   string;
  sections:  number;
  fields:    number;
};

// ─── GET — list all saved campaigns ─────────────────────────────────────────

export async function GET() {
  try {
    const auth   = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const meta = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
      fields: "sheets.properties",
    });

    const tabs = (meta.data.sheets || [])
      .map(s => s.properties)
      .filter(p => p?.title !== "Index");

    const campaigns: CampaignMeta[] = tabs.map(p => {
      const [campaign, ...rest] = (p?.title || "").split(" — ");
      return {
        id:       String(p?.sheetId ?? ""),
        title:    p?.title || "",
        campaign: campaign || p?.title || "",
        savedBy:  "",
        savedAt:  rest.join(" — ") || "",
        sections: 0,
        fields:   0,
      };
    });

    return NextResponse.json(campaigns.reverse());
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// ─── POST — save a campaign worksheet ───────────────────────────────────────

export async function POST(request: Request) {
  try {
    const auth   = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const body: {
      campaignName: string;
      savedBy:      string;
      fields:       SavedField[];
    } = await request.json();

    const { campaignName, savedBy, fields } = body;
    if (!campaignName || !fields?.length) {
      return NextResponse.json({ error: "campaignName and fields are required" }, { status: 400 });
    }

    const now      = new Date();
    const dateStr  = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const timeStr  = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    const tabTitle = `${campaignName} — ${dateStr}`;

    // Add a new sheet tab
    const addSheet = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{
          addSheet: {
            properties: {
              title: tabTitle,
              gridProperties: { rowCount: fields.length + 20, columnCount: 4 },
            },
          },
        }],
      },
    });

    const newSheetId = addSheet.data.replies?.[0]?.addSheet?.properties?.sheetId;

    // Build rows: header + one row per field
    const rows: string[][] = [
      // Header
      ["Big Deep OS — Campaign Worksheet"],
      [campaignName],
      [`Saved by: ${savedBy || "Jordan"}   |   ${dateStr} at ${timeStr}`],
      [""],
      ["Section", "Field", "Type", "Value"],
    ];

    let lastSection = "";
    for (const f of fields) {
      if (f.sectionLabel !== lastSection) {
        rows.push([""]); // blank line between sections
        lastSection = f.sectionLabel;
      }
      rows.push([
        f.sectionLabel,
        f.fieldLabel,
        f.fieldType === "check" ? "✓ Checkbox" : "Text",
        f.fieldType === "check"
          ? (f.value === "true" ? "✅ Done" : "☐ Not done")
          : f.value || "(blank)",
      ]);
    }

    // Write data to the new tab
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range:         `'${tabTitle}'!A1`,
      valueInputOption: "RAW",
      requestBody: { values: rows },
    });

    // Format: bold header rows, freeze top row
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [
          // Bold campaign title row
          {
            repeatCell: {
              range: { sheetId: newSheetId, startRowIndex: 0, endRowIndex: 3, startColumnIndex: 0, endColumnIndex: 4 },
              cell: { userEnteredFormat: { textFormat: { bold: true, fontSize: 12 } } },
              fields: "userEnteredFormat.textFormat",
            },
          },
          // Bold column headers
          {
            repeatCell: {
              range: { sheetId: newSheetId, startRowIndex: 4, endRowIndex: 5, startColumnIndex: 0, endColumnIndex: 4 },
              cell: { userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 } } },
              fields: "userEnteredFormat.textFormat,userEnteredFormat.backgroundColor",
            },
          },
          // Freeze top 5 rows
          {
            updateSheetProperties: {
              properties: { sheetId: newSheetId, gridProperties: { frozenRowCount: 5 } },
              fields: "gridProperties.frozenRowCount",
            },
          },
          // Auto-resize columns
          {
            autoResizeDimensions: {
              dimensions: { sheetId: newSheetId, dimension: "COLUMNS", startIndex: 0, endIndex: 4 },
            },
          },
        ],
      },
    });

    // Also update Index tab
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "Index!A:E",
        valueInputOption: "RAW",
        requestBody: {
          values: [[campaignName, savedBy || "Jordan", `${dateStr} ${timeStr}`, tabTitle, fields.length]],
        },
      });
    } catch { /* Index tab may not exist yet */ }

    return NextResponse.json({ success: true, tabTitle, sheetId: newSheetId });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("POST /api/worksheets error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
