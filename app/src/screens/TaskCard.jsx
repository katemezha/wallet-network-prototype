import { useState } from 'react'
import { BALANCE, TASKS } from '../config.js'

export default function TaskCard({ task }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await copyText(task.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="task-card">
      <div className="task-head">
        <span className="task-number">Task {task.number} of {TASKS.length}</span>
        <span className="balance">Your balance: {BALANCE} USDT</span>
      </div>
      <div className="bubble">
        Hi! Waiting for {task.amount} USDT. Address:{' '}
        <span className="bubble-address">
          <code>{task.address}</code>
          <button className="btn-copy" onClick={handleCopy}>
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
        </span>
        , network {task.networkHint}
      </div>
    </div>
  )
}

// navigator.clipboard is unavailable over plain http (e.g. a phone opening the
// dev server by LAN IP), so fall back to the legacy execCommand approach.
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    el.remove()
  }
}
