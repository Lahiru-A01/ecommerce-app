// src/components/QuickView.jsx
import { useEffect } from 'react'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'

const BOUGHT = [4, 7, 3, 12, 5, 9, 6, 11, 8, 15]

function stars(r) {
  const filled = Math.round(r)
  return '★'.repeat(filled) + '☆'.repeat(5 - filled)
}

export default function QuickView({ product, onClose }) {
  const addItem = useCartStore(s => s.addItem)

  // Close on ESC key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!product) return null

  const bought = BOUGHT[product.id % 10]

  const handleAdd = () => {
    addItem(product)
    toast.success('Added to cart!')
    onClose()
  }

  return (
    <>
      {/* ── DARK OVERLAY ── */}
      <div
        className="qv-overlay"
        onClick={onClose}
      />

      {/* ── MODAL PANEL ── */}
      <div className="qv-modal">

        {/* LEFT — Image */}
        <div className="qv-img-side">
          <button className="qv-close" onClick={onClose}>✕</button>
          <img
            className="qv-img"
            src={product.image}
            alt={product.title}
          />
        </div>

        {/* RIGHT — Info */}
        <div className="qv-body">

          <div className="qv-cat">
            {product.category.toUpperCase()}
          </div>

          <h2 className="qv-title">{product.title}</h2>

          <div className="qv-stars">
            <span className="qv-stars-fill">
              {stars(product.rating.rate)}
            </span>
            <span className="qv-stars-count">
              {product.rating.rate} · {product.rating.count} REVIEWS
            </span>
          </div>

          <p className="qv-desc">{product.description}</p>

          <div className="qv-price-wrap">
            <div className="qv-price">${product.price.toFixed(2)}</div>
            <div className="qv-price-sub">
              ≈ LKR {Math.round(product.price * 320).toLocaleString()}
            </div>
          </div>

          <div className="qv-proof">
            <span>⚡</span>
            <span>{bought} PEOPLE BOUGHT THIS TODAY</span>
          </div>

          <button className="qv-add-btn" onClick={handleAdd}>
            ADD TO BAG
          </button>

        </div>
      </div>
    </>
  )
}