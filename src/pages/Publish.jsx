import { Link } from 'react-router-dom'
import { useToast } from '../components/Toast'

const steps = [
  { num: 1, title: 'Create your AgentPack', description: 'Write your tool, wrapper, or script. Use any language — we support Python, TypeScript, Bash, and more.' },
  { num: 2, title: 'Add a manifest', description: 'Define metadata, capabilities, inputs/outputs, and agent compatibility in a simple YAML file.' },
  { num: 3, title: 'Publish in one click', description: 'Run `agentpack publish` or use the web dashboard. Your pack is live instantly across all agents.' },
]

const benefits = [
  { title: 'Global distribution', description: 'Available in every supported agent instantly.', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  { title: 'Monetization', description: 'Set your own price or keep it free. We handle payments.', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { title: 'Analytics', description: 'Track installs, ratings, and usage across agents.', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg> },
  { title: 'Auto-testing', description: 'Every push is sandbox tested and security scored.', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
]

function Publish() {
  const toast = useToast()

  const copyCommand = (cmd) => {
    navigator.clipboard.writeText(cmd)
    toast('Command copied to clipboard!', 'info')
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="max-w-2xl mb-12">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-medium mb-4">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          One-click publishing
        </div>
        <h1 className="text-2xl font-bold text-text mb-2">Publish your AgentPack</h1>
        <p className="text-sm text-text-muted leading-relaxed">
          Share your tools with the world. One command to publish, one click for anyone to import.
          Your pack works across Claude Code, Codex, OpenCode, Kilo, Hermes, and more.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-14">
        {steps.map((step) => (
          <div key={step.num} className="border border-border rounded-lg p-5 relative">
            <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mb-3">{step.num}</span>
            <h3 className="text-sm font-semibold text-text mb-1.5">{step.title}</h3>
            <p className="text-[11px] text-text-muted leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-10 mb-12">
        <h2 className="text-lg font-bold text-text mb-6">Why publish on AgentPack Hub?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b) => (
            <div key={b.title} className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">{b.icon}</div>
              <div>
                <h4 className="text-xs font-semibold text-text mb-0.5">{b.title}</h4>
                <p className="text-[11px] text-text-muted leading-relaxed">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-border rounded-lg p-6 mb-10">
        <h2 className="text-lg font-bold text-text mb-1">Quick start</h2>
        <p className="text-xs text-text-muted mb-4">Get your first AgentPack published in under 5 minutes.</p>
        <div className="bg-gray-50 rounded-md p-4 font-mono text-xs text-text space-y-1 relative group">
          <button
            onClick={() => copyCommand('npm install -g @agentpack/cli && agentpack init my-tool && cd my-tool && agentpack publish')}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-[10px] text-text-muted bg-white border border-border px-2 py-0.5 rounded transition-opacity"
          >
            Copy all
          </button>
          <p className="text-text-muted"># Install the CLI</p>
          <p className="cursor-pointer hover:text-primary" onClick={() => copyCommand('npm install -g @agentpack/cli')}>npm install -g @agentpack/cli</p>
          <p className="text-text-muted mt-3"># Initialize a new AgentPack</p>
          <p className="cursor-pointer hover:text-primary" onClick={() => copyCommand('agentpack init my-tool')}>agentpack init my-tool</p>
          <p className="text-text-muted mt-3"># Publish to the registry</p>
          <p className="cursor-pointer hover:text-primary" onClick={() => copyCommand('agentpack publish')}>agentpack publish</p>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <Link to="/register" className="px-4 py-2 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary-dark transition-colors">
            Get started
          </Link>
          <Link to="/docs?page=Quick+Start" className="text-xs text-primary font-medium hover:underline">
            Read the full guide →
          </Link>
        </div>
      </div>

      <div className="bg-primary-light/30 border border-primary/10 rounded-lg p-6 text-center">
        <h3 className="text-sm font-semibold text-text mb-1">Already have a tool?</h3>
        <p className="text-xs text-text-muted mb-3">Wrap any existing script, CLI tool, or MCP server as an AgentPack in minutes.</p>
        <Link to="/docs?page=Migration+Guide" className="text-xs text-primary font-medium hover:underline">See the migration guide →</Link>
      </div>
    </div>
  )
}

export default Publish
