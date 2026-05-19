import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useToast } from '../components/Toast'

const profiles = {
  'john_dev': { username: 'john_dev', bio: 'Full-stack developer building agent tools.', rank: 'Pro', stars: 47, packs: 6, imports: 312, joined: 'Jan 2025', website: 'https://johndev.io', skills: [{ name: 'DevOps', level: 4 }, { name: 'Data', level: 3 }, { name: 'Documentation', level: 2 }] },
  'sarah_dev': { username: 'sarah_dev', bio: 'AI researcher and open-source enthusiast.', rank: 'Ultra', stars: 1243, packs: 14, imports: 8420, joined: 'Nov 2024', website: '', skills: [{ name: 'AI/ML', level: 5 }, { name: 'Data', level: 5 }, { name: 'Backend', level: 4 }] },
  'sectools': { username: 'sectools', bio: 'Security-focused development team.', rank: 'Pro', stars: 89, packs: 8, imports: 1560, joined: 'Dec 2024', website: '', skills: [{ name: 'Security', level: 5 }, { name: 'DevOps', level: 3 }] },
  'data-tools': { username: 'data-tools', bio: 'Building tools for data pipelines.', rank: 'Contributor', stars: 7, packs: 3, imports: 240, joined: 'Mar 2025', website: '', skills: [{ name: 'Data', level: 4 }, { name: 'Automation', level: 2 }] },
}

const rankColors = { Newcomer: '#9ca3af', Contributor: '#3b82f6', Pro: '#1a5c2e', Ultra: '#7c3aed' }
const rankIcons = { Newcomer: '○', Contributor: '◆', Pro: '★', Ultra: '✦' }

const userPacks = [
  { name: 'GitHub Issue to PR', slug: 'github-issue-to-pr', stars: 18, imports: 96, description: 'Convert issues into PRs with auto context.' },
  { name: 'Invoice PDF to CSV', slug: 'invoice-pdf-to-csv', stars: 14, imports: 97, description: 'Extract invoice data from PDFs to clean CSV.' },
  { name: 'README Generator', slug: 'readme-generator', stars: 9, imports: 93, description: 'Create beautiful READMEs from any repo.' },
]

function Profile() {
  const { username } = useParams()
  const toast = useToast()
  const [following, setFollowing] = useState(false)
  const profile = profiles[username]

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-xl font-bold text-text mb-2">User not found</h1>
        <p className="text-sm text-text-muted mb-4">This profile doesn't exist.</p>
        <Link to="/leaderboard" className="text-xs text-primary font-medium hover:underline">← View leaderboard</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="border border-border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold">
                {profile.username[0].toUpperCase()}
              </div>
              <div>
                <h1 className="text-sm font-bold text-text">{profile.username}</h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span style={{ color: rankColors[profile.rank] }}>{rankIcons[profile.rank]}</span>
                  <span className="text-[11px] font-medium" style={{ color: rankColors[profile.rank] }}>{profile.rank}</span>
                  <span className="text-[10px] text-text-muted">· {profile.stars} stars</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-text-muted mb-4">{profile.bio}</p>

            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => { setFollowing(!following); toast(following ? 'Unfollowed.' : `Following ${profile.username}!`, 'info') }}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${following ? 'border border-primary text-primary bg-primary/5' : 'bg-primary text-white hover:bg-primary-dark'}`}
              >
                {following ? 'Following' : 'Follow'}
              </button>
              <button
                onClick={() => { navigator.clipboard.writeText(`https://agentpackhub.com/user/${username}`); toast('Profile link copied!', 'info') }}
                className="px-3 py-1.5 text-xs border border-border rounded-md hover:bg-gray-50 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
            </div>

            <div className="space-y-2 pt-3 border-t border-border">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted">Published packs</span>
                <span className="font-medium text-text">{profile.packs}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted">Total imports</span>
                <span className="font-medium text-text">{profile.imports.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted">Joined</span>
                <span className="font-medium text-text">{profile.joined}</span>
              </div>
              {profile.website && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">Website</span>
                  <span className="font-medium text-primary">{profile.website.replace('https://', '')}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-border">
              <h3 className="text-[11px] font-semibold text-text mb-2">Skills</h3>
              <div className="space-y-2">
                {profile.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] text-text">{skill.name}</span>
                      <span className="text-[9px] text-text-muted">Lv.{skill.level}/5</span>
                    </div>
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${(skill.level / 5) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-text mb-3">Published AgentPacks</h2>
          <div className="space-y-2">
            {userPacks.map((pack) => (
              <Link key={pack.slug} to={`/pack/${pack.slug}`} className="block border border-border rounded-lg p-3 hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-text">{pack.name}</h3>
                    <p className="text-[11px] text-text-muted mt-0.5">{pack.description}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <div className="flex items-center gap-0.5 text-[10px] text-text-muted">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg>
                      {pack.stars}
                    </div>
                    <p className="text-[10px] text-text-muted">{pack.imports} imports</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
