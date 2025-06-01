import { createPublicClient, http } from "viem";
import {
  sepolia,
  arbitrumSepolia,
  optimismSepolia,
  abstractTestnet,
  zoraSepolia,
} from "viem/chains";

export const publicClientSepolia = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export const publicClientArbSepolia = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(),
});

export const publicClientOpeSepolia = createPublicClient({
  chain: optimismSepolia,
  transport: http(),
});

export const publicClientAbstractSepolia = createPublicClient({
  chain: abstractTestnet,
  transport: http(),
});

export const publicClientZoraSepolia = createPublicClient({
  chain: zoraSepolia,
  transport: http(),
});
