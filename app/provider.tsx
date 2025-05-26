"use client";

import { WagmiProvider } from "wagmi";
import { config } from "../config";

const provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </body>
    </html>
  );
};

export default provider;
