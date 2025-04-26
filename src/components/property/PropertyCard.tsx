import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { Property } from '../../types/property';

interface PropertyCardProps {
  property: Property;
  onToggleWatchlist?: (id: string) => void;
}

const PropertyCard = ({ property, onToggleWatchlist }: PropertyCardProps) => {
  const { 
    id, 
    title, 
    price, 
    location, 
    bedrooms, 
    bathrooms, 
    squareFeet, 
    imageUrl, 
    isWatchlisted = false 
  } = property;
  
  const [isHovered, setIsHovered] = useState(false);
  const [isWatched, setIsWatched] = useState(isWatchlisted);
  const navigate = useNavigate();
  const { isConnected } = useWallet();

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isConnected) {
      navigate('/login');
      return;
    }
    
    setIsWatched(!isWatched);
    if (onToggleWatchlist) {
      onToggleWatchlist(id);
    }
  };

  const handleCardClick = () => {
    navigate(`/property/${id}`);
  };

  return (
    <div 
      className="rounded-xl overflow-hidden bg-gray-800 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 object-cover transition-transform duration-500 ease-in-out"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <button 
          onClick={handleWatchlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
            isWatched 
              ? 'bg-purple-500 text-white' 
              : 'bg-black/30 text-white hover:bg-black/50'
          }`}
        >
          <Heart size={18} fill={isWatched ? "#ffffff" : "none"} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="text-xl font-bold text-white">{price} ETH</div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{title}</h3>
        <div className="flex items-center text-gray-400 mb-3">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-300">
          <div className="flex items-center">
            <Bed size={16} className="mr-1" />
            <span>{bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath size={16} className="mr-1" />
            <span>{bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <Square size={16} className="mr-1" />
            <span>{squareFeet} sq ft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;