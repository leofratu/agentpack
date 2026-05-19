import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useToast } from '../components/Toast'
import { api } from '../utils/api'

const categories = ['All', 'DevOps', 'Data', 'Security', 'API', 'Documentation', 'Database', 'Testing', 'Git']

const agentDetails = {
  'Claude Code': { label: 'C', bg: '#d97757' },
  'Codex': { label: 'X', bg: '#475569' },
  'OpenCode': { label: 'O', bg: '#10b981' },
  'Kilo': { label: 'K', bg: '#2563eb' },
  'Hermes': { label: 'H', bg: '#8b5cf6' },
  'MCP': { label: 'M', bg: '#d946ef' },
}

function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [sort, setSort] = useState('popular')
  const [packs, setPacks] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    let isMounted = true
    const fetchPacks = async () => {
      try {
        const data = await api.getPacks()
        if (isMounted) setPacks(data)
      } catch (err) {
        if (isMounted) toast('Failed to load packs from registry.', 'error')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchPacks()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat && categories.includes(cat)) setCategory(cat)
    const q = searchParams.get('q')
    if (q) setSearch(q)
  }, [searchParams])

  const handleCategoryChange = (cat) => {
    setCategory(cat)
    const params = {}
    if (cat !== 'All') params.category = cat
    if (search) params.q = search
    setSearchParams(params)
  }

  const handleSearchChange = (value) => {
    setSearch(value)
    const params = {}
    if (category !== 'All') params.category = category
    if (value) params.q = value
    setSearchParams(params)
  }

  const handleImport = async (slug, name) => {
    try {
      await api.importPack(slug)
      toast(`${name} imported!`)
      const data = await api.getPacks()
      setPacks(data)
    } catch (err) {
      toast(err.message || 'Import failed.', 'error')
    }
  }

  const filtered = packs
    .filter((p) => category === 'All' || p.category === category)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === 'popular' ? b.downloads - a.downloads : b.rating - a.rating)

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text mb-1">Explore AgentPacks</h1>
        <p className="text-sm text-text-muted">Find and import capabilities for your AI agent in one click.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search AgentPacks..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-border bg-white rounded-md focus:outline-none focus:border-primary/40 transition-colors text-text placeholder-text-muted"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 text-xs border border-border bg-white rounded-md focus:outline-none focus:border-primary/40 text-text"
        >
          <option value="popular">Most popular</option>
          <option value="rating">Highest rated</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${category === cat ? 'bg-primary text-white' : 'bg-white text-text-muted border border-border hover:bg-gray-100'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16">
          <p className="text-xs text-text-muted">Loading AgentPacks...</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((pack) => (
            <div key={pack.name} className="glow-card border border-border bg-white rounded-lg p-4 flex flex-col justify-between group">
              <Link to={`/pack/${pack.slug}`} className="block">
                <div className="flex items-start gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ backgroundColor: pack.color || '#64748b' }}>
                    {pack.name[0]}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-semibold text-text group-hover:text-primary transition-colors truncate">{pack.name}</h3>
                    <p className="text-[11px] text-text-muted mt-0.5 leading-relaxed">{pack.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mb-4">
                  {(pack.agents || []).map((agent) => {
                    const detail = agentDetails[agent] || { label: '?', bg: '#64748b' }
                    return (
                      <div 
                        key={agent} 
                        title={agent}
                        className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-sm" 
                        style={{ backgroundColor: detail.bg }}
                      >
                        {detail.label}
                      </div>
                    )
                  })}
                </div>
              </Link>
              <div className="flex items-center justify-between pt-2.5 border-t border-border-light">
                <div className="flex items-center gap-3 text-[11px] text-text-muted">
                  <span className="flex items-center gap-0.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg>
                    {pack.rating}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    {pack.downloads}
                  </span>
                  <span className="text-[10px] bg-gray-100 text-text px-1.5 py-0.5 rounded border border-border">{pack.category}</span>
                </div>
                <button
                  onClick={() => handleImport(pack.slug, pack.name)}
                  className="text-[11px] font-medium text-primary hover:underline"
                >
                  Import
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-text-muted mb-2">No AgentPacks found matching your search.</p>
          <button onClick={() => { setSearch(''); setCategory('All'); setSearchParams({}) }} className="text-xs text-primary font-medium hover:underline">Clear filters</button>
        </div>
      )}
    </div>
  )
}

export default Explore

// Registry: Filter selection runs category search.

// Registry: Search query filters pack titles.
