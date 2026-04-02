"use client";

import { useState } from "react";
import {
  Brain, BarChart2, Target, Eye, Rocket, TrendingUp,
  DollarSign, LineChart, Users, GitBranch, Calendar,
  BookOpen, CheckSquare, ChevronRight,
  CheckCircle, Circle, AlertTriangle, Zap, Info
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface CheckItem {
  id: string;
  label: string;
  urgent?: boolean;
  note?: string;
}

interface TextInput {
  id: string;
  label: string;
  placeholder: string;
  multiline?: boolean;
}

interface Section {
  id: string;
  num: string;
  label: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  guide: React.ReactNode;
  worksheet: {
    intro: string;
    checks?: CheckItem[];
    inputs?: TextInput[];
  };
  reference?: React.ReactNode;
}

// ─── 0-to-Hero Reference content ────────────────────────────────────────────

const HeroReference = () => (
  <div className="space-y-6">
    <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
      <h3 className="font-bold text-primary-700 mb-3 flex items-center gap-2">
        <Zap size={16} /> The Marketing Funnel
      </h3>
      <div className="space-y-2">
        {[
          { stage: "AWARENESS", desc: "People learn Big Deep exists", channel: "Press, TikTok, IG Stories", metric: "Reach / Impressions" },
          { stage: "INTEREST", desc: "People engage and want more", channel: "IG Feed, TikTok, YouTube", metric: "Video Views, Saves, Comments" },
          { stage: "DESIRE", desc: "People feel like they need to be part of this", channel: "IG Stories, Telegram, Live", metric: "Story replies, DMs, Telegram joins" },
          { stage: "ACTION", desc: "People follow, pre-save, buy a ticket", channel: "All platforms + Paid ads", metric: "Follows, Pre-saves, Ticket sales" },
        ].map((f, i) => (
          <div key={i} className="bg-white rounded-lg p-3 border border-primary-100">
            <div className="flex items-start gap-3">
              <span className="bg-primary-500 text-white text-xs font-bold px-2 py-0.5 rounded mt-0.5 flex-shrink-0">{f.stage}</span>
              <div>
                <p className="text-sm font-medium text-neutral-800">{f.desc}</p>
                <p className="text-xs text-neutral-500 mt-0.5"><span className="font-medium">Channel:</span> {f.channel}</p>
                <p className="text-xs text-neutral-500"><span className="font-medium">Metric:</span> {f.metric}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-accent-50 border border-accent-200 rounded-xl p-4">
      <h3 className="font-bold text-accent-700 mb-3 flex items-center gap-2">
        <DollarSign size={16} /> Meta Ads Structure
      </h3>
      <div className="space-y-2 text-sm">
        <div className="bg-white rounded-lg p-3 border border-accent-100">
          <p className="font-bold text-neutral-800">Campaign Level</p>
          <p className="text-neutral-600">Set your objective: Video Views, Traffic, Reach, Conversions</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-accent-100 ml-4">
          <p className="font-bold text-neutral-800">Ad Set Level</p>
          <p className="text-neutral-600">Set your audience, budget, schedule, placement</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-accent-100 ml-8">
          <p className="font-bold text-neutral-800">Ad Level</p>
          <p className="text-neutral-600">Your actual creative: video, image, copy, CTA</p>
        </div>
      </div>
    </div>

    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
      <h3 className="font-bold text-green-700 mb-3 flex items-center gap-2">
        <BarChart2 size={16} /> Key Metrics Glossary
      </h3>
      <div className="space-y-1.5 text-sm">
        {[
          ["CPM", "Cost per 1,000 impressions. Under $10 is solid."],
          ["CPV", "Cost per video view (ThruPlay). Under $0.05 is great."],
          ["CPF", "Cost per follow. Under $1.00 is good."],
          ["CPC", "Cost per link click. Under $0.75 is solid."],
          ["CTR", "Click-through rate. Over 1% is good."],
          ["Reach", "Unique people who saw your content."],
          ["Saves", "People bookmarked your post — highest intent signal."],
          ["Shares", "People sent your post to someone else — best for growth."],
          ["Watch Time", "% of video watched — the #1 TikTok/Reels signal."],
          ["ThruPlay", "Meta counts a view when 15+ seconds watched."],
        ].map(([term, def], i) => (
          <div key={i} className="flex gap-2">
            <span className="font-bold text-green-700 flex-shrink-0 w-20">{term}</span>
            <span className="text-neutral-600">{def}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
      <h3 className="font-bold text-yellow-700 mb-3 flex items-center gap-2">
        <Target size={16} /> Audience Targeting Quick Reference
      </h3>
      <div className="space-y-2 text-sm">
        <div className="bg-white rounded-lg p-3 border border-yellow-100">
          <p className="font-bold">Core (Spafford Fans)</p>
          <p className="text-neutral-600">Facebook: Spafford, jam band groups. IG: followers of @Spafford, @BigDeepBand. Custom: your IG/website visitors.</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-yellow-100">
          <p className="font-bold">Warm (Jam Scene)</p>
          <p className="text-neutral-600">Interests: Phish, Widespread Panic, Umphrey&apos;s McGee, festival music, live concerts. Age 22–45.</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-yellow-100">
          <p className="font-bold">Cold (New Discovery)</p>
          <p className="text-neutral-600">Lookalike of IG followers (1–3%). Broad music interests. TikTok algorithm does this automatically.</p>
        </div>
      </div>
    </div>

    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
      <h3 className="font-bold text-neutral-700 mb-3 flex items-center gap-2">
        <Info size={16} /> Platform Algorithm Rules
      </h3>
      <div className="space-y-2 text-sm">
        {[
          { platform: "TikTok", rules: "First 3 seconds hook is everything. Watch time = #1 signal. Post 4–6x/week. Consistency beats perfection." },
          { platform: "Instagram", rules: "Saves > Shares > Comments > Likes. Reels get more reach than carousels. Stories keep you top of mind." },
          { platform: "YouTube", rules: "Click-through rate + watch time. Titles/thumbnails matter. Long-form archive = SEO value." },
          { platform: "Meta Ads", rules: "Let ad run 3 days before judging. Never edit a running ad. Duplicate + modify instead." },
        ].map((p, i) => (
          <div key={i} className="bg-white rounded-lg p-3 border border-neutral-200">
            <p className="font-bold text-neutral-800">{p.platform}</p>
            <p className="text-neutral-600">{p.rules}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Section Definitions ─────────────────────────────────────────────────────

const sections: Section[] = [
  {
    id: "mindset",
    num: "01",
    label: "DDM Mindset",
    subtitle: "How a marketing director thinks",
    icon: Brain,
    color: "text-primary-500",
    guide: (
      <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
        <p>A DDM (Digital Marketing Manager) does not wake up and ask &ldquo;what should I post today?&rdquo; They ask: <strong>What is the objective? Who is the audience? What do I want them to do next?</strong></p>
        <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded-r-lg">
          <p className="font-bold text-primary-700 mb-2">The Three Campaign Modes</p>
          <div className="space-y-2">
            <div><span className="font-bold text-red-600">LAUNCH MODE</span> — Apr 8–22: All hands on deck. Budget active. Press coordinated. Content maximized.</div>
            <div><span className="font-bold text-yellow-600">BUILD MODE</span> — Apr 23–Mid-May: Steady cadence. Testing content. Growing audience. No major spend.</div>
            <div><span className="font-bold text-green-600">ACTIVATION MODE</span> — Mid-May single: New campaign. Spend increases. Full press push.</div>
          </div>
        </div>
        <p><strong>The DDM Decision Stack:</strong> Every post and every dollar runs through 7 questions: What&apos;s the objective? Who&apos;s the audience? What action do I want? What does success look like? What do I measure? What do I cut if it&apos;s not working? What do I amplify?</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="font-bold text-yellow-700">Right now, you are in LAUNCH MODE. Every decision is deliberate and purposeful. Nothing goes out without asking: does this serve the campaign?</p>
        </div>
      </div>
    ),
    worksheet: {
      intro: "Lock in your marketing director mindset before a single post goes live.",
      inputs: [
        { id: "mind-mode", label: "What campaign mode are you in right now?", placeholder: "e.g. Launch Mode — Apr 8-22" },
        { id: "mind-obj", label: "What is your #1 objective this week?", placeholder: "e.g. Drive 200 follows in 48 hours on April 16" },
        { id: "mind-audience", label: "Who is the primary audience for this week's content?", placeholder: "e.g. Core Spafford fans + warm jam scene listeners via press" },
        { id: "mind-action", label: "What ONE action do you want them to take?", placeholder: "e.g. Follow @BigDeepBand" },
        { id: "mind-success", label: "What does success look like this week? Be specific.", placeholder: "e.g. 500 followers gained by April 18, Inklines video hits 10K views" },
        { id: "mind-amplify", label: "What is the one thing you will amplify if it performs well?", placeholder: "e.g. The Inklines reveal video — put $50 behind it immediately" },
      ],
    },
  },
  {
    id: "audit",
    num: "02",
    label: "Situation Audit",
    subtitle: "What you have, what you're missing",
    icon: BarChart2,
    color: "text-accent-500",
    guide: (
      <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
        <p>Day one on any campaign, a marketing director does a situation audit. No plan is valid until you know what you have, what you&apos;re missing, and who you&apos;re talking to.</p>
        <div className="space-y-2">
          <p className="font-bold text-neutral-900">Your three audience segments:</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3"><strong>Core — Spafford Fans:</strong> Know Jordan. Emotionally invested. Reach via IG, Facebook Groups, Telegram.</div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3"><strong>Warm — Jam Scene Adjacent:</strong> Know the scene, not Jordan personally. Reach via JamBase, Relix, Wook+, TikTok.</div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3"><strong>Cold — New Listeners:</strong> No context. Discover via TikTok, Meta ads, Spotify algorithm.</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="font-bold text-red-700">Critical missing items before April 9:</p>
          <ul className="mt-1 space-y-1 list-disc list-inside">
            <li>Email capture form on BigDeep.Band</li>
            <li>Meta Pixel installed on website</li>
            <li>All @BigDeepBand handles claimed and locked</li>
          </ul>
        </div>
      </div>
    ),
    worksheet: {
      intro: "Complete your asset audit. Check every item you have confirmed and ready.",
      checks: [
        { id: "audit-logo", label: "Brand identity complete — logo, colors (@SarahDavida)" },
        { id: "audit-inklines", label: "Inklines animated reveal video confirmed and ready" },
        { id: "audit-press-l4lm", label: "L4LM interview confirmed — April 9 date locked" },
        { id: "audit-press-wook", label: "Wook+ interview confirmed — April 13" },
        { id: "audit-press-jamfam", label: "JamFam Q&A confirmed — April 15" },
        { id: "audit-press-relix", label: "Relix Daily Dose confirmed — April 17" },
        { id: "audit-press-jambase", label: "JamBase email blast + Meet Big Deep confirmed — April 17/20" },
        { id: "audit-photos", label: "Band photography / headshots approved (@VicBrazen)" },
        { id: "audit-inception", label: "Inception session footage organized and usable" },
        { id: "audit-eclipse", label: "Eclipse full audio confirmed as usable song" },
        { id: "audit-utopia", label: "Utopia Studios session footage organized" },
        { id: "audit-website", label: "Website live — BigDeep.Band / BigDeepBand.com", urgent: true },
        { id: "audit-email", label: "Email capture form live on BigDeep.Band before Apr 9", urgent: true },
        { id: "audit-pixel", label: "Meta Pixel installed on BigDeep.Band website", urgent: true },
        { id: "audit-handles", label: "All @BigDeepBand handles claimed: IG, TikTok, YouTube, Facebook", urgent: true },
        { id: "audit-telegram", label: "Telegram community link active and shareable" },
        { id: "audit-mv1", label: "Music Video for Single 1 — concept decided", urgent: true, note: "⚠️ URGENT — mid-May release requires April shoot" },
      ],
    },
  },
  {
    id: "architecture",
    num: "03",
    label: "Campaign Architecture",
    subtitle: "Build the funnel before the first post",
    icon: Target,
    color: "text-green-600",
    guide: (
      <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
        <p>A &ldquo;campaign&rdquo; is not a hashtag. It is a structured sequence of touchpoints designed to move a specific audience toward a specific action.</p>
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
          <p className="font-bold mb-2">Big Deep Campaign Brief: The Emergence</p>
          <div className="space-y-1 text-xs">
            <div><span className="font-bold">Period:</span> April 8 – April 30, 2026</div>
            <div><span className="font-bold">Primary Objective:</span> Grow @BigDeepBand to 1,000+ followers by April 30</div>
            <div><span className="font-bold">Secondary Objective:</span> 200+ emails captured; seed Telegram to 100+ members</div>
            <div><span className="font-bold">Hero Asset:</span> Inklines animated video — April 16</div>
            <div><span className="font-bold">Budget:</span> $50–75 first campaign (Video Views, Apr 16-22)</div>
            <div><span className="font-bold">Tone:</span> Earned. Warm. Unhurried. Confident without announcement energy.</div>
          </div>
        </div>
        <p><strong>What success looks like:</strong> Inklines video hits 10K+ views. 500 followers gained in 48 hours on April 16. First TikTok over 10K views by April 30.</p>
      </div>
    ),
    worksheet: {
      intro: "Fill in your official campaign brief. These are the decisions that guide every action for the next 30 days.",
      inputs: [
        { id: "arch-name", label: "Campaign Name", placeholder: "e.g. Big Deep — The Emergence" },
        { id: "arch-period", label: "Campaign Period", placeholder: "e.g. April 8 – April 30, 2026" },
        { id: "arch-obj1", label: "Primary Objective (specific + measurable)", placeholder: "e.g. 1,000 followers on @BigDeepBand by April 30" },
        { id: "arch-obj2", label: "Secondary Objective", placeholder: "e.g. 200 email signups via BigDeep.Band" },
        { id: "arch-audience", label: "Primary Target Audience", placeholder: "e.g. Spafford fans 25-45 + jam scene listeners via press" },
        { id: "arch-message", label: "Key Message (1 sentence — what do you want people to feel?)", placeholder: "e.g. Big Deep is the band Jordan was always meant to lead." },
        { id: "arch-hero", label: "Hero Asset (the one thing that anchors the whole campaign)", placeholder: "e.g. Inklines animated reveal video — April 16" },
        { id: "arch-budget", label: "Total Campaign Budget", placeholder: "e.g. $75 first campaign, $150/month ongoing" },
        { id: "arch-win", label: "What does a WIN look like? (3 specific metrics)", placeholder: "e.g. 10K video views, 500 follows in 48hrs, 200 emails captured" },
      ],
    },
  },
  {
    id: "phase1",
    num: "04",
    label: "Phase 1: Pre-Reveal",
    subtitle: "Silent wall strategy — Apr 8–15",
    icon: Eye,
    color: "text-blue-500",
    guide: (
      <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
        <p>This phase is counterintuitive. Most musicians want to announce everywhere. A marketing director holds back on purpose. <strong>The silence on the main feed IS the message.</strong></p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <p className="font-bold text-blue-700 mb-1">The Silent Wall Logic</p>
          <p>When the L4LM article drops April 9, it drives traffic to @BigDeepBand. They see one clean image. April 16. That&apos;s it. The restraint signals confidence. It says: we&apos;re not hungry for attention. We&apos;re ready.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white border border-neutral-200 rounded-lg p-2"><strong>Apr 8</strong> — Teaser image posts. Jordan archives old wall.</div>
          <div className="bg-white border border-neutral-200 rounded-lg p-2"><strong>Apr 9</strong> — L4LM drops. Jordan Stories active. Jordan personal post.</div>
          <div className="bg-white border border-neutral-200 rounded-lg p-2"><strong>Apr 13</strong> — Wook+ interview. Reshare + TikTok clip.</div>
          <div className="bg-white border border-neutral-200 rounded-lg p-2"><strong>Apr 15</strong> — JamFam Q&A. Archive Apr 8 image. Countdown Story.</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="font-bold text-yellow-700">Behind the scenes this week:</p>
          <p>Build the Meta ad campaign. Install the Pixel. Lock the email form. Review the L4LM article before it publishes. Write the April 16 post caption now — don&apos;t wing it on the day.</p>
        </div>
      </div>
    ),
    worksheet: {
      intro: "Work through Phase 1 day by day. Check off each action as you complete it.",
      checks: [
        // APR 8
        { id: "p1-apr8-post", label: "Apr 8 — @BigDeepBand: Post logo + 'April 16.' caption" },
        { id: "p1-apr8-archive", label: "Apr 8 — Jordan: Archive old IG wall (clean slate)" },
        { id: "p1-apr8-pixel", label: "Apr 8 — Install Meta Pixel on BigDeep.Band", urgent: true },
        { id: "p1-apr8-email", label: "Apr 8 — Email capture form live on website", urgent: true },
        { id: "p1-apr8-handles", label: "Apr 8 — Confirm @BigDeepBand handles on all platforms", urgent: true },
        { id: "p1-apr8-ad-build", label: "Apr 8 — Build Meta ad campaign (ready to launch April 16, NOT yet live)" },
        // APR 9
        { id: "p1-apr9-l4lm", label: "Apr 9 — L4LM article reviewed before publish (correct links/handles)" },
        { id: "p1-apr9-feed", label: "Apr 9 — Jordan personal IG feed post: press shot + '@BigDeepBand'" },
        { id: "p1-apr9-story", label: "Apr 9 — Jordan Stories: Share L4LM article, react authentically" },
        { id: "p1-apr9-tiktok", label: "Apr 9 — TikTok: Eclipse teaser OR direct-to-camera 'I'm back' clip" },
        { id: "p1-apr9-comments", label: "Apr 9 — Respond to every comment on L4LM article and IG post" },
        // APR 10-12
        { id: "p1-apr10-stories", label: "Apr 10–12 — Daily Jordan Stories (behind-scenes, anticipation)" },
        { id: "p1-apr10-tiktok2", label: "Apr 10–12 — TikTok 2x (Eclipse clips or Inception footage)" },
        // APR 13
        { id: "p1-apr13-wook", label: "Apr 13 — Wook+ interview: Reshare to Stories, react" },
        { id: "p1-apr13-clip", label: "Apr 13 — TikTok clip from Wook+ interview or reaction" },
        // APR 14-15
        { id: "p1-apr14-countdown", label: "Apr 14–15 — Countdown Stories. 'Tomorrow.' energy." },
        { id: "p1-apr15-jamfam", label: "Apr 15 — JamFam Q&A: Reshare to all Stories" },
        { id: "p1-apr15-archive", label: "Apr 15 — Archive the Apr 8 teaser image tonight" },
        { id: "p1-apr15-caption", label: "Apr 15 — April 16 caption is written and ready to copy-paste", note: "Big Deep is Jordan Fairless, Luke Schwartz, Kevin Cooper, and Brendan Dillon." },
      ],
    },
  },
  {
    id: "phase2",
    num: "05",
    label: "Phase 2: Launch Week",
    subtitle: "The activation — Apr 16–22",
    icon: Rocket,
    color: "text-red-500",
    guide: (
      <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
        <p>This is the highest-leverage week of the entire campaign. A marketing director is watching every metric in real time and making live decisions.</p>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <p className="font-bold text-red-700 mb-1">April 16 Protocol</p>
          <p>Post Inklines video → All members Story simultaneously (stagger by 5 min) → Launch ad campaign within 1 hour → TikTok reaction video → Website goes live → Relix story reshare → Respond to EVERY comment in first 60 min.</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="font-bold text-yellow-700">Apr 17 — Press Amplification Day</p>
          <p>Relix Daily Dose + JamBase email blast drop. Reshare everything. Check ad performance (CPV under $0.05? Let it run. Over $0.08? Check targeting). TikTok post — strike while algorithm is warm.</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="font-bold text-green-700">Apr 20–21 — The Show Before The Show</p>
          <p>Meet Big Deep polaroid carousel (Apr 20). JamBase interview reshare. Utopia show footage on TikTok day-of and next day. Eclipse as the signature song — short clips first, long-form second.</p>
        </div>
      </div>
    ),
    worksheet: {
      intro: "Run launch week like a military operation. Every box gets checked.",
      checks: [
        // APR 16 — Launch Day
        { id: "p2-apr16-post", label: "Apr 16 — Post Inklines video to @BigDeepBand IG feed (confirmed caption ready)" },
        { id: "p2-apr16-stories", label: "Apr 16 — All 4 members post to Stories (stagger: Luke → Jordan → Kevin → Brendan)" },
        { id: "p2-apr16-ad", label: "Apr 16 — Launch Meta Video Views ad campaign within 1 hour of reveal", urgent: true },
        { id: "p2-apr16-tiktok", label: "Apr 16 — TikTok: Jordan direct-camera reaction ('The band is out')" },
        { id: "p2-apr16-website", label: "Apr 16 — Website full version live. Email capture prominent. Link in bio updated." },
        { id: "p2-apr16-relix", label: "Apr 16 — Reshare Relix coverage when it posts" },
        { id: "p2-apr16-comments", label: "Apr 16 — Respond to every comment in first 60 minutes (critical for algorithm)" },
        { id: "p2-apr16-analytics", label: "Apr 16 EOD — Pull first analytics snapshot: Reach, Follows, Story views, Ad spend" },
        // APR 17
        { id: "p2-apr17-relix", label: "Apr 17 — Relix Daily Dose reshare + reaction Stories" },
        { id: "p2-apr17-jambase", label: "Apr 17 — JamBase email blast reshare" },
        { id: "p2-apr17-l4lm", label: "Apr 17 — L4LM follow-up reshare" },
        { id: "p2-apr17-ad-check", label: "Apr 17 — Check ad CPV. Under $0.05 = let it run. Over $0.08 = adjust targeting." },
        { id: "p2-apr17-tiktok", label: "Apr 17 — TikTok: Eclipse clip or band intro. Strike while algorithm is warm." },
        { id: "p2-apr17-comments", label: "Apr 17 — Reply to all JamBase and Relix comments" },
        // APR 18-19
        { id: "p2-apr18", label: "Apr 18–19 — Daily TikTok (2x). Jordan Stories. Maintain momentum." },
        // APR 20
        { id: "p2-apr20-carousel", label: "Apr 20 — Meet Big Deep polaroid carousel posts to IG Feed" },
        { id: "p2-apr20-jambase", label: "Apr 20 — JamBase interview: Reshare to Stories. Update link in bio for 24hrs." },
        // APR 21
        { id: "p2-apr21-show", label: "Apr 21 — Utopia show: Live Stories throughout. FOMO content." },
        { id: "p2-apr21-footage", label: "Apr 21 — Capture footage for TikTok clips (day-of and next day)" },
        // APR 22
        { id: "p2-apr22-recap", label: "Apr 22 — Show recap post on IG Feed" },
        { id: "p2-apr22-metrics", label: "Apr 22 — Pull full 7-day ad metrics. Make extend/pause decision." },
      ],
    },
  },
  {
    id: "phase3",
    num: "06",
    label: "Phase 3: Build Phase",
    subtitle: "Sustain momentum — Apr 23–Mid-May",
    icon: TrendingUp,
    color: "text-green-500",
    guide: (
      <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
        <p>After launch week, most artists go quiet. A marketing director knows this is the worst thing you can do. The algorithm rewards consistency. New followers need to be reminded why they followed.</p>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
          <p className="font-bold text-green-700 mb-2">Build Phase Content Cadence</p>
          <div className="space-y-1 text-xs">
            <div><strong>TikTok:</strong> 4–6x/week — Eclipse clips, jam moments, band personality</div>
            <div><strong>IG Stories:</strong> Daily — Jordan + members. Day-in-life, process, reshares.</div>
            <div><strong>IG Feed:</strong> 2x/week max — high quality only. Feed is a gallery, not a stream.</div>
            <div><strong>YouTube:</strong> 1x/week — Full Wook+ interview, Eclipse full jam, song stories.</div>
            <div><strong>Telegram:</strong> 2–3x/week — Exclusive previews, direct updates, inner circle.</div>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="font-bold text-red-700">⚠️ URGENT: Music Video for Single 1</p>
          <p className="text-sm mt-1">Mid-May release = post-production by May 1 = shoot must happen in APRIL. Concept must be decided THIS WEEK.</p>
        </div>
      </div>
    ),
    worksheet: {
      intro: "Lock your build phase cadence and resolve the Music Video URGENT item.",
      checks: [
        { id: "p3-mv-concept", label: "Music Video 1 — Concept decided (narrative / performance / animated / hybrid)", urgent: true },
        { id: "p3-mv-crew", label: "Music Video 1 — Director / video crew booked", urgent: true },
        { id: "p3-mv-location", label: "Music Video 1 — Shoot location and date locked (must be in April)", urgent: true },
        { id: "p3-mv-track", label: "Music Video 1 — Single 1 confirmed as final mix/master-ready", urgent: true },
        { id: "p3-cadence-tiktok", label: "TikTok posting schedule set — 4–6 clips queued for the week" },
        { id: "p3-cadence-stories", label: "IG Stories plan set — Jordan posts daily, members active" },
        { id: "p3-cadence-youtube", label: "YouTube: Eclipse full jam upload scheduled" },
        { id: "p3-telegram", label: "Telegram: Exclusive content posted this week" },
        { id: "p3-presave-platform", label: "Pre-save landing page created (DistroKid / feature.fm)" },
        { id: "p3-presave-link", label: "Pre-save link goes in bio 3 weeks before single drop" },
        { id: "p3-presave-email", label: "Pre-save email to BigDeep.Band list sent" },
        { id: "p3-may-calendar", label: "May content calendar planned (flagged for April 28 review)" },
      ],
      inputs: [
        { id: "p3-mv-concept-notes", label: "Music Video concept notes", placeholder: "Describe the concept, who's involved, location, vibe..." },
        { id: "p3-mv-shoot-date", label: "Music Video shoot date", placeholder: "e.g. April 24 — location TBD" },
        { id: "p3-single-track", label: "Single 1 track name confirmed as", placeholder: "e.g. Eclipse" },
        { id: "p3-single-date", label: "Single 1 release date target", placeholder: "e.g. May 15" },
      ],
    },
  },
  {
    id: "ads",
    num: "07",
    label: "Paid Ads Plan",
    subtitle: "Every dollar tied to an objective",
    icon: DollarSign,
    color: "text-yellow-500",
    guide: (
      <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
        <p>A marketing director does not boost posts randomly. Every dollar is tied to a campaign objective, an audience, and a measurable outcome.</p>
        <div className="space-y-3">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="font-bold text-yellow-700">Campaign 1: Inklines Video Views (Apr 16–22)</p>
            <div className="text-xs space-y-0.5 mt-1">
              <div><strong>Objective:</strong> Video Views (ThruPlay — 15 sec min)</div>
              <div><strong>Budget:</strong> $50–75 total / $7–10/day</div>
              <div><strong>Audience:</strong> Jam bands, Phish, Widespread Panic, festival culture — Age 22–45 — US</div>
              <div><strong>Success:</strong> CPV under $0.05, 10,000+ unique video views</div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="font-bold text-blue-700">Campaign 2: Profile Visit / Follow Growth (Apr 23–30)</p>
            <div className="text-xs space-y-0.5 mt-1">
              <div><strong>Objective:</strong> Reach or Traffic → Profile Visit</div>
              <div><strong>Budget:</strong> $30–40 total / $5/day</div>
              <div><strong>Audience:</strong> Website visitors (Pixel) + 50%+ Inklines video viewers</div>
              <div><strong>Success:</strong> Profile visits under $0.30 each, 200+ net follows</div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="font-bold text-green-700">Campaign 3: Single Pre-Save Traffic (3 wks before drop)</p>
            <div className="text-xs space-y-0.5 mt-1">
              <div><strong>Objective:</strong> Traffic → Link Clicks to pre-save page</div>
              <div><strong>Budget:</strong> $30 total / $3/day over 10 days</div>
              <div><strong>Success:</strong> CPC under $0.75, 200+ pre-saves before release</div>
            </div>
          </div>
        </div>
        <div className="bg-neutral-50 border border-neutral-300 rounded-lg p-3 text-xs">
          <strong>DDM Rule:</strong> Never spend money on a post that isn&apos;t already performing organically. Ads amplify what&apos;s already working — they don&apos;t rescue what isn&apos;t.
        </div>
      </div>
    ),
    worksheet: {
      intro: "Track your campaign setup and decisions. Fill in as you build each campaign.",
      checks: [
        { id: "ads-business-mgr", label: "Meta Business Manager account created" },
        { id: "ads-pixel", label: "Meta Pixel installed and firing on BigDeep.Band" },
        { id: "ads-page", label: "Facebook Page connected to Ads Manager" },
        { id: "ads-ig-connected", label: "Instagram @BigDeepBand connected to Business Manager" },
        { id: "ads-payment", label: "Payment method added to Meta Ads Manager" },
        { id: "ads-c1-built", label: "Campaign 1 (Video Views) built and ready in Ads Manager — NOT yet launched" },
        { id: "ads-c1-live", label: "Campaign 1 launched April 16 within 1 hour of reveal post" },
        { id: "ads-c1-check", label: "Campaign 1 reviewed on April 19 — CPV decision made (extend or adjust)" },
        { id: "ads-c2-built", label: "Campaign 2 (Profile Visit) built after April 22" },
        { id: "ads-c2-live", label: "Campaign 2 launched April 23" },
        { id: "ads-c3-built", label: "Campaign 3 (Pre-Save Traffic) built 3 weeks before single drop" },
      ],
      inputs: [
        { id: "ads-c1-cpv", label: "Campaign 1 — actual CPV after 3 days", placeholder: "e.g. $0.04" },
        { id: "ads-c1-views", label: "Campaign 1 — total video views at campaign end", placeholder: "e.g. 14,230" },
        { id: "ads-c1-spend", label: "Campaign 1 — total spend", placeholder: "e.g. $68.50" },
        { id: "ads-c1-decision", label: "Campaign 1 — extend or pause? Why?", placeholder: "e.g. Extended to Apr 28, CPV was $0.03 — too good to stop" },
        { id: "ads-monthly-budget", label: "Your confirmed monthly ads budget", placeholder: "e.g. $150/month" },
      ],
    },
  },
  {
    id: "analytics",
    num: "08",
    label: "Analytics",
    subtitle: "The numbers a marketing director lives by",
    icon: LineChart,
    color: "text-purple-500",
    guide: (
      <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
        <p>A marketing director reviews analytics on a fixed schedule. Not randomly. Every Monday morning, you pull eight numbers and make decisions based on them.</p>
        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
          <p className="font-bold text-purple-700 mb-2">The Weekly DDM Ritual (Every Monday AM)</p>
          <ol className="list-decimal list-inside space-y-1 text-xs">
            <li>Pull all 8 metrics and write them down</li>
            <li>Find the ONE post that outperformed everything — WHY? Replicate the format.</li>
            <li>Find the ONE post that underperformed — wrong format, wrong time, wrong audience?</li>
            <li>Adjust coming week&apos;s content plan based on what you learned</li>
            <li>Check ad performance. Pause or extend campaigns.</li>
            <li>Set ONE growth goal for the week. Write it down. Measure it next Monday.</li>
          </ol>
        </div>
        <p>The metrics: Follower growth, Organic reach, Story view retention, TikTok avg watch time, Bio link clicks, Email signups, Ad CPM/CPV/CPF, Telegram member growth.</p>
      </div>
    ),
    worksheet: {
      intro: "Use this as your weekly analytics log. Fill in your numbers each Monday.",
      inputs: [
        { id: "ana-week", label: "Week of", placeholder: "e.g. April 14 – April 20" },
        { id: "ana-followers", label: "Follower count (end of week) — @BigDeepBand IG", placeholder: "e.g. 847" },
        { id: "ana-follower-gain", label: "Net followers gained this week", placeholder: "e.g. +312" },
        { id: "ana-reach", label: "Best post organic reach this week", placeholder: "e.g. 4,200 (Inklines video)" },
        { id: "ana-tiktok-views", label: "TikTok avg watch time % (best video this week)", placeholder: "e.g. 68% avg watch time" },
        { id: "ana-story-views", label: "IG Story views (avg per frame this week)", placeholder: "e.g. 340 avg per frame" },
        { id: "ana-email", label: "Email list total (end of week)", placeholder: "e.g. 87 subscribers" },
        { id: "ana-telegram", label: "Telegram member count", placeholder: "e.g. 34 members" },
        { id: "ana-ad-cpv", label: "Active ad CPV or CPF this week", placeholder: "e.g. CPV $0.04" },
        { id: "ana-top-post", label: "Top performing post this week (and why)", placeholder: "e.g. Inklines video — 4.2K reach, 87 shares. Visual + mystery = shares." },
        { id: "ana-flop", label: "Lowest performing post (and what you'll change)", placeholder: "e.g. Static image of logo — 180 reach. Switch to video format next time." },
        { id: "ana-next-goal", label: "ONE growth goal for next week", placeholder: "e.g. Hit 1,000 total followers by Sunday April 26" },
      ],
    },
  },
  {
    id: "team",
    num: "09",
    label: "Team Coordination",
    subtitle: "Running a band like a campaign team",
    icon: Users,
    color: "text-orange-500",
    guide: (
      <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
        <p>A marketing director manages stakeholders. In Big Deep, your stakeholders are your bandmates, press partners, and collaborators. Ambiguity is the enemy of execution.</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="font-bold text-neutral-800 mb-1">Before April 16</p>
            <div className="space-y-1">
              <div className="bg-blue-50 rounded p-2"><strong>Jordan:</strong> Public face. Feed poster. Story driver.</div>
              <div className="bg-green-50 rounded p-2"><strong>Luke:</strong> Interviews. Can reshare.</div>
              <div className="bg-neutral-50 rounded p-2"><strong>Kevin:</strong> Stories reshares ONLY.</div>
              <div className="bg-neutral-50 rounded p-2"><strong>Brendan:</strong> Stories reshares ONLY.</div>
            </div>
          </div>
          <div>
            <p className="font-bold text-neutral-800 mb-1">After April 16</p>
            <div className="space-y-1">
              <div className="bg-blue-50 rounded p-2"><strong>Jordan:</strong> CMO. All platforms. Lead voice.</div>
              <div className="bg-green-50 rounded p-2"><strong>Luke:</strong> Full posting. Song credits.</div>
              <div className="bg-purple-50 rounded p-2"><strong>Kevin:</strong> Full reveal. Full posting.</div>
              <div className="bg-purple-50 rounded p-2"><strong>Brendan:</strong> Full reveal. Full posting.</div>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-xs">
          <p className="font-bold">Protocol Rules:</p>
          <ul className="list-disc list-inside mt-1 space-y-0.5">
            <li>Weekly Sunday text with 2 specific tasks per member</li>
            <li>When press drops: send link immediately with exact reshare instructions</li>
            <li>Be specific: &apos;Story reshare before noon. Tag @BigDeepBand.&apos;</li>
            <li>Never expect members to check the calendar themselves — push the info</li>
          </ul>
        </div>
      </div>
    ),
    worksheet: {
      intro: "Assign roles and set your coordination protocol.",
      inputs: [
        { id: "team-jordan-this-week", label: "Jordan's specific actions this week (2 max)", placeholder: "e.g. 1. Post Inklines reveal at 10am Apr 16  2. Launch Meta ad within 1 hour" },
        { id: "team-luke-this-week", label: "Luke's specific actions this week", placeholder: "e.g. 1. Story reshare at 10:05am  2. Comment on reveal post" },
        { id: "team-kevin-this-week", label: "Kevin's specific actions this week", placeholder: "e.g. 1. Story reshare at 10:10am  2. React to comments on his intro" },
        { id: "team-brendan-this-week", label: "Brendan's specific actions this week", placeholder: "e.g. 1. Story reshare at 10:15am  2. TikTok duet of reveal (optional)" },
        { id: "team-press-protocol", label: "When the next press drop happens, what exactly do you send the band?", placeholder: "e.g. 'Relix Daily Dose just dropped — reshare to Stories with the sticker and tag @BigDeepBand before 11am'" },
        { id: "team-weekly-call", label: "Weekly team sync: day, time, format", placeholder: "e.g. Sundays 8pm — 15 min group text or quick FaceTime" },
      ],
    },
  },
  {
    id: "decisions",
    num: "10",
    label: "Decision Framework",
    subtitle: "What to do when things happen",
    icon: GitBranch,
    color: "text-red-400",
    guide: (
      <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
        <p>A marketing director has a decision tree for every scenario. You will face every one of these. Know your play before it happens.</p>
        <div className="space-y-2">
          {[
            ["TikTok blows up (50K+ views)", "Post follow-up within 24hrs. Run $20 boost. Update link in bio. Engage every comment."],
            ["A post flops (under 100 views)", "Don&apos;t delete. Wait 48hrs. Post in a different format on the same topic."],
            ["Press drives follower spike", "Run Profile Visit ad targeting Lookalike of new followers within 72 hours."],
            ["Ad CPV over $0.10", "Pause. Try 15-sec cut. Test narrower audience. Restart with $20."],
            ["Band member posts off-brand before Apr 16", "DM immediately. Request delete if necessary. This is a campaign decision, not personal."],
            ["April 16 post gets fewer likes than expected", "Likes are vanity. Check: Reach, Profile Visits, Follows Gained, Story Views. Those are what matter."],
          ].map(([scenario, response], i) => (
            <div key={i} className="bg-white border border-neutral-200 rounded-lg p-3">
              <p className="font-bold text-neutral-800 text-xs">IF: {scenario}</p>
              <p className="text-neutral-600 text-xs mt-1">THEN: {response}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    worksheet: {
      intro: "Write your personal response playbook for the scenarios most likely to happen.",
      inputs: [
        { id: "dec-viral", label: "If a TikTok goes viral — your exact next 3 steps:", placeholder: "1. Post follow-up within 24hrs  2. Put $20 boost on it  3. ..." },
        { id: "dec-flop", label: "If a post flops — your rule:", placeholder: "e.g. Don't delete. Wait 48hrs. Try a different format on same topic." },
        { id: "dec-press-spike", label: "If press drives a big follower spike — what ad do you run?", placeholder: "e.g. Profile Visit targeting lookalike of new followers within 72hrs" },
        { id: "dec-ad-bad", label: "If your ad CPV goes over $0.10 — exact steps:", placeholder: "e.g. Pause campaign. Try a 15-second cut. Restart with $20 and narrower interests." },
        { id: "dec-overwhelmed", label: "If you get overwhelmed and can't keep up — the 2 non-negotiables:", placeholder: "e.g. TikTok 3x/week and IG Stories daily. Everything else can flex." },
        { id: "dec-press-wrong", label: "If a press article has an error or wrong link — who do you contact and how fast?", placeholder: "e.g. Email editor directly within 1 hour of publish. Have contact info saved." },
      ],
    },
  },
  {
    id: "command",
    num: "11",
    label: "30-Day Command View",
    subtitle: "The entire campaign on one checklist",
    icon: Calendar,
    color: "text-primary-600",
    guide: (
      <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
        <p>This is the master view. Every major event, every action, every decision point for April through mid-May. A marketing director keeps this open and checks it daily.</p>
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 text-xs">
          <p className="font-bold text-primary-700 mb-2">Priority Legend</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2"><span className="text-red-500 font-bold">🔴 LAUNCH</span> — Mission-critical, cannot be missed</div>
            <div className="flex items-center gap-2"><span className="text-orange-500 font-bold">🟠 HIGH</span> — Important, needs to happen on schedule</div>
            <div className="flex items-center gap-2"><span className="text-yellow-500 font-bold">🟡 MEDIUM</span> — Should do, can adjust timing if needed</div>
          </div>
        </div>
      </div>
    ),
    worksheet: {
      intro: "The full 30-day checklist. Work through this weekly. Every box tells a story.",
      checks: [
        // PRE-LAUNCH
        { id: "cmd-handles", label: "🔴 Before Apr 8 — All @BigDeepBand handles claimed on all platforms", urgent: true },
        { id: "cmd-website", label: "🔴 Before Apr 8 — BigDeep.Band live + email form + Meta Pixel", urgent: true },
        { id: "cmd-ad-ready", label: "🔴 Before Apr 8 — Meta ad campaign built and ready to go (NOT live yet)", urgent: true },
        // WEEK 1
        { id: "cmd-apr8", label: "🔴 Apr 8 — Big Deep teaser image posts to @BigDeepBand feed" },
        { id: "cmd-apr9-l4lm", label: "🔴 Apr 9 — L4LM interview drops. Jordan personal post + Stories active." },
        { id: "cmd-apr9-tiktok", label: "🟠 Apr 9 — TikTok: first post (Eclipse teaser or back story)" },
        { id: "cmd-apr10-12", label: "🟡 Apr 10–12 — Daily Stories + TikTok 2x" },
        { id: "cmd-apr13", label: "🔴 Apr 13 — Wook+ interview drops. Reshare + TikTok clip." },
        { id: "cmd-apr15-jamfam", label: "🔴 Apr 15 — JamFam Q&A. Archive Apr 8 image. Countdown Story." },
        // LAUNCH WEEK
        { id: "cmd-apr16-reveal", label: "🔴🔴 Apr 16 — REVEAL DAY. Inklines video. All members post. Ad launches." },
        { id: "cmd-apr16-website-live", label: "🔴 Apr 16 — Full website live. Link in bio updated." },
        { id: "cmd-apr17-press", label: "🔴 Apr 17 — Relix Daily Dose + JamBase blast + L4LM follow-up reshares." },
        { id: "cmd-apr18-19", label: "🟠 Apr 18–19 — TikTok 2x. Jordan Stories. Maintain momentum." },
        { id: "cmd-apr20-carousel", label: "🔴 Apr 20 — Meet Big Deep polaroid carousel. JamBase interview reshare." },
        { id: "cmd-apr21-utopia", label: "🔴 Apr 21 — Utopia Show Before The Show. Live Stories. Footage capture." },
        { id: "cmd-apr22", label: "🟠 Apr 22 — Show recap post. Pull 7-day ad metrics. Pause or extend decision." },
        // BUILD PHASE
        { id: "cmd-apr23-30", label: "🟡 Apr 23–30 — Build cadence: TikTok 4x/wk, Stories daily, Feed 2x/wk" },
        { id: "cmd-apr24-mv", label: "🔴 By Apr 24 — Music Video 1 shoot must happen", urgent: true },
        { id: "cmd-apr28-may", label: "🟠 Apr 28 — Plan May calendar. Review April analytics. Set May goals." },
        // MAY
        { id: "cmd-may-presave", label: "🔴 3 wks before single — Pre-save campaign launches. Link in bio update." },
        { id: "cmd-may-single", label: "🔴🔴 Mid-May — SINGLE DROP. Music video launch. Full activation." },
      ],
    },
  },
];

// ─── Main Component ──────────────────────────────────────────────────────────

export default function DDMPlaybook() {
  const [activeSection, setActiveSection] = useState("mindset");
  const [activePanel, setActivePanel] = useState<"worksheet" | "guide" | "reference">("worksheet");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [textInputs, setTextInputs] = useState<Record<string, string>>({});
  const [guideOpen, setGuideOpen] = useState(false);

  const toggleCheck = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updateText = (id: string, value: string) => {
    setTextInputs(prev => ({ ...prev, [id]: value }));
  };

  const getSectionProgress = (section: Section) => {
    const allItems = [
      ...(section.worksheet.checks || []),
      ...(section.worksheet.inputs || []),
    ];
    if (allItems.length === 0) return 0;
    const checkItems = section.worksheet.checks || [];
    const inputItems = section.worksheet.inputs || [];
    let done = 0;
    checkItems.forEach(item => { if (checked[item.id]) done++; });
    inputItems.forEach(item => { if (textInputs[item.id]?.trim()) done++; });
    return Math.round((done / allItems.length) * 100);
  };

  const currentSection = sections.find(s => s.id === activeSection)!;
  const progress = getSectionProgress(currentSection);

  const overallProgress = Math.round(
    sections.reduce((sum, s) => sum + getSectionProgress(s), 0) / sections.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-3xl font-serif text-neutral-900 flex items-center gap-2">
              <Brain size={32} className="text-primary-500" />
              DDM Playbook
            </h2>
            <p className="text-neutral-500 text-sm mt-1">Interactive Marketing Director&apos;s Field Guide — Work through each section</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-500">{overallProgress}%</div>
            <div className="text-xs text-neutral-500">Overall Complete</div>
          </div>
        </div>
        {/* Overall progress bar */}
        <div className="w-full bg-neutral-100 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      <div className="flex gap-5">
        {/* Left Sidebar — Section Nav */}
        <div className="w-52 flex-shrink-0 space-y-1">
          {sections.map(section => {
            const Icon = section.icon;
            const pct = getSectionProgress(section);
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => { setActiveSection(section.id); setActivePanel("worksheet"); setGuideOpen(false); }}
                className={`w-full text-left rounded-xl px-3 py-3 transition-all duration-200 border ${
                  isActive
                    ? "bg-primary-500 border-primary-500 text-white shadow-md"
                    : "bg-white border-neutral-200 text-neutral-700 hover:border-primary-300 hover:bg-primary-50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={14} className={isActive ? "text-white" : section.color} />
                  <span className="text-xs font-bold">{section.num}</span>
                  {pct === 100 && <CheckCircle size={12} className={isActive ? "text-green-200" : "text-green-500"} />}
                </div>
                <div className={`text-xs font-semibold leading-tight ${isActive ? "text-white" : "text-neutral-800"}`}>
                  {section.label}
                </div>
                {/* Mini progress bar */}
                <div className={`mt-2 h-1 rounded-full ${isActive ? "bg-primary-400" : "bg-neutral-100"}`}>
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${isActive ? "bg-white" : "bg-primary-400"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className={`text-xs mt-0.5 ${isActive ? "text-primary-100" : "text-neutral-400"}`}>
                  {pct}% done
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Section Title */}
          <div className="bg-white rounded-xl border border-neutral-200 p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => { const Icon = currentSection.icon; return <Icon size={20} className={currentSection.color} />; })()}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-400">{currentSection.num}</span>
                    <h3 className="font-bold text-neutral-900">{currentSection.label}</h3>
                    {progress === 100 && (
                      <span className="flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                        <CheckCircle size={10} /> Complete
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500">{currentSection.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right mr-2">
                  <div className="text-lg font-bold text-primary-500">{progress}%</div>
                  <div className="text-xs text-neutral-400">this section</div>
                </div>
                <div className="w-24 bg-neutral-100 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Panel Tabs */}
          <div className="flex gap-2 mb-4">
            {[
              { id: "worksheet" as const, label: "Worksheet", icon: CheckSquare },
              { id: "guide" as const, label: "Playbook Guide", icon: BookOpen },
              { id: "reference" as const, label: "0-to-Hero Reference", icon: Zap },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePanel(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activePanel === tab.id
                      ? "bg-primary-500 text-white shadow-md"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Panel Content */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5">

            {/* WORKSHEET PANEL */}
            {activePanel === "worksheet" && (
              <div className="space-y-5">
                <p className="text-sm text-neutral-600 italic border-l-4 border-primary-300 pl-3">
                  {currentSection.worksheet.intro}
                </p>

                {/* Checklist */}
                {currentSection.worksheet.checks && currentSection.worksheet.checks.length > 0 && (
                  <div className="space-y-2">
                    {currentSection.worksheet.checks.map(item => (
                      <label
                        key={item.id}
                        className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                          checked[item.id]
                            ? "bg-green-50 border border-green-200"
                            : item.urgent
                            ? "bg-red-50 border border-red-200 hover:border-red-300"
                            : "bg-neutral-50 border border-neutral-200 hover:border-primary-300"
                        }`}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {checked[item.id]
                            ? <CheckCircle size={18} className="text-green-500" />
                            : item.urgent
                            ? <AlertTriangle size={18} className="text-red-400" />
                            : <Circle size={18} className="text-neutral-300" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`text-sm ${checked[item.id] ? "line-through text-neutral-400" : item.urgent ? "text-red-800 font-medium" : "text-neutral-700"}`}>
                            {item.label}
                          </span>
                          {item.note && !checked[item.id] && (
                            <p className="text-xs text-neutral-500 mt-0.5">{item.note}</p>
                          )}
                        </div>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={!!checked[item.id]}
                          onChange={() => toggleCheck(item.id)}
                        />
                      </label>
                    ))}
                  </div>
                )}

                {/* Text Inputs */}
                {currentSection.worksheet.inputs && currentSection.worksheet.inputs.length > 0 && (
                  <div className="space-y-4">
                    {currentSection.worksheet.inputs.map(input => (
                      <div key={input.id}>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                          {input.label}
                          {textInputs[input.id]?.trim() && (
                            <span className="ml-2 text-xs text-green-600 font-normal">✓ filled</span>
                          )}
                        </label>
                        {input.multiline ? (
                          <textarea
                            value={textInputs[input.id] || ""}
                            onChange={e => updateText(input.id, e.target.value)}
                            placeholder={input.placeholder}
                            rows={3}
                            className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all resize-none"
                          />
                        ) : (
                          <input
                            type="text"
                            value={textInputs[input.id] || ""}
                            onChange={e => updateText(input.id, e.target.value)}
                            placeholder={input.placeholder}
                            className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* GUIDE PANEL */}
            {activePanel === "guide" && (
              <div>
                <div className="flex items-center gap-2 mb-4 text-xs text-neutral-500 bg-neutral-50 rounded-lg p-2">
                  <BookOpen size={12} />
                  This is your playbook reference for this section. Read it, then switch to the Worksheet to work through it.
                </div>
                {currentSection.guide}
              </div>
            )}

            {/* 0-TO-HERO REFERENCE PANEL */}
            {activePanel === "reference" && (
              <div>
                <div className="flex items-center gap-2 mb-4 text-xs text-neutral-500 bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                  <Zap size={12} className="text-yellow-500" />
                  Core marketing concepts and reference data from your 0-to-Hero guide.
                </div>
                <HeroReference />
              </div>
            )}
          </div>

          {/* Section Navigation Arrows */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => {
                const idx = sections.findIndex(s => s.id === activeSection);
                if (idx > 0) { setActiveSection(sections[idx - 1].id); setActivePanel("worksheet"); }
              }}
              disabled={sections.findIndex(s => s.id === activeSection) === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={14} className="rotate-180" /> Previous
            </button>
            <span className="text-xs text-neutral-400 self-center">
              {sections.findIndex(s => s.id === activeSection) + 1} / {sections.length}
            </span>
            <button
              onClick={() => {
                const idx = sections.findIndex(s => s.id === activeSection);
                if (idx < sections.length - 1) { setActiveSection(sections[idx + 1].id); setActivePanel("worksheet"); }
              }}
              disabled={sections.findIndex(s => s.id === activeSection) === sections.length - 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
