import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowLeft } from 'react-icons/fi'

// Mock cart data — replace with real context/API later
const initialCartItems = [
  { id: 1, name: 'Fresh Whole Milk 1L',      category: 'Dairy & Eggs',        price: 2.49, quantity: 2, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400' },
  { id: 2, name: 'Organic Bananas (6 pack)', category: 'Fruits & Vegetables', price: 1.99, quantity: 1, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400' },
  { id: 3, name: 'Sourdough Bread Loaf',     category: 'Bakery',              price: 3.99, quantity: 1, image: 'https://images.unsplash.com/photo-1585478259715-4d3a29e71d56?w=400' },
]

export default function Cart() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState(initialCartItems)

  function updateQuantity(id, delta) {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  function removeItem(id) {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 30 ? 0 : 2.99
  const total = subtotal + deliveryFee

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyPage}>
        <FiShoppingBag size={72} color="var(--text-light)" />
        <h2 style={styles.emptyTitle}>Your cart is empty</h2>
        <p style={styles.emptyText}>Looks like you haven't added anything yet.</p>
        <Link to="/products">
          <button style={styles.shopBtn}>Start Shopping</button>
        </Link>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Page Header */}
        <div style={styles.pageHeader}>
          <Link to="/products" style={styles.backLink}>
            <FiArrowLeft size={16} />
            <span>Continue Shopping</span>
          </Link>
          <h1 style={styles.pageTitle}>My Cart</h1>
          <span style={styles.itemCount}>{cartItems.length} items</span>
        </div>

        <div style={styles.layout}>

          {/* Left — Cart Items */}
          <div style={styles.itemsSection}>
            {cartItems.map(item => (
              <div key={item.id} style={styles.cartItem}>

                {/* Image */}
                <img src={item.image} alt={item.name} style={styles.itemImage} />

                {/* Details */}
                <div style={styles.itemDetails}>
                  <p style={styles.itemCategory}>{item.category}</p>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.itemPrice}>${item.price.toFixed(2)} each</p>
                </div>

                {/* Quantity Controls */}
                <div style={styles.quantityControls}>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <FiMinus size={14} />
                  </button>
                  <span style={styles.qtyNumber}>{item.quantity}</span>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <FiPlus size={14} />
                  </button>
                </div>

                {/* Line Total */}
                <div style={styles.lineTotal}>
                  <p style={styles.lineTotalPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    style={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Right — Order Summary */}
          <div style={styles.summaryBox}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>

            <div style={styles.summaryRows}>
              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Delivery Fee</span>
                <span style={{ color: deliveryFee === 0 ? 'var(--success)' : 'inherit' }}>
                  {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p style={styles.freeDeliveryHint}>
                  Add ${(30 - subtotal).toFixed(2)} more for free delivery
                </p>
              )}
              <div style={styles.divider} />
              <div style={{ ...styles.summaryRow, fontWeight: '700', fontSize: '1.1rem' }}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              style={styles.checkoutBtn}
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>

            <div style={styles.deliveryNote}>
              ⚡ Estimated delivery: <strong>15–30 minutes</strong>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '80vh',
    background: 'var(--bg)',
    padding: '2rem 0',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  pageHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  backLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: 'var(--text-mid)',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  pageTitle: {
    fontSize: '1.7rem',
    fontWeight: '700',
    color: 'var(--dark)',
    flex: 1,
  },
  itemCount: {
    fontSize: '0.9rem',
    color: 'var(--text-light)',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: '2rem',
    alignItems: 'start',
  },
  itemsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  cartItem: {
    background: 'var(--white)',
    borderRadius: '12px',
    padding: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  itemImage: {
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    objectFit: 'cover',
    flexShrink: 0,
  },
  itemDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
  itemCategory: {
    fontSize: '0.75rem',
    color: 'var(--text-light)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  itemName: {
    fontSize: '0.98rem',
    fontWeight: '600',
    color: 'var(--dark)',
  },
  itemPrice: {
    fontSize: '0.85rem',
    color: 'var(--text-mid)',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    background: 'var(--light-gray)',
    borderRadius: '8px',
    padding: '0.3rem 0.5rem',
  },
  qtyBtn: {
    background: 'var(--white)',
    border: '1px solid #e5e7eb',
    borderRadius: '4px',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'var(--text-dark)',
  },
  qtyNumber: {
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--dark)',
    minWidth: '24px',
    textAlign: 'center',
  },
  lineTotal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.5rem',
    flexShrink: 0,
  },
  lineTotalPrice: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: 'var(--dark)',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  summaryBox: {
    background: 'var(--white)',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    position: 'sticky',
    top: '80px',
  },
  summaryTitle: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: 'var(--dark)',
    marginBottom: '1.2rem',
  },
  summaryRows: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    marginBottom: '1.5rem',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.95rem',
    color: 'var(--text-mid)',
  },
  freeDeliveryHint: {
    fontSize: '0.8rem',
    color: 'var(--gold)',
    fontWeight: '500',
  },
  divider: {
    height: '1px',
    background: '#e5e7eb',
    margin: '0.3rem 0',
  },
  checkoutBtn: {
    width: '100%',
    background: 'var(--dark)',
    color: 'var(--white)',
    padding: '0.9rem',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  deliveryNote: {
    textAlign: 'center',
    fontSize: '0.85rem',
    color: 'var(--text-light)',
  },
  emptyPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '1rem',
    textAlign: 'center',
    padding: '2rem',
  },
  emptyTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--dark)',
  },
  emptyText: {
    fontSize: '1rem',
    color: 'var(--text-light)',
  },
  shopBtn: {
    background: 'var(--dark)',
    color: 'var(--white)',
    padding: '0.8rem 2rem',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
}