"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { getPrivate } from "./components/getPrivate";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia, arbitrumSepolia } from "viem/chains";
import { relayClient } from "./components/relay-client"; //用于执行relay交易的客户端
import {
  createSepoliaClient,
  createArbSepoliaClient,
} from "./components/viem-client";
import { type Account } from "viem/accounts";
import { Quote } from "./components/interface";
import { executeTx } from "./components/ececuteTx";

export let accounts: Account[] = [];
// export let clients: any[] = [];

export default function Home() {
  const [Text, setText] = useState("");

  // 监听输入框
  useEffect(() => {}, [Text]);

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
      console.log("所有账户", accounts);

      console.log("getClient", relayClient());

      //通过accounts[0]创建ArbSepoliaClient
      const ArbSepoliaClient = createArbSepoliaClient(accounts[0]);
      const SepoliaClient = createSepoliaClient(accounts[0]);

      const tx: Quote = {
        user: accounts[0].address,
        wallet: SepoliaClient,
        chainId: sepolia.id,
        toChainId: arbitrumSepolia.id,
        amount: "5000000000000000",
        currency: "0x0000000000000000000000000000000000000000", // ERC20 Address
        toCurrency: "0x0000000000000000000000000000000000000000", // ERC20 Address
        tradeType: "EXACT_INPUT",
      };

      executeTx(tx);
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
              getQuote();
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            全自动亏钱
          </button>
        </div>
      </div>
    </div>
  );
}
