// Address format detection (see docs/03-spec.md, "Address detection").
//
//   'T' + 33 base58 characters  -> 'TRON'
//   '0x' + 40 hex characters    -> 'EVM'  (ambiguous: many networks share this format)
//   empty input                 -> 'EMPTY'
//   anything else               -> 'INVALID'
//
// Only the format is checked. Address/network compatibility is deliberately
// NOT validated (spec, "Deliberate simplifications").

// Base58 alphabet: digits and letters without 0, O, I, l.
const TRON_RE = /^T[1-9A-HJ-NP-Za-km-z]{33}$/
const EVM_RE = /^0x[0-9a-fA-F]{40}$/

export const ADDRESS_FORMAT = {
  TRON: 'TRON',
  EVM: 'EVM',
  INVALID: 'INVALID',
  EMPTY: 'EMPTY',
}

export function detectAddress(input) {
  const address = (input ?? '').trim()
  if (address === '') return ADDRESS_FORMAT.EMPTY
  if (TRON_RE.test(address)) return ADDRESS_FORMAT.TRON
  if (EVM_RE.test(address)) return ADDRESS_FORMAT.EVM
  return ADDRESS_FORMAT.INVALID
}
