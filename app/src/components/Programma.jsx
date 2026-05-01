import { useState, useEffect } from 'react'

const PROGRAMMA = [
  {
    id: 'italiano',
    materia: 'Italiano — Letteratura',
    colore: '#6b4f3a',
    argomenti: [
      'Positivismo e Naturalismo — Zola, Verga, introduzione al Realismo',
      'Baudelaire — L\'albatro, figura del poeta nella modernità',
      'Pascoli — Il fanciullino, X Agosto, Tuono, Lampo, Temporale',
      'Estetismo — D\'Annunzio, Il piacere',
      'D\'Annunzio — La pioggia nel pineto',
      'Introduzione al Novecento',
      'La figura dell\'inetto — Svevo e Pirandello',
      'Svevo — La coscienza di Zeno, monologo interiore',
      'Pirandello — Il fu Mattia Pascal, Uno nessuno centomila, Il gioco delle parti, teatro dell\'assurdo',
      'Come fare un testo argomentativo',
      'Simulazione Prima Prova',
    ],
  },
  {
    id: 'storia',
    materia: 'Storia',
    colore: '#2a4a6b',
    argomenti: [
      'Unificazione italiana, Destra e Sinistra storica',
      'Età giolittiana',
      'Società di massa, alienazione, Marx, ideologie politiche del \'900',
      'Prima Guerra Mondiale — cause, fasi, ingresso Italia, conclusione',
      'Rivoluzione Russa',
      'Dopoguerra e crisi delle democrazie',
      'Fascismo in Italia — leggi fascistissime, svolta dittatoriale, Patti Lateranensi',
      'Hitler — ascesa al potere',
      'Crisi del \'29 e conseguenze',
      'Seconda Guerra Mondiale — fasi, liberazione',
      'Secondo dopoguerra',
    ],
  },
  {
    id: 'econaziendale',
    materia: 'Economia Aziendale',
    colore: '#2a5a3a',
    argomenti: [
      'Riclassificazione Stato Patrimoniale (civilistico e riclassificato)',
      'Ricostruzione SP civilistico dal riclassificato',
      'Conto Economico',
      'Analisi per indici e per flussi',
      'Rendiconto Finanziario — variazione PCN, flussi di liquidità',
      'Bilancio con dati a scelta a stati comparati',
      'Bilancio fiscale',
      'Reddito fiscale — ammortamenti, spese manutenzione, leasing',
      'Reddito fiscale — svalutazione crediti e perdite su crediti',
      'Nota Integrativa',
      'Valutazione rimanenze, liquidazione imposte',
      'Simulazione Seconda Prova',
    ],
  },
  {
    id: 'econpolitica',
    materia: 'Economia Politica',
    colore: '#4a2a6b',
    argomenti: [
      'Classificazione imposte — dirette/indirette, reali/personali, progressive/regressive',
      'Differenza tra imposte, tasse e contributi',
      'IRPEF — aliquote, scaglioni, deduzioni e detrazioni',
      'Evasione, elusione, erosione, rimozione fiscale',
      'Differenza aliquota legale ed effettiva',
      'IVA e altre imposte indirette',
      'Spesa pubblica e bilancio dello Stato',
      'Traslazione e ammortamento fiscale',
      'Unione Europea e UEM',
    ],
  },
  {
    id: 'diritto',
    materia: 'Diritto',
    colore: '#6b2a2a',
    argomenti: [
      'Elementi costitutivi dello Stato — popolo, territorio, sovranità',
      'Nascita della Repubblica Italiana',
      'Forme di Stato — totalitario vs Repubblica',
      'Forme di Governo',
      'Costituzione italiana — democrazia diretta e indiretta',
      'Referendum',
      'Riforma Costituzionale',
      'Parlamento — struttura e funzioni',
      'Presidente della Repubblica',
      'Il Governo',
    ],
  },
  {
    id: 'spagnolo',
    materia: 'Spagnolo',
    colore: '#6b5a2a',
    argomenti: [
      'Entidades financieras — bancos, cajas de ahorros, bancos online',
      'Instituciones económicas internazionales — FMI, Banco Mundial, OMC',
      'Economía mundial — BRICS, PIIGS, G7, G8, G20',
      'La Globalización — pros y contras, lessico specifico',
      'Incoterms — vocabulario ed esercizi',
      'Comercialización — testi e domande',
      'Unidad 7 completa',
    ],
  },
  {
    id: 'inglese',
    materia: 'Inglese',
    colore: '#1a5a5a',
    argomenti: [
      'Business communication — email, telefonate formali, customer service',
      'Production process e fattori di produzione — supply chain',
      'Business organisations — settore pubblico e privato',
      'Economic systems',
      'Globalisation — definizione, pros & cons',
      'World Trade — imports/exports, WTO, BOP',
      'Logistics — tipi di trasporto',
      'Energy crisis — cause e impatto sul commercio',
      'Sellers contracts — Letter of Enquiry',
      'Climate Change & Sustainability',
      'Fair Trade',
      'Recruitment — CV, lettera di candidatura',
      'Marketing — 4Ps, 4Cs, segmentazione, product life cycle',
    ],
  },
  {
    id: 'matematica',
    materia: 'Matematica',
    colore: '#2a4a2a',
    argomenti: [
      'Capitalizzazione, interesse e sconto — prerequisiti',
      'Rendite — montante e valore attuale, anticipate e posticipate',
      'Problemi inversi sulle rendite',
      'TAN, TAE e TAEG',
      'Criterio REA — Reddito Equivalente Attuale',
      'Criterio TIR — Tasso Interno di Rendimento',
      'Esercizi su TIR e REA',
      'Piani di ammortamento — ammortamento francese',
    ],
  },
]

const LS_KEY = 'studio_programma_done'
const PROPOSAL_KEY = 'studio_programma_proposal_index'

const CHALLENGES = [
  {
    label: 'Challenge 25 minuti',
    task: 'Studia il nucleo dell\'argomento, poi chiudi tutto e scrivi 6 righe senza guardare.',
    improve: 'Alla fine evidenzia il punto piu debole e trasformalo in una domanda secca.',
  },
  {
    label: 'Active recall',
    task: 'Prepara 5 domande possibili da interrogazione o verifica e rispondi a voce.',
    improve: 'Segna una risposta incompleta e rifalla usando parole piu precise.',
  },
  {
    label: 'Collegamento',
    task: 'Trova 2 collegamenti con argomenti gia studiati o con un\'altra materia.',
    improve: 'Rendi almeno un collegamento spiegabile in meno di 40 secondi.',
  },
  {
    label: 'Mini verifica',
    task: 'Fai uno schema essenziale: definizione, causa, conseguenza, esempio.',
    improve: 'Togli il superfluo e lascia solo cio che useresti davvero in prova.',
  },
]

function loadDone() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveDone(done) {
  localStorage.setItem(LS_KEY, JSON.stringify(done))
}

function loadProposalIndex() {
  const value = Number(localStorage.getItem(PROPOSAL_KEY) || 0)
  return Number.isFinite(value) ? value : 0
}

function saveProposalIndex(index) {
  localStorage.setItem(PROPOSAL_KEY, String(index))
}

export default function Programma() {
  const [done, setDone] = useState(loadDone)
  const [proposalIndex, setProposalIndex] = useState(loadProposalIndex)
  const [open, setOpen] = useState(() => {
    const initial = {}
    PROGRAMMA.forEach(m => { initial[m.id] = true })
    return initial
  })

  useEffect(() => { saveDone(done) }, [done])
  useEffect(() => { saveProposalIndex(proposalIndex) }, [proposalIndex])

  function toggleDone(materiaId, idx) {
    const key = `${materiaId}_${idx}`
    setDone(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function toggleSezione(id) {
    setOpen(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function goToNextProposal() {
    setProposalIndex(prev => prev + 1)
  }

  function markProposalDone(proposal) {
    if (!proposal) return
    setDone(prev => ({ ...prev, [proposal.key]: true }))
    setProposalIndex(prev => prev + 1)
  }

  const totalArgomenti = PROGRAMMA.reduce((acc, m) => acc + m.argomenti.length, 0)
  const totalDone = PROGRAMMA.reduce(
    (acc, m) => acc + m.argomenti.filter((_, i) => done[`${m.id}_${i}`]).length,
    0
  )
  const pct = totalArgomenti > 0 ? Math.round((totalDone / totalArgomenti) * 100) : 0
  const pendingTopics = PROGRAMMA.flatMap(materia =>
    materia.argomenti
      .map((argomento, index) => ({
        materia,
        argomento,
        index,
        key: `${materia.id}_${index}`,
      }))
      .filter(item => !done[item.key])
  )
  const proposal = pendingTopics.length > 0
    ? pendingTopics[proposalIndex % pendingTopics.length]
    : null
  const challenge = proposal
    ? CHALLENGES[(proposalIndex + totalDone) % CHALLENGES.length]
    : null

  return (
    <div className="max-w-[860px] mx-auto px-7 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-ink3 mb-2">
          Esame di Stato 2026
        </div>
        <h1 className="font-serif text-[36px] font-semibold leading-[1.15] mb-4">
          Programma
        </h1>
        {/* Progress bar */}
        <div className="flex items-center gap-4 mb-1">
          <div className="flex-1 h-[3px] bg-border relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-ink transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="font-mono text-[11px] text-ink3 flex-shrink-0">
            {totalDone}/{totalArgomenti} — {pct}%
          </span>
        </div>
        <p className="text-[12px] text-ink3">
          Spunta gli argomenti man mano che li studi. Il progresso si salva automaticamente.
        </p>
      </div>

      {/* Proposta studio */}
      <div
        className="bg-app-white border border-border mb-8 overflow-hidden"
        style={{ borderTopColor: proposal?.materia.colore || '#18160f', borderTopWidth: 3 }}
      >
        {proposal && challenge ? (
          <div className="px-6 py-5">
            <div className="flex items-start justify-between gap-5 mb-4">
              <div className="min-w-0">
                <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-ink3 mb-2">
                  Prossima mossa · {challenge.label}
                </div>
                <div className="font-serif text-[22px] font-semibold leading-[1.2] mb-2">
                  {proposal.argomento}
                </div>
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink3">
                  {proposal.materia.materia}
                </div>
              </div>
              <div
                className="flex-shrink-0 font-mono text-[10px] text-app-white px-2.5 py-1"
                style={{ backgroundColor: proposal.materia.colore }}
              >
                #{proposal.index + 1}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
              <div className="border border-border2 bg-bg px-4 py-3">
                <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink3 mb-1.5">
                  Challenge
                </div>
                <div className="text-[12px] leading-[1.6] text-ink2">{challenge.task}</div>
              </div>
              <div className="border border-border2 bg-bg px-4 py-3">
                <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink3 mb-1.5">
                  Miglioramento iterativo
                </div>
                <div className="text-[12px] leading-[1.6] text-ink2">{challenge.improve}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                className="border border-ink bg-ink text-app-white px-4 py-2 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors"
                onClick={() => markProposalDone(proposal)}
              >
                Segna fatto
              </button>
              <button
                className="border border-border bg-transparent px-4 py-2 font-mono text-[10px] tracking-[0.15em] uppercase text-ink2 hover:border-ink hover:text-ink hover:bg-bg transition-all"
                onClick={goToNextProposal}
              >
                Altra proposta
              </button>
              <button
                className="border border-border bg-transparent px-4 py-2 font-mono text-[10px] tracking-[0.15em] uppercase text-ink2 hover:border-ink hover:text-ink hover:bg-bg transition-all"
                onClick={() => setOpen(prev => ({ ...prev, [proposal.materia.id]: true }))}
              >
                Apri materia
              </button>
            </div>
          </div>
        ) : (
          <div className="px-6 py-5">
            <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-ink3 mb-2">
              Prossima mossa
            </div>
            <div className="font-serif text-[22px] font-semibold leading-[1.2] mb-2">
              Programma completato
            </div>
            <p className="text-[12px] text-ink3 leading-[1.6]">
              Ora usa la libreria per ripassare le sessioni salvate e rifinire gli argomenti piu fragili.
            </p>
          </div>
        )}
      </div>

      {/* Materie */}
      <div className="flex flex-col gap-3">
        {PROGRAMMA.map(materia => {
          const doneCount = materia.argomenti.filter((_, i) => done[`${materia.id}_${i}`]).length
          const isOpen = open[materia.id]

          return (
            <div
              key={materia.id}
              className="bg-app-white border border-border overflow-hidden"
              style={{ borderLeftColor: materia.colore, borderLeftWidth: 3 }}
            >
              {/* Header sezione */}
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left bg-transparent border-0 hover:bg-bg transition-colors"
                onClick={() => toggleSezione(materia.id)}
              >
                <div className="flex items-center gap-4">
                  <span className="font-serif text-[16px] font-semibold">{materia.materia}</span>
                  <span className="font-mono text-[10px] text-ink3 tracking-[0.1em]">
                    {doneCount}/{materia.argomenti.length}
                  </span>
                </div>
                <span
                  className="font-mono text-[12px] text-ink3 transition-transform duration-200"
                  style={{ display: 'inline-block', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                >
                  ›
                </span>
              </button>

              {/* Argomenti */}
              {isOpen && (
                <div className="border-t border-border">
                  {materia.argomenti.map((arg, i) => {
                    const key = `${materia.id}_${i}`
                    const isDone = !!done[key]
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-3.5 px-6 py-2.5 border-b border-border last:border-b-0 cursor-pointer hover:bg-bg transition-colors"
                        onClick={() => toggleDone(materia.id, i)}
                      >
                        {/* Checkbox */}
                        <div
                          className="flex-shrink-0 mt-[2px] w-[14px] h-[14px] border flex items-center justify-center transition-all"
                          style={{
                            borderColor: isDone ? materia.colore : '#d0cdc5',
                            backgroundColor: isDone ? materia.colore : 'transparent',
                          }}
                        >
                          {isDone && (
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                              <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <span
                          className="text-[13px] leading-[1.6]"
                          style={{
                            color: isDone ? '#a09d95' : '#18160f',
                            textDecoration: isDone ? 'line-through' : 'none',
                          }}
                        >
                          {arg}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer nota */}
      <div className="mt-10 font-mono text-[10px] text-ink3 text-center">
        {pct === 100
          ? 'Tutto fatto. In bocca al lupo.'
          : `${totalArgomenti - totalDone} argomenti rimanenti`}
      </div>
    </div>
  )
}
