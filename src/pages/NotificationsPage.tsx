import { useState } from 'react';
import { Check, Bell, AlertTriangle, CreditCard, Heart, RefreshCw, Trash2 } from 'lucide-react';
import { useNotifications } from '../context/NotificationsContext';

const NotificationsPage = () => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    clearNotifications 
  } = useNotifications();
  
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  
  const getIconForType = (type: string) => {
    switch (type) {
      case 'transaction':
        return <CreditCard size={20} className="text-blue-400" />;
      case 'watchlist':
        return <Heart size={20} className="text-red-400" />;
      case 'system':
        return <Bell size={20} className="text-purple-400" />;
      default:
        return <AlertTriangle size={20} className="text-yellow-400" />;
    }
  };
  
  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    
    return Math.floor(seconds) + " seconds ago";
  };
  
  const filteredNotifications = selectedFilter 
    ? notifications.filter(notif => notif.type === selectedFilter)
    : notifications;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Notifications</h1>
        
        <div className="flex gap-3">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              unreadCount === 0
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Check size={18} />
            <span className="hidden sm:inline">Mark all as read</span>
          </button>
          
          <button
            onClick={clearNotifications}
            disabled={notifications.length === 0}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              notifications.length === 0
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Trash2 size={18} />
            <span className="hidden sm:inline">Clear all</span>
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedFilter(null)}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
            selectedFilter === null
              ? 'bg-purple-900/50 text-purple-400'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedFilter('transaction')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center whitespace-nowrap ${
            selectedFilter === 'transaction'
              ? 'bg-blue-900/50 text-blue-400'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <CreditCard size={16} className="mr-2" />
          Transactions
        </button>
        <button
          onClick={() => setSelectedFilter('watchlist')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center whitespace-nowrap ${
            selectedFilter === 'watchlist'
              ? 'bg-red-900/50 text-red-400'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <Heart size={16} className="mr-2" />
          Watchlist
        </button>
        <button
          onClick={() => setSelectedFilter('system')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center whitespace-nowrap ${
            selectedFilter === 'system'
              ? 'bg-purple-900/50 text-purple-400'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <Bell size={16} className="mr-2" />
          System
        </button>
      </div>
      
      {/* Notifications List */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-gray-400">
            <RefreshCw size={48} className="mb-4 opacity-40" />
            <p>No notifications to display</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div 
              key={notification.id} 
              onClick={() => !notification.read && markAsRead(notification.id)}
              className={`p-4 border-b border-gray-700 last:border-0 transition-colors ${
                notification.read 
                  ? 'bg-gray-800' 
                  : 'bg-gray-800/70 hover:bg-gray-700/80 cursor-pointer'
              }`}
            >
              <div className="flex">
                <div className={`p-2.5 rounded-lg mr-4 ${
                  notification.type === 'transaction' ? 'bg-blue-900/30' :
                  notification.type === 'watchlist' ? 'bg-red-900/30' :
                  'bg-purple-900/30'
                }`}>
                  {getIconForType(notification.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-white">{notification.title}</h3>
                    <span className="text-xs text-gray-500 ml-4">
                      {getTimeAgo(notification.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-300 mt-1">{notification.message}</p>
                </div>
                
                {!notification.read && (
                  <div className="ml-4 mt-1 w-2 h-2 rounded-full bg-purple-500 flex-shrink-0"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;