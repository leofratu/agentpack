import { useState } from 'react'
import { Link } from 'react-router-dom'

const rankColors = { Newcomer: '#9ca3af', Contributor: '#3b82f6', Pro: '#1a5c2e', Ultra: '#7c3aed' }
const rankIcons = { Newcomer: '○', Contributor: '◆', Pro: '★', Ultra: '✦' }

const creators = [
  { username: 'sarah_dev', rank: 'Ultra', stars: 1243, packs: 14, imports: 8420, trend: '+52' },
  { username: 'ai_craftsman', rank: 'Ultra', stars: 1108, packs: 11, imports: 6230, trend: '+38' },
  { username: 'devops_ninja', rank: 'Pro', stars: 284, packs: 9, imports: 3100, trend: '+21' },
  { username: 'sectools', rank: 'Pro', stars: 89, packs: 8, imports: 1560, trend: '+14' },
  { username: 'john_dev', rank: 'Pro', stars: 47, packs: 6, imports: 312, trend: '+5' },
  { username: 'container-labs', rank: 'Pro', stars: 34, packs: 4, imports: 410, trend: '+7' },
  { username: 'doc-smith', rank: 'Pro', stars: 22, packs: 5, imports: 280, trend: '+3' },
  { username: 'data-tools', rank: 'Contributor', stars: 7, packs: 3, imports: 240, trend: '+2' },
  { username: 'ml_pipeline', rank: 'Contributor', stars: 5, packs: 2, imports: 120, trend: '+1' },
  { username: 'fresh_dev', rank: 'Newcomer', stars: 1, packs: 1, imports: 15, trend: '+1' },
]

function Leaderboard() {
  const [sortBy, setSortBy] = useState('stars')

  const sorted = [...creators].sort((a, b) => {
    if (sortBy === 'stars') return b.stars - a.stars
    if (sortBy === 'imports') return b.imports - a.imports
    if (sortBy === 'packs') return b.packs - a.packs
    return b.trend - a.trend
  })

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-text mb-1">Leaderboard</h1>
        <p className="text-sm text-text-muted">Top creators ranked by community recognition.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {sorted.slice(0, 3).map((creator, i) => (
          <Link key={creator.username} to={`/user/${creator.username}`} className={`border rounded-lg p-4 text-center hover:border-primary/30 transition-colors ${i === 0 ? 'border-amber-300 bg-amber-50/30' : 'border-border'}`}>
            <div className="flex items-center justify-center mb-2">
              <span className={`text-sm font-bold ${i === 0 ? 'text-amber-500' : i === 1 ? 'text-gray-400' : 'text-amber-700'}`}>#{i + 1}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mx-auto mb-2">
              {creator.username[0].toUpperCase()}
            </div>
            <h3 className="text-xs font-semibold text-text">{creator.username}</h3>
            <div className="flex items-center justify-center gap-1 mt-1">
              <span style={{ color: rankColors[creator.rank] }}>{rankIcons[creator.rank]}</span>
              <span className="text-[10px] font-medium" style={{ color: rankColors[creator.rank] }}>{creator.rank}</span>
            </div>
            <div className="flex items-center justify-center gap-1 mt-2">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg>
              <span className="text-xs font-bold text-text">{creator.stars.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-imported mt-0.5">+{creator.trend.replace('+', '')} this week</p>
          </Link>
        ))}
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="flex items-center gap-1 p-3 border-b border-border bg-gray-50">
          <span className="text-[11px] text-text-muted mr-2">Sort by:</span>
          {['stars', 'imports', 'packs', 'trend'].map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-2.5 py-1 text-[11px] rounded-md transition-colors capitalize ${sortBy === s ? 'bg-primary/10 text-primary font-medium' : 'text-text-muted hover:text-text hover:bg-white'}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="divide-y divide-border">
          {sorted.map((creator, i) => (
            <Link key={creator.username} to={`/user/${creator.username}`} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
              <span className="w-6 text-xs font-medium text-text-muted text-right">{i + 1}</span>
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">
                {creator.username[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-text">{creator.username}</span>
                  <span className="text-[10px]" style={{ color: rankColors[creator.rank] }}>{rankIcons[creator.rank]} {creator.rank}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div className="flex items-center gap-0.5">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg>
                    <span className="text-xs font-medium text-text">{creator.stars.toLocaleString()}</span>
                  </div>
                </div>
                <span className="text-[10px] text-text-muted w-16 text-right">{creator.imports.toLocaleString()} imports</span>
                <span className="text-[10px] text-text-muted w-10 text-right">{creator.packs} packs</span>
                <span className="text-[10px] text-imported w-8 text-right">{creator.trend}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Leaderboard

// Info: Leaderboard orders users by download aggregates.
