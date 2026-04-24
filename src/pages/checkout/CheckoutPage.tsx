import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getMenuItem } from '../../data/menu'
import { formatCents } from '../../lib/money'
import { useCart } from '../../context/CartContext'
import type { OrderConfirmationState, PlacedOrderLine } from '../../types/order'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { lines, subtotalCents, clearCart } = useCart()
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [deliveryNotes, setDeliveryNotes] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')

  if (lines.length === 0) {
    return <Navigate to="/cart" replace />
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const name = customerName.trim()
    if (!name || !phone.trim() || !address.trim()) return

    const paymentLabels: Record<string, string> = {
      cash: 'Cash on delivery',
      card: 'Card (placeholder)',
    }

    const placedLines: PlacedOrderLine[] = []
    for (const line of lines) {
      const menuItem = getMenuItem(line.menuItemId)
      if (!menuItem) continue
      placedLines.push({
        menuItem,
        quantity: line.quantity,
        lineTotalCents: menuItem.priceCents * line.quantity,
      })
    }

    const state: OrderConfirmationState = {
      orderId: `ORD-${Date.now()}`,
      placedAt: new Date().toISOString(),
      customerName: name,
      phone: phone.trim(),
      address: address.trim(),
      deliveryNotes: deliveryNotes.trim(),
      paymentMethod: paymentLabels[paymentMethod] ?? paymentMethod,
      lines: placedLines,
      totalCents: subtotalCents,
    }

    clearCart()
    navigate('/order/confirmation', { replace: true, state })
  }

  return (
    <section className="checkout-page">
      <h2>Checkout</h2>
      <p className="muted intro">Customer details and payment choice (placeholder — no real charge).</p>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              name="customerName"
              autoComplete="name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </label>
          <label>
            Phone
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <label>
            Address
            <input
              name="address"
              autoComplete="street-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <label>
            Delivery notes
            <textarea
              name="deliveryNotes"
              rows={3}
              value={deliveryNotes}
              onChange={(e) => setDeliveryNotes(e.target.value)}
              placeholder="Apartment, gate code, allergies…"
            />
          </label>
          <label>
            Payment method
            <select
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="cash">Cash on delivery</option>
              <option value="card">Card (integration placeholder)</option>
            </select>
          </label>
          <div className="form-actions">
            <Link to="/cart" className="text-link">
              Back to cart
            </Link>
            <button type="submit" className="btn btn-primary">
              Place order
            </button>
          </div>
        </form>

        <aside className="checkout-summary" aria-labelledby="summary-heading">
          <h3 id="summary-heading">Order summary</h3>
          <ul className="summary-list summary-list--with-thumbs">
            {lines
              .filter((line) => getMenuItem(line.menuItemId))
              .map((line) => {
                const item = getMenuItem(line.menuItemId)!
                return (
                  <li key={line.menuItemId} className="summary-list-row">
                    <img
                      className="summary-thumb"
                      src={item.imageSrc}
                      alt=""
                      width={40}
                      height={40}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="summary-line-label">
                      {item.name} × {line.quantity}
                    </span>
                    <span className="summary-line-price">
                      {formatCents(item.priceCents * line.quantity)}
                    </span>
                  </li>
                )
              })}
          </ul>
          <p className="summary-total">
            <strong>Total</strong> {formatCents(subtotalCents)}
          </p>
        </aside>
      </div>
    </section>
  )
}
