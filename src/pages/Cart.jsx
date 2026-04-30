import { useCartStore } from '../store/cartStore'
import { Link } from 'react-router-dom'
import { useCurrencyStore, formatPrice } from '../store/currencyStore'

export default function Cart() {
  const { items, removeItem, updateQty, clearCart, total } = useCartStore()
  const { currency } = useCurrencyStore()
  
  if (items.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-xl font-medium">Your cart is empty</p>
      <Link to="/" className="bg-black text-white px-6 py-3 rounded-xl">Shop Now</Link>
    </div>
  )

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      <div className="space-y-4 mb-8">
        {items.map(item => (
          <div key={item.id} className="flex gap-4 items-center bg-white border rounded-xl p-4">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
            <div className="flex-1">
              <p className="font-medium line-clamp-1">{item.title}</p>
              <p className="text-gray-500 text-sm">{formatPrice(item.price, currency)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQty(item.id, item.qty - 1)}
                className="w-8 h-8 border rounded-full hover:bg-gray-100">−</button>
              <span className="w-8 text-center">{item.qty}</span>
              <button onClick={() => updateQty(item.id, item.qty + 1)}
                className="w-8 h-8 border rounded-full hover:bg-gray-100">+</button>
            </div>
            <p className="font-bold w-20 text-right">${(item.price * item.qty).toFixed(2)}</p>
            <button onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700 ml-2">✕</button>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex justify-between text-xl font-bold mb-4">
          <span className="font-bold text-lg">
            {formatPrice(total(), currency)}
          </span>
          <span>${total().toFixed(2)}</span>
        </div>
        <button className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800">
          Checkout
        </button>
        <button onClick={clearCart} className="w-full mt-2 text-sm text-gray-500 hover:text-black">
          Clear Cart
        </button>
      </div>
    </main>
  )
}