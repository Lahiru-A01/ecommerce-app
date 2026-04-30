// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import { getProducts, getCategories, getByCategory } from '../api/products'
import ProductCard from '../components/ProductCard'
import Marquee from '../components/Marquee'
import QuickView from '../components/QuickView'

export default function Home() {
  const [products, setProducts]   = useState([])
  const [categories, setCategories] = useState([])
  const [active, setActive]       = useState('all')
  const [loading, setLoading]     = useState(true)
  const [quickProduct, setQuickProduct] = useState(null)

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
    const data = cat === 'all'
      ? await getProducts()
      : await getByCategory(cat)
    setProducts(data)
    setLoading(false)
  }

  return (
    <>

      {/* ── HERO ── */}
      <Marquee />

      <section className="hero-section">
        <div className="hero-grid" />
        <div className="hero-bg-mesh" />

        <div className="hero-eyebrow">SS 2025 — New Arrivals</div>

        <h1 className="hero-title">
          WEAR<br />
          THE{' '}
          <span className="outline">FRE</span>
          <span className="acid">Q</span>
          <span className="outline">UENCY</span>
        </h1>

        <p className="hero-sub">
          Streetwear curated for the bold. Designed for the island,
          worn by the world. Free shipping island-wide over LKR 5,000.
        </p>

        <div className="hero-actions">
          <button
            className="btn-hero-primary"
            onClick={() =>
              document.getElementById('shop-section')
                .scrollIntoView({ behavior: 'smooth' })
            }
          >
            SHOP NOW →
          </button>
          <button className="btn-hero-ghost">VIEW LOOKBOOK</button>
        </div>

        {/* Stats — right side */}
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="stat-number">12K+</div>
            <div className="stat-label">Island Drip</div>
          </div>
          <div className="hero-stat">
            <div className="stat-number">4.9★</div>
            <div className="stat-label">Avg Rating</div>
          </div>
          <div className="hero-stat">
            <div className="stat-number">48H</div>
            <div className="stat-label">Fast Delivery</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <div className="scroll-line" />
          <div className="scroll-label">SCROLL</div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <main id="shop-section" className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-3 flex-wrap mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => filter(cat)}
              className={`px-4 py-2 rounded-full capitalize text-sm font-medium border transition
                ${active === cat ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
            >
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
            {products.map(p => <ProductCard key={p.id} product={p} 
            onQuickView={setQuickProduct} />)}
          </div>
        )}
      </main>
      {quickProduct && (
        <QuickView product={quickProduct} onClose={() => setQuickProduct(null)} />
      )}
    </>
  )
}