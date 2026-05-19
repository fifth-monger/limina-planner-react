export default function SubTask({ subtask, shape, onToggle }) {
  const isBox = shape === 'box'

  return (
    <button
      onClick={() => onToggle(subtask.id)}
      className="flex items-center gap-2.5 w-full text-left group"
    >
      {isBox ? (
        <span className={`w-4 h-4 flex-shrink-0 rounded-sm border flex items-center justify-center transition-colors
          ${subtask.done ? 'bg-moss border-moss' : 'border-lborder group-hover:border-moss'}`}
        >
          {subtask.done && (
            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </span>
      ) : (
        <span className={`w-4 h-4 flex-shrink-0 rounded-full border-2 transition-colors
          ${subtask.done ? 'bg-moss border-moss' : 'border-lborder group-hover:border-moss'}`}
        />
      )}
      <span className={`font-sans text-sm transition-colors
        ${subtask.done ? 'line-through text-muted' : 'text-charcoal'}`}
      >
        {subtask.text}
      </span>
    </button>
  )
}
