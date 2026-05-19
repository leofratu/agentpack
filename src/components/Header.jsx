import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { api } from '../utils/api'

const navItems = [
  { label: 'Explore', to: '/explore' },
  { label: 'Categories', to: '/categories' },
  { label: 'Publish', to: '/publish' },
  { label: 'Docs', to: '/docs' },
]

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const [user, setUser] = useState(api.currentUser)

  useEffect(() => {
    setUser(api.currentUser)
  }, [location])

  const handleLogout = () => {
    api.logout()
    setUser(null)
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-semibold text-sm text-text">
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" className="text-primary">
              <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 14l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            AgentPack Hub
          </Link>
          <nav className="hidden md:flex items-center gap-5">
            {navItems.map((item) => (
              <Link key={item.label} to={item.to} className="text-xs text-text-muted hover:text-text transition-colors">{item.label}</Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2.5">
          {user ? (
            <>
              <span className="hidden lg:inline text-xs text-text-muted font-medium">Signed in as {user.name || user.email}</span>
              <Link to="/dashboard" className="px-3.5 py-1.5 text-xs font-medium text-text border border-border rounded-md hover:bg-gray-100 transition-colors">
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="px-3.5 py-1.5 text-xs font-medium text-red-500 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-medium text-text border border-border rounded-md hover:bg-gray-100 transition-colors">
                Sign in
              </Link>
              <Link to="/register" className="px-3.5 py-1.5 text-xs font-medium text-white bg-primary rounded-md hover:bg-primary-dark transition-colors">
                Register
              </Link>
            </>
          )}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-1 text-text-muted hover:text-text transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden border-b border-border bg-white/95 backdrop-blur-md px-6 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              to={item.to} 
              onClick={() => setIsOpen(false)}
              className="text-xs text-text-muted hover:text-text py-1 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-border-light">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2.5 text-xs font-medium text-text border border-border rounded-md hover:bg-gray-100 transition-colors"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-center py-2.5 text-xs font-medium text-red-500 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/signin" 
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2.5 text-xs font-medium text-text border border-border rounded-md hover:bg-gray-100 transition-colors"
                >
                  Sign in
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2.5 text-xs font-medium text-white bg-primary rounded-md hover:bg-primary-dark transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
