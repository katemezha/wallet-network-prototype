import { ADDRESS_FORMAT, detectAddress } from '../addressDetection.js'
import { formatUsdt, getNetwork } from '../config.js'
import TaskCard from './TaskCard.jsx'
import NetworkSelect from './NetworkSelect.jsx'

export default function SendForm({
  task,
  group,
  form,
  onAddressChange,
  onAddressPaste,
  onAddressBlur,
  onNetworkToggle,
  onNetworkSelect,
  onAmountChange,
  onNext,
}) {
  const format = detectAddress(form.address)
  const addressValid = format === ADDRESS_FORMAT.TRON || format === ADDRESS_FORMAT.EVM
  const showAddressError = format === ADDRESS_FORMAT.INVALID && form.addressTouched
  const network = getNetwork(form.network)
  const amountValid = Number(form.amount) > 0
  const canContinue = addressValid && network && amountValid

  const showDetected =
    group === 'B' &&
    form.network === 'TRON' &&
    form.networkSource === 'preselected' &&
    format === ADDRESS_FORMAT.TRON

  return (
    <section className="screen">
      <TaskCard task={task} />

      <h2>Send</h2>

      <div className="field">
        <span className="field-label">Asset</span>
        <div className="input input-static">
          <span className="coin coin-sm" aria-hidden="true">₮</span> USDT
        </div>
      </div>

      <label className="field">
        <span className="field-label">Recipient address</span>
        <input
          className={`input input-mono ${showAddressError ? 'has-error' : ''}`}
          value={form.address}
          onChange={(e) => onAddressChange(e.target.value)}
          onPaste={onAddressPaste}
          onBlur={onAddressBlur}
          placeholder="Paste address"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        {showAddressError && <span className="error">Invalid address</span>}
      </label>

      <div className="field">
        <span className="field-label">Network</span>
        <NetworkSelect
          value={form.network}
          open={form.networkOpen}
          onToggle={onNetworkToggle}
          onSelect={onNetworkSelect}
        />
        {showDetected && <span className="hint hint-success">✓ Detected from address</span>}
        {group === 'A' && (
          <span className="hint hint-warning">
            ⚠️ Make sure the network matches the recipient's network.
          </span>
        )}
      </div>

      <label className="field">
        <span className="field-label">Amount</span>
        <div className="input-suffix">
          <input
            className="input"
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={form.amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="0"
          />
          <span className="suffix">USDT</span>
        </div>
      </label>

      {network && (
        <div className="fee-row">
          <span>Network fee</span>
          <span>{formatUsdt(network.fee)}</span>
        </div>
      )}

      <div className="actions">
        <button className="btn btn-primary" disabled={!canContinue} onClick={onNext}>
          Next
        </button>
      </div>
    </section>
  )
}
