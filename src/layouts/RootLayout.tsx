import { NavLink, Outlet } from 'react-router-dom'
import SiteCreditsFooter from '../components/SiteCreditsFooter'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function RootLayout() {
  const { isAuthenticated, signOut } = useAuth()
  const { itemCount } = useCart()

  return (
    <div className="app">
      <header>
        <p className="brand-tagline">Online ordering</p>
        <h1>Hakaba Kitchen</h1>
        <nav className="main-nav" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => (isActive ? 'active' : '')}>
            Menu
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
            Contact
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')}>
            Cart{itemCount > 0 ? ` (${itemCount})` : ''}
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Admin
              </NavLink>
              <button type="button" className="link-button" onClick={signOut}>
                Admin sign out
              </button>
            </>
          ) : (
            <NavLink
              to="/admin/login"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Admin
            </NavLink>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
      <SiteCreditsFooter />
    </div>
  )
}
