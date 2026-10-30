'use client'

export default function InstructorEarningsClient({ earnings }) {
  return (
    <section>
      <div className="portal-header">
        <div>
          <h1>Earnings</h1>
          <p>Your revenue from paid courses.</p>
        </div>
      </div>

      <div className="instructor-stats-grid">
        <div className="instructor-stat-card instructor-stat-highlight">
          <span className="instructor-stat-label">Total earned</span>
          <span className="instructor-stat-value">${earnings.total.toFixed(2)}</span>
          <span className="instructor-stat-sub">all time</span>
        </div>
        <div className="instructor-stat-card">
          <span className="instructor-stat-label">This month</span>
          <span className="instructor-stat-value">${earnings.thisMonth.toFixed(2)}</span>
          <span className="instructor-stat-sub">vs ${earnings.lastMonth.toFixed(2)} last month</span>
        </div>
        <div className="instructor-stat-card">
          <span className="instructor-stat-label">Pending payout</span>
          <span className="instructor-stat-value">${earnings.pending.toFixed(2)}</span>
          <span className="instructor-stat-sub">next: {earnings.nextPayout}</span>
        </div>
      </div>

      <div className="instructor-section">
        <div className="instructor-section-head">
          <h2>Transaction history</h2>
          <span className="instructor-muted">Schedule: {earnings.payoutSchedule}</span>
        </div>
        {earnings.transactions.length === 0 ? (
          <p className="portal-empty">No transactions yet.</p>
        ) : (
          <div className="instructor-table">
            {earnings.transactions.map((tx) => (
              <div className="instructor-row" key={tx.id}>
                <span className="instructor-row-main">
                  <strong>{tx.courseTitle?.en || tx.courseId || 'Course'}</strong>
                  <span>{tx.student}</span>
                </span>
                <span className="instructor-row-date">{tx.date}</span>
                <span className="instructor-row-amount">+${tx.amount}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}