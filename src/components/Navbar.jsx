// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { useThemeStore } from '../store/themeStore'
import { useCurrencyStore } from '../store/currencyStore'
import { LogOut, LogIn } from 'lucide-react'

export default function Navbar() {
  const count = useCartStore(s => s.count())
  const { user, token, logout } = useAuthStore()
  const { isDark, toggleTheme } = useThemeStore()
  const { currency, setCurrency } = useCurrencyStore()
  const navigate = useNavigate()

  return (
    <nav className="zyra-nav">
      <div className="zyra-nav-inner">

        {/* LEFT — Logo */}
        <Link to="/" className="zyra-logo">
          👗 ZyraClothing
        </Link>

        {/* RIGHT — All controls in one row */}
        <div className="zyra-nav-right">

          {/* Currency Toggle */}
          <div className="zyra-currency">
            <button
              className={`cur-pill ${currency === 'USD' ? 'cur-active' : ''}`}
              onClick={() => setCurrency('USD')}
            >
              USD
            </button>
            <button
              className={`cur-pill ${currency === 'LKR' ? 'cur-active' : ''}`}
              onClick={() => setCurrency('LKR')}
            >
              LKR
            </button>
          </div>

          {/* Dark Mode */}
          <button onClick={toggleTheme} className="zyra-theme-btn">
            {isDark ? '◑ DARK' : '◐ LIGHT'}
          </button>

          {/* Username */}
          {user && (
            <span className="zyra-username">
              Hi, {user.username}
            </span>
          )}

          {/* BAG */}
          <Link to="/cart" className="zyra-bag-btn">
            BAG
            {count > 0 && (
              <span className="zyra-bag-count">{count}</span>
            )}
          </Link>

          {/* Login / Logout */}
          {token
            ? <button
                onClick={() => { logout(); navigate('/') }}
                className="zyra-auth-btn"
              >
                <LogOut size={13} /> LOGOUT
              </button>
            : <Link to="/login" className="zyra-auth-btn">
                <LogIn size={13} /> LOGIN
              </Link>
          }

        </div>
      </div>
    </nav>
  )
}