import {
  createClient,
  convertViemChainToRelayChain,
  MAINNET_RELAY_API,
  TESTNET_RELAY_API,
  getClient,
} from "@reservoir0x/relay-sdk";
import {
  arbitrumSepolia,
  sepolia,
  optimismSepolia,
  abstractTestnet,
  zoraSepolia,
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
      baseApiUrl: TESTNET_RELAY_API,
      source: "Relay-SDK",
      chains: [
        convertViemChainToRelayChain(sepolia),
        convertViemChainToRelayChain(arbitrumSepolia),
        convertViemChainToRelayChain(optimismSepolia),
        convertViemChainToRelayChain(abstractTestnet),
        convertViemChainToRelayChain(zoraSepolia),
      ],
    });
    console.log("初始化客户端成功", clientInstance);

    return clientInstance;
  } catch (error) {
    console.error("初始化客户端失败:", error);
    return null;
  }
};
