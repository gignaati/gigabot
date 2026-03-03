# Contributing to Giga Bot

Thank you for your interest in contributing to Giga Bot, Gignaati's autonomous AI agent platform. This document outlines the process for contributing code, documentation, and ideas to the project.

## Code of Conduct

By participating in this project, you agree to uphold a respectful and inclusive environment. We are committed to building a welcoming community for all contributors, regardless of background or experience level.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request, please open an issue on [GitHub Issues](https://github.com/gignaati/gigabot/issues). Before opening a new issue, please search for existing issues to avoid duplicates.

For **security vulnerabilities**, do not create a public issue. Instead, email [support@gignaati.com](mailto:support@gignaati.com) directly.

### Submitting Pull Requests

1.  **Fork** the repository and create a new branch from `main`.
2.  Use a descriptive branch name, such as `feat/add-telegram-commands` or `fix/auth-session-expiry`.
3.  Make your changes, following the code style guidelines below.
4.  Write or update tests where applicable.
5.  Ensure all existing tests pass.
6.  Submit a pull request with a clear description of the changes and the problem they solve.

## Development Setup

```bash
# Clone your fork
git clone https://github.com/<your-username>/gigabot.git
cd gigabot

# Install dependencies
npm install

# Run the setup wizard
npm run setup

# Start development server
npm run dev
```

## Code Style Guidelines

Giga Bot follows these conventions to maintain a consistent, production-ready codebase.

| Convention | Standard |
| --- | --- |
| **JavaScript/TypeScript** | ES Modules (`import`/`export`), async/await, no CommonJS `require()` |
| **Formatting** | Prettier defaults (2-space indentation, single quotes) |
| **Naming** | camelCase for variables/functions, PascalCase for React components |
| **Comments** | JSDoc for exported functions; inline comments for complex logic |
| **Commits** | Conventional Commits format (`feat:`, `fix:`, `docs:`, `chore:`) |

## Branding Guidelines

All contributions must maintain Gignaati's brand standards.

- The application name is **Giga Bot** (two words, capital G and B).
- The brand name is **Gignaati** (not Gignaati, GIGNAATI, or gignaati).
- The primary color theme is **black and white**.
- All UI components must reference [www.gignaati.com](https://www.gignaati.com) in the footer.
- The copyright notice must read: `© [Year] Gignaati. All rights reserved.`

## License

By contributing to Giga Bot, you agree that your contributions will be licensed under the [MIT License](https://github.com/gignaati/gigabot/blob/main/LICENSE).

---

Powered by Gignaati — [www.gignaati.com](https://www.gignaati.com)
