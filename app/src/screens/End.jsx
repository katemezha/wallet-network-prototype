import { useState } from 'react'
import { buildExport, downloadJson } from '../results.js'

export default function End({ session, onNewSession }) {
  const [downloaded, setDownloaded] = useState(false)

  function handleDownload() {
    downloadJson(
      buildExport(session),
      `participant-${session.participant}-group-${session.group}.json`,
    )
    setDownloaded(true)
  }

  function handleNewSession() {
    if (!downloaded && !window.confirm('Results have not been downloaded. Start a new session anyway?')) {
      return
    }
    onNewSession()
  }

  return (
    <section className="screen screen-center">
      <h1>Thank you!</h1>
      <div className="actions">
        <button className="btn btn-primary" onClick={handleDownload}>
          Download results
        </button>
        <button className="btn btn-secondary" onClick={handleNewSession}>New session</button>
      </div>
    </section>
  )
}
