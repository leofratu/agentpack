import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../components/Toast'
import { api } from '../../utils/api'

const categories = ['DevOps', 'Data', 'Documentation', 'Security', 'Database', 'Testing', 'AI/ML', 'Utilities', 'API', 'Frontend', 'Backend', 'Automation']
const agents = ['Claude Code', 'Codex', 'OpenCode', 'Kilo', 'Hermes', 'MCP']

function PublishNew() {
  const toast = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    longDescription: '',
    category: '',
    version: '1.0.0',
    agents: [],
    capabilities: '',
    repoUrl: '',
  })

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value })
    if (field === 'name') {
      setForm({ ...form, name: value, slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') })
    }
  }

  const toggleAgent = (agent) => {
    setForm({
      ...form,
      agents: form.agents.includes(agent)
        ? form.agents.filter(a => a !== agent)
        : [...form.agents, agent]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) { toast('Pack name is required.', 'error'); return }
    if (!form.description.trim()) { toast('Short description is required.', 'error'); return }
    if (!form.category) { toast('Please select a category.', 'error'); return }
    if (form.agents.length === 0) { toast('Select at least one supported agent.', 'error'); return }

    setLoading(true)
    try {
      await api.publishPack(form)
      toast('AgentPack published successfully! 🎉')
      setTimeout(() => navigate('/dashboard/packs'), 500)
    } catch (err) {
      toast(err.message || 'Failed to publish pack.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveDraft = () => {
    if (!form.name.trim()) { toast('Pack name is required to save draft.', 'error'); return }
    toast('Draft saved!', 'info')
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-bold text-text">Publish New AgentPack</h1>
        <p className="text-xs text-text-muted">Fill out the details below to publish your pack to the registry.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-medium text-text block mb-1">Pack name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="e.g. GitHub Issue to PR"
              disabled={loading}
              className="w-full px-3 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:border-primary/40"
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-text block mb-1">Slug</label>
            <input
              type="text"
              value={form.slug}
              readOnly
              className="w-full px-3 py-1.5 text-xs border border-border rounded-md bg-gray-50 text-text-muted"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-medium text-text block mb-1">Short description *</label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="One line explaining what this pack does"
            maxLength={100}
            disabled={loading}
            className="w-full px-3 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:border-primary/40"
          />
          <p className="text-[10px] text-text-muted mt-0.5">{form.description.length}/100</p>
        </div>

        <div>
          <label className="text-[11px] font-medium text-text block mb-1">Full description</label>
          <textarea
            value={form.longDescription}
            onChange={(e) => updateField('longDescription', e.target.value)}
            placeholder="Detailed description of capabilities, usage, and requirements..."
            rows={4}
            disabled={loading}
            className="w-full px-3 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:border-primary/40 resize-none"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-medium text-text block mb-1">Category *</label>
            <select
              value={form.category}
              onChange={(e) => updateField('category', e.target.value)}
              disabled={loading}
              className="w-full px-3 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:border-primary/40"
            >
              <option value="">Select category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[11px] font-medium text-text block mb-1">Version</label>
            <input
              type="text"
              value={form.version}
              onChange={(e) => updateField('version', e.target.value)}
              disabled={loading}
              className="w-full px-3 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:border-primary/40"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-medium text-text block mb-1">Supported agents *</label>
          <div className="flex flex-wrap gap-2">
            {agents.map((agent) => (
              <button
                key={agent}
                type="button"
                onClick={() => toggleAgent(agent)}
                disabled={loading}
                className={`px-2.5 py-1 text-[11px] rounded-md border transition-colors ${form.agents.includes(agent) ? 'border-primary bg-primary/10 text-primary font-medium' : 'border-border text-text-muted hover:border-primary/30'}`}
              >
                {agent}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[11px] font-medium text-text block mb-1">Capabilities</label>
          <input
            type="text"
            value={form.capabilities}
            onChange={(e) => updateField('capabilities', e.target.value)}
            placeholder="Comma-separated: Read files, Parse JSON, Generate code"
            disabled={loading}
            className="w-full px-3 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:border-primary/40"
          />
          <p className="text-[10px] text-text-muted mt-0.5">Separate each capability with a comma</p>
        </div>

        <div>
          <label className="text-[11px] font-medium text-text block mb-1">Repository URL</label>
          <input
            type="url"
            value={form.repoUrl}
            onChange={(e) => updateField('repoUrl', e.target.value)}
            placeholder="https://github.com/you/your-pack"
            disabled={loading}
            className="w-full px-3 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:border-primary/40"
          />
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-border">
          <button 
            type="submit" 
            disabled={loading}
            className="px-4 py-2 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {loading ? 'Publishing...' : 'Publish pack'}
          </button>
          <button 
            type="button" 
            onClick={handleSaveDraft} 
            disabled={loading}
            className="px-4 py-2 text-xs border border-border rounded-md text-text hover:bg-gray-50 transition-colors"
          >
            Save as draft
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/dashboard/packs')} 
            disabled={loading}
            className="px-4 py-2 text-xs text-text-muted hover:text-text transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default PublishNew

// Dash: Slug generation maps to url-friendly forms.

// Dash: Agent selectors push names to array inputs.
