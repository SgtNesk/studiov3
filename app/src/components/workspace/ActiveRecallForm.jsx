export default function ActiveRecallForm({ data, setData, color }) {
  const cards = data.cards || []

  function setCard(i, field, value) {
    setData(prev => {
      const newCards = [...(prev.cards || [])]
      newCards[i] = { ...newCards[i], [field]: value }
      return { ...prev, cards: newCards }
    })
  }

  function setConf(i, n) {
    setData(prev => {
      const newCards = [...(prev.cards || [])]
      newCards[i] = { ...newCards[i], conf: n }
      return { ...prev, cards: newCards }
    })
  }

  function addCard() {
    setData(prev => ({
      ...prev,
      cards: [...(prev.cards || []), { q: '', a: '', conf: 0 }],
    }))
  }

  return (
    <>
      {/* Block 01 — Base notes */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2.5 mb-2.5">
          <span
            className="font-mono text-[11px] font-medium tracking-[0.1em] w-7 flex-shrink-0"
            style={{ color }}
          >
            01
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
            Note di base
          </span>
          <span className="text-[11px] text-ink3 ml-auto italic">Breve overview dell'argomento</span>
        </div>
        <textarea
          className="w-full border border-border2 bg-app-white px-4 py-3.5 resize-y outline-none leading-[1.8] text-[13px] transition-colors cc-focus min-h-[90px]"
          placeholder="Scrivi una breve panoramica dell'argomento (opzionale — serve all'AI per generare domande migliori)."
          value={data.notes || ''}
          onChange={e => setData(prev => ({ ...prev, notes: e.target.value }))}
        />
      </div>

      {/* Block 02 — Flashcards */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2.5 mb-2.5">
          <span
            className="font-mono text-[11px] font-medium tracking-[0.1em] w-7 flex-shrink-0"
            style={{ color }}
          >
            02
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
            Domande & Risposte
          </span>
          <span className="text-[11px] text-ink3 ml-auto italic">Conf. = quanto sei sicuro (1-5)</span>
        </div>

        <div className="flex flex-col gap-2.5 mb-2.5">
          {cards.map((card, i) => (
            <div key={i} className="border border-border bg-app-white overflow-hidden">
              <div
                className="grid"
                style={{ gridTemplateColumns: '1fr 1fr 80px' }}
              >
                <div className="px-3.5 py-2.5 border-r border-border2">
                  <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink3 mb-1.5">
                    Domanda
                  </div>
                  <textarea
                    className="border-0 bg-transparent outline-none w-full text-[12px] leading-[1.6] resize-none min-h-[48px]"
                    placeholder="Cosa succede quando...? Definisci...? Qual è la differenza tra...?"
                    value={card.q || ''}
                    onChange={e => setCard(i, 'q', e.target.value)}
                  />
                </div>
                <div className="px-3.5 py-2.5 border-r border-border2">
                  <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink3 mb-1.5">
                    Risposta
                  </div>
                  <textarea
                    className="border-0 bg-transparent outline-none w-full text-[12px] leading-[1.6] resize-none min-h-[48px]"
                    placeholder="Risposta completa..."
                    value={card.a || ''}
                    onChange={e => setCard(i, 'a', e.target.value)}
                  />
                </div>
                <div className="px-3.5 py-2.5 flex flex-col items-start">
                  <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink3 mb-1.5">
                    Conf.
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        className="w-5 h-5 border border-border2 bg-transparent text-[10px] cursor-pointer transition-all"
                        style={
                          card.conf >= n
                            ? { background: color, color: 'white', borderColor: color }
                            : {}
                        }
                        onClick={() => setConf(i, n)}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="print-hide border border-dashed border-border bg-transparent w-full py-2.5 text-ink3 font-mono text-[10px] tracking-[0.15em] uppercase cursor-pointer transition-all hover:text-ink"
          onClick={addCard}
          onMouseEnter={e => (e.currentTarget.style.borderColor = color)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = '#d0cdc5')}
        >
          + Aggiungi domanda
        </button>
      </div>
    </>
  )
}
