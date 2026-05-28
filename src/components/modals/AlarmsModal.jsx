import { useState } from 'react'

const ALL_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Convert "14:00" → { hour: '2', minute: '00', ampm: 'PM' }
function parseTo12h(time24) {
  if (!time24) return { hour: '8', minute: '00', ampm: 'AM' }
  const [h, m] = time24.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h
  return { hour: String(hour12), minute: String(m).padStart(2, '0'), ampm }
}

// Convert { hour: '2', minute: '00', ampm: 'PM' } → "14:00"
function to24h(hour, minute, ampm) {
  let h = parseInt(hour, 10)
  if (ampm === 'PM' && h !== 12) h += 12
  if (ampm === 'AM' && h === 12) h = 0
  return `${String(h).padStart(2, '0')}:${minute}`
}

const BLANK_ALARM = {
  label: '',
  time: '09:00',
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  snoozeMinutes: 10,
  active: true,
}

export default function AlarmsModal({ alarms, isOpen, onClose, onAdd, onUpdate, onDelete }) {
  // Which alarm row is expanded into edit form? null = list view, 'new' = new alarm form
  // This is LOCAL state — nothing outside this modal needs to know which row is editing.
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState(null) // the in-progress edits

  if (!isOpen) return null

  function startEdit(alarm) {
    setEditingId(alarm.id)
    const { hour, minute, ampm } = parseTo12h(alarm.time)
    setDraft({ ...alarm, hour, minute, ampm })
  }

  function startNew() {
    setEditingId('new')
    const { hour, minute, ampm } = parseTo12h(BLANK_ALARM.time)
    setDraft({ ...BLANK_ALARM, hour, minute, ampm })
  }

  function cancelEdit() {
    setEditingId(null)
    setDraft(null)
  }

  function saveEdit() {
    if (!draft) return
    const time = to24h(draft.hour, draft.minute, draft.ampm)
    const cleaned = { ...draft, time }
    delete cleaned.hour; delete cleaned.minute; delete cleaned.ampm

    if (editingId === 'new') {
      onAdd(cleaned)
    } else {
      onUpdate(editingId, cleaned)
    }
    setEditingId(null)
    setDraft(null)
  }

  function toggleDraftDay(day) {
    setDraft(prev => {
      const has = prev.days.includes(day)
      return {
        ...prev,
        days: has ? prev.days.filter(d => d !== day) : [...prev.days, day],
      }
    })
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-md max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-lborder flex-shrink-0">
          <h2 className="font-serif text-xl text-charcoal">Alarms</h2>
          <button onClick={onClose} className="text-muted hover:text-charcoal transition-colors text-xl leading-none">×</button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-2">
          {[...alarms].sort((a, b) => a.time.localeCompare(b.time)).map(alarm => (
            <div key={alarm.id} className="rounded-xl border border-lborder overflow-hidden">
              {/* Collapsed row */}
              {editingId !== alarm.id ? (
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm text-charcoal truncate">{alarm.label}</p>
                    <p className="font-mono text-[9px] text-muted mt-0.5">
                      {formatTime12(alarm.time)} · {formatDays(alarm.days)} · snooze {alarm.snoozeMinutes} min
                    </p>
                  </div>
                  <button
                    onClick={() => startEdit(alarm)}
                    className="font-mono text-[9px] uppercase tracking-widest text-muted hover:text-cerulean transition-colors flex-shrink-0 px-2 py-1"
                  >
                    edit
                  </button>
                  <button
                    onClick={() => onDelete(alarm.id)}
                    className="text-muted hover:text-coral transition-colors flex-shrink-0 text-base leading-none"
                    title="Delete alarm"
                  >
                    ×
                  </button>
                </div>
              ) : (
                // Expanded edit form
                <EditForm
                  draft={draft}
                  setDraft={setDraft}
                  onToggleDay={toggleDraftDay}
                  onCancel={cancelEdit}
                  onSave={saveEdit}
                />
              )}
            </div>
          ))}

          {/* New alarm form */}
          {editingId === 'new' ? (
            <div className="rounded-xl border border-cerulean overflow-hidden">
              <EditForm
                draft={draft}
                setDraft={setDraft}
                onToggleDay={toggleDraftDay}
                onCancel={cancelEdit}
                onSave={saveEdit}
              />
            </div>
          ) : (
            <button
              onClick={startNew}
              className="w-full border border-dashed border-lborder rounded-xl py-3 font-mono text-[10px] uppercase tracking-widest text-muted hover:border-cerulean hover:text-cerulean transition-colors"
            >
              + new alarm
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Inline edit form — used for both editing an existing alarm and creating a new one
function EditForm({ draft, setDraft, onToggleDay, onCancel, onSave }) {
  if (!draft) return null

  return (
    <div className="px-4 py-3 bg-parchment flex flex-col gap-3">
      {/* Label */}
      <div>
        <label className="font-mono text-[9px] uppercase tracking-widest text-muted block mb-1">Label</label>
        <input
          className="w-full font-sans text-sm text-charcoal bg-white border border-lborder rounded-lg px-3 py-1.5 outline-none focus:border-cerulean transition-colors"
          value={draft.label}
          onChange={e => setDraft(prev => ({ ...prev, label: e.target.value }))}
          placeholder="alarm label…"
          autoFocus
        />
      </div>

      {/* Time */}
      <div>
        <label className="font-mono text-[9px] uppercase tracking-widest text-muted block mb-1">Time</label>
        <div className="flex items-center gap-2">
          {/* Hour */}
          <select
            className="font-mono text-sm text-charcoal bg-white border border-lborder rounded-lg px-2 py-1.5 outline-none focus:border-cerulean"
            value={draft.hour}
            onChange={e => setDraft(prev => ({ ...prev, hour: e.target.value }))}
          >
            {['1','2','3','4','5','6','7','8','9','10','11','12'].map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
          <span className="font-mono text-sm text-muted">:</span>
          {/* Minute */}
          <select
            className="font-mono text-sm text-charcoal bg-white border border-lborder rounded-lg px-2 py-1.5 outline-none focus:border-cerulean"
            value={draft.minute}
            onChange={e => setDraft(prev => ({ ...prev, minute: e.target.value }))}
          >
            {['00','15','30','45'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          {/* AM/PM */}
          <div className="flex rounded-lg border border-lborder overflow-hidden">
            {['AM', 'PM'].map(period => (
              <button
                key={period}
                onClick={() => setDraft(prev => ({ ...prev, ampm: period }))}
                className={`font-mono text-[10px] uppercase tracking-widest px-2.5 py-1.5 transition-colors
                  ${draft.ampm === period ? 'bg-cerulean text-white' : 'bg-white text-muted hover:bg-parchment'}`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Days */}
      <div>
        <label className="font-mono text-[9px] uppercase tracking-widest text-muted block mb-1">Days</label>
        <div className="flex gap-1 flex-wrap">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day => {
            const active = draft.days.includes(day)
            return (
              <button
                key={day}
                onClick={() => onToggleDay(day)}
                className={`font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded-md border transition-colors
                  ${active
                    ? 'bg-charcoal text-white border-charcoal'
                    : 'bg-white text-muted border-lborder hover:border-charcoal'}`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      {/* Snooze */}
      <div>
        <label className="font-mono text-[9px] uppercase tracking-widest text-muted block mb-1">Snooze</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max="60"
            className="font-mono text-sm text-charcoal bg-white border border-lborder rounded-lg px-3 py-1.5 w-16 outline-none focus:border-cerulean"
            value={draft.snoozeMinutes}
            onChange={e => setDraft(prev => ({ ...prev, snoozeMinutes: Math.max(1, Math.min(60, parseInt(e.target.value) || 1)) }))}
          />
          <span className="font-mono text-[10px] text-muted">minutes</span>
        </div>
      </div>

      {/* Active toggle */}
      <div className="flex items-center gap-3">
        <label className="font-mono text-[9px] uppercase tracking-widest text-muted">Active</label>
        <button
          onClick={() => setDraft(prev => ({ ...prev, active: !prev.active }))}
          className={`w-8 h-4 rounded-full transition-colors relative flex-shrink-0
            ${draft.active ? 'bg-cerulean' : 'bg-lborder'}`}
        >
          <span
            className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform
              ${draft.active ? 'translate-x-4' : 'translate-x-0.5'}`}
          />
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={onCancel}
          className="font-mono text-[9px] uppercase tracking-widest text-muted hover:text-charcoal transition-colors"
        >
          cancel
        </button>
        <button
          onClick={onSave}
          className="flex-1 font-sans text-sm text-white bg-cerulean rounded-lg py-2 hover:bg-[#3A8FB4] transition-colors"
        >
          Save alarm
        </button>
      </div>
    </div>
  )
}

// Helper: "14:00" → "2:00 PM"
function formatTime12(time) {
  if (!time) return ''
  const [h, m] = time.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${hour12}:${String(m).padStart(2, '0')} ${ampm}`
}

// Helper: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] → "every day"
function formatDays(days) {
  if (!days || days.length === 0) return 'never'
  if (days.length === 7) return 'every day'
  const weekdays = ['Mon','Tue','Wed','Thu','Fri']
  const weekend = ['Sat','Sun']
  if (weekdays.every(d => days.includes(d)) && days.length === 5) return 'weekdays'
  if (weekend.every(d => days.includes(d)) && days.length === 2) return 'weekends'
  return days.join(' ')
}
