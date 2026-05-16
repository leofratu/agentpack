import { Link } from 'react-router-dom'
import { useToast } from '../components/Toast'

const ranks = [
  {
    name: 'Newcomer',
    stars: '0',
    icon: '○',
    color: '#9ca3af',
    description: 'Just getting started. Import and use any pack for free.',
    perks: ['Unlimited free imports', 'Publish up to 3 packs', 'Basic profile page', 'Community support', 'Sandbox testing'],
    highlight: false,
  },
  {
    name: 'Contributor',
    stars: '3+',
    icon: '◆',
    color: '#3b82f6',
    description: 'Your packs are getting noticed. You earned community trust.',
    perks: ['Everything in Newcomer', 'Publish up to 5 packs', 'Contributor badge', 'Priority review queue', 'Basic analytics'],
    highlight: false,
  },
  {
    name: 'Pro',
    stars: '10+',
    icon: '★',
    color: '#1a5c2e',
    description: 'Recognized creator. Your packs are helping the community.',
    perks: ['Everything in Contributor', 'Unlimited published packs', 'Pro badge & profile flair', 'Advanced analytics & insights', 'Webhooks & API access', 'Featured in search boost', 'Custom branding'],
    highlight: true,
  },
  {
    name: 'Ultra',
    stars: '1000+',
    icon: '✦',
    color: '#7c3aed',
    description: 'Elite creator. You shape the ecosystem.',
    perks: ['Everything in Pro', 'Ultra badge & animated profile', 'Early access to features', 'Direct support channel', 'Co-creation program invites', 'Registry homepage feature slot', 'Platform advisory board'],
    highlight: false,
  },
]

const faqs = [
  { q: 'Is everything really free?', a: 'Yes. AgentPack Hub is 100% free. No subscriptions, no hidden fees. You earn ranks and perks by building great packs that the community loves.' },
  { q: 'How do I earn stars?', a: 'When someone uses your pack and finds it valuable, they can star it. Each star on any of your published packs counts toward your total. Stars accumulate across all your packs.' },
  { q: 'Can I lose my rank?', a: 'No. Once you reach a rank, you keep it permanently. Stars are never removed — they represent lasting recognition from the community.' },
  { q: 'What are skill levels?', a: 'As you earn stars in specific categories (DevOps, Data, Security, etc.), you level up in those skills. Higher skill levels show your expertise in that domain.' },
  { q: 'How does the search boost work?', a: 'Pro and Ultra creators get a subtle boost in search rankings and discovery. Your packs appear slightly higher in results, helping more people find your work.' },
  { q: 'What is the co-creation program?', a: 'Ultra creators get invited to collaborate directly with the AgentPack Hub team on new platform features, experimental APIs, and flagship packs.' },
]

function Pricing() {
  const toast = useToast()

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-text mb-2">100% Free. Always.</h1>
        <p className="text-sm text-text-muted max-w-lg mx-auto">No plans. No subscriptions. Earn ranks and perks by building great packs that the community loves.</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            Free to import
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            Free to publish
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            Free forever
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {ranks.map((rank) => (
          <div key={rank.name} className={`rounded-lg p-5 border ${rank.highlight ? 'border-primary bg-primary-light/20 ring-1 ring-primary/20' : 'border-border'}`}>
            {rank.highlight && <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded mb-3 inline-block">Most popular goal</span>}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl" style={{ color: rank.color }}>{rank.icon}</span>
              <div>
                <h3 className="text-sm font-semibold text-text">{rank.name}</h3>
                <p className="text-[10px] text-text-muted">{rank.stars} stars</p>
              </div>
            </div>
            <p className="text-[11px] text-text-muted mb-4">{rank.description}</p>
            <ul className="space-y-1.5 mb-4">
              {rank.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-1.5 text-[11px] text-text-muted">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" className="shrink-0 mt-0.5"><path d="M20 6L9 17l-5-5"/></svg>
                  {perk}
                </li>
              ))}
            </ul>
            <Link
              to="/register"
              onClick={() => toast(`Starting as ${rank.name}? Just publish and earn stars!`, 'info')}
              className={`block w-full py-2 text-xs font-medium rounded-md text-center transition-colors ${rank.highlight ? 'bg-primary text-white hover:bg-primary-dark' : 'border border-border text-text hover:bg-gray-50'}`}
            >
              Get started free
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-primary-light/30 border border-primary/15 rounded-lg p-6 mb-12 text-center">
        <h2 className="text-sm font-bold text-text mb-2">How stars work</h2>
        <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-4">
          <div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a5c2e" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            </div>
            <h3 className="text-xs font-semibold text-text mb-1">Publish</h3>
            <p className="text-[10px] text-text-muted">Create and publish agent capabilities to the registry.</p>
          </div>
          <div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg>
            </div>
            <h3 className="text-xs font-semibold text-text mb-1">Earn stars</h3>
            <p className="text-[10px] text-text-muted">Community members star your packs when they find them useful.</p>
          </div>
          <div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a5c2e" strokeWidth="2"><path d="M12 2L15 8.5 22 9.5 17 14.5 18 21.5 12 18 6 21.5 7 14.5 2 9.5 9 8.5Z"/></svg>
            </div>
            <h3 className="text-xs font-semibold text-text mb-1">Rank up</h3>
            <p className="text-[10px] text-text-muted">Reach star thresholds to unlock new ranks and perks permanently.</p>
          </div>
        </div>
      </div>

      <div className="text-center mb-10">
        <p className="text-xs text-text-muted">Every rank is earned, never purchased. Your stars reflect real community recognition. <Link to="/docs?page=FAQ" className="text-primary font-medium hover:underline">Learn more →</Link></p>
      </div>

      <div className="border-t border-border pt-10">
        <h2 className="text-lg font-bold text-text mb-6 text-center">Frequently asked questions</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="border border-border rounded-lg p-4">
              <h4 className="text-xs font-semibold text-text mb-1">{faq.q}</h4>
              <p className="text-[11px] text-text-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pricing

// Info: Pricing displays currency tokens.
