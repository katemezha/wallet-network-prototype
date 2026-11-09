// Keeps the current session in localStorage so a page reload (or an
// accidentally closed tab) doesn't wipe the participant's progress.

const KEY = 'wallet-prototype-session'

export function restoreState() {
  try {
    const state = JSON.parse(localStorage.getItem(KEY))
    return state?.session ? state : null
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
