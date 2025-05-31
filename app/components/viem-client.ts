import { createWalletClient } from "viem";
import {
  arbitrumSepolia,
  sepolia,
  optimismSepolia,
  abstractTestnet,
  zoraSepolia,
} from "viem/chains";
import { http } from "viem";
// import { accounts } from "../page";
import { type Account } from "viem/accounts";

const ArbSepoliaClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: arbitrumSepolia,
    transport: http(
      "https://arb-sepolia.g.alchemy.com/v2/k4FxaqBndT5c1h32xZj2m65v0dsjKlvi"
    ),
  });
};

const SepoliaClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: sepolia,
    transport: http(
      "https://eth-sepolia.g.alchemy.com/v2/k4FxaqBndT5c1h32xZj2m65v0dsjKlvi"
    ),
  });
};

const OpeSepoliaClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: optimismSepolia,
    transport: http(
      "https://opt-sepolia.g.alchemy.com/v2/k4FxaqBndT5c1h32xZj2m65v0dsjKlvi"
    ),
  });
};

const AbstractSepoliaClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: abstractTestnet,
    transport: http(
      "https://abstract-testnet.g.alchemy.com/v2/k4FxaqBndT5c1h32xZj2m65v0dsjKlvi"
    ),
  });
};

const ZoraSepoliaClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: zoraSepolia,
    transport: http(
      "https://zora-sepolia.g.alchemy.com/v2/k4FxaqBndT5c1h32xZj2m65v0dsjKlvi"
    ),
  });
};

export {
  ArbSepoliaClient,
  SepoliaClient,
  OpeSepoliaClient,
  AbstractSepoliaClient,
  ZoraSepoliaClient,
};
