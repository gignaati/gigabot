/**
 * Giga Bot — Set Agent Secret Command
 * Powered by Gignaati — https://www.gignaati.com
 *
 * Sets AGENT_<KEY> or AGENT_LLM_<KEY> as a GitHub secret and updates .env.
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync } from "fs";
import chalk from "chalk";

export async function runSetAgentSecret(args, prefix = "AGENT_") {
  const [key, value] = args;

  console.log(chalk.bold("\n  Giga Bot — Set Agent Secret"));
  console.log(chalk.gray("  Powered by Gignaati — https://www.gignaati.com\n"));

  if (!key || !value) {
    console.log(chalk.yellow(`  Usage: npx gigabot set-agent-secret <KEY> <VALUE>\n`));
    console.log(chalk.gray(`  Sets ${prefix}<KEY> as a GitHub secret and updates .env.\n`));
    process.exit(1);
  }

  const fullKey = `${prefix}${key.toUpperCase()}`;

  // Update .env
  if (existsSync(".env")) {
    let env = readFileSync(".env", "utf8");
    if (env.includes(`${fullKey}=`)) {
      env = env.replace(new RegExp(`^${fullKey}=.*$`, "m"), `${fullKey}=${value}`);
    } else {
      env += `\n${fullKey}=${value}\n`;
    }
    writeFileSync(".env", env);
    console.log(chalk.green(`  ✓ ${fullKey} updated in .env`));
  }

  // Set GitHub secret
  try {
    const ghUser = execSync("gh api user --jq .login", { encoding: "utf8", stdio: "pipe" }).trim();
    const repoName = execSync("gh repo view --json name --jq .name", { encoding: "utf8", stdio: "pipe" }).trim();
    execSync(`gh secret set ${fullKey} --body "${value}" --repo ${ghUser}/${repoName}`, { stdio: "pipe" });
    console.log(chalk.green(`  ✓ ${fullKey} set in GitHub secrets`));
  } catch {
    console.log(chalk.yellow(`  ↓ Could not set GitHub secret — update it manually`));
  }

  console.log(chalk.bold.green(`\n  ✅ ${fullKey} configured.\n`));
}
