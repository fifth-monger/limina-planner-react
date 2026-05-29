import BucketList from './BucketList'
import BucketDetail from './BucketDetail'
import OpenQuestions from './OpenQuestions'
import AlarmList from './AlarmList'

export default function Sidebar({
  buckets,
  bucketCounts,
  questions,
  alarms,
  onOpenModal,
  onToggleAlarm,
  activeBucketId,
  onSelectBucket,
  onCloseBucket,
  onAddBacklogItem,
  onToggleBacklogItem,
  onDeleteBacklogItem,
}) {
  // Find the full bucket object for whichever bucket is open (or undefined if none)
  const activeBucket = buckets.find(b => b.id === activeBucketId)

  // Early return: if a bucket is selected, swap the entire sidebar content.
  // The <aside> container stays identical — only its children change.
  // This is conditional rendering: React re-runs this function on every state
  // change and returns whichever JSX branch matches the current situation.
  if (activeBucket) {
    return (
      <aside className="w-64 flex-shrink-0 bg-parchment border-l border-lborder p-5 flex flex-col overflow-y-auto">
        <BucketDetail
          bucket={activeBucket}
          onClose={onCloseBucket}
          onAddItem={(text) => onAddBacklogItem(activeBucket.id, text)}
          onToggleItem={(itemId) => onToggleBacklogItem(activeBucket.id, itemId)}
          onDeleteItem={(itemId) => onDeleteBacklogItem(activeBucket.id, itemId)}
        />
      </aside>
    )
  }

  // Normal sidebar: bucket list + divider + open questions
  return (
    <aside className="w-64 flex-shrink-0 bg-sidepanel border-l border-borderCard p-5 flex flex-col gap-8 overflow-y-auto">
      <BucketList
        buckets={buckets}
        bucketCounts={bucketCounts}
        onOpenModal={onOpenModal}
        onSelectBucket={onSelectBucket}
      />
      <div className="border-t border-lborder" />
      <OpenQuestions questions={questions} onOpenModal={onOpenModal} />
      <div className="border-t border-lborder" />
      <AlarmList alarms={alarms} onOpenModal={onOpenModal} onToggleAlarm={onToggleAlarm} />
    </aside>
  )
}
