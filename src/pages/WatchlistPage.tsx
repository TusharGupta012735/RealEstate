import { useState, useEffect } from 'react';
import { Heart, AlertTriangle } from 'lucide-react';
import { useProperties } from '../context/PropertiesContext';
import PropertyList from '../components/property/PropertyList';
import { Property } from '../types/property';

const WatchlistPage = () => {
  const { properties, watchlist, toggleWatchlist } = useProperties();
  const [watchlistedProperties, setWatchlistedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Filter properties in watchlist
    if (properties.length > 0 && watchlist.length > 0) {
      const filtered = properties.filter(property => 
        watchlist.includes(property.id)
      ).map(property => ({
        ...property,
        isWatchlisted: true
      }));
      setWatchlistedProperties(filtered);
    } else {
      setWatchlistedProperties([]);
    }
    
    setLoading(false);
  }, [properties, watchlist]);

  return (
    <div>
      <div className="flex items-center mb-6">
        <Heart size={24} className="text-red-400 mr-3" />
        <h1 className="text-3xl font-bold text-white">Your Watchlist</h1>
      </div>
      
      {watchlist.length === 0 && !loading ? (
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <AlertTriangle size={48} className="text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Your watchlist is empty</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Save properties you're interested in to keep track of them and receive updates when their status changes.
          </p>
          <a
            href="/"
            className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors inline-block"
          >
            Explore Properties
          </a>
        </div>
      ) : (
        <PropertyList 
          properties={watchlistedProperties} 
          onToggleWatchlist={toggleWatchlist}
          loading={loading}
          emptyMessage="Your watchlist is empty"
        />
      )}
    </div>
  );
};

export default WatchlistPage;