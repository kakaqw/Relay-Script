import {
  createClient,
  convertViemChainToRelayChain,
  MAINNET_RELAY_API,
  TESTNET_RELAY_API,
} from "@reservoir0x/relay-sdk";
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

// 保存客户端实例
let clientInstance: ReturnType<typeof createClient> | null = null;

// 初始化客户端并返回单例实例
export const relayClient = () => {
  try {
    // 如果实例已存在，直接返回
    if (clientInstance) {
      return clientInstance;
    }

    // 创建新实例
    clientInstance = createClient({
      baseApiUrl: MAINNET_RELAY_API,
      source: "Relay-SDK",
      chains: [
        convertViemChainToRelayChain(arbitrum),
        convertViemChainToRelayChain(optimism),
        convertViemChainToRelayChain(base),
        convertViemChainToRelayChain(abstract),
        convertViemChainToRelayChain(zora),
        convertViemChainToRelayChain(blast),
        convertViemChainToRelayChain(ink),
        convertViemChainToRelayChain(linea),
        convertViemChainToRelayChain(manta),
        convertViemChainToRelayChain(mode),
        convertViemChainToRelayChain(scroll),
        convertViemChainToRelayChain(taiko),
        convertViemChainToRelayChain(unichain),
        convertViemChainToRelayChain(zksync),
      ],
    });
    console.log("初始化客户端成功", clientInstance);

    return clientInstance;
  } catch (error) {
    console.error("初始化客户端失败:", error);
    return null;
  }
};
