import { Link } from 'react-router-dom'
import { useToast } from '../../components/Toast'

const stats = [
  { label: 'Total Stars', value: '47', change: '+5 this week', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg> },
  { label: 'Published Packs', value: '6', change: '2 trending', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> },
  { label: 'Total Imports', value: '312', change: '+28 this week', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> },
  { label: 'Current Rank', value: 'Pro', change: '953 to Ultra', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L15 8.5 22 9.5 17 14.5 18 21.5 12 18 6 21.5 7 14.5 2 9.5 9 8.5Z"/></svg> },
]

const recentActivity = [
  { type: 'star', text: 'sarah_dev starred your "GitHub Issue to PR" pack', time: '2 hours ago' },
  { type: 'import', text: '"README Generator" was imported 8 times today', time: '5 hours ago' },
  { type: 'review', text: 'mike_eng left a 5-star review on "Dockerfile Fixer"', time: '1 day ago' },
  { type: 'milestone', text: 'You reached 300 total imports!', time: '2 days ago' },
  { type: 'star', text: 'alex_ops starred your "Invoice PDF to CSV" pack', time: '3 days ago' },
]

const topPacks = [
  { name: 'GitHub Issue to PR', stars: 18, imports: 96, trend: '+12%' },
  { name: 'Invoice PDF to CSV', stars: 14, imports: 97, trend: '+8%' },
  { name: 'README Generator', stars: 9, imports: 93, trend: '+15%' },
]

function Overview() {
  const toast = useToast()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold text-text">Dashboard</h1>
          <p className="text-xs text-text-muted">Welcome back, john_dev</p>
        </div>
        <Link to="/dashboard/publish" className="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary-dark transition-colors">
          + Publish new
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1.5">
              {stat.icon}
              <span className="text-[11px] text-text-muted">{stat.label}</span>
            </div>
            <p className="text-lg font-bold text-text">{stat.value}</p>
            <p className="text-[10px] text-imported">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 border border-border rounded-lg p-4">
          <h2 className="text-xs font-semibold text-text mb-3">Recent activity</h2>
          <div className="space-y-2.5">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${item.type === 'star' ? 'bg-amber-50' : item.type === 'import' ? 'bg-blue-50' : item.type === 'review' ? 'bg-green-50' : 'bg-purple-50'}`}>
                  {item.type === 'star' && <svg width="8" height="8" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg>}
                  {item.type === 'import' && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/></svg>}
                  {item.type === 'review' && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
                  {item.type === 'milestone' && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="3"><circle cx="12" cy="12" r="10"/></svg>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-text leading-relaxed">{item.text}</p>
                  <p className="text-[10px] text-text-muted">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-text">Top packs</h2>
            <Link to="/dashboard/analytics" className="text-[10px] text-primary font-medium hover:underline">View all</Link>
          </div>
          <div className="space-y-2.5">
            {topPacks.map((pack) => (
              <div key={pack.name} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <div>
                  <p className="text-xs font-medium text-text">{pack.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-text-muted flex items-center gap-0.5">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg>
                      {pack.stars}
                    </span>
                    <span className="text-[10px] text-text-muted">{pack.imports} imports</span>
                  </div>
                </div>
                <span className="text-[10px] text-imported font-medium">{pack.trend}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <h3 className="text-[11px] font-semibold text-text mb-2">Rank progress</h3>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] text-text-muted">Pro</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '4.7%' }} />
              </div>
              <span className="text-[10px] text-text-muted">Ultra</span>
            </div>
            <p className="text-[10px] text-text-muted">47 / 1,000 stars</p>
          </div>
        </div>
      </div>

      <div className="mt-4 border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-text">Quick actions</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/dashboard/publish" className="px-3 py-1.5 text-xs border border-border rounded-md hover:bg-gray-50 transition-colors text-text">Publish a pack</Link>
          <button onClick={() => toast('Opening import history...', 'info')} className="px-3 py-1.5 text-xs border border-border rounded-md hover:bg-gray-50 transition-colors text-text">View imports</button>
          <Link to="/dashboard/analytics" className="px-3 py-1.5 text-xs border border-border rounded-md hover:bg-gray-50 transition-colors text-text">Check analytics</Link>
          <button onClick={() => toast('Sharing profile link copied!', 'info')} className="px-3 py-1.5 text-xs border border-border rounded-md hover:bg-gray-50 transition-colors text-text">Share profile</button>
        </div>
      </div>
    </div>
  )
}

export default Overview
