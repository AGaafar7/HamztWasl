/**
 * Minimal skeleton primitive. Compose these to mimic the shape of whatever
 * page is loading.
 *
 *   <Skeleton width="100%" height={20} />
 *   <Skeleton variant="circle" size={40} />
 *   <SkeletonText lines={3} />
 */
export function Skeleton({ width = '100%', height = 16, radius = 8, style }) {
  return (
    <span
      className="skeleton"
      style={{ width, height, borderRadius: radius, ...style }}
    />
  )
}

export function SkeletonCircle({ size = 40 }) {
  return <span className="skeleton" style={{ width: size, height: size, borderRadius: '50%' }} />
}

export function SkeletonText({ lines = 3, widths }) {
  const w = widths || Array.from({ length: lines }, (_, i) =>
    i === lines - 1 ? '60%' : '100%'
  )
  return (
    <span className="skeleton-text">
      {w.map((width, i) => (
        <Skeleton key={i} width={width} height={14} />
      ))}
    </span>
  )
}