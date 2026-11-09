import { formatUsdt, networkLabel } from '../config.js'

// Deliberately neutral: does not reveal whether the network was correct.
export default function Sent({ form, onContinue }) {
  return (
    <section className="screen screen-center">
      <div className="status-icon" aria-hidden="true">✓</div>
      <h1>Transfer sent</h1>
      <p className="big">{formatUsdt(form.amount)}</p>
      <p className="muted">{networkLabel(form.network)}</p>
      <div className="actions">
        <button className="btn btn-primary" onClick={onContinue}>Continue</button>
      </div>
    </section>
  )
}
