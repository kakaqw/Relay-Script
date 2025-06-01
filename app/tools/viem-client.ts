import { createWalletClient } from "viem";
import {
  arbitrum,
  optimism,
  abstract,
  zora,
  base,
  blast,
  ink,
  linea,
  manta,
  mode,
  scroll,
  taiko,
  unichain,
  zksync,
} from "viem/chains";
import { http } from "viem";
import { type Account } from "viem/accounts";

let apiKey: string;

export const setKey = (key: string) => {
  apiKey = key;
};

const ArbClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: arbitrum,
    transport: http(`https://arb-mainnet.g.alchemy.com/v2/${apiKey}`),
  });
};

const OpeClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: optimism,
    transport: http(`https://opt-mainnet.g.alchemy.com/v2/${apiKey}`),
  });
};

const AbstractClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: abstract,
    transport: http(`https://abstract-mainnet.g.alchemy.com/v2/${apiKey}`),
  });
};

const ZoraClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: zora,
    transport: http(`https://zora-mainnet.g.alchemy.com/v2/${apiKey}`),
  });
};

const BaseClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: base,
    transport: http(`https://base-mainnet.g.alchemy.com/v2/${apiKey}`),
  });
};

const BlastClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: blast,
    transport: http(`https://blast-mainnet.g.alchemy.com/v2/${apiKey}`),
  });
};

const InkClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: ink,
    transport: http(`https://ink-mainnet.g.alchemy.com/v2/${apiKey}`),
  });
};

const LineaClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: linea,
    transport: http(`https://linea-mainnet.g.alchemy.com/v2/${apiKey}`),
  });
};

const MantaClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: manta,
    transport: http(`https://manta-mainnet.g.alchemy.com/v2/${apiKey}`),
  });
};

const ModeClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: mode,
    transport: http(`https://mode-mainnet.g.alchemy.com/v2/${apiKey}`),
  });
};

const ScrollClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: scroll,
    transport: http(`https://scroll-mainnet.g.alchemy.com/v2/${apiKey}`),
  });
};

const TaikoClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: taiko,
    transport: http(`https://taiko-mainnet.g.alchemy.com/v2/${apiKey}`),
  });
};

const UnichainClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: unichain,
    transport: http(`https://unichain-mainnet.g.alchemy.com/v2/${apiKey}`),
  });
};

const ZksyncClient = (account: Account) => {
  return createWalletClient({
    account,
    chain: zksync,
    transport: http(`https://zksync-mainnet.g.alchemy.com/v2/${apiKey}`),
  });
};

export {
  ArbClient,
  OpeClient,
  AbstractClient,
  ZoraClient,
  BaseClient,
  BlastClient,
  InkClient,
  LineaClient,
  MantaClient,
  ModeClient,
  ScrollClient,
  TaikoClient,
  UnichainClient,
  ZksyncClient,
};
