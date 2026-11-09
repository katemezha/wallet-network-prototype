// Keeps the current session in localStorage so a page reload (or an
// accidentally closed tab) doesn't wipe the participant's progress.

const KEY = 'wallet-prototype-session'

// Returns the saved state with a `session_restored` event appended, or null.
export function restoreState() {
  try {
    const state = JSON.parse(localStorage.getItem(KEY))
    if (!state?.session) return null
    const entry = {
      time: new Date().toISOString(),
      event: 'session_restored',
      data: { screen: state.screen },
    }
    return { ...state, session: { ...state.session, events: [...state.session.events, entry] } }
  } catch {
    return null
  }
}

export function saveState(state) {
  try {
    if (state.session) localStorage.setItem(KEY, JSON.stringify(state))
    else localStorage.removeItem(KEY)
  } catch {
    // Storage unavailable (e.g. private mode): the session just won't survive a reload.
  }
}
