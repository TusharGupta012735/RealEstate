import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  User, 
  Heart, 
  Share2, 
  Calendar,
  AlertCircle 
} from 'lucide-react';
import { useProperties } from '../context/PropertiesContext';
import { useWallet } from '../context/WalletContext';
import { useNotifications } from '../context/NotificationsContext';
import PropertyGallery from '../components/property/PropertyGallery';

const PropertyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPropertyById, watchlist, toggleWatchlist } = useProperties();
  const { isConnected, address } = useWallet();
  const { addNotification } = useNotifications();
  
  const [property, setProperty] = useState(id ? getPropertyById(id) : undefined);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    if (id) {
      const propertyData = getPropertyById(id);
      if (!propertyData) {
        navigate('/');
      } else {
        setProperty(propertyData);
      }
    }
  }, [id, getPropertyById, navigate]);
  
  useEffect(() => {
    if (property && watchlist) {
      setIsWatchlisted(watchlist.includes(property.id));
    }
  }, [property, watchlist]);
  
  const handleWatchlistToggle = () => {
    if (!isConnected) {
      navigate('/login');
      return;
    }
    
    if (property) {
      toggleWatchlist(property.id);
      setIsWatchlisted(!isWatchlisted);
      
      if (!isWatchlisted) {
        addNotification({
          title: 'Property added to watchlist',
          message: `${property.title} has been added to your watchlist.`,
          type: 'watchlist'
        });
      }
    }
  };
  
  const handleBuyClick = () => {
    if (!isConnected) {
      navigate('/login');
      return;
    }
    
    setShowBuyModal(true);
  };
  
  const processPurchase = () => {
    setIsProcessing(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowBuyModal(false);
      
      if (property) {
        addNotification({
          title: 'Property Purchase Complete',
          message: `You have successfully purchased ${property.title} for ${property.price} ETH.`,
          type: 'transaction'
        });
      }
      
      navigate('/dashboard?tab=bought');
    }, 3000);
  };
  
  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle size={48} className="text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Property Not Found</h2>
        <p className="text-gray-400 mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to listings
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PropertyGallery images={property.images} />
          
          <div className="mt-6">
            <div className="flex flex-wrap items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-400">
                  <MapPin size={18} className="mr-1" />
                  <span>{property.location}</span>
                </div>
              </div>
              
              <div className="bg-gray-800 px-4 py-2 rounded-lg">
                <div className="text-sm text-gray-400">Price</div>
                <div className="text-2xl font-bold text-white">{property.price} ETH</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center text-gray-400 mb-1">
                  <Bed size={18} className="mr-2" />
                  Bedrooms
                </div>
                <div className="text-xl font-semibold text-white">{property.bedrooms}</div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center text-gray-400 mb-1">
                  <Bath size={18} className="mr-2" />
                  Bathrooms
                </div>
                <div className="text-xl font-semibold text-white">{property.bathrooms}</div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center text-gray-400 mb-1">
                  <Square size={18} className="mr-2" />
                  Square Feet
                </div>
                <div className="text-xl font-semibold text-white">{property.squareFeet}</div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-3">Description</h2>
              <p className="text-gray-300 leading-relaxed">{property.description}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Details</h2>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">Property ID</span>
                    <span className="text-white">{property.id}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">Listed By</span>
                    <span className="text-white">{property.seller}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">List Date</span>
                    <span className="text-white">{formatDate(property.createdAt)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">Property Type</span>
                    <span className="text-white">Residential</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">Year Built</span>
                    <span className="text-white">2023</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">Parking</span>
                    <span className="text-white">2 spaces</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl p-6 sticky top-24">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                <User size={24} className="text-gray-400" />
              </div>
              <div>
                <div className="text-white font-medium">Listed by</div>
                <div className="text-purple-400">{property.seller}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-gray-400">
                <Calendar size={18} className="mr-2" />
                Listed on {formatDate(property.createdAt)}
              </div>
            </div>
            
            <div className="mb-6">
              <button
                onClick={handleBuyClick}
                className="w-full py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors mb-3"
              >
                Buy Now • {property.price} ETH
              </button>
              
              <div className="flex gap-3">
                <button
                  onClick={handleWatchlistToggle}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-colors ${
                    isWatchlisted
                      ? 'bg-purple-900/50 text-purple-400'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Heart size={18} fill={isWatchlisted ? "#a78bfa" : "none"} />
                  {isWatchlisted ? 'Saved' : 'Save'}
                </button>
                
                <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>
            
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">Transaction Details</h3>
              <div className="flex justify-between py-2 border-b border-gray-600">
                <span className="text-gray-400">Property Price</span>
                <span className="text-white">{property.price} ETH</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-600">
                <span className="text-gray-400">Transaction Fee</span>
                <span className="text-white">0.05 ETH</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Total</span>
                <span className="text-white font-semibold">{(parseFloat(property.price) + 0.05).toFixed(2)} ETH</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Buy Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Confirm Purchase</h2>
            
            <div className="mb-6">
              <img 
                src={property.imageUrl} 
                alt={property.title} 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              <h3 className="text-lg font-semibold text-white mb-1">{property.title}</h3>
              <p className="text-gray-400 mb-4">{property.location}</p>
              
              <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <div className="flex justify-between py-2 border-b border-gray-600">
                  <span className="text-gray-400">Property Price</span>
                  <span className="text-white">{property.price} ETH</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-600">
                  <span className="text-gray-400">Transaction Fee</span>
                  <span className="text-white">0.05 ETH</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Total Amount</span>
                  <span className="text-white font-semibold">{(parseFloat(property.price) + 0.05).toFixed(2)} ETH</span>
                </div>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-4">
                <div className="flex">
                  <div className="text-blue-400 mr-3">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <p className="text-white text-sm">
                      By proceeding, you agree to purchase this property and authorize a blockchain transaction for the total amount.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowBuyModal(false)}
                disabled={isProcessing}
                className="flex-1 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              
              <button
                onClick={processPurchase}
                disabled={isProcessing}
                className={`flex-1 py-3 rounded-lg font-medium ${
                  isProcessing 
                    ? 'bg-purple-700 cursor-wait' 
                    : 'bg-purple-600 hover:bg-purple-700'
                } text-white transition-colors`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Confirm Purchase'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyDetailsPage;