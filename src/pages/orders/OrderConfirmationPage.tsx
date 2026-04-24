import { Link, useLocation } from 'react-router-dom'
import { formatCents } from '../../lib/money'
import type { OrderConfirmationState } from '../../types/order'

function formatPlacedAt(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

export default function OrderConfirmationPage() {
  const location = useLocation()
  const order = location.state as OrderConfirmationState | null

  if (!order?.orderId) {
    return (
      <section className="order-confirmation">
        <h2>Order</h2>
        <p className="muted">No order to show. Start from the menu or your cart.</p>
        <p>
          <Link to="/menu" className="text-link">
            View menu
          </Link>
        </p>
      </section>
    )
  }

  return (
    <section className="order-confirmation">
      <h2>Thank you!</h2>
      <p>Your order was placed successfully.</p>
      <p className="order-id">
        Order <strong>{order.orderId}</strong>
      </p>
      <p className="muted">Placed {formatPlacedAt(order.placedAt)}</p>

      <div className="confirmation-details">
        <p>
          <strong>{order.customerName}</strong> · {order.phone}
        </p>
        {order.address ? (
          <p>
            <strong>Address:</strong> {order.address}
          </p>
        ) : null}
        <p>
          <strong>Payment:</strong> {order.paymentMethod ?? '—'}
        </p>
        {order.deliveryNotes ? (
          <p className="notes">
            <strong>Notes:</strong> {order.deliveryNotes}
          </p>
        ) : null}
      </div>

      <h3 className="confirmation-subheading">Items</h3>
      <ul className="summary-list summary-list--with-thumbs">
        {order.lines.map((line) => (
          <li key={line.menuItem.id} className="summary-list-row">
            <img
              className="summary-thumb"
              src={line.menuItem.imageSrc}
              alt=""
              width={40}
              height={40}
              loading="lazy"
              decoding="async"
            />
            <span className="summary-line-label">
              {line.menuItem.name} × {line.quantity}
            </span>
            <span className="summary-line-price">{formatCents(line.lineTotalCents)}</span>
          </li>
        ))}
      </ul>
      <p className="summary-total">
        <strong>Total</strong> {formatCents(order.totalCents)}
      </p>

      <p>
        <Link to="/menu" className="btn btn-primary">
          Order again
        </Link>
      </p>
    </section>
  )
}
