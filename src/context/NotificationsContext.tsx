import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  type: 'info' | 'transaction' | 'watchlist' | 'system';
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};

interface NotificationsProviderProps {
  children: ReactNode;
}

export const NotificationsProvider = ({ children }: NotificationsProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  useEffect(() => {
    // Load mock notifications for demo
    setNotifications([
      {
        id: '1',
        title: 'Welcome to BlockEstate',
        message: 'Thank you for joining our platform. Start exploring properties in the Web3 space!',
        timestamp: Date.now() - 3600000, // 1 hour ago
        read: false,
        type: 'system'
      },
      {
        id: '2',
        title: 'New property in your watchlist',
        message: 'A new property matching your criteria has been listed in San Francisco.',
        timestamp: Date.now() - 86400000, // 1 day ago
        read: false,
        type: 'watchlist'
      },
      {
        id: '3',
        title: 'Transaction completed',
        message: 'Your purchase of the Beach House property was successfully processed.',
        timestamp: Date.now() - 172800000, // 2 days ago
        read: true,
        type: 'transaction'
      }
    ]);
  }, []);

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: Date.now(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};