import { createWalletClient } from "viem";
import {
  arbitrumSepolia,
  sepolia,
  optimismSepolia,
  abstractTestnet,
  zoraSepolia,
} from "viem/chains";
import { http } from "viem";
import { type Account } from "viem/accounts";

let apiKey: string;

export const setKey = (key: string) => {
  apiKey = key;
};

const ArbSepoliaClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: arbitrumSepolia,
    transport: http(`https://arb-sepolia.g.alchemy.com/v2/${apiKey}`),
  });
};

const SepoliaClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${apiKey}`),
  });
};

const OpeSepoliaClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: optimismSepolia,
    transport: http(`https://opt-sepolia.g.alchemy.com/v2/${apiKey}`),
  });
};

const AbstractSepoliaClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: abstractTestnet,
    transport: http(`https://abstract-testnet.g.alchemy.com/v2/${apiKey}`),
  });
};

const ZoraSepoliaClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: zoraSepolia,
    transport: http(`https://zora-sepolia.g.alchemy.com/v2/${apiKey}`),
  });
};

export {
  ArbSepoliaClient,
  SepoliaClient,
  OpeSepoliaClient,
  AbstractSepoliaClient,
  ZoraSepoliaClient,
};
