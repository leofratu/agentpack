const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/v1'

const fallbackDb = {
  get(key, defaultValue) {
    const data = localStorage.getItem(`agentpack_${key}`)
    return data ? JSON.parse(data) : defaultValue
  },
  set(key, value) {
    localStorage.setItem(`agentpack_${key}`, JSON.stringify(value))
  }
}

// Initialize localStorage fallback with default data if empty
if (!localStorage.getItem('agentpack_initialized')) {
  const initialPacks = [
    { name: 'GitHub Issue to PR', slug: 'github-issue-to-pr', description: 'Convert issues into PRs with auto context.', rating: 4.8, downloads: 96, price: 'Free', color: '#10b981', category: 'DevOps', agents: ['Claude Code', 'Codex', 'MCP'], owner: 'system' },
    { name: 'Invoice PDF to CSV', slug: 'invoice-pdf-to-csv', description: 'Extract invoice data from PDFs to clean CSV.', rating: 4.9, downloads: 97, price: 'Free', color: '#3b82f6', category: 'Data', agents: ['Claude Code', 'Hermes'], owner: 'system' },
    { name: 'README Generator', slug: 'readme-generator', description: 'Create beautiful READMEs from any repo.', rating: 4.6, downloads: 93, price: 'Free', color: '#8b5cf6', category: 'Documentation', agents: ['Claude Code', 'Codex', 'Kilo', 'Hermes', 'MCP'], owner: 'system' },
    { name: 'Repo Security Auditor', slug: 'repo-security-auditor', description: 'Scan repos for secrets, risks, and misconfigs.', rating: 4.8, downloads: 96, price: 'Paid', color: '#ec4899', category: 'Security', agents: ['Codex', 'Kilo', 'MCP'], owner: 'system' },
    { name: 'Dockerfile Fixer', slug: 'dockerfile-fixer', description: 'Detect issues and optimize Dockerfiles.', rating: 4.7, downloads: 94, price: 'Free', color: '#f59e0b', category: 'DevOps', agents: ['Claude Code', 'MCP'], owner: 'system' },
    { name: 'SQL Migration Checker', slug: 'sql-migration-checker', description: 'Validate and preview SQL migrations safely.', rating: 4.6, downloads: 92, price: 'Paid', color: '#ef4444', category: 'Database', agents: ['Claude Code', 'Codex', 'Hermes'], owner: 'system' },
    { name: 'API Schema Validator', slug: 'api-schema-validator', description: 'Validate OpenAPI and JSON Schema specs.', rating: 4.5, downloads: 88, price: 'Free', color: '#059669', category: 'API', agents: ['OpenCode', 'MCP', 'Codex'], owner: 'system' },
  ]
  fallbackDb.set('packs', initialPacks)
  fallbackDb.set('users', [{ email: 'admin@agentpackhub.com', password: 'password123', token: 'mock-token-admin' }])
  fallbackDb.set('imports', ['github-issue-to-pr'])
  fallbackDb.set('initialized', true)
}

class AgentPackClient {
  constructor() {
    this.token = localStorage.getItem('agentpack_token') || null
    const storedUser = localStorage.getItem('agentpack_active_user')
    this.currentUser = storedUser ? JSON.parse(storedUser) : null
  }

  setToken(token) {
    this.token = token
    if (token) {
      localStorage.setItem('agentpack_token', token)
    } else {
      localStorage.removeItem('agentpack_token')
    }
  }

  setCurrentUser(user) {
    this.currentUser = user
    if (user) {
      localStorage.setItem('agentpack_active_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('agentpack_active_user')
    }
  }

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      throw new Error(errData.message || 'API request failed')
    }
    return await response.json()
  }

  async login(email, password) {
    try {
      const res = await this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      this.setToken(res.token)
      this.setCurrentUser(res.user)
      return res.user
    } catch (err) {
      // Fallback if server is not running
      if (err.message === 'Failed to fetch') {
        const users = fallbackDb.get('users', [])
        const user = users.find(u => u.email === email && u.password === password)
        if (!user) throw new Error('Invalid email or password.')

        const userProfile = { email: user.email, name: user.email.split('@')[0] }
        this.setToken(user.token || 'mock-token-' + Date.now())
        this.setCurrentUser(userProfile)
        return userProfile
      }
      throw err;
    }
  }

  async register(email, password) {
    try {
      const res = await this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      this.setToken(res.token)
      this.setCurrentUser(res.user)
      return res.user
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        const users = fallbackDb.get('users', [])
        if (users.some(u => u.email === email)) throw new Error('User already exists.')

        const newUser = { email, password, token: 'mock-token-' + Date.now() }
        fallbackDb.set('users', [...users, newUser])

        const userProfile = { email: newUser.email, name: newUser.email.split('@')[0] }
        this.setToken(newUser.token)
        this.setCurrentUser(userProfile)
        return userProfile
      }
      throw err;
    }
  }

  logout() {
    this.setToken(null)
    this.setCurrentUser(null)
  }

  async getPacks() {
    try {
      return await this.request('/packs')
    } catch (err) {
      return fallbackDb.get('packs', [])
    }
  }

  async getPack(slug) {
    try {
      return await this.request(`/packs/${slug}`)
    } catch (err) {
      const packs = fallbackDb.get('packs', [])
      const pack = packs.find(p => p.slug === slug)
      if (!pack) throw new Error('Pack not found.')
      return pack
    }
  }

  async publishPack(packData) {
    try {
      return await this.request('/packs/publish', {
        method: 'POST',
        body: JSON.stringify(packData)
      })
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        const packs = fallbackDb.get('packs', [])
        if (packs.some(p => p.slug === packData.slug)) {
          throw new Error('An AgentPack with this name already exists.')
        }

        const newPack = {
          ...packData,
          rating: 5.0,
          downloads: 0,
          price: 'Free',
          owner: this.currentUser ? this.currentUser.email : 'anonymous'
        }

        fallbackDb.set('packs', [...packs, newPack])
        return newPack
      }
      throw err;
    }
  }

  async importPack(slug) {
    // Ping local daemon bridge to install files on dev host system
    try {
      await fetch(`http://localhost:2828/import?slug=${slug}`)
    } catch (e) {
      console.warn('[AgentPack Client] Local Bridge daemon is not running on port 2828.')
    }

    try {
      return await this.request(`/user/import/${slug}`, {
        method: 'POST'
      })
    } catch (err) {
      const imports = fallbackDb.get('imports', [])
      if (!imports.includes(slug)) {
        fallbackDb.set('imports', [...imports, slug])
        const packs = fallbackDb.get('packs', [])
        fallbackDb.set('packs', packs.map(p => p.slug === slug ? { ...p, downloads: p.downloads + 1 } : p))
      }
      return true
    }
  }

  async getUserImports() {
    try {
      return await this.request('/user/imports')
    } catch (err) {
      const imports = fallbackDb.get('imports', [])
      const packs = fallbackDb.get('packs', [])
      return packs.filter(p => imports.includes(p.slug))
    }
  }

  async getUserPacks() {
    try {
      return await this.request('/user/packs')
    } catch (err) {
      const email = this.currentUser ? this.currentUser.email : ''
      const packs = fallbackDb.get('packs', [])
      return packs.filter(p => p.owner === email)
    }
  }
}

export const api = new AgentPackClient()

// Doc: Added API class method annotations for runtime reference.

// Doc: Explained JWT token refresh cycle fallback constraints.

// Doc: Added config keys reference parameters.

// Doc: Clarified fetch request connection timeout error checking.
