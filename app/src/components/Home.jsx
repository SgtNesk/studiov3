import { getSessions } from '../lib/sessions'
import { countDueCards } from '../lib/sr'
import { METHODS } from '../data/methods'

export default function Home({ methods, onMethodClick, onGuideClick, onApiKeyClick, onLibraryClick }) {
  const recentSessions = getSessions().slice(0, 4)

  return (
    <div className="max-w-[1040px] mx-auto px-7 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-[36px] font-semibold leading-[1.15] mb-2.5">
          Metodi di Studio
        </h1>
        <p className="text-ink3 text-[13px] leading-[1.7] max-w-[560px]">
          6 metodi didattici dalle migliori università al mondo — Feynman, Cornell, Oxford, Harvard.
          Scegli il metodo, studia l'argomento, ottieni feedback AI, esporta il PDF.
          <br />
          <br />
          Per l'AI: imposta la tua{' '}
          <button
            className="text-ink2 underline cursor-pointer bg-transparent border-0 p-0 text-[13px] font-sans"
            onClick={onApiKeyClick}
          >
            Anthropic API Key
          </button>
          .
        </p>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {/* Guide card — full width */}
        <div
          className="method-card bg-app-white border border-border cursor-pointer transition-all hover:-translate-y-[1px] hover:shadow-[0_4px_16px_rgba(0,0,0,.06)] flex justify-between items-center px-6 py-5 col-span-3"
          style={{ '--card-color': '#333' }}
          onClick={onGuideClick}
        >
          <div>
            <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-ink3 mb-2">
              Come funziona tutto · Esempio completo
            </div>
            <div className="font-serif text-[17px] font-semibold mb-1.5">
              Guida all'uso — tutti i metodi spiegati e compilati
            </div>
            <div className="text-[12px] text-ink2 italic leading-[1.5]">
              Vedi ogni metodo compilato sul ciclo dell'acqua, con annotazioni su cosa scrivere,
              perché, e cosa fa l'AI.
            </div>
          </div>
          <div className="text-[22px] text-border flex-shrink-0 ml-5">→</div>
        </div>

        {/* Method cards */}
        {methods.map(m => (
          <div
            key={m.id}
            className="method-card bg-app-white border border-border p-6 cursor-pointer transition-all hover:-translate-y-[1px] hover:shadow-[0_4px_16px_rgba(0,0,0,.06)]"
            style={{ '--card-color': m.color }}
            onClick={() => onMethodClick(m.id)}
          >
            <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-ink3 mb-2">
              {m.origin}
            </div>
            <div className="font-serif text-[20px] font-semibold mb-1.5">{m.name}</div>
            <div className="text-[12px] text-ink2 leading-[1.5] mb-3.5 italic">{m.tagline}</div>
            <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink3 mb-1">
              Quando usarlo
            </div>
            <div className="text-[11px] text-ink3 leading-[1.5]">{m.when}</div>
          </div>
        ))}
      </div>

      {/* Recent sessions */}
      {recentSessions.length > 0 && (
        <div className="mt-14">
          <div className="flex items-baseline justify-between mb-4">
            <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-ink3">
              Sessioni recenti
            </div>
            <button
              className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink3 hover:text-ink transition-colors bg-transparent border-0 p-0 cursor-pointer"
              onClick={onLibraryClick}
            >
              Libreria completa →
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {recentSessions.map(session => {
              const method = METHODS.find(m => m.id === session.methodId)
              const due =
                session.methodId === 'activerecall'
                  ? countDueCards(session.data?.cards)
                  : 0
              return (
                <div
                  key={session.id}
                  className="bg-app-white border border-border flex items-center gap-4 px-5 py-3 cursor-pointer hover:border-ink transition-colors"
                  style={{ borderLeftColor: method?.color, borderLeftWidth: 3 }}
                  onClick={() => onMethodClick(session.methodId)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-[14px] font-semibold truncate">
                      {session.topic || <span className="text-ink3 italic">Senza titolo</span>}
                    </div>
                    <div className="font-mono text-[9px] text-ink3 mt-0.5">
                      {method?.name} ·{' '}
                      {new Date(session.updatedAt).toLocaleDateString('it-IT', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                  {due > 0 && (
                    <span className="font-mono text-[8px] tracking-[0.1em] uppercase px-2 py-0.5 bg-[#1a5a5a] text-white flex-shrink-0">
                      {due} da rivedere
                    </span>
                  )}
                  <div className="text-ink3 text-[16px] flex-shrink-0">→</div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Responsive for smaller screens */}
      <style>{`
        @media (max-width: 720px) {
          .methods-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  )
}
