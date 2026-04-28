// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { loginUser } from '../api/products'
import toast from 'react-hot-toast'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const login = useAuthStore(s => s.login)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await loginUser(form.username, form.password)
      login({ username: form.username }, data.token)
      toast.success('Logged in!')
      navigate('/')
    } catch {
      toast.error('Invalid credentials. Try: mor_2314 / 83r5^_')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>
        <p className="text-sm text-gray-500 mb-4">
          Test credentials: <code>mor_2314</code> / <code>83r5^_</code>
        </p>
        <input className="w-full border p-3 rounded-lg mb-4" placeholder="Username"
          value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
        <input type="password" className="w-full border p-3 rounded-lg mb-6" placeholder="Password"
          value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <button type="submit" disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}