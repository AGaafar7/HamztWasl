// app/instructor/loading.jsx
import { Skeleton, SkeletonText } from '../../components/Skeleton'

export default function InstructorLoading() {
  return (
    <section>
      <div className="portal-header">
        <div>
          <Skeleton width={260} height={30} />
          <Skeleton width={320} height={16} style={{ marginTop: 10 }} />
        </div>
        <Skeleton width={140} height={44} radius={12} />
      </div>

      <div className="instructor-stats-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="instructor-stat-card" key={i}>
            <Skeleton width={110} height={12} />
            <Skeleton width={90} height={30} style={{ marginTop: 8 }} />
            <Skeleton width={130} height={12} style={{ marginTop: 4 }} />
          </div>
        ))}
      </div>

      <div className="instructor-section">
        <Skeleton width={140} height={20} style={{ marginBottom: 16 }} />
        <div className="instructor-table">
          {Array.from({ length: 5 }).map((_, i) => (
            <div className="instructor-row" key={i}>
              <div className="instructor-row-main" style={{ gap: 6 }}>
                <Skeleton width="55%" height={16} />
                <Skeleton width="35%" height={12} />
              </div>
              <Skeleton width={80} height={14} />
              <Skeleton width={60} height={14} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}