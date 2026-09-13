// app/portal/lessons/[lessonId]/loading.jsx
import { Skeleton, SkeletonText } from '../../../../components/Skeleton'

export default function LessonLoading() {
  return (
    <section className="lesson-page">
      <Skeleton width={140} height={14} style={{ marginBottom: 20 }} />
      <div className="lesson-page-head">
        <Skeleton width={180} height={22} radius={999} style={{ marginBottom: 12 }} />
        <Skeleton width="70%" height={32} />
      </div>
      <div className="lesson-page-body">
        <SkeletonText lines={5} />
      </div>
    </section>
  )
}