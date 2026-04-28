// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import { getProducts, getCategories, getByCategory } from '../api/products'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [active, setActive] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getProducts(), getCategories()]).then(([prods, cats]) => {
      setProducts(prods)
      setCategories(['all', ...cats])
      setLoading(false)
    })
  }, [])

  const filter = async (cat) => {
    setActive(cat)
    setLoading(true)
    const data = cat === 'all' ? await getProducts() : await getByCategory(cat)
    setProducts(data)
    setLoading(false)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-3 flex-wrap mb-8">
        {categories.map(cat => (
          <button key={cat} onClick={() => filter(cat)}
            className={`px-4 py-2 rounded-full capitalize text-sm font-medium border transition
              ${active === cat ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
            {cat}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse h-72 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </main>
  )
}