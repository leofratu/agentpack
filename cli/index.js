#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import http from 'http'
import readline from 'readline'
import os from 'os'

const HUB_URL = process.env.AGENTPACK_HUB_URL || 'http://localhost:3001'
const CONFIG_DIR = path.join(os.homedir(), '.agentpack')
const CONFIG_PATH = path.join(CONFIG_DIR, 'config.json')
const INSTALLED_DB = path.join(CONFIG_DIR, 'installed.json')
const INSTALLED_DIR = path.join(CONFIG_DIR, 'installed')

// Helper: Ensure config directories exist
if (!fs.existsSync(CONFIG_DIR)) fs.mkdirSync(CONFIG_DIR, { recursive: true })
if (!fs.existsSync(INSTALLED_DIR)) fs.mkdirSync(INSTALLED_DIR, { recursive: true })
if (!fs.existsSync(INSTALLED_DB)) fs.writeFileSync(INSTALLED_DB, JSON.stringify([], null, 2))

// Helper: HTTP request wrapper
function makeRequest(url, method, headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url)
    const options = {
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname + parsed.search,
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    }

    const req = http.request(options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        let parsedData = data
        try {
          parsedData = JSON.parse(data)
        } catch {}
        if (res.statusCode >= 400) {
          reject(new Error(parsedData.message || `Request failed: ${res.statusCode}`))
        } else {
          resolve(parsedData)
        }
      })
    })

    req.on('error', err => reject(err))
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body))
    }
    req.end()
  })
}

// Read line helper for prompts
function promptUser(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return new Promise(resolve => rl.question(query, answer => {
    rl.close()
    resolve(answer)
  }))
}

// Commands
async function init(name) {
  if (!name) {
    console.error('Error: Please specify a name. Usage: agentpack init <name>')
    process.exit(1)
  }
  const targetDir = path.join(process.cwd(), name)
  if (fs.existsSync(targetDir)) {
    console.error(`Error: Folder '${name}' already exists.`)
    process.exit(1)
  }

  fs.mkdirSync(targetDir)
  const manifest = `name: ${name}
version: 1.0.0
description: Reusable agent tool capability.
category: Utilities
runtime: node
entry: index.js
inputs:
  query:
    type: string
    description: Query parameter.
    required: true
outputs:
  result:
    type: string
agents:
  - Claude Code
  - MCP
`
  const code = `// ${name} Tool entry point
export default async function execute(inputs) {
  console.log("Executing tool with inputs:", inputs);
  return { result: \`Hello, processed query: \${inputs.query}\` };
}
`

  fs.writeFileSync(path.join(targetDir, 'agentpack.yaml'), manifest)
  fs.writeFileSync(path.join(targetDir, 'index.js'), code)
  console.log(`🎉 Successfully initialized AgentPack '${name}'!`)
}

async function login() {
  const email = await promptUser('Enter your email: ')
  const password = await promptUser('Enter your password: ')

  try {
    const res = await makeRequest(`${HUB_URL}/v1/auth/login`, 'POST', {}, { email, password })
    fs.writeFileSync(CONFIG_PATH, JSON.stringify({ token: res.token, email: res.user.email }, null, 2))
    console.log(`🎉 Successfully authenticated as ${res.user.email}!`)
  } catch (err) {
    console.error(`Error logging in: ${err.message}`)
    process.exit(1)
  }
}

async function whoami() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.log('Not logged in.')
    return
  }
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH))
  console.log(`Logged in as: ${config.email}`)
}

async function publish() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error('Error: You must be logged in to publish. Run: agentpack login')
    process.exit(1)
  }
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH))

  const manifestPath = path.join(process.cwd(), 'agentpack.yaml')
  if (!fs.existsSync(manifestPath)) {
    console.error('Error: agentpack.yaml manifest not found in current folder.')
    process.exit(1)
  }

  // Parse YAML file simple loader
  const manifestText = fs.readFileSync(manifestPath, 'utf8')
  const metadata = {}
  manifestText.split('\n').forEach(line => {
    const parts = line.split(':')
    if (parts.length >= 2) {
      metadata[parts[0].trim()] = parts.slice(1).join(':').trim()
    }
  })

  if (!metadata.name || !metadata.description) {
    console.error('Error: manifest must define name and description.')
    process.exit(1)
  }

  // Parse list values
  const agents = metadata.agents ? metadata.agents.replace(/[-\s\[\]]/g, '').split(',') : ['Claude Code']

  console.log(`Publishing ${metadata.name}@${metadata.version || '1.0.0'}...`)
  try {
    const payload = {
      name: metadata.name,
      slug: metadata.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: metadata.description,
      longDescription: metadata.description,
      category: metadata.category || 'Utilities',
      version: metadata.version || '1.0.0',
      agents: agents,
      capabilities: metadata.inputs ? 'custom inputs' : 'standard',
    }

    await makeRequest(`${HUB_URL}/v1/packs/publish`, 'POST', {
      'Authorization': `Bearer ${config.token}`
    }, payload)

    console.log(`🎉 Successfully published ${metadata.name}!`)
  } catch (err) {
    console.error(`Publishing failed: ${err.message}`)
    process.exit(1)
  }
}

async function importPack(slug) {
  if (!slug) {
    console.error('Error: Please specify a pack to import. Usage: agentpack import <slug>')
    process.exit(1)
  }

  console.log(`Downloading ${slug} from registry...`)
  try {
    const pack = await makeRequest(`${HUB_URL}/v1/packs/${slug}`, 'GET')

    // Local extraction path
    const installPath = path.join(INSTALLED_DIR, slug)
    if (!fs.existsSync(installPath)) fs.mkdirSync(installPath, { recursive: true })

    fs.writeFileSync(path.join(installPath, 'manifest.yaml'), JSON.stringify(pack, null, 2))
    
    // Register tool entry in local DB
    const list = JSON.parse(fs.readFileSync(INSTALLED_DB))
    if (!list.includes(slug)) {
      list.push(slug)
      fs.writeFileSync(INSTALLED_DB, JSON.stringify(list, null, 2))
    }

    console.log(`🎉 Successfully imported ${pack.name}! Installed in: ${installPath}`)
  } catch (err) {
    console.error(`Import failed: ${err.message}`)
    process.exit(1)
  }
}

function listImports() {
  const list = JSON.parse(fs.readFileSync(INSTALLED_DB))
  if (list.length === 0) {
    console.log('No packs imported yet.')
    return
  }
  console.log('Imported AgentPacks:')
  list.forEach(slug => {
    console.log(`- ${slug}`)
  })
}

function startBridge() {
  const PORT = 2828
  const server = http.createServer(async (req, res) => {
    // Add CORS headers for web registry communication
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
      res.writeHead(200)
      res.end()
      return
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`)
    if (parsedUrl.pathname === '/import') {
      const slug = parsedUrl.searchParams.get('slug')
      if (!slug) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, message: 'Missing slug param' }))
        return
      }

      console.log(`[Bridge Daemon] Triggering installation for: ${slug}`)
      try {
        const pack = await makeRequest(`${HUB_URL}/v1/packs/${slug}`, 'GET')
        const installPath = path.join(INSTALLED_DIR, slug)
        if (!fs.existsSync(installPath)) fs.mkdirSync(installPath, { recursive: true })
        fs.writeFileSync(path.join(installPath, 'manifest.yaml'), JSON.stringify(pack, null, 2))

        const list = JSON.parse(fs.readFileSync(INSTALLED_DB))
        if (!list.includes(slug)) {
          list.push(slug)
          fs.writeFileSync(INSTALLED_DB, JSON.stringify(list, null, 2))
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: true, message: `Successfully imported ${slug}` }))
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, message: err.message }))
      }
      return
    }

    res.writeHead(404)
    res.end()
  })

  server.listen(PORT, () => {
    console.log(`[AgentPack Bridge] Daemon listening on http://localhost:${PORT}`)
  })
}

// CLI router
const args = process.argv.slice(2)
const command = args[0]

switch (command) {
  case 'init':
    init(args[1])
    break
  case 'login':
    login()
    break
  case 'whoami':
    whoami()
    break
  case 'publish':
    publish()
    break
  case 'import':
    importPack(args[1])
    break
  case 'list':
    listImports()
    break
  case 'bridge':
    if (args[1] === 'start') {
      startBridge()
    } else {
      console.log('Usage: agentpack bridge start')
    }
    break
  default:
    console.log(`
AgentPack CLI v1.0.0
Usage: agentpack <command> [options]

Commands:
  init <name>       Initialize a new AgentPack in local directory
  login             Authenticate CLI with registry
  whoami            Show current authenticated user
  publish           Publish current directory AgentPack to registry
  import <slug>     Download and register an AgentPack
  list              List locally imported AgentPacks
  bridge start      Launch local bridge daemon on port 2828
    `)
}

// Config: AGENTPACK_HUB_URL directs local CLI requests.

// Config: Config path stores tokens in JSON credentials.

// Network: makeRequest wraps node http standard modules.

// Helper: readline handles interface terminal input.

// Command: init scaffolds basic yaml and entrypoint scripts.
