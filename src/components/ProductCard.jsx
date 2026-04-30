// src/components/ProductCard.jsx
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'
import { useCurrencyStore, formatPrice, formatPriceSub } from '../store/currencyStore'

export default function ProductCard({ product, onQuickView }) {  // ← ADD: prop
  const addItem = useCartStore(s => s.addItem)
  const { currency } = useCurrencyStore()

  return (
    <div className="product-card bg-white border rounded-xl overflow-hidden hover:shadow-lg transition group relative">  {/* ← ADD: relative */}

      {/* Image area — ADD position relative wrapper */}
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <div className="h-48 flex items-center justify-center p-4 bg-gray-50">
            <img
              src={product.image}
              alt={product.title}
              className="h-full object-contain group-hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        {/* ── ADD THIS BUTTON 👇 ── */}
        <button
          className="qv-trigger"
          onClick={(e) => {
            e.preventDefault()
            onQuickView(product)
          }}
        >
          ⚡ QUICK VIEW
        </button>
        {/* ── END ── */}
      </div>
      
      <div className="p-4">
        <p className="text-xs text-gray-400 capitalize mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-sm line-clamp-2 hover:underline mb-2">{product.title}</h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-lg">
            {formatPrice(product.price, currency)}
          </span>
          <span className="text-xs text-gray-400 mt-1 block">
            {formatPriceSub(product.price, currency)}
          </span>
          <button onClick={() => { addItem(product); toast.success('Added to cart!') }}
            className="bg-black text-white text-sm px-3 py-1.5 rounded-lg hover:bg-gray-800">
            Add
          </button>
        </div>
      </div>
    </div>
  )
}