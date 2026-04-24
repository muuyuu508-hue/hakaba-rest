import { Link, NavLink, Outlet } from 'react-router-dom'
import SiteCreditsFooter from '../components/SiteCreditsFooter'
import { useAuth } from '../context/AuthContext'

export default function AdminLayout() {
  const { signOut } = useAuth()

  return (
    <div className="app admin-app">
      <header>
        <p className="brand-tagline">Admin</p>
        <h1>Hakaba Kitchen</h1>
        <nav className="subnav" aria-label="Admin sections">
          <NavLink to="/admin/dashboard" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/menu" className={({ isActive }) => (isActive ? 'active' : '')}>
            Menu management
          </NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? 'active' : '')}>
            Orders
          </NavLink>
          <Link to="/" className="text-link">
            View site
          </Link>
          <button type="button" className="link-button" onClick={signOut}>
            Sign out
          </button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <SiteCreditsFooter />
    </div>
  )
}
