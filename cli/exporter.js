import fs from 'fs'
import path from 'path'
import os from 'os'

// Detect Claude Code config files on various operating systems
function getClaudeConfigPaths() {
  const home = os.homedir()
  return [
    path.join(home, '.claudecode', 'config.json'),
    path.join(home, '.config', 'claudecode', 'config.json'),
    path.join(home, 'Library', 'Application Support', 'claudecode', 'config.json'),
  ]
}

export function exportToMCP(pack, installPath) {
  return {
    mcpServers: {
      [`agentpack-${pack.slug}`]: {
        command: 'node',
        args: [path.join(installPath, 'index.js')],
        env: {
          AGENTPACK_PACK_SLUG: pack.slug
        }
      }
    }
  }
}

export function exportToClaudeCode(pack, installPath) {
  // Check and update local Claude Code config if it exists
  const paths = getClaudeConfigPaths()
  let updatedPath = null

  for (const configPath of paths) {
    if (fs.existsSync(configPath)) {
      try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
        config.mcpServers = config.mcpServers || {}
        config.mcpServers[`agentpack-${pack.slug}`] = {
          command: 'node',
          args: [path.join(installPath, 'index.js')]
        }
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
        updatedPath = configPath
        break
      } catch (err) {
        console.warn(`[Claude Exporter] Failed to edit config at ${configPath}: ${err.message}`)
      }
    }
  }

  return {
    updatedPath,
    config: {
      name: pack.name,
      description: pack.description,
      mcpConfig: {
        command: 'node',
        args: [path.join(installPath, 'index.js')]
      }
    }
  }
}

export function exportToCodex(pack) {
  // Codex tool registry parameters
  const properties = {}
  const required = []

  // Extract inputs simple helper
  if (pack.capabilities && Array.isArray(pack.capabilities)) {
    pack.capabilities.forEach((cap, idx) => {
      const paramName = `param_${idx}`
      properties[paramName] = {
        type: 'string',
        description: cap
      }
      required.push(paramName)
    })
  } else {
    properties['query'] = { type: 'string', description: 'Execution query' }
    required.push('query')
  }

  return {
    id: pack.slug,
    name: pack.name,
    description: pack.description,
    category: pack.category,
    schema: {
      type: 'object',
      properties,
      required
    }
  }
}

export function exportToOpenCode(pack, installPath) {
  return {
    manifestVersion: 1,
    id: `org.agentpack.${pack.slug}`,
    name: pack.name,
    version: pack.version || '1.0.0',
    description: pack.description,
    publisher: pack.owner || 'community',
    engines: {
      opencode: '^1.0.0'
    },
    contributes: {
      tools: [
        {
          name: pack.slug,
          description: pack.description,
          path: path.join(installPath, 'index.js')
        }
      ]
    }
  }
}

export function exportGitHubAction(pack) {
  return `name: Publish AgentPack
on:
  push:
    branches: [ main ]
    tags: [ 'v*' ]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install AgentPack CLI
        run: npm install -g agentpack-cli

      - name: Publish to AgentPack Registry
        env:
          AGENTPACK_TOKEN: \${{ secrets.AGENTPACK_TOKEN }}
          AGENTPACK_HUB_URL: ${process.env.AGENTPACK_HUB_URL || 'http://localhost:3001'}
        run: |
          agentpack login --token $AGENTPACK_TOKEN
          agentpack publish
`
}
