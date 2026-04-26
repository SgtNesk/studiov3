const SIZE_CLASS = {
  xl: 'min-h-[200px]',
  large: 'min-h-[140px]',
  '': 'min-h-[90px]',
}

export default function StepsForm({ steps, data, setData, color }) {
  return (
    <>
      {steps.map(s => (
        <div key={s.id} className="mb-6">
          <div className="flex items-baseline gap-2.5 mb-2.5">
            <span
              className="font-mono text-[11px] font-medium tracking-[0.1em] w-7 flex-shrink-0"
              style={{ color }}
            >
              {s.id.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
              {s.label}
            </span>
            <span className="text-[11px] text-ink3 ml-auto italic">{s.hint}</span>
          </div>
          <textarea
            className={`w-full border border-border2 bg-app-white px-4 py-3.5 resize-y outline-none leading-[1.8] text-[13px] transition-colors cc-focus ${SIZE_CLASS[s.size] ?? 'min-h-[90px]'}`}
            placeholder={s.placeholder}
            value={data[s.id] || ''}
            onChange={e => setData(prev => ({ ...prev, [s.id]: e.target.value }))}
          />
        </div>
      ))}
    </>
  )
}
