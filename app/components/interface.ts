import { type Account } from "viem/accounts";

export interface Quote {
  user: string;
  wallet: any; //客户端
  chainId: number;
  toChainId: number;
  amount: string;
  currency: string;
  toCurrency: string;
  tradeType: "EXACT_INPUT";
}
