"use client";

import { useState, useEffect } from "react";
import { Globe, Users, Eye, MessageCircle, Zap, ChevronRight } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface KeyVoice {
  id: string;
  handle: string;
  platform: string;
  why: string;
  status: "identified" | "monitoring" | "seeded" | "engaged" | "champion";
}

interface Community {
  id: string;
  name: string;
  platform: string;
  icon: string;
  url: string;
  size: string;
  relevance: string;
  strategy: string;
  status: "not started" | "monitoring" | "seeded" | "active";
  color: string;
  keyVoices: KeyVoice[];
}

// ─── Data ───────────────────────────────────────────────────────────────────

const communities: Community[] = [
  {
    id: "reddit-jambands",
    name: "r/jambands",
    platform: "Reddit",
    icon: "🔴",
    url: "https://reddit.com/r/jambands",
    size: "Main jam scene subreddit",
    relevance: "Ground zero for discovery. When someone asks 'what new bands should I check out?' — this is where. A post that gains traction here spreads to Twitter and Facebook within hours.",
    strategy: "Don't self-promote. When the L4LM article drops Apr 9, the right person posting it here does more than any ad. Identify 5–10 users whose recommendations consistently get upvotes. Get the music in front of them through warm intros, not cold drops.",
    status: "not started",
    color: "bg-orange-50 border-orange-200",
    keyVoices: [],
  },
  {
    id: "reddit-goose",
    name: "r/GoosetheBand",
    platform: "Reddit",
    icon: "🔴",
    url: "https://reddit.com/r/GoosetheBand",
    size: "Massive crossover audience",
    relevance: "Goose just dropped Big Modern — their community is active and in discovery mode. Huge overlap with Big Deep's target audience. Goose fans are the exact demographic: 25-45, live music obsessed, open to new sounds.",
    strategy: "Goose fans are currently deep in new album conversation. They're engaged and receptive. Don't force a comparison — let the music speak. If a trusted voice in this community shares Big Deep, it carries weight.",
    status: "not started",
    color: "bg-orange-50 border-orange-200",
    keyVoices: [],
  },
  {
    id: "reddit-phish",
    name: "r/phish",
    platform: "Reddit",
    icon: "🔴",
    url: "https://reddit.com/r/phish",
    size: "Largest jam sub by far",
    relevance: "Enormous audience, but harder to penetrate. Best when Big Deep comes up organically in 'what else are you listening to' threads. The Spafford connection gives Jordan credibility here.",
    strategy: "Monitor for 'new music' threads and 'what are you listening to' posts. The Spafford story (16 years → accident → comeback) is the hook. Don't lead with self-promotion — let the story emerge.",
    status: "not started",
    color: "bg-orange-50 border-orange-200",
    keyVoices: [],
  },
  {
    id: "fb-jambands",
    name: "Jam Band Facebook Groups",
    platform: "Facebook",
    icon: "👥",
    url: "",
    size: "Multiple groups, 10K–100K members each",
    relevance: "Older end of the scene (30-50) but highest conversion rate. These people buy tickets and merch. Group admins are gatekeepers — they control what gets posted and what gets removed.",
    strategy: "Identify the top 5 groups by activity (not just member count). Build relationships with group admins before April 16 — a DM from Jordan with context makes a post feel earned, not spammy. Spafford-specific groups are warm territory where Jordan has built-in credibility.",
    status: "not started",
    color: "bg-blue-50 border-blue-200",
    keyVoices: [],
  },
  {
    id: "phantasy-tour",
    name: "Phantasy Tour",
    platform: "Forum",
    icon: "💬",
    url: "https://phantasytour.com",
    size: "OG jam scene forum — still very active",
    relevance: "The die-hards live here. A PT thread that gets traction spreads to Twitter and Reddit within hours. The older, more connected fans who influence what gets played at festivals and what gets written about in press.",
    strategy: "PT is allergic to marketing. The play is getting someone with credibility to start a 'heard of Big Deep?' thread naturally. Jordan's Spafford history gives instant credibility here. Don't post — let it be discovered.",
    status: "not started",
    color: "bg-purple-50 border-purple-200",
    keyVoices: [],
  },
  {
    id: "discord-jam",
    name: "Jam Scene Discord Servers",
    platform: "Discord",
    icon: "🎮",
    url: "",
    size: "Goose, Billy Strings, Umphrey's servers — thousands each",
    relevance: "Closed communities with high engagement. The people in these servers are super-fans who go to 10+ shows a year. If they adopt Big Deep, they bring their entire crew.",
    strategy: "These are harder to seed because they're invite-only and community-moderated. The best path is through existing members who are also Spafford fans — they already know Jordan. Identify crossover members.",
    status: "not started",
    color: "bg-indigo-50 border-indigo-200",
    keyVoices: [],
  },
  {
    id: "youtube-jam",
    name: "Jam Scene YouTube Channels",
    platform: "YouTube",
    icon: "▶️",
    url: "",
    size: "Reaction channels + live set reviewers",
    relevance: "Getting a reaction video from even a small jam-focused YouTube channel puts Big Deep into the recommendation algorithm alongside Goose, Phish, Billy Strings. That's discovery on autopilot.",
    strategy: "After Eclipse drops on YouTube Apr 24 — reach out to 3–5 jam scene YouTubers with a direct link and a one-sentence pitch. The 12-minute live version is perfect reaction content. Make it easy for them.",
    status: "not started",
    color: "bg-red-50 border-red-200",
    keyVoices: [],
  },
  {
    id: "x-circles",
    name: "X / Twitter — Jam Scene Circles",
    platform: "X / Twitter",
    icon: "𝕏",
    url: "",
    size: "Journalists, setlist accounts, superfan accounts",
    relevance: "Press contacts (L4LM, Relix, JamBase) are active here. But so are the superfan accounts that track setlists, share recordings, and recommend new music. These are micro-influencers in the scene.",
    strategy: "Follow and engage with 20–30 key accounts before April 9. When press drops, they should already recognize @BigDeepBand. Retweet, reply, participate in conversations. When the L4LM article drops, tag the journalist directly.",
    status: "not started",
    color: "bg-neutral-50 border-neutral-300",
    keyVoices: [],
  },
  {
    id: "nugs",
    name: "Nugs.net Community",
    platform: "Nugs.net",
    icon: "🎧",
    url: "https://nugs.net",
    size: "The jam band streaming platform",
    relevance: "Getting on Nugs is a credibility signal in the jam world. Their community of subscribers are the most dedicated live music collectors — they're the ones who tape shows and share sets.",
    strategy: "Long-term goal. Not relevant for April launch but should be on the radar for summer. After Bearsville show, a live recording on Nugs would be a major signal. Start conversation with their team in Q2.",
    status: "not started",
    color: "bg-green-50 border-green-200",
    keyVoices: [],
  },
];

// ─── Status colors ──────────────────────────────────────────────────────────

const communityStatusBadge: Record<string, string> = {
  "not started": "bg-neutral-100 text-neutral-500",
  monitoring: "bg-yellow-100 text-yellow-700",
  seeded: "bg-blue-100 text-blue-700",
  active: "bg-green-100 text-green-700",
};

const voiceStatusBadge: Record<string, string> = {
  identified: "bg-neutral-100 text-neutral-500",
  monitoring: "bg-yellow-100 text-yellow-700",
  seeded: "bg-blue-100 text-blue-700",
  engaged: "bg-purple-100 text-purple-700",
  champion: "bg-green-100 text-green-700",
};

const voiceStatusLabels: Record<string, string> = {
  identified: "Identified",
  monitoring: "Monitoring",
  seeded: "Music Shared",
  engaged: "Engaged",
  champion: "Champion",
};

// ─── Component ──────────────────────────────────────────────────────────────

export default function CommunityIntegration() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [voicesByComm, setVoicesByComm] = useState<Record<string, KeyVoice[]>>({});
  const [showAddForm, setShowAddForm] = useState<string | null>(null);
  const [newVoice, setNewVoice] = useState({ handle: "", why: "" });

  // Load saved voices from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bigdeep-community-voices");
    if (saved) setVoicesByComm(JSON.parse(saved));
  }, []);

  // Save voices to localStorage
  useEffect(() => {
    if (Object.keys(voicesByComm).length > 0) {
      localStorage.setItem("bigdeep-community-voices", JSON.stringify(voicesByComm));
    }
  }, [voicesByComm]);

  const addVoice = (communityId: string) => {
    if (!newVoice.handle.trim()) return;
    const voice: KeyVoice = {
      id: `${communityId}-${Date.now()}`,
      handle: newVoice.handle.trim(),
      platform: communities.find((c) => c.id === communityId)?.platform || "",
      why: newVoice.why.trim(),
      status: "identified",
    };
    setVoicesByComm((prev) => ({
      ...prev,
      [communityId]: [...(prev[communityId] || []), voice],
    }));
    setNewVoice({ handle: "", why: "" });
    setShowAddForm(null);
  };

  const cycleVoiceStatus = (communityId: string, voiceId: string) => {
    const order: KeyVoice["status"][] = ["identified", "monitoring", "seeded", "engaged", "champion"];
    setVoicesByComm((prev) => ({
      ...prev,
      [communityId]: (prev[communityId] || []).map((v) => {
        if (v.id === voiceId) {
          const nextIdx = (order.indexOf(v.status) + 1) % order.length;
          return { ...v, status: order[nextIdx] };
        }
        return v;
      }),
    }));
  };

  const removeVoice = (communityId: string, voiceId: string) => {
    setVoicesByComm((prev) => ({
      ...prev,
      [communityId]: (prev[communityId] || []).filter((v) => v.id !== voiceId),
    }));
  };

  const totalVoices = Object.values(voicesByComm).reduce((sum, arr) => sum + arr.length, 0);
  const champions = Object.values(voicesByComm)
    .flat()
    .filter((v) => v.status === "champion").length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-neutral-900 mb-2 flex items-center gap-2">
          <Globe size={32} className="text-primary-500" />
          Community Integration
        </h2>
        <p className="text-neutral-500 text-sm">
          Map the communities that matter. Identify the voices that move the needle. Get the music in front of them authentically.
        </p>
      </div>

      {/* The Philosophy */}
      <div className="bg-neutral-900 text-white rounded-xl p-5">
        <h3 className="font-bold mb-3 text-sm uppercase tracking-wide opacity-70">The Approach</h3>
        <div className="space-y-3 text-sm text-neutral-300">
          <p>
            The jam scene runs on <strong className="text-white">word-of-mouth from trusted voices</strong>, not ads.
            One respected person in a Facebook group or Reddit thread saying &ldquo;just heard this, go listen&rdquo;
            carries more weight than $500 in Meta spend. The goal is not to market TO these communities —
            it&apos;s to get the music in front of the right people and let them do what they naturally do.
          </p>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-primary-400">{communities.length}</p>
              <p className="text-xs opacity-70">Communities Mapped</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-accent-400">{totalVoices}</p>
              <p className="text-xs opacity-70">Key Voices Tracked</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-400">{champions}</p>
              <p className="text-xs opacity-70">Champions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2">
          <Zap size={16} /> Hard Rules
        </h3>
        <div className="space-y-1.5 text-sm text-red-700">
          <p><strong>Never self-promote.</strong> Jordan does not post Big Deep links in communities. Someone else does.</p>
          <p><strong>Earn it.</strong> Engage in conversations first. Be a real member, not a marketer with an agenda.</p>
          <p><strong>Warm introductions &gt; cold drops.</strong> A DM from Jordan to someone he already knows, sharing the L4LM link, is not self-promotion. It&apos;s sharing news with a friend.</p>
          <p><strong>Let press do the work.</strong> The L4LM article, Wook+ interview, JamBase piece — these are shareable by design. Get them in front of the right people and step back.</p>
          <p><strong>Track who becomes a champion.</strong> The person who shares without being asked is worth 100 followers. Know who they are. Take care of them.</p>
        </div>
      </div>

      {/* Timing */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
          <Eye size={16} /> Current Window
        </h3>
        <div className="text-sm text-yellow-700 space-y-1.5">
          <p><strong>Goose just dropped Big Modern</strong> — the jam scene is actively in discovery and discussion mode. Audiences are engaged, comparing sounds, and open to new recommendations. This is the highest-receptivity window of the year.</p>
          <p><strong>L4LM drops April 9</strong> — this is the first piece of shareable content. The right 5 people posting this link in the right 5 communities on April 9 creates organic reach that money can&apos;t buy.</p>
          <p><strong>Eclipse drops April 24 on YouTube</strong> — a 12-minute live version is perfect content for the communities below. It&apos;s exactly the kind of thing jam fans share and debate.</p>
        </div>
      </div>

      {/* Community Cards */}
      <section>
        <h3 className="font-bold text-neutral-900 mb-4 text-lg flex items-center gap-2">
          <Users size={20} /> Communities
        </h3>
        <div className="space-y-3">
          {communities.map((comm) => {
            const isExpanded = expandedId === comm.id;
            const voices = voicesByComm[comm.id] || [];

            return (
              <div key={comm.id} className={`rounded-xl border ${comm.color} overflow-hidden`}>
                {/* Header */}
                <button
                  className="w-full text-left p-4 flex items-start justify-between gap-3"
                  onClick={() => setExpandedId(isExpanded ? null : comm.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg">{comm.icon}</span>
                      <h4 className="font-bold text-neutral-900">{comm.name}</h4>
                      <span className="text-xs font-mono text-neutral-400">{comm.platform}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${communityStatusBadge[comm.status]}`}>
                        {comm.status}
                      </span>
                      {voices.length > 0 && (
                        <span className="text-xs bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full font-medium">
                          {voices.length} voice{voices.length > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 mt-1 ml-7">{comm.size}</p>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`text-neutral-400 flex-shrink-0 mt-1 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                  />
                </button>

                {/* Expanded */}
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-4">
                    <div className="ml-7 space-y-3">
                      {/* Relevance */}
                      <div className="bg-white bg-opacity-70 rounded-lg p-3">
                        <p className="text-xs font-bold text-neutral-500 uppercase mb-1">Why It Matters</p>
                        <p className="text-sm text-neutral-700">{comm.relevance}</p>
                      </div>

                      {/* Strategy */}
                      <div className="bg-white bg-opacity-70 rounded-lg p-3">
                        <p className="text-xs font-bold text-neutral-500 uppercase mb-1">Integration Strategy</p>
                        <p className="text-sm text-neutral-700">{comm.strategy}</p>
                      </div>

                      {comm.url && (
                        <a
                          href={comm.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-xs text-primary-600 hover:text-primary-800 font-medium"
                        >
                          Open {comm.name} →
                        </a>
                      )}

                      {/* Key Voices */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-bold text-neutral-500 uppercase">Key Voices</p>
                          <button
                            onClick={() => setShowAddForm(showAddForm === comm.id ? null : comm.id)}
                            className="text-xs text-primary-600 hover:text-primary-800 font-medium"
                          >
                            + Add Voice
                          </button>
                        </div>

                        {/* Add form */}
                        {showAddForm === comm.id && (
                          <div className="bg-white rounded-lg border border-neutral-200 p-3 mb-2 space-y-2">
                            <input
                              type="text"
                              placeholder="Username or handle"
                              value={newVoice.handle}
                              onChange={(e) => setNewVoice((prev) => ({ ...prev, handle: e.target.value }))}
                              className="w-full text-sm border border-neutral-200 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary-300"
                            />
                            <input
                              type="text"
                              placeholder="Why they matter (optional)"
                              value={newVoice.why}
                              onChange={(e) => setNewVoice((prev) => ({ ...prev, why: e.target.value }))}
                              className="w-full text-sm border border-neutral-200 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary-300"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => addVoice(comm.id)}
                                className="text-xs bg-primary-500 text-white px-3 py-1.5 rounded font-medium hover:bg-primary-600"
                              >
                                Add
                              </button>
                              <button
                                onClick={() => {
                                  setShowAddForm(null);
                                  setNewVoice({ handle: "", why: "" });
                                }}
                                className="text-xs text-neutral-500 hover:text-neutral-700 px-2 py-1.5"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Voice list */}
                        {voices.length > 0 ? (
                          <div className="space-y-1.5">
                            {voices.map((voice) => (
                              <div
                                key={voice.id}
                                className="bg-white rounded-lg border border-neutral-200 p-2.5 flex items-center justify-between gap-2"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-neutral-800">{voice.handle}</p>
                                    <button
                                      onClick={() => cycleVoiceStatus(comm.id, voice.id)}
                                      className={`text-xs font-bold px-2 py-0.5 rounded-full cursor-pointer hover:opacity-80 ${voiceStatusBadge[voice.status]}`}
                                      title="Click to cycle status"
                                    >
                                      {voiceStatusLabels[voice.status]}
                                    </button>
                                  </div>
                                  {voice.why && (
                                    <p className="text-xs text-neutral-500 mt-0.5">{voice.why}</p>
                                  )}
                                </div>
                                <button
                                  onClick={() => removeVoice(comm.id, voice.id)}
                                  className="text-xs text-neutral-400 hover:text-red-500 flex-shrink-0"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-neutral-400 italic">
                            No voices tracked yet. Add people whose opinions move the needle here.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Playbook */}
      <div className="bg-neutral-900 text-white rounded-xl p-5">
        <h3 className="font-bold mb-3 text-sm uppercase tracking-wide opacity-70">The Seeding Playbook</h3>
        <div className="space-y-3 text-sm">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="font-bold text-primary-400 mb-1">Phase 1: Before Apr 9</p>
            <p className="text-neutral-300">Follow and engage in all communities. Do not mention Big Deep. Be a real person in these spaces. Build familiarity with who the key voices are.</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="font-bold text-yellow-400 mb-1">Phase 2: Apr 9 — L4LM Drops</p>
            <p className="text-neutral-300">Share the L4LM article with 5–10 warm contacts via DM. Not &ldquo;please share this.&rdquo; Just: &ldquo;this just came out, thought you&apos;d be interested.&rdquo; Let them decide to post it.</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="font-bold text-red-400 mb-1">Phase 3: Apr 16 — Band Reveal</p>
            <p className="text-neutral-300">Inklines video is shareable content. If Phases 1–2 worked, people will share it organically. If not, send to your warm contacts. The Relix + JamBase coverage Apr 17 adds credibility to any conversation already happening.</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="font-bold text-green-400 mb-1">Phase 4: Apr 24 — Eclipse YouTube</p>
            <p className="text-neutral-300">A 12-minute live version is exactly the kind of content jam communities discuss at length. Share with jam YouTubers for reaction content. Post in Telegram and let your community do the seeding for you.</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="font-bold text-accent-400 mb-1">Ongoing: Track &amp; Nurture</p>
            <p className="text-neutral-300">Anyone who shares Big Deep without being asked is a champion. Track them above. Give them early access to new music. Invite them to shows. They are your most valuable marketing asset — more than any ad, any press placement, anything.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
