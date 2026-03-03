#!/usr/bin/env node
/**
 * Giga Bot — Interactive Setup Wizard
 * Powered by Gignaati — https://www.gignaati.com
 *
 * Guides users through the full setup process:
 * 1. GitHub repository configuration
 * 2. LLM provider selection and API key setup
 * 3. App URL configuration
 * 4. Authentication secret generation
 * 5. GitHub Actions secrets and variables
 */

import { intro, outro, text, select, password, confirm, spinner, note } from "@clack/prompts";
import { execSync, spawnSync } from "child_process";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { randomBytes } from "crypto";

const GIGNAATI_BANNER = `
  ╔══════════════════════════════════════════════════════════════╗
  ║   GIGA BOT Setup Wizard — Powered by Gignaati               ║
  ║   https://www.gignaati.com                                   ║
  ╚══════════════════════════════════════════════════════════════╝
`;

export async function runSetup() {
  console.log(GIGNAATI_BANNER);

  intro("Welcome to the Giga Bot Setup Wizard");

  // ── Step 1: Check prerequisites ────────────────────────────────────────────
  const s1 = spinner();
  s1.start("Checking prerequisites...");

  const checks = {
    node: checkCommand("node --version"),
    git: checkCommand("git --version"),
    gh: checkCommand("gh --version"),
    docker: checkCommand("docker --version"),
  };

  const missing = Object.entries(checks)
    .filter(([, ok]) => !ok)
    .map(([name]) => name);

  if (missing.length > 0) {
    s1.stop("Prerequisites check failed");
    note(
      `Missing: ${missing.join(", ")}\n\nPlease install the missing tools and re-run setup.\nSee: https://github.com/gignaati/gigabot#prerequisites`,
      "Missing Prerequisites"
    );
    process.exit(1);
  }

  s1.stop("All prerequisites satisfied ✓");

  // ── Step 2: GitHub authentication ──────────────────────────────────────────
  const ghAuth = checkCommand("gh auth status");
  if (!ghAuth) {
    note(
      "You need to authenticate with GitHub CLI.\nRun: gh auth login\nThen re-run: npm run setup",
      "GitHub Authentication Required"
    );
    process.exit(1);
  }

  // ── Step 3: Repository configuration ───────────────────────────────────────
  const ghUser = run("gh api user --jq .login").trim();
  const repoName = await text({
    message: "GitHub repository name for your Giga Bot:",
    placeholder: "my-gigabot",
    defaultValue: "my-gigabot",
    validate: (v) => (!v ? "Repository name is required" : undefined),
  });

  // ── Step 4: App URL ─────────────────────────────────────────────────────────
  const appUrlType = await select({
    message: "How will you expose your Giga Bot?",
    options: [
      { value: "ngrok", label: "ngrok (local development, free)" },
      { value: "cloudflare", label: "Cloudflare Tunnel (production, free)" },
      { value: "custom", label: "Custom domain / VPS" },
      { value: "pi", label: "Raspberry Pi with ngrok" },
    ],
  });

  let appUrl = "";
  if (appUrlType === "custom" || appUrlType === "cloudflare") {
    appUrl = await text({
      message: "Enter your app URL (e.g., https://gigabot.yourdomain.com):",
      placeholder: "https://gigabot.yourdomain.com",
      validate: (v) => {
        if (!v) return "App URL is required";
        if (!v.startsWith("https://")) return "URL must start with https://";
      },
    });
  } else {
    note(
      "You can set APP_URL later in your .env file after starting your tunnel.",
      "App URL"
    );
    appUrl = "https://placeholder.ngrok.io";
  }

  // ── Step 5: LLM Provider ────────────────────────────────────────────────────
  const llmProvider = await select({
    message: "Select your LLM provider:",
    options: [
      { value: "anthropic", label: "Anthropic Claude (recommended)" },
      { value: "openai", label: "OpenAI GPT" },
      { value: "google", label: "Google Gemini" },
    ],
  });

  const llmApiKey = await password({
    message: `Enter your ${llmProvider} API key:`,
    validate: (v) => (!v ? "API key is required" : undefined),
  });

  const llmModels = {
    anthropic: ["claude-opus-4-5", "claude-sonnet-4-5", "claude-haiku-4-5"],
    openai: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"],
    google: ["gemini-2.0-flash", "gemini-1.5-pro", "gemini-1.5-flash"],
  };

  const llmModel = await select({
    message: "Select your LLM model:",
    options: llmModels[llmProvider].map((m) => ({ value: m, label: m })),
  });

  // ── Step 6: Auth secret ─────────────────────────────────────────────────────
  const authSecret = randomBytes(32).toString("base64");
  const webhookSecret = randomBytes(20).toString("hex");

  // ── Step 7: Create GitHub repository ───────────────────────────────────────
  const createRepo = await confirm({
    message: `Create GitHub repository "${ghUser}/${repoName}"?`,
    initialValue: true,
  });

  if (createRepo) {
    const s2 = spinner();
    s2.start("Creating GitHub repository...");
    try {
      run(`gh repo create ${repoName} --private --confirm 2>/dev/null || true`);
      run(`git remote add origin https://github.com/${ghUser}/${repoName}.git 2>/dev/null || true`);
      s2.stop("Repository created ✓");
    } catch {
      s2.stop("Repository may already exist — continuing...");
    }
  }

  // ── Step 8: Generate GitHub token ──────────────────────────────────────────
  const s3 = spinner();
  s3.start("Generating GitHub token...");
  let ghToken = "";
  try {
    ghToken = run(
      `gh auth token 2>/dev/null || gh api -X POST /user/tokens --field name="gigabot-$(date +%s)" --field scopes="repo,workflow" --jq .token 2>/dev/null`
    ).trim();
  } catch {
    ghToken = "REPLACE_WITH_YOUR_GITHUB_TOKEN";
  }
  s3.stop("GitHub token ready ✓");

  // ── Step 9: Write .env ──────────────────────────────────────────────────────
  const envContent = `# Giga Bot — Environment Variables
# Generated by Giga Bot Setup Wizard
# Powered by Gignaati — https://www.gignaati.com
# Generated: ${new Date().toISOString()}

APP_URL=${appUrl}
APP_NAME=Giga Bot

AUTH_SECRET=${authSecret}

GH_OWNER=${ghUser}
GH_REPO=${repoName}
GH_TOKEN=${ghToken}
GH_WEBHOOK_SECRET=${webhookSecret}

LLM_PROVIDER=${llmProvider}
LLM_API_KEY=${llmApiKey}
LLM_MODEL=${llmModel}

AGENT_LLM_PROVIDER=${llmProvider}
AGENT_LLM_API_KEY=${llmApiKey}
AGENT_LLM_MODEL=${llmModel}

DATABASE_URL=./gigabot.db
GIGABOT_VERSION=1.0.0
`;

  writeFileSync(".env", envContent);

  // ── Step 10: Set GitHub secrets ─────────────────────────────────────────────
  const setSecrets = await confirm({
    message: "Set GitHub Actions secrets and variables now?",
    initialValue: true,
  });

  if (setSecrets) {
    const s4 = spinner();
    s4.start("Setting GitHub secrets...");
    try {
      const secrets = {
        GH_WEBHOOK_SECRET: webhookSecret,
        AGENT_GH_TOKEN: ghToken,
        [`AGENT_LLM_PROVIDER`]: llmProvider,
        [`AGENT_LLM_API_KEY`]: llmApiKey,
        [`AGENT_LLM_MODEL`]: llmModel,
      };

      for (const [key, value] of Object.entries(secrets)) {
        run(`gh secret set ${key} --body "${value}" --repo ${ghUser}/${repoName} 2>/dev/null || true`);
      }

      const vars = {
        APP_URL: appUrl,
        GH_OWNER: ghUser,
        GH_REPO: repoName,
        GIGABOT_VERSION: "1.0.0",
      };

      for (const [key, value] of Object.entries(vars)) {
        run(`gh variable set ${key} --body "${value}" --repo ${ghUser}/${repoName} 2>/dev/null || true`);
      }

      s4.stop("GitHub secrets and variables set ✓");
    } catch {
      s4.stop("Could not set all secrets — you can set them manually");
    }
  }

  // ── Step 11: Initial commit ─────────────────────────────────────────────────
  const doCommit = await confirm({
    message: "Push initial commit to GitHub?",
    initialValue: true,
  });

  if (doCommit) {
    const s5 = spinner();
    s5.start("Pushing to GitHub...");
    try {
      run("git add -A");
      run('git commit -m "feat: initialize Giga Bot — Powered by Gignaati" 2>/dev/null || true');
      run("git push -u origin main 2>/dev/null || git push -u origin master 2>/dev/null || true");
      s5.stop("Pushed to GitHub ✓");
    } catch {
      s5.stop("Could not push — you can push manually");
    }
  }

  // ── Done ────────────────────────────────────────────────────────────────────
  outro(`
  ✅ Giga Bot Setup Complete!

  NEXT STEPS:
  1. Start your tunnel (ngrok / Cloudflare) and update APP_URL in .env
  2. Run: npm run dev
  3. Visit: ${appUrl}

  REPOSITORY: https://github.com/${ghUser}/${repoName}
  DOCS: https://github.com/gignaati/gigabot
  SUPPORT: support@gignaati.com

  Powered by Gignaati — https://www.gignaati.com
  `);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function checkCommand(cmd) {
  try {
    execSync(cmd, { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

function run(cmd) {
  return execSync(cmd, { encoding: "utf8", stdio: "pipe" });
}
