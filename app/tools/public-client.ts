import { createPublicClient, http } from "viem";
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

export const publicClientArb = createPublicClient({
  chain: arbitrum,
  transport: http(),
});

export const publicClientOp = createPublicClient({
  chain: optimism,
  transport: http(),
});

export const publicClientBase = createPublicClient({
  chain: base,
  transport: http(),
});

export const publicClientAbstract = createPublicClient({
  chain: abstract,
  transport: http(),
});

export const publicClientZora = createPublicClient({
  chain: zora,
  transport: http(),
});

export const publicClientBlast = createPublicClient({
  chain: blast,
  transport: http(),
});

export const publicClientInk = createPublicClient({
  chain: ink,
  transport: http(),
});

export const publicClientLinea = createPublicClient({
  chain: linea,
  transport: http(),
});

export const publicClientManta = createPublicClient({
  chain: manta,
  transport: http(),
});

export const publicClientMode = createPublicClient({
  chain: mode,
  transport: http(),
});

export const publicClientScroll = createPublicClient({
  chain: scroll,
  transport: http(),
});

export const publicClientTaiko = createPublicClient({
  chain: taiko,
  transport: http(),
});

export const publicClientUnichain = createPublicClient({
  chain: unichain,
  transport: http(),
});

export const publicClientZksync = createPublicClient({
  chain: zksync,
  transport: http(),
});
