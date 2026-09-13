// app/portal/videos/[id]/loading.jsx
import { Skeleton, SkeletonText } from '../../../../../components/Skeleton'

export default function VideoDetailLoading() {
  return (
    <section>
      <Skeleton width={140} height={14} style={{ marginBottom: 20 }} />

      <div className="video-detail-head">
        <Skeleton width="70%" height={32} />
        <Skeleton width={200} height={22} radius={999} style={{ marginTop: 12 }} />
      </div>

      <Skeleton width="100%" height={0} style={{ aspectRatio: '16 / 9', borderRadius: 18 }} />

      <div style={{ marginTop: 24 }}>
        <Skeleton width={120} height={14} />
      </div>

      <div className="now-caption" style={{ marginTop: 16 }}>
        <Skeleton width="70%" height={28} />
        <Skeleton width="50%" height={16} style={{ marginTop: 18 }} />
      </div>

      <div className="transcript-block" style={{ marginTop: 32 }}>
        <Skeleton width={180} height={18} style={{ marginBottom: 20 }} />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
            <Skeleton width="85%" height={20} />
            <Skeleton width="55%" height={14} style={{ marginTop: 10 }} />
          </div>
        ))}
      </div>
    </section>
  )
}