import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { Location } from 'react-router-dom'
import SiteCreditsFooter from '../../components/SiteCreditsFooter'
import { useAuth } from '../../context/AuthContext'

export default function AdminLoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from =
    (location.state as { from?: Location } | null)?.from?.pathname ?? '/admin/dashboard'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!username.trim() || !password.trim()) {
      setError('Enter username and password.')
      return
    }
    signIn()
    navigate(from, { replace: true })
  }

  return (
    <div className="app">
      <main>
      <section className="admin-login">
        <h2>Admin sign in</h2>
        <p className="muted intro">
          Placeholder authentication — any non-empty username and password continues. Real auth
          will be added later.
        </p>
        <form className="checkout-form admin-login-form" onSubmit={handleSubmit}>
          <label>
            Username
            <input
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error ? <p className="muted">{error}</p> : null}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </div>
        </form>
        <p>
          <Link to="/" className="text-link">
            Back to home
          </Link>
        </p>
      </section>
      </main>
      <SiteCreditsFooter />
    </div>
  )
}
