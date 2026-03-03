/**
 * Giga Bot — Upgrade Command
 * Powered by Gignaati — https://www.gignaati.com
 */

import { execSync } from "child_process";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function runUpgrade(args) {
  const version = args[0] || "latest";
  const pkg = JSON.parse(readFileSync(join(__dirname, "../../package.json"), "utf8"));

  console.log(chalk.bold("\n  Giga Bot — Upgrade"));
  console.log(chalk.gray("  Powered by Gignaati — https://www.gignaati.com\n"));
  console.log(chalk.gray(`  Current version: ${pkg.version}`));
  console.log(chalk.gray(`  Target version:  ${version}\n`));

  try {
    console.log(chalk.blue(`  Upgrading gigabot to ${version}...`));
    execSync(`npm install gigabot@${version}`, { stdio: "inherit" });

    console.log(chalk.blue("\n  Updating templates..."));
    const { runInit } = await import("./init.js");
    await runInit(["--update"]);

    console.log(chalk.bold.green("\n  ✅ Giga Bot upgraded successfully!\n"));
    console.log(chalk.gray("  Run 'npm run dev' to start with the new version.\n"));
  } catch (err) {
    console.error(chalk.red(`\n  ✗ Upgrade failed: ${err.message}\n`));
    process.exit(1);
  }
}
