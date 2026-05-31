import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiStar, FiCheck } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart()
  const [animating, setAnimating] = useState(false)

  const alreadyInCart = cartItems.some(item => item.id === product.id)

  function handleAddToCart() {
    if (product.stock === 0) return
    addToCart(product)
    setAnimating(true)
    setTimeout(() => setAnimating(false), 1500)
  }

  return (
    <div style={styles.card}>

      {/* Image */}
      <Link to={`/products/${product.id}`}>
        <div style={styles.imageBox}>
          <img src={product.image} alt={product.name} style={styles.image} />
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
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={
              product.stock === 0
                ? styles.cartBtnDisabled
                : animating
                  ? styles.cartBtnSuccess
                  : alreadyInCart
                    ? styles.cartBtnAlready
                    : styles.cartBtn
            }
          >
            {animating ? (
              <><FiCheck size={15} /><span>Added!</span></>
            ) : alreadyInCart ? (
              <><FiShoppingCart size={15} /><span>In Cart</span></>
            ) : (
              <><FiShoppingCart size={15} /><span>Add</span></>
            )}
          </button>
        </div>
      </div>

      {/* Floating +1 animation */}
      {animating && (
        <div style={styles.floatingPlus}>+1</div>
      )}

    </div>
  )
}

const styles = {
  card: { background: 'var(--white)', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', overflow: 'visible', transition: 'transform 0.2s, box-shadow 0.2s', position: 'relative' },
  imageBox: { width: '100%', height: '180px', overflow: 'hidden', position: 'relative', background: '#f5f5f5', borderRadius: '10px 10px 0 0' },
  image: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' },
  outOfStock: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '0.9rem' },
  wishlistBtn: { position: 'absolute', top: '10px', right: '10px', background: 'white', border: 'none', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.15)', cursor: 'pointer', color: 'var(--text-mid)', zIndex: 2 },
  info: { padding: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' },
  category: { fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.5px' },
  name: { fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-dark)', lineHeight: '1.3' },
  ratingRow: { display: 'flex', alignItems: 'center', gap: '0.3rem' },
  rating: { fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-dark)' },
  reviews: { fontSize: '0.8rem', color: 'var(--text-light)' },
  bottomRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.3rem' },
  price: { fontSize: '1.1rem', fontWeight: '700', color: 'var(--dark)' },
  cartBtn: { background: 'var(--dark)', color: 'white', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
  cartBtnSuccess: { background: '#16a34a', color: 'white', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transform: 'scale(1.08)', transition: 'all 0.2s' },
  cartBtnAlready: { background: 'var(--mid)', color: 'white', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
  cartBtnDisabled: { background: '#ccc', color: '#888', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'not-allowed' },
  floatingPlus: { position: 'absolute', bottom: '50px', right: '14px', background: '#16a34a', color: 'white', fontWeight: '800', fontSize: '0.85rem', padding: '0.2rem 0.5rem', borderRadius: '20px', animation: 'floatUp 1.5s ease-out forwards', pointerEvents: 'none', zIndex: 10 },
}