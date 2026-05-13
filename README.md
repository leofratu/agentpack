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

---

## CLI Commands

### Core Commands

```bash
agentpack init <name>       # Scaffold a new AgentPack
agentpack dev               # Start local dev server
agentpack test              # Run tests (with --sandbox for sandbox mode)
agentpack validate          # Validate manifest and structure
agentpack publish           # Publish to registry
agentpack unpublish         # Remove from registry (within 72h)
```

### Import Commands

```bash
agentpack import <name>     # Import a pack
agentpack remove <name>     # Remove an imported pack
agentpack list              # List imported packs
agentpack update [name]     # Update pack(s) to latest
agentpack outdated          # Show packs with available updates
```

### Bridge Commands

```bash
agentpack bridge install    # Install Bridge daemon
agentpack bridge start      # Start Bridge
agentpack bridge stop       # Stop Bridge
agentpack bridge status     # Show Bridge status
agentpack bridge logs       # View Bridge logs
```

### Account Commands

```bash
agentpack login             # Authenticate
agentpack logout            # Clear credentials
agentpack whoami            # Show current user
agentpack token create      # Create API token
```

---

## AgentPack Bridge

Bridge is a lightweight local daemon that handles the "one click" part. When you click Import on the web, it:

- Downloads the pack from the registry CDN
- Verifies the checksum and signature
- Installs it into the appropriate agent's tool directory
- Registers it with the agent's tool discovery mechanism

### Security Model

Every pack runs in a sandbox during testing. At import time, packs run within the agent's existing permission model — they can't escalate privileges beyond what the agent already has.

---

## SDKs

### TypeScript SDK

```bash
npm install @agentpack/sdk
```

```typescript
import { AgentPack, Input, Output } from "@agentpack/sdk";

export default new AgentPack({
  name: "my-tool",
  description: "My awesome tool",
  inputs: {
    query: Input.string("Search query"),
  },
  outputs: {
    result: Output.string("Search result"),
  },
  async execute({ query }) {
    return { result: `Found: ${query}` };
  },
});
```

### Python SDK

```bash
pip install agentpack
```

```python
from agentpack import AgentPack, Input, Output

tool = AgentPack(
    name="my-tool",
    description="My awesome tool",
    inputs={"query": Input.string("Search query")},
    outputs={"result": Output.string("Search result")},
)

@tool.execute
async def run(query: str) -> dict:
    return {"result": f"Found: {query}"}
```

### API Client SDK

```typescript
import { AgentPackClient } from "@agentpack/client";

const client = new AgentPackClient({ token: "YOUR_TOKEN" });

// Search packs
const results = await client.search("pdf converter");

// Import a pack
await client.import("invoice-pdf-to-csv");

// List your imports
const packs = await client.imports.list();
```

---

## Agent Compatibility

AgentPacks are designed to work across multiple AI agents.

### Claude Code

Installs as a native tool via the tool-use system. Claude Code discovers and invokes it directly. Supports full TypeScript and Python runtimes.

### Codex

Installs into the Codex tool registry. Supports all runtimes. Codex passes inputs and receives outputs via JSON.

### OpenCode

AgentPacks register as OpenCode extensions. The Bridge handles the translation layer between AgentPack I/O format and OpenCode's plugin system.

### Kilo & Hermes

Both use MCP-compatible interfaces. AgentPacks are exposed as MCP tools automatically when these agents are selected.

### MCP (generic)

Any MCP-compatible agent can use AgentPacks. The Bridge starts a local MCP server that exposes installed packs as MCP tools.

```bash
# Start MCP server for all installed packs
agentpack bridge mcp --port 3000
```

---

## Publishing Guide

### Prerequisites

- An AgentPack Hub account (free tier works)
- The `@agentpack/cli` installed
- A valid `agentpack.yaml` manifest

### Authenticate

```bash
agentpack login
# Opens browser for OAuth, or:
agentpack login --token YOUR_API_TOKEN
```

### Validate before publishing

```bash
agentpack validate  # Checks manifest, runs tests
agentpack dry-run    # Simulates publish without uploading
```

### Publish

```bash
agentpack publish
```

After publishing, our pipeline runs sandbox tests and assigns quality/security scores. Your pack goes live within minutes.

### CI/CD Publishing

```yaml
# .github/workflows/publish.yml
name: Publish AgentPack
on:
  push:
    tags: ["v*"]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: agentpack/publish-action@v1
        with:
          token: ${{ secrets.AGENTPACK_TOKEN }}
```

---

## Importing Packs

### One-click import (recommended)

Click the Import button on any pack page in the registry. AgentPack Bridge handles everything automatically.

### CLI import

```bash
agentpack import <name>
agentpack import invoice-pdf-to-csv
agentpack import repo-security-auditor@1.5.2
```

### Manifest import (for teams)

Create an `agentpacks.lock` file to import multiple packs at once:

```yaml
# agentpacks.lock
packs:
  - name: invoice-pdf-to-csv
    version: "^1.2.0"
  - name: readme-generator
    version: "^3.0.0"
  - name: dockerfile-fixer
    version: "latest"
```

```bash
agentpack import --from agentpacks.lock
```

### Verifying imports

```bash
agentpack list              # Show installed packs
agentpack status             # Show Bridge status
agentpack test <pack-name>   # Test an installed pack
```

---

## REST API

The AgentPack Hub REST API allows programmatic access to the registry.

### Base URL

```
https://api.agentpackhub.com/v1
```

### Authentication

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.agentpackhub.com/v1/packs
```

### Endpoints

```
GET    /packs                 # List packs (paginated)
GET    /packs/:name           # Get pack details
GET    /packs/:name/versions  # List versions
POST   /packs                 # Publish new pack
DELETE /packs/:name/:version  # Unpublish version

GET    /categories            # List categories
GET    /search?q=query        # Search packs

GET    /user/packs            # Your published packs
GET    /user/imports          # Your imported packs
POST   /user/import/:name     # Import a pack
DELETE /user/import/:name     # Remove import
```

### Example: Search packs

```bash
curl "https://api.agentpackhub.com/v1/search?q=pdf&category=Data"

# Response:
{
  "results": [
    {
      "name": "invoice-pdf-to-csv",
      "version": "1.2.0",
      "rating": 4.9,
      "downloads": 97
    }
  ],
  "total": 1
}
```

---

## Webhooks

Webhooks notify your systems when events happen to your published packs.

### Available events

- `pack.imported` — Someone imported your pack
- `pack.reviewed` — Someone left a review
- `pack.scored` — Security/quality score updated
- `pack.version` — New version published

### Setup

```bash
agentpack webhook create \
  --url https://your-server.com/webhook \
  --events pack.imported,pack.reviewed \
  --secret your-webhook-secret
```

### Payload example

```json
{
  "event": "pack.imported",
  "timestamp": "2026-05-13T10:30:00Z",
  "data": {
    "pack": "invoice-pdf-to-csv",
    "version": "1.2.0",
    "agent": "claude-code",
    "user": "sarah_dev"
  }
}
```

---

## Security & Sandboxing

Security is built into every layer of AgentPack Hub.

### Sandbox testing

Every published pack is executed in an isolated sandbox with:

- **No network access** — Packs can't phone home or exfiltrate data
- **Read-only filesystem** — Can only read declared inputs
- **Time limits** — 30s default timeout (configurable)
- **Memory limits** — 256MB default heap

### Security scoring

Each pack receives a security score (0-100) based on:

- Static analysis of source code
- Dependency vulnerability scan
- Runtime behavior analysis
- Permission scope (fewer permissions = higher score)

### Trust levels

- **Verified** — Publisher identity confirmed, security score 80+
- **Trusted** — 50+ imports, 4.5+ rating, security score 70+
- **Community** — Passes sandbox tests, available for import

---

## Examples

### Minimal (Bash)

```bash
#!/bin/bash
# agentpack.yaml: runtime: bash, entry: run.sh

echo "Hello from a bash AgentPack!"
echo "Input was: $AGENTPACK_INPUT"
```

### File processor (TypeScript)

```typescript
import { AgentPack } from "@agentpack/sdk";
import { readFile } from "fs/promises";

export default new AgentPack({
  name: "word-counter",
  description: "Count words in a file",
  inputs: { path: { type: "string", description: "File path" } },
  outputs: { count: { type: "number", description: "Word count" } },
  async execute({ path }) {
    const text = await readFile(path, "utf-8");
    const count = text.split(/\s+/).filter(Boolean).length;
    return { count };
  },
});
```

### API integration (Python)

```python
from agentpack import AgentPack, Input, Output
import httpx

tool = AgentPack(
    name="weather-lookup",
    description="Get current weather for a location",
    inputs={"city": Input.string("City name")},
    outputs={"weather": Output.string("Weather description")},
    sandbox={"network": True},
)

@tool.execute
async def run(city: str) -> dict:
    async with httpx.AsyncClient() as client:
        r = await client.get(f"https://wttr.in/{city}?format=3")
        return {"weather": r.text.strip()}
```

---

## Troubleshooting

### Bridge not running

```bash
agentpack bridge status
# If stopped:
agentpack bridge start
# If won't start:
agentpack bridge logs | tail -20
```

### Import fails

- **Error: "Bridge not reachable"** — Run `agentpack bridge start`
- **Error: "Pack not found"** — Check the pack name spelling, or it may have been unpublished
- **Error: "Version conflict"** — Run `agentpack update <name>` or specify a version

### Pack not showing in agent

```bash
# Verify it's installed
agentpack list

# Restart the agent's tool discovery
agentpack bridge restart

# Check agent-specific logs
agentpack bridge logs --agent claude-code
```

### Publish fails

- **Error: "Validation failed"** — Run `agentpack validate` to see specific issues
- **Error: "Name taken"** — Choose a different pack name
- **Error: "Auth expired"** — Run `agentpack login` again

### Sandbox test failures

```bash
# Run tests in sandbox mode locally to reproduce
agentpack test --sandbox --verbose

# Common causes:
# - Network calls without sandbox.network: true
# - Writing to filesystem without permission
# - Exceeding 30s timeout
```

---

## FAQ

**Is AgentPack Hub free to use?**
Importing free packs is always free. Publishing is free for up to 5 packs. See the Pricing page for Pro and Team plans.

**Can I make my pack private?**
Yes, on Team plans. Private packs are only visible to your team members and can't be discovered in the public registry.

**What languages are supported?**
TypeScript, Python, and Bash. We're adding Go and Rust support soon.

**Can I monetize my packs?**
Yes. Set a price on any pack. We handle payments and take a 10% platform fee. Payouts are monthly via Stripe.

**How long does publishing take?**
Usually under 2 minutes. Upload is instant, then sandbox testing runs (~30-60s), then your pack is live.

**Can I delete a published pack?**
You can unpublish within 72 hours. After that, you can deprecate it (hides from search but existing users keep access).

**What about breaking changes?**
Bump the major version. Users on the old version keep working. The registry shows migration guides for major bumps if you provide them.

**Is my source code public?**
By default yes — packs are open-source. On paid plans, you can publish compiled/bundled packs without exposing source.

---

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

## License

AgentPack Hub is [MIT licensed](LICENSE).

---

<p align="center">
  <a href="https://agentpackhub.com">🌐 Website</a> ·
  <a href="https://docs.agentpackhub.com">📖 Docs</a> ·
  <a href="https://discord.gg/agentpack">💬 Discord</a> ·
  <a href="https://github.com/leofratu/agentpack">🐙 GitHub</a>
</p>