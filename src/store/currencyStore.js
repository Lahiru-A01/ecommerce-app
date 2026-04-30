import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCurrencyStore = create(
  persist(
    (set) => ({
      currency: 'USD',
      setCurrency: (c) => set({ currency: c }),
    }),
    { name: 'zyra-currency' }
  )
)

// Helper functions — import these wherever you show prices
export const USD_TO_LKR = 320

export function formatPrice(usd, currency) {
  if (currency === 'LKR') {
    return `LKR ${Math.round(usd * USD_TO_LKR).toLocaleString()}`
  }
  return `$${usd.toFixed(2)}`
}

export function formatPriceSub(usd, currency) {
  if (currency === 'USD') {
    return `≈ LKR ${Math.round(usd * USD_TO_LKR).toLocaleString()}`
  }
  return `≈ $${usd.toFixed(2)}`
}