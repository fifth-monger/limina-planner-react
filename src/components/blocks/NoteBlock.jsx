import { formatTimeDisplay } from './TimePicker'
import { calcEndTime } from '../../utils/time'

export default function NoteBlock({ block, onEditBlock, onDeleteBlock }) {
  const endTime = calcEndTime(block.time, block.duration)

  return (
    <div className="group flex items-center gap-1.5 py-0.5 pl-1 min-w-0">
      {/* Time range or single time */}
      {block.time && (
        <span className="font-mono text-[10px] text-muted italic flex-shrink-0 whitespace-nowrap">
          {formatTimeDisplay(block.time)}
          {endTime && ` – ${endTime}`}
        </span>
      )}
      {block.time && <span className="font-mono text-[10px] text-muted">·</span>}

      {/* Label */}
      <span className="font-mono text-[10px] text-muted italic truncate flex-1">
        {block.name}
      </span>

      {/* Edit + delete — appear on hover */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => onEditBlock(block)}
          className="text-muted hover:text-cerulean transition-colors"
          title="Edit note"
        >
          <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
            <path d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={() => onDeleteBlock(block.id)}
          className="text-muted hover:text-coral transition-colors text-base leading-none"
          title="Delete note"
        >
          ×
        </button>
      </div>
    </div>
  )
}
