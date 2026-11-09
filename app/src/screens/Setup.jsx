import { useState } from 'react'

export default function Setup({ onStart }) {
  const [participant, setParticipant] = useState('')
  const id = participant.trim()

  return (
    <section className="screen">
      <p className="eyebrow">Moderator</p>
      <h1>Session setup</h1>

      <label className="field">
        <span className="field-label">Participant ID</span>
        <input
          className="input"
          value={participant}
          onChange={(e) => setParticipant(e.target.value)}
          placeholder="e.g. 07"
          autoComplete="off"
        />
      </label>

      <div className="actions actions-row">
        <button className="btn btn-primary" disabled={!id} onClick={() => onStart(id, 'A')}>
          Group A
        </button>
        <button className="btn btn-primary" disabled={!id} onClick={() => onStart(id, 'B')}>
          Group B
        </button>
      </div>
    </section>
  )
}
