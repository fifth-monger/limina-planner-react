import { useState, useRef, useEffect } from 'react'

const MODES = [
  { id: 'productive',  label: 'full day',       dot: '#4A9FC4' },
  { id: 'medium',      label: 'lighter load',   dot: '#C8922A' },
  { id: 'bareMinimum', label: 'essentials only', dot: '#9070B8' },
]

export default function TopBar({ energyMode, onModeChange }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  })

  const [showPopover, setShowPopover] = useState(false)
  // useRef gives us a stable reference to the popover DOM node.
  // When a click happens anywhere on the page, we check if it was inside or outside.
  const popoverRef = useRef(null)

  // This effect adds a global mousedown listener whenever the popover is open,
  // and removes it when the popover closes (or the component unmounts).
  // The cleanup function (the `return () => ...`) is what removes the listener —
  // without it, old listeners would pile up every time the popover opened.
  useEffect(() => {
    if (!showPopover) return
    function handleOutsideClick(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setShowPopover(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [showPopover])

  const current = MODES.find(m => m.id === energyMode) ?? MODES[0]

  return (
    <header className="bg-surface border-b border-lborder px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="font-serif text-2xl text-charcoal leading-tight">limina planner</h1>
        <p className="font-mono text-xs text-muted tracking-widest uppercase mt-0.5">
          your threshold, your rhythm
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Energy mode pill — click to open popover */}
        <div className="relative" ref={popoverRef}>
          <button
            onClick={() => setShowPopover(v => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-lborder bg-parchment hover:border-charcoal transition-colors"
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: current.dot }}
            />
            <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal">
              {current.label}
            </span>
            {/* Chevron icon */}
            <svg className="w-3 h-3 text-muted ml-0.5" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {showPopover && (
            <div className="absolute right-0 top-full mt-1.5 bg-surface border border-lborder rounded-xl shadow-lg z-40 w-44 py-1.5 overflow-hidden">
              {MODES.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => { onModeChange(mode.id); setShowPopover(false) }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors
                    ${mode.id === energyMode ? 'bg-parchment' : 'hover:bg-parchment'}`}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: mode.dot }}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal">
                    {mode.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <span className="font-mono text-xs text-muted tracking-wide">{today}</span>
      </div>
    </header>
  )
}
