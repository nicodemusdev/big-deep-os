"use client";

import { useState } from "react";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import Timeline from "./components/Timeline";
import Tasks from "./components/Tasks";
import Partners from "./components/Partners";
import ContentInventory from "./components/ContentInventory";
import Cadence from "./components/Cadence";
import Research from "./components/Research";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <main className="min-h-screen bg-cream">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="p-8 max-w-7xl mx-auto">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "timeline" && <Timeline />}
        {activeTab === "tasks" && <Tasks />}
        {activeTab === "partners" && <Partners />}
        {activeTab === "content" && <ContentInventory />}
        {activeTab === "cadence" && <Cadence />}
        {activeTab === "research" && <Research />}
      </div>
    </main>
  );
}
