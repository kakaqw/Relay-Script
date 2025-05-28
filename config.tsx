import { createConfig, http } from "@wagmi/core";
import { mainnet, sepolia, arbitrumSepolia } from "@wagmi/core/chains";

export const config = createConfig({
  chains: [mainnet, sepolia, arbitrumSepolia],
  transports: {
    [mainnet.id]: http("https://mainnet.example.com"),
    [sepolia.id]: http("https://sepolia.example.com"),
    [arbitrumSepolia.id]: http("https://arbitrum-sepolia.example.com"),
  },
});
