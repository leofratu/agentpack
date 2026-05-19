const features = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    title: 'Discover',
    description: 'Browse the Registry — a curated catalog of portable agent capabilities.',
    tags: ['Registry', 'Curated'],
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>,
    title: 'Verify',
    description: 'Every AgentPack is sandbox tested and scored for quality and security.',
    tags: ['Quality score', 'Security score'],
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    title: 'Import',
    description: 'One click via AgentPack Bridge. No terminal, no config.',
    tags: ['One-click', 'Zero config'],
    highlight: true,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>,
    title: 'Publish',
    description: 'One click to share with the world. Available in every supported agent instantly.',
    tags: ['One-click', 'Global'],
    highlight: true,
  },
]

function Features() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <div key={feature.title} className={`p-5 rounded-xl border transition-all ${feature.highlight ? 'border-primary/20 bg-primary-light/20' : 'border-border'} hover:shadow-sm`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${feature.highlight ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-text-muted'}`}>
              {feature.icon}
            </div>
            <h3 className="text-sm font-semibold text-text mb-1">{feature.title}</h3>
            <p className="text-xs text-text-muted leading-relaxed mb-3">{feature.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {feature.tags.map((tag) => (
                <span key={tag} className={`text-[11px] px-2 py-0.5 rounded font-medium ${feature.highlight ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-text-muted'}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
