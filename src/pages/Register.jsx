import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff, FiUpload } from 'react-icons/fi'

export default function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0]
    if (file) {
      setProfilePhoto(file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  function validate() {
    const newErrors = {}
    if (!formData.fullName.trim())
      newErrors.fullName = 'Full name is required.'
    if (!formData.email.trim())
      newErrors.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Enter a valid email address.'
    if (!formData.phone.trim())
      newErrors.phone = 'Phone number is required.'
    if (!formData.password)
      newErrors.password = 'Password is required.'
    else if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters.'
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = 'Passwords do not match.'
    return newErrors
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)

    // ── Placeholder: replace with real API call when Django is ready ──
    // const data = new FormData()
    // data.append('full_name', formData.fullName)
    // data.append('email', formData.email)
    // data.append('phone', formData.phone)
    // data.append('password', formData.password)
    // if (profilePhoto) data.append('profile_photo', profilePhoto)
    // const response = await axios.post('/api/auth/register/', data)

    setTimeout(() => {
      setLoading(false)
      navigate('/login')
    }, 1200)
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <Link to="/" style={styles.logo}>
            Quick<span style={{ color: 'var(--gold)' }}>Cart</span>
          </Link>
          <h1 style={styles.title}>Create your account</h1>
          <p style={styles.subtitle}>Join QuickCart and get essentials in minutes</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Profile Photo Upload */}
          <div style={styles.photoSection}>
            <div style={styles.photoCircle}>
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" style={styles.photoPreview} />
              ) : (
                <FiUser size={36} color="var(--text-light)" />
              )}
            </div>
            <label htmlFor="photoInput" style={styles.uploadLabel}>
              <FiUpload size={14} />
              <span>{profilePhoto ? profilePhoto.name : 'Upload Profile Photo'}</span>
            </label>
            <input
              id="photoInput"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
            />
            <p style={styles.photoHint}>JPG, PNG up to 5MB</p>
          </div>

          {/* Full Name */}
          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <div style={styles.inputWrapper}>
              <FiUser size={17} style={styles.inputIcon} />
              <input
                type="text"
                name="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleChange}
                style={errors.fullName ? styles.inputError : styles.input}
              />
            </div>
            {errors.fullName && <span style={styles.errorText}>{errors.fullName}</span>}
          </div>

          {/* Email */}
          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputWrapper}>
              <FiMail size={17} style={styles.inputIcon} />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                style={errors.email ? styles.inputError : styles.input}
              />
            </div>
            {errors.email && <span style={styles.errorText}>{errors.email}</span>}
          </div>

          {/* Phone */}
          <div style={styles.field}>
            <label style={styles.label}>Phone Number</label>
            <div style={styles.inputWrapper}>
              <FiPhone size={17} style={styles.inputIcon} />
              <input
                type="tel"
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                style={errors.phone ? styles.inputError : styles.input}
              />
            </div>
            {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
          </div>

          {/* Password */}
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <FiLock size={17} style={styles.inputIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleChange}
                style={errors.password ? styles.inputError : styles.input}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
              </button>
            </div>
            {errors.password && <span style={styles.errorText}>{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div style={styles.field}>
            <label style={styles.label}>Confirm Password</label>
            <div style={styles.inputWrapper}>
              <FiLock size={17} style={styles.inputIcon} />
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={errors.confirmPassword ? styles.inputError : styles.input}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={styles.eyeBtn}>
                {showConfirm ? <FiEyeOff size={17} /> : <FiEye size={17} />}
              </button>
            </div>
            {errors.confirmPassword && <span style={styles.errorText}>{errors.confirmPassword}</span>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={loading ? styles.btnLoading : styles.btn}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

        </form>

        <p style={styles.footerText}>
          Already have an account?{' '}
          <Link to="/login" style={styles.footerLink}>Sign in</Link>
        </p>

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
    maxWidth: '480px',
    boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.8rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: 'var(--dark)',
    marginBottom: '0.4rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--dark)',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: 'var(--text-light)',
  },
  photoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.6rem',
    marginBottom: '0.5rem',
  },
  photoCircle: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    background: 'var(--light-gray)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    border: '2px dashed #d1d5db',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  uploadLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    background: 'var(--light-gray)',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '0.45rem 1rem',
    fontSize: '0.85rem',
    fontWeight: '500',
    color: 'var(--text-mid)',
    cursor: 'pointer',
  },
  photoHint: {
    fontSize: '0.75rem',
    color: 'var(--text-light)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
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
    padding: '0.72rem 1rem 0.72rem 2.6rem',
    border: '1.5px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.92rem',
    color: 'var(--text-dark)',
    background: 'var(--white)',
  },
  inputError: {
    width: '100%',
    padding: '0.72rem 1rem 0.72rem 2.6rem',
    border: '1.5px solid #fca5a5',
    borderRadius: '8px',
    fontSize: '0.92rem',
    color: 'var(--text-dark)',
    background: '#fff8f8',
  },
  eyeBtn: {
    position: 'absolute',
    right: '0.9rem',
    background: 'none',
    border: 'none',
    color: 'var(--text-light)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  errorText: {
    fontSize: '0.8rem',
    color: '#dc2626',
  },
  btn: {
    background: 'var(--dark)',
    color: 'var(--white)',
    padding: '0.85rem',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '1rem',
    marginTop: '0.5rem',
  },
  btnLoading: {
    background: 'var(--text-light)',
    color: 'var(--white)',
    padding: '0.85rem',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '1rem',
    marginTop: '0.5rem',
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
}