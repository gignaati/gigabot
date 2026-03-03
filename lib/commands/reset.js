/**
 * Giga Bot — Reset Command
 * Powered by Gignaati — https://www.gignaati.com
 *
 * Restores a specific file to its package template default.
 */

import { copyFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = join(__dirname, "../../templates");

export async function runReset(args) {
  const targetFile = args[0];

  console.log(chalk.bold("\n  Giga Bot — Reset Template File"));
  console.log(chalk.gray("  Powered by Gignaati — https://www.gignaati.com\n"));

  if (!targetFile) {
    console.log(chalk.yellow("  Usage: npx gigabot reset <file>\n"));
    console.log(chalk.gray("  Example: npx gigabot reset .github/workflows/run-job.yml\n"));
    process.exit(1);
  }

  const srcPath = join(TEMPLATES_DIR, targetFile);
  const destPath = join(process.cwd(), targetFile);

  if (!existsSync(srcPath)) {
    console.log(chalk.red(`  ✗ Template not found: ${targetFile}\n`));
    process.exit(1);
  }

  copyFileSync(srcPath, destPath);
  console.log(chalk.green(`  ✓ Restored: ${targetFile}\n`));
}
