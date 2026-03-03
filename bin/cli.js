#!/usr/bin/env node
/**
 * Giga Bot CLI — Powered by Gignaati
 * https://www.gignaati.com
 *
 * The autonomous AI agent platform for India-first, edge-native AI.
 * Based on the thepopebot architecture (MIT License).
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, "../package.json"), "utf8"));

const command = process.argv[2];
const args = process.argv.slice(3);

const GIGNAATI_BANNER = `
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ██████╗ ██╗ ██████╗  █████╗     ██████╗  ██████╗ ████████╗  ║
║  ██╔════╝ ██║██╔════╝ ██╔══██╗   ██╔══██╗██╔═══██╗╚══██╔══╝  ║
║  ██║  ███╗██║██║  ███╗███████║   ██████╔╝██║   ██║   ██║     ║
║  ██║   ██║██║██║   ██║██╔══██║   ██╔══██╗██║   ██║   ██║     ║
║  ╚██████╔╝██║╚██████╔╝██║  ██║   ██████╔╝╚██████╔╝   ██║     ║
║   ╚═════╝ ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═════╝  ╚═════╝    ╚═╝     ║
║                                                           ║
║   Giga Bot v${pkg.version.padEnd(10)} — Gignaati AI Agent Platform     ║
║   https://www.gignaati.com                                ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`;

async function main() {
  switch (command) {
    case "init":
      console.log(GIGNAATI_BANNER);
      const { runInit } = await import("../lib/commands/init.js");
      await runInit(args);
      break;

    case "setup":
      console.log(GIGNAATI_BANNER);
      const { runSetup } = await import("../setup/setup.mjs");
      await runSetup(args);
      break;

    case "setup-telegram":
      const { runSetupTelegram } = await import("../setup/setup-telegram.mjs");
      await runSetupTelegram(args);
      break;

    case "upgrade":
      const { runUpgrade } = await import("../lib/commands/upgrade.js");
      await runUpgrade(args);
      break;

    case "diff":
      const { runDiff } = await import("../lib/commands/diff.js");
      await runDiff(args);
      break;

    case "reset":
      const { runReset } = await import("../lib/commands/reset.js");
      await runReset(args);
      break;

    case "reset-auth":
      const { runResetAuth } = await import("../lib/commands/reset-auth.js");
      await runResetAuth(args);
      break;

    case "set-agent-secret":
      const { runSetAgentSecret } = await import("../lib/commands/set-secret.js");
      await runSetAgentSecret(args, "AGENT_");
      break;

    case "set-agent-llm-secret":
      const { runSetAgentSecret: runSetLlmSecret } = await import("../lib/commands/set-secret.js");
      await runSetLlmSecret(args, "AGENT_LLM_");
      break;

    case "set-var":
      const { runSetVar } = await import("../lib/commands/set-var.js");
      await runSetVar(args);
      break;

    case "--version":
    case "-v":
    case "version":
      console.log(`gigabot v${pkg.version}`);
      console.log(`Powered by Gignaati — https://www.gignaati.com`);
      break;

    case "--help":
    case "-h":
    case "help":
    default:
      console.log(GIGNAATI_BANNER);
      printHelp();
      break;
  }
}

function printHelp() {
  console.log(`
  Giga Bot — Gignaati's Autonomous AI Agent Platform
  
  USAGE
    npx gigabot <command> [options]

  PROJECT SETUP
    init                  Scaffold a new Giga Bot project, or update templates
    setup                 Run the full interactive setup wizard
    setup-telegram        Configure Telegram bot integration
    reset-auth            Regenerate AUTH_SECRET, invalidating all sessions

  TEMPLATES
    diff [file]           List files that differ from package templates
    reset [file]          Restore a specific file to package default

  SECRETS & VARIABLES
    set-agent-secret      Set AGENT_<KEY> GitHub secret and update .env
    set-agent-llm-secret  Set AGENT_LLM_<KEY> GitHub secret
    set-var               Set a GitHub repository variable

  MAINTENANCE
    upgrade [@beta|ver]   Upgrade to latest, beta, or specific version

  INFO
    --version, -v         Print version
    --help, -h            Show this help message

  QUICK START
    mkdir my-gigabot && cd my-gigabot
    npx gigabot@latest init
    npm run setup

  DOCUMENTATION
    https://github.com/gignaati/gigabot
    https://www.gignaati.com

  SUPPORT
    support@gignaati.com
  `);
}

main().catch((err) => {
  console.error(`\n[Giga Bot] Error: ${err.message}`);
  process.exit(1);
});
