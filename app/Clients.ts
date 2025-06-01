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

import {
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
} from "./tools/viem-client";
import {
  publicClientArb,
  publicClientOp,
  publicClientBase,
  publicClientAbstract,
  publicClientZora,
  publicClientBlast,
  publicClientInk,
  publicClientLinea,
  publicClientManta,
  publicClientMode,
  publicClientScroll,
  publicClientTaiko,
  publicClientUnichain,
  publicClientZksync,
} from "./tools/public-client";

const arbClient = {
  publicClient: publicClientArb,
  client: ArbClient,
  id: arbitrum.id,
};

const optimismClient = {
  publicClient: publicClientOp,
  client: OpeClient,
  id: optimism.id,
};

const abstractClient = {
  publicClient: publicClientAbstract,
  client: AbstractClient,
  id: abstract.id,
};

const zoraClient = {
  publicClient: publicClientZora,
  client: ZoraClient,
  id: zora.id,
};

const baseClient = {
  publicClient: publicClientBase,
  client: BaseClient,
  id: base.id,
};

const blastClient = {
  publicClient: publicClientBlast,
  client: BlastClient,
  id: blast.id,
};

const inkClient = {
  publicClient: publicClientInk,
  client: InkClient,
  id: ink.id,
};

const lineaClient = {
  publicClient: publicClientLinea,
  client: LineaClient,
  id: linea.id,
};

const mantaClient = {
  publicClient: publicClientManta,
  client: MantaClient,
  id: manta.id,
};

const modeClient = {
  publicClient: publicClientMode,
  client: ModeClient,
  id: mode.id,
};

const scrollClient = {
  publicClient: publicClientScroll,
  client: ScrollClient,
  id: scroll.id,
};

const taikoClient = {
  publicClient: publicClientTaiko,
  client: TaikoClient,
  id: taiko.id,
};

const unichainClient = {
  publicClient: publicClientUnichain,
  client: UnichainClient,
  id: unichain.id,
};

const zksyncClient = {
  publicClient: publicClientZksync,
  client: ZksyncClient,
  id: zksync.id,
};

export {
  optimismClient,
  abstractClient,
  zoraClient,
  arbClient,
  baseClient,
  blastClient,
  inkClient,
  lineaClient,
  mantaClient,
  modeClient,
  scrollClient,
  taikoClient,
  unichainClient,
  zksyncClient,
};
