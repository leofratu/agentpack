import { Link } from 'react-router-dom'

function CTABanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="bg-primary-dark rounded-xl px-6 py-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white">
              Publish once. Import anywhere.
            </h2>
            <p className="text-white/60 text-xs md:text-sm">
              One click to share. One click for anyone to install.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Link to="/publish" className="px-4 py-2 bg-white text-primary text-xs font-semibold rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap">
            Publish your AgentPack
          </Link>
          <Link to="/docs" className="px-4 py-2 border border-white/25 text-white text-xs font-medium rounded-md hover:bg-white/10 transition-colors whitespace-nowrap">
            Learn how to create
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTABanner
