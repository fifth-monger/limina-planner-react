import { useState, useEffect } from 'react'
import { scheduleByDay, buckets, openQuestions, getWeekDays, dayNotes, dayNotesByMode, startHereByDay, initialAlarms } from './data/initialData'
import { requestNotificationPermission, scheduleAlarms, fireAlarm } from './utils/notifications'
import { timeToMinutes, parseDurationToMinutes } from './utils/time'

import TopBar from './components/layout/TopBar'
import WeekStrip from './components/layout/WeekStrip'
import DayNote from './components/layout/DayNote'
import TaskBlock from './components/blocks/TaskBlock'
import FocusBlock from './components/blocks/FocusBlock'
import BufferBlock from './components/blocks/BufferBlock'
import AlarmTick from './components/blocks/AlarmTick'
import NoteBlock from './components/blocks/NoteBlock'
import Sidebar from './components/sidebar/Sidebar'
import BucketsModal from './components/modals/BucketsModal'
import OpenQuestionsModal from './components/modals/OpenQuestionsModal'
import EnergyCheckInModal from './components/modals/EnergyCheckInModal'
import AlarmsModal from './components/modals/AlarmsModal'
import AddBlockModal from './components/modals/AddBlockModal'
import EditBlockModal from './components/modals/EditBlockModal'

// Build the week once at load time — dates are correct for whatever week it is today.
const weekDays = getWeekDays()
const todayDay = weekDays.find(d => d.isToday)?.day ?? 'Mon'

const DAY_NAMES = {
  Sun: 'Sunday', Mon: 'Monday', Tue: 'Tuesday',
  Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday',
}

export default function App() {
  const [blocksByDay, setBlocksByDay] = useState(() => {
    try {
      const stored = localStorage.getItem('limina-blocks')
      return stored ? JSON.parse(stored) : scheduleByDay
    } catch { return scheduleByDay }
  })

  const [allBuckets, setAllBuckets] = useState(() => {
    try {
      const stored = localStorage.getItem('limina-buckets')
      return stored ? JSON.parse(stored) : buckets
    } catch { return buckets }
  })

  const [questions, setQuestions] = useState(() => {
    try {
      const stored = localStorage.getItem('limina-questions')
      return stored ? JSON.parse(stored) : openQuestions
    } catch { return openQuestions }
  })
  const [openModal, setOpenModal] = useState(null)
  const [activeDay, setActiveDay] = useState(todayDay)
  const [energyMode, setEnergyMode] = useState('productive')
  const [showCheckIn, setShowCheckIn] = useState(false)

  // Alarms — lazy initialization reads from localStorage on first render only.
  // useState(() => {...}) passes a FUNCTION instead of a value.
  // React calls it once and uses the return value as the initial state.
  // This is important because localStorage.getItem runs every render if you
  // put it directly in useState(value) — with lazy init it only runs once.
  const [alarms, setAlarms] = useState(() => {
    try {
      const stored = localStorage.getItem('limina-alarms')
      return stored ? JSON.parse(stored) : initialAlarms
    } catch {
      return initialAlarms
    }
  })

  // Which bucket's detail panel is open in the sidebar (null = normal sidebar)
  const [activeBucketId, setActiveBucketId] = useState(null)

  const [showAddBlock, setShowAddBlock] = useState(false)
  const [editingBlock, setEditingBlock] = useState(null) // the full block object being edited

  // On mount: check if the user already checked in today.
  // localStorage stores plain strings — 'limina-checkin-date' is something like "Wed May 27 2026".
  // If it matches today, we restore their saved mode and skip the modal.
  // If it's a new day (or first launch), we show the check-in modal.
  useEffect(() => {
    const savedMode = localStorage.getItem('limina-energy-mode')
    const savedDate = localStorage.getItem('limina-checkin-date')
    const today = new Date().toDateString()

    if (savedDate === today && savedMode) {
      setEnergyMode(savedMode)
    } else {
      setShowCheckIn(true)
    }
  }, []) // empty array = run once, on first render only

  // Ask for notification permission once on first load.
  // useEffect with [] runs exactly once — after the first render, never again.
  useEffect(() => {
    requestNotificationPermission()
  }, [])

  // Persist everything to localStorage whenever it changes.
  // JSON.stringify/parse is the bridge between JS objects and localStorage strings.
  useEffect(() => {
    localStorage.setItem('limina-blocks',    JSON.stringify(blocksByDay))
  }, [blocksByDay])

  useEffect(() => {
    localStorage.setItem('limina-buckets',   JSON.stringify(allBuckets))
  }, [allBuckets])

  useEffect(() => {
    localStorage.setItem('limina-questions', JSON.stringify(questions))
  }, [questions])

  useEffect(() => {
    localStorage.setItem('limina-alarms',    JSON.stringify(alarms))
  }, [alarms])

  // Reschedule alarms from scratch whenever alarms or the active day changes.
  // useEffect with [alarms, activeDay] runs after the initial render AND
  // any time either of those two values changes.
  // We pass handleSnoozeAlarm as a callback — but it's defined below,
  // so we use a wrapper function to avoid hoisting issues.
  useEffect(() => {
    scheduleAlarms(alarms, activeDay, (alarm) => handleSnoozeAlarm(alarm))
  }, [alarms, activeDay]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSnoozeAlarm(alarm) {
    // Fire the alarm again after the snooze duration elapses
    setTimeout(() => {
      fireAlarm(alarm, handleSnoozeAlarm)
    }, alarm.snoozeMinutes * 60 * 1000)
  }

  // ── Alarm CRUD handlers ──────────────────────────────────────────────────────

  function handleAddAlarm(alarm) {
    setAlarms(prev => [...prev, { ...alarm, id: 'alarm-' + Date.now() }])
  }

  function handleUpdateAlarm(id, changes) {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, ...changes } : a))
  }

  function handleDeleteAlarm(id) {
    setAlarms(prev => prev.filter(a => a.id !== id))
  }

  function handleToggleAlarm(id) {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a))
  }

  function handleCheckInSelect(mode) {
    setEnergyMode(mode)
    setShowCheckIn(false)
    localStorage.setItem('limina-energy-mode', mode)
    localStorage.setItem('limina-checkin-date', new Date().toDateString())
  }

  function handleModeChange(mode) {
    setEnergyMode(mode)
    localStorage.setItem('limina-energy-mode', mode)
    // Update the date too so a mid-day change doesn't re-trigger the modal tomorrow
    localStorage.setItem('limina-checkin-date', new Date().toDateString())
  }

  // Blocks for the currently visible day
  const blocks = blocksByDay[activeDay] ?? []

  // Derived value: which blocks to show based on energy mode.
  // This is NOT stored in useState — it's recalculated every render from blocks + energyMode.
  // That way blocks and energyMode are always the source of truth; visibleBlocks can never get out of sync.
  const visibleBlocks = blocks.filter(block => {
    if (energyMode === 'productive') return true                              // show everything
    if (energyMode === 'medium') return block.energyLevel !== 'productive'   // hide productive-only
    if (energyMode === 'bareMinimum') return block.energyLevel === 'bareMinimum' // anchors only
    return true
  })

  // Returns the duration string to display for a block.
  // If medium mode AND the block has a shorter mediumDuration, return that instead.
  function getBlockDuration(block) {
    if (energyMode === 'medium' && block.mediumDuration) {
      return block.mediumDuration
    }
    return block.duration
  }

  // Alarms that should appear today ───────────────────────────────────────────
  const todayAlarms = alarms.filter(a => a.active && a.days.includes(activeDay))

  // Categorize each alarm into one of three cases:
  //
  //   1. "during a block"  — alarm time falls strictly inside a block's window
  //                          → render inside that block
  //   2. "same time"       — alarm time exactly matches a block's start time
  //                          → render as a standalone tick, sorted BEFORE the block
  //   3. "standalone"      — no block overlaps at all
  //                          → render as a standalone tick
  //
  // We build blockAlarmMap: { blockId → alarm[] } so each block knows its alarms.
  // Alarms in blockAlarmMap are removed from the standalone list.
  const blockAlarmMap = {}
  const duringAlarmIds = new Set()

  visibleBlocks.forEach(block => {
    if (!block.time) return
    const blockStart = timeToMinutes(block.time)
    const blockDurationMin = parseDurationToMinutes(getBlockDuration(block))
    if (blockDurationMin === 0) return  // can't determine window without a duration
    const blockEnd = blockStart + blockDurationMin

    todayAlarms.forEach(alarm => {
      const alarmMin = timeToMinutes(alarm.time)
      // Strictly inside: after block starts, before block ends
      if (alarmMin > blockStart && alarmMin < blockEnd) {
        if (!blockAlarmMap[block.id]) blockAlarmMap[block.id] = []
        blockAlarmMap[block.id].push(alarm)
        duringAlarmIds.add(alarm.id)
      }
    })
  })

  // Alarms not swallowed by a block go into the timeline as tick marks
  const standaloneAlarms = todayAlarms.filter(a => !duringAlarmIds.has(a.id))

  // Merge blocks and standalone alarms, sort by time.
  // Tie-breaking rule: when times are equal, alarms sort BEFORE blocks
  // so the alarm signal appears just above the block it precedes.
  const timelineItems = [
    ...visibleBlocks.map(b => ({ ...b, _type: 'block' })),
    ...standaloneAlarms.map(a => ({ ...a, _type: 'alarm' })),
  ].sort((a, b) => {
    const diff = timeToMinutes(a.time) - timeToMinutes(b.time)
    if (diff !== 0) return diff
    // Same minute: alarms come first
    if (a._type === 'alarm' && b._type !== 'alarm') return -1
    if (a._type !== 'alarm' && b._type === 'alarm') return 1
    return 0
  })

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

  // Energy-mode note overrides the day-specific note when the mode needs a message.
  // productive mode returns null from dayNotesByMode, so we fall through to the day note.
  const dayNote = dayNotesByMode[energyMode] ?? dayNotes[activeDay] ?? ''

  // Count subtasks per bucket across all focus blocks for the active day
  const bucketCounts = allBuckets.reduce((acc, b) => {
    acc[b.id] = blocks
      .filter(bl => bl.type === 'focus' && bl.bucketId === b.id)
      .reduce((sum, bl) => sum + bl.subtasks.length, 0)
    return acc
  }, {})

  // ── Backlog handlers ────────────────────────────────────────────────────────

  function handleAddBacklogItem(bucketId, text) {
    setAllBuckets(prev => prev.map(b => {
      if (b.id !== bucketId) return b
      return {
        ...b,
        backlog: [...b.backlog, { id: 'bl-' + Date.now(), text, done: false }],
      }
    }))
  }

  function handleToggleBacklogItem(bucketId, itemId) {
    setAllBuckets(prev => prev.map(b => {
      if (b.id !== bucketId) return b
      return {
        ...b,
        backlog: b.backlog.map(item =>
          item.id === itemId ? { ...item, done: !item.done } : item
        ),
      }
    }))
  }

  function handleDeleteBacklogItem(bucketId, itemId) {
    setAllBuckets(prev => prev.map(b => {
      if (b.id !== bucketId) return b
      return {
        ...b,
        backlog: b.backlog.filter(item => item.id !== itemId),
      }
    }))
  }

  // Pull a backlog item into a focus block as a subtask.
  // Stores a backlogRef on the subtask so we can sync completion later.
  function handlePullFromBacklog(blockId, bucketId, itemId) {
    const bucket = allBuckets.find(b => b.id === bucketId)
    const item = bucket?.backlog.find(i => i.id === itemId)
    if (!item) return

    // Add it as a subtask with a backlogRef pointing back to its source
    setBlocks(prev => prev.map(block => {
      if (block.id !== blockId) return block
      return {
        ...block,
        subtasks: [
          ...block.subtasks,
          {
            id: 'st-' + Date.now(),
            text: item.text,
            done: false,
            backlogRef: { bucketId, itemId },
          },
        ],
      }
    }))

    // Mark it done in the backlog so it doesn't appear in the picker again
    handleToggleBacklogItem(bucketId, itemId)
  }

  // ── Subtask / block handlers ─────────────────────────────────────────────────

  function handleToggleSubtask(blockId, subtaskId) {
    setBlocks(prev => prev.map(block => {
      if (block.id !== blockId) return block

      const updatedSubtasks = block.subtasks.map(st =>
        st.id === subtaskId ? { ...st, done: !st.done } : st
      )

      // If the toggled subtask came from the backlog, keep the backlog in sync.
      // setTimeout(…, 0) pushes this into the next event-loop tick so React
      // doesn't try to update two state slices in the same synchronous call.
      const toggled = updatedSubtasks.find(st => st.id === subtaskId)
      if (toggled?.done && toggled?.backlogRef) {
        const { bucketId, itemId } = toggled.backlogRef
        setTimeout(() => handleToggleBacklogItem(bucketId, itemId), 0)
      }

      return { ...block, subtasks: updatedSubtasks }
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

  // Edit an existing block — type changes are handled by spreading changes over the existing block.
  // Sorts the day's blocks by time after saving.
  function handleEditBlock(blockId, changes) {
    setBlocks(prev => {
      const updated = prev.map(b => b.id === blockId ? { ...b, ...changes } : b)
      return updated.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
    })
  }

  // Add one or more blocks from the AddBlockModal.
  // Receives a days array and a blockData object (no ID — we assign IDs here).
  // All days are updated in a single state transaction to avoid multiple re-renders.
  function handleAddBlock(days, blockData) {
    setBlocksByDay(prev => {
      const updated = { ...prev }
      days.forEach((day, i) => {
        const newBlock = { ...blockData, id: `block-${Date.now()}-${i}` }
        const existing = updated[day] ?? []
        const merged = [...existing, newBlock]
        updated[day] = merged.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
      })
      return updated
    })
  }

  return (
    <div className="min-h-screen bg-parchment flex flex-col">
      <TopBar energyMode={energyMode} onModeChange={handleModeChange} />
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
              {timelineItems.map(item => {
                if (item._type === 'alarm') {
                  return <AlarmTick key={item.id} alarm={item} />
                }
                if (item.type === 'note') {
                  return <NoteBlock key={item.id} block={item} onEditBlock={setEditingBlock} onDeleteBlock={handleDeleteBlock} />
                }
                if (item.type === 'buffer') {
                  return <BufferBlock key={item.id} block={item} />
                }
                if (item.type === 'focus') {
                  const bucket = allBuckets.find(b => b.id === item.bucketId)
                  const bucketBacklog = bucket?.backlog.filter(bl => !bl.done) ?? []
                  return (
                    <FocusBlock
                      key={item.id}
                      block={item}
                      getBlockDuration={getBlockDuration}
                      bucketBacklog={bucketBacklog}
                      inBlockAlarms={blockAlarmMap[item.id] ?? []}
                      onToggleSubtask={handleToggleSubtask}
                      onToggleBlock={handleToggleBlock}
                      onUpdateBlock={handleUpdateBlock}
                      onAddSubtask={handleAddSubtask}
                      onDeleteBlock={handleDeleteBlock}
                      onPullFromBacklog={(itemId) => handlePullFromBacklog(item.id, item.bucketId, itemId)}
                      onEditBlock={setEditingBlock}
                    />
                  )
                }
                return (
                  <TaskBlock
                    key={item.id}
                    block={item}
                    getBlockDuration={getBlockDuration}
                    inBlockAlarms={blockAlarmMap[item.id] ?? []}
                    onToggleSubtask={handleToggleSubtask}
                    onToggleBlock={handleToggleBlock}
                    onUpdateBlock={handleUpdateBlock}
                    onAddSubtask={handleAddSubtask}
                    onDeleteBlock={handleDeleteBlock}
                    onEditBlock={setEditingBlock}
                  />
                )
              })}

              {/* ── Add block ── */}
              <button
                onClick={() => setShowAddBlock(true)}
                className="w-full border border-dashed border-lborder rounded-xl py-3 font-mono text-[10px] uppercase tracking-widest text-muted hover:border-cerulean hover:text-cerulean transition-colors"
              >
                + new block
              </button>
            </div>
          </div>
        </main>

        <Sidebar
          buckets={allBuckets}
          bucketCounts={bucketCounts}
          questions={questions}
          alarms={alarms}
          onOpenModal={setOpenModal}
          onToggleAlarm={handleToggleAlarm}
          activeBucketId={activeBucketId}
          onSelectBucket={setActiveBucketId}
          onCloseBucket={() => setActiveBucketId(null)}
          onAddBacklogItem={handleAddBacklogItem}
          onToggleBacklogItem={handleToggleBacklogItem}
          onDeleteBacklogItem={handleDeleteBacklogItem}
        />
      </div>

      <BucketsModal
        buckets={allBuckets}
        isOpen={openModal === 'buckets'}
        onClose={() => setOpenModal(null)}
        onSave={setAllBuckets}
      />
      <OpenQuestionsModal
        questions={questions}
        isOpen={openModal === 'questions'}
        onClose={() => setOpenModal(null)}
        onSave={setQuestions}
      />
      <EnergyCheckInModal
        isOpen={showCheckIn}
        onSelect={handleCheckInSelect}
      />
      <AlarmsModal
        alarms={alarms}
        isOpen={openModal === 'alarms'}
        onClose={() => setOpenModal(null)}
        onAdd={handleAddAlarm}
        onUpdate={handleUpdateAlarm}
        onDelete={handleDeleteAlarm}
      />
      <AddBlockModal
        isOpen={showAddBlock}
        onClose={() => setShowAddBlock(false)}
        onAdd={handleAddBlock}
        buckets={allBuckets}
        defaultDay={activeDay}
      />
      <EditBlockModal
        block={editingBlock}
        buckets={allBuckets}
        isOpen={editingBlock !== null}
        onClose={() => setEditingBlock(null)}
        onSave={handleEditBlock}
      />
    </div>
  )
}
