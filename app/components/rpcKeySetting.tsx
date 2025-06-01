"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RpcInputProps {
  onRpcSubmit: (rpcKey: string) => void; // 提交RPC key的回调函数
}

export default function RpcInput({ onRpcSubmit }: RpcInputProps) {
  const [rpcKey, setRpcKey] = useState(""); // RPC key输入
  const [savedRpcKey, setSavedRpcKey] = useState(""); // 已保存的RPC key

  // 提交RPC key
  const handleSubmit = () => {
    if (!rpcKey.trim()) return;

    // 保存到localStorage
    localStorage.setItem("rpcKey", rpcKey.trim());
    setSavedRpcKey(rpcKey.trim());

    // 通知父组件
    onRpcSubmit(rpcKey.trim());

    // 清空输入框
    setRpcKey("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">输入RPC API Key</h2>
        <h4 className="text-sm font-bold text-center mb-6">
          注意只支持Alchemy API Key！！！
        </h4>

        {savedRpcKey ? (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-700 text-sm">
              已保存的API Key:{" "}
              <span className="font-mono">
                {savedRpcKey.substring(0, 6)}...
                {savedRpcKey.substring(savedRpcKey.length - 4)}
              </span>
            </p>
            <div className="mt-2 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => onRpcSubmit(savedRpcKey)}
              >
                使用已保存的Key
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => {
                  localStorage.removeItem("rpcKey");
                  setSavedRpcKey("");
                }}
              >
                清除已保存的Key
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                RPC API Key
              </label>
              <Input
                value={rpcKey}
                onChange={(e) => setRpcKey(e.target.value)}
                placeholder="输入您的Alchemy或Infura API Key"
                className="w-full"
              />
            </div>

            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={!rpcKey.trim()}
            >
              提交并进入
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
