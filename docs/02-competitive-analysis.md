# Competitive Analysis: Network Selection When Sending USDT

> **Note.** The analysis is based on the official documentation of each product. Checking the flows in the apps themselves wasn't possible: the send screen is unavailable with a zero balance.

## Comparison

| Question | Trust Wallet | Tonkeeper | MetaMask | Binance (app) | Binance (web) |
|---|---|---|---|---|---|
| Model | Asset first | Asset first | Network and token first | Address → network chosen manually | Address → network detected automatically |
| Steps | Token → address → amount → confirmation | "USDT (TRC20)" token page → Send | Network and token → address → amount → confirmation | Coin → address → network → amount → review screen → second confirmation → 2FA | Coin → address → network detected → network confirmation → review screen → 2FA |
| Network labeling | — | "USDT (TRC20)" in the asset name | — | Network + standard (BEP20 = BNB Smart Chain) | Network + standard |
| Network auto-detection from address | — | — | — | No | Yes |
| Network warnings | — | Only about unsupported TRON tokens | — (warns about similar and new addresses) | "Make sure the network matches… assets may be lost" | Separate network confirmation step + the same warning |
| Fees | — | No TRX needed, fee paid from "Battery" | Network's native token required | Shown before confirmation | Shown before confirmation |

"—" means no data in the documentation.

## Observations

1. Three network selection models are in use: asset first (Trust Wallet, Tonkeeper), network first (MetaMask), address → network (Binance).
2. Network auto-detection from the address, with a separate confirmation, already exists in the Binance web version. The Binance app doesn't have it.
3. Only Binance's documentation includes wrong-network warnings.
4. Tonkeeper and Binance label networks with the standard ("USDT (TRC20)", "BEP20 = BNB Smart Chain").
5. The Trust Wallet community forum has posts from users who chose the wrong network.
6. Binance explicitly warns against choosing a network based on the lowest fee.

## Sources

- Trust Wallet — [FAQ](https://trustwallet.com/ru/blog/academy/trust-wallet-faqs)
- Trust Wallet — [community forum: "Incorrect network"](https://community.trustwallet.com/t/incorrect-network/455428)
- Tonkeeper — [USDT (TRC20) in Tonkeeper](https://tonkeeper.helpscoutdocs.com/article/137-multichain)
- MetaMask — [How to send tokens from your MetaMask wallet](https://support.metamask.io/manage-crypto/move-crypto/send/how-to-send-tokens-from-your-metamask-wallet/)
- Binance — [How to Deposit/Withdraw Cryptocurrency on Binance](https://www.binance.com/en/support/faq/85a1c394ac1d489fb0bfac0ef2fceafd)
- Binance — [blog: withdrawing crypto](https://www.binance.com/az-AZ/square/post/22176159738937)
