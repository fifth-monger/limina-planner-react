export default function DayNote({ note }) {
  if (!note) return null
  return (
    <div className="rounded-lg bg-white border border-borderCard px-3 py-2 mb-4">
      <p className="font-mono text-[12px] uppercase tracking-widest text-cerulean mb-1.5">day note</p>
      <p className="font-sans text-md text-textPrimary leading-snug">{note}</p>
    </div>
  )
}
