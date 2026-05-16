import { Link } from 'react-router-dom'

const categories = [
  { name: 'DevOps', description: 'CI/CD, Docker, Kubernetes, deployment automation.', count: 24, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>, color: '#0891b2' },
  { name: 'Security', description: 'Vulnerability scanning, secrets detection, compliance.', count: 18, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, color: '#7c3aed' },
  { name: 'Data', description: 'Parsing, extraction, transformation, and format conversion.', count: 31, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>, color: '#d97757' },
  { name: 'API', description: 'REST, GraphQL, OpenAPI validation and testing.', count: 15, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>, color: '#059669' },
  { name: 'Documentation', description: 'README generation, API docs, changelogs.', count: 12, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>, color: '#1a5c2e' },
  { name: 'Database', description: 'Migrations, queries, schema validation, backups.', count: 14, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>, color: '#dc2626' },
  { name: 'Testing', description: 'Unit tests, integration tests, test generation.', count: 20, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"/><rect x="3" y="3" width="18" height="18" rx="2"/></svg>, color: '#4f46e5' },
  { name: 'Git', description: 'Commit messages, branch management, PR automation.', count: 9, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>, color: '#6b7280' },
  { name: 'AI & ML', description: 'Prompt engineering, model evaluation, embeddings.', count: 22, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a4 4 0 0 1 4 4c0 1.1-.9 2-2 2h-4a2 2 0 0 1-2-2 4 4 0 0 1 4-4z"/><path d="M12 8v8"/><circle cx="12" cy="20" r="2"/><path d="M8 14h8"/></svg>, color: '#be185d' },
  { name: 'Formatting', description: 'Code formatting, linting, style enforcement.', count: 8, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg>, color: '#d97706' },
  { name: 'Cloud', description: 'AWS, GCP, Azure resource management and deployment.', count: 16, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>, color: '#0284c7' },
  { name: 'Monitoring', description: 'Logs, metrics, alerts, and observability tools.', count: 11, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, color: '#ea580c' },
]

function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text mb-1">Categories</h1>
        <p className="text-sm text-text-muted">Browse AgentPacks by category. Find exactly what your agent needs.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link to={`/explore?category=${cat.name}`} key={cat.name} className="glow-card group border border-border bg-white rounded-lg p-4 flex flex-col justify-between">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white shadow-sm" style={{ backgroundColor: cat.color }}>
                {cat.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-text group-hover:text-primary transition-colors">{cat.name}</h3>
                  <span className="text-[10px] text-text-muted bg-gray-50 border border-border px-1.5 py-0.5 rounded shrink-0">{cat.count} packs</span>
                </div>
                <p className="text-[11px] text-text-muted mt-2.5 leading-relaxed">{cat.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories

// Registry: Categories links lead to filter views.
