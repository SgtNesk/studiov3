import StepsForm from './workspace/StepsForm'
import CornellForm from './workspace/CornellForm'
import ConceptMapForm from './workspace/ConceptMapForm'
import ActiveRecallForm from './workspace/ActiveRecallForm'
import AIZone from './workspace/AIZone'
import PrintHeader from './PrintHeader'

export default function Workspace({ method, data, setData, apiKey, onOpenSettings }) {
  const color = method.color

  const renderForm = () => {
    if (method.steps) {
      return <StepsForm steps={method.steps} data={data} setData={setData} color={color} />
    }
    if (method.id === 'cornell') {
      return <CornellForm data={data} setData={setData} color={color} />
    }
    if (method.id === 'conceptmap') {
      return <ConceptMapForm data={data} setData={setData} color={color} />
    }
    if (method.id === 'activerecall') {
      return <ActiveRecallForm data={data} setData={setData} color={color} />
    }
    return null
  }

  return (
    <div
      className="max-w-[900px] mx-auto px-7 py-9 pb-20"
      style={{ '--card-color': color }}
    >
      {/* Print-only document header (hidden on screen) */}
      <PrintHeader method={method} topic={data.topic} />

      {/* Screen-only workspace header */}
      <div className="screen-only mb-8 pb-5 border-b border-border">
        <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-ink3 mb-2">
          {method.origin}
        </div>
        <div className="font-serif text-[28px] font-semibold mb-1.5">{method.name}</div>
        <div className="text-[13px] text-ink2 leading-[1.7] max-w-[640px]">{method.desc}</div>
      </div>

      {/* Topic input */}
      <div className="flex gap-3 items-end mb-7">
        <div className="flex-1">
          <div className="font-mono text-[8px] tracking-[0.25em] uppercase text-ink3 mb-1.5 screen-only">
            Argomento di studio
          </div>
          <input
            type="text"
            className="w-full border-0 border-b-2 border-border bg-transparent py-2 font-serif text-[18px] outline-none cc-focus-bottom transition-colors screen-only"
            placeholder="es. Il bilancio riclassificato, La globalizzazione, Pirandello..."
            value={data.topic || ''}
            onChange={e => setData(prev => ({ ...prev, topic: e.target.value }))}
          />
        </div>
      </div>

      {/* Method-specific form */}
      {renderForm()}

      {/* AI Zone */}
      <AIZone
        method={method}
        data={data}
        apiKey={apiKey}
        onOpenSettings={onOpenSettings}
        color={color}
      />
    </div>
  )
}
