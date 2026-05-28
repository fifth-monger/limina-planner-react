// The three energy modes the user can pick each morning.
// dot colors match the TopBar pill so the visual language is consistent.
const MODES = [
  {
    id: 'productive',
    label: 'Full day',
    description: 'I have energy. Show me everything.',
    dot: '#4A9FC4',
  },
  {
    id: 'medium',
    label: 'Lighter load',
    description: "I'm okay but not at full capacity.",
    dot: '#C8922A',
  },
  {
    id: 'bareMinimum',
    label: 'Essentials only',
    description: "Anchors and bare minimums. That's enough today.",
    dot: '#9070B8',
  },
]

// This modal has no close button — the user must pick a mode.
// That's intentional: it's a gentle forcing function to set an intention for the day.
export default function EnergyCheckInModal({ isOpen, onSelect }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl shadow-xl max-w-sm w-full p-6">
        <h2 className="font-serif text-xl text-charcoal mb-1">Good morning.</h2>
        <p className="font-sans text-sm text-muted mb-5">How's your energy today?</p>

        <div className="flex flex-col gap-2">
          {MODES.map(mode => (
            <button
              key={mode.id}
              onClick={() => onSelect(mode.id)}
              className="flex items-center gap-3 p-3 rounded-xl border border-lborder bg-parchment hover:bg-white hover:border-charcoal transition-colors text-left"
            >
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: mode.dot }}
              />
              <div>
                <p className="font-sans text-sm font-medium text-charcoal">{mode.label}</p>
                <p className="font-mono text-[9px] text-muted leading-snug">{mode.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
