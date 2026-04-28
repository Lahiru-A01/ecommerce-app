// src/pages/ProductDetail.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../api/products'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const addItem = useCartStore(s => s.addItem)

  useEffect(() => {
    getProduct(id).then(setProduct)
  }, [id])

  if (!product) return <div className="p-8 text-center">Loading...</div>

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-h-80 object-contain" />
        </div>
        <div>
          <p className="text-sm text-gray-400 capitalize mb-2">{product.category}</p>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-400">★</span>
            <span className="text-sm">{product.rating?.rate} ({product.rating?.count} reviews)</span>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
          <p className="text-3xl font-bold mb-6">${product.price}</p>
          <button onClick={() => { addItem(product); toast.success('Added to cart!') }}
            className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  )
}