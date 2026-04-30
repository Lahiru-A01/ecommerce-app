import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ── ADD THESE 3 LINES 👇 ──
const saved = JSON.parse(localStorage.getItem('zyra-theme') || '{}')
const isDark = saved?.state?.isDark ?? true
document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
// ── END OF ADDITION ──

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)