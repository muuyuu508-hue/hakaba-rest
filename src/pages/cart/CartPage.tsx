import { Link } from 'react-router-dom'
import { getMenuItem } from '../../data/menu'
import { formatCents } from '../../lib/money'
import { useCart } from '../../context/CartContext'

export default function CartPage() {
  const { lines, subtotalCents, increment, decrement, removeLine } = useCart()

  if (lines.length === 0) {
    return (
      <section className="cart-page">
        <h2>Your cart</h2>
        <p className="muted">Your cart is empty.</p>
        <p>
          <Link to="/menu" className="text-link">
            Browse the menu
          </Link>
        </p>
      </section>
    )
  }

  return (
    <section className="cart-page">
      <h2>Your cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th scope="col" className="cart-thumb-col">
              <span className="sr-only">Photo</span>
            </th>
            <th scope="col">Item</th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
            <th scope="col">Subtotal</th>
            <th scope="col">
              <span className="sr-only">Remove</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {lines
            .filter((line) => getMenuItem(line.menuItemId))
            .map((line) => {
              const item = getMenuItem(line.menuItemId)!
              const lineTotal = item.priceCents * line.quantity
              return (
                <tr key={line.menuItemId}>
                  <td className="cart-thumb-cell">
                    <img
                      className="cart-line-thumb"
                      src={item.imageSrc}
                      alt=""
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{formatCents(item.priceCents)}</td>
                  <td>
                    <div className="qty-controls">
                      <button
                        type="button"
                        aria-label="Decrease"
                        onClick={() => decrement(line.menuItemId)}
                      >
                        −
                      </button>
                      <span>{line.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase"
                        onClick={() => increment(line.menuItemId)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{formatCents(lineTotal)}</td>
                  <td>
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => removeLine(line.menuItemId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
      <p className="cart-total">
        <strong>Total:</strong> {formatCents(subtotalCents)}
      </p>
      <div className="cart-actions">
        <Link to="/menu" className="text-link">
          Continue shopping
        </Link>
        <Link to="/checkout" className="btn btn-primary">
          Checkout
        </Link>
      </div>
    </section>
  )
}
