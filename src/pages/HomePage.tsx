import { useState } from 'react'
import { Link } from 'react-router-dom'
import SiteCreditsFooter from '../components/SiteCreditsFooter'
import './home-landing.css'

const U = {
  hero: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80',
  chef: 'https://images.unsplash.com/photo-1577219491135-ce391730fbce?w=800&auto=format&fit=crop&q=80',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&auto=format&fit=crop&q=80',
  orderSide: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&auto=format&fit=crop&q=80',
  popular: [
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504674900240-90387a21b88e?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1473093295043-cdd812d40373?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80',
  ],
  gallery: [
    'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1495474472287-4d71bcbb208d?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1482049016688-2d3ee081ea5f?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80',
  ],
} as const

type MenuCat = 'Breakfast' | 'Lunch' | 'Dinner' | 'Dessert'

const SPECIAL_MENU: Record<
  MenuCat,
  { image: string; items: { num: string; name: string; desc: string; price: string }[] }
> = {
  Breakfast: {
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop&q=80',
    items: [
      { num: '01', name: 'Sunrise platter', desc: 'Eggs, sourdough, greens, and citrus.', price: '$18.00' },
      { num: '02', name: 'Steel-cut oats', desc: 'Berries, honey, toasted seeds.', price: '$12.50' },
      { num: '03', name: 'Smoked salmon bagel', desc: 'Capers, cream cheese, dill.', price: '$16.00' },
      { num: '04', name: 'Shakshuka', desc: 'Tomato pepper stew, baked eggs.', price: '$15.00' },
    ],
  },
  Lunch: {
    image: U.pasta,
    items: [
      { num: '01', name: 'House pasta', desc: 'Slow tomato sauce, basil, parmesan.', price: '$22.00' },
      { num: '02', name: 'Grilled market fish', desc: 'Herb oil, charred lemon, fennel.', price: '$28.00' },
      { num: '03', name: 'Seasonal salad', desc: 'Bitter greens, citrus, vinaigrette.', price: '$14.00' },
      { num: '04', name: 'Beef skewers', desc: 'Yogurt marinade, pickles, flatbread.', price: '$24.00' },
    ],
  },
  Dinner: {
    image: 'https://images.unsplash.com/photo-1504674900240-90387a21b88e?w=800&auto=format&fit=crop&q=80',
    items: [
      { num: '01', name: 'Charred ribeye', desc: 'Smoked butter, roasted roots.', price: '$42.00' },
      { num: '02', name: 'Duck confit', desc: 'Cherry gastrique, chicory.', price: '$36.00' },
      { num: '03', name: 'Wild mushroom risotto', desc: 'Parmesan, truffle oil.', price: '$26.00' },
      { num: '04', name: 'Catch of the day', desc: 'Chef’s garnish, seasonal sides.', price: '$34.00' },
    ],
  },
  Dessert: {
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&auto=format&fit=crop&q=80',
    items: [
      { num: '01', name: 'Burnt Basque cheesecake', desc: 'Caramel edges, cream.', price: '$11.00' },
      { num: '02', name: 'Dark chocolate tart', desc: 'Sea salt, olive oil.', price: '$10.00' },
      { num: '03', name: 'Seasonal sorbet', desc: 'Two scoops, crisp tuile.', price: '$8.00' },
      { num: '04', name: 'Affogato', desc: 'Espresso over vanilla gelato.', price: '$9.00' },
    ],
  },
}

const POPULAR = [
  { price: '$34.55' },
  { price: '$28.00' },
  { price: '$31.20' },
  { price: '$24.90' },
  { price: '$19.50' },
  { price: '$36.75' },
]

function LogoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 3v8c0 1.1.9 2 2 2h1V3H6zm4 0v10h2V3h-2zm4 0v6h2V3h-2zm4 0v4h2V3h-2z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M4 20h16v2H4v-2z" fill="currentColor" />
    </svg>
  )
}

function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuTab, setMenuTab] = useState<MenuCat>('Breakfast')

  const closeMobile = () => setMobileOpen(false)
  const special = SPECIAL_MENU[menuTab]
  const categories: MenuCat[] = ['Breakfast', 'Lunch', 'Dinner', 'Dessert']

  return (
    <div className="landing-page" id="top">
      <header className="land-header">
        <Link to="/" className="land-logo" onClick={closeMobile}>
          <LogoIcon />
          <span className="land-logo-text">Hakaba Kitchen</span>
        </Link>

        <nav>
          <ul className="land-nav-desktop">
            <li>
              <a href="#top">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <a href="#popular">Popular</a>
            </li>
            <li>
              <a href="#gallery">Gallery</a>
            </li>
            <li>
              <a href="#order">Order</a>
            </li>
          </ul>
        </nav>

        <div className="land-header-actions">
          <Link to="/cart" className="land-cart-link">
            Cart
          </Link>
          <Link to="/contact" className="land-btn-contact">
            Contact
          </Link>
          <button
            type="button"
            className="land-menu-toggle"
            aria-expanded={mobileOpen}
            aria-controls="land-mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <ul id="land-mobile-nav" className={`land-nav-mobile${mobileOpen ? ' is-open' : ''}`}>
        <li>
          <a href="#top" onClick={closeMobile}>
            Home
          </a>
        </li>
        <li>
          <a href="#about" onClick={closeMobile}>
            About
          </a>
        </li>
        <li>
          <Link to="/menu" onClick={closeMobile}>
            Menu
          </Link>
        </li>
        <li>
          <a href="#popular" onClick={closeMobile}>
            Popular
          </a>
        </li>
        <li>
          <a href="#gallery" onClick={closeMobile}>
            Gallery
          </a>
        </li>
        <li>
          <a href="#order" onClick={closeMobile}>
            Order
          </a>
        </li>
        <li>
          <Link to="/contact" onClick={closeMobile}>
            Contact
          </Link>
        </li>
        <li>
          <Link to="/cart" onClick={closeMobile}>
            Cart
          </Link>
        </li>
      </ul>

      <section className="land-hero" aria-label="Hero">
        <div className="land-hero-inner">
          <div>
            <p className="land-hero-kicker">Best dishes &amp; ingredients</p>
            <h1>
              Always delivering an <span className="land-accent">Amazing</span> experience
            </h1>
            <p className="land-hero-lead">
              Thoughtful plates, warm service, and flavors that feel familiar yet new. Browse the
              menu, explore chef picks, and order when you are ready — we will handle the rest.
            </p>
            <div className="land-hero-actions">
              <Link to="/menu" className="land-btn-primary">
                Order now
              </Link>
              <a href="#about" className="land-btn-ghost">
                Learn more
              </a>
            </div>
          </div>
          <div className="land-hero-visual">
            <img src={U.hero} alt="Grilled steak on a wooden board" width={480} height={360} />
          </div>
        </div>
      </section>

      <section className="land-section land-about" id="about" aria-labelledby="about-heading">
        <div className="land-about-grid">
          <div className="land-about-visual">
            <img src={U.chef} alt="Chef in the kitchen" width={560} height={640} loading="lazy" />
          </div>
          <div>
            <p className="land-label">About us</p>
            <h2 id="about-heading">Crafted with care, served with pride</h2>
            <p>
              Hakaba Kitchen brings together seasonal produce, classic technique, and a welcoming
              room for every occasion. Our team trains daily on consistency so every plate arrives
              as intended.
            </p>
            <p>
              From morning pastries to late dinner service, we focus on balance — acid, heat,
              texture, and aroma — so the meal stays memorable long after the last bite.
            </p>
            <a href="#special-menu" className="land-btn-primary">
              Learn more
            </a>
          </div>
        </div>
      </section>

      <section
        className="land-section land-special"
        id="special-menu"
        aria-labelledby="special-heading"
      >
        <h2 className="land-section-title" id="special-heading">
          Our special menu
        </h2>
        <div className="land-tabs" role="tablist" aria-label="Menu time of day">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={menuTab === cat}
              className={`land-tab${menuTab === cat ? ' is-active' : ''}`}
              onClick={() => setMenuTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="land-special-card">
          <div className="land-special-media">
            <img src={special.image} alt="" width={450} height={320} loading="lazy" />
          </div>
          <div className="land-special-list">
            <h3>Special menu — {menuTab}</h3>
            {special.items.map((row) => (
              <div key={row.num} className="land-menu-row">
                <span className="land-menu-num">{row.num}</span>
                <div>
                  <h4>{row.name}</h4>
                  <p>{row.desc}</p>
                </div>
                <span className="land-menu-price">{row.price}</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '1.75rem' }}>
          <Link to="/menu" className="land-btn-primary">
            View full menu
          </Link>
        </p>
      </section>

      <section className="land-section land-popular" id="popular" aria-labelledby="popular-heading">
        <h2 className="land-section-title" id="popular-heading">
          Most <span className="land-accent">popular</span> foods
        </h2>
        <div className="land-card-grid">
          {POPULAR.map((item, i) => (
            <article key={`popular-${i}`} className="land-food-card">
              <img src={U.popular[i]} alt="" width={400} height={400} loading="lazy" />
              <h3>Delicious food</h3>
              <p className="land-stars" aria-label="5 out of 5 stars">
                ★★★★★
              </p>
              <p className="price">{item.price}</p>
              <Link to="/menu" className="land-btn-primary">
                Add to cart
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="land-section land-gallery" id="gallery" aria-labelledby="gallery-heading">
        <h2 className="land-section-title" id="gallery-heading">
          Our food <span className="land-accent">gallery</span>
        </h2>
        <div className="land-gallery-grid">
          {U.gallery.map((src) => (
            <img key={src} src={src} alt="" width={400} height={400} loading="lazy" />
          ))}
        </div>
      </section>

      <section className="land-section land-order" id="order" aria-labelledby="order-heading">
        <h2 className="land-section-title" id="order-heading">
          Make an <span className="land-accent">order</span>
        </h2>
        <div className="land-order-grid">
          <div className="land-order-form">
            <label>
              Name
              <input name="name" autoComplete="name" placeholder="Your name" />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" placeholder="you@example.com" />
            </label>
            <label>
              Phone
              <input name="phone" type="tel" autoComplete="tel" placeholder="(555) 000-0000" />
            </label>
            <label>
              Guests
              <input name="guests" inputMode="numeric" placeholder="2" />
            </label>
            <label>
              Address
              <input name="address" autoComplete="street-address" placeholder="Delivery address" />
            </label>
            <Link to="/menu" className="land-btn-primary" style={{ marginTop: '0.35rem' }}>
              Order now
            </Link>
            <p className="land-label" style={{ fontWeight: 500, color: 'var(--land-muted)' }}>
              For checkout with your cart, use the full menu.
            </p>
          </div>
          <div className="land-order-visual">
            <img src={U.orderSide} alt="Table set with food and drinks" loading="lazy" />
          </div>
        </div>
      </section>

      <footer className="land-footer">
        <div className="land-footer-inner">
          <div className="land-footer-contact">
            <div className="land-footer-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
                  fill="currentColor"
                />
              </svg>
              <span>123 Kitchen Street, Food District</span>
            </div>
            <div className="land-footer-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                  fill="currentColor"
                />
              </svg>
              <span>hello@hakabakitchen.example</span>
            </div>
            <div className="land-footer-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                  fill="currentColor"
                />
              </svg>
              <span>(555) 123-4567</span>
            </div>
          </div>
          <div className="land-footer-bar">
            <span>Hakaba Kitchen © {new Date().getFullYear()}</span>
            <div className="land-social" aria-label="Social links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer noopener" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17" cy="7" r="1.5" fill="currentColor" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer noopener" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer noopener" aria-label="X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
          <p style={{ margin: '1rem 0 0', fontSize: '0.8rem', opacity: 0.55 }}>
            <Link to="/admin/login">Admin</Link>
          </p>
          <SiteCreditsFooter />
        </div>
      </footer>
    </div>
  )
}

export default HomePage
