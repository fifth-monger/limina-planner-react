import { useState } from 'react'

export default function BucketDetail({ bucket, onClose, onAddItem, onToggleItem, onDeleteItem }) {
  // showCompleted is LOCAL state — nothing outside this component cares about it.
  // It's purely a display preference: "do I want to see the done items right now?"
  const [showCompleted, setShowCompleted] = useState(false)
  const [newItemText, setNewItemText] = useState('')

  const undoneItems = bucket.backlog.filter(item => !item.done)
  const doneItems   = bucket.backlog.filter(item =>  item.done)

  function handleAddKeyDown(e) {
    if (e.key === 'Enter')  commitAdd()
    if (e.key === 'Escape') setNewItemText('')
  }

  function commitAdd() {
    if (newItemText.trim()) {
      onAddItem(newItemText.trim())
      setNewItemText('')
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onClose}
          className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-charcoal transition-colors flex items-center gap-1"
        >
          ← back
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: bucket.color }} />
          <span className="font-serif text-base text-charcoal">{bucket.name}</span>
        </div>
      </div>

      <div className="border-t border-lborder mb-4" />

      {/* Section label + show-completed toggle */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted">Backlog</span>
        {doneItems.length > 0 && (
          <button
            onClick={() => setShowCompleted(v => !v)}
            className="font-mono text-[9px] text-muted hover:text-charcoal transition-colors"
          >
            {showCompleted ? 'hide completed' : `show completed (${doneItems.length})`}
          </button>
        )}
      </div>

      {/* Backlog list */}
      <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
        {/* Empty state */}
        {undoneItems.length === 0 && (
          <p className="font-mono text-[9px] italic text-muted text-center mt-6">
            backlog is clear ✓
          </p>
        )}

        {/* Undone items */}
        {undoneItems.map(item => (
          <BacklogRow
            key={item.id}
            item={item}
            color={bucket.color}
            onToggle={() => onToggleItem(item.id)}
            onDelete={() => onDeleteItem(item.id)}
          />
        ))}

        {/* Done items — only if toggled on */}
        {showCompleted && doneItems.map(item => (
          <BacklogRow
            key={item.id}
            item={item}
            color={bucket.color}
            onToggle={() => onToggleItem(item.id)}
            onDelete={() => onDeleteItem(item.id)}
          />
        ))}
      </div>

      {/* Add task input */}
      <div className="mt-3 pt-3 border-t border-lborder">
        <div className="flex items-center gap-2.5">
          <span className="w-4 h-4 rounded-full border-2 border-lborder flex-shrink-0" />
          <input
            className="flex-1 font-sans text-sm text-charcoal bg-transparent border-b border-dashed border-lborder outline-none pb-0.5 placeholder:text-muted/50"
            placeholder="add to backlog…"
            value={newItemText}
            onChange={e => setNewItemText(e.target.value)}
            onBlur={commitAdd}
            onKeyDown={handleAddKeyDown}
          />
        </div>
      </div>
    </div>
  )
}

// Extracted into its own little component to keep the list clean.
// This is a common React pattern: if a repeated row has its own logic, give it a name.
function BacklogRow({ item, color, onToggle, onDelete }) {
  return (
    <div className="group flex items-center gap-2.5 py-0.5">
      {/* Circle checkbox */}
      <button
        onClick={onToggle}
        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors
          ${item.done
            ? 'border-moss bg-moss'
            : 'border-lborder hover:border-moss'}`}
        style={item.done ? {} : { borderColor: color + '80' }}
      />
      {/* Text */}
      <span
        className={`font-sans text-sm flex-1 leading-snug
          ${item.done ? 'line-through text-muted' : 'text-charcoal'}`}
      >
        {item.text}
      </span>
      {/* Delete button — visible on hover */}
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted hover:text-coral flex-shrink-0 text-base leading-none"
        title="Remove"
      >
        ×
      </button>
    </div>
  )
}
