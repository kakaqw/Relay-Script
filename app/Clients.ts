import {
  arbitrumSepolia,
  sepolia,
  optimismSepolia,
  abstractTestnet,
  zoraSepolia,
} from "viem/chains";

import {
  ArbSepoliaClient,
  SepoliaClient,
  OpeSepoliaClient,
  AbstractSepoliaClient,
  ZoraSepoliaClient,
} from "./components/viem-client";
import {
  publicClientSepolia,
  publicClientArbSepolia,
  publicClientOpeSepolia,
  publicClientAbstractSepolia,
  publicClientZoraSepolia,
} from "./components/public-client";

const sepoliaClient = {
  publicClient: publicClientSepolia,
  client: SepoliaClient,
  id: sepolia.id,
};

const optimismSepoliaClient = {
  publicClient: publicClientOpeSepolia,
  client: OpeSepoliaClient,
  id: optimismSepolia.id,
};

const abstractTestnetClient = {
  publicClient: publicClientAbstractSepolia,
  client: AbstractSepoliaClient,
  id: abstractTestnet.id,
};

const zoraSepoliaClient = {
  publicClient: publicClientZoraSepolia,
  client: ZoraSepoliaClient,
  id: zoraSepolia.id,
};

const arbSepoliaClient = {
  publicClient: publicClientArbSepolia,
  client: ArbSepoliaClient,
  id: arbitrumSepolia.id,
};

export {
  sepoliaClient,
  optimismSepoliaClient,
  abstractTestnetClient,
  zoraSepoliaClient,
  arbSepoliaClient,
};
