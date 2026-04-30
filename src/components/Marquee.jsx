// src/components/Marquee.jsx
export default function Marquee() {
  const items = [
    'WEAR THE FREQUENCY',
    'ISLAND DRIP',
    'SS 2025',
    'NEW ARRIVALS',
    'GEN Z FASHION',
    'ZYRA SL',
    'FREE SHIPPING',
    'LIMITED DROP',
  ]

  // Double the array so the loop is seamless
  const doubled = [...items, ...items, ...items, ...items]

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}