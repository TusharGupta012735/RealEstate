import { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { Property } from '../../types/property';
import { useWallet } from '../../context/WalletContext';

interface PropertyListProps {
  properties: Property[];
  onToggleWatchlist?: (id: string) => void;
  emptyMessage?: string;
  loading?: boolean;
}

const PropertyList = ({ 
  properties, 
  onToggleWatchlist, 
  emptyMessage = "No properties found matching your criteria", 
  loading = false 
}: PropertyListProps) => {
  const { isConnected } = useWallet();
  const [animatedProperties, setAnimatedProperties] = useState<Property[]>([]);

  useEffect(() => {
    // Stagger the animation of property cards
    if (properties.length > 0 && !loading) {
      setAnimatedProperties([]);
      const timer = setTimeout(() => {
        let count = 0;
        const interval = setInterval(() => {
          setAnimatedProperties(prev => {
            if (count >= properties.length) {
              clearInterval(interval);
              return properties;
            }
            return [...prev, properties[count++]];
          });
        }, 50);
        
        return () => clearInterval(interval);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [properties, loading]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="rounded-xl overflow-hidden bg-gray-800 shadow-lg">
              <div className="h-48 bg-gray-700" />
              <div className="p-4">
                <div className="h-5 bg-gray-700 rounded mb-2" />
                <div className="h-4 bg-gray-700 rounded mb-3 w-3/4" />
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-700 rounded w-1/4" />
                  <div className="h-4 bg-gray-700 rounded w-1/4" />
                  <div className="h-4 bg-gray-700 rounded w-1/4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-gray-400 text-lg mb-2">{emptyMessage}</div>
        {!isConnected && (
          <p className="text-gray-500 text-center">
            Connect your wallet to see personalized recommendations
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {animatedProperties.map((property, index) => (
        <div
          key={property.id}
          className="opacity-0 animate-fadeIn"
          style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
        >
          <PropertyCard 
            property={property} 
            onToggleWatchlist={onToggleWatchlist} 
          />
        </div>
      ))}
    </div>
  );
};

export default PropertyList;