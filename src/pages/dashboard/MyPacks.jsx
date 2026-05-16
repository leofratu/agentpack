import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '../../components/Toast'
import { api } from '../../utils/api'

function MyPacks() {
  const toast = useToast()
  const [packs, setPacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const fetchUserPacks = async () => {
    try {
      const data = await api.getUserPacks()
      setPacks(data.map((p, idx) => ({
        id: p.slug || idx,
        name: p.name,
        slug: p.slug,
        description: p.description,
        stars: p.rating ? Math.round(p.rating * 3) : 5,
        imports: p.downloads || 0,
        version: p.version || '1.0.0',
        status: p.status || 'published',
        updated: 'Just now',
        color: p.color
      })))
    } catch (err) {
      toast('Failed to load your packs.', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserPacks()
  }, [])

  const filtered = filter === 'all' ? packs : packs.filter(p => p.status === filter)
  const totalStars = packs.reduce((sum, p) => sum + p.stars, 0)

  const handleDelete = async (slug) => {
    // Delete simulation
    toast('Pack deleted.', 'info')
    setPacks(packs.filter(p => p.slug !== slug))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold text-text">My Packs</h1>
          <p className="text-xs text-text-muted">
            {loading ? 'Loading...' : `${packs.length} packs · ${totalStars} total stars`}
          </p>
        </div>
        <Link to="/dashboard/publish" className="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary-dark transition-colors">
          + New pack
        </Link>
      </div>

      <div className="flex items-center gap-1 mb-4">
        {['all', 'published', 'draft'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2.5 py-1 text-xs rounded-md transition-colors capitalize ${filter === f ? 'bg-primary/10 text-primary font-medium' : 'text-text-muted hover:text-text hover:bg-gray-50'}`}
          >
            {f} {f === 'all' ? `(${packs.length})` : `(${packs.filter(p => f === 'published' ? p.status === 'published' : p.status === 'draft').length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-10 text-xs text-text-muted">Loading your packs...</div>
      ) : (
        <div className="space-y-2">
          {filtered.map((pack) => (
            <div key={pack.id} className="border border-border rounded-lg p-3 flex items-center gap-3">
              <div 
                className="w-9 h-9 rounded-md flex items-center justify-center text-white font-bold text-xs shrink-0"
                style={{ backgroundColor: pack.color || '#10b981' }}
              >
                {pack.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Link to={`/pack/${pack.slug}`} className="text-xs font-semibold text-text hover:text-primary transition-colors">{pack.name}</Link>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${pack.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-text-muted'}`}>
                    {pack.status}
                  </span>
                  <span className="text-[10px] text-text-muted">v{pack.version}</span>
                </div>
                <p className="text-[11px] text-text-muted mt-0.5 truncate">{pack.description}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-text-muted flex items-center gap-0.5">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg>
                    {pack.stars}
                  </span>
                  <span className="text-[10px] text-text-muted">{pack.imports} imports</span>
                  <span className="text-[10px] text-text-muted">Updated {pack.updated}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => toast('Opening version manager...', 'info')} className="px-2 py-1 text-[10px] text-text-muted border border-border rounded hover:bg-gray-50 transition-colors">Versions</button>
                <button onClick={() => handleDelete(pack.slug)} className="px-2 py-1 text-[10px] text-red-500 border border-red-200 rounded hover:bg-red-50 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-10 border border-border rounded-lg">
          <p className="text-xs text-text-muted mb-2">No packs found.</p>
          <Link to="/dashboard/publish" className="text-xs text-primary font-medium hover:underline">Create your first pack →</Link>
        </div>
      )}
    </div>
  )
}

export default MyPacks

// Dash: Delete actions clear package data indices.
