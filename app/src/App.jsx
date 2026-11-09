import { useRef, useState } from 'react'
import { ADDRESS_FORMAT, detectAddress } from './addressDetection.js'
import { TASKS } from './config.js'
import Setup from './screens/Setup.jsx'
import Start from './screens/Start.jsx'
import SendForm from './screens/SendForm.jsx'
import NetworkModal from './screens/NetworkModal.jsx'
import Review from './screens/Review.jsx'
import Sent from './screens/Sent.jsx'
import Confidence from './screens/Confidence.jsx'
import TaskEnded from './screens/TaskEnded.jsx'
import End from './screens/End.jsx'
import './App.css'

const EMPTY_FORM = {
  address: '',
  addressTouched: false,
  network: null,
  networkSource: null, // 'preselected' | 'manual'
  networkOpen: false,
  amount: '',
}

export default function App() {
  const [screen, setScreen] = useState('setup')
  const [session, setSession] = useState(null) // { participant, group, events }
  const [taskIndex, setTaskIndex] = useState(0)
  const [form, setForm] = useState(EMPTY_FORM)
  const [modalOpen, setModalOpen] = useState(false)
  const pastedRef = useRef(false)

  const task = TASKS[taskIndex]
  const isLastTask = taskIndex === TASKS.length - 1

  function log(event, data = {}) {
    const entry = { time: new Date().toISOString(), event, data }
    setSession((s) => ({ ...s, events: [...s.events, entry] }))
  }

  // --- Session ---

  function handleSetup(participant, group) {
    const entry = {
      time: new Date().toISOString(),
      event: 'session_start',
      data: { participant, group },
    }
    setSession({ participant, group, events: [entry] })
    setScreen('start')
  }

  function startTask(index) {
    setTaskIndex(index)
    setForm(EMPTY_FORM)
    setModalOpen(false)
    log('task_start', { task: TASKS[index].number })
    setScreen('form')
  }

  function nextTaskOrEnd() {
    if (isLastTask) setScreen('end')
    else startTask(taskIndex + 1)
  }

  function handleNewSession() {
    setSession(null)
    setTaskIndex(0)
    setForm(EMPTY_FORM)
    setScreen('setup')
  }

  // --- Send form ---

  function handleAddressPaste() {
    pastedRef.current = true
  }

  function handleAddressChange(address) {
    const format = detectAddress(address)
    const wasPasted = pastedRef.current
    pastedRef.current = false
    if (wasPasted) log('address_pasted', { task: task.number, format })

    const next = { ...form, address, addressTouched: form.addressTouched || wasPasted }

    // Variant B: preselect TRON for T… addresses, unless a network is already chosen.
    if (session.group === 'B' && format === ADDRESS_FORMAT.TRON && !form.network) {
      next.network = 'TRON'
      next.networkSource = 'preselected'
      log('network_selected', { task: task.number, network: 'TRON', source: 'preselected' })
    }
    setForm(next)
  }

  function handleNetworkSelect(network) {
    if (network !== form.network) {
      log('network_selected', { task: task.number, network, source: 'manual' })
    }
    setForm({
      ...form,
      network,
      networkSource: network === form.network ? form.networkSource : 'manual',
      networkOpen: false,
    })
  }

  function handleNext() {
    const format = detectAddress(form.address)
    if (session.group === 'B' && format === ADDRESS_FORMAT.EVM) {
      log('modal_shown', { task: task.number, network: form.network })
      setModalOpen(true)
    } else {
      openReview()
    }
  }

  function openReview() {
    log('review_opened', { task: task.number })
    setScreen('review')
  }

  // --- Modal (variant B, 0x… addresses) ---

  function handleModalAction(action) {
    log('modal_action', { task: task.number, action })
    setModalOpen(false)
    if (action === 'continue') {
      openReview()
    } else if (action === 'change') {
      setForm({ ...form, networkOpen: true })
    } else if (action === 'abort') {
      log('task_aborted', { task: task.number, reason: 'safe abort' })
      setScreen('aborted')
    }
  }

  // --- Review / Sent / Confidence ---

  function handleSend() {
    log('transfer_sent', {
      task: task.number,
      network: form.network,
      amount: Number(form.amount),
      correct: form.network === task.expectedNetwork,
    })
    setScreen('sent')
  }

  function handleConfidence(score) {
    log('confidence', { task: task.number, score })
    nextTaskOrEnd()
  }

  return (
    <div className="app">
      <main className="phone">
        {screen === 'setup' && <Setup onStart={handleSetup} />}
        {screen === 'start' && <Start onStart={() => startTask(0)} />}
        {screen === 'form' && (
          <SendForm
            task={task}
            group={session.group}
            form={form}
            onAddressChange={handleAddressChange}
            onAddressPaste={handleAddressPaste}
            onAddressBlur={() => setForm({ ...form, addressTouched: true })}
            onNetworkToggle={() => setForm({ ...form, networkOpen: !form.networkOpen })}
            onNetworkSelect={handleNetworkSelect}
            onAmountChange={(amount) => setForm({ ...form, amount })}
            onNext={handleNext}
          />
        )}
        {screen === 'review' && (
          <Review form={form} onSend={handleSend} onBack={() => setScreen('form')} />
        )}
        {screen === 'sent' && (
          <Sent form={form} onContinue={() => setScreen('confidence')} />
        )}
        {screen === 'confidence' && (
          <Confidence
            key={task.number}
            isLastTask={isLastTask}
            onSubmit={handleConfidence}
          />
        )}
        {screen === 'aborted' && (
          <TaskEnded isLastTask={isLastTask} onContinue={nextTaskOrEnd} />
        )}
        {screen === 'end' && <End session={session} onNewSession={handleNewSession} />}

        {modalOpen && (
          <NetworkModal network={form.network} onAction={handleModalAction} />
        )}
      </main>
    </div>
  )
}
