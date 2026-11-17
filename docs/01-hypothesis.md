# Hypothesis Card

## Hypothesis

> We believe that **people making their first USDT transfers** choose the wrong network **because they can't match the network named in the recipient's message (e.g. "BEP20") to the network list in their wallet**.
> If the wallet **detects the network from the address when possible and explains how to match it when not**, more of them will **send to the correct network on the first try**.
> We'll know we're right when **≥ 80% of participants in version B choose the correct network in the `0x…` task, at least 30 pp more than in version A**.

| | |
|---|---|
| **Segment** | People making their first USDT transfers |
| **Problem** *(assumption)* | They can't match the network named by the recipient to the network list in the wallet, so they choose the wrong network |
| **Why we believe it** | User posts about wrong-network transfers; exchanges add explicit wrong-network warnings and a network confirmation step (see [competitive analysis](02-competitive-analysis.md)) |
| **Solution** | Detect the network from the address when it's unambiguous (`T…` → TRON); when it's ambiguous (`0x…`), explain how to match the recipient's network before sending |
| **Expected outcome** | More participants send to the correct network on the first try |

## Metrics

| Type | Metric |
|---|---|
| **Primary** | % of participants who sent to the correct network (`0x…` task, first in order) |
| **Secondary** | % correct network in the `T…` task; median time per task; confidence (1–5); which version is clearer |
| **Guardrail** | % of participants who confirmed the wrong network after the hint (blind confirmation) |

## Success criteria

Version B ≥ 80% correct sends **and** B − A ≥ 30 pp (primary metric).

The threshold is set before the test. It is deliberately high: with 10 participants, only a large difference between versions can be told apart from chance, so a smaller effect would not justify development. With 10 participants there will be no statistical significance: the result is a signal for a development decision, not proof.

## Versions

| | A (control) | B (test) |
|---|---|---|
| Flow | Address → network chosen manually | Address → network detected when possible |
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
- Version A must not be artificially worse than real products, otherwise B wins unfairly. That's why A follows an existing pattern from the competitive analysis: manual network choice with a generic warning.
- Learning effect: after the first task participants know about networks, so the primary metric is calculated on the first task only.
