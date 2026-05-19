import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../components/Toast'
import { api } from '../utils/api'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      toast('Please fill in all fields.', 'error')
      return
    }
    if (password.length < 8) {
      toast('Password must be at least 8 characters.', 'error')
      return
    }

    setLoading(true)
    try {
      await api.register(email, password)
      toast('Account created! Welcome to AgentPack Hub.')
      setTimeout(() => navigate('/dashboard'), 500)
    } catch (err) {
      toast(err.message || 'Registration failed.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-16">
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold text-text mb-1">Create your account</h1>
        <p className="text-xs text-text-muted">Start importing and publishing AgentPacks in seconds.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-text mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            disabled={loading}
            className="w-full px-3 py-2 text-xs border border-border rounded-md focus:outline-none focus:border-primary/40 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-text mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading}
            className="w-full px-3 py-2 text-xs border border-border rounded-md focus:outline-none focus:border-primary/40 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-text mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 8 characters"
            disabled={loading}
            className="w-full px-3 py-2 text-xs border border-border rounded-md focus:outline-none focus:border-primary/40 transition-colors"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-2.5 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-text-muted">
          Already have an account?{' '}
          <Link to="/signin" className="text-primary font-medium hover:underline">Sign in</Link>
        </p>
      </div>

      <div className="mt-6 border-t border-border pt-6">
        <button
          onClick={() => { toast('GitHub OAuth — redirecting...', 'info'); setTimeout(() => { toast('Account created with GitHub!'); navigate('/dashboard') }, 1000) }}
          className="w-full flex items-center justify-center gap-2 py-2.5 border border-border rounded-md text-xs font-medium text-text hover:bg-gray-50 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          Continue with GitHub
        </button>
      </div>

      <p className="mt-4 text-center text-[10px] text-text-muted">
        By creating an account you agree to our <Link to="#" className="underline">Terms of Service</Link> and <Link to="#" className="underline">Privacy Policy</Link>.
      </p>
    </div>
  )
}

export default Register
