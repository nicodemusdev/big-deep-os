# Big Deep — Mention Monitor Setup

## What it does
Searches Reddit and Google for mentions of Big Deep every 12 hours (9am + 6pm ET). Emails a formatted summary to bigdeepbiz@gmail.com via Gmail API.

## Prerequisites
- Node 18+
- PM2 (`npm install -g pm2`)
- `googleapis` package (already in big-deep-os package.json)

## Quick Setup

### 1. Copy files to your server

```bash
scp scripts/mention-monitor.mjs yourserver:/path/to/monitor/
scp scripts/mention-monitor.ecosystem.config.cjs yourserver:/path/to/monitor/
```

### 2. Install dependency

```bash
cd /path/to/monitor
npm init -y
npm install googleapis
```

### 3. Set environment variables

You already have these from the Big Deep OS setup. Add them to your server environment (e.g., `~/.bashrc`, `.env` file, or PM2 ecosystem config):

```bash
export GOOGLE_CLIENT_ID="your-client-id"
export GOOGLE_CLIENT_SECRET="your-client-secret"
export GOOGLE_REFRESH_TOKEN="your-refresh-token"  # Must have gmail.send scope
```

**Important:** Your existing refresh token may not have Gmail send scope. If email fails, re-run `scripts/get-refresh-token.mjs` with the gmail.send scope added. Or update the script to use a different notification method (Telegram, webhook, etc).

### 4. Test it

```bash
GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... GOOGLE_REFRESH_TOKEN=... \
node scripts/mention-monitor.mjs
```

You should get an email at bigdeepbiz@gmail.com (even if no mentions found — confirms the monitor works).

### 5. Start with PM2

```bash
# Set env vars in the ecosystem config file first, then:
pm2 start scripts/mention-monitor.ecosystem.config.cjs

# Verify it's scheduled
pm2 list

# Check logs
pm2 logs mention-monitor
```

### 6. Save PM2 config so it survives reboot

```bash
pm2 save
pm2 startup  # Follow the instructions it gives you
```

## Configuration

| Env Var | Default | Description |
|---------|---------|-------------|
| `NOTIFY_EMAIL` | bigdeepbiz@gmail.com | Where to send alerts |
| `FROM_EMAIL` | bigdeepbiz@gmail.com | Sender address |
| `LOOKBACK_HOURS` | 12 | How far back to search |
| `MONITOR_CRON` | `0 9,18 * * *` | PM2 cron schedule (9am + 6pm) |
| `GOOGLE_CSE_ID` | (none) | Google Custom Search Engine ID (optional) |
| `GOOGLE_API_KEY` | (none) | Google API key for Custom Search (optional) |

## Google Custom Search (Optional)

Reddit monitoring works out of the box. Google web search requires a Custom Search Engine:

1. Go to https://programmablesearchengine.google.com
2. Create a search engine → search the entire web
3. Copy the Search Engine ID → set as `GOOGLE_CSE_ID`
4. Enable Custom Search API in Google Cloud Console
5. Create an API key → set as `GOOGLE_API_KEY`

Free tier: 100 queries/day (plenty for 2x daily runs with 4 search terms).

## What it monitors

**Reddit (posts + comments):**
- r/jambands, r/GoosetheBand, r/phish, r/umphreys, r/Spafford, r/concertreviews, r/Music

**Search terms:**
- "Big Deep band"
- "Big Deep Jordan Fairless"
- "BigDeepBand"
- "@BigDeepBand"

## Adding more sources later

The script is modular. To add new sources:
1. Write a `searchNewSource()` function that returns `[{ source, type, title, url, snippet, created }]`
2. Add it to the `Promise.all` in `main()`
3. Add a section in `formatEmailHtml()`
