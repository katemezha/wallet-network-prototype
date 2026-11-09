// Shown after "Not sure — I'll ask the recipient" (safe abort). The spec ends
// the task there; the confidence question is skipped because nothing was sent.
export default function TaskEnded({ isLastTask, onContinue }) {
  return (
    <section className="screen screen-center">
      <div className="status-icon status-neutral" aria-hidden="true">ⓘ</div>
      <h1>Transfer not sent</h1>
      <p className="muted">You chose to check the network with the recipient first.</p>
      <div className="actions">
        <button className="btn btn-primary" onClick={onContinue}>
          {isLastTask ? 'Finish' : 'Next task'}
        </button>
      </div>
    </section>
  )
}
