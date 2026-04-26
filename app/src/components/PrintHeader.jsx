export default function PrintHeader({ method, topic }) {
  const now = new Date()
  const dateStr = now.toLocaleDateString('it-IT', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
  const timeStr = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="print-only-block" aria-hidden="true">
      {/* Top rule */}
      <div className="print-header-rule" style={{ backgroundColor: method.color }} />

      {/* Main title = topic */}
      <div className="print-header-body">
        <div className="print-header-meta">
          <span className="print-header-method">{method.name.toUpperCase()}</span>
          <span className="print-header-sep">·</span>
          <span className="print-header-origin">{method.origin}</span>
        </div>
        <h1 className="print-header-title">
          {topic || 'Sessione di studio'}
        </h1>
        <div className="print-header-sub">
          <span>{method.desc}</span>
        </div>
        <div className="print-header-date">
          {dateStr} — {timeStr}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="print-header-divider" />
    </div>
  )
}
