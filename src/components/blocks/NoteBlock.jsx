import { formatTimeDisplay } from './TimePicker'

// Lightweight card — no subtasks, no toggle, no badge.
// Just a label with an optional time, using the same left-border card shape as other blocks.
export default function NoteBlock({ block, onDeleteBlock }) {
  return (
    <div
      className="group rounded-xl border border-borderCard p-0 flex overflow-hidden"
      style={{ borderLeftWidth: '4px', borderLeftColor: block.color }}
    >
      <div className="flex-1 px-4 py-3 min-w-0 flex items-center gap-3">
        <div className="flex-1 min-w-0 flex items-baseline gap-2">
          {block.time && (
            <span className="font-mono text-[10px] text-textMeta flex-shrink-0">
              {formatTimeDisplay(block.time)}
            </span>
          )}
          <span className="font-serif text-base text-textPrimary truncate">{block.name}</span>
        </div>
        <button
          onClick={() => onDeleteBlock(block.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-lborder hover:text-coral flex-shrink-0"
          title="Delete block"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
            <path d="M3 4h10M6 4V2.5h4V4M5 4l.5 9h5L11 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
