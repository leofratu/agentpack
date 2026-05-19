import { Link } from 'react-router-dom'
import { useToast } from './Toast'

const agents = [
  { name: 'Claude Code', color: '#d97757' },
  { name: 'Codex', color: '#1a1a1a' },
  { name: 'OpenCode', color: '#1a5c2e' },
  { name: 'Kilo', color: '#1a1a1a' },
  { name: 'Hermes', color: '#1a1a1a' },
  { name: 'MCP', color: '#1a5c2e' },
]

function Hero() {
  const toast = useToast()

  return (
    <section className="max-w-7xl mx-auto px-6 pt-12 pb-16">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs text-text-muted mb-6">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            One-click import &middot; One-click publish
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-text mb-4">
            Give your AI agent<br />a new skill in{' '}
            <span className="text-primary">one click</span>.
          </h1>
          <p className="text-base text-text-muted mb-6 max-w-md leading-relaxed">
            Import wrappers, scripts, MCP servers, and reusable agent skills
            directly into Claude Code, Codex, OpenCode, Kilo, Hermes, and more.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Link to="/explore" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition-colors">
              Browse AgentPacks
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/publish" className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm font-medium rounded-full hover:bg-gray-50 transition-colors text-text">
              Publish your first AgentPack
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {['Sandbox tested', 'Security scored', 'One-click import', 'MCP compatible'].map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1 px-2.5 py-1 bg-badge-green/40 text-badge-green-text text-[11px] font-medium rounded-full">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="flex items-start justify-center gap-4">
            <div className="w-64 bg-white border border-border rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className="w-4 h-4 bg-primary/10 rounded flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1a5c2e" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                </div>
                <span className="text-[11px] text-text-muted">AgentPack</span>
              </div>
              <h3 className="text-sm font-semibold text-text">Invoice PDF to CSV</h3>
              <span className="text-[11px] text-text-muted">v1.2.0</span>
              <div className="mt-3 space-y-1.5">
                {['Parse PDF', 'Extract tables', 'Export CSV'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-xs text-text">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                    {item}
                  </div>
                ))}
              </div>
              <button
                onClick={() => toast('Invoice PDF to CSV imported to Claude Code!')}
                className="mt-3 w-full py-2 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary-dark transition-colors"
              >
                Import
              </button>
              <div className="mt-2 flex items-center gap-1.5 justify-center text-[11px] text-text-muted">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="M22 4L12 14.01l-3-3"/>
                </svg>
                Installed as a native tool
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {agents.map((agent) => (
                <div key={agent.name} className="flex items-center gap-2.5 bg-white border border-border rounded-lg px-3 py-2 min-w-[160px]">
                  <div className="w-6 h-6 rounded flex items-center justify-center font-bold text-white text-[10px]" style={{ backgroundColor: agent.color }}>
                    {agent.name[0]}
                  </div>
                  <span className="text-xs font-medium text-text">{agent.name}</span>
                  <span className="ml-auto flex items-center gap-0.5 text-[10px] text-imported font-medium">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                    Imported
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
