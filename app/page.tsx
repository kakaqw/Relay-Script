"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { getPrivate } from "./components/getPrivate";
import { privateKeyToAccount } from "viem/accounts";
import { formatEther } from "viem";
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

import { type Account } from "viem/accounts";
import { Quote } from "./components/interface";
import { executeTx } from "./components/ececuteTx";
import { getEthPrice } from "./getEthPrice";

export let accounts: Account[] = [];
export let clients: any[] = [
  {
    publicClient: publicClientSepolia,
    client: SepoliaClient,
    id: sepolia.id,
  },
  {
    publicClient: publicClientOpeSepolia,
    client: OpeSepoliaClient,
    id: optimismSepolia.id,
  },
  {
    publicClient: publicClientAbstractSepolia,
    client: AbstractSepoliaClient,
    id: abstractTestnet.id,
  },
  {
    publicClient: publicClientZoraSepolia,
    client: ZoraSepoliaClient,
    id: zoraSepolia.id,
  },
  {
    publicClient: publicClientArbSepolia,
    client: ArbSepoliaClient,
    id: arbitrumSepolia.id,
  },
  {
    publicClient: publicClientSepolia,
    client: SepoliaClient,
    id: sepolia.id,
  },
];

export default function Home() {
  const [Text, setText] = useState("");
  const [sourceChain, setSourceChain] = useState("11155111");
  const [targetChain, setTargetChain] = useState("421614");

  // 监听输入框
  useEffect(() => {}, [Text]);

  // 获取ETH价格
  const getPrice = async () => {
    const price = await getEthPrice();
    console.log("price", price);
  };

  //获取报价
  const getQuote = async () => {
    try {
      // 清空账户
      accounts = [];

      //获取私钥
      const privateKeys = getPrivate(Text);
      privateKeys.forEach((privateKey) => {
        const account = privateKeyToAccount(privateKey as `0x${string}`);

        accounts.push(account);
      });

      let finish: any = [];
      for (const account of accounts) {
        for (const [index, { publicClient, client, id }] of clients.entries()) {
          const balance = await publicClient.getBalance({
            address: account.address,
          });
          console.log("balance", formatEther(balance));

          if (clients[index + 1] == null) {
            console.log("没有下一个客户端");
            continue;
          }

          //设置交易参数
          const tx: Quote = {
            user: account.address,
            wallet: client(account),
            chainId: id,
            toChainId: clients[index + 1].id,
            amount: balance.toString(),
            currency: "0x0000000000000000000000000000000000000000", // ERC20 Address
            toCurrency: "0x0000000000000000000000000000000000000000", // ERC20 Address
            tradeType: "EXACT_INPUT",
          };
          const toChainId = await executeTx(tx);

          await new Promise((resolve) => setTimeout(resolve, 500));
          console.log("toChainId", toChainId);
        }
        console.log("完成交互", account.address);
        finish.push(account.address);
      }
      console.log("完成交互", finish);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 w-100vw ">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">Auto Relay</h1>

        <div className="flex justify-center items-center">
          {/* 输入框 */}
          <div className="space-y-2">
            <Textarea
              id="left-textarea"
              placeholder="请在此输入私钥..."
              value={Text}
              onChange={(e) => {
                setText(e.target.value);
                console.log(Text);
              }}
              className="h-[700px] w-[600px] resize-none overflow-auto"
            />
            <p className="text-xs text-muted-foreground">
              字符数: {Text.length}
            </p>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => {
              getPrice();
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            获取ETH价格
          </button>
          <button
            onClick={() => {
              getQuote();
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            全自动亏钱
          </button>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium mb-1">启始链</label>
            <select
              className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background"
              value={sourceChain}
              onChange={(e) => {
                const newValue = e.target.value;
                setSourceChain(newValue);
                console.log("sourceChain changed to", newValue);
              }}
            >
              <option value={sepolia.id}>Sepolia</option>
              <option value={arbitrumSepolia.id}>Arbitrum Sepolia</option>
              <option value={abstractTestnet.id}>abstractTestnet</option>
              <option value={zoraSepolia.id}>Zora Sepolia</option>
            </select>
          </div>
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium mb-1">终止链</label>
            <select
              className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background"
              value={targetChain}
              onChange={(e) => {
                const newValue = e.target.value;
                setTargetChain(newValue);
                console.log("targetChain changed to", newValue);
              }}
            >
              <option value={sepolia.id}>Sepolia</option>
              <option value={arbitrumSepolia.id}>Arbitrum Sepolia</option>
              <option value={abstractTestnet.id}>abstractTestnet</option>
              <option value={zoraSepolia.id}>Zora Sepolia</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
