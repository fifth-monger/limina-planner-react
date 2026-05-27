import { weekDays } from '../../data/initialData'

const DAY_ABBREVS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const todayAbbrev = DAY_ABBREVS[new Date().getDay()]

const modeLabel = {
  'hem + hunt':   'hem + hunt',
  'hemingway':    'hemingway',
  'hem + limina': 'hem + limina',
  'rest / admin': 'rest / admin',
  'rest':         'rest',
}

export default function WeeklyRhythm({ onOpenModal }) {
  return (
    <div className="bg-surface border-b border-lborder px-6 py-2 flex items-center gap-2 overflow-x-auto">
      <span className="font-mono text-[9px] uppercase tracking-widest text-muted flex-shrink-0 mr-2">
        rhythm
      </span>

      <div className="flex gap-1 flex-1">
        {weekDays.map(d => {
          const isToday = d.day === todayAbbrev
          const isWork = d.modeType === 'hem'
          const label = modeLabel[d.mode] ?? d.mode

          return (
            <div
              key={d.day}
              className={`flex-1 flex flex-col items-center gap-1 py-1.5 px-1 rounded-lg min-w-0
                ${isToday ? 'bg-parchment' : ''}`}
            >
              <span className={`font-mono text-[9px] uppercase tracking-widest leading-none
                ${isToday ? 'text-[#D85A30]' : 'text-muted'}`}>
                {d.day[0]}
              </span>
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: isWork ? '#D85A30' : '#D8CFC4' }}
              />
              <span
                className="font-mono text-center leading-tight truncate w-full text-center"
                style={{
                  fontSize: '7px',
                  color: isWork ? '#D85A30' : '#C4BAA8',
                  letterSpacing: '0.02em',
                }}
                title={label}
              >
                {isWork ? label : '·'}
              </span>
            </div>
          )
        })}
      </div>

      <button
        onClick={() => onOpenModal('rhythm')}
        className="text-muted hover:text-charcoal transition-colors flex-shrink-0 ml-2"
        title="Edit rhythm"
      >
        <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
          <path d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
