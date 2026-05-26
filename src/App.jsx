import { useState } from 'react'
import { scheduleByDay, buckets, weeklyRhythm, openQuestions, weekDays, dayNotes, startHereByDay } from './data/initialData'

import TopBar from './components/layout/TopBar'
import WeekStrip from './components/layout/WeekStrip'
import DayNote from './components/layout/DayNote'
import TaskBlock from './components/blocks/TaskBlock'
import FocusBlock from './components/blocks/FocusBlock'
import BufferBlock from './components/blocks/BufferBlock'
import Sidebar from './components/sidebar/Sidebar'
import BucketsModal from './components/modals/BucketsModal'
import RhythmModal from './components/modals/RhythmModal'
import OpenQuestionsModal from './components/modals/OpenQuestionsModal'

// Find today's day abbreviation (e.g. 'Tue') to use as the default active day
const todayDay = weekDays.find(d => d.isToday)?.day ?? weekDays[0].day

const DAY_NAMES = {
  Sun: 'Sunday', Mon: 'Monday', Tue: 'Tuesday',
  Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday',
}

export default function App() {
  const [blocksByDay, setBlocksByDay] = useState(scheduleByDay)
  const [allBuckets, setAllBuckets] = useState(buckets)
  const [rhythm, setRhythm] = useState(weeklyRhythm)
  const [questions, setQuestions] = useState(openQuestions)
  const [openModal, setOpenModal] = useState(null)
  const [activeDay, setActiveDay] = useState(todayDay)

  // 'type' → choosing task vs focus | 'focus-bucket' → picking a bucket
  const [addingStep, setAddingStep] = useState(null)
  const [selectedBucketId, setSelectedBucketId] = useState('')

  // Blocks for the currently visible day
  const blocks = blocksByDay[activeDay] ?? []

  // Helper to update blocks for just the active day
  function setBlocks(updater) {
    setBlocksByDay(prev => ({
      ...prev,
      [activeDay]: typeof updater === 'function' ? updater(prev[activeDay] ?? []) : updater,
    }))
  }

  // Current day info for the header
  const activeDayInfo = weekDays.find(d => d.day === activeDay)
  const startHere = startHereByDay[activeDay] ?? ''
  const dayNote = dayNotes[activeDay] ?? ''

  // Count subtasks per bucket across all focus blocks for the active day
  const bucketCounts = allBuckets.reduce((acc, b) => {
    acc[b.id] = blocks
      .filter(bl => bl.type === 'focus' && bl.bucketId === b.id)
      .reduce((sum, bl) => sum + bl.subtasks.length, 0)
    return acc
  }, {})

  function handleToggleSubtask(blockId, subtaskId) {
    setBlocks(prev => prev.map(block => {
      if (block.id !== blockId) return block
      return {
        ...block,
        subtasks: block.subtasks.map(st =>
          st.id === subtaskId ? { ...st, done: !st.done } : st
        )
      }
    }))
  }

  function handleToggleBlock(blockId) {
    setBlocks(prev => prev.map(block => {
      if (block.id !== blockId) return block
      const allDone = block.subtasks.every(st => st.done)
      return {
        ...block,
        subtasks: block.subtasks.map(st => ({ ...st, done: !allDone }))
      }
    }))
  }

  function timeToMinutes(time) {
    if (!time || time === '') return 1441
    if (time === 'eve') return 1380
    const [h, m] = time.split(':').map(Number)
    return h * 60 + (m || 0)
  }

  function handleUpdateBlock(blockId, changes) {
    setBlocks(prev => {
      const updated = prev.map(b => b.id === blockId ? { ...b, ...changes } : b)
      if ('time' in changes) {
        return [...updated].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
      }
      return updated
    })
  }

  function handleDeleteBlock(blockId) {
    setBlocks(prev => prev.filter(b => b.id !== blockId))
  }

  function handleAddSubtask(blockId, text) {
    setBlocks(prev => prev.map(b => {
      if (b.id !== blockId) return b
      return { ...b, subtasks: [...b.subtasks, { id: 'st-' + Date.now(), text, done: false }] }
    }))
  }

  function handleAddTaskBlock() {
    setBlocks(prev => [...prev, {
      id: 'block-' + Date.now(),
      type: 'task',
      isLifeAnchor: true,
      name: 'New Block',
      time: '',
      duration: '',
      color: '#B09070',
      subtasks: [],
    }])
    setAddingStep(null)
  }

  function handleAddFocusBlock() {
    const bucket = allBuckets.find(b => b.id === selectedBucketId) || allBuckets[0]
    if (!bucket) return
    setBlocks(prev => [...prev, {
      id: 'block-' + Date.now(),
      type: 'focus',
      isLifeAnchor: false,
      name: bucket.name,
      bucketId: bucket.id,
      time: '',
      duration: '',
      color: bucket.color,
      subtasks: [],
    }])
    setAddingStep(null)
    setSelectedBucketId('')
  }

  function openFocusBucketStep() {
    setSelectedBucketId(allBuckets[0]?.id || '')
    setAddingStep('focus-bucket')
  }

  return (
    <div className="min-h-screen bg-parchment flex flex-col">
      <TopBar />
      <WeekStrip days={weekDays} activeDay={activeDay} onDayChange={setActiveDay} />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-5">
            <div className="flex items-baseline gap-3 mb-1">
              <h2 className="font-serif text-2xl text-charcoal">{DAY_NAMES[activeDay] ?? activeDay}</h2>
              <span className="font-mono text-xs uppercase tracking-widest text-muted">{activeDayInfo?.mode}</span>
            </div>
            {startHere && (
              <p className="font-sans text-sm text-muted">
                <span className="font-mono text-xs text-cerulean mr-1">▶</span>
                {startHere}
              </p>
            )}
          </div>

          <div className="max-w-lg">
            <DayNote note={dayNote} />

            <div className="flex flex-col gap-3">
              {blocks.map(block => {
                if (block.type === 'buffer') {
                  return <BufferBlock key={block.id} block={block} />
                }
                if (block.type === 'focus') {
                  return (
                    <FocusBlock
                      key={block.id}
                      block={block}
                      onToggleSubtask={handleToggleSubtask}
                      onToggleBlock={handleToggleBlock}
                      onUpdateBlock={handleUpdateBlock}
                      onAddSubtask={handleAddSubtask}
                      onDeleteBlock={handleDeleteBlock}
                    />
                  )
                }
                return (
                  <TaskBlock
                    key={block.id}
                    block={block}
                    onToggleSubtask={handleToggleSubtask}
                    onToggleBlock={handleToggleBlock}
                    onUpdateBlock={handleUpdateBlock}
                    onAddSubtask={handleAddSubtask}
                    onDeleteBlock={handleDeleteBlock}
                  />
                )
              })}

              {/* ── Add block chooser ── */}
              {addingStep === null && (
                <button
                  onClick={() => setAddingStep('type')}
                  className="w-full border border-dashed border-lborder rounded-xl py-3 font-mono text-[10px] uppercase tracking-widest text-muted hover:border-cerulean hover:text-cerulean transition-colors"
                >
                  + new block
                </button>
              )}

              {addingStep === 'type' && (
                <div className="rounded-xl border border-lborder bg-surface p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
                    what kind of block?
                  </p>
                  <div className="flex gap-2 mb-3">
                    {/* Task block option */}
                    <button
                      onClick={handleAddTaskBlock}
                      className="flex-1 flex flex-col gap-1 items-start p-3 rounded-lg border border-lborder bg-lifebg hover:border-warm transition-colors text-left"
                    >
                      <span className="font-mono text-[9px] uppercase tracking-widest text-warm">⚓ task block</span>
                      <span className="font-serif text-sm text-charcoal">Daily habit</span>
                      <span className="font-mono text-[9px] text-muted">circles · resets daily</span>
                    </button>
                    {/* Focus block option */}
                    <button
                      onClick={openFocusBucketStep}
                      className="flex-1 flex flex-col gap-1 items-start p-3 rounded-lg border border-lborder bg-surface hover:border-cerulean transition-colors text-left"
                    >
                      <span className="font-mono text-[9px] uppercase tracking-widest text-cerulean">focus block</span>
                      <span className="font-serif text-sm text-charcoal">Project work</span>
                      <span className="font-mono text-[9px] text-muted">checkboxes · rolls forward</span>
                    </button>
                  </div>
                  <button
                    onClick={() => setAddingStep(null)}
                    className="font-mono text-[9px] uppercase tracking-widest text-muted hover:text-charcoal transition-colors"
                  >
                    cancel
                  </button>
                </div>
              )}

              {addingStep === 'focus-bucket' && (
                <div className="rounded-xl border border-lborder bg-surface p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
                    which bucket?
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {allBuckets.map(b => (
                      <button
                        key={b.id}
                        onClick={() => setSelectedBucketId(b.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-sans text-sm transition-colors
                          ${selectedBucketId === b.id
                            ? 'border-current text-charcoal bg-white shadow-sm'
                            : 'border-lborder text-muted hover:border-current hover:text-charcoal'}`}
                        style={{ borderColor: selectedBucketId === b.id ? b.color : undefined }}
                      >
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: b.color }} />
                        {b.name}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setAddingStep('type')}
                      className="font-mono text-[9px] uppercase tracking-widest text-muted hover:text-charcoal transition-colors"
                    >
                      ← back
                    </button>
                    <button
                      onClick={handleAddFocusBlock}
                      className="flex-1 font-sans text-sm text-white bg-cerulean rounded-lg py-2 hover:bg-[#3A8FB4] transition-colors"
                    >
                      Create focus block
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <Sidebar
          buckets={allBuckets}
          bucketCounts={bucketCounts}
          rhythm={rhythm}
          questions={questions}
          onOpenModal={setOpenModal}
        />
      </div>

      <BucketsModal
        buckets={allBuckets}
        isOpen={openModal === 'buckets'}
        onClose={() => setOpenModal(null)}
        onSave={setAllBuckets}
      />
      <RhythmModal
        rhythm={rhythm}
        isOpen={openModal === 'rhythm'}
        onClose={() => setOpenModal(null)}
        onSave={setRhythm}
      />
      <OpenQuestionsModal
        questions={questions}
        isOpen={openModal === 'questions'}
        onClose={() => setOpenModal(null)}
        onSave={setQuestions}
      />
    </div>
  )
}
