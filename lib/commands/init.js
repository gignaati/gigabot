/**
 * Giga Bot — Init Command
 * Powered by Gignaati — https://www.gignaati.com
 *
 * Scaffolds a new Giga Bot project or updates existing templates.
 */

import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, dirname, relative } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = join(__dirname, "../../templates");
const PKG_PATH = join(__dirname, "../../package.json");

export async function runInit(args) {
  const pkg = JSON.parse(readFileSync(PKG_PATH, "utf8"));
  const targetDir = process.cwd();
  const isUpdate = existsSync(join(targetDir, "package.json"));

  console.log(chalk.bold("\n  Giga Bot — Powered by Gignaati"));
  console.log(chalk.gray("  https://www.gignaati.com\n"));

  if (isUpdate) {
    console.log(chalk.yellow("  Updating existing Giga Bot project templates...\n"));
  } else {
    console.log(chalk.green("  Initializing new Giga Bot project...\n"));
  }

  // ── Copy templates ──────────────────────────────────────────────────────────
  const copied = [];
  const skipped = [];

  copyDir(TEMPLATES_DIR, targetDir, copied, skipped, isUpdate);

  // ── Create package.json for the new project ─────────────────────────────────
  const projectPkgPath = join(targetDir, "package.json");
  if (!existsSync(projectPkgPath)) {
    const projectPkg = {
      name: "my-gigabot",
      version: "0.1.0",
      private: true,
      type: "module",
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
        lint: "next lint",
        setup: "npx gigabot setup",
        "setup-telegram": "npx gigabot setup-telegram",
        "db:generate": "drizzle-kit generate",
        "db:studio": "drizzle-kit studio",
      },
      dependencies: {
        gigabot: `^${pkg.version}`,
        next: "^15.5.12",
        "next-auth": "^5.0.0-beta.30",
        react: "^19.0.0",
        "react-dom": "^19.0.0",
      },
      devDependencies: {
        "@types/node": "^20",
        "@types/react": "^19",
        "@types/react-dom": "^19",
        "drizzle-kit": "^0.31.9",
        eslint: "^8",
        "eslint-config-next": "^15",
        typescript: "^5",
      },
    };
    writeFileSync(projectPkgPath, JSON.stringify(projectPkg, null, 2) + "\n");
    copied.push("package.json");
  }

  // ── Create .gitignore ───────────────────────────────────────────────────────
  const gitignorePath = join(targetDir, ".gitignore");
  if (!existsSync(gitignorePath)) {
    const gitignore = `# Dependencies
node_modules/
.pnp
.pnp.js

# Build outputs
.next/
out/
dist/
build/

# Environment variables — NEVER commit these
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Database
*.db
*.db-shm
*.db-wal

# OS files
.DS_Store
Thumbs.db
*.swp
*.swo

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.log

# Editor
.vscode/
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Giga Bot job branches (auto-generated)
# job/* branches are managed by GitHub Actions
`;
    writeFileSync(gitignorePath, gitignore);
    copied.push(".gitignore");
  }

  // ── Report ──────────────────────────────────────────────────────────────────
  if (copied.length > 0) {
    console.log(chalk.green(`  ✓ Files created/updated (${copied.length}):`));
    copied.slice(0, 20).forEach((f) => console.log(chalk.gray(`    ${f}`)));
    if (copied.length > 20) console.log(chalk.gray(`    ... and ${copied.length - 20} more`));
  }

  if (skipped.length > 0) {
    console.log(chalk.gray(`\n  ↓ Skipped (already exist): ${skipped.length} files`));
  }

  // ── Initialize git ──────────────────────────────────────────────────────────
  if (!existsSync(join(targetDir, ".git"))) {
    try {
      const { execSync } = await import("child_process");
      execSync("git init", { cwd: targetDir, stdio: "pipe" });
      execSync("git add -A", { cwd: targetDir, stdio: "pipe" });
      execSync('git commit -m "feat: initialize Giga Bot — Powered by Gignaati"', {
        cwd: targetDir,
        stdio: "pipe",
      });
      console.log(chalk.green("\n  ✓ Git repository initialized"));
    } catch {
      // Git init is optional
    }
  }

  console.log(chalk.bold.green("\n  ✅ Giga Bot initialized successfully!\n"));
  console.log(chalk.white("  NEXT STEPS:"));
  console.log(chalk.gray("  1. Install dependencies:  npm install"));
  console.log(chalk.gray("  2. Run setup wizard:      npm run setup"));
  console.log(chalk.gray("  3. Start development:     npm run dev"));
  console.log("");
  console.log(chalk.gray("  Docs: https://github.com/gignaati/gigabot"));
  console.log(chalk.gray("  Support: support@gignaati.com"));
  console.log(chalk.gray("  Powered by Gignaati — https://www.gignaati.com\n"));
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function copyDir(src, dest, copied, skipped, isUpdate) {
  const entries = readdirSync(src);

  for (const entry of entries) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    const stat = statSync(srcPath);

    if (stat.isDirectory()) {
      if (!existsSync(destPath)) mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath, copied, skipped, isUpdate);
    } else {
      // Skip .env if it already exists (don't overwrite user's config)
      if (entry === ".env" && existsSync(destPath)) {
        skipped.push(relative(dest, destPath));
        continue;
      }

      // In update mode, skip non-config files that already exist
      if (isUpdate && existsSync(destPath) && !isConfigFile(entry)) {
        skipped.push(relative(dest, destPath));
        continue;
      }

      copyFileSync(srcPath, destPath);
      copied.push(relative(dest, destPath));
    }
  }
}

function isConfigFile(filename) {
  const configFiles = [
    "SOUL.md",
    "JOB_PLANNING.md",
    "JOB_AGENT.md",
    "CRONS.json",
    "TRIGGERS.json",
    "run-job.yml",
    "auto-merge.yml",
    "rebuild-on-deploy.yml",
  ];
  return configFiles.includes(filename);
}
