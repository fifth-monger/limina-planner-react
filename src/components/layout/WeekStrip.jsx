const modeStyles = {
  hem:  { bg: 'bg-cerulean-light', text: 'text-[#2A6B87]' },
  job:  { bg: 'bg-moss-light',     text: 'text-[#3D5F33]' },
  stu:  { bg: 'bg-amber-light',    text: 'text-[#7A5010]' },
  rest: { bg: 'bg-lifebg',         text: 'text-muted' },
}

export default function WeekStrip({ days, activeDay, onDayChange }) {
  return (
    <div className="bg-surface border-b border-lborder px-6 py-3 flex gap-2 overflow-x-auto">
      {days.map((d) => {
        const isActive = d.day === activeDay
        const mode = modeStyles[d.modeType] ?? modeStyles.rest

        return (
          <button
            key={d.day}
            onClick={() => onDayChange(d.day)}
            className={`flex-1 min-w-[72px] flex flex-col items-center gap-1 px-2 py-2 rounded-lg border text-center transition-colors
              ${isActive ? 'bg-cerulean-light border-cerulean' : 'border-transparent hover:bg-surface hover:border-lborder'}`}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{d.day}</span>
            <span className={`font-serif text-lg leading-none ${isActive ? 'text-cerulean' : 'text-charcoal'}`}>
              {d.date}
            </span>
            <span className={`font-mono text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded ${mode.bg} ${mode.text}`}>
              {d.mode}
            </span>
          </button>
        )
      })}
    </div>
  )
}
