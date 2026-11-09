import { TASKS } from './config.js'

// Builds the export file (spec, "Export format") from the raw event log.
export function buildExport({ participant, group, events }) {
  return {
    participant,
    group,
    tasks: TASKS.map((task) => summarizeTask(task, events)),
    events,
  }
}

function summarizeTask(task, allEvents) {
  const events = allEvents.filter((e) => e.data?.task === task.number)
  const find = (name) => events.find((e) => e.event === name)
  const findLast = (name) => events.findLast((e) => e.event === name)

  const start = find('task_start')
  const sent = find('transfer_sent')
  const aborted = find('task_aborted')
  const end = sent ?? aborted
  const selections = events.filter((e) => e.event === 'network_selected')

  return {
    task: task.number,
    outcome: sent ? 'sent' : aborted ? 'safe_abort' : null,
    selected_network: sent?.data.network ?? selections.at(-1)?.data.network ?? null,
    expected_network: task.expectedNetwork,
    correct: sent ? sent.data.correct : null,
    time_seconds:
      start && end
        ? Math.round((Date.parse(end.time) - Date.parse(start.time)) / 100) / 10
        : null,
    network_changes: Math.max(0, selections.length - 1),
    modal_action: findLast('modal_action')?.data.action ?? null,
    confidence: find('confidence')?.data.score ?? null,
  }
}

export function downloadJson(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
