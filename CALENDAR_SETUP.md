# Big Deep OS — Google Calendar Sync Setup

This is a one-time 10-minute setup. Once done, the Calendar tab in the OS reads from and writes to your Google Calendar live. Jordan, Lizzie, and Luke can all add events from the app.

---

## Step 1 — Create a Google Cloud Project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click **Select a project** → **New Project**
3. Name it `big-deep-os` → **Create**

---

## Step 2 — Enable the Google Calendar API

1. In the left sidebar → **APIs & Services** → **Library**
2. Search for **Google Calendar API**
3. Click it → **Enable**

---

## Step 3 — Create a Service Account

1. In the left sidebar → **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **Service Account**
3. Name it `big-deep-os-app` → **Create and Continue** → **Done**
4. Click on the service account you just created
5. Go to the **Keys** tab → **Add Key** → **Create new key** → **JSON**
6. A `.json` file downloads automatically — **keep this safe, don't commit it to GitHub**

---

## Step 4 — Share Your Calendar with the Service Account

1. Open the downloaded JSON file — find the field `"client_email"`. It looks like:
   `big-deep-os-app@big-deep-os.iam.gserviceaccount.com`
2. Open [Google Calendar](https://calendar.google.com)
3. In the left sidebar, hover over **bigdeepbiz@gmail.com** → click the 3 dots → **Settings and sharing**
4. Scroll to **Share with specific people** → **+ Add people**
5. Paste the `client_email` value from the JSON file
6. Set permission to **Make changes to events**
7. Click **Send**

---

## Step 5 — Add Environment Variables to Vercel

1. Go to [vercel.com](https://vercel.com) → your `big-deep-os` project → **Settings** → **Environment Variables**
2. Add these two variables:

### `GOOGLE_CALENDAR_ID`
```
bigdeepbiz@gmail.com
```

### `GOOGLE_SERVICE_ACCOUNT_JSON`
Open the JSON file you downloaded. Copy the **entire contents** of the file and paste it as the value.
It should start with `{` and end with `}`.

3. Set both variables for **Production**, **Preview**, and **Development**
4. Click **Save**

---

## Step 6 — Redeploy

1. In Vercel → **Deployments** → click the `...` on your latest deployment → **Redeploy**
2. Wait ~1 minute for the build to complete

---

## Step 7 — Share Access with Lizzie and Luke

The app itself is the admin interface — no Google account needed.

To give Lizzie and Luke access to the OS itself, either:
- Share the Vercel URL with them (it's a web app, no login needed by default)
- Or add a simple password protect via Vercel's **Password Protection** feature (Settings → Deployment Protection)

If you also want them to see events in their own Google Calendar:
- In Google Calendar → share the `bigdeepbiz@gmail.com` calendar with their Gmail addresses
- Set to **See all event details** or **Make changes to events**

---

## How the Sync Works

| Action | What Happens |
|---|---|
| Open the Calendar tab in the OS | Fetches all events from Google Calendar live |
| Add an event in the OS | Creates it instantly in Google Calendar |
| Edit an event in the OS | Updates it in Google Calendar |
| Delete an event in the OS | Removes it from Google Calendar |
| Add/edit events directly in Google Calendar | Appear in the OS on next refresh |
| Click the Refresh button in the OS | Pulls latest from Google Calendar |
| Click the ↗ icon on any event | Opens it directly in Google Calendar |

---

## Troubleshooting

**"Could not connect to Google Calendar" error in the app**
- Check that both env vars are set correctly in Vercel
- Make sure you redeployed after adding the env vars
- Verify the service account email is shared on the calendar with edit access

**Events show in Google Calendar but not in the OS**
- Click the Refresh button
- Check the `GOOGLE_CALENDAR_ID` env var matches exactly

**Service account JSON is too long for the Vercel field**
- This is normal — the JSON is large. Paste the full contents including all line breaks.
- Alternatively, minify it first with: `cat service-account.json | python3 -m json.tool --compact`
