# AgentPack Hub

![License: MIT](https://img.shields.io/badge/License-MIT-green) ![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-8.0-646CFF) ![Node](https://img.shields.io/badge/Node-18%2B-339933)

**The Registry for Portable Agent Capabilities.**

AgentPack Hub is a platform for discovering, publishing, and importing reusable AI agent capabilities. Developers ship tools as **AgentPacks** — self-contained packages that any AI agent can import with a single click.

---

## Features

- **One-Click Import** — Users install packs with a single click via AgentPack Bridge. No terminal commands needed.
- **One-Click Publish** — Developers ship packs with a single CLI command or web dashboard button.
- **Agent-Agnostic** — Works across Claude Code, Codex, OpenCode, Kilo, Hermes, and any MCP-compatible agent.
- **Secure by Default** — Every pack is sandbox tested and security scored before going live.
- **Global Distribution** — Published packs are instantly available to all supported agents.
- **Monetization** — Set your own price or keep it free. Platform handles payments.
- **Built-in Analytics** — Track installs, ratings, and usage across agents.
- **Auto-Testing** — Every push is sandbox tested and security scored automatically.
- **CLI, SDK & API** — Full developer tooling with TypeScript SDK, Python SDK, CLI, and REST API.

---

## Quick Start

Get your first AgentPack published in under 5 minutes.

### 1. Install the CLI

```bash
npm install -g @agentpack/cli
```

### 2. Initialize your AgentPack

```bash
agentpack init my-tool
cd my-tool
```

This scaffolds a new project with TypeScript types, a manifest template, and a test harness.

### 3. Write your tool

```typescript
// src/index.ts
import { AgentPack } from "@agentpack/sdk";

export default new AgentPack({
  name: "my-tool",
  description: "Does something useful",
  async execute(input) {
    return { result: "Hello from my-tool!" };
  },
});
```

### 4. Test locally

```bash
agentpack test
agentpack dev  # starts local dev server
```

### 5. Publish

```bash
agentpack publish
```

That's it. Your pack is now live and importable across all supported agents with one click.

---

## Installation

### System Requirements

- **Node.js** 18.0 or later
- **npm** 9.0 or later (or pnpm/yarn)
- **OS**: macOS, Linux, or Windows (WSL recommended)

### Install via npm

```bash
npm install -g @agentpack/cli
```

### Install via Homebrew (macOS)

```bash
brew tap agentpack/tap
brew install agentpack
```

### Verify installation

```bash
agentpack --version
# agentpack v1.4.2
```

### AgentPack Bridge

AgentPack Bridge is the local installer that handles one-click imports from the web UI. It runs as a lightweight background process and manages tool installations for all supported agents.

```bash
agentpack bridge install
agentpack bridge status
```