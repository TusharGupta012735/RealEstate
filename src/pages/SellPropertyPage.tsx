import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import PropertyForm from '../components/property/PropertyForm';
import { useProperties } from '../context/PropertiesContext';
import { useNotifications } from '../context/NotificationsContext';

const SellPropertyPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { addProperty } = useProperties();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const handleFormSubmit = (formData: any) => {
    setIsSubmitting(true);
    
    // Convert images to URLs for demo
    // In a real app, we would upload these to IPFS or a storage service
    const imageUrls = formData.images.map((_: File, index: number) => {
      // Use stock images from our predefined list
      const stockImages = [
        "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
        "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
        "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
      ];
      return stockImages[index % stockImages.length];
    });

    // Simulate API call delay
    setTimeout(() => {
      const newProperty = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        location: formData.location,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        squareFeet: Number(formData.squareFeet),
        imageUrl: imageUrls[0], // Use first image as main display
        images: imageUrls,
        seller: localStorage.getItem('walletAddress') || '0xUnknown',
        createdAt: Date.now()
      };
      
      const propertyId = addProperty(newProperty);
      
      addNotification({
        title: 'Property Listed',
        message: `Your property "${formData.title}" has been successfully listed for sale.`,
        type: 'system'
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Redirect after a short delay to show success message
      setTimeout(() => {
        navigate(`/property/${propertyId}`);
      }, 2000);
    }, 2000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Sell Your Property</h1>
      <p className="text-gray-400 mb-8">List your property on the blockchain and reach buyers worldwide.</p>
      
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-green-500 mb-4">
            <CheckCircle size={80} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Property Listed Successfully!</h2>
          <p className="text-gray-300 mb-8 max-w-md">
            Your property has been tokenized and is now available on the marketplace. Redirecting you to view your listing...
          </p>
          <div className="w-16 h-1 bg-gray-800 relative overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-purple-600 animate-progress rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl p-6">
          <PropertyForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        </div>
      )}
    </div>
  );
};

export default SellPropertyPage;