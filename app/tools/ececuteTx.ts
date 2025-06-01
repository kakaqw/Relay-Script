import { relayClient } from "./relay-client";
import { Quote } from "./interface";
import { parseEther } from "viem";
// import { getEthPrice } from "../getEthPrice";

export const executeTx = async ({
  user,
  wallet,
  chainId,
  toChainId,
  amount,
  currency,
  toCurrency,
  tradeType,
}: Quote) => {
  // 随机保留0.0012-0.0016
  const reserveMin = parseEther("0.0012");
  const reserveMax = parseEther("0.0016");
  const randomReserve =
    reserveMin +
    BigInt(Math.floor(Math.random() * Number(reserveMax - reserveMin)));

  //获取报价
  const a: any = await relayClient()?.actions.getQuote(
    {
      user: user, //用户地址
      wallet: wallet, //客户端
      chainId: chainId, //源链id
      toChainId: toChainId, //目标链id
      amount: amount, //跨链数量
      currency: currency, //跨链token
      toCurrency: toCurrency, //目标token
      tradeType: tradeType, //交易类型
    },
    true
  );

  // console.log("quote", a);
  // console.log("gas费用", formatEther(a.fees.gas.amount));

  const gasAmount = BigInt(a.fees.gas.amount);
  const safetyBuffer = gasAmount * BigInt(2);
  const availableAmount = BigInt(amount) - safetyBuffer;

  // console.log("总余额:", formatEther(BigInt(amount)));
  // console.log("预留gas费用(包含10%安全裕量):", formatEther(safetyBuffer));
  // console.log("实际可跨链金额:", formatEther(availableAmount));

  if (availableAmount <= BigInt(0)) {
    console.error("余额不足以支付gas费用");
    return toChainId;
  }

  let b: any;
  if (chainId === 42161 || chainId === 10 || chainId == 8453) {
    b = await relayClient()?.actions.getQuote(
      {
        user: user, //用户地址
        wallet: wallet, //客户端
        chainId: chainId, //源链id
        toChainId: toChainId, //目标链id
        amount: (availableAmount - randomReserve).toString(), //跨链数量
        currency: currency, //跨链token
        toCurrency: toCurrency, //目标token
        tradeType: tradeType, //交易类型
      },
      true
    );
    console.log("留存", randomReserve);
  } else {
    b = await relayClient()?.actions.getQuote(
      {
        user: user, //用户地址
        wallet: wallet, //客户端
        chainId: chainId, //源链id
        toChainId: toChainId, //目标链id
        amount: availableAmount.toString(), //跨链数量
        currency: currency, //跨链token
        toCurrency: toCurrency, //目标token
        tradeType: tradeType, //交易类型
      },
      true
    );
  }

  console.log("quote", a);
  //获取eth价格
  // const price = await getEthPrice();

  //计算磨损
  let inputAmount;
  let outputAmount;

  // if (loss < 0.05) {
  //执行交易
  await relayClient()?.actions.execute({
    quote: b, //报价
    wallet: wallet, //客户端
    onProgress: async ({
      steps,
      fees,
      breakdown,
      currentStep,
      currentStepItem,
      txHashes,
      details,
    }) => {
      inputAmount = Number(details?.currencyIn?.amountFormatted);
      outputAmount = Number(details?.currencyOut?.amountFormatted);
    },
  });
  console.log(user, toChainId, "交易成功");
  return (inputAmount || 0) - (outputAmount || 0);
};
