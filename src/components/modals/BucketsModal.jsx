import { useState } from 'react'

export default function BucketsModal({ buckets, isOpen, onClose, onSave }) {
  const [draft, setDraft] = useState(buckets)

  if (!isOpen) return null

  function handleNameChange(id, name) {
    setDraft(prev => prev.map(b => b.id === id ? { ...b, name } : b))
  }

  function handleAddBucket() {
    const id = 'bucket-' + Date.now()
    setDraft(prev => [...prev, { id, name: '', color: '#7A7870' }])
  }

  function handleSave() {
    onSave(draft.filter(b => b.name.trim() !== ''))
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(46,46,44,0.45)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[14px] w-full max-w-sm mx-4 flex flex-col overflow-hidden shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-borderAccent">
          <h2 className="font-serif text-lg text-charcoal">Buckets</h2>
          <button onClick={onClose} className="text-muted hover:text-charcoal text-xl leading-none">✕</button>
        </div>

        <div className="p-5 flex flex-col gap-2 overflow-y-auto max-h-80">
          {draft.map(b => (
            <div key={b.id} className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: b.color }} />
              <input
                className="flex-1 font-sans text-sm text-charcoal bg-parchment border border-borderAccent rounded-lg px-3 py-1.5 outline-none focus:border-cerulean"
                value={b.name}
                onChange={e => handleNameChange(b.id, e.target.value)}
              />
            </div>
          ))}
          <button
            onClick={handleAddBucket}
            className="w-full font-mono text-xs uppercase tracking-widest text-muted border border-dashed border-borderAccent rounded-lg py-2 hover:border-cerulean hover:text-cerulean transition-colors mt-1"
          >
            + new bucket
          </button>
        </div>

        <div className="flex gap-2 px-5 py-4 border-t border-borderAccent">
          <button onClick={onClose} className="flex-1 font-sans text-sm text-muted border border-borderAccent rounded-lg py-2 hover:border-charcoal transition-colors">
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
