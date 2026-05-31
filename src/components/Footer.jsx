import { Link } from 'react-router-dom'
import { FiInstagram, FiTwitter, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>

        {/* Column 1 — Brand */}
        <div style={styles.column}>
          <h2 style={styles.logo}>
            Quick<span style={{ color: 'var(--gold)' }}>Cart</span>
          </h2>
          <p style={styles.tagline}>
            Groceries and daily essentials delivered to your door in 15–30 minutes.
          </p>
          <div style={styles.socials}>
            <a href="#" style={styles.socialIcon}><FiInstagram size={20} /></a>
            <a href="#" style={styles.socialIcon}><FiTwitter size={20} /></a>
            <a href="#" style={styles.socialIcon}><FiFacebook size={20} /></a>
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div style={styles.column}>
          <h3 style={styles.colTitle}>Quick Links</h3>
          <div style={styles.linkList}>
            <Link to="/" style={styles.footerLink}>Home</Link>
            <Link to="/products" style={styles.footerLink}>Products</Link>
            <Link to="/cart" style={styles.footerLink}>My Cart</Link>
            <Link to="/orders" style={styles.footerLink}>My Orders</Link>
            <Link to="/about" style={styles.footerLink}>About Us</Link>
            <Link to="/contact" style={styles.footerLink}>Contact Us</Link>
          </div>
        </div>

        {/* Column 3 — Contact */}
        <div style={styles.column}>
          <h3 style={styles.colTitle}>Contact Us</h3>
          <div style={styles.contactList}>
            <div style={styles.contactItem}>
              <FiMail size={16} color="var(--gold)" />
              <span>support@quickcart.com</span>
            </div>
            <div style={styles.contactItem}>
              <FiPhone size={16} color="var(--gold)" />
              <span>+1 (800) 123-4567</span>
            </div>
            <div style={styles.contactItem}>
              <FiMapPin size={16} color="var(--gold)" />
              <span>Windsor, Ontario, Canada</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        <p style={styles.copyright}>
          © 2026 QuickCart. All rights reserved. | COMP-8347 Project
        </p>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: 'var(--dark)',
    color: 'var(--white)',
    marginTop: '4rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '3rem 1.5rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '3rem',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: 'var(--white)',
  },
  tagline: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.6)',
    lineHeight: '1.6',
  },
  socials: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
  },
  socialIcon: {
    color: 'rgba(255,255,255,0.6)',
    transition: 'color 0.2s',
  },
  colTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--gold)',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  linkList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  footerLink: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: '0.9rem',
    transition: 'color 0.2s',
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    color: 'rgba(255,255,255,0.65)',
    fontSize: '0.9rem',
  },
  bottomBar: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    padding: '1rem 1.5rem',
    textAlign: 'center',
  },
  copyright: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '0.85rem',
  },
}