export default function WeeklyRhythm({ rhythm, onOpenModal }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Weekly Rhythm</span>
        <button onClick={() => onOpenModal('rhythm')} className="text-muted hover:text-charcoal transition-colors" title="Edit rhythm">
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
            <path d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <pre className="font-mono text-xs text-charcoal whitespace-pre-wrap leading-relaxed">{rhythm}</pre>
    </div>
  )
}
