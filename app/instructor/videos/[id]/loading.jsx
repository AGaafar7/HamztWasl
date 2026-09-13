// app/instructor/videos/[id]/loading.jsx
import { Skeleton, SkeletonText } from '../../../../../components/Skeleton'

export default function AnnotateLoading() {
  return (
    <section>
      <Skeleton width={140} height={14} style={{ marginBottom: 20 }} />

      <div className="portal-header">
        <div>
          <Skeleton width={280} height={32} />
          <Skeleton width={200} height={16} style={{ marginTop: 10 }} />
        </div>
      </div>

      <div className="annotate-layout">
        <div className="annotate-left">
          <Skeleton width="100%" height={0} style={{ aspectRatio: '16 / 9', borderRadius: 18, marginBottom: 20 }} />
          <div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
                <SkeletonText lines={2} />
              </div>
            ))}
          </div>
        </div>
        <div className="annotate-right">
          <div className="annotate-panel">
            <Skeleton width={140} height={36} />
            <Skeleton width="100%" height={44} style={{ marginTop: 12 }} />
            <Skeleton width="100%" height={44} style={{ marginTop: 12 }} />
            <Skeleton width="100%" height={44} style={{ marginTop: 12 }} />
            <Skeleton width="100%" height={44} style={{ marginTop: 12 }} />
          </div>
        </div>
      </div>
    </section>
  )
}