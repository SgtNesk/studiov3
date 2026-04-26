import { useState } from 'react'
import { getSessions, deleteSession, exportSessionJSON } from '../lib/sessions'
import { countDueCards } from '../lib/sr'
import { METHODS } from '../data/methods'

export default function Library({ onOpen, onExportPDF }) {
  const [sessions, setSessions] = useState(() => getSessions())
  const [filter, setFilter] = useState('all')
  const [confirmDelete, setConfirmDelete] = useState(null)

  function reload() {
    setSessions(getSessions())
  }

  function handleDelete(id) {
    deleteSession(id)
    setConfirmDelete(null)
    reload()
  }

  const filtered =
    filter === 'all' ? sessions : sessions.filter(s => s.methodId === filter)

  const methodCounts = METHODS.reduce((acc, m) => {
    acc[m.id] = sessions.filter(s => s.methodId === m.id).length
    return acc
  }, {})

  const totalDue = sessions.reduce((sum, s) => {
    if (s.methodId !== 'activerecall') return sum
    return sum + countDueCards(s.data?.cards)
  }, 0)

  return (
    <div className="max-w-[900px] mx-auto px-7 py-12 pb-20">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-border">
        <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-ink3 mb-2">
          Sessioni salvate
        </div>
        <div className="flex items-baseline gap-4">
          <h1 className="font-serif text-[28px] font-semibold">Libreria</h1>
          {totalDue > 0 && (
            <span className="font-mono text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 bg-[#1a5a5a] text-white">
              {totalDue} da rivedere oggi
            </span>
          )}
        </div>
        <p className="text-[13px] text-ink3 mt-1.5 leading-[1.7]">
          {sessions.length === 0
            ? 'Nessuna sessione salvata. Inizia a studiare — il lavoro viene salvato automaticamente.'
            : `${sessions.length} session${sessions.length > 1 ? 'i' : 'e'} salvat${sessions.length > 1 ? 'e' : 'a'}.`}
        </p>
      </div>

      {sessions.length > 0 && (
        <>
          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap mb-6">
            <button
              className={`font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 border transition-all ${
                filter === 'all'
                  ? 'bg-ink text-app-white border-ink'
                  : 'border-border text-ink3 hover:border-ink hover:text-ink bg-transparent'
              }`}
              onClick={() => setFilter('all')}
            >
              Tutti ({sessions.length})
            </button>
            {METHODS.filter(m => methodCounts[m.id] > 0).map(m => (
              <button
                key={m.id}
                className="font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 border transition-all"
                style={
                  filter === m.id
                    ? { background: m.color, borderColor: m.color, color: 'white' }
                    : { borderColor: '#d0cdc5', color: '#96938a', background: 'transparent' }
                }
                onMouseEnter={e => {
                  if (filter !== m.id) {
                    e.currentTarget.style.borderColor = '#18160f'
                    e.currentTarget.style.color = '#18160f'
                  }
                }}
                onMouseLeave={e => {
                  if (filter !== m.id) {
                    e.currentTarget.style.borderColor = '#d0cdc5'
                    e.currentTarget.style.color = '#96938a'
                  }
                }}
                onClick={() => setFilter(m.id)}
              >
                {m.name} ({methodCounts[m.id]})
              </button>
            ))}
          </div>

          {/* Sessions list */}
          <div className="flex flex-col gap-3">
            {filtered.length === 0 ? (
              <div className="text-[13px] text-ink3 py-8 text-center font-mono">
                Nessuna sessione per questo metodo.
              </div>
            ) : (
              filtered.map(session => {
                const method = METHODS.find(m => m.id === session.methodId)
                const due =
                  session.methodId === 'activerecall'
                    ? countDueCards(session.data?.cards)
                    : 0

                return (
                  <div
                    key={session.id}
                    className="bg-app-white border border-border overflow-hidden"
                    style={{ borderLeftColor: method?.color || '#18160f', borderLeftWidth: 3 }}
                  >
                    <div className="flex items-center gap-4 px-5 py-4">
                      {/* Method badge */}
                      <div className="flex-shrink-0 hidden sm:block">
                        <div
                          className="font-mono text-[8px] tracking-[0.2em] uppercase"
                          style={{ color: method?.color || '#18160f' }}
                        >
                          {method?.name || session.methodId}
                        </div>
                      </div>

                      {/* Topic + meta */}
                      <div className="flex-1 min-w-0">
                        <div className="font-serif text-[16px] font-semibold truncate">
                          {session.topic || <span className="text-ink3 italic">Senza titolo</span>}
                        </div>
                        <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                          <span className="font-mono text-[10px] text-ink3">
                            {new Date(session.updatedAt).toLocaleDateString('it-IT', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                          {due > 0 && (
                            <span className="font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 bg-[#1a5a5a] text-white">
                              {due} da rivedere
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-1.5 flex-shrink-0 flex-wrap justify-end">
                        <button
                          className="border border-border bg-transparent px-3 py-1.5 font-mono text-[9px] tracking-[0.15em] uppercase text-ink2 hover:border-ink hover:text-ink transition-all"
                          onClick={() => onOpen(session)}
                        >
                          Apri
                        </button>
                        <button
                          className="border border-border bg-transparent px-3 py-1.5 font-mono text-[9px] tracking-[0.15em] uppercase text-ink2 hover:border-ink hover:text-ink transition-all"
                          onClick={() => onExportPDF(session)}
                        >
                          PDF
                        </button>
                        <button
                          className="border border-border bg-transparent px-3 py-1.5 font-mono text-[9px] tracking-[0.15em] uppercase text-ink2 hover:border-ink hover:text-ink transition-all"
                          onClick={() => exportSessionJSON(session)}
                        >
                          JSON
                        </button>
                        {confirmDelete === session.id ? (
                          <>
                            <button
                              className="border border-red-400 bg-red-500 text-white px-3 py-1.5 font-mono text-[9px] tracking-[0.15em] uppercase transition-all"
                              onClick={() => handleDelete(session.id)}
                            >
                              Sì, elimina
                            </button>
                            <button
                              className="border border-border bg-transparent px-3 py-1.5 font-mono text-[9px] tracking-[0.15em] uppercase text-ink3 hover:border-ink hover:text-ink transition-all"
                              onClick={() => setConfirmDelete(null)}
                            >
                              No
                            </button>
                          </>
                        ) : (
                          <button
                            className="border border-border bg-transparent px-3 py-1.5 font-mono text-[9px] tracking-[0.15em] uppercase text-ink3 hover:border-red-400 hover:text-red-500 transition-all"
                            onClick={() => setConfirmDelete(session.id)}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </>
      )}
    </div>
  )
}
