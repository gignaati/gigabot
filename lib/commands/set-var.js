/**
 * Giga Bot — Set Variable Command
 * Powered by Gignaati — https://www.gignaati.com
 */

import { execSync } from "child_process";
import chalk from "chalk";

export async function runSetVar(args) {
  const [key, value] = args;

  console.log(chalk.bold("\n  Giga Bot — Set GitHub Variable"));
  console.log(chalk.gray("  Powered by Gignaati — https://www.gignaati.com\n"));

  if (!key || !value) {
    console.log(chalk.yellow("  Usage: npx gigabot set-var <KEY> <VALUE>\n"));
    process.exit(1);
  }

  try {
    const ghUser = execSync("gh api user --jq .login", { encoding: "utf8", stdio: "pipe" }).trim();
    const repoName = execSync("gh repo view --json name --jq .name", { encoding: "utf8", stdio: "pipe" }).trim();
    execSync(`gh variable set ${key} --body "${value}" --repo ${ghUser}/${repoName}`, { stdio: "pipe" });
    console.log(chalk.green(`  ✓ Variable ${key} set in GitHub repository`));
    console.log(chalk.bold.green("\n  ✅ Done.\n"));
  } catch (err) {
    console.error(chalk.red(`  ✗ Failed: ${err.message}\n`));
    process.exit(1);
  }
}
