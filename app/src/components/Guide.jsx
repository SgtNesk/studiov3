import { GUIDE_DATA, GUIDE_TOPIC } from '../data/methods'

/* ── Helper components ── */

function GuideStep({ num, label, why, content, annotation, color }) {
  return (
    <div className="mb-[22px]">
      <div className="flex items-baseline gap-2.5 mb-2">
        <span className="font-mono text-[11px] font-medium w-7 gm-color-text" style={{ color }}>
          {num}
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
          {label}
        </span>
        {why && (
          <span
            className="ml-auto text-[10px] text-ink3 italic bg-bg2 px-2 py-0.5 border-l-2"
            style={{ borderLeftColor: color }}
          >
            {why}
          </span>
        )}
      </div>
      <div className="bg-bg2 border border-border px-4 py-3.5 text-[13px] leading-[1.85] text-ink2 whitespace-pre-wrap">
        {content}
      </div>
      {annotation && (
        <div className="mt-1.5 text-[11px] text-ink3 italic leading-[1.6] pl-1 border-l-2 border-border2">
          {annotation}
        </div>
      )}
    </div>
  )
}

function GuideAIBox({ desc }) {
  return (
    <div className="bg-bg3 border border-border px-4 py-3.5 mt-2">
      <div className="font-mono text-[8px] tracking-[0.25em] uppercase text-ink3 mb-1.5">
        Cosa fa l'AI su questo metodo
      </div>
      <div className="text-[12px] text-ink2 leading-[1.7]">{desc}</div>
    </div>
  )
}

function GuideMethod({ method, color, children, onUseNow }) {
  return (
    <div
      className="gm-has-color mb-[52px] border border-border bg-app-white overflow-hidden"
      style={{ '--gm-color': color }}
    >
      <div
        className="px-7 py-5 flex justify-between items-start border-b-2 border-border"
        style={{ borderBottomColor: color }}
      >
        <div>
          <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-ink3 mb-1.5">
            {method.origin}
          </div>
          <div className="font-serif text-[22px] font-semibold">{method.name}</div>
          <div className="text-[12px] text-ink3 italic mt-1">{method.tagline}</div>
        </div>
        <div className="flex-shrink-0 ml-4">
          <div
            className="text-white px-3 py-1 font-mono text-[9px] tracking-[0.15em] uppercase"
            style={{ backgroundColor: color }}
          >
            Quando: {method.when}
          </div>
          <button
            className="border border-border bg-transparent mt-2 w-full px-3.5 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-ink2 hover:border-ink hover:text-ink hover:bg-bg transition-all"
            onClick={() => onUseNow(method.id)}
          >
            Usa ora →
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}

/* ── Main Guide component ── */

export default function Guide({ methods, onMethodClick, onGoHome }) {
  const getMethod = id => methods.find(m => m.id === id)

  return (
    <div className="max-w-[980px] mx-auto px-7 py-10 pb-20">
      {/* Header */}
      <div className="mb-11">
        <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-ink3 mb-2.5">
          Come usare ogni metodo — guida pratica
        </div>
        <h1 className="font-serif text-[34px] font-semibold leading-[1.2] mb-2.5">
          Vedi come funziona,
          <br />
          poi applicalo ai tuoi argomenti.
        </h1>
        <p className="text-[13px] text-ink2 leading-[1.8] max-w-[620px]">
          Ogni metodo è mostrato completamente compilato su un argomento semplice. Leggi cosa va
          scritto in ogni campo, perché va scritto così, e cosa fa l'AI sopra.
        </p>
        <div className="inline-flex items-center gap-2 bg-bg3 border border-border px-3.5 py-1.5 mt-4">
          <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-ink3">
            Argomento esempio
          </span>
          <span className="text-border mx-1.5">·</span>
          <span className="font-serif text-[14px] font-semibold">{GUIDE_TOPIC}</span>
        </div>
      </div>

      {/* 1 — FEYNMAN */}
      <GuideMethod
        method={getMethod('feynman')}
        color="#1a3a6b"
        onUseNow={onMethodClick}
      >
        <div className="bg-bg2 border-b border-border px-7 py-3.5 text-[12px] text-ink2 leading-[1.7]">
          <strong className="font-medium" style={{ color: '#1a3a6b' }}>Come si usa:</strong>{' '}
          Prima scrivi senza guardare nulla. Poi identifichi dove ti sei bloccato. Poi torni alla
          fonte, colmi i vuoti, e riscrivi. Il test finale: puoi spiegarlo senza inciampare?
        </div>
        <div className="px-7 py-6">
          <GuideStep
            num="01"
            label="Spiega semplicemente"
            why="→ scrivi senza termini tecnici, come se parlassi a un ragazzo di 12 anni"
            content={GUIDE_DATA.feynman.s1}
            annotation={GUIDE_DATA.feynman.s1why}
            color="#1a3a6b"
          />
          <GuideStep
            num="02"
            label="Identifica i vuoti"
            why="→ dove ti sei bloccato? cosa non hai saputo spiegare?"
            content={GUIDE_DATA.feynman.s2}
            annotation={GUIDE_DATA.feynman.s2why}
            color="#1a3a6b"
          />
          <GuideStep
            num="03"
            label="Versione raffinata"
            why="→ dopo aver studiato i vuoti, riscrivi tutto correttamente"
            content={GUIDE_DATA.feynman.s3}
            annotation={GUIDE_DATA.feynman.s3why}
            color="#1a3a6b"
          />
          <GuideAIBox desc="L'AI legge la tua spiegazione semplice, identifica le lacune reali con precisione, e ti fa domande Socratiche per ogni lacuna — così arrivi alla risposta da solo invece di leggerla passivamente." />
        </div>
      </GuideMethod>

      {/* 2 — CORNELL */}
      <GuideMethod
        method={getMethod('cornell')}
        color="#7a1e1e"
        onUseNow={onMethodClick}
      >
        <div className="bg-bg2 border-b border-border px-7 py-3.5 text-[12px] text-ink2 leading-[1.7]">
          <strong className="font-medium" style={{ color: '#7a1e1e' }}>Come si usa:</strong>{' '}
          Mentre studi, scrivi a destra gli appunti completi. Poi — subito dopo — scrivi a sinistra
          le domande che sintetizzano ogni blocco. In basso il riepilogo. Per ripetere, copri la
          colonna destra e rispondi alle domande.
        </div>
        <div className="px-7 py-6">
          <div className="mb-[22px]">
            <div className="flex items-baseline gap-2.5 mb-2">
              <span className="font-mono text-[11px] font-medium w-7" style={{ color: '#7a1e1e' }}>
                01
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
                Domande-cue + Appunti
              </span>
              <span
                className="ml-auto text-[10px] text-ink3 italic bg-bg2 px-2 py-0.5 border-l-2"
                style={{ borderLeftColor: '#7a1e1e' }}
              >
                → la colonna sinistra diventa il tuo quiz di revisione
              </span>
            </div>
            {/* Cornell demo table */}
            <div className="border border-border overflow-hidden">
              <div
                className="grid bg-bg3 border-b border-border"
                style={{ gridTemplateColumns: '200px 1fr' }}
              >
                <div className="px-4 py-2 border-r border-border font-mono text-[8px] tracking-[0.2em] uppercase text-ink3">
                  Cue / Domanda (sinistra)
                </div>
                <div className="px-4 py-2 font-mono text-[8px] tracking-[0.2em] uppercase text-ink3">
                  Appunti (destra)
                </div>
              </div>
              {GUIDE_DATA.cornell.rows.map((r, i) => (
                <div
                  key={i}
                  className="grid border-b border-border2 last:border-b-0"
                  style={{ gridTemplateColumns: '200px 1fr' }}
                >
                  <div className="px-4 py-2.5 bg-bg2 border-r border-border text-[12px] italic leading-[1.5]" style={{ color: '#7a1e1e' }}>
                    {r.cue}
                  </div>
                  <div className="px-4 py-2.5 text-[12px] text-ink2 leading-[1.6]">{r.note}</div>
                </div>
              ))}
            </div>
            <div className="mt-1.5 text-[11px] text-ink3 italic leading-[1.6] pl-1 border-l-2 border-border2">
              La colonna sinistra deve contenere domande brevi e incisive, non riassunti. Serviranno
              a interrogarti: copri la destra, leggi la domanda, rispondi a mente, scopri.
            </div>
          </div>

          <GuideStep
            num="02"
            label="Riepilogo finale"
            why="→ 4-6 frasi che catturano tutto l'essenziale"
            content={GUIDE_DATA.cornell.summary}
            annotation="Il riepilogo si scrive a mente, dopo aver preso gli appunti. Non copia gli appunti — sintetizza. Se non riesci a scriverlo, non hai ancora capito la struttura dell'argomento."
            color="#7a1e1e"
          />
          <GuideAIBox desc="L'AI genera le domande-cue automaticamente dagli appunti. Utile quando hai fretta o quando vuoi domande più profonde di quelle che ti vengono in mente. Ti dà anche il riepilogo e le connessioni con altri argomenti." />
        </div>
      </GuideMethod>

      {/* 3 — BLURTING */}
      <GuideMethod
        method={getMethod('blurting')}
        color="#2a6b3a"
        onUseNow={onMethodClick}
      >
        <div className="bg-bg2 border-b border-border px-7 py-3.5 text-[12px] text-ink2 leading-[1.7]">
          <strong className="font-medium" style={{ color: '#2a6b3a' }}>Come si usa:</strong>{' '}
          Chiudi tutto. Cronometrati (5-10 min). Scrivi tutto quello che ricordi senza fermarti. Poi
          apri il libro e confronta. Studia SOLO i vuoti trovati. Ripeti finché il blurt è completo.
        </div>
        <div className="px-7 py-6">
          <GuideStep
            num="01"
            label="Blurt — scarica tutto"
            why="→ libro chiuso, senza fermarti, anche disordinato"
            content={GUIDE_DATA.blurting.b1}
            annotation={GUIDE_DATA.blurting.b1why}
            color="#2a6b3a"
          />
          <GuideStep
            num="02"
            label="Lacune identificate"
            why="→ dopo aver confrontato con la fonte"
            content={GUIDE_DATA.blurting.b2}
            annotation={GUIDE_DATA.blurting.b2why}
            color="#2a6b3a"
          />
          <GuideStep
            num="03"
            label="Correzione e completamento"
            why="→ scrivi le parti mancanti correttamente"
            content={GUIDE_DATA.blurting.b3}
            annotation=""
            color="#2a6b3a"
          />
          <GuideAIBox desc="L'AI confronta il tuo blurt con la conoscenza standard dell'argomento. Lista ciò che è corretto, ciò che manca, ciò che è sbagliato. Ti dà un punteggio di completezza 1-10. Utile per capire quanto sei davvero pronto." />
        </div>
      </GuideMethod>

      {/* 4 — CASE METHOD */}
      <GuideMethod
        method={getMethod('casestudy')}
        color="#5a3000"
        onUseNow={onMethodClick}
      >
        <div className="bg-bg2 border-b border-border px-7 py-3.5 text-[12px] text-ink2 leading-[1.7]">
          <strong className="font-medium" style={{ color: '#5a3000' }}>Come si usa:</strong>{' '}
          Costruisci un caso reale attorno al concetto. Non spiegarlo in astratto — applicalo a una
          situazione concreta, analizza da più angoli, proponi una soluzione difendibile. HBS usa
          questo metodo perché l'applicazione è l'unica vera prova della comprensione.
        </div>
        <div className="px-7 py-6">
          <GuideStep num="01" label="Situazione" why="→ chi, cosa, dove, quando, dati rilevanti" content={GUIDE_DATA.casestudy.c1} annotation="Più il contesto è specifico, più l'analisi diventa reale. Numeri concreti, non vaghe generalizzazioni." color="#5a3000" />
          <GuideStep num="02" label="Problema centrale" why="→ la domanda precisa, formulata in una frase" content={GUIDE_DATA.casestudy.c2} annotation="La formulazione del problema è già metà dell'analisi. Se il problema è vago, l'analisi sarà vaga." color="#5a3000" />
          <GuideStep num="03" label="Analisi" why="→ almeno 2-3 angolazioni diverse, con pro/contro" content={GUIDE_DATA.casestudy.c3} annotation="Il metodo HBS richiede di considerare domanda E offerta, breve E lungo termine, costi E benefici. Mai un'unica prospettiva." color="#5a3000" />
          <GuideStep num="04" label="Soluzione motivata" why="→ la tua risposta difendibile, con i rischi residui" content={GUIDE_DATA.casestudy.c4} annotation='"Difendibile" significa che potresti argomentarla in aula. Non è la soluzione perfetta — è la migliore disponibile con i vincoli dati.' color="#5a3000" />
          <GuideStep num="05" label="Principio estratto" why="→ la lezione generalizzabile a casi simili" content={GUIDE_DATA.casestudy.c5} annotation="Questo è il vero apprendimento: non la soluzione di questo caso, ma il principio che si applica a tutti i casi simili." color="#5a3000" />
          <GuideAIBox desc="L'AI valuta la qualità della tua analisi, identifica angolazioni trascurate, sfida la tua soluzione con una contro-argomentazione, e ti fa le domande che un professore HBS farebbe in aula." />
        </div>
      </GuideMethod>

      {/* 5 — CONCEPT MAP */}
      <GuideMethod
        method={getMethod('conceptmap')}
        color="#4a1a6b"
        onUseNow={onMethodClick}
      >
        <div className="bg-bg2 border-b border-border px-7 py-3.5 text-[12px] text-ink2 leading-[1.7]">
          <strong className="font-medium" style={{ color: '#4a1a6b' }}>Come si usa:</strong>{' '}
          Definisci il concetto centrale, poi costruisci i rami tematici principali con i concetti
          che appartengono a ciascuno. Le connessioni trasversali tra rami diversi sono il segnale
          della comprensione profonda — là dove la conoscenza diventa rete, non lista.
        </div>
        <div className="px-7 py-6">
          <GuideStep
            num="01"
            label="Concetto centrale"
            why="→ 1-2 frasi che definiscono l'essenza dell'argomento"
            content={GUIDE_DATA.conceptmap.center}
            annotation="Non una definizione da dizionario. Una definizione che include già le relazioni principali (cosa è, come funziona, perché esiste)."
            color="#4a1a6b"
          />

          <div className="mb-[22px]">
            <div className="flex items-baseline gap-2.5 mb-2">
              <span className="font-mono text-[11px] font-medium w-7" style={{ color: '#4a1a6b' }}>
                02
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
                Rami principali
              </span>
              <span
                className="ml-auto text-[10px] text-ink3 italic bg-bg2 px-2 py-0.5 border-l-2"
                style={{ borderLeftColor: '#4a1a6b' }}
              >
                → le aree tematiche + i concetti di ciascuna
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {GUIDE_DATA.conceptmap.branches.map((b, i) => (
                <div key={i} className="border border-border overflow-hidden">
                  <div className="bg-bg2 px-3.5 py-2 border-b border-border flex gap-2.5">
                    <span className="font-mono text-[10px] font-medium" style={{ color: '#4a1a6b' }}>
                      Ramo {i + 1}
                    </span>
                    <span className="font-mono text-[11px] font-medium">{b.main}</span>
                  </div>
                  <div className="px-3.5 py-2 text-[12px] text-ink2 leading-[1.7] whitespace-pre-wrap">
                    {b.sub}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-1.5 text-[11px] text-ink3 italic leading-[1.6] pl-1 border-l-2 border-border2">
              Ogni ramo copre un'area tematica. I concetti nel corpo del ramo devono includere
              definizioni, esempi, condizioni. Non solo parole chiave.
            </div>
          </div>

          <GuideStep
            num="03"
            label="Connessioni trasversali"
            why="→ dove i rami si parlano? questi sono i concetti più importanti"
            content={GUIDE_DATA.conceptmap.links}
            annotation="Se non trovi connessioni trasversali, stai ancora studiando a compartimenti. Le connessioni sono la comprensione."
            color="#4a1a6b"
          />
          <GuideAIBox desc="L'AI verifica se i rami coprono l'argomento completamente, suggerisce rami o concetti mancanti, e identifica le connessioni trasversali più importanti che potresti non aver visto." />
        </div>
      </GuideMethod>

      {/* 6 — ACTIVE RECALL */}
      <GuideMethod
        method={getMethod('activerecall')}
        color="#1a5a5a"
        onUseNow={onMethodClick}
      >
        <div className="bg-bg2 border-b border-border px-7 py-3.5 text-[12px] text-ink2 leading-[1.7]">
          <strong className="font-medium" style={{ color: '#1a5a5a' }}>Come si usa:</strong>{' '}
          Crea domande prima ancora di sapere tutte le risposte. Studia cercando le risposte.
          Assegna una confidenza 1-5. Studia prima le domande con confidenza bassa. Ripeti dopo 1
          giorno, 3 giorni, 1 settimana (curva dell'oblio di Ebbinghaus).
        </div>
        <div className="px-7 py-6">
          <GuideStep
            num="01"
            label="Note di base"
            why="→ panoramica breve — serve all'AI per generare domande migliori"
            content={GUIDE_DATA.activerecall.notes}
            annotation="Non servono appunti completi. Solo la panoramica dell'argomento per orientare le domande."
            color="#1a5a5a"
          />

          <div className="mb-[22px]">
            <div className="flex items-baseline gap-2.5 mb-2">
              <span className="font-mono text-[11px] font-medium w-7" style={{ color: '#1a5a5a' }}>
                02
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
                Domande & Risposte
              </span>
              <span
                className="ml-auto text-[10px] text-ink3 italic bg-bg2 px-2 py-0.5 border-l-2"
                style={{ borderLeftColor: '#1a5a5a' }}
              >
                → conf. 1-5: quanto sei sicuro di questa risposta?
              </span>
            </div>

            {/* Header row */}
            <div
              className="grid bg-bg3 border border-border border-b-0"
              style={{ gridTemplateColumns: '1fr 1fr 60px' }}
            >
              <div className="px-3.5 py-2 border-r border-border2">
                <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink3">
                  Domanda
                </div>
              </div>
              <div className="px-3.5 py-2 border-r border-border2">
                <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink3">
                  Risposta
                </div>
              </div>
              <div className="px-3.5 py-2">
                <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink3">
                  Conf.
                </div>
              </div>
            </div>

            {/* Card rows */}
            {GUIDE_DATA.activerecall.cards.map((c, i) => (
              <div
                key={i}
                className="grid border border-border border-t-0"
                style={{ gridTemplateColumns: '1fr 1fr 60px' }}
              >
                <div className="px-3.5 py-2.5 border-r border-border2 text-[12px] text-ink2 leading-[1.5]">
                  {c.q}
                </div>
                <div className="px-3.5 py-2.5 border-r border-border2 text-[12px] text-ink2 leading-[1.5]">
                  {c.a}
                </div>
                <div
                  className="px-3.5 py-2.5 font-mono text-[10px] font-medium"
                  style={{ color: '#1a5a5a' }}
                >
                  {c.conf}/5
                </div>
              </div>
            ))}

            <div className="mt-1.5 text-[11px] text-ink3 italic leading-[1.6] pl-1 border-l-2 border-border2">
              Le domande con confidenza 3 o meno sono quelle da studiare adesso. Quelle con 5 le
              rivedi tra una settimana. Questo è il nucleo della ripetizione spaziata.
            </div>
          </div>

          <GuideAIBox desc="L'AI genera 8 domande aggiuntive di qualità crescente (definizione → applicazione → analisi → connessione), valuta le tue domande esistenti, e propone 2 domande 'killer' che separano chi sa davvero da chi sa in superficie." />
        </div>
      </GuideMethod>

      {/* Footer */}
      <div className="text-center pt-5 pb-10 font-mono text-[10px] tracking-[0.2em] uppercase text-ink3">
        Fine guida ·{' '}
        <button
          className="underline cursor-pointer bg-transparent border-0 font-mono text-[10px] tracking-[0.2em] uppercase text-ink3 hover:text-ink transition-colors"
          onClick={onGoHome}
        >
          Torna ai metodi
        </button>
      </div>
    </div>
  )
}
