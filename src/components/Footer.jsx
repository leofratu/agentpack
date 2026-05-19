import { Link } from 'react-router-dom'

const footerLinks = {
  Product: [
    { label: 'Explore', to: '/explore' },
    { label: 'Categories', to: '/categories' },
    { label: 'Ranks', to: '/pricing' },
    { label: 'Changelog', to: '/docs?page=Versioning' },
    { label: 'Status', to: '/docs?page=Troubleshooting' },
  ],
  Developers: [
    { label: 'API', to: '/docs?page=REST+API' },
    { label: 'AgentPack Bridge', to: '/docs?page=How+It+Works' },
    { label: 'CLI', to: '/docs?page=CLI+Commands' },
    { label: 'SDKs', to: '/docs?page=SDKs' },
    { label: 'Webhooks', to: '/docs?page=Webhooks' },
  ],
  Creators: [
    { label: 'Publish', to: '/publish' },
    { label: 'Creator Guide', to: '/docs?page=Your+First+AgentPack' },
    { label: 'Best Practices', to: '/docs?page=Testing+Locally' },
    { label: 'Monetization', to: '/docs?page=FAQ' },
    { label: 'Payouts', to: '/docs?page=FAQ' },
  ],
  Docs: [
    { label: 'Documentation', to: '/docs' },
    { label: 'Examples', to: '/docs?page=Examples' },
    { label: 'MCP Guide', to: '/docs?page=MCP+Integration' },
    { label: 'Migration', to: '/docs?page=Migration+Guide' },
    { label: 'Help Center', to: '/docs?page=Troubleshooting' },
  ],
  Security: [
    { label: 'Security Model', to: '/docs?page=Security+%26+Sandboxing' },
    { label: 'Sandboxing', to: '/docs?page=Security+%26+Sandboxing' },
    { label: 'Trust & Scores', to: '/docs?page=Security+%26+Sandboxing' },
    { label: 'Bug Bounty', to: '/docs?page=Security+%26+Sandboxing' },
    { label: 'Vulnerability Policy', to: '/docs?page=Security+%26+Sandboxing' },
  ],
  Community: [
    { label: 'Leaderboard', to: '/leaderboard' },
    { label: 'Discord', to: '/docs?page=FAQ' },
    { label: 'GitHub', to: '/docs?page=FAQ' },
    { label: 'X (Twitter)', to: '/docs?page=FAQ' },
    { label: 'Blog', to: '/docs?page=FAQ' },
  ],
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-1.5 font-semibold text-xs text-text mb-2">
              <svg width="18" height="18" viewBox="0 0 28 28" fill="none" className="text-primary">
                <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 14l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              AgentPack Hub
            </Link>
            <p className="text-[11px] text-text-muted leading-relaxed">
              The Registry for portable agent capabilities. Import. Use. Ship.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-medium text-xs text-text mb-2.5">{category}</h4>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-[11px] text-text-muted hover:text-text transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t border-border gap-3">
          <p className="text-[11px] text-text-muted">&copy; 2026 AgentPack Hub</p>
          <div className="flex items-center gap-3">
            <a href="#" className="text-text-muted hover:text-text transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="#" className="text-text-muted hover:text-text transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.12-.098.246-.198.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.094.246.194.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
            </a>
            <span className="text-border">|</span>
            <a href="#" className="text-[11px] text-text-muted hover:text-text transition-colors">Terms</a>
            <a href="#" className="text-[11px] text-text-muted hover:text-text transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
