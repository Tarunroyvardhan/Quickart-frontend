import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiClock, FiShield, FiTruck } from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import { mockCategories, mockProducts } from '../services/mockData'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`)
    }
  }

  return (
    <div>

      {/* ── Hero Section ── */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.heroTag}>⚡ 15–30 Minute Delivery</p>
          <h1 style={styles.heroTitle}>
            Groceries at your door,<br />
            <span style={{ color: 'var(--gold)' }}>faster than ever.</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Fresh produce, dairy, snacks and daily essentials — delivered in minutes.
          </p>
          <form onSubmit={handleSearch} style={styles.heroSearch}>
            <input
              type="text"
              placeholder="Search for milk, bread, eggs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={styles.heroInput}
            />
            <button type="submit" style={styles.heroSearchBtn}>
              <FiSearch size={20} />
              <span>Search</span>
            </button>
          </form>
        </div>
      </section>

      {/* ── Categories ── */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Shop by Category</h2>
            <Link to="/products" style={styles.viewAll}>View All →</Link>
          </div>
          <div style={styles.categoriesGrid}>
            {mockCategories.map(cat => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                style={styles.categoryCard}
              >
                <span style={styles.categoryIcon}>{cat.icon}</span>
                <span style={styles.categoryName}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section style={{ ...styles.section, background: 'var(--light-gray)' }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Featured Products</h2>
            <Link to="/products" style={styles.viewAll}>See All →</Link>
          </div>
          <div style={styles.productsGrid}>
            {mockProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why QuickCart ── */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={{ ...styles.sectionTitle, textAlign: 'center', marginBottom: '2.5rem' }}>
            Why QuickCart?
          </h2>
          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}><FiClock size={32} color="var(--gold)" /></div>
              <h3 style={styles.featureTitle}>15–30 Min Delivery</h3>
              <p style={styles.featureText}>
                We partner with local stores to get your essentials to you faster than anyone else.
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}><FiShield size={32} color="var(--gold)" /></div>
              <h3 style={styles.featureTitle}>Fresh & Quality Guaranteed</h3>
              <p style={styles.featureText}>
                Every product is quality-checked before dispatch. Not satisfied? Full refund guaranteed.
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}><FiTruck size={32} color="var(--gold)" /></div>
              <h3 style={styles.featureTitle}>Live Order Tracking</h3>
              <p style={styles.featureText}>
                Track your order in real time from our store to your doorstep — every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, var(--dark) 0%, var(--mid) 100%)',
    padding: '5rem 1.5rem',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '700px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.2rem',
  },
  heroTag: {
    background: 'rgba(200,169,110,0.2)',
    color: 'var(--gold)',
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600',
    border: '1px solid rgba(200,169,110,0.3)',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    color: 'var(--white)',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.7)',
    maxWidth: '500px',
  },
  heroSearch: {
    display: 'flex',
    width: '100%',
    maxWidth: '520px',
    marginTop: '0.5rem',
  },
  heroInput: {
    flex: 1,
    padding: '0.85rem 1.2rem',
    border: 'none',
    borderRadius: '8px 0 0 8px',
    fontSize: '1rem',
    background: 'rgba(255,255,255,0.95)',
    color: 'var(--text-dark)',
  },
  heroSearchBtn: {
    background: 'var(--gold)',
    color: 'var(--dark)',
    border: 'none',
    padding: '0 1.5rem',
    borderRadius: '0 8px 8px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  section: {
    padding: '4rem 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.8rem',
  },
  sectionTitle: {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: 'var(--dark)',
  },
  viewAll: {
    color: 'var(--mid)',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gap: '1rem',
  },
  categoryCard: {
    background: 'var(--white)',
    borderRadius: '10px',
    padding: '1.2rem 0.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.6rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  categoryIcon: {
    fontSize: '2rem',
  },
  categoryName: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--text-dark)',
    textAlign: 'center',
    lineHeight: '1.3',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
  },
  featureCard: {
    background: 'var(--white)',
    borderRadius: '12px',
    padding: '2rem',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  featureIcon: {
    background: 'rgba(200,169,110,0.12)',
    borderRadius: '50%',
    width: '70px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: 'var(--dark)',
  },
  featureText: {
    fontSize: '0.9rem',
    color: 'var(--text-mid)',
    lineHeight: '1.6',
  },
}