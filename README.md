# Wallet Network Prototype

Validating a product hypothesis with a rapid prototype: helping crypto wallet users choose the right network when sending USDT.

## Hypothesis in brief

Newcomers sending USDT for the first time pick the wrong network because they don't understand the difference between networks. If the wallet detects the network from the address and, in ambiguous cases, explains how to confirm it, fewer people will make mistakes.

## Contents

| Document | Description |
|---|---|
| [01 — Hypothesis](docs/01-hypothesis.md) | Hypothesis card, metrics, success criteria |
| [02 — Competitive analysis](docs/02-competitive-analysis.md) | How network selection works in Trust Wallet, Tonkeeper, MetaMask, Binance |
| [Backlog](docs/backlog.md) | Hypotheses to validate later |
| 03 — Prototype spec | *in progress* |
| 04 — Test plan | *in progress* |
| 05 — Results | *after testing* |

## Approach

- Each stage is a separate pull request, so decisions and their rationale stay in the repository history (docs-as-code).
- The prototype is a clickable web version of the send screen in two variants (A/B), with no real money or blockchain.
- Test: 10 participants with no experience sending USDT, comparative usability testing.

## Status

- [x] Hypothesis
- [x] Competitive analysis
- [ ] Spec
- [ ] Prototype
- [ ] Test
- [ ] Results
