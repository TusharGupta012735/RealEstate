import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutGrid, 
  Building, 
  Home, 
  Heart, 
  Bell, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

const Sidebar = () => {
  const location = useLocation();
  const { disconnect, address } = useWallet();
  
  const shortenedAddress = address 
    ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` 
    : '';

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutGrid size={20} />,
      path: '/dashboard'
    },
    {
      title: 'My Listings',
      icon: <Building size={20} />,
      path: '/dashboard?tab=listings'
    },
    {
      title: 'Bought Properties',
      icon: <Home size={20} />,
      path: '/dashboard?tab=bought'
    },
    {
      title: 'Watchlist',
      icon: <Heart size={20} />,
      path: '/watchlist'
    },
    {
      title: 'Notifications',
      icon: <Bell size={20} />,
      path: '/notifications'
    },
    {
      title: 'Settings',
      icon: <Settings size={20} />,
      path: '/dashboard?tab=settings'
    }
  ];

  return (
    <aside className="fixed left-0 z-40 w-64 h-screen pt-16 hidden md:block bg-gray-900 border-r border-gray-800 shadow-xl transition-transform">
      <div className="h-full px-3 py-4 flex flex-col">
        <div className="px-4 py-2 mb-6">
          <div className="flex items-center p-2 rounded-lg bg-gray-800/50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold">
              {address ? address[0].toUpperCase() : '?'}
            </div>
            <div className="ml-3">
              <div className="text-sm font-semibold">{shortenedAddress}</div>
              <div className="text-xs text-gray-400">Web3 Wallet</div>
            </div>
          </div>
        </div>
        
        <ul className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || 
                            (location.pathname + location.search === item.path);
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-purple-900/50 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        
        <div className="pt-2 mt-2 border-t border-gray-800 space-y-2">
          <Link
            to="/help"
            className="flex items-center p-2 text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
          >
            <HelpCircle size={20} className="mr-3" />
            <span>Help & Support</span>
          </Link>
          <button
            onClick={disconnect}
            className="flex w-full items-center p-2 text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            <span>Disconnect</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;