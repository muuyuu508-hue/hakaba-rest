import { Outlet } from 'react-router-dom'

/** Full-bleed shell for the marketing home page (no shared app chrome). */
export default function LandingLayout() {
  return (
    <div className="landing-shell">
      <Outlet />
    </div>
  )
}
