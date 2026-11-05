# Hypothesis Card

## Hypothesis

| | |
|---|---|
| **Segment** | Freelancers who have received their first payment in USDT and need to transfer it |
| **Problem** *(assumption)* | They don't understand the difference between networks, pick the wrong one, and risk losing money |
| **Solution** | For TRON addresses (`T…`) the network is detected automatically; for `0x…` addresses a clear explanation and choice are shown |
| **Expected outcome** | Fewer network selection errors, more confidence when sending |

## Metrics

| Type | Metric |
|---|---|
| **Primary** | % of participants who sent to the correct network (`0x…` task, first in order) |
| **Secondary** | % correct network in the `T…` task; median time per task; confidence (1–5); which version is clearer |
| **Guardrail** | % of participants who confirmed the wrong network after the hint (blind confirmation) |

## Success criteria

Version B ≥ 80% correct sends **and** B − A ≥ 30 pp (primary metric).

The threshold is set before the test. With 10 participants there will be no statistical significance: the result is a signal for a development decision, not proof.

## Versions

| | A (control) | B (test) |
|---|---|---|
| Based on | Binance app: address → network chosen manually | Binance web: address → network detected |
| Network list | With standard labels | With standard labels |
| Default network | None | For `T…`: TRON, labeled "detected from address" |
| Hints | Generic warning "Make sure the network matches the recipient's network" | Modal for `0x…` (see below) |

**Each task tests its own part of the solution:**
- `0x…` task → modal (primary metric);
- `T…` task → network auto-detection (secondary metric).

Labels are present in both versions, so they don't affect the result.

### Modal in B (`0x…` address, on "Next")

> **Confirm the recipient's network**
> This address works on several networks. If you choose the wrong one, your money may not arrive.
> Check the recipient's message — the network is often written as ERC20, BEP20.
>
> Currently selected: **{network} · {standard}**
>
> [Network is correct, continue] [Change network]
> [Not sure — I'll ask the recipient]

## Test

- **Participants:** 10 people who have never sent USDT (screening question before the test).
- **Assignment:** 5 start with A, 5 with B; after both tasks they see the other version and are asked "which is clearer and why".
- **Starting balance:** 100 USDT.
- **Task 1** (message from the recipient):
  > Hi! Waiting for 20 USDT. Address: `0x8f3c2b9e41d7a05f6c3b8e2d19a4f07c5e6b1a21`, network BEP20
- **Task 2:**
  > Hi! Waiting for 30 USDT. Address: `TQ8f3vRk2Lm9XpZ4wYcN7bHd5sJtE6ua21`, network TRC20

The addresses are fictional but correctly formatted.

## Risks and assumptions

- No real money, so participants are less careful than in real life.
- Version A must not be artificially worse than real products, otherwise B wins unfairly. That's why A replicates an existing interface (the Binance app).
- Learning effect: after the first task participants know about networks, so the primary metric is calculated on the first task only.
