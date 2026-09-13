// app/portal/courses/[id]/loading.jsx
import { Skeleton, SkeletonText } from '../../../../../components/Skeleton'

export default function CourseDetailLoading() {
  return (
    <div>
      <div className="section-head">
        <Skeleton width="60%" height={34} />
        <SkeletonText lines={2} />
        <Skeleton width={220} height={14} style={{ marginTop: 12 }} />
      </div>

      <div className="alphabet-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div className="alphabet-card" key={i} style={{ pointerEvents: 'none' }}>
            <Skeleton width={44} height={44} radius={8} />
            <Skeleton width={52} height={14} style={{ marginTop: 8 }} />
            <Skeleton width={36} height={11} style={{ marginTop: 4 }} />
          </div>
        ))}
      </div>
    </div>
  )
}