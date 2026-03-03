# Giga Bot — The Autonomous AI Agent by Gignaati

<p align="center">
  <a href="https://www.gignaati.com" target="_blank">
    <img src="https://raw.githubusercontent.com/gignaati/gigabot/main/assets/gignaati_banner.png" alt="Giga Bot by Gignaati" width="720">
  </a>
</p>

<p align="center">
  <strong>India's Autonomous AI Agent Platform.</strong>
  <br />
  Build, deploy, and run AI agents 24/7 on your own infrastructure — Windows, Linux, or Mac.
  <br />
  Zero vendor lock-in. 100% data sovereignty.
</p>

<p align="center">
    <a href="https://github.com/gignaati/gigabot/blob/main/LICENSE"><img src="https://img.shields.io/github/license/gignaati/gigabot?style=flat-square&color=black" alt="License"></a>
    <a href="https://github.com/gignaati/gigabot/actions/workflows/run-job.yml"><img src="https://img.shields.io/github/actions/workflow/status/gignaati/gigabot/run-job.yml?branch=main&label=agent-jobs&style=flat-square&color=black" alt="Agent Jobs"></a>
    <a href="https://www.gignaati.com"><img src="https://img.shields.io/badge/powered%20by-Gignaati-black.svg?style=flat-square" alt="Powered by Gignaati"></a>
</p>

---

**Giga Bot** is a self-hosted, autonomous AI agent platform designed for India's edge-first AI ecosystem. It allows developers and organizations to run persistent AI agents that can perform tasks, manage projects, and even modify their own codebases through a secure, auditable workflow. 

Based on the proven architecture of `thepopebot`, Giga Bot is optimized for local deployment, data privacy, and cost-efficiency, leveraging free-tier resources like GitHub Actions for compute.

## Why Giga Bot?

| Feature                   | Description                                                                                                                               |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| ⚡ **Edge-First**          | Runs locally on your infrastructure (Windows, Linux, Mac). No foreign cloud dependency. 100% data sovereignty and privacy compliance.      |
| 🔄 **Self-Evolving Agent**  | The agent modifies its own code through pull requests. Every change is auditable and reversible. You stay in control.                     |
| 🆓 **Free Compute**         | Uses GitHub Actions for agent jobs. Every GitHub account includes free compute time — no extra infrastructure cost for most use cases.  |
| 🔒 **Enterprise Security**  | API key authentication, webhook secret validation, session encryption, and secret filtering are built-in by default.                      |
| 🌐 **Cross-Platform**       | One-command install on Windows, Linux, and macOS. The web interface works on any device with a modern browser.                          |
| 🤖 **Multi-Model Support**  | Use Claude, GPT-4, Gemini, or any OpenAI-compatible model. Mix and match providers per task for optimal cost and performance.         |

## How It Works

Giga Bot uses a two-layer architecture that separates the user-facing chat interface from the backend agent execution, ensuring security and scalability.

1.  **You Chat**: Send a message or create a job via the web UI or an integrated service like Telegram.
2.  **Event Handler Creates Job**: The Next.js app (Event Handler) receives the request, validates it, and creates a dedicated `job/...` branch on your GitHub repository.
3.  **Agent Executes in CI/CD**: A GitHub Actions workflow triggers, spins up a Docker container, and runs the AI agent. The agent performs the work, commits results to the job branch, and opens a pull request.
4.  **Auto-Merge & Notify**: The PR is automatically reviewed, validated, and merged into the main branch. You get notified when the job is complete.

This entire process is automated, auditable, and runs on infrastructure you already have.

## Getting Started: One-Command Install

Get your Giga Bot instance running in minutes. All you need are the prerequisites listed below.

### Prerequisites

- **Node.js**: v18 or higher
- **Git**: Latest version
- **GitHub CLI**: Latest version (`gh`)
- **Docker**: Latest version (Docker Desktop is recommended)

### Installation

Open your terminal and run the command for your operating system.

**Linux / macOS**
```bash
curl -fsSL https://raw.githubusercontent.com/gignaati/gigabot/main/install.sh | bash
```

**Windows (PowerShell)**

Run PowerShell as Administrator and execute:
```powershell
irm https://raw.githubusercontent.com/gignaati/gigabot/main/install.ps1 | iex
```

After installation, the interactive setup wizard will guide you through the rest of the configuration.

## Commands

Giga Bot comes with a CLI for managing your project.

| Command                | Description                                                              |
| ---------------------- | ------------------------------------------------------------------------ |
| `npx gigabot init`       | Scaffold a new Giga Bot project or update existing templates.            |
| `npm run setup`          | Run the full interactive setup wizard.                                   |
| `npm run setup-telegram` | Configure the Telegram bot integration.                                  |
| `npx gigabot upgrade`    | Upgrade your project to the latest version of Giga Bot.                  |
| `npx gigabot diff`       | List files that differ from the default package templates.               |
| `npx gigabot reset <file>` | Restore a specific file to its default template version.                 |
| `npx gigabot set-secret` | Set a GitHub secret and update your local `.env` file.                   |

## Configuration

All configuration is managed in the `.env` file in your project root. The setup wizard populates this file for you, but you can edit it manually.

Key variables include:
- `APP_URL`: The public URL of your Giga Bot instance.
- `GH_OWNER` / `GH_REPO`: Your GitHub username and repository name.
- `LLM_PROVIDER` / `LLM_API_KEY`: Your chosen LLM provider and API key.
- `AUTH_SECRET`: A secret key for encrypting user sessions.

## License

Giga Bot is open-source software licensed under the **[MIT License](https://github.com/gignaati/gigabot/blob/main/LICENSE)**.

## Support & Contact

- **Report an Issue**: [GitHub Issues](https://github.com/gignaati/gigabot/issues)
- **Email Support**: [support@gignaati.com](mailto:support@gignaati.com)
- **Website**: [www.gignaati.com](https://www.gignaati.com)

---

<p align="center">A Product of the Gignaati AI Ecosystem</p>
