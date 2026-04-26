export default function CornellForm({ data, setData, color }) {
  const rows = data.cornellRows || {}

  function handleChange(rowIdx, field, value) {
    setData(prev => {
      const newRows = {
        ...(prev.cornellRows || {}),
        [rowIdx]: { ...((prev.cornellRows || {})[rowIdx] || {}), [field]: value },
      }
      const notes = Object.values(newRows)
        .map(r => r.note || '')
        .join('\n')
      return { ...prev, cornellRows: newRows, notes }
    })
  }

  return (
    <>
      {/* Block 01 — Cue + Notes grid */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2.5 mb-2.5">
          <span
            className="font-mono text-[11px] font-medium tracking-[0.1em] w-7 flex-shrink-0"
            style={{ color }}
          >
            01
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
            Domande-cue + Appunti
          </span>
          <span className="text-[11px] text-ink3 ml-auto italic">
            Sinistra: domande · Destra: appunti completi
          </span>
        </div>

        {/* Column headers */}
        <div
          className="border border-border"
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            borderBottom: 'none',
          }}
        >
          <div className="px-4 py-2 bg-bg3 border-r border-border">
            <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink3">
              Cue / Domande (← sinistra)
            </div>
          </div>
          <div className="px-4 py-2 bg-bg3">
            <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink3">
              Appunti (→ destra)
            </div>
          </div>
        </div>

        {/* Grid rows */}
        <div
          className="border border-border"
          style={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}
        >
          {[1, 2, 3, 4].flatMap(i => [
            <div key={`cue-${i}`} className="px-4 py-3.5 bg-bg2 border-r border-border border-b border-border2 last-of-type:border-b-0">
              <textarea
                className="border-0 bg-transparent outline-none w-full resize-y leading-[1.8] text-[13px] min-h-[80px]"
                placeholder="Domanda o parola chiave..."
                value={rows[i]?.cue || ''}
                onChange={e => handleChange(i, 'cue', e.target.value)}
              />
            </div>,
            <div key={`note-${i}`} className="px-4 py-3.5 bg-app-white border-b border-border2">
              <textarea
                className="border-0 bg-transparent outline-none w-full resize-y leading-[1.8] text-[13px] min-h-[80px]"
                placeholder="Appunti su questo punto..."
                value={rows[i]?.note || ''}
                onChange={e => handleChange(i, 'note', e.target.value)}
              />
            </div>,
          ])}
        </div>
      </div>

      {/* Block 02 — Summary */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2.5 mb-2.5">
          <span
            className="font-mono text-[11px] font-medium tracking-[0.1em] w-7 flex-shrink-0"
            style={{ color }}
          >
            02
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
            Riepilogo finale
          </span>
          <span className="text-[11px] text-ink3 ml-auto italic">
            In 4-6 frasi, tutto l'essenziale
          </span>
        </div>
        <div className="border border-border bg-bg2 px-4 py-3.5">
          <textarea
            className="w-full border-0 bg-transparent outline-none resize-y leading-[1.8] text-[13px] min-h-[90px]"
            placeholder="Scrivi qui il riepilogo dell'intera sessione di appunti..."
            value={data.summary || ''}
            onChange={e => setData(prev => ({ ...prev, summary: e.target.value }))}
          />
        </div>
      </div>
    </>
  )
}
