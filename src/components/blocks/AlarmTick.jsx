import { formatTimeDisplay } from './TimePicker'

// Standalone alarm — no block overlaps this time.
// Rendered as quiet muted italic text, not a block-like element.
export default function AlarmTick({ alarm }) {
  return (
    <div className="flex items-center gap-1.5 py-0.5 pl-1">
      <span className="font-mono text-[9px] text-muted italic flex-shrink-0">
        {formatTimeDisplay(alarm.time)}
      </span>
      <span className="font-mono text-[9px] text-muted">·</span>
      <span className="font-mono text-[9px] text-muted italic truncate">
        {alarm.label}
      </span>
    </div>
  )
}
