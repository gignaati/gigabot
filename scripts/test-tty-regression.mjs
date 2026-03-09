#!/usr/bin/env node
/**
 * GigaBot Regression Test Suite
 *
 * Validates cross-platform install correctness:
 *   Tests  1-10  — TTY re-attachment (curl|bash), setup file syntax, /dev/tty
 *   Tests 11-13  — Windows-safe AUTH_SECRET, shell:true, macOS PATH sourcing
 *   Tests 14-17  — install.ps1 PowerShell Windows installer
 *
 * Run:  node scripts/test-tty-regression.mjs
 * CI:   npm run test:tty
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅  ${name}`);
    passed++;
  } catch (e) {
    console.log(`  ❌  ${name}`);
    console.log(`      ${e.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

console.log('\n🔍  GigaBot TTY Regression Tests\n');

// ─── Test 1: install.sh has exec < /dev/tty guard ────────────────────────────
test('install.sh contains exec < /dev/tty guard', () => {
  const installSh = fs.readFileSync(path.join(ROOT, 'install.sh'), 'utf8');
  assert(
    installSh.includes('exec < /dev/tty'),
    'install.sh is missing the `exec < /dev/tty` TTY re-attachment line'
  );
});

// ─── Test 2: install.sh checks [ ! -t 0 ] before exec ───────────────────────
test('install.sh guards exec with [ ! -t 0 ] && [ -e /dev/tty ]', () => {
  const installSh = fs.readFileSync(path.join(ROOT, 'install.sh'), 'utf8');
  assert(
    installSh.includes('[ ! -t 0 ]') && installSh.includes('[ -e /dev/tty ]'),
    'install.sh is missing the conditional guard around exec < /dev/tty'
  );
});

// ─── Test 3: setup.mjs has Node.js TTY guard ─────────────────────────────────
test('setup.mjs contains Node.js-level TTY guard', () => {
  const setupMjs = fs.readFileSync(path.join(ROOT, 'setup', 'setup.mjs'), 'utf8');
  assert(
    setupMjs.includes('process.stdin.isTTY') && setupMjs.includes('/dev/tty'),
    'setup.mjs is missing the Node.js TTY guard block'
  );
});

// ─── Test 4: setup.mjs syntax is valid ───────────────────────────────────────
test('setup.mjs passes Node.js syntax check', () => {
  execSync(`node --check ${path.join(ROOT, 'setup', 'setup.mjs')}`, {
    stdio: 'pipe',
    shell: true,
  });
});

// ─── Test 5: setup-cloud.mjs syntax is valid ─────────────────────────────────
test('setup-cloud.mjs passes Node.js syntax check', () => {
  execSync(`node --check ${path.join(ROOT, 'setup', 'setup-cloud.mjs')}`, {
    stdio: 'pipe',
    shell: true,
  });
});

// ─── Test 6: setup-local.mjs syntax is valid ─────────────────────────────────
test('setup-local.mjs passes Node.js syntax check', () => {
  execSync(`node --check ${path.join(ROOT, 'setup', 'setup-local.mjs')}`, {
    stdio: 'pipe',
    shell: true,
  });
});

// ─── Test 7: /dev/tty is accessible ──────────────────────────────────────────
test('/dev/tty exists and is accessible', () => {
  assert(fs.existsSync('/dev/tty'), '/dev/tty does not exist on this system');
  let fd;
  try {
    fd = fs.openSync('/dev/tty', 'r+');
  } catch (e) {
    throw new Error(`Cannot open /dev/tty: ${e.message}`);
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
  }
});

// ─── Test 8: @clack/prompts can be imported ───────────────────────────────────
test('@clack/prompts can be imported', async () => {
  const { select, isCancel } = await import('@clack/prompts');
  assert(typeof select === 'function', 'select is not a function');
  assert(typeof isCancel === 'function', 'isCancel is not a function');
});

// ─── Test 9: Simulate curl|bash — stdin is non-TTY ───────────────────────────
test('Simulated non-TTY stdin: TTY guard opens /dev/tty successfully', () => {
  const originalIsTTY = process.stdin.isTTY;
  try {
    Object.defineProperty(process.stdin, 'isTTY', {
      value: undefined,
      writable: true,
      configurable: true,
    });
    let ttyOpened = false;
    if (!process.stdin.isTTY) {
      try {
        const ttyFd = fs.openSync('/dev/tty', 'r+');
        fs.closeSync(ttyFd);
        ttyOpened = true;
      } catch (_) {
        // /dev/tty not available
      }
    }
    assert(ttyOpened, '/dev/tty could not be opened under simulated non-TTY conditions');
  } finally {
    Object.defineProperty(process.stdin, 'isTTY', {
      value: originalIsTTY,
      writable: true,
      configurable: true,
    });
  }
});

// ─── Test 10: install.sh is executable ───────────────────────────────────────
test('install.sh is executable', () => {
  const stats = fs.statSync(path.join(ROOT, 'install.sh'));
  const isExecutable = !!(stats.mode & 0o111);
  assert(isExecutable, 'install.sh does not have executable permissions');
});

// ─── Summary (Tests 1-10) ─────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(50)}`);
console.log(`  Results: ${passed} passed, ${failed} failed`);
console.log(`${'─'.repeat(50)}\n`);

// ─── Test 11: AUTH_SECRET uses base64url (no +/= chars) ──────────────────────
test('bin/cli.js generates AUTH_SECRET with base64url (no +/= chars)', () => {
  const cliJs = fs.readFileSync(path.join(ROOT, 'bin', 'cli.js'), 'utf8');
  assert(
    cliJs.includes('base64url'),
    'bin/cli.js is still using base64 for AUTH_SECRET — must use base64url to prevent Windows dotenv parsing failures'
  );
  const base64Matches = [...cliJs.matchAll(/randomBytes\([^)]+\)\.toString\(['"]base64['"]\)/g)];
  assert(
    base64Matches.length === 0,
    `Found ${base64Matches.length} plain base64 randomBytes call(s) — all must use base64url`
  );
});

// ─── Test 12: All execSync calls use shell:true ───────────────────────────────
test('bin/cli.js execSync calls for npm/git/docker use shell:true', () => {
  const cliJs = fs.readFileSync(path.join(ROOT, 'bin', 'cli.js'), 'utf8');
  const execSyncCalls = [...cliJs.matchAll(/execSync\(['"`](?:npm|npx|git|docker)[^)]+\)/g)];
  const missingShell = execSyncCalls.filter(m => !m[0].includes('shell'));
  assert(
    missingShell.length === 0,
    `${missingShell.length} execSync call(s) missing shell:true — Windows cannot resolve .cmd shims without it:\n` +
    missingShell.map(m => `  ${m[0].slice(0, 80)}...`).join('\n')
  );
});

// ─── Test 13: install.sh sources Homebrew/nvm/asdf PATH ──────────────────────
test('install.sh sources Homebrew, nvm, and asdf for macOS/Linux PATH', () => {
  const installSh = fs.readFileSync(path.join(ROOT, 'install.sh'), 'utf8');
  assert(
    installSh.includes('/opt/homebrew/bin') || installSh.includes('homebrew'),
    'install.sh is missing Homebrew PATH sourcing (/opt/homebrew/bin) — required for macOS Apple Silicon'
  );
  assert(
    installSh.includes('.nvm/nvm.sh') || installSh.includes('NVM_DIR'),
    'install.sh is missing nvm sourcing (~/.nvm/nvm.sh) — required for nvm-managed Node.js installs'
  );
  assert(
    installSh.includes('.asdf/asdf.sh') || installSh.includes('asdf'),
    'install.sh is missing asdf sourcing (~/.asdf/asdf.sh) — required for asdf-managed Node.js installs'
  );
});

// ─── Test 14: install.ps1 exists ─────────────────────────────────────────────
test('install.ps1 exists in repo root', () => {
  const ps1Path = path.join(ROOT, 'install.ps1');
  assert(fs.existsSync(ps1Path), 'install.ps1 is missing from the repo root');
});

// ─── Test 15: install.ps1 has execution-policy self-bypass ───────────────────
test('install.ps1 contains execution policy self-bypass for irm|iex users', () => {
  const ps1 = fs.readFileSync(path.join(ROOT, 'install.ps1'), 'utf8');
  assert(
    ps1.includes('Set-ExecutionPolicy') && ps1.includes('Bypass') && ps1.includes('Process'),
    'install.ps1 is missing Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass — ' +
    'required so irm|iex works on machines with Restricted or AllSigned policy'
  );
});

// ─── Test 16: install.ps1 augments PATH for Windows Node.js managers ─────────
test('install.ps1 augments PATH for nvm-windows, fnm, Scoop, Chocolatey, Volta', () => {
  const ps1 = fs.readFileSync(path.join(ROOT, 'install.ps1'), 'utf8');
  const required = [
    { token: 'nvm',         label: 'nvm-windows (%APPDATA%\\nvm)' },
    { token: 'fnm',         label: 'fnm (%LOCALAPPDATA%\\fnm)' },
    { token: 'chocolatey',  label: 'Chocolatey (C:\\ProgramData\\chocolatey\\bin)' },
    { token: 'scoop',       label: 'Scoop (%USERPROFILE%\\scoop\\shims)' },
    { token: 'Volta',       label: 'Volta (%LOCALAPPDATA%\\Volta\\bin)' },
  ];
  const missing = required.filter(r => !ps1.toLowerCase().includes(r.token.toLowerCase()));
  assert(
    missing.length === 0,
    'install.ps1 is missing PATH augmentation for: ' + missing.map(r => r.label).join(', ')
  );
});

// ─── Test 17: install.ps1 auto-launches setup wizard ─────────────────────────
test('install.ps1 auto-launches npm run setup after scaffolding', () => {
  const ps1 = fs.readFileSync(path.join(ROOT, 'install.ps1'), 'utf8');
  assert(
    ps1.includes('npm run setup'),
    'install.ps1 does not call npm run setup — users would have to run a second command manually'
  );
});

// ─── Final Summary ────────────────────────────────────────────────────────────
const total = passed + failed;
console.log(`\n${'─'.repeat(50)}`);
console.log(`  Final: ${passed}/${total} passed, ${failed} failed`);
console.log(`${'─'.repeat(50)}\n`);

if (failed > 0) {
  process.exit(1);
}
