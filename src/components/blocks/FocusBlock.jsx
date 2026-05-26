import { useState } from 'react'
import SubTask from './SubTask'
import TimePicker from './TimePicker'

export default function FocusBlock({ block, onToggleSubtask, onToggleBlock, onUpdateBlock, onAddSubtask, onDeleteBlock }) {
  const allDone = block.subtasks.length > 0 && block.subtasks.every(st => st.done)

  const [editingField, setEditingField] = useState(null)
  const [fieldValue, setFieldValue] = useState('')
  const [addingTask, setAddingTask] = useState(false)
  const [newTaskText, setNewTaskText] = useState('')

  function startEdit(field) {
    setEditingField(field)
    setFieldValue(block[field] ?? '')
  }

  function commitEdit() {
    if (editingField && fieldValue.trim() !== block[editingField]) {
      onUpdateBlock(block.id, { [editingField]: fieldValue.trim() })
    }
    setEditingField(null)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') setEditingField(null)
  }

  function handleAddTask() {
    if (newTaskText.trim()) onAddSubtask(block.id, newTaskText.trim())
    setNewTaskText('')
    setAddingTask(false)
  }

  function handleAddKeyDown(e) {
    if (e.key === 'Enter') handleAddTask()
    if (e.key === 'Escape') { setNewTaskText(''); setAddingTask(false) }
  }

  return (
    <div className="group rounded-xl border border-lborder bg-surface p-4 flex gap-3">
      <div className="flex flex-col items-center pt-1">
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: block.color }} />
        <div className="w-px flex-1 mt-1" style={{ backgroundColor: block.color + '40' }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            {/* Time picker + duration */}
            <div className="flex items-center gap-1.5 mb-0.5">
              <TimePicker
                value={block.time}
                onChange={time => onUpdateBlock(block.id, { time })}
              />
              <span className="font-mono text-[10px] text-muted">·</span>
              {editingField === 'duration' ? (
                <input
                  className="font-mono text-[10px] text-muted bg-transparent border-b border-cerulean outline-none w-24"
                  value={fieldValue}
                  onChange={e => setFieldValue(e.target.value)}
                  onBlur={commitEdit}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              ) : (
                <button
                  className="font-mono text-[10px] text-muted hover:text-cerulean transition-colors"
                  onClick={() => startEdit('duration')}
                >
                  {block.duration || 'set duration'}
                </button>
              )}
            </div>

            {/* Block name */}
            {editingField === 'name' ? (
              <input
                className="font-serif text-lg text-charcoal bg-transparent border-b border-cerulean outline-none w-full leading-tight"
                value={fieldValue}
                onChange={e => setFieldValue(e.target.value)}
                onBlur={commitEdit}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            ) : (
              <h3
                className="font-serif text-lg text-charcoal leading-tight cursor-text hover:text-cerulean transition-colors"
                onClick={() => startEdit('name')}
              >
                {block.name || 'Untitled'}
              </h3>
            )}

            <span
              className="inline-block font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded mt-1"
              style={{ backgroundColor: block.color + '20', color: block.color }}
            >
              focus
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
            <button
              onClick={() => onDeleteBlock(block.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-lborder hover:text-coral"
              title="Delete block"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                <path d="M3 4h10M6 4V2.5h4V4M5 4l.5 9h5L11 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => onToggleBlock(block.id)}
              className={`w-5 h-5 rounded-full border-2 transition-colors
                ${allDone ? 'border-moss bg-moss' : 'border-lborder hover:border-moss'}`}
              title="Mark all done"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {block.subtasks.map(st => (
            <SubTask
              key={st.id}
              subtask={st}
              shape="box"
              onToggle={(stId) => onToggleSubtask(block.id, stId)}
            />
          ))}
        </div>

        {addingTask ? (
          <div className="flex items-center gap-2.5 mt-2">
            <span className="w-4 h-4 rounded-sm border border-lborder flex-shrink-0" />
            <input
              className="flex-1 font-sans text-sm text-charcoal bg-transparent border-b border-cerulean outline-none pb-0.5"
              placeholder="new task…"
              value={newTaskText}
              onChange={e => setNewTaskText(e.target.value)}
              onBlur={handleAddTask}
              onKeyDown={handleAddKeyDown}
              autoFocus
            />
          </div>
        ) : (
          <button
            onClick={() => setAddingTask(true)}
            className="mt-2.5 font-mono text-[9px] uppercase tracking-widest text-muted hover:text-cerulean transition-colors"
          >
            + add task
          </button>
        )}

        {block.tip && (
          <div
            className="mt-3 rounded-lg px-3 py-2"
            style={{ backgroundColor: block.color + '15' }}
          >
            <p className="font-mono text-[9px] text-charcoal leading-snug">
              <span className="mr-1">🧠</span>{block.tip}
            </p>
          </div>
        )}

        <p className="font-mono text-[9px] uppercase tracking-widest text-moss mt-3">
          skipped tasks roll, not fail
        </p>
      </div>
    </div>
  )
}
