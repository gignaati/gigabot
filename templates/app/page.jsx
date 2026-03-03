import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/**
 * Giga Bot — Landing Page
 * Gignaati Black & White Brand Theme
 */
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* ── Hero Section ─────────────────────────────────────────────────── */}
        <section className="bg-black text-white py-24 px-6">
          <div className="container text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Powered by Gignaati — India&apos;s AI Agent Platform
            </div>
            <h1 className="text-white mb-6">
              Meet <span className="underline decoration-wavy decoration-white/40">Giga Bot</span>
            </h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Your autonomous AI agent that works 24/7. Configure it once, deploy it anywhere — Windows, Linux, or Mac. Built for India&apos;s edge-first AI ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat" className="btn-secondary border-white text-white hover:bg-white hover:text-black text-base py-3 px-8">
                Open Chat Interface
              </Link>
              <a
                href="https://github.com/gignaati/gigabot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary border-white/40 text-white/80 hover:border-white hover:text-white text-base py-3 px-8"
              >
                View on GitHub ↗
              </a>
            </div>
          </div>
        </section>

        {/* ── Install Command ───────────────────────────────────────────────── */}
        <section className="py-16 px-6 bg-gray-50 border-b border-gray-200">
          <div className="container text-center">
            <h2 className="text-2xl font-bold mb-3">Install in One Command</h2>
            <p className="text-gray-600 mb-8">Works on Windows, Linux, and macOS. Requires Node.js 18+.</p>
            <div className="max-w-2xl mx-auto">
              {/* Linux / Mac */}
              <div className="bg-gray-900 rounded-xl p-5 text-left mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Linux / macOS</span>
                </div>
                <code className="text-green-400 text-sm font-mono block">
                  curl -fsSL https://raw.githubusercontent.com/gignaati/gigabot/main/install.sh | bash
                </code>
              </div>
              {/* Windows */}
              <div className="bg-gray-900 rounded-xl p-5 text-left mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Windows (PowerShell)</span>
                </div>
                <code className="text-blue-400 text-sm font-mono block">
                  irm https://raw.githubusercontent.com/gignaati/gigabot/main/install.ps1 | iex
                </code>
              </div>
              {/* npm */}
              <div className="bg-gray-900 rounded-xl p-5 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">All Platforms (npm)</span>
                </div>
                <code className="text-yellow-400 text-sm font-mono block">
                  mkdir my-gigabot &amp;&amp; cd my-gigabot &amp;&amp; npx gigabot@latest init
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="container">
            <div className="text-center mb-14">
              <h2 className="mb-4">Why Giga Bot?</h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                Built on proven architecture, optimized for India&apos;s AI ecosystem.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "⚡",
                  title: "Edge-First Architecture",
                  desc: "Runs locally on your infrastructure. No foreign cloud dependency. 100% data sovereignty and privacy compliance.",
                },
                {
                  icon: "🔄",
                  title: "Self-Evolving Agent",
                  desc: "The agent modifies its own code through pull requests. Every change is auditable and reversible. You stay in control.",
                },
                {
                  icon: "🆓",
                  title: "Free Compute Built-In",
                  desc: "Uses GitHub Actions for agent jobs. Every GitHub account includes free compute time — no extra infrastructure cost.",
                },
                {
                  icon: "🔒",
                  title: "Enterprise Security",
                  desc: "API key authentication, webhook secret validation, session encryption, and secret filtering built in by default.",
                },
                {
                  icon: "🌐",
                  title: "Cross-Platform",
                  desc: "One-command install on Windows, Linux, and macOS. The web interface works on any device with a browser.",
                },
                {
                  icon: "🤖",
                  title: "Multi-Model Support",
                  desc: "Use Claude, GPT-4, Gemini, or any OpenAI-compatible model. Mix providers per task for optimal cost and performance.",
                },
              ].map((f) => (
                <div key={f.title} className="card">
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-gray-50 border-t border-gray-200">
          <div className="container">
            <div className="text-center mb-14">
              <h2 className="mb-4">How It Works</h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                A two-layer architecture that separates chat from agent execution.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "You Chat", desc: "Send a message or create a job via the web UI or Telegram." },
                { step: "02", title: "Job Branch", desc: "The Event Handler creates a dedicated job branch on GitHub." },
                { step: "03", title: "Agent Executes", desc: "GitHub Actions spins up a Docker container. The agent does the work and commits results." },
                { step: "04", title: "Auto-Merge", desc: "The PR is reviewed and auto-merged. You get notified when done." },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-black text-white font-bold text-sm flex items-center justify-center mx-auto mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-base mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Gignaati Ecosystem CTA ────────────────────────────────────────── */}
        <section className="py-20 px-6 bg-black text-white">
          <div className="container text-center">
            <h2 className="text-white mb-4">Part of the Gignaati Ecosystem</h2>
            <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10">
              Giga Bot is one component of Gignaati&apos;s complete AI platform — Academy, Workbench, and Marketplace — built to transform India&apos;s AI workforce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.gignaati.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary border-white text-white hover:bg-white hover:text-black text-base py-3 px-8"
              >
                Explore Gignaati ↗
              </a>
              <a
                href="https://github.com/gignaati/gigabot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary border-white/40 text-white/80 hover:border-white hover:text-white text-base py-3 px-8"
              >
                Star on GitHub ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
