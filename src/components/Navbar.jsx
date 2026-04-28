// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { ShoppingCart, LogOut, LogIn } from 'lucide-react'

export default function Navbar() {
  const count = useCartStore(s => s.count())
  const { user, token, logout } = useAuthStore()
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 bg-white border-b px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">👗 ZyraClothing</Link>
        <div className="flex items-center gap-4">
          {user && <span className="text-sm text-gray-500 hidden md:block">Hi, {user.username}</span>}
          <Link to="/cart" className="relative">
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs
                w-5 h-5 rounded-full flex items-center justify-center">{count}</span>
            )}
          </Link>
          {token
            ? <button onClick={() => { logout(); navigate('/') }}
                className="flex items-center gap-1 text-sm hover:text-red-500">
                <LogOut size={16} /> Logout
              </button>
            : <Link to="/login" className="flex items-center gap-1 text-sm hover:text-blue-600">
                <LogIn size={16} /> Login
              </Link>
          }
        </div>
      </div>
    </nav>
  )
}