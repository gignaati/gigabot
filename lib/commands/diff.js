/**
 * Giga Bot — Diff Command
 * Powered by Gignaati — https://www.gignaati.com
 *
 * Lists files that differ from package templates.
 */

import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, dirname, relative } from "path";
import { fileURLToPath } from "url";
import { createHash } from "crypto";
import chalk from "chalk";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = join(__dirname, "../../templates");

export async function runDiff(args) {
  const targetFile = args[0];
  const targetDir = process.cwd();

  console.log(chalk.bold("\n  Giga Bot — Template Diff"));
  console.log(chalk.gray("  Powered by Gignaati — https://www.gignaati.com\n"));

  const diffs = [];
  checkDir(TEMPLATES_DIR, targetDir, diffs);

  if (diffs.length === 0) {
    console.log(chalk.green("  ✓ All templates are up to date.\n"));
    return;
  }

  if (targetFile) {
    const match = diffs.find((d) => d.file === targetFile);
    if (match) {
      console.log(chalk.yellow(`  Modified: ${match.file}`));
      console.log(chalk.gray(`  Status: ${match.status}\n`));
    } else {
      console.log(chalk.green(`  ✓ ${targetFile} matches the template.\n`));
    }
    return;
  }

  console.log(chalk.yellow(`  ${diffs.length} file(s) differ from templates:\n`));
  diffs.forEach((d) => {
    const icon = d.status === "missing" ? chalk.red("✗") : chalk.yellow("~");
    console.log(`  ${icon} ${d.file} ${chalk.gray(`(${d.status})`)}`);
  });

  console.log(chalk.gray("\n  To restore a file: npx gigabot reset <file>\n"));
}

function checkDir(src, dest, diffs) {
  const entries = readdirSync(src);
  for (const entry of entries) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    const stat = statSync(srcPath);

    if (stat.isDirectory()) {
      checkDir(srcPath, destPath, diffs);
    } else {
      if (!existsSync(destPath)) {
        diffs.push({ file: relative(dest, destPath), status: "missing" });
      } else {
        const srcHash = hash(readFileSync(srcPath));
        const destHash = hash(readFileSync(destPath));
        if (srcHash !== destHash) {
          diffs.push({ file: relative(dest, destPath), status: "modified" });
        }
      }
    }
  }
}

function hash(content) {
  return createHash("md5").update(content).digest("hex");
}
