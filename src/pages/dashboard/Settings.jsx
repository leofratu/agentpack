import { useState } from 'react'
import { useToast } from '../../components/Toast'

function Settings() {
  const toast = useToast()
  const [profile, setProfile] = useState({
    username: 'john_dev',
    email: 'john@example.com',
    bio: 'Full-stack developer building agent tools.',
    website: 'https://johndev.io',
  })
  const [notifications, setNotifications] = useState({
    stars: true,
    imports: true,
    reviews: true,
    updates: false,
    newsletter: false,
  })
  const [tokens, setTokens] = useState([
    { id: 1, name: 'CI/CD Pipeline', prefix: 'ap_...x4f2', created: '2 weeks ago', lastUsed: '1 day ago' },
    { id: 2, name: 'Local dev', prefix: 'ap_...k9m1', created: '1 month ago', lastUsed: '3 days ago' },
  ])

  const handleSaveProfile = (e) => {
    e.preventDefault()
    toast('Profile updated!')
  }

  const handleSaveNotifications = () => {
    toast('Notification preferences saved!')
  }

  const handleCreateToken = () => {
    const name = `Token ${tokens.length + 1}`
    setTokens([...tokens, { id: Date.now(), name, prefix: 'ap_...new', created: 'Just now', lastUsed: 'Never' }])
    toast('New API token created! Copy it now — you won\'t see it again.', 'info')
  }

  const handleRevokeToken = (id) => {
    setTokens(tokens.filter(t => t.id !== id))
    toast('Token revoked.', 'info')
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-bold text-text">Settings</h1>
        <p className="text-xs text-text-muted">Manage your profile, notifications, and API tokens.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="border border-border rounded-lg p-4">
          <h2 className="text-xs font-semibold text-text mb-3">Profile</h2>
          <form onSubmit={handleSaveProfile} className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-text block mb-1">Username</label>
                <input
                  type="text"
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:border-primary/40"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-text block mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:border-primary/40"
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-medium text-text block mb-1">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={2}
                className="w-full px-3 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:border-primary/40 resize-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-text block mb-1">Website</label>
              <input
                type="url"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-border rounded-md focus:outline-none focus:border-primary/40"
              />
            </div>
            <button type="submit" className="px-4 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary-dark transition-colors">
              Save profile
            </button>
          </form>
        </div>

        <div className="border border-border rounded-lg p-4">
          <h2 className="text-xs font-semibold text-text mb-3">Notifications</h2>
          <div className="space-y-2.5">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-xs text-text capitalize">{key === 'stars' ? 'When someone stars my pack' : key === 'imports' ? 'When my pack is imported' : key === 'reviews' ? 'New reviews on my packs' : key === 'updates' ? 'Platform updates & features' : 'Monthly newsletter'}</span>
                <button
                  onClick={() => setNotifications({ ...notifications, [key]: !value })}
                  className={`relative w-8 h-4.5 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow transition-transform ${value ? 'left-[14px]' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={handleSaveNotifications} className="mt-3 px-4 py-1.5 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary-dark transition-colors">
            Save preferences
          </button>
        </div>

        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-text">API Tokens</h2>
            <button onClick={handleCreateToken} className="px-2.5 py-1 text-[11px] bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
              + New token
            </button>
          </div>
          <div className="space-y-2">
            {tokens.map((token) => (
              <div key={token.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-md">
                <div>
                  <p className="text-xs font-medium text-text">{token.name}</p>
                  <p className="text-[10px] text-text-muted font-mono">{token.prefix} · Created {token.created} · Last used {token.lastUsed}</p>
                </div>
                <button onClick={() => handleRevokeToken(token.id)} className="px-2 py-1 text-[10px] text-red-500 border border-red-200 rounded hover:bg-red-50 transition-colors">
                  Revoke
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-red-200 rounded-lg p-4">
          <h2 className="text-xs font-semibold text-red-600 mb-2">Danger zone</h2>
          <p className="text-[11px] text-text-muted mb-3">Permanently delete your account and all published packs.</p>
          <button onClick={() => toast('Account deletion requires email confirmation. Check your inbox.', 'error')} className="px-4 py-1.5 text-xs text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors">
            Delete account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
