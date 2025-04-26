import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, ArrowRight, ShieldCheck, Fingerprint } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

const LoginPage = () => {
  const { isConnected, isConnecting, connect } = useWallet();
  const navigate = useNavigate();
  const [connectError, setConnectError] = useState<string | null>(null);
  
  useEffect(() => {
    if (isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  const handleConnect = async () => {
    try {
      setConnectError(null);
      await connect();
    } catch (error) {
      setConnectError('Failed to connect wallet. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-1.5">
                <Wallet className="text-white" size={22} />
              </div>
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
                BlockEstate
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to the Future of Real Estate</h1>
            <p className="text-gray-400">Connect your wallet to buy, sell, and manage properties on the blockchain.</p>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <div className="bg-gray-800 p-2 rounded-lg mr-4">
                <Fingerprint size={20} className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Secure Identity</h3>
                <p className="text-gray-400 text-sm">Your wallet is your identity, no usernames or passwords needed.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-gray-800 p-2 rounded-lg mr-4">
                <ShieldCheck size={20} className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Complete Control</h3>
                <p className="text-gray-400 text-sm">Own your data and assets with full cryptographic security.</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all ${
              isConnecting 
                ? 'bg-purple-700 cursor-wait'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isConnecting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Connecting...
              </>
            ) : (
              <>
                <Wallet size={20} />
                Connect Your Wallet
              </>
            )}
          </button>
          
          {connectError && (
            <p className="text-red-500 text-sm mt-2 text-center">{connectError}</p>
          )}
          
          <p className="text-gray-500 text-sm mt-4 text-center">
            By connecting, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
        
        <div className="hidden md:block relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/40 rounded-xl backdrop-blur-sm"></div>
          <img 
            src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Luxury real estate" 
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <img 
                  src="https://cryptologos.cc/logos/ethereum-eth-logo.png" 
                  alt="ETH" 
                  className="w-6 h-6"
                />
              </div>
              <div className="text-white">
                <p className="text-sm opacity-80">Available for</p>
                <p className="font-semibold">32.4 ETH</p>
              </div>
              <ArrowRight size={20} className="text-purple-400 ml-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;