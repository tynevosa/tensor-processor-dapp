"use client";

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  rainbowWallet,
} from "@thirdweb-dev/react";



export const Provider = ({ children }: { children: React.ReactNode }) => {

  return (
    <ThirdwebProvider
      supportedWallets={[
        metamaskWallet({
          recommended: true,
        }),
        rainbowWallet(),
        coinbaseWallet(),
        walletConnect(),
      ]}
      clientId={process.env.THIRDWEB_CLIENT_ID}
      authConfig={{
        domain: "",
        authUrl: '/api/auth',
      }}
    >
      {children}
    </ThirdwebProvider>
  );
};
