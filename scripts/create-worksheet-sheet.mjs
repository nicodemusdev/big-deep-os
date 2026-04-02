/**
 * Run ONCE to create the "Big Deep OS — Campaign Worksheets" Google Spreadsheet.
 * Usage:
 *   node scripts/create-worksheet-sheet.mjs
 *
 * Requires credentials.json in the repo root (same file used for calendar setup).
 * Make sure you've already run get-refresh-token.mjs and have a refresh token.
 */

import { readFileSync } from "fs";
import { google } from "googleapis";

const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
if (!REFRESH_TOKEN) {
  console.error("\n❌  Set GOOGLE_REFRESH_TOKEN in your environment first.");
  console.error("    e.g. GOOGLE_REFRESH_TOKEN=your_token node scripts/create-worksheet-sheet.mjs\n");
  process.exit(1);
}

let credentials;
try {
  credentials = JSON.parse(readFileSync("credentials.json", "utf-8"));
} catch {
  console.error("\n❌  Could not read credentials.json — make sure it's in the repo root.\n");
  process.exit(1);
}

const { client_id, client_secret } = credentials.installed || credentials.web;
const oauth2Client = new google.auth.OAuth2(client_id, client_secret);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sheets = google.sheets({ version: "v4", auth: oauth2Client });

async function main() {
  console.log("\n Creating Big Deep OS — Campaign Worksheets spreadsheet...\n");

  const res = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: "Big Deep OS — Campaign Worksheets",
      },
      sheets: [
        {
          properties: { title: "Index", gridProperties: { rowCount: 1000, columnCount: 6 } },
        },
      ],
    },
  });

  const spreadsheetId  = res.data.spreadsheetId;
  const spreadsheetUrl = res.data.spreadsheetUrl;
  const indexSheetId   = res.data.sheets?.[0]?.properties?.sheetId;

  // Write Index header row
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Index!A1:E1",
    valueInputOption: "RAW",
    requestBody: {
      values: [["Campaign Name", "Saved By", "Date", "Sheet Tab", "Field Count"]],
    },
  });

  // Bold + freeze the header row in Index
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          repeatCell: {
            range: { sheetId: indexSheetId, startRowIndex: 0, endRowIndex: 1 },
            cell: { userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.2, green: 0.6, blue: 0.9 } } },
            fields: "userEnteredFormat.textFormat,userEnteredFormat.backgroundColor",
          },
        },
        {
          updateSheetProperties: {
            properties: { sheetId: indexSheetId, gridProperties: { frozenRowCount: 1 } },
            fields: "gridProperties.frozenRowCount",
          },
        },
      ],
    },
  });

  console.log("✅  Spreadsheet created!\n");
  console.log("──────────────────────────────────────────────────────────");
  console.log(`  Spreadsheet URL: ${spreadsheetUrl}`);
  console.log("──────────────────────────────────────────────────────────\n");
  console.log("Add this to your Vercel environment variables:\n");
  console.log(`  GOOGLE_SHEETS_WORKSHEET_ID=${spreadsheetId}\n`);
  console.log("Then redeploy Vercel. The worksheet save/load will be live.\n");
  console.log("Also share the spreadsheet with Lizzie and Luke:");
  console.log("  Open the URL above → Share → Add their Gmail addresses.\n");
}

main().catch(err => {
  console.error("Error:", err.message);
  process.exit(1);
});
