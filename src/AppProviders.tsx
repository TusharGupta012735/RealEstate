import { ReactNode } from "react";
import { WalletProvider } from "./context/WalletContext";
import { Providers } from "./providers"; // This can still include other necessary providers like Wagmi
import { BrowserRouter } from "react-router-dom";

// Import OnchainKit and Wagmi components
import { WagmiProvider, createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
import { OnchainKitProvider } from "@coinbase/onchainkit";

interface AppProvidersProps {
  children: ReactNode;
}

// Create the wagmi config
const wagmiConfig = createConfig({
  chains: [baseSepolia], // Specify the chains you want to support
  connectors: [
    coinbaseWallet({
      appName: "RealEstate", // Custom app name
    }),
  ],
  ssr: true,
  transports: {
    [baseSepolia.id]: http(),
  },
});

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <BrowserRouter>
      <WagmiProvider config={wagmiConfig}>
        {/* Wrap everything inside OnchainKitProvider to enable wallet and identity components */}
        <OnchainKitProvider chain={baseSepolia}>
          <Providers>
            <WalletProvider>{children}</WalletProvider>
          </Providers>
        </OnchainKitProvider>
      </WagmiProvider>
    </BrowserRouter>
  );
};
