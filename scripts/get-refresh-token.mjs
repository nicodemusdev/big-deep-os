/**
 * Run this ONCE to get your Google OAuth refresh token.
 * Usage:
 *   1. Put your downloaded OAuth JSON credentials file in this folder as "credentials.json"
 *   2. Run: node scripts/get-refresh-token.mjs
 *   3. Visit the URL it prints, approve access, paste the code back
 *   4. Copy the refresh_token it prints into your Vercel env vars
 */

import { readFileSync } from "fs";
import { createInterface } from "readline";
import { google } from "googleapis";

const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/spreadsheets",
];

// Load credentials JSON (the file you downloaded from Google Cloud Console)
let credentials;
try {
  credentials = JSON.parse(readFileSync("credentials.json", "utf-8"));
} catch {
  console.error("\n❌  Could not read credentials.json");
  console.error("    Make sure you copied your OAuth credentials JSON to the repo root as 'credentials.json'\n");
  process.exit(1);
}

const { client_id, client_secret, redirect_uris } = credentials.installed || credentials.web;
const redirectUri = redirect_uris?.[0] || "urn:ietf:wg:oauth:2.0:oob";

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirectUri);

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
  prompt: "consent", // forces refresh_token to be returned
});

console.log("\n──────────────────────────────────────────────");
console.log("  Big Deep OS — Google Calendar Auth Setup");
console.log("──────────────────────────────────────────────\n");
console.log("1. Open this URL in your browser:\n");
console.log("   " + authUrl);
console.log("\n2. Sign in with bigdeepbiz@gmail.com and approve access.");
console.log("3. Google will show you a code — paste it here.\n");

const rl = createInterface({ input: process.stdin, output: process.stdout });
rl.question("Paste the code here: ", async (code) => {
  rl.close();
  try {
    const { tokens } = await oAuth2Client.getToken(code.trim());

    console.log("\n✅  Success! Add these to your Vercel environment variables:\n");
    console.log("──────────────────────────────────────────────");
    console.log(`GOOGLE_CLIENT_ID=${client_id}`);
    console.log(`GOOGLE_CLIENT_SECRET=${client_secret}`);
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log(`GOOGLE_CALENDAR_ID=bigdeepbiz@gmail.com`);
    console.log("──────────────────────────────────────────────\n");
    console.log("Then redeploy your Vercel app and the Calendar tab will be live.\n");
  } catch (err) {
    console.error("\n❌  Failed to exchange code:", err.message);
    console.error("    Try running the script again with a fresh code.\n");
  }
});
