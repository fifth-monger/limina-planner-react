export default function OpenQuestions({ questions, onOpenModal }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Open Questions</span>
        <button onClick={() => onOpenModal('questions')} className="text-muted hover:text-charcoal transition-colors" title="Edit questions">
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
            <path d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {questions.map(q => (
          <p key={q.id} className="font-sans text-sm text-charcoal leading-snug">— {q.text}</p>
        ))}
        {questions.length === 0 && (
          <p className="font-sans text-sm text-muted italic">no open questions</p>
        )}
      </div>
    </div>
  )
}
