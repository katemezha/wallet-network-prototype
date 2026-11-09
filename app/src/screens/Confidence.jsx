import { useState } from 'react'

export default function Confidence({ isLastTask, onSubmit }) {
  const [score, setScore] = useState(null)

  return (
    <section className="screen screen-center">
      <h1>How confident are you that the money will arrive?</h1>
      <div className="scale" role="radiogroup">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            role="radio"
            aria-checked={score === n}
            className={`scale-option ${score === n ? 'is-selected' : ''}`}
            onClick={() => setScore(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="scale-labels muted">
        <span>Not confident</span>
        <span>Very confident</span>
      </div>
      <div className="actions">
        <button className="btn btn-primary" disabled={score === null} onClick={() => onSubmit(score)}>
          {isLastTask ? 'Finish' : 'Next task'}
        </button>
      </div>
    </section>
  )
}
