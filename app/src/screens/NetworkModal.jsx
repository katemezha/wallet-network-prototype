import { networkLabel } from '../config.js'

export default function NetworkModal({ network, onAction }) {
  return (
    <div className="modal-backdrop">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h2 id="modal-title">Confirm the recipient's network</h2>
        <p>
          This address works on several networks. If you choose the wrong one, your money may
          not arrive.
        </p>
        <p>Check the recipient's message — the network is often written as ERC20, BEP20.</p>
        <p className="modal-current">
          Currently selected: <strong>{networkLabel(network)}</strong>
        </p>
        <div className="actions">
          <button className="btn btn-primary" onClick={() => onAction('continue')}>
            Network is correct, continue
          </button>
          <button className="btn btn-secondary" onClick={() => onAction('change')}>
            Change network
          </button>
          <button className="btn btn-ghost" onClick={() => onAction('abort')}>
            Not sure — I'll ask the recipient
          </button>
        </div>
      </div>
    </div>
  )
}
