#!/usr/bin/env bash
# =============================================================================
#  Giga Bot — One-Command Installer
#  Powered by Gignaati — https://www.gignaati.com
#
#  Usage:
#    curl -fsSL https://raw.githubusercontent.com/gignaati/gigabot/main/install.sh | bash
#
#  Or with a project name:
#    curl -fsSL https://raw.githubusercontent.com/gignaati/gigabot/main/install.sh | bash -s -- my-gigabot
# =============================================================================

set -e

# ── Colors ────────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# ── Banner ────────────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║                                                              ║${NC}"
echo -e "${BOLD}║   GIGA BOT — Gignaati AI Agent Platform                      ║${NC}"
echo -e "${BOLD}║   https://www.gignaati.com                                   ║${NC}"
echo -e "${BOLD}║                                                              ║${NC}"
echo -e "${BOLD}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# ── Detect OS ─────────────────────────────────────────────────────────────────
OS="unknown"
case "$(uname -s)" in
  Linux*)   OS="linux";;
  Darwin*)  OS="mac";;
  CYGWIN*|MINGW*|MSYS*) OS="windows";;
esac

echo -e "${BLUE}[Giga Bot]${NC} Detected OS: ${BOLD}${OS}${NC}"
echo ""

# ── Helper: check command exists ──────────────────────────────────────────────
check_command() {
  if command -v "$1" &> /dev/null; then
    echo -e "  ${GREEN}✓${NC} $1 found"
    return 0
  else
    echo -e "  ${RED}✗${NC} $1 not found"
    return 1
  fi
}

# ── Check Prerequisites ───────────────────────────────────────────────────────
echo -e "${BOLD}Checking prerequisites...${NC}"
MISSING=0

if ! check_command node; then
  MISSING=1
  echo -e "    ${YELLOW}→ Install Node.js 18+ from: https://nodejs.org${NC}"
fi

if ! check_command npm; then
  MISSING=1
  echo -e "    ${YELLOW}→ npm is included with Node.js${NC}"
fi

if ! check_command git; then
  MISSING=1
  if [ "$OS" = "mac" ]; then
    echo -e "    ${YELLOW}→ Install Git: brew install git${NC}"
  elif [ "$OS" = "linux" ]; then
    echo -e "    ${YELLOW}→ Install Git: sudo apt-get install git  (or your distro's package manager)${NC}"
  else
    echo -e "    ${YELLOW}→ Install Git from: https://git-scm.com${NC}"
  fi
fi

if ! check_command gh; then
  MISSING=1
  if [ "$OS" = "mac" ]; then
    echo -e "    ${YELLOW}→ Install GitHub CLI: brew install gh${NC}"
  elif [ "$OS" = "linux" ]; then
    echo -e "    ${YELLOW}→ Install GitHub CLI: https://cli.github.com/manual/installation${NC}"
  else
    echo -e "    ${YELLOW}→ Install GitHub CLI from: https://cli.github.com${NC}"
  fi
fi

if ! check_command docker; then
  MISSING=1
  echo -e "    ${YELLOW}→ Install Docker Desktop from: https://www.docker.com/products/docker-desktop${NC}"
fi

echo ""

if [ "$MISSING" -eq 1 ]; then
  echo -e "${RED}[Giga Bot] Some prerequisites are missing. Please install them and re-run this script.${NC}"
  echo ""
  echo -e "  Full prerequisites guide: ${BLUE}https://github.com/gignaati/gigabot#prerequisites${NC}"
  echo ""
  exit 1
fi

echo -e "${GREEN}[Giga Bot] All prerequisites satisfied!${NC}"
echo ""

# ── Node.js Version Check ─────────────────────────────────────────────────────
NODE_VERSION=$(node -e "process.exit(parseInt(process.version.slice(1)) < 18 ? 1 : 0)" 2>&1 && echo "ok" || echo "fail")
if [ "$NODE_VERSION" = "fail" ]; then
  echo -e "${RED}[Giga Bot] Node.js 18+ is required. Current version: $(node --version)${NC}"
  echo -e "  ${YELLOW}→ Update Node.js from: https://nodejs.org${NC}"
  exit 1
fi

# ── Project Directory ─────────────────────────────────────────────────────────
PROJECT_NAME="${1:-my-gigabot}"
echo -e "${BOLD}Creating Giga Bot project: ${BLUE}${PROJECT_NAME}${NC}"
echo ""

if [ -d "$PROJECT_NAME" ]; then
  echo -e "${YELLOW}[Giga Bot] Directory '${PROJECT_NAME}' already exists. Entering it...${NC}"
  cd "$PROJECT_NAME"
else
  mkdir "$PROJECT_NAME"
  cd "$PROJECT_NAME"
fi

# ── Initialize Giga Bot ───────────────────────────────────────────────────────
echo -e "${BLUE}[Giga Bot]${NC} Running: ${BOLD}npx gigabot@latest init${NC}"
echo ""
npx gigabot@latest init

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                              ║${NC}"
echo -e "${GREEN}║   Giga Bot project initialized successfully!                 ║${NC}"
echo -e "${GREEN}║                                                              ║${NC}"
echo -e "${GREEN}║   NEXT STEP: Run the setup wizard                            ║${NC}"
echo -e "${GREEN}║   $ npm run setup                                            ║${NC}"
echo -e "${GREEN}║                                                              ║${NC}"
echo -e "${GREEN}║   Documentation: https://github.com/gignaati/gigabot         ║${NC}"
echo -e "${GREEN}║   Support: support@gignaati.com                              ║${NC}"
echo -e "${GREEN}║                                                              ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
