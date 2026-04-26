import { useState } from 'react'

export default function AIZone({ method, data, apiKey, onOpenSettings, color }) {
  const [output, setOutput] = useState(
    "L'AI analizzerà il tuo lavoro e fornirà feedback, lacune identificate e domande Socratiche per approfondire."
  )
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [resultText, setResultText] = useState('')
  const [inlineKey, setInlineKey] = useState('')

  async function runAI(keyOverride) {
    const key = keyOverride || apiKey
    if (!key) {
      onOpenSettings()
      return
    }

    const topic = data.topic || 'argomento non specificato'
    setLoading(true)
    setOutput('Analisi in corso...')

    const prompt = method.aiPrompt(topic, data)

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      })
      const json = await res.json()
      if (json.error) {
        setOutput('Errore: ' + json.error.message)
        setLoading(false)
        return
      }
      const text = json.content?.map(c => c.text || '').join('') || 'Nessuna risposta.'
      setOutput(text)
      setLoading(false)
      setShowResult(true)
      setResultText(
        `ARGOMENTO: ${topic}\nMETODO: ${method.name}\nDATA: ${new Date().toLocaleDateString('it-IT')}\n\n${'─'.repeat(60)}\n\nANALISI AI:\n\n${text}`
      )
    } catch (e) {
      setOutput('Errore di rete: ' + e.message)
      setLoading(false)
    }
  }

  function saveInlineKey() {
    const trimmed = inlineKey.trim()
    if (trimmed) {
      sessionStorage.setItem('studio_key', trimmed)
      runAI(trimmed)
    }
  }

  return (
    <div className="print-hide">
      <div className="bg-bg2 border border-border p-[18px_20px] mb-6">
        <div className="flex justify-between items-center mb-3.5">
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-ink3">
            Assistenza AI — {method.name}
          </span>
          <button
            className="border border-ink bg-ink text-app-white px-3.5 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors"
            onClick={() => runAI()}
          >
            Analizza con AI →
          </button>
        </div>

        {!apiKey && (
          <div className="bg-bg2 border border-border p-3.5 flex gap-3 items-center mb-5">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink3">
              API Key:
            </span>
            <input
              type="password"
              placeholder="sk-ant-..."
              value={inlineKey}
              onChange={e => setInlineKey(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && saveInlineKey()}
              className="flex-1 border border-border bg-app-white px-2.5 py-1.5 outline-none font-mono text-[11px] focus:border-ink transition-colors"
            />
            <button
              className="border border-border bg-transparent px-3.5 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-ink2 hover:border-ink hover:text-ink hover:bg-bg transition-all"
              onClick={saveInlineKey}
            >
              OK
            </button>
          </div>
        )}

        <div
          className={`text-[13px] leading-[1.8] whitespace-pre-wrap min-h-[60px] ${
            loading ? 'text-ink3 italic' : 'text-ink2'
          }`}
        >
          {output}
        </div>
      </div>

      {showResult && (
        <div className="border-2 bg-app-white mt-7" style={{ borderColor: color }}>
          <div className="px-[18px] py-2.5" style={{ backgroundColor: color }}>
            <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-white">
              Output — Pronto per PDF
            </div>
          </div>
          <div className="p-[18px]">
            <div className="text-[13px] leading-[1.9] whitespace-pre-wrap text-ink">
              {resultText}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
