export const getPrivate = (privateKey: string) => {
  // 分割输入文本为多行
  const lines = privateKey.split(/\r?\n/);
  const privateKeys = [];

  // 正则表达式匹配私钥：匹配64个十六进制字符，可能带有0x前缀
  const privateKeyRegex = /(0x)?([a-fA-F0-9]{64})/;

  for (const line of lines) {
    if (!line.trim()) continue; // 跳过空行

    const match = line.match(privateKeyRegex);
    if (match) {
      // 获取匹配的私钥，如果没有0x前缀则添加
      const prefix = match[1] || "0x";
      const keyBody = match[2];
      const formattedKey = prefix + keyBody;
      privateKeys.push(formattedKey);
    }
  }

  return privateKeys;
};
