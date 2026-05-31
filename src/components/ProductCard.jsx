import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi'

export default function ProductCard({ product }) {
  return (
    <div style={styles.card}>

      {/* Image */}
      <Link to={`/products/${product.id}`}>
        <div style={styles.imageBox}>
          <img
            src={product.image}
            alt={product.name}
            style={styles.image}
          />
          {product.stock === 0 && (
            <div style={styles.outOfStock}>Out of Stock</div>
          )}
        </div>
      </Link>

      {/* Wishlist button */}
      <button style={styles.wishlistBtn}>
        <FiHeart size={18} />
      </button>

      {/* Info */}
      <div style={styles.info}>
        <p style={styles.category}>{product.category}</p>
        <Link to={`/products/${product.id}`}>
          <h3 style={styles.name}>{product.name}</h3>
        </Link>

        {/* Rating */}
        <div style={styles.ratingRow}>
          <FiStar size={14} fill="var(--gold)" color="var(--gold)" />
          <span style={styles.rating}>{product.rating}</span>
          <span style={styles.reviews}>({product.reviews} reviews)</span>
        </div>

        {/* Price + Cart */}
        <div style={styles.bottomRow}>
          <span style={styles.price}>${product.price}</span>
          <button
            style={product.stock > 0 ? styles.cartBtn : styles.cartBtnDisabled}
            disabled={product.stock === 0}
          >
            <FiShoppingCart size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>

    </div>
  )
}

const styles = {
  card: {
    background: 'var(--white)',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
    position: 'relative',
  },
  imageBox: {
    width: '100%',
    height: '180px',
    overflow: 'hidden',
    position: 'relative',
    background: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s',
  },
  outOfStock: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  wishlistBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '34px',
    height: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    cursor: 'pointer',
    color: 'var(--text-mid)',
  },
  info: {
    padding: '0.9rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  category: {
    fontSize: '0.75rem',
    color: 'var(--text-light)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  name: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--text-dark)',
    lineHeight: '1.3',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  rating: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-dark)',
  },
  reviews: {
    fontSize: '0.8rem',
    color: 'var(--text-light)',
  },
  bottomRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '0.3rem',
  },
  price: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: 'var(--dark)',
  },
  cartBtn: {
    background: 'var(--dark)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.4rem 0.8rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  cartBtnDisabled: {
    background: '#ccc',
    color: '#888',
    border: 'none',
    borderRadius: '6px',
    padding: '0.4rem 0.8rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'not-allowed',
  },
}