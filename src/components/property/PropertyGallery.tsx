import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
}

const PropertyGallery = ({ images }: PropertyGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxOpen(false);
  };

  return (
    <div>
      {/* Main Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
        <div 
          className="h-72 sm:h-80 md:h-96 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => openLightbox(0)}
        >
          <img 
            src={images[0]} 
            alt="Main property view" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {images.slice(1, 5).map((image, index) => (
            <div 
              key={index + 1} 
              className="relative h-36 md:h-[188px] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openLightbox(index + 1)}
            >
              <img 
                src={image} 
                alt={`Property view ${index + 1}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              {index === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">+{images.length - 5} more</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={closeLightbox}>
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button 
              className="absolute top-4 right-4 text-white z-10 bg-black/50 p-2 rounded-full hover:bg-white/20 transition-colors"
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>
            
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-white/20 transition-colors"
              onClick={prevSlide}
            >
              <ChevronLeft size={24} />
            </button>

            <img 
              src={images[currentIndex]} 
              alt={`Property view ${currentIndex}`} 
              className="max-h-[80vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-white/20 transition-colors"
              onClick={nextSlide}
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center">
              <div className="flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? 'bg-white w-3' : 'bg-white/50'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;