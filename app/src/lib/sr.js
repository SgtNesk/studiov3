// SM-2 inspired spaced repetition
// quality: 1-5 (matches confidence buttons)

export function updateCardSR(card, quality) {
  const ef = card.easeFactor ?? 2.5
  const interval = card.interval ?? 1

  let newEf = ef
  let newInterval

  if (quality < 3) {
    // Failed recall — restart from 1 day
    newInterval = 1
    newEf = Math.max(1.3, ef - 0.2)
  } else {
    // Successful recall — graduate interval
    if (!card.lastReview) {
      newInterval = quality >= 4 ? 4 : 1
    } else if (interval === 1) {
      newInterval = 6
    } else {
      newInterval = Math.round(interval * ef)
    }

    if (quality === 3) newEf = Math.max(1.3, ef - 0.14)
    else if (quality === 5) newEf = Math.min(2.5, ef + 0.1)
    // quality 4: EF unchanged
  }

  const today = new Date()
  const nextReview = new Date(today)
  nextReview.setDate(today.getDate() + newInterval)

  return {
    ...card,
    conf: quality,
    lastReview: today.toISOString().split('T')[0],
    nextReview: nextReview.toISOString().split('T')[0],
    interval: newInterval,
    easeFactor: Math.round(newEf * 100) / 100,
  }
}

export function isCardDue(card) {
  if (!card.nextReview) return false
  const today = new Date().toISOString().split('T')[0]
  return card.nextReview <= today
}

export function countDueCards(cards) {
  return (cards || []).filter(isCardDue).length
}

export function formatNextReview(card) {
  if (!card.nextReview) return null
  const today = new Date().toISOString().split('T')[0]
  if (card.nextReview < today) return 'Scaduta'
  if (card.nextReview === today) return 'Oggi'
  const days = Math.round((new Date(card.nextReview) - new Date(today)) / 86400000)
  if (days === 1) return 'Domani'
  if (days < 7) return `Fra ${days} giorni`
  if (days < 30) return `Fra ${Math.round(days / 7)} sett.`
  return `Fra ${Math.round(days / 30)} mesi`
}
