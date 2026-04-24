import { useState, type FormEvent } from 'react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="contact-page">
      <h2>Contact</h2>
      <p className="muted intro">
        Reach the restaurant by phone or visit us. Message form is a placeholder for now.
      </p>

      <div className="contact-grid">
        <div>
          <h3 className="confirmation-subheading">Location</h3>
          <p>123 Kitchen Street, Food District</p>
          <h3 className="confirmation-subheading">Phone</h3>
          <p>
            <a href="tel:+15551234567" className="text-link">
              (555) 123-4567
            </a>
          </p>
        </div>

        <form className="checkout-form contact-form" onSubmit={handleSubmit}>
          <h3 className="confirmation-subheading">Send a message</h3>
          <label>
            Name
            <input name="name" autoComplete="name" />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" />
          </label>
          <label>
            Message
            <textarea name="message" rows={4} />
          </label>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
          {sent ? <p className="muted">Thanks — content and delivery will be wired up later.</p> : null}
        </form>
      </div>
    </section>
  )
}
