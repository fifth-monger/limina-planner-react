import { useState, useEffect } from 'react'
import TimePicker from '../blocks/TimePicker'

const TYPE_OPTIONS = [
  { id: 'anchor', label: '⚓ anchor', description: 'Habit, resets daily' },
  { id: 'focus',  label: 'focus',    description: 'Project work' },
  { id: 'note',   label: 'note',     description: 'Reminder or label' },
]

// Derive the type string from a block object
function blockToType(block) {
  if (block.type === 'focus') return 'focus'
  if (block.type === 'note')  return 'note'
  return 'anchor'
}

export default function EditBlockModal({ block, buckets, isOpen, onClose, onSave }) {
  const [draft, setDraft] = useState(null)

  // Populate draft whenever the modal opens with a block
  useEffect(() => {
    if (isOpen && block) {
      setDraft({
        label:    block.name    ?? '',
        time:     block.time    ?? '',
        duration: block.duration ?? '',
        type:     blockToType(block),
        bucketId: block.bucketId ?? buckets[0]?.id ?? '',
      })
    }
  }, [isOpen, block]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen || !draft || !block) return null

  function handleSave() {
    if (!draft.label.trim()) return

    const base = {
      name:     draft.label.trim(),
      time:     draft.time,
      duration: draft.duration.trim(),
    }

    let changes
    if (draft.type === 'anchor') {
      changes = { ...base, type: 'task', isLifeAnchor: true, isOneOff: false,
                  color: '#B09070', energyLevel: 'bareMinimum', bucketId: undefined }
    } else if (draft.type === 'focus') {
      const bucket = buckets.find(b => b.id === draft.bucketId) ?? buckets[0]
      if (!bucket) return
      changes = { ...base, type: 'focus', name: bucket.name, isLifeAnchor: false,
                  bucketId: bucket.id, color: bucket.color, energyLevel: 'productive' }
    } else {
      changes = { ...base, type: 'note', isLifeAnchor: false, isOneOff: false,
                  color: '#C4BAA8', energyLevel: 'medium', bucketId: undefined }
    }

    onSave(block.id, changes)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[85vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-borderCard flex-shrink-0">
          <h2 className="font-serif text-xl text-charcoal">Edit Block</h2>
          <button onClick={onClose} className="text-muted hover:text-charcoal transition-colors text-xl leading-none">
            ×
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">

          {/* Label */}
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-textMeta block mb-1.5">Label</label>
            <input
              className="w-full font-sans text-sm text-charcoal bg-parchment border border-borderCard rounded-lg px-3 py-2 outline-none focus:border-cerulean transition-colors"
              value={draft.label}
              onChange={e => setDraft(prev => ({ ...prev, label: e.target.value }))}
              onKeyDown={e => { if (e.key === 'Enter' && draft.label.trim()) handleSave() }}
              autoFocus
            />
          </div>

          {/* Time */}
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-textMeta block mb-1.5">Time</label>
            <TimePicker
              value={draft.time}
              onChange={time => setDraft(prev => ({ ...prev, time }))}
            />
          </div>

          {/* Duration */}
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-textMeta block mb-1.5">
              Duration <span className="normal-case font-sans text-[9px] text-textMeta/60">e.g. ~1 hr, 30 min</span>
            </label>
            <input
              className="w-full font-sans text-sm text-charcoal bg-parchment border border-borderCard rounded-lg px-3 py-2 outline-none focus:border-cerulean transition-colors"
              value={draft.duration}
              onChange={e => setDraft(prev => ({ ...prev, duration: e.target.value }))}
              placeholder="~1 hr, 30 min…"
            />
          </div>

          {/* Type */}
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-textMeta block mb-1.5">Type</label>
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
              <label className="font-mono text-[9px] uppercase tracking-widest text-textMeta block mb-1.5">Bucket</label>
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
            disabled={!draft.label.trim()}
            className="flex-1 font-sans text-sm text-white bg-cerulean rounded-xl py-2 hover:bg-[#3A8FB4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  )
}
