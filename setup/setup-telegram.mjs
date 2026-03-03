#!/usr/bin/env node
/**
 * Giga Bot — Telegram Integration Setup
 * Powered by Gignaati — https://www.gignaati.com
 */

import { intro, outro, text, confirm, spinner, note } from "@clack/prompts";
import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync } from "fs";

export async function runSetupTelegram() {
  intro("Giga Bot — Telegram Integration Setup");

  note(
    "To connect Giga Bot to Telegram:\n1. Open Telegram and message @BotFather\n2. Send /newbot and follow the instructions\n3. Copy the bot token you receive",
    "Getting Your Telegram Bot Token"
  );

  const botToken = await text({
    message: "Enter your Telegram bot token:",
    placeholder: "1234567890:ABCdefGHIjklMNOpqrsTUVwxyz",
    validate: (v) => {
      if (!v) return "Bot token is required";
      if (!v.includes(":")) return "Invalid bot token format";
    },
  });

  // Validate token by calling Telegram API
  const s1 = spinner();
  s1.start("Validating bot token...");

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    const data = await response.json();

    if (!data.ok) {
      s1.stop("Invalid bot token");
      note("Please check your token and try again.", "Error");
      process.exit(1);
    }

    s1.stop(`Bot validated: @${data.result.username} ✓`);

    note(
      `Bot Name: ${data.result.first_name}\nBot Username: @${data.result.username}\nBot ID: ${data.result.id}`,
      "Bot Details"
    );
  } catch {
    s1.stop("Could not validate token — continuing anyway");
  }

  // Update .env
  if (existsSync(".env")) {
    let env = readFileSync(".env", "utf8");
    if (env.includes("TELEGRAM_BOT_TOKEN=")) {
      env = env.replace(/TELEGRAM_BOT_TOKEN=.*/, `TELEGRAM_BOT_TOKEN=${botToken}`);
    } else {
      env += `\nTELEGRAM_BOT_TOKEN=${botToken}\n`;
    }
    writeFileSync(".env", env);
  }

  // Set GitHub secret
  const setSecret = await confirm({
    message: "Set TELEGRAM_BOT_TOKEN as a GitHub secret?",
    initialValue: true,
  });

  if (setSecret) {
    const s2 = spinner();
    s2.start("Setting GitHub secret...");
    try {
      const ghUser = execSync("gh api user --jq .login", { encoding: "utf8", stdio: "pipe" }).trim();
      const repoName = execSync("gh repo view --json name --jq .name", { encoding: "utf8", stdio: "pipe" }).trim();
      execSync(`gh secret set TELEGRAM_BOT_TOKEN --body "${botToken}" --repo ${ghUser}/${repoName}`, { stdio: "pipe" });
      s2.stop("GitHub secret set ✓");
    } catch {
      s2.stop("Could not set GitHub secret — add it manually");
    }
  }

  // Set webhook
  const appUrl = process.env.APP_URL || readEnvVar("APP_URL");
  if (appUrl && appUrl !== "https://placeholder.ngrok.io") {
    const setWebhook = await confirm({
      message: `Set Telegram webhook to ${appUrl}/api/telegram?`,
      initialValue: true,
    });

    if (setWebhook) {
      const s3 = spinner();
      s3.start("Setting Telegram webhook...");
      try {
        const webhookSecret = readEnvVar("GH_WEBHOOK_SECRET") || "gigabot-webhook";
        const response = await fetch(
          `https://api.telegram.org/bot${botToken}/setWebhook?url=${appUrl}/api/telegram&secret_token=${webhookSecret}`
        );
        const data = await response.json();
        if (data.ok) {
          s3.stop("Telegram webhook set ✓");
        } else {
          s3.stop(`Webhook error: ${data.description}`);
        }
      } catch {
        s3.stop("Could not set webhook — set it manually");
      }
    }
  } else {
    note(
      `Once your app is running, set the webhook manually:\nhttps://api.telegram.org/bot${botToken}/setWebhook?url=YOUR_APP_URL/api/telegram`,
      "Manual Webhook Setup"
    );
  }

  outro(`
  ✅ Telegram Integration Setup Complete!

  Your Giga Bot is now connected to Telegram.
  Message your bot to start chatting!

  Powered by Gignaati — https://www.gignaati.com
  `);
}

function readEnvVar(key) {
  try {
    const env = readFileSync(".env", "utf8");
    const match = env.match(new RegExp(`^${key}=(.+)$`, "m"));
    return match ? match[1].trim() : "";
  } catch {
    return "";
  }
}
