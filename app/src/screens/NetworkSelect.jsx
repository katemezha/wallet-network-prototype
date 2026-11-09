import { useEffect, useRef } from 'react'
import { NETWORKS, getNetwork } from '../config.js'

// Custom dropdown instead of a native <select>: "Change network" in the
// variant B modal must be able to open it programmatically.
export default function NetworkSelect({ value, open, onToggle, onSelect }) {
  const ref = useRef(null)
  const selected = getNetwork(value)

  useEffect(() => {
    if (open) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [open])

  return (
    <div className="select" ref={ref}>
      <button
        type="button"
        className={`select-trigger input ${open ? 'is-open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={onToggle}
      >
        {selected ? (
          <NetworkName network={selected} />
        ) : (
          <span className="placeholder">Select network</span>
        )}
        <span className="chevron" aria-hidden="true">▾</span>
      </button>

      {open && (
        <ul className="select-list" role="listbox">
          {NETWORKS.map((network) => (
            <li key={network.name}>
              <button
                type="button"
                role="option"
                aria-selected={network.name === value}
                className={`select-option ${network.name === value ? 'is-selected' : ''}`}
                onClick={() => onSelect(network.name)}
              >
                <NetworkName network={network} />
                <span className="option-fee">Fee {network.fee} USDT</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function NetworkName({ network }) {
  return (
    <span className="network-name">
      {network.name}
      {network.standard && <span className="tag">{network.standard}</span>}
    </span>
  )
}
