import { formatUsdt, getNetwork, networkLabel } from '../config.js'

export default function Review({ form, onSend, onBack }) {
  const amount = Number(form.amount)
  const fee = getNetwork(form.network).fee

  return (
    <section className="screen">
      <h1>Review</h1>
      <dl className="summary">
        <div className="summary-row">
          <dt>Amount</dt>
          <dd>{formatUsdt(amount)}</dd>
        </div>
        <div className="summary-row">
          <dt>Network</dt>
          <dd>{networkLabel(form.network)}</dd>
        </div>
        <div className="summary-row summary-row-stack">
          <dt>Recipient address</dt>
          <dd className="mono">{form.address.trim()}</dd>
        </div>
        <div className="summary-row">
          <dt>Network fee</dt>
          <dd>{formatUsdt(fee)}</dd>
        </div>
        <div className="summary-row summary-total">
          <dt>Total</dt>
          <dd>{formatUsdt(amount + fee)}</dd>
        </div>
      </dl>
      <div className="actions">
        <button className="btn btn-primary" onClick={onSend}>Send</button>
        <button className="btn btn-secondary" onClick={onBack}>Back</button>
      </div>
    </section>
  )
}
