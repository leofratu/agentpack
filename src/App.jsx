import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './components/Toast'
import Layout from './components/Layout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Categories from './pages/Categories'
import Publish from './pages/Publish'
import Docs from './pages/Docs'
import Pricing from './pages/Pricing'
import PackDetail from './pages/PackDetail'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'
import NotFound from './pages/NotFound'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import Overview from './pages/dashboard/Overview'
import MyPacks from './pages/dashboard/MyPacks'
import Imported from './pages/dashboard/Imported'
import PublishNew from './pages/dashboard/PublishNew'
import Analytics from './pages/dashboard/Analytics'
import Rank from './pages/dashboard/Rank'
import Settings from './pages/dashboard/Settings'
import Bookmarks from './pages/dashboard/Bookmarks'
import Notifications from './pages/dashboard/Notifications'

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/publish" element={<Publish />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/pack/:slug" element={<PackDetail />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/:username" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="packs" element={<MyPacks />} />
              <Route path="imported" element={<Imported />} />
              <Route path="publish" element={<PublishNew />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="rank" element={<Rank />} />
              <Route path="bookmarks" element={<Bookmarks />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
