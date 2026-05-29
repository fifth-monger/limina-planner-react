import { useState, useEffect } from 'react'
import TimePicker from '../blocks/TimePicker'

const ALL_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const TYPE_OPTIONS = [
  { id: 'anchor', label: '⚓ anchor', description: 'Habit, resets daily' },
  { id: 'focus',  label: 'focus',    description: 'Project work' },
  { id: 'note',   label: 'note',     description: 'Reminder or label' },
]

const BLANK = (defaultDay, buckets) => ({
  label: '',
  time: '',
  days: defaultDay ? [defaultDay] : [],
  type: 'anchor',
  bucketId: buckets[0]?.id ?? '',
  repeats: false,
})

export default function AddBlockModal({ isOpen, onClose, onAdd, buckets, defaultDay }) {
  const [draft, setDraft] = useState(() => BLANK(defaultDay, buckets))

  // Reset form each time the modal opens
  useEffect(() => {
    if (isOpen) setDraft(BLANK(defaultDay, buckets))
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen) return null

  function toggleDay(day) {
    setDraft(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day],
    }))
  }

  function handleSave() {
    if (!draft.label.trim() || draft.days.length === 0) return

    const base = {
      name: draft.label.trim(),
      time: draft.time,
      duration: '',
      subtasks: [],
      repeats: draft.repeats,
    }

    let blockData
    if (draft.type === 'anchor') {
      blockData = { ...base, type: 'task', isLifeAnchor: true, color: '#B09070', energyLevel: 'bareMinimum' }
    } else if (draft.type === 'focus') {
      const bucket = buckets.find(b => b.id === draft.bucketId) ?? buckets[0]
      if (!bucket) return
      blockData = { ...base, type: 'focus', name: bucket.name, bucketId: bucket.id, color: bucket.color, energyLevel: 'productive' }
    } else {
      blockData = { ...base, type: 'note', color: '#C4BAA8', energyLevel: 'medium' }
    }

    onAdd(draft.days, blockData)
    onClose()
  }

  const canSave = draft.label.trim().length > 0 && draft.days.length > 0

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[85vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-borderCard flex-shrink-0">
          <h2 className="font-serif text-xl text-charcoal">New Block</h2>
          <button onClick={onClose} className="text-muted hover:text-charcoal transition-colors text-xl leading-none">
            ×
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">

          {/* Label */}
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-textMeta block mb-1.5">
              Label
            </label>
            <input
              className="w-full font-sans text-sm text-charcoal bg-parchment border border-borderCard rounded-lg px-3 py-2 outline-none focus:border-cerulean transition-colors"
              value={draft.label}
              onChange={e => setDraft(prev => ({ ...prev, label: e.target.value }))}
              onKeyDown={e => { if (e.key === 'Enter' && canSave) handleSave() }}
              placeholder="block name…"
              autoFocus
            />
          </div>

          {/* Time */}
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-textMeta block mb-1.5">
              Time
            </label>
            <TimePicker
              value={draft.time}
              onChange={time => setDraft(prev => ({ ...prev, time }))}
            />
          </div>

          {/* Type */}
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-textMeta block mb-1.5">
              Type
            </label>
            <div className="flex gap-2">
              {TYPE_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setDraft(prev => ({ ...prev, type: opt.id }))}
                  className={`flex-1 flex flex-col gap-0.5 items-start px-3 py-2.5 rounded-xl border transition-colors text-left
                    ${draft.type === opt.id
                      ? 'border-cerulean bg-cerulean-light'
                      : 'border-borderCard bg-parchment hover:border-cerulean'}`}
                >
                  <span className={`font-mono text-[9px] uppercase tracking-widest ${draft.type === opt.id ? 'text-cerulean' : 'text-textMeta'}`}>
                    {opt.label}
                  </span>
                  <span className="font-mono text-[8px] text-textMeta/70 leading-snug">{opt.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bucket selector — only when type is focus */}
          {draft.type === 'focus' && (
            <div>
              <label className="font-mono text-[9px] uppercase tracking-widest text-textMeta block mb-1.5">
                Bucket
              </label>
              <div className="flex flex-wrap gap-2">
                {buckets.map(b => (
                  <button
                    key={b.id}
                    onClick={() => setDraft(prev => ({ ...prev, bucketId: b.id }))}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-sans text-sm transition-colors
                      ${draft.bucketId === b.id
                        ? 'text-charcoal bg-white shadow-sm'
                        : 'border-borderCard text-textMeta hover:text-charcoal'}`}
                    style={{ borderColor: draft.bucketId === b.id ? b.color : undefined }}
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: b.color }} />
                    {b.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Days */}
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-textMeta block mb-1.5">
              Days
            </label>
            <div className="flex gap-1.5 flex-wrap">
              {ALL_DAYS.map(day => {
                const active = draft.days.includes(day)
                return (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`font-mono text-[9px] uppercase tracking-widest px-2.5 py-1.5 rounded-lg border transition-colors
                      ${active
                        ? 'bg-charcoal text-white border-charcoal'
                        : 'bg-parchment text-textMeta border-borderCard hover:border-charcoal'}`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Repeats */}
          <div className="flex items-center gap-3">
            <label className="font-mono text-[9px] uppercase tracking-widest text-textMeta">
              Repeats
            </label>
            <button
              onClick={() => setDraft(prev => ({ ...prev, repeats: !prev.repeats }))}
              className={`w-8 h-4 rounded-full transition-colors relative flex-shrink-0
                ${draft.repeats ? 'bg-cerulean' : 'bg-borderCard'}`}
            >
              <span
                className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform
                  ${draft.repeats ? 'translate-x-4' : 'translate-x-0.5'}`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-borderCard flex-shrink-0 flex items-center gap-3">
          <button
            onClick={onClose}
            className="font-mono text-[9px] uppercase tracking-widest text-textMeta hover:text-charcoal transition-colors"
          >
            cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="flex-1 font-sans text-sm text-white bg-cerulean rounded-xl py-2 hover:bg-[#3A8FB4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add block
          </button>
        </div>
      </div>
    </div>
  )
}
