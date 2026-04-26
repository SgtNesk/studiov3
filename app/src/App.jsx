import { useState } from 'react'
import { METHODS } from './data/methods'
import TopBar from './components/TopBar'
import Home from './components/Home'
import Workspace from './components/Workspace'
import Guide from './components/Guide'
import SettingsModal from './components/SettingsModal'

export default function App() {
  const [view, setView] = useState('home')
  const [method, setMethod] = useState(null)
  const [data, setData] = useState({})
  const [apiKey, setApiKey] = useState(() => sessionStorage.getItem('studio_key') || '')
  const [showSettings, setShowSettings] = useState(false)

  function openMethod(id) {
    const m = METHODS.find(x => x.id === id)
    if (!m) return

    let initialData = { topic: '' }
    if (m.id === 'cornell') {
      initialData = { ...initialData, cornellRows: {}, summary: '', notes: '' }
    } else if (m.id === 'conceptmap') {
      initialData = {
        ...initialData,
        center: '',
        branches: [
          { main: '', sub: '' },
          { main: '', sub: '' },
          { main: '', sub: '' },
          { main: '', sub: '' },
        ],
        links: '',
      }
    } else if (m.id === 'activerecall') {
      initialData = {
        ...initialData,
        notes: '',
        cards: [
          { q: '', a: '', conf: 0 },
          { q: '', a: '', conf: 0 },
          { q: '', a: '', conf: 0 },
          { q: '', a: '', conf: 0 },
        ],
      }
    }

    setMethod(m)
    setData(initialData)
    setView('workspace')
  }

  function openGuide() {
    setMethod(null)
    setData({})
    setView('guide')
  }

  function goHome() {
    setView('home')
    setMethod(null)
    setData({})
  }

  function saveApiKey(key) {
    setApiKey(key)
    sessionStorage.setItem('studio_key', key)
    setShowSettings(false)
  }

  function exportPDF() {
    setTimeout(() => window.print(), 100)
  }

  return (
    <div className="min-h-screen bg-bg text-ink text-sm font-sans">
      <TopBar
        view={view}
        method={method}
        apiKey={apiKey}
        onHome={goHome}
        onOpenSettings={() => setShowSettings(true)}
        onExportPDF={exportPDF}
      />

      <div className="pt-[52px] min-h-screen">
        {view === 'home' && (
          <Home
            methods={METHODS}
            onMethodClick={openMethod}
            onGuideClick={openGuide}
            onApiKeyClick={() => setShowSettings(true)}
          />
        )}
        {view === 'guide' && (
          <Guide methods={METHODS} onMethodClick={openMethod} onGoHome={goHome} />
        )}
        {view === 'workspace' && method && (
          <Workspace
            method={method}
            data={data}
            setData={setData}
            apiKey={apiKey}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}
      </div>

      {showSettings && (
        <SettingsModal
          apiKey={apiKey}
          onSave={saveApiKey}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}
