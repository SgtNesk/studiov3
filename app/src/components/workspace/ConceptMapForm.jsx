export default function ConceptMapForm({ data, setData, color }) {
  const branches = data.branches || []

  function setBranch(i, field, value) {
    setData(prev => {
      const newBranches = [...(prev.branches || [])]
      newBranches[i] = { ...newBranches[i], [field]: value }
      return { ...prev, branches: newBranches }
    })
  }

  function addBranch() {
    setData(prev => ({
      ...prev,
      branches: [...(prev.branches || []), { main: '', sub: '' }],
    }))
  }

  return (
    <>
      {/* Block 01 — Central concept */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2.5 mb-2.5">
          <span
            className="font-mono text-[11px] font-medium tracking-[0.1em] w-7 flex-shrink-0"
            style={{ color }}
          >
            01
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
            Concetto centrale
          </span>
        </div>
        <textarea
          className="w-full border border-border2 bg-app-white px-4 py-3.5 resize-y outline-none leading-[1.8] text-[13px] transition-colors cc-focus min-h-[90px]"
          placeholder="Definisci il concetto centrale in 1-2 frasi."
          value={data.center || ''}
          onChange={e => setData(prev => ({ ...prev, center: e.target.value }))}
        />
      </div>

      {/* Block 02 — Branches */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2.5 mb-2.5">
          <span
            className="font-mono text-[11px] font-medium tracking-[0.1em] w-7 flex-shrink-0"
            style={{ color }}
          >
            02
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
            Rami principali
          </span>
          <span className="text-[11px] text-ink3 ml-auto italic">
            Titolo del ramo + concetti/esempi sotto
          </span>
        </div>

        <div className="flex flex-col gap-2.5 mb-2.5">
          {branches.map((b, i) => (
            <div key={i} className="bg-app-white border border-border overflow-hidden">
              <div className="bg-bg2 px-3.5 py-2.5 border-b border-border flex gap-2.5 items-center">
                <span className="font-mono text-[10px] font-medium" style={{ color }}>
                  Ramo {i + 1}
                </span>
                <input
                  className="border-0 bg-transparent outline-none font-mono text-[11px] font-medium tracking-[0.05em] flex-1"
                  placeholder="Nome del ramo principale..."
                  value={b.main || ''}
                  onChange={e => setBranch(i, 'main', e.target.value)}
                />
              </div>
              <div className="px-3.5 py-2.5">
                <textarea
                  className="border-0 bg-transparent outline-none w-full text-[12px] leading-[1.8] resize-none min-h-[56px]"
                  placeholder="Concetti, esempi, definizioni che appartengono a questo ramo..."
                  value={b.sub || ''}
                  onChange={e => setBranch(i, 'sub', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          className="print-hide border border-dashed border-border bg-transparent w-full py-2.5 text-ink3 font-mono text-[10px] tracking-[0.15em] uppercase cursor-pointer transition-all hover:text-ink"
          onClick={addBranch}
          onMouseEnter={e => (e.currentTarget.style.borderColor = color)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = '#d0cdc5')}
        >
          + Aggiungi ramo
        </button>
      </div>

      {/* Block 03 — Cross-connections */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2.5 mb-2.5">
          <span
            className="font-mono text-[11px] font-medium tracking-[0.1em] w-7 flex-shrink-0"
            style={{ color }}
          >
            03
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
            Connessioni trasversali
          </span>
          <span className="text-[11px] text-ink3 ml-auto italic">
            Dove si collegano rami diversi?
          </span>
        </div>
        <textarea
          className="w-full border border-border2 bg-app-white px-4 py-3.5 resize-y outline-none leading-[1.8] text-[13px] transition-colors cc-focus min-h-[90px]"
          placeholder="es. Il ramo 'Costi' si collega al ramo 'Risultato' attraverso il margine operativo..."
          value={data.links || ''}
          onChange={e => setData(prev => ({ ...prev, links: e.target.value }))}
        />
      </div>
    </>
  )
}
