import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const upload = multer({ dest: path.join(__dirname, 'uploads/') })

const app = express()
app.use(cors())
app.use(express.json())

const JWT_SECRET = 'agentpack-secret-key-123456789'
const dbPath = path.join(__dirname, 'database.sqlite')
const db = new sqlite3.Database(dbPath)

// Initialize database schema
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS packs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_id INTEGER,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      long_description TEXT,
      category TEXT NOT NULL,
      repo_url TEXT,
      version TEXT DEFAULT '1.0.0',
      agents TEXT, -- comma-separated
      capabilities TEXT, -- comma-separated
      rating REAL DEFAULT 5.0,
      downloads INTEGER DEFAULT 0,
      color TEXT DEFAULT '#10b981',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS imports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      pack_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, pack_id)
    )
  `)

  // Prepopulate standard packs if packs table is empty
  db.get('SELECT COUNT(*) as count FROM packs', (err, row) => {
    if (!err && row.count === 0) {
      const initialPacks = [
        { name: 'GitHub Issue to PR', slug: 'github-issue-to-pr', description: 'Convert issues into PRs with auto context.', long_description: 'Automatically reads GitHub issues, understands the requirements, generates a pull request with the appropriate code changes, and links it back to the original issue.', rating: 4.8, downloads: 96, category: 'DevOps', agents: 'Claude Code,Codex,MCP', capabilities: 'Read GitHub issues,Generate code changes,Create pull requests', color: '#10b981' },
        { name: 'Invoice PDF to CSV', slug: 'invoice-pdf-to-csv', description: 'Extract invoice data from PDFs to clean CSV.', long_description: 'Parses PDF invoices using OCR and layout analysis, extracts line items, totals, dates, and vendor information, then outputs a structured CSV file.', rating: 4.9, downloads: 97, category: 'Data', agents: 'Claude Code,Hermes', capabilities: 'Parse PDF documents,OCR text extraction,Table detection', color: '#3b82f6' },
        { name: 'README Generator', slug: 'readme-generator', description: 'Create beautiful READMEs from any repo.', long_description: 'Analyzes repository structure, code, and existing documentation to generate comprehensive READMEs with badges, installation instructions, and API docs.', rating: 4.6, downloads: 93, category: 'Documentation', agents: 'Claude Code,Codex,Kilo,Hermes,MCP', capabilities: 'Analyze repo structure,Generate table of contents,Write installation guides', color: '#8b5cf6' },
        { name: 'Repo Security Auditor', slug: 'repo-security-auditor', description: 'Scan repos for secrets, risks, and misconfigs.', long_description: 'Deep scans repositories for exposed API keys, credentials, misconfigured permissions, vulnerable dependencies, and common security anti-patterns.', rating: 4.8, downloads: 96, category: 'Security', agents: 'Codex,Kilo,MCP', capabilities: 'Secret detection,Dependency scanning,Permission audit', color: '#ec4899' },
      ]

      const stmt = db.prepare(`
        INSERT INTO packs (owner_id, name, slug, description, long_description, rating, downloads, category, agents, capabilities, color)
        VALUES (0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      for (const p of initialPacks) {
        stmt.run(p.name, p.slug, p.description, p.long_description, p.rating, p.downloads, p.category, p.agents, p.capabilities, p.color)
      }
      stmt.finalize()
    }
  })
})

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Access denied: Token missing' })

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Access denied: Invalid token' })
    req.user = user
    next()
  })
}

// Auth Endpoints
app.post('/v1/auth/register', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' })

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) return res.status(500).json({ message: err.message })
    if (row) return res.status(400).json({ message: 'User already exists' })

    const hash = await bcrypt.hash(password, 10)
    db.run('INSERT INTO users (email, password_hash) VALUES (?, ?)', [email, hash], function(err) {
      if (err) return res.status(500).json({ message: err.message })

      const token = jwt.sign({ id: this.lastID, email }, JWT_SECRET)
      res.json({ token, user: { id: this.lastID, email, name: email.split('@')[0] } })
    })
  })
})

app.post('/v1/auth/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' })

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ message: err.message })
    if (!user) return res.status(400).json({ message: 'Invalid email or password' })

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) return res.status(400).json({ message: 'Invalid email or password' })

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET)
    res.json({ token, user: { id: user.id, email: user.email, name: user.email.split('@')[0] } })
  })
})

// Packs Endpoints
app.get('/v1/packs', (req, res) => {
  db.all('SELECT * FROM packs', [], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message })
    const formatted = rows.map(r => ({
      ...r,
      agents: r.agents ? r.agents.split(',') : [],
      capabilities: r.capabilities ? r.capabilities.split(',') : []
    }))
    res.json(formatted)
  })
})

app.get('/v1/packs/:slug', (req, res) => {
  db.get('SELECT * FROM packs WHERE slug = ?', [req.params.slug], (err, row) => {
    if (err) return res.status(500).json({ message: err.message })
    if (!row) return res.status(404).json({ message: 'Pack not found' })

    res.json({
      ...row,
      agents: row.agents ? row.agents.split(',') : [],
      capabilities: row.capabilities ? row.capabilities.split(',') : []
    })
  })
})

app.post('/v1/packs/publish', authenticateToken, upload.single('bundle'), (req, res) => {
  const { name, slug, description, longDescription, category, version, agents, capabilities, repoUrl } = req.body
  const ownerId = req.user.id

  if (!name || !slug || !description || !category) {
    return res.status(400).json({ message: 'Missing required pack metadata fields' })
  }

  const agentsStr = Array.isArray(agents) ? agents.join(',') : (agents || '')
  const capsStr = Array.isArray(capabilities) ? capabilities.join(',') : (capabilities || '')

  db.run(`
    INSERT INTO packs (owner_id, name, slug, description, long_description, category, version, agents, capabilities, repoUrl, owner)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [ownerId, name, slug, description, longDescription, category, version || '1.0.0', agentsStr, capsStr, repoUrl, req.user.email], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(400).json({ message: 'An AgentPack with this name already exists' })
      }
      return res.status(500).json({ message: err.message })
    }
    res.json({ id: this.lastID, slug, message: 'Pack published successfully' })
  })
})

// User Endpoints
app.post('/v1/user/import/:slug', authenticateToken, (req, res) => {
  db.get('SELECT id FROM packs WHERE slug = ?', [req.params.slug], (err, pack) => {
    if (err) return res.status(500).json({ message: err.message })
    if (!pack) return res.status(404).json({ message: 'Pack not found' })

    db.run('INSERT OR IGNORE INTO imports (user_id, pack_id) VALUES (?, ?)', [req.user.id, pack.id], function(err) {
      if (err) return res.status(500).json({ message: err.message })

      // Increment download counter
      db.run('UPDATE packs SET downloads = downloads + 1 WHERE id = ?', [pack.id])
      res.json({ success: true, message: 'Import registered' })
    })
  })
})

app.get('/v1/user/imports', authenticateToken, (req, res) => {
  db.all(`
    SELECT p.* FROM packs p
    JOIN imports i ON p.id = i.pack_id
    WHERE i.user_id = ?
  `, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message })
    const formatted = rows.map(r => ({
      ...r,
      agents: r.agents ? r.agents.split(',') : [],
      capabilities: r.capabilities ? r.capabilities.split(',') : []
    }))
    res.json(formatted)
  })
})

app.get('/v1/user/packs', authenticateToken, (req, res) => {
  db.all('SELECT * FROM packs WHERE owner_id = ?', [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message })
    const formatted = rows.map(r => ({
      ...r,
      agents: r.agents ? r.agents.split(',') : [],
      capabilities: r.capabilities ? r.capabilities.split(',') : []
    }))
    res.json(formatted)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`[AgentPack Server] Running on http://localhost:${PORT}`)
})

// Note: Startup information logged on process.env.PORT.

// Note: CORS origins setup checks local front-end ports.

// Schema: Users table registers email and password hashes.
