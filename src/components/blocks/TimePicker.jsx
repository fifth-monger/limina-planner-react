import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

const HOURS = ['1','2','3','4','5','6','7','8','9','10','11','12']
const MINUTES = ['00','15','30','45']

function parse(time) {
  if (!time) return { hour: '8', minute: '00', ampm: 'AM' }
  const [h, m] = time.split(':')
  const hour24 = parseInt(h, 10)
  const ampm = hour24 >= 12 ? 'PM' : 'AM'
  const hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24
  return { hour: String(hour12), minute: m ?? '00', ampm }
}

function to24h(hour, minute, ampm) {
  let h = parseInt(hour, 10)
  if (ampm === 'PM' && h !== 12) h += 12
  if (ampm === 'AM' && h === 12) h = 0
  return `${String(h).padStart(2, '0')}:${minute}`
}

export function formatTimeDisplay(time) {
  if (!time) return 'set time'
  const { hour, minute, ampm } = parse(time)
  return `${hour}:${minute} ${ampm}`
}

export default function TimePicker({ value, onChange }) {
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })

  const parsed = parse(value)
  const [hour, setHour] = useState(parsed.hour)
  const [minute, setMinute] = useState(parsed.minute)
  const [ampm, setAmpm] = useState(parsed.ampm)

  useEffect(() => {
    const p = parse(value)
    setHour(p.hour)
    setMinute(p.minute)
    setAmpm(p.ampm)
  }, [value])

  function handleOpen() {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      // If there's not enough room below, open upward
      const spaceBelow = window.innerHeight - rect.bottom
      const dropdownHeight = 110
      const top = spaceBelow < dropdownHeight
        ? rect.top - dropdownHeight - 4
        : rect.bottom + 4
      setPos({ top, left: rect.left })
    }
    setOpen(v => !v)
  }

  // Close + commit on outside click
  useEffect(() => {
    if (!open) return
    function onMouseDown(e) {
      const clickedButton = buttonRef.current?.contains(e.target)
      const clickedDropdown = dropdownRef.current?.contains(e.target)
      if (!clickedButton && !clickedDropdown) {
        onChange(to24h(hour, minute, ampm))
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [open, hour, minute, ampm, onChange])

  const dropdown = open && (
    <div
      ref={dropdownRef}
      style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 9999 }}
      className="bg-surface border border-lborder rounded-xl shadow-lg p-3 flex flex-col gap-2.5"
      onMouseDown={e => e.stopPropagation()}
    >
      <div className="flex items-center gap-1.5">
        <select
          className="font-mono text-xs text-charcoal bg-parchment border border-lborder rounded-lg px-2 py-1.5 outline-none focus:border-cerulean"
          style={{ width: 52 }}
          value={hour}
          onChange={e => setHour(e.target.value)}
        >
          {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
        </select>

        <span className="font-mono text-xs text-muted font-bold">:</span>

        <select
          className="font-mono text-xs text-charcoal bg-parchment border border-lborder rounded-lg px-2 py-1.5 outline-none focus:border-cerulean"
          style={{ width: 52 }}
          value={minute}
          onChange={e => setMinute(e.target.value)}
        >
          {MINUTES.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <div className="flex rounded-lg border border-lborder overflow-hidden ml-1">
          {['AM', 'PM'].map(ap => (
            <button
              key={ap}
              className={`font-mono text-[10px] px-2.5 py-1.5 transition-colors
                ${ampm === ap ? 'bg-cerulean text-white' : 'text-muted hover:text-charcoal bg-surface'}`}
              onClick={() => setAmpm(ap)}
            >
              {ap}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button
        ref={buttonRef}
        className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-cerulean transition-colors"
        onClick={handleOpen}
      >
        {formatTimeDisplay(value)}
      </button>
      {createPortal(dropdown, document.body)}
    </>
  )
}
