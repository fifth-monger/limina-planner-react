export default function BucketList({ buckets, bucketCounts = {}, onOpenModal, onSelectBucket }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Buckets</span>
        <button
          onClick={() => onOpenModal('buckets')}
          className="text-muted hover:text-charcoal transition-colors"
          title="Edit buckets"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
            <path d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-1">
        {buckets.map(b => {
          const count = bucketCounts[b.id] || 0
          return (
            <button
              key={b.id}
              onClick={() => onSelectBucket(b.id)}
              className="group flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-parchment transition-colors text-left w-full"
            >
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: b.color }} />
              <span className="font-sans text-sm text-charcoal flex-1">{b.name}</span>
              {count > 0 && (
                <span
                  className="font-mono text-[9px] px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: b.color + '25', color: b.color }}
                >
                  {count}
                </span>
              )}
              {/* Arrow shifts right on hover via group-hover */}
              <span className="font-mono text-xs text-muted group-hover:translate-x-0.5 transition-transform">
                ›
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
