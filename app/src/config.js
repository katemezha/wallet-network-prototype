export const BALANCE = 100

export const NETWORKS = [
  { name: 'TRON', standard: 'TRC20', fee: 1 },
  { name: 'Ethereum', standard: 'ERC20', fee: 2.5 },
  { name: 'BNB Smart Chain', standard: 'BEP20', fee: 0.1 },
  { name: 'Solana', standard: 'SPL', fee: 0.05 },
  { name: 'Polygon PoS', standard: null, fee: 0.1 },
  { name: 'Arbitrum One', standard: null, fee: 0.2 },
  { name: 'Avalanche C-Chain', standard: null, fee: 0.3 },
  { name: 'TON', standard: null, fee: 0.1 },
]

export function getNetwork(name) {
  return NETWORKS.find((n) => n.name === name) ?? null
}

// "BNB Smart Chain · BEP20", or just the name when there is no standard label.
export function networkLabel(name) {
  const network = getNetwork(name)
  if (!network) return ''
  return network.standard ? `${network.name} · ${network.standard}` : network.name
}

export const TASKS = [
  {
    number: 1,
    amount: 20,
    address: '0x8f3c2b9e41d7a05f6c3b8e2d19a4f07c5e6b1a21',
    networkHint: 'BEP20',
    expectedNetwork: 'BNB Smart Chain',
  },
  {
    number: 2,
    amount: 30,
    address: 'TQ8f3vRk2Lm9XpZ4wYcN7bHd5sJtE6ua21',
    networkHint: 'TRC20',
    expectedNetwork: 'TRON',
  },
]

// Avoids float noise like 20.050000000000001.
export function formatUsdt(value) {
  return `${Number(Number(value).toFixed(6))} USDT`
}
