import { formatTimeDisplay } from '../blocks/TimePicker'

export default function AlarmList({ alarms, onOpenModal, onToggleAlarm }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Alarms</span>
        <button
          onClick={() => onOpenModal('alarms')}
          className="text-muted hover:text-charcoal transition-colors"
          title="Edit alarms"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
            <path d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {alarms.length === 0 && (
          <p className="font-mono text-[9px] italic text-muted">no alarms set</p>
        )}
        {alarms.map(alarm => (
          <div key={alarm.id} className="flex items-start gap-2">
            <span className="text-[11px] mt-0.5 flex-shrink-0">🔔</span>
            <div className="flex-1 min-w-0">
              <span className="font-mono text-[10px] text-muted mr-1.5 whitespace-nowrap">
                {formatTimeDisplay(alarm.time)}
              </span>
              <span className={`font-sans text-sm ${alarm.active ? 'text-charcoal' : 'text-muted line-through'}`}>
                {alarm.label}
              </span>
            </div>
            {/* Active toggle dot */}
            <button
              onClick={() => onToggleAlarm(alarm.id)}
              title={alarm.active ? 'Disable alarm' : 'Enable alarm'}
              className={`w-3 h-3 rounded-full border-2 flex-shrink-0 mt-1 transition-colors
                ${alarm.active
                  ? 'bg-cerulean border-cerulean'
                  : 'bg-transparent border-lborder hover:border-cerulean'}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
