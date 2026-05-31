import { Link } from 'react-router-dom'
import { FiCheckCircle, FiPackage, FiClock, FiMapPin } from 'react-icons/fi'

export default function OrderConfirmation() {
  const orderNumber = 'QC-' + Math.floor(10000 + Math.random() * 90000)

  const steps = [
    { icon: <FiCheckCircle size={20} />, label: 'Order Placed',     done: true  },
    { icon: <FiPackage     size={20} />, label: 'Being Packed',     done: false },
    { icon: <FiClock       size={20} />, label: 'Out for Delivery', done: false },
    { icon: <FiMapPin      size={20} />, label: 'Delivered',        done: false },
  ]

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Success Icon */}
        <div style={styles.iconCircle}>
          <FiCheckCircle size={52} color="#16a34a" />
        </div>

        <h1 style={styles.title}>Order Confirmed!</h1>
        <p style={styles.subtitle}>
          Thank you! We're preparing your order right now.
        </p>

        {/* Order Number */}
        <div style={styles.orderNumberBox}>
          <span style={styles.orderLabel}>Order Number</span>
          <span style={styles.orderNumber}>{orderNumber}</span>
        </div>

        {/* Tracking Steps */}
        <div style={styles.stepsWrapper}>
          {steps.map((step, i) => (
            <div key={i} style={styles.stepCol}>
              {/* Connector line before (except first) */}
              {i > 0 && (
                <div style={steps[i - 1].done ? styles.lineDone : styles.line} />
              )}
              <div style={step.done ? styles.stepDone : styles.stepPending}>
                {step.icon}
              </div>
              <span style={step.done ? styles.stepLabelDone : styles.stepLabel}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Delivery Info */}
        <div style={styles.infoBox}>
          <FiClock size={18} color="var(--gold)" />
          <p style={styles.infoText}>
            Estimated delivery in <strong>15–30 minutes</strong>
          </p>
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          <Link to="/orders" style={{ flex: 1 }}>
            <button style={{ ...styles.btn, background: 'var(--dark)' }}>
              Track My Order
            </button>
          </Link>
          <Link to="/" style={{ flex: 1 }}>
            <button style={{ ...styles.btn, background: 'var(--light-gray)', color: 'var(--text-dark)', border: '1px solid #e5e7eb' }}>
              Back to Home
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '80vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' },
  card: { background: 'var(--white)', borderRadius: '16px', padding: '3rem 2.5rem', maxWidth: '540px', width: '100%', boxShadow: '0 8px 40px rgba(0,0,0,0.10)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.3rem', textAlign: 'center' },
  iconCircle: { width: '90px', height: '90px', borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: '1.8rem', fontWeight: '800', color: 'var(--dark)' },
  subtitle: { fontSize: '1rem', color: 'var(--text-mid)', lineHeight: '1.5' },
  orderNumberBox: { background: 'var(--light-gray)', borderRadius: '10px', padding: '1rem 2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' },
  orderLabel: { fontSize: '0.78rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.5px' },
  orderNumber: { fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)', letterSpacing: '1px' },
  stepsWrapper: { display: 'flex', alignItems: 'flex-start', justifyContent: 'center', width: '100%', gap: '0', position: 'relative' },
  stepCol: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1, position: 'relative' },
  stepDone: { width: '46px', height: '46px', borderRadius: '50%', background: '#f0fdf4', border: '2px solid #16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', zIndex: 1 },
  stepPending: { width: '46px', height: '46px', borderRadius: '50%', background: 'var(--light-gray)', border: '2px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)', zIndex: 1 },
  stepLabelDone: { fontSize: '0.72rem', fontWeight: '600', color: '#16a34a', textAlign: 'center' },
  stepLabel: { fontSize: '0.72rem', color: 'var(--text-light)', textAlign: 'center' },
  line: { position: 'absolute', top: '23px', right: '50%', width: '100%', height: '2px', background: '#e5e7eb', zIndex: 0 },
  lineDone: { position: 'absolute', top: '23px', right: '50%', width: '100%', height: '2px', background: '#16a34a', zIndex: 0 },
  infoBox: { display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(200,169,110,0.1)', borderRadius: '8px', padding: '0.8rem 1.2rem', border: '1px solid rgba(200,169,110,0.25)', width: '100%', justifyContent: 'center' },
  infoText: { fontSize: '0.95rem', color: 'var(--text-mid)' },
  actions: { display: 'flex', gap: '1rem', width: '100%' },
  btn: { width: '100%', padding: '0.85rem', borderRadius: '8px', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', border: 'none' },
}