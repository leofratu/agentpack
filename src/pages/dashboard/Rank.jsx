import { useToast } from '../../components/Toast'

const ranks = [
  { name: 'Newcomer', minStars: 0, color: '#9ca3af', icon: '○', perks: ['Publish up to 3 packs', 'Basic profile', 'Community access'] },
  { name: 'Contributor', minStars: 3, color: '#3b82f6', icon: '◆', perks: ['Publish up to 5 packs', 'Contributor badge', 'Priority review queue'] },
  { name: 'Pro', minStars: 10, color: '#1a5c2e', icon: '★', perks: ['Unlimited published packs', 'Pro badge & profile flair', 'Advanced analytics', 'Webhooks & API access', 'Featured in search boost'] },
  { name: 'Ultra', minStars: 1000, color: '#7c3aed', icon: '✦', perks: ['Everything in Pro', 'Ultra badge & animated profile', 'Early access to platform features', 'Direct support channel', 'Co-creation invites', 'Registry homepage feature slot'] },
]

const skillLevels = [
  { name: 'DevOps', level: 4, maxLevel: 5, xp: '18 stars from DevOps packs' },
  { name: 'Data', level: 3, maxLevel: 5, xp: '14 stars from Data packs' },
  { name: 'Documentation', level: 2, maxLevel: 5, xp: '9 stars from Documentation packs' },
  { name: 'Security', level: 1, maxLevel: 5, xp: '4 stars from Security packs' },
]

const starHistory = [
  { from: 'sarah_dev', pack: 'GitHub Issue to PR', date: '2 hours ago' },
  { from: 'mike_eng', pack: 'Invoice PDF to CSV', date: '1 day ago' },
  { from: 'alex_ops', pack: 'GitHub Issue to PR', date: '2 days ago' },
  { from: 'jenny_ai', pack: 'README Generator', date: '3 days ago' },
  { from: 'tom_dev', pack: 'Dockerfile Fixer', date: '5 days ago' },
]

function Rank() {
  const toast = useToast()
  const currentStars = 47
  const currentRank = ranks.find((r, i) => {
    const next = ranks[i + 1]
    return !next || currentStars < next.minStars
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-bold text-text">Rank & Stars</h1>
        <p className="text-xs text-text-muted">Earn stars from the community to unlock ranks and perks. Everything is free.</p>
      </div>

      <div className="border border-primary/20 bg-primary-light/20 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold">
            {currentRank.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-text">{currentRank.name}</h2>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: `${currentRank.color}15`, color: currentRank.color }}>
                {currentStars} stars
              </span>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              {currentStars < 1000 ? `${1000 - currentStars} more stars to reach Ultra` : 'Maximum rank achieved!'}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-40 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min((currentStars / 1000) * 100, 100)}%` }} />
              </div>
              <span className="text-[10px] text-text-muted">{currentStars}/1000</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-3 mb-6">
        {ranks.map((rank) => {
          const isActive = rank.name === currentRank.name
          const isLocked = rank.minStars > currentStars
          return (
            <div key={rank.name} className={`border rounded-lg p-3 ${isActive ? 'border-primary bg-primary-light/10' : isLocked ? 'border-border opacity-60' : 'border-border'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg" style={{ color: rank.color }}>{rank.icon}</span>
                <div>
                  <h3 className="text-xs font-semibold text-text">{rank.name}</h3>
                  <p className="text-[10px] text-text-muted">{rank.minStars}+ stars</p>
                </div>
                {isActive && <span className="ml-auto text-[9px] px-1.5 py-0.5 bg-primary/10 text-primary rounded font-medium">Current</span>}
              </div>
              <ul className="space-y-1">
                {rank.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-1.5 text-[10px] text-text-muted">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={isLocked ? '#9ca3af' : '#16a34a'} strokeWidth="3" className="shrink-0 mt-0.5"><path d="M20 6L9 17l-5-5"/></svg>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="border border-border rounded-lg p-4">
          <h2 className="text-xs font-semibold text-text mb-3">Skill levels</h2>
          <p className="text-[10px] text-text-muted mb-3">Earn stars in specific categories to level up your skills.</p>
          <div className="space-y-3">
            {skillLevels.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-text">{skill.name}</span>
                  <span className="text-[10px] text-text-muted">Lv.{skill.level}/{skill.maxLevel}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }} />
                </div>
                <p className="text-[9px] text-text-muted mt-0.5">{skill.xp}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-text">Recent stars</h2>
            <button onClick={() => toast('Loading full star history...', 'info')} className="text-[10px] text-primary font-medium hover:underline">View all</button>
          </div>
          <div className="space-y-2.5">
            {starHistory.map((star, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-text"><span className="font-medium">{star.from}</span> starred <span className="font-medium">{star.pack}</span></p>
                  <p className="text-[10px] text-text-muted">{star.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rank
