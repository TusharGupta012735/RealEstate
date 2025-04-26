import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building, Globe, Shield } from 'lucide-react';
import PropertyFilters from '../components/property/PropertyFilters';
import PropertyList from '../components/property/PropertyList';
import { useProperties } from '../context/PropertiesContext';
import { PropertyFilterOptions } from '../types/property';

const HomePage = () => {
  const { filteredProperties, loading, applyFilters, toggleWatchlist } = useProperties();
  const [showHero, setShowHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowHero(false);
      } else {
        setShowHero(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFilterChange = (filters: PropertyFilterOptions) => {
    applyFilters(filters);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className={`transition-all duration-500 ${showHero ? 'max-h-[500px] opacity-100 mb-12' : 'max-h-0 opacity-0 overflow-hidden mb-0'}`}>
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <img 
            src="https://images.pexels.com/photos/2287310/pexels-photo-2287310.jpeg?auto=compress&cs=tinysrgb&w=1920" 
            alt="Luxury property" 
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40 flex flex-col justify-center p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-xl">
              Discover Your Dream Property in the Web3 World
            </h1>
            <p className="text-lg text-gray-200 mb-6 max-w-xl">
              Buy, sell, and manage properties with the security and transparency of blockchain technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/properties"
                className="px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors inline-flex items-center"
              >
                Explore Properties
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/sell"
                className="px-6 py-3 rounded-lg bg-transparent border border-white text-white font-medium hover:bg-white/10 transition-colors"
              >
                List Your Property
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 transition-all hover:transform hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-purple-900/30 text-purple-400 p-3 rounded-lg inline-block mb-4">
              <Building size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Tokenized Properties</h3>
            <p className="text-gray-300">
              Each property is represented as a unique token on the blockchain, ensuring verifiable ownership and history.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 transition-all hover:transform hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-blue-900/30 text-blue-400 p-3 rounded-lg inline-block mb-4">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Global Marketplace</h3>
            <p className="text-gray-300">
              Connect with buyers and sellers worldwide without intermediaries, enabling seamless international transactions.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 transition-all hover:transform hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-green-900/30 text-green-400 p-3 rounded-lg inline-block mb-4">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Secure Transactions</h3>
            <p className="text-gray-300">
              Smart contracts ensure transparent, secure transactions with escrow functionality and automated verification.
            </p>
          </div>
        </div>
      </div>

      {/* Listings Section */}
      <PropertyFilters onFilterChange={handleFilterChange} />
      <PropertyList 
        properties={filteredProperties} 
        onToggleWatchlist={toggleWatchlist}
        loading={loading}
      />
    </div>
  );
};

export default HomePage;