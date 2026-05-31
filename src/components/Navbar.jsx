import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiShoppingCart, FiUser, FiSearch, FiHeart, FiMenu, FiX } from 'react-icons/fi'

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  // Later this will come from auth context
  const isLoggedIn = false
  const cartCount = 0
  const wishlistCount = 0

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`)
    }
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>

        {/* Logo */}
        <Link to="/" style={styles.logo}>
          Quick<span style={{ color: 'var(--gold)' }}>Cart</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchBtn}>
            <FiSearch size={18} />
          </button>
        </form>

        {/* Right Side Icons */}
        <div style={styles.rightSection}>

          {/* Wishlist */}
          <Link to="/wishlist" style={styles.iconBtn}>
            <FiHeart size={22} />
            {wishlistCount > 0 && <span style={styles.badge}>{wishlistCount}</span>}
          </Link>

          {/* Cart */}
          <Link to="/cart" style={styles.iconBtn}>
            <FiShoppingCart size={22} />
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </Link>

          {/* Auth */}
          {isLoggedIn ? (
            <div style={styles.userMenu}>
              <FiUser size={22} />
              <div style={styles.dropdown}>
                <Link to="/profile" style={styles.dropItem}>My Profile</Link>
                <Link to="/orders" style={styles.dropItem}>My Orders</Link>
                <Link to="/wishlist" style={styles.dropItem}>Wishlist</Link>
                <Link to="/history" style={styles.dropItem}>History</Link>
                <button style={{ ...styles.dropItem, background: 'none', width: '100%', textAlign: 'left', color: 'var(--danger)' }}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/login">
                <button style={styles.loginBtn}>Login</button>
              </Link>
              <Link to="/register">
                <button style={styles.registerBtn}>Register</button>
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            style={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ ...styles.searchInput, flex: 1 }}
            />
            <button type="submit" style={styles.searchBtn}><FiSearch size={18} /></button>
          </form>
          <Link to="/" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/products" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Products</Link>
          <Link to="/cart" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Cart</Link>
          <Link to="/login" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/register" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Register</Link>
        </div>
      )}
    </nav>
  )
}

const styles = {
  nav: {
    background: 'var(--dark)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  logo: {
    fontSize: '1.6rem',
    fontWeight: '800',
    color: 'var(--white)',
    letterSpacing: '-0.5px',
    flexShrink: 0,
  },
  searchForm: {
    flex: 1,
    display: 'flex',
    maxWidth: '500px',
  },
  searchInput: {
    flex: 1,
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '6px 0 0 6px',
    fontSize: '0.95rem',
    background: 'rgba(255,255,255,0.12)',
    color: 'var(--white)',
  },
  searchBtn: {
    padding: '0.5rem 0.9rem',
    background: 'var(--gold)',
    color: 'var(--dark)',
    borderRadius: '0 6px 6px 0',
    display: 'flex',
    alignItems: 'center',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginLeft: 'auto',
    flexShrink: 0,
  },
  iconBtn: {
    color: 'var(--white)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: 'var(--gold)',
    color: 'var(--dark)',
    fontSize: '0.65rem',
    fontWeight: '700',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userMenu: {
    position: 'relative',
    color: 'var(--white)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  dropdown: {
    display: 'none',
    position: 'absolute',
    top: '100%',
    right: 0,
    background: 'var(--white)',
    borderRadius: '8px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    minWidth: '160px',
    padding: '0.5rem 0',
    marginTop: '0.5rem',
  },
  dropItem: {
    display: 'block',
    padding: '0.6rem 1rem',
    color: 'var(--text-dark)',
    fontSize: '0.9rem',
    transition: 'background 0.15s',
  },
  loginBtn: {
    background: 'transparent',
    color: 'var(--white)',
    border: '1px solid rgba(255,255,255,0.4)',
    padding: '0.45rem 1rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  registerBtn: {
    background: 'var(--gold)',
    color: 'var(--dark)',
    padding: '0.45rem 1rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  menuToggle: {
    display: 'none',
    background: 'none',
    color: 'var(--white)',
    '@media (max-width: 768px)': { display: 'flex' },
  },
  mobileMenu: {
    background: 'var(--dark)',
    padding: '1rem 1.5rem',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  mobileLink: {
    display: 'block',
    color: 'var(--white)',
    padding: '0.6rem 0',
    fontSize: '1rem',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
}