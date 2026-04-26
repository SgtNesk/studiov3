const KEY = 'studio_sessions'

export function getSessions() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

function setSessions(sessions) {
  localStorage.setItem(KEY, JSON.stringify(sessions))
}

export function saveSession(session) {
  const all = getSessions()
  const idx = all.findIndex(s => s.id === session.id)
  if (idx >= 0) {
    all[idx] = session
  } else {
    all.unshift(session)
  }
  setSessions(all)
  return session
}

export function deleteSession(id) {
  setSessions(getSessions().filter(s => s.id !== id))
}

export function makeSessionId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

export function exportSessionJSON(session) {
  const blob = new Blob([JSON.stringify(session, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `studio-${session.methodId}-${(session.topic || 'sessione')
    .replace(/[^a-z0-9]+/gi, '-')
    .toLowerCase()
    .slice(0, 40)}-${session.id}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
