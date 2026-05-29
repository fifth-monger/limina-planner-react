// Convert an HH:MM 24-hour string to total minutes since midnight.
// Returns 1441 (beyond midnight) for empty/unset times — this sorts them last.
export function timeToMinutes(time) {
  if (!time || time === '') return 1441
  if (time === 'eve') return 1380
  const [h, m] = time.split(':').map(Number)
  return h * 60 + (m || 0)
}

// Parse human-readable duration strings to minutes.
// Handles: "~1 hr", "~2 hrs", "~1.5 hrs", "~30 min", "~45 min", "1 hr 30 min"
export function parseDurationToMinutes(duration) {
  if (!duration) return 0
  const s = duration.toLowerCase().replace(/~/g, '').trim()
  let total = 0
  const hrMatch = s.match(/(\d+\.?\d*)\s*hr/)
  if (hrMatch) total += parseFloat(hrMatch[1]) * 60
  const minMatch = s.match(/(\d+)\s*min/)
  if (minMatch) total += parseInt(minMatch[1])
  return total
}

// Calculate an end time string given a 24h start time and a duration string.
// Returns null if either is missing or duration is zero.
// Example: calcEndTime('09:00', '~1.5 hrs') → '10:30 AM'
export function calcEndTime(startTime, duration) {
  if (!startTime || !duration) return null
  const startMin = timeToMinutes(startTime)
  if (startMin === 1441) return null
  const durationMin = parseDurationToMinutes(duration)
  if (durationMin === 0) return null
  const endMin = startMin + durationMin
  const h = Math.floor(endMin / 60) % 24
  const m = endMin % 60
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`
}
