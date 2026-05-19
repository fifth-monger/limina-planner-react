export default function TopBar() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  })

  return (
    <header className="bg-surface border-b border-lborder px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="font-serif text-2xl text-charcoal leading-tight">limina planner</h1>
        <p className="font-mono text-xs text-muted tracking-widest uppercase mt-0.5">
          your threshold, your rhythm
        </p>
      </div>
      <span className="font-mono text-xs text-muted tracking-wide">{today}</span>
    </header>
  )
}
