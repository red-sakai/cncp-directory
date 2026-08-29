"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const tools = [
  {
    id: "01",
    name: "Membership Forms",
    description:
      "Apply for CNCP membership and submit your registration details.",
    url: "https://register-cncp.vercel.app/",
    status: "active",
    color: "#00d4ff",
  },
  {
    id: "02",
    name: "Admin Dashboard",
    description:
      "Review and manage membership applications, approvals, and records.",
    url: "https://cncp-reg-admin.vercel.app/",
    status: "active",
    color: "#7b61ff",
  },
  {
    id: "03",
    name: "ID Finder",
    description:
      "Look up and verify Cisco ID numbers for registered members.",
    url: "https://cncp-id-finder.vercel.app/",
    status: "active",
    color: "#00e5a0",
  },
  {
    id: "04",
    name: "Batchmail",
    description:
      "Compose and send bulk emails to CNCP members in one go.",
    url: "https://cisco-batchmail.vercel.app/",
    status: "active",
    color: "#ff6b9d",
  },
  {
    id: "05",
    name: "Discord Bot",
    description:
      "Automated server management and moderation. Use /announce-axie in the server to get started.",
    url: "https://github.com/Cisco-NetConnect-PUP-Manila/cisco-discord-bot",
    status: "active",
    color: "#a78bfa",
  },
  {
    id: "06",
    name: "CMS Website",
    description:
      "Content management system for the CNCP Manila public site.",
    url: "#",
    status: "construction",
    color: "#fbbf24",
  },
  {
    id: "07",
    name: "Tracker",
    description:
      "Track and monitor CNCP project progress and member activities.",
    url: "https://cncp-tracker.vercel.app/",
    status: "active",
    color: "#ff8a50",
  },
  {
    id: "08",
    name: "FrameIt",
    description:
      "Create DP blasts with no watermark. Clean, fast, and ready to share.",
    url: "https://beta-frameit.vercel.app/",
    status: "active",
    color: "#e879f9",
  },
  {
    id: "09",
    name: "Event Registration",
    description:
      "Register and manage attendees for CNCP Manila events and meetups.",
    url: "https://cncp-event-registration.vercel.app/",
    status: "active",
    color: "#2dd4bf",
  },
  {
    id: "10",
    name: "Scheduler",
    description:
      "Schedule interviews without free trial limits. Fully functional, no strings attached.",
    url: "https://cncp-scheduler.vercel.app/",
    status: "active",
    color: "#a3e635",
  },
];

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

const pillars = ["/P1.png", "/U1.png", "/P2.png"];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [hid, setHid] = useState(false);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const timers = pillars.map((_, i) =>
      setTimeout(() => setRevealed(i + 1), 400 + i * 500)
    );
    const fadeTimer = setTimeout(() => setHid(true), 2400);
    const removeTimer = setTimeout(() => setLoading(false), 3000);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {loading && (
        <div className={`loader ${hid ? "hid" : ""}`}>
          <div className="loader-inner">
            <div className="pillars-row">
              {pillars.map((src, i) => (
                <div
                  key={src}
                  className={`pillar ${revealed > i ? "show" : ""}`}
                >
                  <Image
                    src={src}
                    alt={`Pillar ${i + 1}`}
                    width={100}
                    height={200}
                    priority
                  />
                </div>
              ))}
            </div>
            <p className="loader-label">Cisco NetConnect PUP</p>
          </div>
        </div>
      )}

      <div className="bg-wrap" />
      <div className="noise" />

      <div className="page">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <Image
              src="/cncp-logo-transparent.png"
              alt="CNCP Logo"
              width={48}
              height={48}
              priority
            />
            <span className="logo-text">CNCP Manila</span>
          </div>
          <h1>
            Cisco NetConnect
            <br />
            Tool Directory
          </h1>
          <p className="subtitle">
            Central hub for all internal tools, dashboards, and services
            managed by the CNCP Manila chapter.
          </p>

          <div className="divider" />

          <nav className="sidebar-nav">
            {tools.map((tool) => (
              <a
                key={tool.id}
                href={tool.status === "active" ? tool.url : undefined}
                className={`sidebar-nav-item ${tool.status !== "active" ? "disabled" : ""}`}
              >
                <span
                  className="nav-dot"
                  style={{ background: tool.color }}
                />
                <span className="nav-name">{tool.name}</span>
                {tool.status !== "active" && (
                  <span className="nav-badge">
                    {tool.status === "construction" ? "Soon" : "TBD"}
                  </span>
                )}
              </a>
            ))}
          </nav>

          <div className="sidebar-footer">
            &copy; 2026 Cisco NetConnect PUP
            <br />
            Polytechnic University of the Philippines
          </div>
        </aside>

        <main className="content">
          <p className="section-label">Directory</p>
          <h2>All Tools</h2>
          <p className="section-desc">
            Click any card to open the corresponding tool. Items marked under
            construction will be available soon.
          </p>

          <div className="tool-grid">
            {tools.map((tool) => (
              <a
                key={tool.id}
                href={tool.status === "active" ? tool.url : undefined}
                className={`tool-card ${tool.status !== "active" ? "disabled" : ""}`}
                style={{ "--card-accent": tool.color } as React.CSSProperties}
              >
                {tool.status === "construction" && (
                  <div className="construction-stamp">Coming Soon</div>
                )}
                <span className="card-num">{tool.id}</span>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <span className="card-link">
                  {tool.status === "active" ? "Open" : "Unavailable"}
                  <Arrow />
                </span>
              </a>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
