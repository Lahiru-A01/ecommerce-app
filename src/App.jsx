import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'
import { Toaster } from 'react-hot-toast'

// App.jsx — make sure there is NO pt-16 or mt-16 on the Routes wrapper
export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Navbar />
      {/* ❌ WRONG — removes the gap */}
      {/* <div className="pt-16"> */}

      {/* ✅ CORRECT — no padding */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={
          <ProtectedRoute><Cart /></ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}