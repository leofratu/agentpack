import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '../../components/Toast'

const initialNotifications = [
  { id: 1, type: 'star', title: 'sarah_dev starred your pack', message: '"GitHub Issue to PR" received a new star.', time: '2 hours ago', read: false, link: '/pack/github-issue-to-pr' },
  { id: 2, type: 'import', title: 'Your pack was imported', message: '"README Generator" was imported 8 times today.', time: '5 hours ago', read: false, link: '/pack/readme-generator' },
  { id: 3, type: 'review', title: 'New review received', message: 'mike_eng left a 5-star review on "Dockerfile Fixer".', time: '1 day ago', read: false, link: '/pack/dockerfile-fixer' },
  { id: 4, type: 'milestone', title: 'Milestone reached!', message: 'You hit 300 total imports across all packs.', time: '2 days ago', read: true, link: '/dashboard/analytics' },
  { id: 5, type: 'star', title: 'alex_ops starred your pack', message: '"Invoice PDF to CSV" received a new star.', time: '3 days ago', read: true, link: '/pack/invoice-pdf-to-csv' },
  { id: 6, type: 'rank', title: 'Rank unlocked: Pro', message: 'You reached 10 stars! Pro perks are now active.', time: '1 week ago', read: true, link: '/dashboard/rank' },
  { id: 7, type: 'update', title: 'Platform update', message: 'New analytics features are now available for Pro creators.', time: '2 weeks ago', read: true, link: '/dashboard/analytics' },
]

function Notifications() {
  const toast = useToast()
  const [notifications, setNotifications] = useState(initialNotifications)
  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
    toast('All notifications marked as read.', 'info')
  }

  const markRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const clearAll = () => {
    setNotifications([])
    toast('All notifications cleared.', 'info')
  }

  const getIcon = (type) => {
    switch (type) {
      case 'star': return <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg>
      case 'import': return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/></svg>
      case 'review': return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
      case 'milestone': return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
      case 'rank': return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1a5c2e" strokeWidth="2.5"><path d="M12 2L15 8.5 22 9.5 17 14.5 18 21.5 12 18 6 21.5 7 14.5 2 9.5 9 8.5Z"/></svg>
      default: return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
    }
  }

  const getBgColor = (type) => {
    switch (type) {
      case 'star': return 'bg-amber-50'
      case 'import': return 'bg-blue-50'
      case 'review': return 'bg-green-50'
      case 'milestone': return 'bg-purple-50'
      case 'rank': return 'bg-emerald-50'
      default: return 'bg-gray-50'
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold text-text">Notifications</h1>
          <p className="text-xs text-text-muted">{unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="px-3 py-1.5 text-xs border border-border rounded-md hover:bg-gray-50 transition-colors text-text">
              Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button onClick={clearAll} className="px-3 py-1.5 text-xs text-red-500 border border-red-200 rounded-md hover:bg-red-50 transition-colors">
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        {notifications.map((notif) => (
          <Link
            key={notif.id}
            to={notif.link}
            onClick={() => markRead(notif.id)}
            className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${notif.read ? 'hover:bg-gray-50' : 'bg-primary-light/20 hover:bg-primary-light/30'}`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${getBgColor(notif.type)}`}>
              {getIcon(notif.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className={`text-xs ${notif.read ? 'text-text' : 'text-text font-semibold'}`}>{notif.title}</h3>
                {!notif.read && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
              </div>
              <p className="text-[11px] text-text-muted mt-0.5">{notif.message}</p>
              <p className="text-[10px] text-text-muted mt-1">{notif.time}</p>
            </div>
          </Link>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-10 border border-border rounded-lg">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" className="mx-auto mb-2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <p className="text-xs text-text-muted">No notifications.</p>
        </div>
      )}
    </div>
  )
}

export default Notifications
