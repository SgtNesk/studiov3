import { useState } from 'react'

export default function SettingsModal({ apiKey, onSave, onClose }) {
  const [value, setValue] = useState(apiKey)

  function handleSave() {
    onSave(value.trim())
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 z-[200] flex items-center justify-center"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-app-white border border-border p-8 max-w-[460px] w-[90%]">
        <h3 className="font-serif text-[20px] mb-2">Anthropic API Key</h3>
        <p className="text-[12px] text-ink3 leading-[1.7] mb-5">
          Inserisci la tua API key per abilitare l'assistenza AI in ogni metodo di studio. La chiave
          rimane solo in questa sessione del browser e non viene mai inviata altrove.
        </p>
        <input
          type="password"
          className="w-full border border-border bg-bg px-3 py-2.5 outline-none font-mono text-[12px] mb-3.5 focus:border-ink transition-colors"
          placeholder="sk-ant-..."
          autoComplete="off"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <div className="flex gap-2.5 justify-end">
          <button
            className="border border-border bg-transparent px-3.5 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-ink2 hover:border-ink hover:text-ink hover:bg-bg transition-all"
            onClick={onClose}
          >
            Annulla
          </button>
          <button
            className="border border-ink bg-ink text-app-white px-3.5 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors"
            onClick={handleSave}
          >
            Salva
          </button>
        </div>
      </div>
    </div>
  )
}
