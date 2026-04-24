import { useMemo, useState } from 'react'
import { MENU_CATEGORIES, getItemsByCategory } from '../../data/menu'
import { formatCents } from '../../lib/money'
import { useCart } from '../../context/CartContext'

export default function MenuPage() {
  const [categoryId, setCategoryId] = useState(MENU_CATEGORIES[0].id)
  const { addToCart } = useCart()

  const items = useMemo(() => getItemsByCategory(categoryId), [categoryId])

  return (
    <section className="menu-page">
      <h2>Menu</h2>
      <p className="muted intro">Browse by category and add items to your cart.</p>

      <div className="category-tabs" role="tablist" aria-label="Menu categories">
        {MENU_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={categoryId === cat.id}
            className={categoryId === cat.id ? 'tab active' : 'tab'}
            onClick={() => setCategoryId(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <ul className="menu-grid">
        {items.map((item) => (
          <li key={item.id} className="menu-card">
            <div className="menu-card-image">
              <img
                src={item.imageSrc}
                alt=""
                width={640}
                height={400}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="menu-card-body">
              <h3>{item.name}</h3>
              <p className="muted menu-desc">{item.description}</p>
              <p className="menu-price">{formatCents(item.priceCents)}</p>
            </div>
            <button type="button" className="btn btn-primary" onClick={() => addToCart(item.id)}>
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
