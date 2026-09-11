export const metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <h1 className="page-title">Privacy Policy</h1>
        <p style={{ marginTop: 8, color: 'var(--grey)' }}>
          Last updated: {new Date().toLocaleDateString('en-US')}
        </p>

        <div className="legal-body">
          <h2>What we collect</h2>
          <p><strong>Account information:</strong> your email address, display name, and (if you sign in with Google or Apple) the basic profile those providers share. We never see or store your password in plain text — Supabase handles authentication.</p>
          <p><strong>Learning activity:</strong> which courses you enroll in, which lessons you complete, your practice scores (listening, reading, speaking), and which videos you favorite. This is used solely to show you your progress.</p>
          <p><strong>Audio for pronunciation practice:</strong> when you use Speaking Practice, your recording is sent to our speech-to-text provider to be transcribed, then immediately discarded. We do not store audio recordings.</p>

          <h2>What we do not collect</h2>
          <p>We do not use advertising trackers, we do not sell your data to third parties, and we do not fingerprint your device.</p>

          <h2>Third-party services we use</h2>
          <ul>
            <li><strong>Supabase</strong> — database, authentication, and file storage</li>
            <li><strong>Google / Apple</strong> — optional sign-in providers</li>
            <li><strong>Hakim</strong> — text-to-speech and speech-to-text for the pronunciation features</li>
            <li><strong>Google Gemini</strong> — grading of reading-comprehension answers</li>
            <li><strong>AssemblyAI</strong> — transcription of instructor-uploaded audio (instructor-facing only)</li>
            <li><strong>YouTube</strong> — embedded video playback</li>
            <li><strong>Vercel</strong> — hosting</li>
          </ul>

          <h2>Your rights</h2>
          <p>You can request a copy of your data, correct any inaccuracies, or ask us to delete your account and all associated data at any time. Email <a href="mailto:privacy@hamztwasl.app">privacy@hamztwasl.app</a>.</p>

          <h2>Children</h2>
          <p>This service is not directed at children under 13. If you believe a child has created an account, please contact us and we will delete it.</p>

          <h2>Changes</h2>
          <p>We may update this policy. Material changes will be announced in-app before they take effect.</p>
        </div>
      </div>
    </section>
  )
}