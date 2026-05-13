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

---

## Architecture

AgentPack Hub connects publishers with agent users through a simple pipeline:

1. **Publish** — Developer pushes their AgentPack to the registry via CLI or GitHub Action.
2. **Test & Score** — Our sandbox runs the pack, measures quality, checks for security issues, and assigns a trust score.
3. **Registry** — Approved packs appear in the public registry with metadata, ratings, and compatibility info.
4. **Import** — Users click Import in the web UI. AgentPack Bridge downloads and installs it locally.
5. **Native tool** — The agent discovers the new tool and can invoke it directly.

### Tech Stack

- **Frontend**: React 19 + Vite 8 + Tailwind CSS 4
- **Routing**: React Router 7
- **UI Components**: Custom with Headless UI patterns
- **Build**: Vite with ESBuild for fast HMR

---

## Core Concepts

### What is an AgentPack?

An AgentPack is a portable unit of agent capability — a self-contained tool that an AI agent can invoke natively. It could be a PDF parser, a code generator, a database migration checker, or anything else your agent might need.

Each AgentPack contains:
- **Source code** (TypeScript, Python, or Bash)
- **Manifest file** describing its capabilities, inputs/outputs, and agent compatibility
- **Optional test fixtures** for sandbox validation
- **Metadata** including version, author, license, and tags

### How is it different from MCP servers?

MCP servers are a transport layer — they define how agents communicate with tools. AgentPacks are the tools themselves. An AgentPack can be delivered as an MCP server, but it can also be installed directly as a native tool in agents that support it.

---

## Manifest File

Every AgentPack has a manifest file (`agentpack.yaml`) that describes its capabilities, inputs, outputs, and metadata.

### Full Example

```yaml
name: invoice-pdf-to-csv
version: 1.2.0
description: Extract invoice data from PDFs to clean CSV
author: data-tools
license: MIT

category: Data
tags:
  - pdf
  - csv
  - invoice
  - extraction

runtime: node
entry: dist/index.js

inputs:
  pdf_path:
    type: string
    description: Path to the PDF file
    required: true
  format:
    type: string
    description: Output format (csv or json)
    default: csv

outputs:
  data:
    type: string
    description: Extracted data in specified format
  row_count:
    type: number
    description: Number of rows extracted

agents:
  - claude-code
  - codex
  - opencode
  - kilo
  - hermes
  - mcp

sandbox:
  network: false
  filesystem: read-only
  timeout: 30s
```

### Required Fields

- `name` — Unique identifier (lowercase, hyphens)
- `version` — Semver version string
- `description` — One-line description
- `runtime` — Execution runtime (node, python, bash)
- `entry` — Path to the main entry file

### Optional Fields

- `inputs/outputs` — Typed I/O schema for the tool
- `agents` — List of compatible agents (defaults to all)
- `sandbox` — Permission constraints for testing
- `tags` — Searchable tags for discovery