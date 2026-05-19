import { useState } from 'react'

export default function RhythmModal({ rhythm, isOpen, onClose, onSave }) {
  const [draft, setDraft] = useState(rhythm)

  if (!isOpen) return null

  function handleSave() {
    onSave(draft)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(46,46,44,0.45)' }}
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-[14px] w-full max-w-sm mx-4 flex flex-col overflow-hidden shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-lborder">
          <h2 className="font-serif text-lg text-charcoal">Weekly Rhythm</h2>
          <button onClick={onClose} className="text-muted hover:text-charcoal text-xl leading-none">✕</button>
        </div>

        <div className="p-5">
          <textarea
            className="w-full font-mono text-xs text-charcoal bg-parchment border border-lborder rounded-lg px-3 py-2.5 outline-none focus:border-cerulean resize-none leading-relaxed"
            rows={6}
            value={draft}
            onChange={e => setDraft(e.target.value)}
          />
        </div>

        <div className="flex gap-2 px-5 py-4 border-t border-lborder">
          <button onClick={onClose} className="flex-1 font-sans text-sm text-muted border border-lborder rounded-lg py-2 hover:border-charcoal transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="flex-1 font-sans text-sm text-white bg-cerulean rounded-lg py-2 hover:bg-[#3A8FB4] transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
