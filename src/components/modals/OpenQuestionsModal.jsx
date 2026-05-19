import { useState } from 'react'

export default function OpenQuestionsModal({ questions, isOpen, onClose, onSave }) {
  const [draft, setDraft] = useState(questions)

  if (!isOpen) return null

  function handleChange(id, text) {
    setDraft(prev => prev.map(q => q.id === id ? { ...q, text } : q))
  }

  function handleAdd() {
    setDraft(prev => [...prev, { id: 'oq-' + Date.now(), text: '' }])
  }

  function handleSave() {
    onSave(draft.filter(q => q.text.trim() !== ''))
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
          <h2 className="font-serif text-lg text-charcoal">Open Questions</h2>
          <button onClick={onClose} className="text-muted hover:text-charcoal text-xl leading-none">✕</button>
        </div>

        <div className="p-5 flex flex-col gap-2 overflow-y-auto max-h-72">
          {draft.map(q => (
            <input
              key={q.id}
              className="w-full font-sans text-sm text-charcoal bg-parchment border border-lborder rounded-lg px-3 py-1.5 outline-none focus:border-cerulean"
              value={q.text}
              onChange={e => handleChange(q.id, e.target.value)}
              placeholder="what's on your mind?"
            />
          ))}
          <button
            onClick={handleAdd}
            className="w-full font-mono text-xs uppercase tracking-widest text-muted border border-dashed border-lborder rounded-lg py-2 hover:border-cerulean hover:text-cerulean transition-colors mt-1"
          >
            + add a question
          </button>
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
