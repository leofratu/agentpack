import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useToast } from '../components/Toast'

const sidebar = [
  { section: 'Getting Started', items: ['Introduction', 'Quick Start', 'Installation', 'Your First AgentPack'] },
  { section: 'Core Concepts', items: ['How It Works', 'Manifest File', 'Agent Compatibility', 'Versioning'] },
  { section: 'Guides', items: ['Importing Packs', 'Publishing', 'MCP Integration', 'Testing Locally', 'Security & Sandboxing'] },
  { section: 'API Reference', items: ['CLI Commands', 'REST API', 'Webhooks', 'SDKs'] },
  { section: 'Resources', items: ['Examples', 'Migration Guide', 'Troubleshooting', 'FAQ'] },
]

const docs = {
  Introduction: {
    title: 'Introduction',
    content: [
      { type: 'p', text: 'AgentPack Hub is the registry for portable agent capabilities. It allows developers to publish reusable tools, scripts, wrappers, and MCP servers that any AI agent can import and use natively.' },
      { type: 'h3', text: 'Key Principles' },
      { type: 'list', items: [
        { bold: 'One-click import', text: ' — Users install packs with a single click via AgentPack Bridge. No terminal commands needed.' },
        { bold: 'One-click publish', text: ' — Developers ship packs with a single CLI command or button click.' },
        { bold: 'Agent-agnostic', text: ' — Works across Claude Code, Codex, OpenCode, Kilo, Hermes, and any MCP-compatible agent.' },
        { bold: 'Secure by default', text: ' — Every pack is sandbox tested and security scored before going live.' },
      ]},
      { type: 'h3', text: 'What is an AgentPack?' },
      { type: 'p', text: 'An AgentPack is a portable unit of agent capability — a self-contained tool that an AI agent can invoke natively. It could be a PDF parser, a code generator, a database migration checker, or anything else your agent might need.' },
      { type: 'p', text: 'Each AgentPack contains: source code (TypeScript, Python, or Bash), a manifest file describing its capabilities and inputs/outputs, and optional test fixtures.' },
      { type: 'h3', text: 'How is it different from MCP servers?' },
      { type: 'p', text: 'MCP servers are a transport layer — they define how agents communicate with tools. AgentPacks are the tools themselves. An AgentPack can be delivered as an MCP server, but it can also be installed directly as a native tool in agents that support it.' },
    ],
  },
  'Quick Start': {
    title: 'Quick Start',
    content: [
      { type: 'p', text: 'Get your first AgentPack published in under 5 minutes.' },
      { type: 'h3', text: '1. Install the CLI' },
      { type: 'code', lang: 'bash', text: 'npm install -g @agentpack/cli' },
      { type: 'h3', text: '2. Initialize your AgentPack' },
      { type: 'code', lang: 'bash', text: 'agentpack init my-tool\ncd my-tool' },
      { type: 'p', text: 'This scaffolds a new project with TypeScript types, a manifest template, and a test harness.' },
      { type: 'h3', text: '3. Write your tool' },
      { type: 'code', lang: 'typescript', text: '// src/index.ts\nimport { AgentPack } from "@agentpack/sdk";\n\nexport default new AgentPack({\n  name: "my-tool",\n  description: "Does something useful",\n  async execute(input) {\n    // Your tool logic here\n    return { result: "Hello from my-tool!" };\n  },\n});' },
      { type: 'h3', text: '4. Test locally' },
      { type: 'code', lang: 'bash', text: 'agentpack test\nagentpack dev  # starts local dev server' },
      { type: 'h3', text: '5. Publish' },
      { type: 'code', lang: 'bash', text: 'agentpack publish' },
      { type: 'p', text: 'That\'s it. Your pack is now live and importable across all supported agents with one click.' },
    ],
  },
  Installation: {
    title: 'Installation',
    content: [
      { type: 'h3', text: 'System Requirements' },
      { type: 'list', items: [
        { bold: 'Node.js', text: ' 18.0 or later' },
        { bold: 'npm', text: ' 9.0 or later (or pnpm/yarn)' },
        { bold: 'OS', text: ' — macOS, Linux, or Windows (WSL recommended)' },
      ]},
      { type: 'h3', text: 'Install via npm' },
      { type: 'code', lang: 'bash', text: 'npm install -g @agentpack/cli' },
      { type: 'h3', text: 'Install via Homebrew (macOS)' },
      { type: 'code', lang: 'bash', text: 'brew tap agentpack/tap\nbrew install agentpack' },
      { type: 'h3', text: 'Verify installation' },
      { type: 'code', lang: 'bash', text: 'agentpack --version\n# agentpack v1.4.2' },
      { type: 'h3', text: 'AgentPack Bridge' },
      { type: 'p', text: 'AgentPack Bridge is our local installer that handles one-click imports from the web UI. It runs as a lightweight background process and manages tool installations for all supported agents.' },
      { type: 'code', lang: 'bash', text: 'agentpack bridge install\nagentpack bridge status' },
    ],
  },
  'Your First AgentPack': {
    title: 'Your First AgentPack',
    content: [
      { type: 'p', text: 'Let\'s build a simple AgentPack that converts Markdown to HTML. This walkthrough covers the full lifecycle: init, develop, test, publish.' },
      { type: 'h3', text: 'Initialize' },
      { type: 'code', lang: 'bash', text: 'agentpack init md-to-html --template typescript\ncd md-to-html' },
      { type: 'h3', text: 'Project structure' },
      { type: 'code', lang: 'text', text: 'md-to-html/\n├── src/\n│   └── index.ts        # Main tool logic\n├── tests/\n│   └── index.test.ts   # Test fixtures\n├── agentpack.yaml      # Manifest\n├── package.json\n└── tsconfig.json' },
      { type: 'h3', text: 'Write the tool' },
      { type: 'code', lang: 'typescript', text: '// src/index.ts\nimport { AgentPack } from "@agentpack/sdk";\nimport { marked } from "marked";\n\nexport default new AgentPack({\n  name: "md-to-html",\n  description: "Convert Markdown text to HTML",\n  inputs: {\n    markdown: { type: "string", description: "Markdown content" },\n  },\n  outputs: {\n    html: { type: "string", description: "Rendered HTML" },\n  },\n  async execute({ markdown }) {\n    const html = marked(markdown);\n    return { html };\n  },\n});' },
      { type: 'h3', text: 'Write a test' },
      { type: 'code', lang: 'typescript', text: '// tests/index.test.ts\nimport tool from "../src/index";\n\ntest("converts markdown to html", async () => {\n  const { html } = await tool.execute({ markdown: "# Hello" });\n  expect(html).toContain("<h1>Hello</h1>");\n});' },
      { type: 'h3', text: 'Test and publish' },
      { type: 'code', lang: 'bash', text: 'agentpack test     # Runs tests in sandbox\nagentpack publish   # Ships to registry' },
      { type: 'p', text: 'Your AgentPack is now live. Anyone can import it with one click from the registry.' },
    ],
  },
  'How It Works': {
    title: 'How It Works',
    content: [
      { type: 'p', text: 'AgentPack Hub connects publishers with agent users through a simple pipeline:' },
      { type: 'h3', text: 'The flow' },
      { type: 'list', items: [
        { bold: '1. Publish', text: ' — Developer pushes their AgentPack to the registry via CLI or GitHub Action.' },
        { bold: '2. Test & Score', text: ' — Our sandbox runs the pack, measures quality, checks for security issues, and assigns a trust score.' },
        { bold: '3. Registry', text: ' — Approved packs appear in the public registry with metadata, ratings, and compatibility info.' },
        { bold: '4. Import', text: ' — Users click Import in the web UI. AgentPack Bridge downloads and installs it locally.' },
        { bold: '5. Native tool', text: ' — The agent discovers the new tool and can invoke it directly.' },
      ]},
      { type: 'h3', text: 'AgentPack Bridge' },
      { type: 'p', text: 'Bridge is a lightweight local daemon that handles the "one click" part. When you click Import on the web, it:' },
      { type: 'list', items: [
        { bold: '', text: 'Downloads the pack from the registry CDN' },
        { bold: '', text: 'Verifies the checksum and signature' },
        { bold: '', text: 'Installs it into the appropriate agent\'s tool directory' },
        { bold: '', text: 'Registers it with the agent\'s tool discovery mechanism' },
      ]},
      { type: 'h3', text: 'Security model' },
      { type: 'p', text: 'Every pack runs in a sandbox during testing. At import time, packs run within the agent\'s existing permission model — they can\'t escalate privileges beyond what the agent already has.' },
    ],
  },
  'Manifest File': {
    title: 'Manifest File (agentpack.yaml)',
    content: [
      { type: 'p', text: 'Every AgentPack has a manifest file that describes its capabilities, inputs, outputs, and metadata.' },
      { type: 'h3', text: 'Full example' },
      { type: 'code', lang: 'yaml', text: 'name: invoice-pdf-to-csv\nversion: 1.2.0\ndescription: Extract invoice data from PDFs to clean CSV\nauthor: data-tools\nlicense: MIT\n\ncategory: Data\ntags:\n  - pdf\n  - csv\n  - invoice\n  - extraction\n\nruntime: node\nentry: dist/index.js\n\ninputs:\n  pdf_path:\n    type: string\n    description: Path to the PDF file\n    required: true\n  format:\n    type: string\n    description: Output format (csv or json)\n    default: csv\n\noutputs:\n  data:\n    type: string\n    description: Extracted data in specified format\n  row_count:\n    type: number\n    description: Number of rows extracted\n\nagents:\n  - claude-code\n  - codex\n  - opencode\n  - kilo\n  - hermes\n  - mcp\n\nsandbox:\n  network: false\n  filesystem: read-only\n  timeout: 30s' },
      { type: 'h3', text: 'Required fields' },
      { type: 'list', items: [
        { bold: 'name', text: ' — Unique identifier (lowercase, hyphens)' },
        { bold: 'version', text: ' — Semver version string' },
        { bold: 'description', text: ' — One-line description' },
        { bold: 'runtime', text: ' — Execution runtime (node, python, bash)' },
        { bold: 'entry', text: ' — Path to the main entry file' },
      ]},
      { type: 'h3', text: 'Optional fields' },
      { type: 'list', items: [
        { bold: 'inputs/outputs', text: ' — Typed I/O schema for the tool' },
        { bold: 'agents', text: ' — List of compatible agents (defaults to all)' },
        { bold: 'sandbox', text: ' — Permission constraints for testing' },
        { bold: 'tags', text: ' — Searchable tags for discovery' },
      ]},
    ],
  },
  'Agent Compatibility': {
    title: 'Agent Compatibility',
    content: [
      { type: 'p', text: 'AgentPacks are designed to work across multiple AI agents. Here\'s how compatibility works for each.' },
      { type: 'h3', text: 'Claude Code' },
      { type: 'p', text: 'Installs as a native tool via the tool-use system. Claude Code discovers and invokes it directly. Supports full TypeScript and Python runtimes.' },
      { type: 'h3', text: 'Codex' },
      { type: 'p', text: 'Installs into the Codex tool registry. Supports all runtimes. Codex passes inputs and receives outputs via JSON.' },
      { type: 'h3', text: 'OpenCode' },
      { type: 'p', text: 'AgentPacks register as OpenCode extensions. The Bridge handles the translation layer between AgentPack I/O format and OpenCode\'s plugin system.' },
      { type: 'h3', text: 'Kilo & Hermes' },
      { type: 'p', text: 'Both use MCP-compatible interfaces. AgentPacks are exposed as MCP tools automatically when these agents are selected.' },
      { type: 'h3', text: 'MCP (generic)' },
      { type: 'p', text: 'Any MCP-compatible agent can use AgentPacks. The Bridge starts a local MCP server that exposes installed packs as MCP tools.' },
      { type: 'code', lang: 'bash', text: '# Start MCP server for all installed packs\nagentpack bridge mcp --port 3000' },
    ],
  },
  Versioning: {
    title: 'Versioning',
    content: [
      { type: 'p', text: 'AgentPacks use semantic versioning (semver). When you publish a new version, existing users keep their current version until they explicitly update.' },
      { type: 'h3', text: 'Version rules' },
      { type: 'list', items: [
        { bold: 'Patch (1.0.x)', text: ' — Bug fixes, no API changes' },
        { bold: 'Minor (1.x.0)', text: ' — New features, backwards compatible' },
        { bold: 'Major (x.0.0)', text: ' — Breaking changes to inputs/outputs' },
      ]},
      { type: 'h3', text: 'Publishing a new version' },
      { type: 'code', lang: 'bash', text: '# Bump version in agentpack.yaml, then:\nagentpack publish\n\n# Or bump and publish in one step:\nagentpack publish --bump patch' },
      { type: 'h3', text: 'Pinning versions' },
      { type: 'p', text: 'Users can pin to a specific version or range:' },
      { type: 'code', lang: 'bash', text: 'agentpack import invoice-pdf-to-csv@1.2.0  # exact\nagentpack import invoice-pdf-to-csv@^1.0.0  # compatible' },
    ],
  },
  'Importing Packs': {
    title: 'Importing Packs',
    content: [
      { type: 'p', text: 'There are three ways to import an AgentPack:' },
      { type: 'h3', text: '1. One-click import (recommended)' },
      { type: 'p', text: 'Click the Import button on any pack page in the registry. AgentPack Bridge handles everything automatically.' },
      { type: 'h3', text: '2. CLI import' },
      { type: 'code', lang: 'bash', text: 'agentpack import <pack-name>\nagentpack import invoice-pdf-to-csv\nagentpack import repo-security-auditor@1.5.2' },
      { type: 'h3', text: '3. Manifest import (for teams)' },
      { type: 'p', text: 'Create an agentpacks.lock file to import multiple packs at once:' },
      { type: 'code', lang: 'yaml', text: '# agentpacks.lock\npacks:\n  - name: invoice-pdf-to-csv\n    version: "^1.2.0"\n  - name: readme-generator\n    version: "^3.0.0"\n  - name: dockerfile-fixer\n    version: "latest"' },
      { type: 'code', lang: 'bash', text: 'agentpack import --from agentpacks.lock' },
      { type: 'h3', text: 'Verifying imports' },
      { type: 'code', lang: 'bash', text: 'agentpack list              # Show installed packs\nagentpack status             # Show Bridge status\nagentpack test <pack-name>   # Test an installed pack' },
    ],
  },
  Publishing: {
    title: 'Publishing',
    content: [
      { type: 'p', text: 'Publishing makes your AgentPack available to the world. Here\'s the full workflow.' },
      { type: 'h3', text: 'Prerequisites' },
      { type: 'list', items: [
        { bold: '', text: 'An AgentPack Hub account (free tier works)' },
        { bold: '', text: 'The @agentpack/cli installed' },
        { bold: '', text: 'A valid agentpack.yaml manifest' },
      ]},
      { type: 'h3', text: 'Authenticate' },
      { type: 'code', lang: 'bash', text: 'agentpack login\n# Opens browser for OAuth, or:\nagentpack login --token YOUR_API_TOKEN' },
      { type: 'h3', text: 'Validate before publishing' },
      { type: 'code', lang: 'bash', text: 'agentpack validate  # Checks manifest, runs tests\nagentpack dry-run    # Simulates publish without uploading' },
      { type: 'h3', text: 'Publish' },
      { type: 'code', lang: 'bash', text: 'agentpack publish' },
      { type: 'p', text: 'After publishing, our pipeline runs sandbox tests and assigns quality/security scores. Your pack goes live within minutes.' },
      { type: 'h3', text: 'CI/CD publishing' },
      { type: 'code', lang: 'yaml', text: '# .github/workflows/publish.yml\nname: Publish AgentPack\non:\n  push:\n    tags: ["v*"]\njobs:\n  publish:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: agentpack/publish-action@v1\n        with:\n          token: ${{ secrets.AGENTPACK_TOKEN }}' },
    ],
  },
  'MCP Integration': {
    title: 'MCP Integration',
    content: [
      { type: 'p', text: 'AgentPacks can be exposed as MCP (Model Context Protocol) tools for any MCP-compatible agent.' },
      { type: 'h3', text: 'Automatic MCP mode' },
      { type: 'p', text: 'When Bridge detects an MCP-compatible agent, it automatically starts a local MCP server exposing all installed packs.' },
      { type: 'code', lang: 'bash', text: '# Bridge auto-starts MCP server on port 3847\nagentpack bridge status\n# MCP server: running on localhost:3847\n# Tools exposed: 12' },
      { type: 'h3', text: 'Manual MCP server' },
      { type: 'code', lang: 'bash', text: '# Start a standalone MCP server\nagentpack mcp serve --port 3000\n\n# Expose specific packs only\nagentpack mcp serve --packs invoice-pdf-to-csv,readme-generator' },
      { type: 'h3', text: 'MCP configuration' },
      { type: 'code', lang: 'json', text: '{\n  "mcpServers": {\n    "agentpack": {\n      "command": "agentpack",\n      "args": ["mcp", "serve"],\n      "env": {\n        "AGENTPACK_HOME": "~/.agentpack"\n      }\n    }\n  }\n}' },
      { type: 'h3', text: 'Writing MCP-native packs' },
      { type: 'p', text: 'If your pack needs to use MCP-specific features (resources, prompts, sampling), add mcp settings to your manifest:' },
      { type: 'code', lang: 'yaml', text: 'mcp:\n  resources:\n    - uri: "file:///{path}"\n      description: "Access local files"\n  prompts:\n    - name: "analyze"\n      description: "Analyze input data"' },
    ],
  },
  'Testing Locally': {
    title: 'Testing Locally',
    content: [
      { type: 'p', text: 'AgentPack CLI provides a full local testing environment so you can validate your pack before publishing.' },
      { type: 'h3', text: 'Run tests' },
      { type: 'code', lang: 'bash', text: '# Run all tests\nagentpack test\n\n# Run specific test file\nagentpack test tests/parse.test.ts\n\n# Watch mode\nagentpack test --watch' },
      { type: 'h3', text: 'Dev server' },
      { type: 'p', text: 'The dev server lets you invoke your pack interactively:' },
      { type: 'code', lang: 'bash', text: 'agentpack dev\n# ✓ Dev server running at http://localhost:4321\n# ✓ Tool "my-tool" loaded\n# Try: curl -X POST localhost:4321/invoke -d \'{"input": "test"}\''},
      { type: 'h3', text: 'Sandbox testing' },
      { type: 'p', text: 'Test your pack under the same sandbox constraints as production:' },
      { type: 'code', lang: 'bash', text: 'agentpack test --sandbox\n# Runs with: no network, read-only filesystem, 30s timeout' },
      { type: 'h3', text: 'Agent simulation' },
      { type: 'code', lang: 'bash', text: '# Simulate how a specific agent would invoke your pack\nagentpack simulate --agent claude-code\nagentpack simulate --agent mcp' },
    ],
  },
  'Security & Sandboxing': {
    title: 'Security & Sandboxing',
    content: [
      { type: 'p', text: 'Security is built into every layer of AgentPack Hub. Here\'s how we keep agents and users safe.' },
      { type: 'h3', text: 'Sandbox testing' },
      { type: 'p', text: 'Every published pack is executed in an isolated sandbox with:' },
      { type: 'list', items: [
        { bold: 'No network access', text: ' — Packs can\'t phone home or exfiltrate data' },
        { bold: 'Read-only filesystem', text: ' — Can only read declared inputs' },
        { bold: 'Time limits', text: ' — 30s default timeout (configurable)' },
        { bold: 'Memory limits', text: ' — 256MB default heap' },
      ]},
      { type: 'h3', text: 'Security scoring' },
      { type: 'p', text: 'Each pack receives a security score (0-100) based on:' },
      { type: 'list', items: [
        { bold: '', text: 'Static analysis of source code' },
        { bold: '', text: 'Dependency vulnerability scan' },
        { bold: '', text: 'Runtime behavior analysis' },
        { bold: '', text: 'Permission scope (fewer permissions = higher score)' },
      ]},
      { type: 'h3', text: 'Trust levels' },
      { type: 'list', items: [
        { bold: 'Verified', text: ' — Publisher identity confirmed, security score 80+' },
        { bold: 'Trusted', text: ' — 50+ imports, 4.5+ rating, security score 70+' },
        { bold: 'Community', text: ' — Passes sandbox tests, available for import' },
      ]},
    ],
  },
  'CLI Commands': {
    title: 'CLI Commands',
    content: [
      { type: 'p', text: 'Complete reference for the agentpack CLI.' },
      { type: 'h3', text: 'Core commands' },
      { type: 'code', lang: 'bash', text: 'agentpack init <name>       # Scaffold a new AgentPack\nagentpack dev               # Start local dev server\nagentpack test              # Run tests (with --sandbox for sandbox mode)\nagentpack validate          # Validate manifest and structure\nagentpack publish           # Publish to registry\nagentpack unpublish         # Remove from registry (within 72h)' },
      { type: 'h3', text: 'Import commands' },
      { type: 'code', lang: 'bash', text: 'agentpack import <name>     # Import a pack\nagentpack remove <name>     # Remove an imported pack\nagentpack list              # List imported packs\nagentpack update [name]     # Update pack(s) to latest\nagentpack outdated          # Show packs with available updates' },
      { type: 'h3', text: 'Bridge commands' },
      { type: 'code', lang: 'bash', text: 'agentpack bridge install    # Install Bridge daemon\nagentpack bridge start      # Start Bridge\nagentpack bridge stop       # Stop Bridge\nagentpack bridge status     # Show Bridge status\nagentpack bridge logs       # View Bridge logs' },
      { type: 'h3', text: 'MCP commands' },
      { type: 'code', lang: 'bash', text: 'agentpack mcp serve         # Start MCP server\nagentpack mcp list          # List MCP-exposed tools\nagentpack mcp inspect <n>   # Inspect a tool\'s MCP schema' },
      { type: 'h3', text: 'Account commands' },
      { type: 'code', lang: 'bash', text: 'agentpack login             # Authenticate\nagentpack logout            # Clear credentials\nagentpack whoami            # Show current user\nagentpack token create      # Create API token' },
    ],
  },
  'REST API': {
    title: 'REST API',
    content: [
      { type: 'p', text: 'The AgentPack Hub REST API allows programmatic access to the registry.' },
      { type: 'h3', text: 'Base URL' },
      { type: 'code', lang: 'text', text: 'https://api.agentpackhub.com/v1' },
      { type: 'h3', text: 'Authentication' },
      { type: 'code', lang: 'bash', text: 'curl -H "Authorization: Bearer YOUR_TOKEN" \\\n  https://api.agentpackhub.com/v1/packs' },
      { type: 'h3', text: 'Endpoints' },
      { type: 'code', lang: 'text', text: 'GET    /packs                 # List packs (paginated)\nGET    /packs/:name            # Get pack details\nGET    /packs/:name/versions   # List versions\nPOST   /packs                  # Publish new pack\nDELETE /packs/:name/:version   # Unpublish version\n\nGET    /categories             # List categories\nGET    /search?q=query         # Search packs\n\nGET    /user/packs             # Your published packs\nGET    /user/imports           # Your imported packs\nPOST   /user/import/:name      # Import a pack\nDELETE /user/import/:name      # Remove import' },
      { type: 'h3', text: 'Example: Search packs' },
      { type: 'code', lang: 'bash', text: 'curl "https://api.agentpackhub.com/v1/search?q=pdf&category=Data"\n\n# Response:\n{\n  "results": [\n    {\n      "name": "invoice-pdf-to-csv",\n      "version": "1.2.0",\n      "rating": 4.9,\n      "downloads": 97\n    }\n  ],\n  "total": 1\n}' },
    ],
  },
  Webhooks: {
    title: 'Webhooks',
    content: [
      { type: 'p', text: 'Webhooks notify your systems when events happen to your published packs.' },
      { type: 'h3', text: 'Available events' },
      { type: 'list', items: [
        { bold: 'pack.imported', text: ' — Someone imported your pack' },
        { bold: 'pack.reviewed', text: ' — Someone left a review' },
        { bold: 'pack.scored', text: ' — Security/quality score updated' },
        { bold: 'pack.version', text: ' — New version published' },
      ]},
      { type: 'h3', text: 'Setup' },
      { type: 'code', lang: 'bash', text: 'agentpack webhook create \\\n  --url https://your-server.com/webhook \\\n  --events pack.imported,pack.reviewed \\\n  --secret your-webhook-secret' },
      { type: 'h3', text: 'Payload example' },
      { type: 'code', lang: 'json', text: '{\n  "event": "pack.imported",\n  "timestamp": "2026-05-13T10:30:00Z",\n  "data": {\n    "pack": "invoice-pdf-to-csv",\n    "version": "1.2.0",\n    "agent": "claude-code",\n    "user": "sarah_dev"\n  }\n}' },
    ],
  },
  SDKs: {
    title: 'SDKs',
    content: [
      { type: 'p', text: 'Official SDKs for building and integrating with AgentPack Hub.' },
      { type: 'h3', text: 'TypeScript SDK' },
      { type: 'code', lang: 'bash', text: 'npm install @agentpack/sdk' },
      { type: 'code', lang: 'typescript', text: 'import { AgentPack, Input, Output } from "@agentpack/sdk";\n\nexport default new AgentPack({\n  name: "my-tool",\n  description: "My awesome tool",\n  inputs: {\n    query: Input.string("Search query"),\n  },\n  outputs: {\n    result: Output.string("Search result"),\n  },\n  async execute({ query }) {\n    return { result: `Found: ${query}` };\n  },\n});' },
      { type: 'h3', text: 'Python SDK' },
      { type: 'code', lang: 'bash', text: 'pip install agentpack' },
      { type: 'code', lang: 'python', text: 'from agentpack import AgentPack, Input, Output\n\ntool = AgentPack(\n    name="my-tool",\n    description="My awesome tool",\n    inputs={"query": Input.string("Search query")},\n    outputs={"result": Output.string("Search result")},\n)\n\n@tool.execute\nasync def run(query: str) -> dict:\n    return {"result": f"Found: {query}"}' },
      { type: 'h3', text: 'API Client SDK' },
      { type: 'code', lang: 'typescript', text: 'import { AgentPackClient } from "@agentpack/client";\n\nconst client = new AgentPackClient({ token: "YOUR_TOKEN" });\n\n// Search packs\nconst results = await client.search("pdf converter");\n\n// Import a pack\nawait client.import("invoice-pdf-to-csv");\n\n// List your imports\nconst packs = await client.imports.list();' },
    ],
  },
  Examples: {
    title: 'Examples',
    content: [
      { type: 'p', text: 'Example AgentPacks to learn from and use as templates.' },
      { type: 'h3', text: 'Minimal (Bash)' },
      { type: 'code', lang: 'bash', text: '#!/bin/bash\n# agentpack.yaml: runtime: bash, entry: run.sh\n\necho "Hello from a bash AgentPack!"\necho "Input was: $AGENTPACK_INPUT"' },
      { type: 'h3', text: 'File processor (TypeScript)' },
      { type: 'code', lang: 'typescript', text: 'import { AgentPack } from "@agentpack/sdk";\nimport { readFile } from "fs/promises";\n\nexport default new AgentPack({\n  name: "word-counter",\n  description: "Count words in a file",\n  inputs: { path: { type: "string", description: "File path" } },\n  outputs: { count: { type: "number", description: "Word count" } },\n  async execute({ path }) {\n    const text = await readFile(path, "utf-8");\n    const count = text.split(/\\s+/).filter(Boolean).length;\n    return { count };\n  },\n});' },
      { type: 'h3', text: 'API integration (Python)' },
      { type: 'code', lang: 'python', text: 'from agentpack import AgentPack, Input, Output\nimport httpx\n\ntool = AgentPack(\n    name="weather-lookup",\n    description="Get current weather for a location",\n    inputs={"city": Input.string("City name")},\n    outputs={"weather": Output.string("Weather description")},\n    sandbox={"network": True},  # needs network access\n)\n\n@tool.execute\nasync def run(city: str) -> dict:\n    async with httpx.AsyncClient() as client:\n        r = await client.get(f"https://wttr.in/{city}?format=3")\n        return {"weather": r.text.strip()}' },
    ],
  },
  'Migration Guide': {
    title: 'Migration Guide',
    content: [
      { type: 'p', text: 'Already have an existing tool, script, or MCP server? Here\'s how to wrap it as an AgentPack.' },
      { type: 'h3', text: 'From a CLI tool' },
      { type: 'code', lang: 'bash', text: 'agentpack init my-tool --wrap cli\n# Creates a wrapper that calls your existing CLI binary' },
      { type: 'code', lang: 'yaml', text: '# agentpack.yaml\nname: my-existing-tool\nruntime: bash\nentry: wrapper.sh\nwrap:\n  command: my-tool\n  args: ["--format", "json"]' },
      { type: 'h3', text: 'From an MCP server' },
      { type: 'code', lang: 'bash', text: 'agentpack init my-tool --from-mcp ./mcp-server.js\n# Automatically generates manifest from MCP tool definitions' },
      { type: 'h3', text: 'From a Python script' },
      { type: 'code', lang: 'bash', text: 'agentpack init my-tool --wrap python\n# Edit agentpack.yaml to point to your script' },
      { type: 'code', lang: 'yaml', text: 'name: my-python-tool\nruntime: python\nentry: my_script.py\npython:\n  version: ">=3.10"\n  requirements: requirements.txt' },
      { type: 'h3', text: 'Testing the migration' },
      { type: 'code', lang: 'bash', text: 'agentpack validate    # Check manifest is correct\nagentpack test         # Run in sandbox\nagentpack simulate     # Test against each agent' },
    ],
  },
  Troubleshooting: {
    title: 'Troubleshooting',
    content: [
      { type: 'p', text: 'Common issues and how to fix them.' },
      { type: 'h3', text: 'Bridge not running' },
      { type: 'code', lang: 'bash', text: 'agentpack bridge status\n# If stopped:\nagentpack bridge start\n# If won\'t start:\nagentpack bridge logs | tail -20' },
      { type: 'h3', text: 'Import fails' },
      { type: 'list', items: [
        { bold: 'Error: "Bridge not reachable"', text: ' — Run `agentpack bridge start`' },
        { bold: 'Error: "Pack not found"', text: ' — Check the pack name spelling, or it may have been unpublished' },
        { bold: 'Error: "Version conflict"', text: ' — Run `agentpack update <name>` or specify a version' },
      ]},
      { type: 'h3', text: 'Pack not showing in agent' },
      { type: 'code', lang: 'bash', text: '# Verify it\'s installed\nagentpack list\n\n# Restart the agent\'s tool discovery\nagentpack bridge restart\n\n# Check agent-specific logs\nagentpack bridge logs --agent claude-code' },
      { type: 'h3', text: 'Publish fails' },
      { type: 'list', items: [
        { bold: 'Error: "Validation failed"', text: ' — Run `agentpack validate` to see specific issues' },
        { bold: 'Error: "Name taken"', text: ' — Choose a different pack name' },
        { bold: 'Error: "Auth expired"', text: ' — Run `agentpack login` again' },
      ]},
      { type: 'h3', text: 'Sandbox test failures' },
      { type: 'code', lang: 'bash', text: '# Run tests in sandbox mode locally to reproduce\nagentpack test --sandbox --verbose\n\n# Common causes:\n# - Network calls without sandbox.network: true\n# - Writing to filesystem without permission\n# - Exceeding 30s timeout' },
    ],
  },
  FAQ: {
    title: 'Frequently Asked Questions',
    content: [
      { type: 'h3', text: 'Is AgentPack Hub free to use?' },
      { type: 'p', text: 'Importing free packs is always free. Publishing is free for up to 5 packs. See the Pricing page for Pro and Team plans.' },
      { type: 'h3', text: 'Can I make my pack private?' },
      { type: 'p', text: 'Yes, on Team plans. Private packs are only visible to your team members and can\'t be discovered in the public registry.' },
      { type: 'h3', text: 'What languages are supported?' },
      { type: 'p', text: 'TypeScript, Python, and Bash. We\'re adding Go and Rust support soon.' },
      { type: 'h3', text: 'Can I monetize my packs?' },
      { type: 'p', text: 'Yes. Set a price on any pack. We handle payments and take a 10% platform fee. Payouts are monthly via Stripe.' },
      { type: 'h3', text: 'How long does publishing take?' },
      { type: 'p', text: 'Usually under 2 minutes. Upload is instant, then sandbox testing runs (~30-60s), then your pack is live.' },
      { type: 'h3', text: 'Can I delete a published pack?' },
      { type: 'p', text: 'You can unpublish within 72 hours. After that, you can deprecate it (hides from search but existing users keep access).' },
      { type: 'h3', text: 'What about breaking changes?' },
      { type: 'p', text: 'Bump the major version. Users on the old version keep working. The registry shows migration guides for major bumps if you provide them.' },
      { type: 'h3', text: 'Is my source code public?' },
      { type: 'p', text: 'By default yes — packs are open-source. On paid plans, you can publish compiled/bundled packs without exposing source.' },
    ],
  },
}

function Docs() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [active, setActive] = useState(searchParams.get('page') || 'Introduction')
  const [search, setSearch] = useState('')
  const toast = useToast()

  const handleNav = (item) => {
    setActive(item)
    setSearchParams({ page: item })
    window.scrollTo(0, 0)
  }

  const allItems = sidebar.flatMap((g) => g.items)
  const currentIdx = allItems.indexOf(active)
  const prev = currentIdx > 0 ? allItems[currentIdx - 1] : null
  const next = currentIdx < allItems.length - 1 ? allItems[currentIdx + 1] : null

  const activeContent = docs[active]

  const filteredSidebar = search
    ? sidebar.map((g) => ({ ...g, items: g.items.filter((i) => i.toLowerCase().includes(search.toLowerCase())) })).filter((g) => g.items.length > 0)
    : sidebar

  const copyCode = (text) => {
    navigator.clipboard.writeText(text)
    toast('Copied to clipboard!', 'info')
  }

  const renderContent = (content) => {
    if (!content) return <p className="text-xs text-text-muted">Documentation for "{active}" coming soon.</p>
    return content.map((block, i) => {
      switch (block.type) {
        case 'p': return <p key={i} className="text-xs text-text-muted leading-relaxed my-2">{block.text}</p>
        case 'h3': return <h3 key={i} className="text-sm font-semibold text-text mt-5 mb-2">{block.text}</h3>
        case 'code': return (
          <div key={i} className="relative group my-3">
            <button
              onClick={() => copyCode(block.text)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-[10px] text-text-muted bg-white border border-border px-2 py-0.5 rounded transition-opacity"
            >
              Copy
            </button>
            <pre className="bg-gray-50 border border-border rounded-md p-3 text-[11px] font-mono text-text overflow-x-auto">
              {block.text}
            </pre>
          </div>
        )
        case 'list': return (
          <ul key={i} className="my-2 space-y-1.5">
            {block.items.map((item, j) => (
              <li key={j} className="flex items-start gap-1.5 text-xs text-text-muted leading-relaxed ml-1">
                <span className="text-primary mt-0.5 shrink-0">•</span>
                <span>{item.bold ? <><strong className="text-text">{item.bold}</strong>{item.text}</> : item.text}</span>
              </li>
            ))}
          </ul>
        )
        default: return null
      }
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex gap-8">
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-20">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search docs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:border-primary/40"
              />
            </div>
            <nav className="space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
              {filteredSidebar.map((group) => (
                <div key={group.section}>
                  <h4 className="text-[11px] font-semibold text-text uppercase tracking-wide mb-1.5">{group.section}</h4>
                  <ul className="space-y-0.5">
                    {group.items.map((item) => (
                      <li key={item}>
                        <button
                          onClick={() => handleNav(item)}
                          className={`block w-full text-left px-2.5 py-1.5 text-xs rounded-md transition-colors ${active === item ? 'bg-primary/10 text-primary font-medium' : 'text-text-muted hover:text-text hover:bg-gray-50'}`}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="lg:hidden mb-6">
            <select
              value={active}
              onChange={(e) => handleNav(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-border rounded-md"
            >
              {sidebar.map((group) => (
                <optgroup key={group.section} label={group.section}>
                  {group.items.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <article className="max-w-2xl">
            <h1 className="text-2xl font-bold text-text mb-4">{activeContent?.title || active}</h1>
            {renderContent(activeContent?.content)}

            <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
              {prev ? (
                <button onClick={() => handleNav(prev)} className="text-xs text-primary font-medium hover:underline">← {prev}</button>
              ) : <span />}
              {next ? (
                <button onClick={() => handleNav(next)} className="text-xs text-primary font-medium hover:underline">{next} →</button>
              ) : <span />}
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

export default Docs

// Info: Documentation links map parameters to guide headings.
