#!/usr/bin/env bash
# =============================================================================
#  Giga Bot — One-Command Installer for Linux / macOS
#  Powered by Gignaati — https://www.gignaati.com
# =============================================================================
set -e

# ─── TTY Re-attachment ────────────────────────────────────────────────────────
# When this script is piped via `curl | bash`, bash's stdin is the pipe (not
# the terminal). Any interactive child process (npm run setup → @clack/prompts)
# inherits that pipe as stdin, gets EOF immediately, and exits silently.
#
# Fix: if stdin is NOT a TTY but /dev/tty is available, redirect stdin from
# /dev/tty so all interactive prompts work correctly.
# This is the same pattern used by Homebrew, Rustup, and nvm installers.
if [ ! -t 0 ] && [ -e /dev/tty ]; then
  exec < /dev/tty
fi

BOLD="\033[1m"
GREEN="\033[0;32m"
CYAN="\033[0;36m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
RESET="\033[0m"

echo ""
echo -e "${BOLD}${CYAN}╔══════════════════════════════════════════════════════════╗${RESET}"
echo -e "${BOLD}${CYAN}║         Giga Bot — Powered by Gignaati                  ║${RESET}"
echo -e "${BOLD}${CYAN}║         https://www.gignaati.com                        ║${RESET}"
echo -e "${BOLD}${CYAN}╚══════════════════════════════════════════════════════════╝${RESET}"
echo ""

# Check Node.js
if ! command -v node &>/dev/null; then
  echo -e "${RED}✗ Node.js is not installed.${RESET}"
  echo "  Install it from https://nodejs.org (version 18 or higher required)"
  exit 1
fi
NODE_VERSION=$(node -e "process.stdout.write(process.versions.node.split('.')[0])")
if [ "$NODE_VERSION" -lt 18 ]; then
  echo -e "${RED}✗ Node.js version $NODE_VERSION is too old. Version 18+ is required.${RESET}"
  exit 1
fi
echo -e "${GREEN}✓ Node.js $(node --version)${RESET}"

# Check npm
if ! command -v npm &>/dev/null; then
  echo -e "${RED}✗ npm is not installed.${RESET}"
  exit 1
fi
echo -e "${GREEN}✓ npm $(npm --version)${RESET}"

# Check Git (optional — only needed for Cloud Mode)
if ! command -v git &>/dev/null; then
  echo -e "${YELLOW}⚠ Git is not installed (optional — only needed for Cloud Mode).${RESET}"
fi

# Check Docker (optional — only needed for running via docker-compose)
if ! command -v docker &>/dev/null; then
  echo -e "${YELLOW}⚠ Docker is not installed (optional — needed to run via docker-compose).${RESET}"
  echo -e "  Install from https://docs.docker.com/get-docker/"
fi

# Determine project directory
PROJECT_DIR="${1:-my-gigabot}"

# Resolve the absolute path so we can cd back to it after subshells
ABS_PROJECT_DIR="$(pwd)/${PROJECT_DIR}"

echo ""
echo -e "${BOLD}Creating project in: ${PROJECT_DIR}/${RESET}"
mkdir -p "$PROJECT_DIR"

# Scaffold the project inside the directory
echo ""
echo -e "${BOLD}Scaffolding Giga Bot project...${RESET}"
(cd "$PROJECT_DIR" && npx gigabot@latest init)

echo ""
echo -e "${GREEN}${BOLD}✅ Giga Bot scaffolded successfully!${RESET}"
echo ""

# ─── Auto-launch setup wizard ─────────────────────────────────────────────────
# Change into the project directory and run setup immediately so the user
# does not have to manually cd and run a second command.
echo -e "${BOLD}Launching setup wizard...${RESET}"
echo ""
cd "$ABS_PROJECT_DIR"
npm run setup

# ─── Post-setup instructions ──────────────────────────────────────────────────
echo ""
echo -e "${BOLD}${GREEN}✅ Setup complete!${RESET}"
echo ""
echo -e "${BOLD}To start GigaBot:${RESET}"
echo -e "  ${CYAN}npm run dev${RESET}   — Next.js dev server (recommended for development)"
echo -e "  ${CYAN}docker compose -f docker-compose.local.yml up -d${RESET}   — Docker (Local Mode)"
echo ""
echo -e "${BOLD}Docs:${RESET}    https://github.com/gignaati/gigabot"
echo -e "${BOLD}Support:${RESET} support@gignaati.com"
echo -e "${BOLD}Website:${RESET} https://gigabot.gignaati.com"
echo ""
