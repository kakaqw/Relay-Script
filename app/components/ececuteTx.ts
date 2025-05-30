import { relayClient } from "./relay-client";
import { Quote } from "./interface";

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
  console.log("quote成功获取报价", a);

  //执行交易
  relayClient()?.actions.execute({
    quote: a, //报价
    wallet: wallet, //客户端
    onProgress: ({
      steps,
      fees,
      breakdown,
      currentStep,
      currentStepItem,
      txHashes,
      details,
    }) => {
      //custom handling
      console.log(
        steps,
        fees,
        breakdown,
        currentStep,
        currentStepItem,
        txHashes,
        details
      );
    },
  });

  return toChainId;
};
