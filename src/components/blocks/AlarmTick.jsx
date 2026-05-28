import { formatTimeDisplay } from './TimePicker'

// A lightweight timeline annotation — not a full block, just a tick mark
// on the spine with a time and label. Sits between blocks in the sorted timeline.
export default function AlarmTick({ alarm }) {
  return (
    <div className="flex items-center gap-3 py-0.5 -mx-1 px-1">
      {/* Left spine area — matches the width of the block spine dots */}
      <div className="flex items-center justify-center w-[26px] flex-shrink-0">
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-3 h-px bg-lborder" />
          <span className="text-[9px] leading-none">🔔</span>
        </div>
      </div>

      {/* Time + label */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-mono text-[9px] text-muted flex-shrink-0">
          {formatTimeDisplay(alarm.time)}
        </span>
        <span className="font-mono text-[9px] text-charcoal italic truncate">
          {alarm.label}
        </span>
      </div>
    </div>
  )
}
