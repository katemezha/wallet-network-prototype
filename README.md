# Wallet Network Prototype

Validating a product hypothesis with a rapid prototype: helping crypto wallet users choose the right network when sending USDT.

**Live prototype:** https://katemezha.github.io/wallet-network-prototype/

## Why it matters
 
USDT exists on many networks (TRON, Ethereum, BNB Smart Chain and others). A sender has to pick the same network as the recipient, and blockchain transfers can't be reversed: a wrong choice can mean lost money. Exchanges typically warn about this at every withdrawal, while most wallets leave the choice to the user.
 
## Hypothesis
 
People making their first USDT transfers choose the wrong network because they can't match the network named in the recipient's message (e.g. "BEP20") to the network list in their wallet. If the wallet detects the network from the address when possible and explains how to match it when not, more of them will send to the correct network on the first try.
 
Details, metrics and success criteria: [01 — Hypothesis](docs/01-hypothesis.md).
 
## How it's tested
 
- **Prototype:** a clickable send screen in two versions, with no real money or blockchain.
  - **A** follows a common exchange-style flow: manual network choice and a generic warning.
  - **B** detects the network from the address and explains how to confirm it when the address fits several networks.
- **Test:** 10 participants with no experience sending USDT complete two transfers; 5 start with A, 5 with B.
- **Decision:** the result shows whether contextual network help is worth building in a wallet, and which part of it to test next.
## Documents
 
| Document | Description |
|---|---|
| [01 — Hypothesis](docs/01-hypothesis.md) | Hypothesis, metrics, success criteria |
| [02 — Competitive analysis](docs/02-competitive-analysis.md) | How network selection works in Trust Wallet, Tonkeeper, MetaMask, Binance |
| [03 — Prototype spec](docs/03-spec.md) | Screens, A/B differences, event logging, export format |
| 04 — Test plan | *in progress* |
| 05 — Results | *after testing* |
| [Backlog](docs/backlog.md) | Hypotheses to validate later |
 
Each stage is a separate pull request, so decisions and their rationale stay in the repository history.
 
## Status
 
- [x] Hypothesis
- [x] Competitive analysis
- [x] Spec
- [x] Prototype
- [ ] Test
- [ ] Results
## Run locally
 
```bash
cd app
npm install
npm run dev
```
 
Open http://localhost:5173
