import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownFundLink,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";

import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";

import { color } from "@coinbase/onchainkit/theme";

import { useAccount, useSignMessage } from "wagmi";
import { createSiweMessage } from "viem/siwe";
import { base } from "wagmi/chains";

export default function WalletComponents() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleConnect = async () => {
    if (!address) return;

    const message = createSiweMessage({
      address,
      chainId: base.id,
      domain: window.location.host,
      nonce: "your_nonce_here", // replace with backend-generated nonce
      uri: window.location.origin,
      version: "1",
    });

    try {
      const signature = await signMessageAsync({ message });
      console.log("SIWE signature:", signature);

      // 👉 You can send `message` + `signature` to backend here for session auth
    } catch (err) {
      console.error("SIWE signing failed:", err);
    }
  };

  return (
    <div className="flex justify-end">
      <Wallet>
        <ConnectWallet onConnect={handleConnect}>
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
            <Avatar />
            <Name />
            <Address className={color.foregroundMuted} />
          </Identity>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </div>
  );
}