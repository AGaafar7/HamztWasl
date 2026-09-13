// app/instructor/courses/[id]/loading.jsx
import { Skeleton, SkeletonText } from '../../../../components/Skeleton'

export default function CourseEditLoading() {
  return (
    <section className="course-edit-page">
      <Skeleton width={180} height={14} style={{ marginBottom: 20 }} />

      <div className="course-edit-head">
        <div className="course-edit-head-main">
          <Skeleton width={240} height={32} />
          <div className="course-edit-head-meta" style={{ marginTop: 10 }}>
            <Skeleton width={80} height={22} radius={999} />
            <Skeleton width={100} height={22} radius={999} />
          </div>
        </div>
        <div className="course-edit-head-actions">
          <Skeleton width={130} height={44} radius={12} />
          <Skeleton width={100} height={44} radius={12} />
          <Skeleton width={80} height={44} radius={12} />
        </div>
      </div>

      <div className="course-edit-tabs">
        <Skeleton width={80} height={38} radius={8} />
        <Skeleton width={90} height={38} radius={8} />
        <Skeleton width={90} height={38} radius={8} />
      </div>

      <div className="edit-tab-body">
        <div className="edit-section">
          <Skeleton width={100} height={20} />
          <Skeleton width="70%" height={14} style={{ marginTop: 8, marginBottom: 22 }} />
          <Skeleton width="100%" height={48} radius={10} />
          <div style={{ height: 12 }} />
          <Skeleton width="100%" height={48} radius={10} />
        </div>
      </div>
    </section>
  )
}