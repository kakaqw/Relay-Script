"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { getPrivate } from "./components/getPrivate";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { sepolia, arbitrumSepolia } from "viem/chains";
import { relayClient } from "./components/relay-client";

export let accounts: any[] = [];
export let clients: any[] = [];

export default function Home() {
  const [Text, setText] = useState("");

  useEffect(() => {}, [Text]);

  //获取从页面输入的私钥
  const inputPirvate = async () => {
    // 清空账户
    accounts = [];
    clients = [];

    //获取私钥
    const privateKeys = getPrivate(Text);
    privateKeys.forEach((privatekeys, index) => {
      // console.log("第" + (index + 1) + "个私钥", privatekeys);
      const account = privateKeyToAccount(privateKeys[index] as `0x${string}`);
      // console.log("第一个账户", account);
      accounts.push(account);
    });
    console.log("所有账户", accounts);
  };

  //获取报价
  const getQuote = async () => {
    try {
      console.log("getClient", relayClient());

      const quote = await relayClient()?.actions.getQuote(
        {
          user: accounts[0].address,
          // wallet: accounts[0],
          chainId: sepolia.id, // The chain id to bridge from
          toChainId: arbitrumSepolia.id, // The chain id to bridge to
          amount: "100000000000000000", // Amount in wei to bridge
          currency: "0x0000000000000000000000000000000000000000", // ERC20 Address
          toCurrency: "0x0000000000000000000000000000000000000000", // ERC20 Address
          tradeType: "EXACT_INPUT",
        },
        true
      );
      console.log("quote", quote);
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
              inputPirvate();
              // getClinet();
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            开始垮链
          </button>
          <button
            onClick={() => {
              getQuote();
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            获取报价
          </button>
        </div>
      </div>
    </div>
  );
}
