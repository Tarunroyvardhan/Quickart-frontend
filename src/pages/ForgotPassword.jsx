import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)

    // ── Placeholder: replace with real API call when Django is ready ──
    // await axios.post('/api/auth/password-reset/', { email })

    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <Link to="/login" style={styles.backLink}>
          <FiArrowLeft size={16} />
          <span>Back to Login</span>
        </Link>

        {!submitted ? (
          <>
            <div style={styles.header}>
              <div style={styles.iconCircle}>
                <FiMail size={28} color="var(--gold)" />
              </div>
              <h1 style={styles.title}>Forgot your password?</h1>
              <p style={styles.subtitle}>
                No worries. Enter your email and we'll send you a reset link.
              </p>
            </div>

            {error && <div style={styles.errorBox}>{error}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>Email Address</label>
                <div style={styles.inputWrapper}>
                  <FiMail size={17} style={styles.inputIcon} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    style={styles.input}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={loading ? styles.btnLoading : styles.btn}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <p style={styles.footerText}>
              Remembered it?{' '}
              <Link to="/login" style={styles.footerLink}>Sign in</Link>
            </p>
          </>
        ) : (
          /* Success State */
          <div style={styles.successBox}>
            <FiCheckCircle size={56} color="var(--success)" />
            <h2 style={styles.successTitle}>Check your email</h2>
            <p style={styles.successText}>
              We've sent a password reset link to <strong>{email}</strong>.
              Check your inbox and follow the instructions.
            </p>
            <p style={styles.successHint}>
              Didn't receive it? Check your spam folder or{' '}
              <button
                onClick={() => setSubmitted(false)}
                style={styles.resendBtn}
              >
                try again
              </button>
              .
            </p>
            <Link to="/login">
              <button style={styles.btn}>Back to Login</button>
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'var(--bg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
  },
  card: {
    background: 'var(--white)',
    borderRadius: '16px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '440px',
    boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
  },
  backLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: 'var(--text-mid)',
    fontSize: '0.9rem',
    marginBottom: '1.5rem',
    fontWeight: '500',
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.8rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.6rem',
  },
  iconCircle: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: 'rgba(200,169,110,0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.5rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--dark)',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: 'var(--text-light)',
    lineHeight: '1.5',
    maxWidth: '320px',
  },
  errorBox: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    fontSize: '0.88rem',
    fontWeight: '600',
    color: 'var(--text-dark)',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '0.9rem',
    color: 'var(--text-light)',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.6rem',
    border: '1.5px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.95rem',
    color: 'var(--text-dark)',
    background: 'var(--white)',
  },
  btn: {
    background: 'var(--dark)',
    color: 'var(--white)',
    padding: '0.85rem',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '1rem',
    width: '100%',
    marginTop: '0.3rem',
  },
  btnLoading: {
    background: 'var(--text-light)',
    color: 'var(--white)',
    padding: '0.85rem',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '1rem',
    width: '100%',
    marginTop: '0.3rem',
    cursor: 'not-allowed',
  },
  footerText: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '0.9rem',
    color: 'var(--text-mid)',
  },
  footerLink: {
    color: 'var(--mid)',
    fontWeight: '700',
  },
  successBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    textAlign: 'center',
    padding: '1rem 0',
  },
  successTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: 'var(--dark)',
  },
  successText: {
    fontSize: '0.95rem',
    color: 'var(--text-mid)',
    lineHeight: '1.6',
  },
  successHint: {
    fontSize: '0.88rem',
    color: 'var(--text-light)',
  },
  resendBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--mid)',
    fontWeight: '700',
    fontSize: '0.88rem',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
}