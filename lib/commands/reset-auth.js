/**
 * Giga Bot — Reset Auth Command
 * Powered by Gignaati — https://www.gignaati.com
 *
 * Regenerates AUTH_SECRET, invalidating all active sessions.
 */

import { randomBytes } from "crypto";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { execSync } from "child_process";
import chalk from "chalk";

export async function runResetAuth() {
  console.log(chalk.bold("\n  Giga Bot — Reset Auth Secret"));
  console.log(chalk.gray("  Powered by Gignaati — https://www.gignaati.com\n"));
  console.log(chalk.yellow("  ⚠ This will invalidate all active user sessions.\n"));

  const newSecret = randomBytes(32).toString("base64");

  // Update .env
  if (existsSync(".env")) {
    let env = readFileSync(".env", "utf8");
    if (env.includes("AUTH_SECRET=")) {
      env = env.replace(/AUTH_SECRET=.*/, `AUTH_SECRET=${newSecret}`);
    } else {
      env += `\nAUTH_SECRET=${newSecret}\n`;
    }
    writeFileSync(".env", env);
    console.log(chalk.green("  ✓ AUTH_SECRET updated in .env"));
  }

  // Update GitHub secret
  try {
    const ghUser = execSync("gh api user --jq .login", { encoding: "utf8", stdio: "pipe" }).trim();
    const repoName = execSync("gh repo view --json name --jq .name", { encoding: "utf8", stdio: "pipe" }).trim();
    execSync(`gh secret set AUTH_SECRET --body "${newSecret}" --repo ${ghUser}/${repoName}`, { stdio: "pipe" });
    console.log(chalk.green("  ✓ AUTH_SECRET updated in GitHub secrets"));
  } catch {
    console.log(chalk.yellow("  ↓ Could not update GitHub secret — update it manually"));
  }

  console.log(chalk.bold.green("\n  ✅ Auth secret reset. All sessions invalidated.\n"));
  console.log(chalk.gray("  Restart your app for the change to take effect.\n"));
}
