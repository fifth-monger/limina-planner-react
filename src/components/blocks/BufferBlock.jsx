export default function BufferBlock({ block }) {
  return (
    <div className="flex items-center gap-3 py-1 px-2">
      <div className="flex-1 h-px bg-borderCard" />
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-textMeta/60 flex-shrink-0">
        {block.label}
      </p>
      <div className="flex-1 h-px bg-borderCard" />
    </div>
  )
}
