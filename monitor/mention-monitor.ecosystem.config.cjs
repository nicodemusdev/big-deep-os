/**
 * PM2 Ecosystem Config — Big Deep Mention Monitor
 *
 * Usage:
 *   cd monitor/
 *   pm2 start ecosystem.config.cjs
 *   pm2 logs mention-monitor
 *   pm2 stop mention-monitor
 *
 * Runs twice daily: 9am and 6pm ET
 * Override with MONITOR_CRON env var
 */

module.exports = {
  apps: [
    {
      name: "mention-monitor",
      script: "mention-monitor.mjs",
      cron_restart: process.env.MONITOR_CRON || "0 9,18 * * *",
      autorestart: false,  // Don't restart after script completes — cron handles scheduling
      watch: false,
      env: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
        GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN || "",
        NOTIFY_EMAIL: "bigdeepbiz@gmail.com",
        FROM_EMAIL: "bigdeepbiz@gmail.com",
        LOOKBACK_HOURS: "12",
        // Optional — Google Custom Search API (for web results beyond Reddit)
        // GOOGLE_CSE_ID: "",
        // GOOGLE_API_KEY: "",
      },
    },
  ],
};
