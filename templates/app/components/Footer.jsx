import Link from "next/link";

/**
 * Giga Bot — Footer Component
 * Gignaati Black & White Brand Theme
 * Includes all legal links, social links, and contact information
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-700">

          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="flex items-center justify-center rounded-full bg-white text-black font-bold"
                style={{ width: 36, height: 36, fontSize: 14, letterSpacing: "-0.05em" }}
                aria-hidden="true"
              >
                GB
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-white text-sm leading-none">Giga Bot</span>
                <span className="text-gray-400 text-xs leading-none">by Gignaati</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              India&apos;s autonomous AI agent platform. Build, deploy, and run AI agents 24/7 with zero vendor lock-in.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/company/gignaati" target="_blank" rel="noopener noreferrer" aria-label="Gignaati on LinkedIn" className="text-gray-400 hover:text-white transition-colors text-sm">LinkedIn</a>
              <span className="text-gray-600">·</span>
              <a href="https://x.com/gignaati" target="_blank" rel="noopener noreferrer" aria-label="Gignaati on X" className="text-gray-400 hover:text-white transition-colors text-sm">X</a>
              <span className="text-gray-600">·</span>
              <a href="https://www.youtube.com/@gignaati" target="_blank" rel="noopener noreferrer" aria-label="Gignaati on YouTube" className="text-gray-400 hover:text-white transition-colors text-sm">YouTube</a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link></li>
              <li><Link href="/chat" className="text-gray-400 hover:text-white text-sm transition-colors">Chat Interface</Link></li>
              <li><Link href="/jobs" className="text-gray-400 hover:text-white text-sm transition-colors">Agent Jobs</Link></li>
              <li><Link href="/settings" className="text-gray-400 hover:text-white text-sm transition-colors">Settings</Link></li>
              <li>
                <a href="https://github.com/gignaati/gigabot" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">
                  GitHub Repository ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Gignaati Ecosystem */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Gignaati</h3>
            <ul className="space-y-2">
              <li><a href="https://www.gignaati.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">Main Website ↗</a></li>
              <li><a href="https://www.gignaati.com/academy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">Academy ↗</a></li>
              <li><a href="https://www.gignaati.com/workbench" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">Workbench ↗</a></li>
              <li><a href="https://www.gignaati.com/marketplace" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">Marketplace ↗</a></li>
              <li><a href="https://www.gignaati.com/partnerships" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">Partnerships ↗</a></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Legal & Support</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
              <li><Link href="/security" className="text-gray-400 hover:text-white text-sm transition-colors">Security</Link></li>
              <li>
                <a href="mailto:support@gignaati.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                  support@gignaati.com
                </a>
              </li>
              <li>
                <a href="https://github.com/gignaati/gigabot/issues" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Report an Issue ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-gray-500 text-xs leading-relaxed">
            <p>© {currentYear} Gignaati. All rights reserved.</p>
            <p className="mt-1">
              Giga Bot is open-source software licensed under the{" "}
              <a href="https://github.com/gignaati/gigabot/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                MIT License
              </a>
              .
            </p>
            <p className="mt-1">
              Built on{" "}
              <a href="https://github.com/stephengpope/thepopebot" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                thepopebot
              </a>{" "}
              architecture by Stephen Pope (MIT License).
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            <Link href="/privacy-policy" className="text-gray-500 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="text-gray-500 hover:text-white transition-colors">Terms</Link>
            <Link href="/security" className="text-gray-500 hover:text-white transition-colors">Security</Link>
            <a href="https://www.gignaati.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">gignaati.com ↗</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
