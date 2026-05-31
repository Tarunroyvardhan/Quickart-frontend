import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiMapPin, FiCreditCard, FiUpload } from 'react-icons/fi'

const orderSummary = [
  { id: 1, name: 'Fresh Whole Milk 1L',      quantity: 2, price: 2.49 },
  { id: 2, name: 'Organic Bananas (6 pack)', quantity: 1, price: 1.99 },
  { id: 3, name: 'Sourdough Bread Loaf',     quantity: 1, price: 3.99 },
]

export default function Checkout() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })
  const [addressProof, setAddressProof] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const subtotal = orderSummary.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const deliveryFee = 0
  const total = subtotal + deliveryFee

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  function handleFileChange(e) {
    if (e.target.files[0]) setAddressProof(e.target.files[0])
  }

  function validate() {
    const e = {}
    if (!formData.fullName.trim())   e.fullName   = 'Full name is required.'
    if (!formData.phone.trim())      e.phone      = 'Phone number is required.'
    if (!formData.address.trim())    e.address    = 'Address is required.'
    if (!formData.city.trim())       e.city       = 'City is required.'
    if (!formData.postalCode.trim()) e.postalCode = 'Postal code is required.'
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) e.cardNumber = 'Card number is required.'
      if (!formData.expiry.trim())     e.expiry     = 'Expiry date is required.'
      if (!formData.cvv.trim())        e.cvv        = 'CVV is required.'
    }
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setLoading(true)

    // ── Placeholder: replace with real API call when Django is ready ──
    // await axios.post('/api/orders/', { ...formData, items: orderSummary })

    setTimeout(() => {
      setLoading(false)
      navigate('/order-confirmation')
    }, 1200)
  }

  const inputStyle = (field) => ({
    width: '100%',
    padding: '0.72rem 1rem',
    border: `1.5px solid ${errors[field] ? '#fca5a5' : '#e5e7eb'}`,
    borderRadius: '8px',
    fontSize: '0.92rem',
    background: errors[field] ? '#fff8f8' : 'var(--white)',
    color: 'var(--text-dark)',
  })

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <div style={styles.pageHeader}>
          <Link to="/cart" style={styles.backLink}>
            <FiArrowLeft size={16} />
            <span>Back to Cart</span>
          </Link>
          <h1 style={styles.pageTitle}>Checkout</h1>
        </div>

        <div style={styles.layout}>

          {/* Left — Form */}
          <form onSubmit={handleSubmit} style={styles.formSection}>

            {/* Delivery Address */}
            <div style={styles.formCard}>
              <div style={styles.cardHeader}>
                <FiMapPin size={20} color="var(--gold)" />
                <h2 style={styles.cardTitle}>Delivery Address</h2>
              </div>

              <div style={styles.row2}>
                <div style={styles.field}>
                  <label style={styles.label}>Full Name</label>
                  <input name="fullName" placeholder="Your full name"
                    value={formData.fullName} onChange={handleChange} style={inputStyle('fullName')} />
                  {errors.fullName && <span style={styles.errorText}>{errors.fullName}</span>}
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Phone Number</label>
                  <input name="phone" placeholder="+1 (555) 000-0000"
                    value={formData.phone} onChange={handleChange} style={inputStyle('phone')} />
                  {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Street Address</label>
                <input name="address" placeholder="123 Main Street, Apt 4B"
                  value={formData.address} onChange={handleChange} style={inputStyle('address')} />
                {errors.address && <span style={styles.errorText}>{errors.address}</span>}
              </div>

              <div style={styles.row2}>
                <div style={styles.field}>
                  <label style={styles.label}>City</label>
                  <input name="city" placeholder="Windsor"
                    value={formData.city} onChange={handleChange} style={inputStyle('city')} />
                  {errors.city && <span style={styles.errorText}>{errors.city}</span>}
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Postal Code</label>
                  <input name="postalCode" placeholder="N9A 1A1"
                    value={formData.postalCode} onChange={handleChange} style={inputStyle('postalCode')} />
                  {errors.postalCode && <span style={styles.errorText}>{errors.postalCode}</span>}
                </div>
              </div>

              {/* Address Proof Upload */}
              <div style={styles.field}>
                <label style={styles.label}>
                  Address Proof <span style={{ color: 'var(--text-light)', fontWeight: '400' }}>(optional)</span>
                </label>
                <label htmlFor="addressProof" style={styles.uploadBox}>
                  <FiUpload size={20} color="var(--text-light)" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-mid)' }}>
                    {addressProof ? addressProof.name : 'Upload a document (PDF, JPG, PNG)'}
                  </span>
                </label>
                <input id="addressProof" type="file" accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange} style={{ display: 'none' }} />
              </div>
            </div>

            {/* Payment */}
            <div style={styles.formCard}>
              <div style={styles.cardHeader}>
                <FiCreditCard size={20} color="var(--gold)" />
                <h2 style={styles.cardTitle}>Payment Method</h2>
              </div>

              {/* Payment Toggle */}
              <div style={styles.paymentToggle}>
                {['card', 'cash'].map(method => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: method })}
                    style={formData.paymentMethod === method ? styles.toggleActive : styles.toggleInactive}
                  >
                    {method === 'card' ? '💳 Credit / Debit Card' : '💵 Cash on Delivery'}
                  </button>
                ))}
              </div>

              {/* Card Fields */}
              {formData.paymentMethod === 'card' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                  <div style={styles.field}>
                    <label style={styles.label}>Card Number</label>
                    <input name="cardNumber" placeholder="1234 5678 9012 3456"
                      maxLength={19} value={formData.cardNumber} onChange={handleChange}
                      style={inputStyle('cardNumber')} />
                    {errors.cardNumber && <span style={styles.errorText}>{errors.cardNumber}</span>}
                  </div>
                  <div style={styles.row2}>
                    <div style={styles.field}>
                      <label style={styles.label}>Expiry Date</label>
                      <input name="expiry" placeholder="MM/YY"
                        maxLength={5} value={formData.expiry} onChange={handleChange}
                        style={inputStyle('expiry')} />
                      {errors.expiry && <span style={styles.errorText}>{errors.expiry}</span>}
                    </div>
                    <div style={styles.field}>
                      <label style={styles.label}>CVV</label>
                      <input name="cvv" placeholder="123"
                        maxLength={3} value={formData.cvv} onChange={handleChange}
                        style={inputStyle('cvv')} />
                      {errors.cvv && <span style={styles.errorText}>{errors.cvv}</span>}
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'cash' && (
                <div style={styles.cashNote}>
                  Pay with cash when your order arrives at your door.
                </div>
              )}
            </div>

            <button
              type="submit"
              style={loading ? styles.btnLoading : styles.btn}
              disabled={loading}
            >
              {loading ? 'Placing Order...' : `Place Order · $${total.toFixed(2)}`}
            </button>

          </form>

          {/* Right — Order Summary */}
          <div style={styles.summaryBox}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>
            <div style={styles.summaryItems}>
              {orderSummary.map(item => (
                <div key={item.id} style={styles.summaryItem}>
                  <span style={styles.summaryItemName}>
                    {item.name}
                    <span style={styles.summaryQty}> × {item.quantity}</span>
                  </span>
                  <span style={styles.summaryItemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div style={styles.summaryDivider} />
            <div style={styles.summaryRow}>
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Delivery</span>
              <span style={{ color: 'var(--success)', fontWeight: '600' }}>FREE</span>
            </div>
            <div style={styles.summaryDivider} />
            <div style={{ ...styles.summaryRow, fontWeight: '700', fontSize: '1.1rem', color: 'var(--dark)' }}>
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
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
  page: { minHeight: '80vh', background: 'var(--bg)', padding: '2rem 0' },
  container: { maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' },
  pageHeader: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' },
  backLink: { display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-mid)', fontSize: '0.9rem', fontWeight: '500' },
  pageTitle: { fontSize: '1.7rem', fontWeight: '700', color: 'var(--dark)' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' },
  formSection: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  formCard: { background: 'var(--white)', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: '1rem' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' },
  cardTitle: { fontSize: '1.05rem', fontWeight: '700', color: 'var(--dark)' },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.35rem' },
  label: { fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-dark)' },
  errorText: { fontSize: '0.8rem', color: '#dc2626' },
  uploadBox: { border: '1.5px dashed #d1d5db', borderRadius: '8px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', background: 'var(--light-gray)' },
  paymentToggle: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' },
  toggleActive: { padding: '0.75rem', borderRadius: '8px', border: '2px solid var(--dark)', background: 'var(--dark)', color: 'var(--white)', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer' },
  toggleInactive: { padding: '0.75rem', borderRadius: '8px', border: '2px solid #e5e7eb', background: 'var(--white)', color: 'var(--text-mid)', fontWeight: '500', fontSize: '0.9rem', cursor: 'pointer' },
  cashNote: { background: 'var(--light-gray)', borderRadius: '8px', padding: '1rem', fontSize: '0.9rem', color: 'var(--text-mid)', marginTop: '0.5rem' },
  btn: { background: 'var(--dark)', color: 'var(--white)', padding: '1rem', borderRadius: '8px', fontWeight: '700', fontSize: '1.05rem', cursor: 'pointer', width: '100%' },
  btnLoading: { background: 'var(--text-light)', color: 'var(--white)', padding: '1rem', borderRadius: '8px', fontWeight: '700', fontSize: '1.05rem', cursor: 'not-allowed', width: '100%' },
  summaryBox: { background: 'var(--white)', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', position: 'sticky', top: '80px', display: 'flex', flexDirection: 'column', gap: '0.8rem' },
  summaryTitle: { fontSize: '1.1rem', fontWeight: '700', color: 'var(--dark)', marginBottom: '0.3rem' },
  summaryItems: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  summaryItem: { display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' },
  summaryItemName: { color: 'var(--text-mid)', flex: 1 },
  summaryQty: { color: 'var(--text-light)', fontSize: '0.85rem' },
  summaryItemPrice: { fontWeight: '600', color: 'var(--dark)', flexShrink: 0 },
  summaryDivider: { height: '1px', background: '#e5e7eb' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--text-mid)' },
  deliveryNote: { textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.5rem' },
}