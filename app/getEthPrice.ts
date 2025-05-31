import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const ETH_USD_PRICE_FEED = "0x5147eA642CAEF7BD9c1265AadcA78f997AbB9649";

const PRICE_FEED_ABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const client = createPublicClient({
  chain: mainnet,
  transport: http(
    "https://eth-mainnet.g.alchemy.com/v2/k4FxaqBndT5c1h32xZj2m65v0dsjKlvi"
  ),
});
export const getEthPrice = async () => {
  const decimals = await client.readContract({
    address: ETH_USD_PRICE_FEED,
    abi: PRICE_FEED_ABI,
    functionName: "decimals",
  });

  // 获取最新价格数据
  const roundData: any = await client.readContract({
    address: ETH_USD_PRICE_FEED,
    abi: PRICE_FEED_ABI,
    functionName: "latestRoundData",
  });

  // 从返回数据中提取价格，并根据小数位数转换为实际价格
  const price = Number(roundData[1]) / 10 ** Number(decimals);

  return price;
};
