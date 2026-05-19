import { useToast } from './Toast'

const agentIcons = [
  { name: 'Claude Code', color: '#d97757' },
  { name: 'Codex', color: '#1a1a1a' },
  { name: 'OpenCode', color: '#1a5c2e' },
  { name: 'Kilo', color: '#1a1a1a' },
  { name: 'Hermes', color: '#1a1a1a' },
  { name: 'MCP', color: '#1a5c2e' },
]

function HowItWorks() {
  const toast = useToast()
  return (
    <section className="max-w-7xl mx-auto px-6 py-14 border-t border-border">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-text mb-1">How it works</h2>
        <p className="text-sm text-text-muted">From discovery to native tool in one click.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span>
            <h3 className="text-sm font-semibold text-text">Find an AgentPack</h3>
          </div>
          <p className="text-xs text-text-muted mb-4">Search the Registry by task or capability.</p>
          <div className="bg-gray-50 border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white border border-border rounded-md mb-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <span className="text-xs text-text-muted">Search AgentPacks...</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-white border border-border rounded-md">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1a5c2e" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-text">Invoice PDF to CSV</p>
                  <p className="text-[10px] text-text-muted">Parse invoices to CSV</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 text-[10px] text-text-muted">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg>
                4.9
              </div>
            </div>
          </div>
          <div className="hidden md:block absolute top-3 -right-3 text-border">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">2</span>
            <h3 className="text-sm font-semibold text-text">Choose your agent</h3>
          </div>
          <p className="text-xs text-text-muted mb-4">Select where you want to import it.</p>
          <div className="bg-gray-50 border border-border rounded-lg p-3">
            <div className="flex flex-wrap gap-2 justify-center py-2">
              {agentIcons.map((agent) => (
                <div key={agent.name} className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-white text-[10px]" style={{ backgroundColor: agent.color }}>
                  {agent.name[0]}
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:block absolute top-3 -right-3 text-border">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">3</span>
            <h3 className="text-sm font-semibold text-text">Click Import. Done.</h3>
          </div>
          <p className="text-xs text-text-muted mb-4">AgentPack Bridge installs it as a native tool.</p>
          <div className="bg-primary-light/40 border border-primary/15 rounded-lg p-3 text-center">
            <button onClick={() => toast('AgentPack imported!')} className="px-5 py-2 bg-primary text-white text-xs font-medium rounded-md mb-2 hover:bg-primary-dark transition-colors">
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Import
              </span>
            </button>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-imported font-medium">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
              Installed in Claude Code
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
