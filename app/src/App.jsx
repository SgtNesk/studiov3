import { useState, useRef } from 'react'
import { METHODS } from './data/methods'
import TopBar from './components/TopBar'
import Home from './components/Home'
import Workspace from './components/Workspace'
import Guide from './components/Guide'
import Library from './components/Library'
import SettingsModal from './components/SettingsModal'
import { getSessions, saveSession, makeSessionId } from './lib/sessions'

function makeInitialData(m) {
  if (m.id === 'cornell') {
    return { topic: '', cornellRows: {}, summary: '', notes: '' }
  }
  if (m.id === 'conceptmap') {
    return {
      topic: '',
      center: '',
      branches: [
        { main: '', sub: '' },
        { main: '', sub: '' },
        { main: '', sub: '' },
        { main: '', sub: '' },
      ],
      links: '',
    }
  }
  if (m.id === 'activerecall') {
    return {
      topic: '',
      notes: '',
      cards: [
        { q: '', a: '', conf: 0 },
        { q: '', a: '', conf: 0 },
        { q: '', a: '', conf: 0 },
        { q: '', a: '', conf: 0 },
      ],
    }
  }
  return { topic: '' }
}

function hasContent(m, d) {
  if (d.topic?.trim()) return true
  if (m.steps) return m.steps.some(s => d[s.id]?.trim())
  if (m.id === 'cornell') return !!(d.notes?.trim())
  if (m.id === 'conceptmap')
    return !!(d.center?.trim()) || (d.branches || []).some(b => b.main?.trim())
  if (m.id === 'activerecall') return (d.cards || []).some(c => c.q?.trim())
  return false
}

export default function App() {
  const [view, setView] = useState('home')
  const [method, setMethod] = useState(null)
  const [data, setData] = useState({})
  const [apiKey, setApiKey] = useState(() => sessionStorage.getItem('studio_key') || '')
  const [showSettings, setShowSettings] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [savedAt, setSavedAt] = useState(null)
  const [isDirty, setIsDirty] = useState(false)
  const [libraryKey, setLibraryKey] = useState(0)

  // Refs for access inside setTimeout without stale closures
  const dataRef = useRef({})
  const methodRef = useRef(null)
  const sessionIdRef = useRef(null)
  const autoSaveTimer = useRef(null)
  const trackEditsRef = useRef(false) // prevents auto-save during initialization

  function doAutoSave() {
    const m = methodRef.current
    const d = dataRef.current
    const sid = sessionIdRef.current
    if (!m || !hasContent(m, d)) return

    const id = sid || makeSessionId()
    const all = getSessions()
    const existing = all.find(s => s.id === id)
    const now = new Date().toISOString()
    saveSession({
      id,
      methodId: m.id,
      topic: d.topic || '',
      data: d,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    })
    if (!sid) {
      setSessionId(id)
      sessionIdRef.current = id
    }
    setSavedAt(new Date())
    setIsDirty(false)
  }

  function handleSetData(updater) {
    setData(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      dataRef.current = next
      return next
    })
    if (!trackEditsRef.current) return
    setIsDirty(true)
    clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(doAutoSave, 2000)
  }

  function performSave() {
    clearTimeout(autoSaveTimer.current)
    doAutoSave()
  }

  function startSession(m, initialData, existingId = null, existingUpdatedAt = null) {
    trackEditsRef.current = false
    methodRef.current = m
    dataRef.current = initialData
    sessionIdRef.current = existingId

    setMethod(m)
    setData(initialData)
    setSessionId(existingId)
    setSavedAt(existingUpdatedAt ? new Date(existingUpdatedAt) : null)
    setIsDirty(false)
    setView('workspace')

    setTimeout(() => {
      trackEditsRef.current = true
    }, 150)
  }

  function openMethod(id) {
    const m = METHODS.find(x => x.id === id)
    if (!m) return
    startSession(m, makeInitialData(m))
  }

  function openSessionFromLibrary(session) {
    const m = METHODS.find(x => x.id === session.methodId)
    if (!m) return
    startSession(m, session.data || {}, session.id, session.updatedAt)
  }

  function exportPDFFromLibrary(session) {
    openSessionFromLibrary(session)
    setTimeout(() => window.print(), 500)
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
    setSessionId(null)
    setIsDirty(false)
  }

  function goToLibrary() {
    setLibraryKey(k => k + 1)
    setView('library')
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
        isDirty={isDirty}
        savedAt={savedAt}
        onHome={goHome}
        onOpenSettings={() => setShowSettings(true)}
        onExportPDF={exportPDF}
        onSave={performSave}
        onLibrary={goToLibrary}
      />

      <div className="pt-[52px] min-h-screen">
        {view === 'home' && (
          <Home
            methods={METHODS}
            onMethodClick={openMethod}
            onGuideClick={openGuide}
            onApiKeyClick={() => setShowSettings(true)}
            onLibraryClick={goToLibrary}
          />
        )}
        {view === 'guide' && (
          <Guide methods={METHODS} onMethodClick={openMethod} onGoHome={goHome} />
        )}
        {view === 'workspace' && method && (
          <Workspace
            method={method}
            data={data}
            setData={handleSetData}
            apiKey={apiKey}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}
        {view === 'library' && (
          <Library
            key={libraryKey}
            onOpen={openSessionFromLibrary}
            onExportPDF={exportPDFFromLibrary}
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
