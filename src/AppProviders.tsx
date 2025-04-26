import { ReactNode } from "react";
import { WalletProvider } from "./context/WalletContext";
import { Providers } from "./providers"; // this is where OnchainKitProvider is
import { BrowserRouter } from "react-router-dom";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <BrowserRouter>
      <Providers>
        <WalletProvider>{children}</WalletProvider>
      </Providers>
    </BrowserRouter>
  );
};
