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
  sepoliaClient,
  optimismSepoliaClient,
  abstractTestnetClient,
  zoraSepoliaClient,
  arbSepoliaClient,
} from "./Clients";

import { type Account } from "viem/accounts";
import { Quote } from "./components/interface";
import { executeTx } from "./components/ececuteTx";

export let accounts: Account[] = [];
export let clients: any[] = [];

export default function Home() {
  const [Text, setText] = useState("");
  const [sourceChain, setSourceChain] = useState(sepoliaClient);
  const [targetChain, setTargetChain] = useState(arbSepoliaClient);
  let path: any[];

  // 监听输入框
  useEffect(() => {}, [Text]);

  // 设置随机路径
  const setPath = async () => {
    const randomNum = Math.floor(Math.random() * 7) + 6;
    //随机创建一个固定长度的数组
    path = new Array(randomNum);
    //设置启始链和中止链
    path[0] = sourceChain;
    path[path.length - 1] = targetChain;

    // 所有可用的客户端
    const allClients = [
      sepoliaClient,
      optimismSepoliaClient,
      abstractTestnetClient,
      zoraSepoliaClient,
      arbSepoliaClient,
    ];

    // 确保路径长度足够容纳所有客户端
    if (randomNum < allClients.length + 1) {
      console.warn("路径长度不足以包含所有客户端，增加长度");
      const newLength = allClients.length + 1;
      path = new Array(newLength);
      path[0] = sourceChain;
      path[newLength - 1] = targetChain;
    }

    // 创建一个映射，记录哪些客户端已经被使用
    const usedClients = new Set();
    usedClients.add(sourceChain);
    usedClients.add(targetChain);

    // 第一步：填充中间位置，确保使用所有客户端
    for (let i = 1; i < path.length - 1; i++) {
      // 首先查找未使用的客户端
      let validClients = allClients.filter(
        (client) =>
          !usedClients.has(client) && // 未使用过
          client !== path[i - 1] && // 不同于前一个
          (i === path.length - 2 ? client !== path[path.length - 1] : true) // 如果是倒数第二个位置，确保不同于终点
      );

      // 如果已经用完所有客户端，则选择任意一个不同于前后的客户端
      if (validClients.length === 0) {
        validClients = allClients.filter(
          (client) =>
            client !== path[i - 1] && // 不同于前一个
            (i === path.length - 2 ? client !== path[path.length - 1] : true) // 如果是倒数第二个位置，确保不同于终点
        );
      }

      // 随机选择一个客户端
      const randomIndex = Math.floor(Math.random() * validClients.length);
      path[i] = validClients[randomIndex];

      // 标记为已使用
      usedClients.add(path[i]);
    }

    // 第二步：检查是否有未使用的客户端
    const missingClients = allClients.filter(
      (client) => !usedClients.has(client)
    );

    // 如果有未使用的客户端，尝试将它们放入路径中
    if (missingClients.length > 0) {
      console.log("有未使用的客户端:", missingClients.length, "个");

      // 对于每个未使用的客户端
      for (const missingClient of missingClients) {
        // 找到可以替换的位置
        let replaced = false;

        for (let i = 1; i < path.length - 1; i++) {
          // 检查是否可以在此位置替换
          if (
            missingClient !== path[i - 1] && // 不同于前一个
            (i === path.length - 2
              ? missingClient !== path[path.length - 1]
              : missingClient !== path[i + 1]) // 不同于后一个
          ) {
            // 检查被替换的客户端在路径中是否出现多次
            const clientToReplace = path[i];
            const occurrences = path.filter(
              (c) => c === clientToReplace
            ).length;

            // 只替换出现多次的客户端
            if (occurrences > 1) {
              path[i] = missingClient;
              replaced = true;
              break;
            }
          }
        }

        // 如果没有找到合适的替换位置，尝试添加到路径中
        if (!replaced) {
          console.warn("无法替换客户端:", missingClient, "，尝试其他方法");

          // 最后的尝试：在路径中找一个位置，忽略多次出现的限制
          for (let i = 1; i < path.length - 1; i++) {
            if (
              missingClient !== path[i - 1] && // 不同于前一个
              (i === path.length - 2
                ? missingClient !== path[path.length - 1]
                : missingClient !== path[i + 1]) // 不同于后一个
            ) {
              path[i] = missingClient;
              break;
            }
          }
        }
      }
    }

    // 最后一步：确保所有相邻客户端不同
    for (let i = 1; i < path.length; i++) {
      if (path[i] === path[i - 1]) {
        console.warn("发现相邻相同客户端，尝试修复");

        // 找到一个不同于前后的客户端
        const validReplacement = allClients.filter(
          (client) =>
            client !== path[i - 1] &&
            (i === path.length - 1 ? true : client !== path[i + 1])
        );

        if (validReplacement.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * validReplacement.length
          );
          path[i] = validReplacement[randomIndex];
        }
      }
    }

    console.log("最终生成的路径:", path);
    console.log("起始客户端:", sourceChain);
    console.log("终止客户端:", targetChain);

    // 设置clients数组，用于执行跨链交易
    clients = [...path];

    console.log(clients);
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
        setPath();
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
              setPath();
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
              value={sourceChain.id}
              onChange={(e) => {
                const newValue = e.target.value;
                clients.forEach((client) => {
                  if (client.id === Number(newValue)) {
                    setSourceChain(client);
                    console.log("sourceChain changed to", newValue);
                  }
                });
              }}
            >
              <option value={sepolia.id}>Sepolia</option>
              <option value={arbitrumSepolia.id}>Arbitrum Sepolia</option>
              <option value={abstractTestnet.id}>abstractTestnet</option>
              <option value={zoraSepolia.id}>Zora Sepolia</option>
              <option value={optimismSepolia.id}>Optimism Sepolia</option>
            </select>
          </div>
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium mb-1">终止链</label>
            <select
              className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background"
              value={targetChain.id}
              onChange={(e) => {
                const newValue = e.target.value;
                clients.forEach((client) => {
                  if (client.id === Number(newValue)) {
                    setTargetChain(client);
                    console.log("targetChain changed to", newValue);
                  }
                });
              }}
            >
              <option value={sepolia.id}>Sepolia</option>
              <option value={arbitrumSepolia.id}>Arbitrum Sepolia</option>
              <option value={abstractTestnet.id}>abstractTestnet</option>
              <option value={zoraSepolia.id}>Zora Sepolia</option>
              <option value={optimismSepolia.id}>Optimism Sepolia</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
