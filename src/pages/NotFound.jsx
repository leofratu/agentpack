import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-center">
      <div className="mb-6">
        <span className="text-5xl font-bold text-primary/20">404</span>
      </div>
      <h1 className="text-xl font-bold text-text mb-2">Page not found</h1>
      <p className="text-sm text-text-muted mb-6">The page you're looking for doesn't exist or has been moved.</p>
      <div className="flex items-center justify-center gap-3">
        <Link to="/" className="px-4 py-2 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary-dark transition-colors">
          Go home
        </Link>
        <Link to="/explore" className="px-4 py-2 text-xs border border-border rounded-md text-text hover:bg-gray-50 transition-colors">
          Browse packs
        </Link>
      </div>
    </div>
  )
}

export default NotFound
