import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useToast } from '../components/Toast'
import { api } from '../utils/api'

const agentList = [
  { name: 'Claude Code', color: '#d97757' },
  { name: 'Codex', color: '#1a1a1a' },
  { name: 'OpenCode', color: '#1a5c2e' },
  { name: 'Kilo', color: '#7c3aed' },
  { name: 'Hermes', color: '#0891b2' },
  { name: 'MCP', color: '#dc2626' },
]

const initialReviews = [
  { user: 'sarah_dev', rating: 5, text: 'Works perfectly. Imported in one click and saved me hours of work.', date: '3 days ago' },
  { user: 'mike_eng', rating: 4, text: 'Solid tool. Could use better error messages but the core functionality is great.', date: '1 week ago' },
  { user: 'alex_ops', rating: 5, text: 'Exactly what I needed. The one-click import made it trivial to set up.', date: '2 weeks ago' },
]

function PackDetail() {
  const { slug } = useParams()
  const toast = useToast()
  const [pack, setPack] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookmarked, setBookmarked] = useState(false)
  const [imported, setImported] = useState(false)
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [userReviews, setUserReviews] = useState(initialReviews)

  useEffect(() => {
    let isMounted = true
    const fetchPack = async () => {
      try {
        const data = await api.getPack(slug)
        if (isMounted) setPack(data)
      } catch (err) {
        console.error(err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchPack()
    return () => {
      isMounted = false
    }
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <p className="text-xs text-text-muted">Loading AgentPack details...</p>
      </div>
    )
  }

  if (!pack) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-xl font-bold text-text mb-2">Pack not found</h1>
        <p className="text-sm text-text-muted mb-4">The AgentPack you're looking for doesn't exist.</p>
        <Link to="/explore" className="text-xs text-primary font-medium hover:underline">← Browse all packs</Link>
      </div>
    )
  }

  const handleImport = async () => {
    try {
      await api.importPack(slug)
      setImported(true)
      toast(`${pack.name} imported successfully! It's now available in your agent.`)
      // Refresh count representation
      const updatedPack = await api.getPack(slug)
      setPack(updatedPack)
    } catch (err) {
      toast(err.message || 'Import failed.', 'error')
    }
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    toast(bookmarked ? 'Removed from bookmarks.' : 'Added to bookmarks!', 'info')
  }

  const handleReview = (e) => {
    e.preventDefault()
    if (!reviewText.trim()) {
      toast('Please write a review.', 'error')
      return
    }
    setUserReviews([{ user: 'you', rating: reviewRating, text: reviewText, date: 'Just now' }, ...userReviews])
    setReviewText('')
    toast('Review submitted! Thank you.')
  }

  const copyCommand = () => {
    navigator.clipboard.writeText(`agentpack import ${slug}`)
    toast('Command copied!', 'info')
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Link to="/explore" className="text-xs text-text-muted hover:text-text transition-colors">← Back to Explore</Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-start gap-3 mb-6">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0" 
              style={{ backgroundColor: pack.color || '#10b981' }}
            >
              {pack.name[0]}
            </div>
            <div>
              <h1 className="text-xl font-bold text-text">{pack.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-text-muted">by <Link to="#" className="text-primary hover:underline">{pack.owner || 'community'}</Link></span>
                <Link to={`/explore?category=${pack.category}`} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-text-muted hover:bg-gray-200 transition-colors">{pack.category}</Link>
                <span className="text-[10px] text-text-muted">v{pack.version || '1.0.0'}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-text-muted leading-relaxed mb-6">{pack.longDescription || pack.description}</p>

          <div className="border-t border-border pt-6 mb-6">
            <h2 className="text-sm font-semibold text-text mb-3">Capabilities</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {(pack.capabilities ? (Array.isArray(pack.capabilities) ? pack.capabilities : pack.capabilities.split(',').map(s => s.trim())) : ['Standard automation interface']).map((cap) => (
                <div key={cap} className="flex items-center gap-2 text-xs text-text-muted">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  {cap}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-6 mb-6">
            <h2 className="text-sm font-semibold text-text mb-3">Supported agents</h2>
            <div className="flex flex-wrap gap-2">
              {(pack.agents || []).map((agentName) => {
                const matched = agentList.find(a => a.name === agentName) || { name: agentName, color: '#64748b' }
                return (
                  <div key={agentName} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 border border-border rounded-md">
                    <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: matched.color }} />
                    <span className="text-[11px] text-text font-medium">{matched.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-text">Reviews ({userReviews.length})</h2>
            </div>

            <form onSubmit={handleReview} className="border border-border rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-text-muted">Your rating:</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setReviewRating(star)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill={star <= reviewRating ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1.5">
                        <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/>
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
                className="w-full px-3 py-2 text-xs border border-border rounded-md focus:outline-none focus:border-primary/40 resize-none h-16"
              />
              <button type="submit" className="mt-2 px-4 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary-dark transition-colors">
                Submit review
              </button>
            </form>

            <div className="space-y-3">
              {userReviews.map((review, i) => (
                <div key={i} className="border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[9px] font-bold text-text-muted">{review.user[0].toUpperCase()}</div>
                      <span className="text-xs font-medium text-text">{review.user}</span>
                      <div className="flex">
                        {Array(review.rating).fill(0).map((_, j) => (
                          <svg key={j} width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-text-muted">{review.date}</span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20 border border-border rounded-lg p-5">
            <button
              onClick={handleImport}
              disabled={imported}
              className={`w-full py-2.5 text-xs font-semibold rounded-md flex items-center justify-center gap-2 mb-2 transition-colors ${imported ? 'bg-imported text-white' : 'bg-primary text-white hover:bg-primary-dark'}`}
            >
              {imported ? (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg> Imported</>
              ) : (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Import in one click</>
              )}
            </button>
            <button
              onClick={handleBookmark}
              className={`w-full py-2 text-xs font-medium rounded-md flex items-center justify-center gap-2 border transition-colors mb-3 ${bookmarked ? 'border-primary/30 bg-primary/5 text-primary' : 'border-border text-text hover:bg-gray-50'}`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
            <p className="text-[10px] text-text-muted text-center mb-4">Installs via AgentPack Bridge. No config needed.</p>

            <div className="space-y-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted">Price</span>
                <span className={`font-medium ${pack.price === 'Free' ? 'text-imported' : 'text-text'}`}>{pack.price || 'Free'}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted">Rating</span>
                <span className="flex items-center gap-1 font-medium text-text">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg>
                  {pack.rating}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted">Imports</span>
                <span className="font-medium text-text">{pack.downloads}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted">Version</span>
                <span className="font-medium text-text">{pack.version || '1.0.0'}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted">Updated</span>
                <span className="font-medium text-text">{pack.updated || 'Just now'}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted">Author</span>
                <span className="font-medium text-primary">{pack.owner || 'community'}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border">
              <h4 className="text-[11px] font-semibold text-text mb-2">Install manually</h4>
              <div
                onClick={copyCommand}
                className="bg-gray-50 rounded-md px-3 py-2 font-mono text-[11px] text-text-muted cursor-pointer hover:bg-gray-100 transition-colors"
                title="Click to copy"
              >
                agentpack import {slug}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border">
              <h4 className="text-[11px] font-semibold text-text mb-2">Links</h4>
              <div className="space-y-1.5">
                <a href={pack.repoUrl || '#'} onClick={(e) => { if (!pack.repoUrl) { e.preventDefault(); toast('No repo linked.', 'info') } }} className="flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  Source code
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); toast('Opening changelog...', 'info') }} className="flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  Changelog
                </a>
                <Link to="/docs?page=Troubleshooting" className="flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                  Report an issue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackDetail

// Registry: Copy commands copy shell CLI code.

// Registry: Reviews submission appends user ratings.

// Registry: Supported agents resolves color matching tokens.
