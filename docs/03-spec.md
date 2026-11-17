# Prototype Spec

## Overview

A clickable web prototype of a USDT send flow in two variants (A and B). Participants complete two transfer tasks; the prototype records their actions. No real money, wallets, or blockchain are involved.

**Out of scope:** real transactions, private keys, wallet connection, backend, user accounts.

## Session setup

The moderator sets up each session on the Setup screen before handing the device to the participant: enters the participant ID and taps **Group A** or **Group B**.

The moderator assigns groups manually (5 participants start with A, 5 with B). This keeps the groups balanced, which random assignment can't guarantee with 10 people.

## Flow

```
Setup → Start → [Task 1] Send form → (B: modal) → Review → Sent → Confidence
      → [Task 2] Send form → Review → Sent → Confidence
      → End (results)

B, modal → "Not sure" → Transfer not sent → next task (no confidence question)
```

## Screens

### 0. Setup (moderator)

- Input: "Participant ID"
- Buttons: **Group A**, **Group B** (active once the ID is filled)
- After a tap, the participant's Start screen opens. The participant doesn't see the group.

### 1. Start

- Title: "Send USDT"
- Short instruction: "You'll complete two transfers. Act as you would with your own money."
- Button: **Start**

### 2. Task card

Shown at the top of the send form for the current task.

- Task header: "Task 1 of 2"
- Balance: "Your balance: 100 USDT"
- Recipient's message, styled as a chat bubble:

| Task | Message |
|---|---|
| 1 | Hi! Waiting for 20 USDT. Address: `0x8f3c2b9e41d7a05f6c3b8e2d19a4f07c5e6b1a21`, network BEP20 |
| 2 | Hi! Waiting for 30 USDT. Address: `TQ8f3vRk2Lm9XpZ4wYcN7bHd5sJtE6ua21`, network TRC20 |

- **Copy** button next to the address.

### 3. Send form

| Field | Behavior |
|---|---|
| Asset | Fixed: USDT (not editable) |
| Recipient address | Text input, paste allowed |
| Network | Dropdown, no default value (see "Networks") |
| Amount | Number input, "Max" not needed. Error "Insufficient balance" if amount + fee exceeds the balance |
| Fee | Shown after a network is selected (see "Networks") |
| **Next** button | Active when the address is valid, a network is selected and the amount is above 0 and not above the balance (error "Insufficient balance" otherwise) |

**Variant A:** static warning under the network field:
> ⚠️ Make sure the network matches the recipient's network.

**Variant B:** network detection (see "Address detection").

### 4. Network confirmation modal (variant B, `0x…` addresses only)

Shown on every tap of **Next** for a `0x…` address, including after "Change network".

> **Confirm the recipient's network**
> This address works on several networks. If you choose the wrong one, your money may not arrive.
> Check the recipient's message — the network is often written as ERC20, BEP20.
>
> Currently selected: **{network} · {standard}**

| Button | Action |
|---|---|
| Network is correct, continue | → Review |
| Change network | → Send form, network dropdown opened |
| Not sure — I'll ask the recipient | → "Transfer not sent" screen → next task |

"Not sure" ends the task by design: participants who want to reselect use "Change network", so "Not sure" stays a separate signal that the modal explanation wasn't enough.

### 5. Review

- Amount, network (with standard), recipient address, fee, total
- Buttons: **Send**, **Back** (Back keeps everything entered)

### 6. Sent

- "Transfer sent" + amount and network
- The prototype does **not** reveal whether the network was correct.
- Button: **Continue**

### 6a. Transfer not sent (after "Not sure")

- "Transfer not sent" + short note that the participant chose to check with the recipient
- Button: **Next task** / **Finish**
- The confidence question is skipped for this task.

### 7. Confidence question

- "How confident are you that the money will arrive?" — scale 1–5
- Button: **Next task** / **Finish**

### 8. End

- "Thank you!"
- **Download results** button: saves a file named `participant-{ID}-group-{A|B}.json` with all events and per-task results.
- **New session** button: returns to the Setup screen. Asks for confirmation if the results haven't been downloaded.

## Networks

| Network | Standard label | Mock fee |
|---|---|---|
| TRON | TRC20 | 1 USDT |
| Ethereum | ERC20 | 2.5 USDT |
| BNB Smart Chain | BEP20 | 0.1 USDT |
| Solana | SPL | 0.05 USDT |
| Polygon PoS | — | 0.1 USDT |
| Arbitrum One | — | 0.2 USDT |
| Avalanche C-Chain | — | 0.3 USDT |
| TON | — | 0.1 USDT |

The list is the same in both variants.

## Address detection

| Address format | Detected as | Both variants | Variant B only |
|---|---|---|---|
| `T` + 33 base58 characters | TRON | — | TRON preselected (only if no network has been chosen yet), label "✓ Detected from address" under the field; participant can change it |
| `0x` + 40 hex characters | EVM (ambiguous) | — | No preselection; modal on **Next** |
| Anything else | Invalid | Error "Invalid address", shown after a paste or when the field loses focus | — |

**Address/network compatibility is not validated** in either variant: a participant can send to a `T…` address on an EVM network, or to a `0x…` address on TRON. See "Deliberate simplifications".

## Event logging

Each event is stored with a timestamp during the session and exported with the **Download results** button on the End screen. Every task event includes `task` in its data, so the summary is built from the log.

| Event | Data |
|---|---|
| `session_start` | participant, variant |
| `task_start` | task number |
| `address_pasted` | detected format |
| `network_selected` | network, preselected or manual |
| `modal_shown` / `modal_action` | selected button |
| `review_opened` | — |
| `transfer_sent` | network, amount, correct (yes/no) |
| `task_aborted` | reason ("safe abort") |
| `confidence` | score 1–5 |

### Page reload

The session is saved in the browser. A reload brings the participant back to the same screen with the form filled in. Reloads are not recorded in the event log, but they make that task's `time_seconds` longer, so the moderator notes them in the test plan.

## Export format

The exported file contains a ready-to-use summary per task plus the raw event log. No manual calculation is needed.

```json
{
  "participant": "07",
  "group": "B",
  "tasks": [
    {
      "task": 1,
      "outcome": "sent",
      "selected_network": "BNB Smart Chain",
      "expected_network": "BNB Smart Chain",
      "correct": true,
      "time_seconds": 48.2,
      "network_changes": 1,
      "modal_action": "continue",
      "confidence": 4
    },
    {
      "task": 2,
      "outcome": "sent",
      "selected_network": "TRON",
      "expected_network": "TRON",
      "correct": true,
      "time_seconds": 21.5,
      "network_changes": 0,
      "modal_action": null,
      "confidence": 5
    }
  ],
  "events": [
    { "time": "2026-11-10T14:03:12.410Z", "event": "session_start", "data": { "participant": "07", "group": "B" } }
  ]
}
```

| Field | Meaning |
|---|---|
| `outcome` | `sent` or `safe_abort` ("Not sure — I'll ask the recipient") |
| `selected_network` | Network selected when the task ended (also for `safe_abort`) |
| `correct` | Selected network matches the network in the task; `null` for `safe_abort` |
| `time_seconds` | From `task_start` to `transfer_sent` (or `task_aborted`) |
| `network_changes` | How many times the network was changed after the first selection |
| `modal_action` | Last choice in the modal: `continue`, `change`, `abort`, or `null` if the modal wasn't shown. The full sequence is in `events` |
| `confidence` | 1–5, or `null` for `safe_abort` |

## Tech

- Static web app (React + Vite), no backend
- Hosted on GitHub Pages; the build uses relative paths (`base: './'`) so it works from a subfolder
- Desktop and mobile layouts; on mobile the modal opens as a bottom sheet
- The network dropdown is a custom component, because the browser's built-in one can't be opened from code reliably on phones ("Change network")
- Copy works even when a phone opens the dev server over plain http on the local network

## Deliberate simplifications

**No address/network compatibility check.** Real products often reject a `T…` address when an EVM network is selected. The prototype intentionally allows this mistake in both variants so that network selection errors can be observed and measured in both tasks. As a result, the error rate in the prototype may be higher than in real products, but the comparison between A and B stays fair because both variants behave the same way.
