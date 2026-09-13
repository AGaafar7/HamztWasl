// app/portal/loading.jsx
import { Skeleton, SkeletonText } from '../../components/Skeleton'

export default function PortalLoading() {
  return (
    <section>
      <div className="section-head">
        <Skeleton width={120} height={28} radius={999} />
        <Skeleton width={320} height={34} style={{ marginTop: 16 }} />
        <Skeleton width="80%" height={16} style={{ marginTop: 12 }} />
      </div>

      <div className="courses-grid portal-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <article className="course-card" key={i}>
            <Skeleton width="100%" height={140} radius={0} />
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Skeleton width="70%" height={20} />
              <SkeletonText lines={2} />
              <Skeleton width="40%" height={14} style={{ marginTop: 12 }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}