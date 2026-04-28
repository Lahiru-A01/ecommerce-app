// src/components/ProductCard.jsx
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const addItem = useCartStore(s => s.addItem)

  return (
    <div className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition group">
      <Link to={`/product/${product.id}`}>
        <div className="h-48 flex items-center justify-center p-4 bg-gray-50">
          <img src={product.image} alt={product.title}
            className="h-full object-contain group-hover:scale-105 transition-transform" />
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs text-gray-400 capitalize mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-sm line-clamp-2 hover:underline mb-2">{product.title}</h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-lg">${product.price}</span>
          <button onClick={() => { addItem(product); toast.success('Added to cart!') }}
            className="bg-black text-white text-sm px-3 py-1.5 rounded-lg hover:bg-gray-800">
            Add
          </button>
        </div>
      </div>
    </div>
  )
}