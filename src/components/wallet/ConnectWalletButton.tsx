import { useState } from 'react';
import { Wallet, ChevronDown, Check, LogOut } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useNavigate } from 'react-router-dom';

const ConnectWalletButton = () => {
  const { address, isConnected, connect, disconnect } = useWallet();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    if (isConnected) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      handleConnect();
    }
  };

  const handleConnect = () => {
    if (!isConnected) {
      navigate('/login');
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setIsDropdownOpen(false);
  };

  const shortenedAddress = address 
    ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` 
    : '';

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
          isConnected
            ? 'bg-gray-800 hover:bg-gray-700 text-white'
            : 'bg-purple-600 hover:bg-purple-700 text-white'
        }`}
      >
        <Wallet size={18} />
        <span>
          {isConnected ? shortenedAddress : 'Connect Wallet'}
        </span>
        {isConnected && <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />}
      </button>

      {isConnected && isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-60 rounded-lg bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-2">
            <div className="px-4 py-2 text-sm text-gray-400">Connected Wallet</div>
            <div className="px-4 py-2 text-white font-medium flex items-center justify-between">
              {shortenedAddress}
              <Check size={16} className="text-green-500" />
            </div>
            <div className="border-t border-gray-700 my-1" />
            <button
              onClick={() => {
                navigate('/dashboard');
                setIsDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-lg"
            >
              Dashboard
            </button>
            <button
              onClick={handleDisconnect}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-lg flex items-center"
            >
              <LogOut size={16} className="mr-2" />
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWalletButton;