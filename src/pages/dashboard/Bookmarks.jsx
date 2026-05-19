import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '../../components/Toast'

const initialBookmarks = [
  { id: 1, name: 'Repo Security Auditor', slug: 'repo-security-auditor', author: 'sectools', description: 'Scan repos for secrets, risks, and misconfigs.', stars: 89, imports: 96, color: '#7c3aed', savedAt: '2 days ago' },
  { id: 2, name: 'SQL Migration Checker', slug: 'sql-migration-checker', author: 'db-tools', description: 'Validate and preview SQL migrations safely.', stars: 22, imports: 92, color: '#dc2626', savedAt: '5 days ago' },
  { id: 3, name: 'GitHub Issue to PR', slug: 'github-issue-to-pr', author: 'agentpack-team', description: 'Convert issues into PRs with auto context.', stars: 18, imports: 96, color: '#1a1a1a', savedAt: '1 week ago' },
  { id: 4, name: 'Invoice PDF to CSV', slug: 'invoice-pdf-to-csv', author: 'data-tools', description: 'Extract invoice data from PDFs to clean CSV.', stars: 14, imports: 97, color: '#d97757', savedAt: '2 weeks ago' },
]

function Bookmarks() {
  const toast = useToast()
  const [bookmarks, setBookmarks] = useState(initialBookmarks)

  const handleRemove = (id) => {
    setBookmarks(bookmarks.filter(b => b.id !== id))
    toast('Removed from bookmarks.', 'info')
  }

  const handleImport = (name) => {
    toast(`${name} imported successfully!`)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold text-text">Bookmarks</h1>
          <p className="text-xs text-text-muted">{bookmarks.length} packs saved for later</p>
        </div>
      </div>

      <div className="space-y-2">
        {bookmarks.map((pack) => (
          <div key={pack.id} className="border border-border rounded-lg p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-md flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ backgroundColor: pack.color }}>
              {pack.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Link to={`/pack/${pack.slug}`} className="text-xs font-semibold text-text hover:text-primary transition-colors">{pack.name}</Link>
                <span className="text-[10px] text-text-muted">by {pack.author}</span>
              </div>
              <p className="text-[11px] text-text-muted mt-0.5 truncate">{pack.description}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] text-text-muted flex items-center gap-0.5">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg>
                  {pack.stars}
                </span>
                <span className="text-[10px] text-text-muted">{pack.imports} imports</span>
                <span className="text-[10px] text-text-muted">Saved {pack.savedAt}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => handleImport(pack.name)} className="px-2 py-1 text-[10px] text-white bg-primary rounded hover:bg-primary-dark transition-colors">Import</button>
              <button onClick={() => handleRemove(pack.id)} className="px-2 py-1 text-[10px] text-text-muted border border-border rounded hover:bg-gray-50 transition-colors">Remove</button>
            </div>
          </div>
        ))}
      </div>

      {bookmarks.length === 0 && (
        <div className="text-center py-10 border border-border rounded-lg">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" className="mx-auto mb-2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          <p className="text-xs text-text-muted mb-2">No bookmarks yet.</p>
          <Link to="/explore" className="text-xs text-primary font-medium hover:underline">Browse packs to bookmark →</Link>
        </div>
      )}
    </div>
  )
}

export default Bookmarks
