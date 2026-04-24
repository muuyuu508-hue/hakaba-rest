export default function AdminDashboardPage() {
  return (
    <section className="nested-section">
      <h2>Dashboard</h2>
      <p className="muted intro">Overview placeholders — metrics will connect to real data later.</p>
      <dl className="admin-stats">
        <div>
          <dt>Total orders</dt>
          <dd>—</dd>
        </div>
        <div>
          <dt>Pending</dt>
          <dd>—</dd>
        </div>
        <div>
          <dt>Completed</dt>
          <dd>—</dd>
        </div>
      </dl>
    </section>
  )
}
