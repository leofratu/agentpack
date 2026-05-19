import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '../../components/Toast'
import { api } from '../../utils/api'

function Imported() {
  const toast = useToast()
  const [imported, setImported] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchImports = async () => {
    try {
      const data = await api.getUserImports()
      setImported(data.map((p, idx) => ({
        id: p.slug || idx,
        name: p.name,
        slug: p.slug,
        author: p.owner || 'community',
        version: p.version || '1.0.0',
        latestVersion: p.version || '1.0.0',
        agent: p.agents ? p.agents[0] : 'Claude Code',
        importedAt: 'Just now',
        color: p.color || '#10b981'
      })))
    } catch (err) {
      toast('Failed to load imports.', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImports()
  }, [])

  const hasUpdate = (pack) => pack.version !== pack.latestVersion
  const updatesAvailable = imported.filter(hasUpdate).length

  const handleUpdate = (id) => {
    setImported(imported.map(p => p.id === id ? { ...p, version: p.latestVersion } : p))
    toast('Pack updated to latest version!')
  }

  const handleUpdateAll = () => {
    setImported(imported.map(p => ({ ...p, version: p.latestVersion })))
    toast(`Updated ${updatesAvailable} packs!`)
  }

  const handleRemove = async (slug) => {
    // Remove simulation
    toast('Pack removed from your agent.', 'info')
    setImported(imported.filter(p => p.slug !== slug))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold text-text">Imported Packs</h1>
          <p className="text-xs text-text-muted">{imported.length} packs installed across your agents</p>
        </div>
        {updatesAvailable > 0 && (
          <button onClick={handleUpdateAll} className="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary-dark transition-colors">
            Update all ({updatesAvailable})
          </button>
        )}
      </div>

      {updatesAvailable > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
          <p className="text-xs text-amber-800">{updatesAvailable} pack{updatesAvailable > 1 ? 's have' : ' has'} updates available.</p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-10 text-xs text-text-muted">Loading imports...</div>
      ) : (
        <div className="space-y-2">
          {imported.map((pack) => (
            <div key={pack.id} className="border border-border rounded-lg p-3 flex items-center gap-3">
              <div 
                className="w-9 h-9 rounded-md flex items-center justify-center text-white font-bold text-xs shrink-0" 
                style={{ backgroundColor: pack.color }}
              >
                {pack.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Link to={`/pack/${pack.slug}`} className="text-xs font-semibold text-text hover:text-primary transition-colors">{pack.name}</Link>
                  {hasUpdate(pack) && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-amber-50 text-amber-700">Update available</span>
                  )}
                </div>
                <p className="text-[11px] text-text-muted mt-0.5">by {pack.author} · v{pack.version}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-text-muted flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: pack.agent === 'Claude Code' ? '#d97757' : pack.agent === 'Codex' ? '#1a1a1a' : '#1a5c2e' }} />
                    {pack.agent}
                  </span>
                  <span className="text-[10px] text-text-muted">Imported {pack.importedAt}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {hasUpdate(pack) ? (
                  <button onClick={() => handleUpdate(pack.id)} className="px-2 py-1 text-[10px] text-white bg-primary rounded hover:bg-primary-dark transition-colors">
                    Update to v{pack.latestVersion}
                  </button>
                ) : (
                  <span className="px-2 py-1 text-[10px] text-imported font-medium">Up to date</span>
                )}
                <button onClick={() => handleRemove(pack.slug)} className="px-2 py-1 text-[10px] text-red-500 border border-red-200 rounded hover:bg-red-50 transition-colors">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && imported.length === 0 && (
        <div className="text-center py-10 border border-border rounded-lg">
          <p className="text-xs text-text-muted mb-2">No packs imported yet.</p>
          <Link to="/explore" className="text-xs text-primary font-medium hover:underline">Browse the registry →</Link>
        </div>
      )}
    </div>
  )
}

export default Imported
