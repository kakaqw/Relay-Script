import { createWalletClient } from "viem";
import {
  arbitrumSepolia,
  sepolia,
  optimismSepolia,
  abstractTestnet,
} from "viem/chains";
import { http } from "viem";
// import { accounts } from "../page";
import { type Account } from "viem/accounts";

export const createArbSepoliaClient = (account: Account) =>
  createWalletClient({
    account,
    chain: arbitrumSepolia,
    transport: http(
      "https://arb-sepolia.g.alchemy.com/v2/k4FxaqBndT5c1h32xZj2m65v0dsjKlvi"
    ),
  });

export const createSepoliaClient = (account: Account) =>
  createWalletClient({
    account,
    chain: sepolia,
    transport: http(
      "https://eth-sepolia.g.alchemy.com/v2/k4FxaqBndT5c1h32xZj2m65v0dsjKlvi"
    ),
  });

export const creatOpeSepoliaClient = (account: Account) =>
  createWalletClient({
    account,
    chain: optimismSepolia,
    transport: http(
      "https://opt-sepolia.g.alchemy.com/v2/k4FxaqBndT5c1h32xZj2m65v0dsjKlvi"
    ),
  });

export const createAbstractSepoliaClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: abstractTestnet,
    transport: http(
      "https://abstract-testnet.g.alchemy.com/v2/k4FxaqBndT5c1h32xZj2m65v0dsjKlvi"
    ),
  });
};
