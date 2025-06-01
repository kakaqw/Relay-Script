"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { getPrivate } from "./tools/getPrivate";
import { privateKeyToAccount } from "viem/accounts";
import { formatEther } from "viem";
import {
  arbitrum,
  optimism,
  abstract,
  zora,
  base,
  blast,
  ink,
  linea,
  scroll,
  unichain,
  zksync,
} from "viem/chains";

import {
  optimismClient,
  abstractClient,
  zoraClient,
  arbClient,
  baseClient,
  blastClient,
  inkClient,
  lineaClient,
  scrollClient,
  unichainClient,
  zksyncClient,
} from "./Clients";

import { type Account } from "viem/accounts";
import { Quote } from "./tools/interface";
import { executeTx } from "./tools/ececuteTx";
import RpcInput from "./components/rpcKeySetting"; // 引入简化的RPC输入组件
import { setKey } from "./tools/viem-client";

export let accounts: Account[] = [];
export let clients: any[] = [];
const allClients = [
  optimismClient,
  abstractClient,
  zoraClient,
  arbClient,
  baseClient,
  blastClient,
  inkClient,
  lineaClient,
  scrollClient,
  unichainClient,
  zksyncClient,
];

export default function Home() {
  const [Text, setText] = useState("");
  const [sourceChain, setSourceChain] = useState(arbClient);
  const [targetChain, setTargetChain] = useState(optimismClient);
  const [rpcKey, setRpcKey] = useState(""); // 保存RPC API Key
  const [showMainUI, setShowMainUI] = useState(false); // 控制是否显示主界面

  let path: any[];

  // 监听输入框
  useEffect(() => {}, [Text]);

  // 设置随机路径
  const setPath = async () => {
    const randomNum = Math.floor(Math.random() * 4) + 3;

    //随机创建一个固定长度的数组
    path = new Array(randomNum);
    //设置启始链和中止链
    path[0] = sourceChain;
    path[path.length - 1] = targetChain;

    // 所有可用的客户端
    const allClients = [
      optimismClient,
      abstractClient,
      zoraClient,
      arbClient,
      baseClient,
      blastClient,
      inkClient,
      lineaClient,
      scrollClient,
      unichainClient,
      zksyncClient,
    ];
    if (randomNum > 2) {
      // 填充中间位置，确保中间元素相互不同
      for (let i = 1; i < path.length - 1; i++) {
        // 选择与前一个客户端不同，且与中间已选择客户端不同的随机客户端
        let validClients = allClients.filter(
          (client) =>
            client !== path[i - 1] && // 不同于前一个
            (i === path.length - 2 ? client !== path[path.length - 1] : true) // 如果是倒数第二个位置，确保不同于终点
        );

        // 排除已在中间位置使用过的客户端（不包括首尾）
        for (let j = 1; j < i; j++) {
          validClients = validClients.filter((client) => client !== path[j]);
        }

        // 如果没有有效的客户端选择（可能是因为路径太长），则放宽条件，只确保与相邻元素不同
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
      }

      // 最后检查一遍确保所有相邻客户端不同（检查中间部分）
      for (let i = 1; i < path.length - 1; i++) {
        if (path[i] === path[i - 1] || path[i] === path[i + 1]) {
          console.warn(`发现相邻相同客户端在位置 ${i}，尝试修复`);

          // 查找可用的替换客户端：不同于前后相邻客户端，且不在中间位置使用过
          let validReplacement = allClients.filter(
            (client) => client !== path[i - 1] && client !== path[i + 1]
          );

          // 排除已在中间位置使用过的客户端
          for (let j = 1; j < path.length - 1; j++) {
            if (j !== i) {
              // 不排除当前位置
              validReplacement = validReplacement.filter(
                (client) => client !== path[j]
              );
            }
          }

          // 如果没有有效的替换选项，则放宽条件，只确保与相邻元素不同
          if (validReplacement.length === 0) {
            validReplacement = allClients.filter(
              (client) => client !== path[i - 1] && client !== path[i + 1]
            );
          }

          if (validReplacement.length > 0) {
            const randomIndex = Math.floor(
              Math.random() * validReplacement.length
            );
            path[i] = validReplacement[randomIndex];
          }
        }
      }
    }
    // 设置clients数组，用于执行跨链交易
    clients = [...path];

    console.log("交易路径", clients);
  };

  //获取报价
  const getQuote = async () => {
    try {
      // 清空账户
      accounts = [];
      setKey(rpcKey);
      //获取私钥
      const privateKeys = getPrivate(Text);
      privateKeys.forEach((privateKey) => {
        const account = privateKeyToAccount(privateKey as `0x${string}`);

        accounts.push(account);
      });

      let finish: any = [];
      for (const account of accounts) {
        setPath();
        let lossTotal = 0;
        for (const [index, { publicClient, client, id }] of clients.entries()) {
          const balance = await publicClient.getBalance({
            address: account.address,
          });
          console.log("balance", formatEther(balance));

          if (clients[index + 1] == null) {
            console.log("地址完成了一轮交互");
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
          const loss = await executeTx(tx);
          lossTotal += Number(loss);

          //随机3～15分钟延
          const randomDelay = Math.floor(Math.random() * 1000 * 60 * 10) + 3000;
          console.log("延迟", randomDelay / 1000 / 60, "分钟");

          await new Promise((resolve) => setTimeout(resolve, randomDelay));
          console.log("此次磨损", loss, "eth");
        }

        console.log("完成交互", account.address);
        console.log("总磨损", lossTotal, "eth");
        finish.push(account.address);
      }
      console.log("完成交互", finish);
    } catch (error) {
      console.error("error", error);
    }
  };

  // 处理RPC Key提交
  const handleRpcSubmit = (apiKey: string) => {
    setRpcKey(apiKey);
    setShowMainUI(true); // 提交后显示主界面
    console.log("已设置RPC API Key:", apiKey);
  };

  // 如果没有设置RPC Key，显示RPC输入组件
  if (!showMainUI) {
    return <RpcInput onRpcSubmit={handleRpcSubmit} />;
  }

  return (
    <div className="min-h-screen bg-background p-6 w-100vw ">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">Auto Relay</h1>
        <h4 className="text-sm font-bold text-center mb-8">
          需要查看交易日志的按F12，在控制台查看
        </h4>
        <h4 className="text-sm font-bold text-center mb-8">
          启始链和终止链可以相同
        </h4>
        <div className="flex justify-center items-center">
          {/* 输入框 */}
          <div className="space-y-2">
            <Textarea
              id="left-textarea"
              placeholder="请在此输入私钥，每输入一个私钥要进行换行..."
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
        <div className="flex justify-center space-x-4 mt-4">
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium mb-1">启始链</label>
            <select
              className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background"
              value={sourceChain.id}
              onChange={(e) => {
                const newValue = e.target.value;

                const selectedClient = allClients.find(
                  (client) => client.id === Number(newValue)
                );
                if (selectedClient) {
                  setSourceChain(selectedClient as any);
                  console.log("sourceChain changed to", newValue);
                }
              }}
            >
              <option value={arbitrum.id}>Arbitrum</option>
              <option value={optimism.id}>Optimism</option>
              <option value={base.id}>Base</option>
              <option value={abstract.id}>abstract</option>
              <option value={zora.id}>Zora</option>
              <option value={blast.id}>Blast</option>
              <option value={ink.id}>Ink</option>
              <option value={linea.id}>Linea</option>
              <option value={scroll.id}>Scroll</option>
              <option value={unichain.id}>Unichain</option>
              <option value={zksync.id}>Zksync</option>
            </select>
          </div>
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium mb-1">终止链</label>
            <select
              className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background"
              value={targetChain.id}
              onChange={(e) => {
                const newValue = e.target.value;

                const selectedClient = allClients.find(
                  (client) => client.id === Number(newValue)
                );
                if (selectedClient) {
                  setTargetChain(selectedClient as any);
                  console.log("targetChain changed to", newValue);
                }
              }}
            >
              <option value={arbitrum.id}>Arbitrum</option>
              <option value={optimism.id}>Optimism</option>
              <option value={base.id}>Base</option>
              <option value={abstract.id}>abstract</option>
              <option value={zora.id}>Zora</option>
              <option value={blast.id}>Blast</option>
              <option value={ink.id}>Ink</option>
              <option value={linea.id}>Linea</option>
              <option value={scroll.id}>Scroll</option>
              <option value={unichain.id}>Unichain</option>
              <option value={zksync.id}>Zksync</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
