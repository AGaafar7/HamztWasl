import Link from 'next/link'
import ReturnContent from './ReturnContent'

export const dynamic = 'force-dynamic'

export default function PaymentReturnPage() {
  return (
    <section className="wrap" style={{ padding: '72px 0', maxWidth: 640 }}>
      <ReturnContent />
      <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
        <Link href="/portal" className="btn btn-primary">
          Back to portal
        </Link>
      </div>
    </section>
  )
}