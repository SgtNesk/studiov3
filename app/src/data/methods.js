export const METHODS = [
  {
    id: 'feynman',
    name: 'Tecnica Feynman',
    origin: 'Caltech · Richard Feynman',
    tagline: 'Se non riesci a spiegarlo semplicemente, non lo hai davvero capito.',
    when: 'Concetti astratti, teorie, formule, causa-effetto',
    color: '#1a3a6b',
    desc: "Spiega l'argomento con parole tue semplici come se dovessi insegnarlo a un ragazzo di 12 anni. Dove ti blocchi, lì c'è la lacuna reale. Poi torni alla fonte e riempi il vuoto.",
    steps: [
      {
        id: 's1',
        label: '01 — Spiega semplicemente',
        hint: 'Come la spiegheresti a un ragazzo di 12 anni?',
        size: 'xl',
        placeholder:
          "Scrivi tutto quello che capisci dell'argomento con parole tue, semplici. Non usare termini tecnici che non sai spiegare a tua volta. Se usi una parola, devi sapere cosa significa.",
      },
      {
        id: 's2',
        label: '02 — Identifica i vuoti',
        hint: 'Dove ti sei bloccato?',
        size: 'large',
        placeholder:
          'Elenca i punti dove non hai saputo spiegare, dove hai usato parole che non capisci davvero, dove hai saltato dei passaggi logici...',
      },
      {
        id: 's3',
        label: '03 — Versione raffinata',
        hint: 'Dopo aver riempito i vuoti, riscrivi',
        size: 'xl',
        placeholder:
          "Riscrivi la spiegazione — più semplice, più precisa, senza buchi. Se riesci a spiegarla tutta senza inciampare, la sai.",
      },
    ],
    aiPrompt: (topic, vals) => `Sei un coach della Tecnica Feynman. Lo studente sta studiando: "${topic}".

Ha scritto questa spiegazione semplice:
---
${vals.s1 || '(vuota)'}
---
Ha identificato questi vuoti:
${vals.s2 || '(nessuno indicato)'}

Il tuo compito:
1. Identifica 3-5 lacune reali o imprecisioni nella spiegazione (sii preciso, non generico)
2. Per ogni lacuna, spiega brevemente il concetto mancante in termini semplici
3. Proponi una domanda Socratica per ciascuna lacuna che aiuti lo studente ad arrivarci da solo

Rispondi in italiano, in modo diretto e didattico.`,
  },
  {
    id: 'cornell',
    name: 'Cornell Notes',
    origin: 'Cornell University · Walter Pauk',
    tagline: 'Struttura che trasforma appunti passivi in strumenti attivi di revisione.',
    when: 'Lezioni, letture, studio di testi lunghi',
    color: '#7a1e1e',
    desc: "Dividi il foglio in tre zone: destra per gli appunti completi, sinistra per le domande-cue che li sintetizzano, in basso il riassunto finale. La colonna sinistra diventa il tuo strumento di interrogazione.",
    steps: null,
    aiPrompt: (topic, vals) => `Sei un esperto di Cornell Notes. Lo studente ha preso appunti su: "${topic}".

Appunti (colonna destra):
---
${vals.notes || '(vuoti)'}
---

Il tuo compito:
1. Genera 8-10 domande-cue per la colonna sinistra (brevi, incisive, che testano i concetti chiave)
2. Scrivi un paragrafo di riepilogo (4-6 frasi) per la zona inferiore
3. Suggerisci 2-3 connessioni con altri argomenti

Formato: elenca prima le domande-cue numerate, poi il riepilogo, poi le connessioni. In italiano.`,
  },
  {
    id: 'blurting',
    name: 'Blurting Method',
    origin: 'Oxford · Revision technique',
    tagline: 'Recupera tutto dalla memoria prima di guardare. Quello che manca, è quello da studiare.',
    when: 'Revisione, consolidamento, prima di esami',
    color: '#2a6b3a',
    desc: "Chiudi il libro. Scrivi tutto quello che ricordi sull'argomento senza guardare nulla. Poi confronta con la fonte e segna i vuoti. Studia solo i vuoti. Ripeti.",
    steps: [
      {
        id: 'b1',
        label: '01 — Blurt: scarica tutto',
        hint: 'Senza guardare nulla. Cronometrati se vuoi.',
        size: 'xl',
        placeholder:
          "Scrivi tutto quello che ricordi sull'argomento. Definizioni, formule, esempi, connessioni. Non importa l'ordine. Non guardare gli appunti. Vai.",
      },
      {
        id: 'b2',
        label: '02 — Lacune identificate',
        hint: 'Dopo aver confrontato con la fonte',
        size: '',
        placeholder:
          'Cosa mancava? Cosa era sbagliato? Cosa era incompleto? Elencalo con precisione.',
      },
      {
        id: 'b3',
        label: '03 — Correzione e completamento',
        hint: 'Riscrivi le parti mancanti correttamente',
        size: 'large',
        placeholder:
          "Scrivi qui le parti che mancavano o erano errate, nella versione corretta. Questo è il materiale su cui concentrarti nella prossima sessione.",
      },
    ],
    aiPrompt: (topic, vals) => `Sei un esperto del metodo Blurting. Lo studente sta ripassando: "${topic}".

Ha scritto questo blurt (recupero libero da memoria):
---
${vals.b1 || '(vuoto)'}
---

Il tuo compito, basandoti sulla conoscenza standard di questo argomento:
1. Elenca cosa è corretto e ben ricordato (breve, solo i punti chiave)
2. Elenca cosa manca o è incompleto (specifica cosa manca esattamente)
3. Elenca eventuali errori o imprecisioni (con la versione corretta)
4. Assegna un punteggio di completezza da 1 a 10 con motivazione

In italiano, preciso e diretto.`,
  },
  {
    id: 'casestudy',
    name: 'Case Method',
    origin: 'Harvard Business School',
    tagline: 'Ogni concetto diventa un problema reale da risolvere. La comprensione si prova nell\'applicazione.',
    when: 'Economia, diritto, strategia, problemi complessi',
    color: '#5a3000',
    desc: "Harvard non insegna teorie: insegna casi. Prendi un argomento, costruisci un caso reale intorno ad esso, analizzalo da più angolazioni, formula una risposta difendibile. Il processo è l'apprendimento.",
    steps: [
      {
        id: 'c1',
        label: '01 — Situazione',
        hint: 'Il contesto del caso',
        size: '',
        placeholder:
          'Descrivi la situazione concreta. Chi sono i protagonisti? Qual è il contesto? Quali sono i dati rilevanti?',
      },
      {
        id: 'c2',
        label: '02 — Problema centrale',
        hint: 'La domanda precisa a cui rispondere',
        size: '',
        placeholder:
          'Qual è il problema o la domanda centrale del caso? Formulalo in modo preciso. (es. "L\'azienda X deve decidere se...")',
      },
      {
        id: 'c3',
        label: '03 — Analisi',
        hint: 'Almeno 2-3 prospettive diverse',
        size: 'xl',
        placeholder:
          'Analizza il problema da più angolazioni. Considera pro/contro, dati, teorie applicabili, conseguenze di diverse scelte...',
      },
      {
        id: 'c4',
        label: '04 — Soluzione e motivazione',
        hint: 'La tua risposta difendibile',
        size: 'large',
        placeholder:
          'Quale soluzione proponi? Perché questa e non le altre? Quali sono i rischi residui?',
      },
      {
        id: 'c5',
        label: '05 — Principio estratto',
        hint: 'La lezione generalizzabile',
        size: '',
        placeholder:
          'Cosa impari da questo caso che si applica a situazioni simili? Qual è il principio generale?',
      },
    ],
    aiPrompt: (topic, vals) => `Sei un professore della Harvard Business School. Lo studente ha analizzato questo caso su: "${topic}".

Situazione: ${vals.c1 || '(non specificata)'}
Problema: ${vals.c2 || '(non specificato)'}
Analisi: ${vals.c3 || '(non fornita)'}
Soluzione: ${vals.c4 || '(non fornita)'}
Principio: ${vals.c5 || '(non estratto)'}

Il tuo compito:
1. Valuta la qualità dell'analisi (punti di forza e debolezze)
2. Identifica angolazioni mancanti o trascurate
3. Sfida la soluzione proposta con una contro-argomentazione
4. Suggerisci 2-3 domande che un professore HBS farebbe in aula

Tono: diretto, esigente, didattico. In italiano.`,
  },
  {
    id: 'conceptmap',
    name: 'Concept Map',
    origin: 'Cornell University · Joseph Novak',
    tagline: "La conoscenza non è lineare. La mappa rivela come i concetti si connettono davvero.",
    when: 'Panoramiche, connessioni tra argomenti, preparazione esami',
    color: '#4a1a6b',
    desc: "Parti dal concetto centrale e costruisci rami. Ogni ramo è un'area tematica, ogni sotto-ramo un concetto specifico. Le connessioni tra rami diversi sono il segnale della comprensione profonda.",
    steps: null,
    aiPrompt: (topic, vals) => {
      const branches = (vals.branches || [])
        .map((b, i) => `Ramo ${i + 1}: ${b.main || '?'} — ${b.sub || '?'}`)
        .join('\n')
      return `Sei un esperto di Concept Mapping. Lo studente sta mappando: "${topic}".

Struttura attuale:
${branches || '(nessun ramo ancora)'}

Il tuo compito:
1. Valuta se i rami principali coprono le aree fondamentali dell'argomento
2. Suggerisci 2-3 rami o sotto-concetti mancanti importanti
3. Identifica 3-5 connessioni trasversali tra rami diversi (le più importanti per la comprensione profonda)
4. Proponi una "domanda focale" che orienta tutta la mappa

In italiano, concreto e specifico per l'argomento.`
    },
  },
  {
    id: 'activerecall',
    name: 'Active Recall',
    origin: 'Cognitive Science · Hermann Ebbinghaus',
    tagline: 'La memoria non si rinforza leggendo. Si rinforza recuperando. Testa te stesso, sempre.',
    when: 'Memorizzazione, preparazione test, ripetizione spaziata',
    color: '#1a5a5a',
    desc: "Genera domande sull'argomento prima ancora di studiarlo bene. Poi studia cercando le risposte. Il recupero attivo — non la rilettura passiva — è ciò che fissa la conoscenza a lungo termine.",
    steps: null,
    aiPrompt: (topic, vals) => {
      const cards = (vals.cards || [])
        .map((c, i) => `Q${i + 1}: ${c.q || '?'}`)
        .join('\n')
      return `Sei un esperto di Active Recall e Spaced Repetition. Lo studente studia: "${topic}".

Domande già create:
${cards || '(nessuna)'}

Il tuo compito:
1. Genera 8 domande aggiuntive di alta qualità sull'argomento (vari livelli: definizione, applicazione, analisi, connessione)
2. Per le domande già esistenti, valuta se sono troppo facili o troppo vaghe e suggerisci come migliorarle
3. Suggerisci un ordine di studio ottimale basato sulla difficoltà
4. Proponi 2 domande "killer" che distinguono chi sa davvero da chi sa in superficie

In italiano. Le domande devono essere specifiche, non generiche.`
    },
  },
]

export const GUIDE_TOPIC = 'Il ciclo dell\'acqua'

export const GUIDE_DATA = {
  feynman: {
    s1: `Il sole scalda l'acqua del mare e dei fiumi. L'acqua calda si trasforma in vapore — diventa invisibile e leggera, e sale in alto nell'aria. Quando il vapore sale, fa sempre più freddo. Il freddo trasforma il vapore in tante piccole goccioline — e quelle goccioline insieme formano le nuvole. Quando le goccioline si uniscono e diventano pesanti, cadono come pioggia. L'acqua torna al mare e ai fiumi, e tutto ricomincia.`,
    s1why: `Hai scritto senza usare termini tecnici. Se non riesci a dire "evaporazione" con parole normali, non la sai davvero.`,
    s2: `— Non so spiegare perché il vapore sale (è più leggero dell'aria? perché?)
— Non ho spiegato cosa succede esattamente quando fa freddo
— Non ho detto nulla sull'acqua che va nel terreno
— Non so perché la pioggia è acqua dolce se il mare è salato`,
    s2why: `Questi sono i tuoi veri vuoti. Non "ho studiato poco" — hai identificato COSA studiare esattamente.`,
    s3: `Il sole fornisce energia per l'evaporazione: le molecole d'acqua acquistano energia cinetica sufficiente per sfuggire dalla superficie liquida e diventare vapore (H₂O gassoso). Il vapore è meno denso dell'aria calda e sale in quota. In quota la temperatura cala → condensazione: il vapore torna liquido attorno a microscopici nuclei di polvere, formando goccioline che aggregandosi creano le nuvole. Quando le gocce raggiungono massa critica → precipitazione (pioggia, neve, grandine). Il sale rimane in mare: durante l'evaporazione solo le molecole H₂O evaporano — l'acqua piovana è quindi dolce. L'acqua che tocca terra si divide: parte ruscella in superficie → fiumi → mare; parte si infiltra nel suolo → falde acquifere. Il ciclo è chiuso e continuo.`,
    s3why: `Ora hai tutto. Evaporazione, condensazione, precipitazione, perché l'acqua è dolce, le falde. Se puoi spiegarlo così, lo sai.`,
  },
  cornell: {
    rows: [
      { cue: `Cos'è l'evaporazione?`, note: `Trasformazione dell'acqua da liquido a vapore per effetto del calore solare. Avviene su mari, laghi, fiumi e suolo umido.` },
      { cue: `Dove avviene la condensazione?`, note: `In quota, dove la temperatura è più bassa. Il vapore si trasforma in microscopiche goccioline d'acqua attorno a particelle di polvere → formazione delle nuvole.` },
      { cue: `Cos'è la precipitazione?`, note: `Caduta dell'acqua dall'atmosfera: pioggia, neve, grandine. Avviene quando le goccioline in nuvola raggiungono massa sufficiente.` },
      { cue: `Perché la pioggia è dolce?`, note: `Il sale non evapora: durante l'evaporazione solo le molecole H₂O si distaccano. I sali rimangono nel mare.` },
      { cue: `Cosa succede all'acqua dopo la pioggia?`, note: `Due percorsi: (1) ruscellamento superficiale → fiumi → mare; (2) infiltrazione nel suolo → falde acquifere. Lenta risalita capillare o utilizzo da parte delle piante (traspirazione).` },
    ],
    summary: `Il ciclo dell'acqua è un sistema chiuso alimentato dall'energia solare: l'evaporazione porta l'acqua dalla superficie all'atmosfera, la condensazione la trasforma in nuvole, le precipitazioni la riportano a terra. Il sale rimane in mare. L'acqua dolce si distribuisce su tutto il pianeta attraverso fiumi, piogge e falde acquifere.`,
  },
  blurting: {
    b1: `Il sole scalda l'acqua e evapora. Il vapore sale in alto. Si raffredda e forma le nuvole per condensazione. Poi piove. L'acqua torna al mare. Anche le piante traspirano acqua. I fiumi portano l'acqua al mare. I ghiacciai sono riserve di acqua dolce.`,
    b1why: `Blurt scritto in 3 minuti a libro chiuso. Nota: è disordinato, incompleto, ma onesto. Questo è corretto.`,
    b2: `✗ Mancante: perché il vapore sale (densità/temperatura)
✗ Mancante: la percolazione e le falde acquifere
✗ Mancante: differenza tra evaporazione ed evapotraspirazione
✗ Mancante: il ruolo dei nuclei di condensazione nella formazione delle nuvole
✗ Impreciso: ho detto "si raffredda e forma nuvole" ma non ho spiegato la condensazione attorno a particelle`,
    b2why: `Questi sono esattamente i concetti su cui devi tornare. Non rileggere tutto il capitolo — solo questi punti.`,
    b3: `Aggiunto: Il vapore sale perché a temperature più alte ha densità minore dell'aria circostante.
Aggiunto: Dopo la pioggia, parte dell'acqua infiltra nel suolo (percolazione) → ricarica le falde acquifere.
Aggiunto: Evapotraspirazione = evaporazione dal suolo + traspirazione delle piante.
Corretto: La condensazione avviene attorno a nuclei di condensazione (polvere, aerosol) — senza di essi il vapore non si trasforma in goccioline visibili.`,
  },
  casestudy: {
    c1: `La Sicilia ha subito tre anni consecutivi di siccità (2021-2023). Le riserve idriche degli invasi sono al 28% della capacità. L'agricoltura rappresenta l'80% del consumo idrico regionale. I pozzi privati si stanno esaurendo. Il cambiamento climatico prevede precipitazioni ridotte del 15-20% entro il 2050.`,
    c2: `Come può la regione Sicilia garantire l'approvvigionamento idrico per i prossimi 10 anni, considerando che il ciclo naturale dell'acqua non è più sufficiente a soddisfare la domanda?`,
    c3: `LATO DOMANDA (riduzione consumo):
— L'agricoltura consuma l'80% dell'acqua. Passare da irrigazione a pioggia a irrigazione a goccia riduce il consumo del 40-60%.
— Incentivi economici per colture a basso fabbisogno idrico (mandorle, ulivi vs cereali).

LATO OFFERTA (aumento disponibilità):
— Dissalatori: tecnologia matura, costo in calo con energia solare. Israele copre il 70% del fabbisogno così.
— Raccolta acqua piovana a livello domestico e industriale.
— Riforestazione: le foreste aumentano la percolazione e riducono l'evaporazione dal suolo.

VINCOLI:
— Costi iniziali elevati (dissalatori: ~200M€)
— Tempi di costruzione (3-5 anni)
— Resistenza degli agricoltori al cambiamento`,
    c4: `Priorità immediata (0-2 anni): obbligatorietà dell'irrigazione a goccia per le nuove concessioni + incentivi per conversione. Stima riduzione consumo: 30%.
Medio termine (2-5 anni): 2 dissalatori solari nelle aree costiere più critiche.
Lungo termine (5-10 anni): riforestazione delle aree montane per aumentare la ricarica delle falde.
Rischio residuo: i tempi sono lunghi rispetto all'urgenza. Serve un piano di emergenza con razionamento progressivo.`,
    c5: `I sistemi naturali come il ciclo dell'acqua hanno una capacità massima. Quando la domanda umana supera questa capacità, le soluzioni devono agire contemporaneamente su domanda E offerta, non solo su una delle due. Il modello di successo (Israele, Spagna meridionale) combina sempre efficienza + nuova disponibilità.`,
  },
  conceptmap: {
    center: `Il ciclo dell'acqua è il movimento continuo dell'acqua tra idrosfera (mari, fiumi, ghiacciai), atmosfera e litosfera (suolo, falde), alimentato dall'energia solare.`,
    branches: [
      { main: `Evaporazione`, sub: `Motore: energia solare\nFonti: superfici marine (86%), lacustri, fluviali, suolo\nEvapotraspirazione: contributo delle piante\nCondizione: T > punto di ebollizione delle molecole superficiali` },
      { main: `Atmosfera e condensazione`, sub: `Vapore sale in quota: densità minore dell'aria fredda\nCondensazione attorno a nuclei (polvere, aerosol)\nFormazione nuvole: aggregazione goccioline\nTipi: cumuli, cirri, strati — diversa altitudine` },
      { main: `Precipitazioni`, sub: `Pioggia: goccioline aggregate > massa critica\nNeve: condensazione sotto 0°C\nGrandine: correnti ascensionali in temporale\nDistribuzione: legata a vento, rilievi, stagioni` },
      { main: `Ciclo terrestre`, sub: `Ruscellamento: acqua in superficie → fiumi → mare\nInfiltrazione: percolazione nel suolo → falde acquifere\nGhiacciai: riserve a lungo rilascio\nRisalita capillare + traspirazione vegetale` },
    ],
    links: `Ramo 1 ↔ Ramo 4: l'evaporazione dipende dall'acqua disponibile in superficie (Ramo 4 alimenta Ramo 1)\nRamo 2 ↔ Ramo 3: l'altitudine delle nuvole determina il tipo di precipitazione\nRamo 3 ↔ Ramo 4: le precipitazioni alimentano sia il ruscellamento che la percolazione\nConnessione trasversale chiave: senza falde acquifere (R4), la stagione secca spezzerebbe il ciclo`,
  },
  activerecall: {
    notes: `Il ciclo dell'acqua (ciclo idrologico) è il percorso continuo dell'acqua attraverso evaporazione, condensazione e precipitazione. È alimentato dall'energia solare e dalla gravità. Redistribuisce acqua dolce sul pianeta.`,
    cards: [
      { q: `Qual è la fonte di energia primaria del ciclo dell'acqua?`, a: `Il sole (energia solare). Senza di essa non avverrebbe l'evaporazione che alimenta tutto il ciclo.`, conf: 5 },
      { q: `Cosa succede al sale durante l'evaporazione dell'acqua di mare?`, a: `Rimane nel mare. Solo le molecole H₂O evaporano. Ecco perché la pioggia è acqua dolce anche se viene dal mare.`, conf: 5 },
      { q: `Definisci condensazione e distinguila dall'evaporazione.`, a: `Evaporazione: liquido → vapore (richiede calore). Condensazione: vapore → liquido (avviene con raffreddamento). Processi inversi.`, conf: 4 },
      { q: `Cos'è la percolazione e dove porta l'acqua?`, a: `È l'infiltrazione dell'acqua nel suolo attraverso la roccia porosa. Porta alla ricarica delle falde acquifere sotterranee.`, conf: 3 },
      { q: `Perché i ghiacciai sono importanti nel ciclo idrologico?`, a: `Sono riserve di acqua dolce a lungo termine. Il loro scioglimento graduale alimenta i fiumi nella stagione secca.`, conf: 4 },
      { q: `Qual è la differenza tra evaporazione ed evapotraspirazione?`, a: `Evapotraspirazione = evaporazione dal suolo + traspirazione delle piante. Le foreste contribuiscono significativamente al vapore atmosferico.`, conf: 3 },
    ],
  },
}
