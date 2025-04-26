import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Clipboard, Package, Settings, Zap } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { useProperties } from '../context/PropertiesContext';
import PropertyList from '../components/property/PropertyList';
import { Property } from '../types/property';

type TabType = 'overview' | 'listings' | 'bought' | 'settings';

const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as TabType | null;
  const [activeTab, setActiveTab] = useState<TabType>(tabParam || 'overview');
  
  const { address } = useWallet();
  const { properties, toggleWatchlist } = useProperties();
  const [userListings, setUserListings] = useState<Property[]>([]);
  const [boughtProperties, setBoughtProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (tabParam && ['overview', 'listings', 'bought', 'settings'].includes(tabParam)) {
      setActiveTab(tabParam as TabType);
    }
  }, [tabParam]);

  useEffect(() => {
    // Filter user's listings and bought properties
    // For demo purposes, we'll just use random subsets of the properties
    const mockUserListings = properties.filter((_, index) => index % 3 === 0);
    const mockBoughtProperties = properties.filter((_, index) => index % 4 === 1);
    
    setUserListings(mockUserListings);
    setBoughtProperties(mockBoughtProperties);
  }, [properties]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Zap size={20} /> },
    { id: 'listings', label: 'My Listings', icon: <Clipboard size={20} /> },
    { id: 'bought', label: 'Bought Properties', icon: <Package size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Properties Owned</h3>
                  <div className="bg-purple-900/30 text-purple-400 p-2 rounded-lg">
                    <Package size={20} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">{boughtProperties.length}</p>
                <p className="text-gray-400 mt-1">Total value: {boughtProperties.reduce((sum, prop) => sum + parseFloat(prop.price), 0).toFixed(2)} ETH</p>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Active Listings</h3>
                  <div className="bg-blue-900/30 text-blue-400 p-2 rounded-lg">
                    <Clipboard size={20} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">{userListings.length}</p>
                <p className="text-gray-400 mt-1">Total value: {userListings.reduce((sum, prop) => sum + parseFloat(prop.price), 0).toFixed(2)} ETH</p>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Wallet Balance</h3>
                  <div className="bg-green-900/30 text-green-400 p-2 rounded-lg">
                    <Zap size={20} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">172.54 ETH</p>
                <p className="text-gray-400 mt-1">≈ $301,945.00 USD</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="bg-gray-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <p>Your offer for <span className="text-white">Modern Downtown Penthouse</span> was accepted</p>
                    <span className="ml-auto text-sm text-gray-500">2 days ago</span>
                  </div>
                </div>
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <p>New offer received for <span className="text-white">Hillside Smart Home</span></p>
                    <span className="ml-auto text-sm text-gray-500">5 days ago</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                    <p>You listed <span className="text-white">Beachfront Bungalow</span> for sale</p>
                    <span className="ml-auto text-sm text-gray-500">1 week ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'listings':
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">My Listings</h2>
            <PropertyList 
              properties={userListings} 
              onToggleWatchlist={toggleWatchlist}
              emptyMessage="You don't have any property listings yet"
            />
          </div>
        );
      
      case 'bought':
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Bought Properties</h2>
            <PropertyList 
              properties={boughtProperties} 
              onToggleWatchlist={toggleWatchlist} 
              emptyMessage="You haven't bought any properties yet"
            />
          </div>
        );
      
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Wallet Information</h3>
                <div className="flex items-center p-4 bg-gray-900 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
                    {address ? address[0].toUpperCase() : '?'}
                  </div>
                  <div className="ml-4">
                    <p className="text-white font-medium">{address}</p>
                    <p className="text-gray-400 text-sm">Connected Wallet</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Notification Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="email-notif" className="text-gray-300">Email Notifications</label>
                    <input type="checkbox" id="email-notif" className="toggle" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="listing-notif" className="text-gray-300">New Listing Alerts</label>
                    <input type="checkbox" id="listing-notif" className="toggle" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="offer-notif" className="text-gray-300">Offer Updates</label>
                    <input type="checkbox" id="offer-notif" className="toggle" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Privacy Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="public-profile" className="text-gray-300">Public Profile</label>
                    <input type="checkbox" id="public-profile" className="toggle" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="show-listings" className="text-gray-300">Show My Listings</label>
                    <input type="checkbox" id="show-listings" className="toggle" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
      
      <div className="flex border-b border-gray-800 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as TabType)}
            className={`flex items-center px-4 py-2 border-b-2 whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-purple-500 text-purple-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      
      {renderTabContent()}
    </div>
  );
};

export default DashboardPage;