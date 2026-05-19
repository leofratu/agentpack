import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from './Toast'
import { api } from '../utils/api'

const agentDetails = {
  'Claude Code': { label: 'C', bg: '#d97757' },
  'Codex': { label: 'X', bg: '#475569' },
  'OpenCode': { label: 'O', bg: '#10b981' },
  'Kilo': { label: 'K', bg: '#2563eb' },
  'Hermes': { label: 'H', bg: '#8b5cf6' },
  'MCP': { label: 'M', bg: '#d946ef' },
}

function FeaturedPacks() {
  const scrollRef = useRef(null)
  const toast = useToast()
  const [bookmarked, setBookmarked] = useState({})
  const [packs, setPacks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const data = await api.getPacks()
        // Take the top 6 packs
        setPacks(data.slice(0, 6))
      } catch (err) {
        console.error('Failed to load featured packs:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPacks()
  }, [])

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'right' ? 280 : -280, behavior: 'smooth' })
    }
  }

  const handleImport = async (e, slug, name) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await api.importPack(slug)
      toast(`${name} imported successfully!`)
      // Refresh count
      const data = await api.getPacks()
      setPacks(data.slice(0, 6))
    } catch (err) {
      toast(err.message || 'Import failed.', 'error')
    }
  }

  const handleBookmark = (e, packName) => {
    e.preventDefault()
    e.stopPropagation()
    setBookmarked((prev) => ({ ...prev, [packName]: !prev[packName] }))
    toast(bookmarked[packName] ? `${packName} removed from bookmarks.` : `${packName} bookmarked!`, 'info')
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-14 border-t border-border">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-text mb-0.5">Featured AgentPacks</h2>
          <p className="text-xs text-text-muted">Popular packs from the community.{' '}
            <Link to="/explore" className="text-primary font-medium hover:underline">Browse all →</Link>
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5">
          <button onClick={() => scroll('left')} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-gray-100 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <button onClick={() => scroll('right')} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-gray-100 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-xs text-text-muted">
          Loading featured packs...
        </div>
      ) : (
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-2 snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {packs.map((pack) => (
            <Link to={`/pack/${pack.slug}`} key={pack.name} className="glow-card min-w-[230px] max-w-[230px] snap-start border border-border bg-white rounded-lg p-4 flex flex-col">
              <div className="flex items-start gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ backgroundColor: pack.color || '#64748b' }}>
                  {pack.name[0]}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-semibold text-text truncate">{pack.name}</h3>
                  <p className="text-[11px] text-text-muted mt-0.5 line-clamp-2">{pack.description}</p>
                </div>
              </div>
              <div className="mb-2.5">
                <p className="text-[10px] text-text-muted mb-1">Supported agents</p>
                <div className="flex gap-1.5">
                  {(pack.agents || []).map((agent) => {
                    const detail = agentDetails[agent] || { label: '?', bg: '#64748b' }
                    return (
                      <div 
                        key={agent} 
                        title={agent}
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-sm transition-transform hover:scale-110" 
                        style={{ backgroundColor: detail.bg }}
                      >
                        {detail.label}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="mt-auto pt-2.5 border-t border-border-light">
                <div className="flex items-center justify-between text-[11px] text-text-muted mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center gap-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg>
                      {pack.rating}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      {pack.downloads}
                    </span>
                  </div>
                  <span className={`text-[11px] font-medium ${pack.price === 'Free' ? 'text-imported' : 'text-text'}`}>
                    {pack.price}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => handleImport(e, pack.slug, pack.name)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[11px] font-medium border border-border bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Import
                  </button>
                  <button
                    onClick={(e) => handleBookmark(e, pack.name)}
                    className={`p-1.5 border rounded-md transition-colors ${bookmarked[pack.name] ? 'border-primary/30 bg-primary/10 text-primary' : 'border-border bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill={bookmarked[pack.name] ? '#10b981' : 'none'} stroke={bookmarked[pack.name] ? '#10b981' : 'currentColor'} strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default FeaturedPacks
