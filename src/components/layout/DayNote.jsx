export default function DayNote({ note }) {
  if (!note) return null
  return (
    <div className="rounded-lg bg-surface border border-lborder px-3 py-2 mb-4">
      <p className="font-mono text-[9px] uppercase tracking-widest text-muted mb-1">day note</p>
      <p className="font-sans text-sm text-charcoal leading-snug">{note}</p>
    </div>
  )
}
