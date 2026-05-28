// ── Notification permission ───────────────────────────────────────────────────

// Asks the browser for permission to show notifications.
// Returns true if granted, false if denied or unsupported.
// We only need to call this once — once granted, permission persists.
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications')
    return false
  }
  if (Notification.permission === 'granted') return true
  if (Notification.permission === 'denied') return false

  const permission = await Notification.requestPermission()
  return permission === 'granted'
}

// ── Alarm scheduling ──────────────────────────────────────────────────────────

// Schedule all of today's active alarms using setTimeout.
// We store the timeout IDs on window._alarmTimeouts so we can cancel them
// when alarms change (e.g. user edits or deletes an alarm mid-day).
//
// IMPORTANT limitation to know about:
// These alarms only fire while the app tab is open in the browser.
// True background alarms (firing when the tab is closed) would require
// the Push API and a backend server — that's a future phase.
export function scheduleAlarms(alarms, activeDay, onSnooze) {
  // Cancel any previously scheduled alarms before rescheduling
  if (window._alarmTimeouts) {
    window._alarmTimeouts.forEach(id => clearTimeout(id))
  }
  window._alarmTimeouts = []

  const now = new Date()

  alarms.forEach(alarm => {
    if (!alarm.active) return
    if (!alarm.days.includes(activeDay)) return

    const [hour, minute] = alarm.time.split(':').map(Number)
    const alarmTime = new Date()
    alarmTime.setHours(hour, minute, 0, 0)

    const msUntilAlarm = alarmTime - now
    if (msUntilAlarm <= 0) return // already passed today

    const timeoutId = setTimeout(() => {
      fireAlarm(alarm, onSnooze)
    }, msUntilAlarm)

    window._alarmTimeouts.push(timeoutId)
  })
}

// ── Alarm firing ──────────────────────────────────────────────────────────────

// Fire a single system notification for an alarm.
// The `tag` field deduplicates: if the same alarm fires twice, the second
// notification replaces the first rather than stacking.
// `requireInteraction: true` keeps it on screen until the user dismisses it.
export function fireAlarm(alarm, onSnooze) {
  if (Notification.permission !== 'granted') return

  playAlarmSound()

  const notification = new Notification('limina planner', {
    body: alarm.label,
    icon: '/favicon.svg',
    tag: alarm.id,
    requireInteraction: true,
  })

  // Clicking the notification triggers a snooze.
  // The Web Notification API doesn't support custom action buttons in all browsers,
  // so we use the click event as the snooze trigger instead.
  notification.onclick = () => {
    notification.close()
    if (alarm.snoozeMinutes > 0) {
      onSnooze(alarm)
    }
  }
}

// ── Sound ─────────────────────────────────────────────────────────────────────

// Synthesize a two-tone chime using the Web Audio API.
// No audio files needed — we generate the sound mathematically in the browser.
// The gain ramps create a smooth fade-in/fade-out so it doesn't click.
//
// Note: browser security requires a user gesture (click, keypress) before audio
// can play. Since alarms are triggered by setTimeout — not a direct user action —
// some browsers may block this the first time. Clicking anywhere in the app
// first resolves this.
export function playAlarmSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return

    const ctx = new AudioContext()
    const tones = [523.25, 659.25] // C5 then E5

    tones.forEach((freq, i) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.type = 'sine'
      oscillator.frequency.value = freq

      const startTime = ctx.currentTime + i * 0.3
      gainNode.gain.setValueAtTime(0, startTime)
      gainNode.gain.linearRampToValueAtTime(0.4, startTime + 0.05)
      gainNode.gain.linearRampToValueAtTime(0, startTime + 0.4)

      oscillator.start(startTime)
      oscillator.stop(startTime + 0.4)
    })
  } catch (e) {
    console.warn('Audio not available:', e)
  }
}
