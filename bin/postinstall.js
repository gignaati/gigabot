/**
 * Giga Bot — postinstall.js
 * Runs after `npm install` to display welcome message.
 * Powered by Gignaati — https://www.gignaati.com
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
  const pkg = JSON.parse(
    readFileSync(join(__dirname, "../package.json"), "utf8")
  );

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   GIGA BOT v${pkg.version} — Successfully Installed!               ║
║   Powered by Gignaati — India's AI Agent Platform            ║
║                                                              ║
║   NEXT STEPS:                                                ║
║   1. Run: npx gigabot init                                   ║
║   2. Run: npm run setup                                      ║
║   3. Visit your APP_URL when setup completes                 ║
║                                                              ║
║   Documentation: https://github.com/gignaati/gigabot         ║
║   Support: support@gignaati.com                              ║
║   Website: https://www.gignaati.com                          ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`);
} catch {
  // Silent fail — postinstall should never break the install
}
