import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Bell, Heart, User, Menu, X } from 'lucide-react';

// import { useWallet } from '../../context/WalletContext';
import { Wallet } from "@coinbase/onchainkit/wallet";

import { useNotifications } from '../../context/NotificationsContext';
// import WalletComponents from "../wallet/ConnectWalletButton";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // const { address, isConnected } = useWallet();
  const { unreadCount } = useNotifications();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Sell', path: '/sell', icon: <Search size={20} /> },
    { name: 'Notifications', path: '/notifications', icon: (
      <div className="relative">
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </div>
    )},
    { name: 'Watchlist', path: '/watchlist', icon: <Heart size={20} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <User size={20} /> },
  ];

  const renderNavLinks = () => {
    return navLinks.map((link) => (
      <Link
        key={link.path}
        to={link.path}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          location.pathname === link.path
            ? 'bg-purple-900/50 text-white'
            : 'text-gray-300 hover:bg-purple-900/30 hover:text-white'
        }`}
        onClick={closeMenu}
      >
        {link.icon}
        <span className="hidden md:block">{link.name}</span>
      </Link>
    ));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || menuOpen
          ? "bg-gray-900/95 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-1.5">
              <Home className="text-white" size={22} />
            </div>
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
              BlockEstate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {renderNavLinks()}
          </nav>

          {/* Wallet Button */}
          <div className="hidden md:block">
            <Wallet />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-lg">
          <div className="px-4 py-2 space-y-2">
            {renderNavLinks()}
            <div className="pt-2">
              <Wallet />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;