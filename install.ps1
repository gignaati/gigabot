# =============================================================================
#  Giga Bot — One-Command Installer for Windows (PowerShell)
#  Powered by Gignaati — https://www.gignaati.com
#
#  Usage (run in PowerShell as Administrator):
#    irm https://raw.githubusercontent.com/gignaati/gigabot/main/install.ps1 | iex
#
#  Or with a project name:
#    $env:GIGABOT_PROJECT="my-gigabot"; irm https://raw.githubusercontent.com/gignaati/gigabot/main/install.ps1 | iex
# =============================================================================

$ErrorActionPreference = "Stop"

# ── Banner ────────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor White
Write-Host "║                                                              ║" -ForegroundColor White
Write-Host "║   GIGA BOT — Gignaati AI Agent Platform                      ║" -ForegroundColor White
Write-Host "║   https://www.gignaati.com                                   ║" -ForegroundColor White
Write-Host "║                                                              ║" -ForegroundColor White
Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor White
Write-Host ""

# ── Helper: check command ─────────────────────────────────────────────────────
function Test-Command($cmd) {
    $exists = $null -ne (Get-Command $cmd -ErrorAction SilentlyContinue)
    if ($exists) {
        Write-Host "  ✓ $cmd found" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $cmd not found" -ForegroundColor Red
    }
    return $exists
}

# ── Check Prerequisites ───────────────────────────────────────────────────────
Write-Host "Checking prerequisites..." -ForegroundColor White
$missing = $false

if (-not (Test-Command "node")) {
    $missing = $true
    Write-Host "    → Install Node.js 18+ from: https://nodejs.org" -ForegroundColor Yellow
}

if (-not (Test-Command "npm")) {
    $missing = $true
    Write-Host "    → npm is included with Node.js" -ForegroundColor Yellow
}

if (-not (Test-Command "git")) {
    $missing = $true
    Write-Host "    → Install Git from: https://git-scm.com" -ForegroundColor Yellow
    Write-Host "    → Or via winget: winget install Git.Git" -ForegroundColor Yellow
}

if (-not (Test-Command "gh")) {
    $missing = $true
    Write-Host "    → Install GitHub CLI from: https://cli.github.com" -ForegroundColor Yellow
    Write-Host "    → Or via winget: winget install GitHub.cli" -ForegroundColor Yellow
}

if (-not (Test-Command "docker")) {
    $missing = $true
    Write-Host "    → Install Docker Desktop from: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
}

Write-Host ""

if ($missing) {
    Write-Host "[Giga Bot] Some prerequisites are missing. Please install them and re-run this script." -ForegroundColor Red
    Write-Host ""
    Write-Host "  Full prerequisites guide: https://github.com/gignaati/gigabot#prerequisites" -ForegroundColor Cyan
    Write-Host ""
    exit 1
}

Write-Host "[Giga Bot] All prerequisites satisfied!" -ForegroundColor Green
Write-Host ""

# ── Node.js Version Check ─────────────────────────────────────────────────────
$nodeVersion = [int](node -e "process.stdout.write(process.version.slice(1).split('.')[0])")
if ($nodeVersion -lt 18) {
    Write-Host "[Giga Bot] Node.js 18+ is required. Current version: $(node --version)" -ForegroundColor Red
    Write-Host "  → Update Node.js from: https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# ── Project Directory ─────────────────────────────────────────────────────────
$projectName = if ($env:GIGABOT_PROJECT) { $env:GIGABOT_PROJECT } else { "my-gigabot" }
Write-Host "Creating Giga Bot project: $projectName" -ForegroundColor White
Write-Host ""

if (Test-Path $projectName) {
    Write-Host "[Giga Bot] Directory '$projectName' already exists. Entering it..." -ForegroundColor Yellow
    Set-Location $projectName
} else {
    New-Item -ItemType Directory -Name $projectName | Out-Null
    Set-Location $projectName
}

# ── Initialize Giga Bot ───────────────────────────────────────────────────────
Write-Host "[Giga Bot] Running: npx gigabot@latest init" -ForegroundColor Cyan
Write-Host ""
npx gigabot@latest init

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                              ║" -ForegroundColor Green
Write-Host "║   Giga Bot project initialized successfully!                 ║" -ForegroundColor Green
Write-Host "║                                                              ║" -ForegroundColor Green
Write-Host "║   NEXT STEP: Run the setup wizard                            ║" -ForegroundColor Green
Write-Host "║   > npm run setup                                            ║" -ForegroundColor Green
Write-Host "║                                                              ║" -ForegroundColor Green
Write-Host "║   Documentation: https://github.com/gignaati/gigabot         ║" -ForegroundColor Green
Write-Host "║   Support: support@gignaati.com                              ║" -ForegroundColor Green
Write-Host "║                                                              ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
