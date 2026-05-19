import { useState } from 'react'
import { useToast } from '../../components/Toast'

const weeklyData = [
  { day: 'Mon', imports: 12, stars: 2 },
  { day: 'Tue', imports: 18, stars: 1 },
  { day: 'Wed', imports: 8, stars: 3 },
  { day: 'Thu', imports: 22, stars: 0 },
  { day: 'Fri', imports: 15, stars: 2 },
  { day: 'Sat', imports: 6, stars: 1 },
  { day: 'Sun', imports: 9, stars: 1 },
]

const packBreakdown = [
  { name: 'GitHub Issue to PR', imports: 96, stars: 18, percent: 31 },
  { name: 'Invoice PDF to CSV', imports: 97, stars: 14, percent: 31 },
  { name: 'README Generator', imports: 93, stars: 9, percent: 30 },
  { name: 'Dockerfile Fixer', imports: 26, stars: 4, percent: 8 },
]

const agentBreakdown = [
  { name: 'Claude Code', percent: 52, color: '#d97757' },
  { name: 'Codex', percent: 21, color: '#1a1a1a' },
  { name: 'OpenCode', percent: 15, color: '#1a5c2e' },
  { name: 'Kilo', percent: 7, color: '#7c3aed' },
  { name: 'Other', percent: 5, color: '#9ca3af' },
]

function Analytics() {
  const toast = useToast()
  const [period, setPeriod] = useState('week')
  const maxImports = Math.max(...weeklyData.map(d => d.imports))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold text-text">Analytics</h1>
          <p className="text-xs text-text-muted">Track your packs' performance</p>
        </div>
        <div className="flex items-center gap-1">
          {['week', 'month', 'year'].map((p) => (
            <button
              key={p}
              onClick={() => { setPeriod(p); toast(`Showing ${p}ly data`, 'info') }}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors capitalize ${period === p ? 'bg-primary/10 text-primary font-medium' : 'text-text-muted hover:text-text hover:bg-gray-50'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="border border-border rounded-lg p-3">
          <p className="text-[11px] text-text-muted">Imports this {period}</p>
          <p className="text-xl font-bold text-text">90</p>
          <p className="text-[10px] text-imported">+23% vs last {period}</p>
        </div>
        <div className="border border-border rounded-lg p-3">
          <p className="text-[11px] text-text-muted">Stars this {period}</p>
          <p className="text-xl font-bold text-text">10</p>
          <p className="text-[10px] text-imported">+5 new</p>
        </div>
        <div className="border border-border rounded-lg p-3">
          <p className="text-[11px] text-text-muted">Unique users</p>
          <p className="text-xl font-bold text-text">67</p>
          <p className="text-[10px] text-imported">+12 new</p>
        </div>
      </div>

      <div className="border border-border rounded-lg p-4 mb-4">
        <h2 className="text-xs font-semibold text-text mb-4">Imports this week</h2>
        <div className="flex items-end gap-2 h-28">
          {weeklyData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-primary/20 rounded-sm relative" style={{ height: `${(d.imports / maxImports) * 100}%` }}>
                <div className="absolute inset-x-0 bottom-0 bg-primary rounded-sm" style={{ height: `${(d.imports / maxImports) * 100}%` }} />
              </div>
              <span className="text-[9px] text-text-muted">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="border border-border rounded-lg p-4">
          <h2 className="text-xs font-semibold text-text mb-3">Pack breakdown</h2>
          <div className="space-y-2.5">
            {packBreakdown.map((pack) => (
              <div key={pack.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-text font-medium">{pack.name}</span>
                  <span className="text-[10px] text-text-muted">{pack.imports} imports · {pack.stars} stars</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${pack.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border rounded-lg p-4">
          <h2 className="text-xs font-semibold text-text mb-3">By agent</h2>
          <div className="space-y-2.5">
            {agentBreakdown.map((agent) => (
              <div key={agent.name} className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: agent.color }} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[11px] text-text">{agent.name}</span>
                    <span className="text-[10px] text-text-muted">{agent.percent}%</span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${agent.percent}%`, backgroundColor: agent.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <button onClick={() => toast('Exporting analytics as CSV...', 'info')} className="text-[11px] text-primary font-medium hover:underline">Export as CSV →</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
