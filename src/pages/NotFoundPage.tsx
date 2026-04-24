import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section>
      <h2>Page not found</h2>
      <p className="muted">The page you requested does not exist.</p>
      <p>
        <Link to="/" className="btn btn-primary">
          Home
        </Link>
      </p>
    </section>
  )
}

export default NotFoundPage
