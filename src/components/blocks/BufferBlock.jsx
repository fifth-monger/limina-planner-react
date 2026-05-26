export default function BufferBlock({ block }) {
  return (
    <div className="flex items-center gap-3 py-1 px-1">
      <div className="flex flex-col items-center self-stretch">
        <div className="w-px flex-1 bg-lborder" />
        <div className="w-1.5 h-1.5 rounded-full bg-lborder my-0.5" />
        <div className="w-px flex-1 bg-lborder" />
      </div>
      <p className="font-mono text-[9px] uppercase tracking-widest text-muted italic flex-1 text-center">
        — {block.label} —
      </p>
    </div>
  )
}
