export default function TopBar({
  view,
  method,
  isDirty,
  savedAt,
  onHome,
  onExportPDF,
  onSave,
  onLibrary,
}) {
  const isWorkspaceOrGuide = view === 'workspace' || view === 'guide'
  const methodLabel =
    view === 'guide'
      ? "GUIDA ALL'USO"
      : view === 'library'
      ? 'LIBRERIA'
      : method
      ? method.name.toUpperCase()
      : 'Scegli un metodo'

  const savedLabel = savedAt
    ? `✓ ${savedAt.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}`
    : null

  return (
    <div className="print-hide fixed top-0 left-0 right-0 h-[52px] bg-app-white border-b border-border flex items-center px-7 gap-4 z-[100]">
      <button
        className="font-mono text-[13px] font-medium tracking-[0.05em] hover:opacity-60 transition-opacity bg-transparent border-0 p-0 text-ink"
        onClick={onHome}
      >
        STUDIO
      </button>
      <span className="text-border text-[18px]">·</span>
      <span className="font-mono text-[11px] text-ink3 tracking-[0.1em] uppercase">{methodLabel}</span>

      <div className="ml-auto flex gap-2.5 items-center">
        {view !== 'library' && (
          <button
            className="print-hide border border-border bg-transparent px-3.5 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-ink2 hover:border-ink hover:text-ink hover:bg-bg transition-all"
            onClick={onLibrary}
          >
            Libreria
          </button>
        )}
        {isWorkspaceOrGuide && (
          <button
            className="print-hide border border-border bg-transparent px-3.5 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-ink2 hover:border-ink hover:text-ink hover:bg-bg transition-all"
            onClick={onHome}
          >
            ← Home
          </button>
        )}
        {view === 'workspace' && (
          <>
            {isDirty ? (
              <button
                className="print-hide border border-ink bg-ink text-app-white px-3.5 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors"
                onClick={onSave}
              >
                Salva
              </button>
            ) : savedLabel ? (
              <span className="print-hide font-mono text-[10px] tracking-[0.1em] text-ink3">
                {savedLabel}
              </span>
            ) : null}
            <button
              className="print-hide border border-border bg-transparent px-3.5 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-ink2 hover:border-ink hover:text-ink hover:bg-bg transition-all"
              onClick={onExportPDF}
            >
              PDF
            </button>
          </>
        )}
      </div>
    </div>
  )
}
