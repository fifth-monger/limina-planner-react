import BucketList from './BucketList'
import OpenQuestions from './OpenQuestions'

export default function Sidebar({ buckets, bucketCounts, rhythm, questions, onOpenModal }) {
  return (
    <aside className="w-64 flex-shrink-0 bg-parchment border-l border-lborder p-5 flex flex-col gap-8 overflow-y-auto">
      <BucketList buckets={buckets} bucketCounts={bucketCounts} onOpenModal={onOpenModal} />
      <div className="border-t border-lborder" />
      <OpenQuestions questions={questions} onOpenModal={onOpenModal} />
    </aside>
  )
}
