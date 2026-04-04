#!/usr/bin/env node

/**
 * Big Deep — Community Mention Monitor
 *
 * Searches Reddit (public JSON API) and Google for mentions of Big Deep.
 * Sends a summary email via Gmail API if new mentions are found.
 *
 * Usage:
 *   GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... GOOGLE_REFRESH_TOKEN=... \
 *   node scripts/mention-monitor.mjs
 *
 * PM2:
 *   pm2 start ecosystem.config.cjs
 *
 * Requires: googleapis (already in package.json)
 */

import { google } from "googleapis";

// ─── Config ─────────────────────────────────────────────────────────────────

const SEARCH_TERMS = [
  "Big Deep band",
  "Big Deep Jordan Fairless",
  "BigDeepBand",
  "@BigDeepBand",
];

const SUBREDDITS = [
  "jambands",
  "GoosetheBand",
  "phish",
  "umphreys",
  "Spafford",
  "concertreviews",
  "Music",
];

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "bigdeepbiz@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "bigdeepbiz@gmail.com";

// How far back to search (hours)
const LOOKBACK_HOURS = parseInt(process.env.LOOKBACK_HOURS || "12", 10);

// ─── Auth ───────────────────────────────────────────────────────────────────

function getAuth() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  return oauth2Client;
}

// ─── Reddit Search ──────────────────────────────────────────────────────────

async function searchReddit(query, subreddit) {
  const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&restrict_sr=on&sort=new&t=day&limit=25`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "BigDeepMentionMonitor/1.0",
      },
    });

    if (!res.ok) {
      console.warn(`Reddit ${subreddit} search failed: ${res.status}`);
      return [];
    }

    const data = await res.json();
    const cutoff = Date.now() / 1000 - LOOKBACK_HOURS * 3600;

    return (data?.data?.children || [])
      .map((child) => child.data)
      .filter((post) => post.created_utc > cutoff)
      .map((post) => ({
        source: `r/${subreddit}`,
        type: "reddit",
        title: post.title,
        url: `https://reddit.com${post.permalink}`,
        author: post.author,
        score: post.score,
        comments: post.num_comments,
        created: new Date(post.created_utc * 1000).toISOString(),
        snippet: post.selftext?.substring(0, 200) || "",
      }));
  } catch (err) {
    console.warn(`Reddit ${subreddit} error:`, err.message);
    return [];
  }
}

async function searchAllReddit() {
  const results = [];
  const seen = new Set();

  for (const sub of SUBREDDITS) {
    for (const term of SEARCH_TERMS) {
      const posts = await searchReddit(term, sub);
      for (const post of posts) {
        if (!seen.has(post.url)) {
          seen.add(post.url);
          results.push(post);
        }
      }
      // Be polite to Reddit API — 1 second between requests
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  return results;
}

// ─── Reddit Comment Search ──────────────────────────────────────────────────

async function searchRedditComments(query) {
  // Reddit's comment search via the search endpoint
  const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&type=comment&sort=new&t=day&limit=25`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "BigDeepMentionMonitor/1.0",
      },
    });

    if (!res.ok) return [];

    const data = await res.json();
    const cutoff = Date.now() / 1000 - LOOKBACK_HOURS * 3600;

    return (data?.data?.children || [])
      .map((child) => child.data)
      .filter((comment) => comment.created_utc > cutoff)
      .map((comment) => ({
        source: `r/${comment.subreddit}`,
        type: "reddit-comment",
        title: `Comment in r/${comment.subreddit}`,
        url: `https://reddit.com${comment.permalink}`,
        author: comment.author,
        score: comment.score,
        created: new Date(comment.created_utc * 1000).toISOString(),
        snippet: comment.body?.substring(0, 300) || "",
      }));
  } catch (err) {
    console.warn("Reddit comment search error:", err.message);
    return [];
  }
}

async function searchAllRedditComments() {
  const results = [];
  const seen = new Set();

  for (const term of SEARCH_TERMS) {
    const comments = await searchRedditComments(term);
    for (const comment of comments) {
      if (!seen.has(comment.url)) {
        seen.add(comment.url);
        results.push(comment);
      }
    }
    await new Promise((r) => setTimeout(r, 1000));
  }

  return results;
}

// ─── Google Search (via Custom Search API or scrape-free approach) ───────────

async function searchGoogle() {
  // Uses Google's public search suggestions + web results
  // For production, consider setting up Google Custom Search API ($5/1000 queries)
  // For now, we use a simple fetch to check for new results
  const results = [];

  for (const term of SEARCH_TERMS) {
    try {
      // Google Custom Search API (if GOOGLE_CSE_ID and GOOGLE_API_KEY are set)
      if (process.env.GOOGLE_CSE_ID && process.env.GOOGLE_API_KEY) {
        const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(term)}&key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CSE_ID}&dateRestrict=d1&num=10`;

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          for (const item of data.items || []) {
            results.push({
              source: "Google",
              type: "web",
              title: item.title,
              url: item.link,
              snippet: item.snippet || "",
              created: new Date().toISOString(),
            });
          }
        }
      }
    } catch (err) {
      console.warn(`Google search error for "${term}":`, err.message);
    }
  }

  return results;
}

// ─── Email via Gmail API ────────────────────────────────────────────────────

async function sendEmail(auth, subject, htmlBody) {
  const gmail = google.gmail({ version: "v1", auth });

  const message = [
    `From: Big Deep Monitor <${FROM_EMAIL}>`,
    `To: ${NOTIFY_EMAIL}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
    "",
    htmlBody,
  ].join("\r\n");

  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedMessage,
    },
  });
}

// ─── Format Results ─────────────────────────────────────────────────────────

function formatEmailHtml(redditPosts, redditComments, googleResults) {
  const total = redditPosts.length + redditComments.length + googleResults.length;
  const now = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "short",
  });

  let html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #0f172a; color: white; padding: 20px 24px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 20px;">🔍 Big Deep — Mention Monitor</h1>
        <p style="margin: 4px 0 0; opacity: 0.7; font-size: 13px;">${now} · ${total} mention${total !== 1 ? "s" : ""} found</p>
      </div>
      <div style="background: #f8fafc; padding: 20px 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
  `;

  if (total === 0) {
    html += `<p style="color: #64748b; font-size: 14px;">No new mentions in the last ${LOOKBACK_HOURS} hours. All quiet.</p>`;
  }

  // Reddit Posts
  if (redditPosts.length > 0) {
    html += `<h2 style="font-size: 16px; color: #0ea5e9; margin: 16px 0 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">Reddit Posts (${redditPosts.length})</h2>`;
    for (const post of redditPosts) {
      html += `
        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
          <p style="margin: 0; font-size: 14px;"><strong><a href="${post.url}" style="color: #0ea5e9; text-decoration: none;">${escapeHtml(post.title)}</a></strong></p>
          <p style="margin: 4px 0 0; font-size: 12px; color: #64748b;">${post.source} · u/${post.author} · ⬆ ${post.score} · 💬 ${post.comments}</p>
          ${post.snippet ? `<p style="margin: 6px 0 0; font-size: 13px; color: #475569;">${escapeHtml(post.snippet)}${post.snippet.length >= 200 ? "…" : ""}</p>` : ""}
        </div>
      `;
    }
  }

  // Reddit Comments
  if (redditComments.length > 0) {
    html += `<h2 style="font-size: 16px; color: #8b5cf6; margin: 16px 0 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">Reddit Comments (${redditComments.length})</h2>`;
    for (const comment of redditComments) {
      html += `
        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
          <p style="margin: 0; font-size: 14px;"><strong><a href="${comment.url}" style="color: #8b5cf6; text-decoration: none;">${escapeHtml(comment.title)}</a></strong></p>
          <p style="margin: 4px 0 0; font-size: 12px; color: #64748b;">u/${comment.author} · ⬆ ${comment.score}</p>
          <p style="margin: 6px 0 0; font-size: 13px; color: #475569; background: #f1f5f9; padding: 8px; border-radius: 4px; border-left: 3px solid #8b5cf6;">${escapeHtml(comment.snippet)}${comment.snippet.length >= 300 ? "…" : ""}</p>
        </div>
      `;
    }
  }

  // Google Results
  if (googleResults.length > 0) {
    html += `<h2 style="font-size: 16px; color: #10b981; margin: 16px 0 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">Google Results (${googleResults.length})</h2>`;
    for (const result of googleResults) {
      html += `
        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
          <p style="margin: 0; font-size: 14px;"><strong><a href="${result.url}" style="color: #10b981; text-decoration: none;">${escapeHtml(result.title)}</a></strong></p>
          <p style="margin: 4px 0 0; font-size: 13px; color: #475569;">${escapeHtml(result.snippet)}</p>
        </div>
      `;
    }
  }

  html += `
        <p style="margin: 16px 0 0; font-size: 11px; color: #94a3b8; text-align: center;">
          Monitoring: ${SEARCH_TERMS.join(" · ")}<br>
          Subreddits: ${SUBREDDITS.map((s) => "r/" + s).join(", ")}
        </p>
      </div>
    </div>
  `;

  return html;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log(`[${new Date().toISOString()}] Big Deep Mention Monitor starting...`);
  console.log(`Searching last ${LOOKBACK_HOURS} hours`);

  // Run searches in parallel
  const [redditPosts, redditComments, googleResults] = await Promise.all([
    searchAllReddit(),
    searchAllRedditComments(),
    searchGoogle(),
  ]);

  const total = redditPosts.length + redditComments.length + googleResults.length;
  console.log(`Found: ${redditPosts.length} Reddit posts, ${redditComments.length} Reddit comments, ${googleResults.length} Google results`);

  // Always send email (even if empty — confirms the monitor is running)
  // Change to `if (total > 0)` to only email when there are mentions
  try {
    const auth = getAuth();
    const subject = total > 0
      ? `🔍 Big Deep: ${total} new mention${total !== 1 ? "s" : ""} found`
      : "🔍 Big Deep: No new mentions (monitor running)";

    await sendEmail(auth, subject, formatEmailHtml(redditPosts, redditComments, googleResults));
    console.log(`Email sent to ${NOTIFY_EMAIL}`);
  } catch (err) {
    console.error("Failed to send email:", err.message);
    // Still log results to stdout for PM2 logs
    if (total > 0) {
      console.log("\n--- RESULTS ---");
      for (const post of [...redditPosts, ...redditComments, ...googleResults]) {
        console.log(`[${post.source}] ${post.title} — ${post.url}`);
      }
    }
  }

  console.log(`[${new Date().toISOString()}] Done.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
