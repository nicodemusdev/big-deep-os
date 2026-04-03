"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, AlertCircle, CheckCircle, Play, Pause, BarChart2 } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  objective: string;
  phase: string;
  dates: string;
  budget: string;
  budgetPerDay: string;
  audience: string;
  creative: string;
  cta: string;
  successTarget: string;
  pauseRule: string;
  status: "not-started" | "building" | "ready" | "live" | "paused" | "complete";
}

interface CampaignMetric {
  campaignId: string;
  spend: string;
  reach: string;
  cpv: string;
  views: string;
  follows: string;
  clicks: string;
  notes: string;
}

const defaultCampaigns: Campaign[] = [
  {
    id: "c1",
    name: "Campaign 1 — Inklines Video Views",
    objective: "Video Views (ThruPlay — 15 sec min)",
    phase: "Launch Week",
    dates: "April 16 – April 22 (extend to Apr 28 if CPV < $0.04)",
    budget: "$50–75 total",
    budgetPerDay: "$7–10/day",
    audience: "Jam bands, Phish, Widespread Panic, festival culture — Age 22–45 — US",
    creative: "Inklines animated reveal video (full version)",
    cta: "Learn More → BigDeep.Band",
    successTarget: "CPV under $0.05 | 10,000+ unique video views",
    pauseRule: "Pause if CPV exceeds $0.10 by Day 3",
    status: "not-started",
  },
  {
    id: "c2",
    name: "Campaign 2 — Profile Visit / Follow Growth",
    objective: "Reach or Traffic → Profile Visit",
    phase: "Build Phase",
    dates: "April 23 – April 30",
    budget: "$30–40 total",
    budgetPerDay: "$5/day",
    audience: "Custom: Website visitors (Pixel) + Video viewers who watched 50%+ of Inklines video",
    creative: "Best performing organic post from launch week (highest saves/shares)",
    cta: "See Profile → @BigDeepBand",
    successTarget: "Profile visits under $0.30 each | 200+ net followers gained",
    pauseRule: "Pause if CPF exceeds $1.50 after Day 4",
    status: "not-started",
  },
];

const statusConfig: Record<Campaign["status"], { label: string; color: string; icon: React.ElementType }> = {
  "not-started": { label: "Not Started", color: "bg-neutral-100 text-neutral-600 border-neutral-200", icon: Circle },
  "building": { label: "Building in Ads Manager", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: BarChart2 },
  "ready": { label: "Built — Ready to Launch", color: "bg-blue-100 text-blue-700 border-blue-200", icon: CheckCircle },
  "live": { label: "🔴 Live", color: "bg-green-100 text-green-700 border-green-200", icon: Play },
  "paused": { label: "Paused", color: "bg-orange-100 text-orange-700 border-orange-200", icon: Pause },
  "complete": { label: "Complete", color: "bg-primary-100 text-primary-700 border-primary-200", icon: CheckCircle },
};

function Circle({ size }: { size: number }) {
  return <div style={{ width: size, height: size }} className="rounded-full border-2 border-neutral-400 flex-shrink-0" />;
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(defaultCampaigns);
  const [metrics, setMetrics] = useState<Record<string, CampaignMetric>>({});
  const [expandedId, setExpandedId] = useState<string | null>("c1");
  const [metricsOpenId, setMetricsOpenId] = useState<string | null>(null);

  const updateStatus = (id: string, status: Campaign["status"]) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  const updateMetric = (campaignId: string, field: keyof CampaignMetric, value: string) => {
    setMetrics(prev => ({
      ...prev,
      [campaignId]: {
        ...(prev[campaignId] || { campaignId, spend: "", reach: "", cpv: "", views: "", follows: "", clicks: "", notes: "" }),
        [field]: value,
      },
    }));
  };

  const totalSpend = Object.values(metrics)
    .map(m => parseFloat(m.spend.replace(/[^0-9.]/g, "")) || 0)
    .reduce((a, b) => a + b, 0);

  const liveCampaigns = campaigns.filter(c => c.status === "live").length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-serif text-neutral-900 mb-2 flex items-center gap-2">
          <DollarSign size={32} className="text-primary-500" />
          Campaign Tracker
        </h2>
        <p className="text-neutral-600">Build, launch, and track your paid ad campaigns — April through May</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card-retro p-4 text-center">
          <p className="text-3xl font-serif font-bold text-primary-500">{liveCampaigns}</p>
          <p className="text-sm text-neutral-600 mt-1">Active Campaigns</p>
        </div>
        <div className="card-retro p-4 text-center">
          <p className="text-3xl font-serif font-bold text-accent-500">
            ${totalSpend > 0 ? totalSpend.toFixed(2) : "0"}
          </p>
          <p className="text-sm text-neutral-600 mt-1">Total Spent</p>
        </div>
        <div className="card-retro p-4 text-center">
          <p className="text-3xl font-serif font-bold text-green-500">
            {campaigns.filter(c => c.status === "complete").length}/{campaigns.length}
          </p>
          <p className="text-sm text-neutral-600 mt-1">Campaigns Complete</p>
        </div>
      </div>

      {/* DDM Budget Rule */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-yellow-800">DDM Rule</p>
          <p className="text-sm text-yellow-700">Never spend money on a post that isn&apos;t already performing organically. Ads amplify what&apos;s working — they don&apos;t rescue what isn&apos;t. Let the algorithm find your audience for free first.</p>
        </div>
      </div>

      {/* Campaign Cards */}
      <div className="space-y-4">
        {campaigns.map((campaign, idx) => {
          const StatusIcon = statusConfig[campaign.status].icon;
          const isExpanded = expandedId === campaign.id;
          const isMetricsOpen = metricsOpenId === campaign.id;
          const m = metrics[campaign.id];

          return (
            <div key={campaign.id} className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              {/* Campaign Header */}
              <div
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : campaign.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">{campaign.name}</h3>
                    <p className="text-xs text-neutral-500">{campaign.phase} · {campaign.dates}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[campaign.status].color}`}>
                    <StatusIcon size={10} />
                    {statusConfig[campaign.status].label}
                  </span>
                  <span className="text-neutral-400 text-sm">{isExpanded ? "▲" : "▼"}</span>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-neutral-100 p-5 space-y-5">
                  {/* Campaign Brief */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ["Objective", campaign.objective],
                      ["Budget", `${campaign.budget} · ${campaign.budgetPerDay}`],
                      ["Audience", campaign.audience],
                      ["Creative", campaign.creative],
                      ["CTA", campaign.cta],
                      ["Success Target", campaign.successTarget],
                      ["Pause Rule", campaign.pauseRule],
                    ].map(([label, value]) => (
                      <div key={label} className={`bg-neutral-50 rounded-lg p-3 ${label === "Audience" || label === "Pause Rule" ? "col-span-2" : ""}`}>
                        <p className="text-xs font-bold text-neutral-500 uppercase mb-1">{label}</p>
                        <p className="text-sm text-neutral-800">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Status Update Buttons */}
                  <div>
                    <p className="text-xs font-bold text-neutral-500 uppercase mb-2">Update Status</p>
                    <div className="flex flex-wrap gap-2">
                      {(["not-started", "building", "ready", "live", "paused", "complete"] as Campaign["status"][]).map(s => (
                        <button
                          key={s}
                          onClick={() => updateStatus(campaign.id, s)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            campaign.status === s
                              ? statusConfig[s].color + " shadow-sm"
                              : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50"
                          }`}
                        >
                          {statusConfig[s].label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Metrics Section */}
                  <div>
                    <button
                      onClick={() => setMetricsOpenId(isMetricsOpen ? null : campaign.id)}
                      className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <TrendingUp size={14} />
                      {isMetricsOpen ? "Hide" : "Log"} Campaign Metrics
                    </button>

                    {isMetricsOpen && (
                      <div className="mt-3 grid grid-cols-3 gap-3">
                        {[
                          { field: "spend" as const, label: "Total Spend", placeholder: "e.g. $68.50" },
                          { field: "reach" as const, label: "Total Reach", placeholder: "e.g. 24,300" },
                          { field: "cpv" as const, label: "CPV / CPF / CPC", placeholder: "e.g. $0.04 CPV" },
                          { field: "views" as const, label: "Video Views", placeholder: "e.g. 14,230" },
                          { field: "follows" as const, label: "Follows / Clicks", placeholder: "e.g. 287 follows" },
                          { field: "clicks" as const, label: "Link Clicks", placeholder: "e.g. 142 clicks" },
                        ].map(({ field, label, placeholder }) => (
                          <div key={field}>
                            <label className="text-xs font-medium text-neutral-500 block mb-1">{label}</label>
                            <input
                              type="text"
                              value={m?.[field] || ""}
                              onChange={e => updateMetric(campaign.id, field, e.target.value)}
                              placeholder={placeholder}
                              className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                            />
                          </div>
                        ))}
                        <div className="col-span-3">
                          <label className="text-xs font-medium text-neutral-500 block mb-1">Decision Notes (extend, pause, adjust?)</label>
                          <input
                            type="text"
                            value={m?.notes || ""}
                            onChange={e => updateMetric(campaign.id, "notes", e.target.value)}
                            placeholder="e.g. Extended to Apr 28 — CPV was $0.03, too good to stop. Shifted budget from C2 to extend C1."
                            className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Setup Checklist */}
      <div className="card-retro">
        <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <CheckCircle size={18} className="text-primary-500" />
          Ads Manager Setup Checklist
        </h3>
        <SetupChecklist />
      </div>

      {/* Monthly Budget Planner */}
      <div className="card-retro">
        <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <BarChart2 size={18} className="text-primary-500" />
          Monthly Budget Plan
        </h3>
        <div className="space-y-3">
          {[
            { month: "April", budget: "$75", allocation: "$50–75 on Campaign 1 (Inklines Video Views) only" },
            { month: "May", budget: "$150–200", allocation: "$75 Video Views extension + $30 Profile/Follow + $40–50 Pre-save Traffic" },
            { month: "June+", budget: "$200–300/month", allocation: "$100 content amplification + $100 audience growth + $100 retargeting" },
          ].map((row, i) => (
            <div key={i} className="flex items-start gap-4 p-3 bg-neutral-50 rounded-lg">
              <div className="w-20 flex-shrink-0">
                <p className="font-bold text-neutral-900 text-sm">{row.month}</p>
                <p className="text-primary-600 font-bold text-lg">{row.budget}</p>
              </div>
              <p className="text-sm text-neutral-600 pt-1">{row.allocation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SetupChecklist() {
  const items = [
    "Meta Business Manager account created",
    "Facebook Page connected to Business Manager",
    "Instagram @BigDeepBand connected to Business Manager",
    "Meta Pixel created and installed on BigDeep.Band",
    "Pixel verified as firing (use Meta Pixel Helper Chrome extension)",
    "Payment method added to Ads Manager",
    "TikTok Business Account created (for TikTok Spark Ads later)",
    "Campaign 1 built in Ads Manager — NOT launched until April 16",
    "All creatives uploaded and reviewed in Ads Manager",
    "Ad account spending limit set ($100 cap for first campaign)",
  ];

  const [checked, setChecked] = useState<Record<number, boolean>>({});

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <label
          key={i}
          className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all ${
            checked[i] ? "bg-green-50 border border-green-200" : "hover:bg-neutral-50"
          }`}
        >
          <div className="flex-shrink-0">
            {checked[i]
              ? <CheckCircle size={16} className="text-green-500" />
              : <div className="w-4 h-4 rounded border-2 border-neutral-300" />
            }
          </div>
          <span className={`text-sm ${checked[i] ? "line-through text-neutral-400" : "text-neutral-700"}`}>
            {item}
          </span>
          <input type="checkbox" className="sr-only" checked={!!checked[i]} onChange={() => setChecked(prev => ({ ...prev, [i]: !prev[i] }))} />
        </label>
      ))}
    </div>
  );
}
