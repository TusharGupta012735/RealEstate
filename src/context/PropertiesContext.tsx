import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property, PropertyFilterOptions } from '../types/property';

interface PropertiesContextType {
  properties: Property[];
  filteredProperties: Property[];
  watchlist: string[];
  loading: boolean;
  getPropertyById: (id: string) => Property | undefined;
  toggleWatchlist: (propertyId: string) => void;
  applyFilters: (filters: PropertyFilterOptions) => void;
  addProperty: (property: Omit<Property, 'id'>) => string;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertiesProvider');
  }
  return context;
};

interface PropertiesProviderProps {
  children: ReactNode;
}

export const PropertiesProvider = ({ children }: PropertiesProviderProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch mock properties data
  useEffect(() => {
    // Simulate API request delay
    const timer = setTimeout(() => {
      const mockProperties: Property[] = [
        {
          id: '1',
          title: 'Luxury Oceanfront Villa',
          price: '45.5',
          location: 'Miami',
          description: 'Stunning oceanfront villa with panoramic views, private beach access, and luxury amenities including infinity pool, home theater, and smart home technology.',
          bedrooms: 5,
          bathrooms: 4.5,
          squareFeet: 4200,
          imageUrl: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          images: [
            'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/2089696/pexels-photo-2089696.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
          ],
          seller: '0x1234...5678',
          createdAt: new Date('2025-04-10').getTime()
        },
        {
          id: '2',
          title: 'Modern Downtown Penthouse',
          price: '28.75',
          location: 'New York',
          description: 'Luxurious penthouse in the heart of Manhattan with floor-to-ceiling windows, chef\'s kitchen, and private rooftop terrace with 360-degree city views.',
          bedrooms: 3,
          bathrooms: 3,
          squareFeet: 2800,
          imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
          ],
          seller: '0xabcd...ef01',
          createdAt: new Date('2025-04-08').getTime()
        },
        {
          id: '3',
          title: 'Beachfront Bungalow',
          price: '12.9',
          location: 'Los Angeles',
          description: 'Charming beachfront bungalow with direct beach access, updated interiors, spacious deck, and stunning sunset views over the Pacific Ocean.',
          bedrooms: 2,
          bathrooms: 2,
          squareFeet: 1200,
          imageUrl: 'https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          images: [
            'https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
          ],
          seller: '0x2345...6789',
          createdAt: new Date('2025-04-05').getTime()
        },
        {
          id: '4',
          title: 'Hillside Smart Home',
          price: '32.6',
          location: 'Seattle',
          description: 'Cutting-edge smart home with stunning views of Puget Sound. Features include automated lighting, security, climate control, and a fully equipped home office.',
          bedrooms: 4,
          bathrooms: 3.5,
          squareFeet: 3600,
          imageUrl: 'https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          images: [
            'https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/3555615/pexels-photo-3555615.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
          ],
          seller: '0x3456...7890',
          createdAt: new Date('2025-04-03').getTime()
        },
        {
          id: '5',
          title: 'Historic Townhouse',
          price: '18.2',
          location: 'New York',
          description: 'Beautifully restored historic townhouse with modern amenities, original architectural details, high ceilings, and private garden in a prime location.',
          bedrooms: 3,
          bathrooms: 2.5,
          squareFeet: 2200,
          imageUrl: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          images: [
            'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/1643385/pexels-photo-1643385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
          ],
          seller: '0x4567...8901',
          createdAt: new Date('2025-04-01').getTime()
        },
        {
          id: '6',
          title: 'Silicon Valley Tech House',
          price: '42.0',
          location: 'San Francisco',
          description: 'Ultra-modern smart home with cutting-edge technology throughout, energy-efficient systems, home automation, and dedicated spaces for both work and relaxation.',
          bedrooms: 4,
          bathrooms: 4,
          squareFeet: 3800,
          imageUrl: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          images: [
            'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/2082089/pexels-photo-2082089.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
          ],
          seller: '0x5678...9012',
          createdAt: new Date('2025-03-28').getTime()
        },
        {
          id: '7',
          title: 'Minimalist Loft',
          price: '15.8',
          location: 'Seattle',
          description: 'Stylish urban loft with open floor plan, high ceilings, industrial design elements, and floor-to-ceiling windows with views of the downtown skyline.',
          bedrooms: 1,
          bathrooms: 1.5,
          squareFeet: 1050,
          imageUrl: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          images: [
            'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/2886284/pexels-photo-2886284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
          ],
          seller: '0x6789...0123',
          createdAt: new Date('2025-03-25').getTime()
        },
        {
          id: '8',
          title: 'Mediterranean Villa',
          price: '36.9',
          location: 'Los Angeles',
          description: 'Luxurious Mediterranean-style villa with private courtyard, pool, outdoor kitchen, and stunning interior design featuring high-end finishes throughout.',
          bedrooms: 5,
          bathrooms: 5.5,
          squareFeet: 4500,
          imageUrl: 'https://images.pexels.com/photos/3935320/pexels-photo-3935320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          images: [
            'https://images.pexels.com/photos/3935320/pexels-photo-3935320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/3935339/pexels-photo-3935339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            'https://images.pexels.com/photos/3935341/pexels-photo-3935341.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
          ],
          seller: '0x7890...1234',
          createdAt: new Date('2025-03-22').getTime()
        }
      ];

      setProperties(mockProperties);
      setFilteredProperties(mockProperties);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getPropertyById = (id: string) => {
    return properties.find(property => property.id === id);
  };

  const toggleWatchlist = (propertyId: string) => {
    setWatchlist(prev => {
      const isWatchlisted = prev.includes(propertyId);
      return isWatchlisted
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId];
    });
  };

  const applyFilters = (filters: PropertyFilterOptions) => {
    setLoading(true);
    
    // Simulate API request delay
    setTimeout(() => {
      let filtered = [...properties];
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filtered = filtered.filter(property => 
          property.title.toLowerCase().includes(searchTerm) || 
          property.location.toLowerCase().includes(searchTerm) ||
          property.description.toLowerCase().includes(searchTerm)
        );
      }
      
      if (filters.minPrice) {
        filtered = filtered.filter(property => 
          parseFloat(property.price) >= parseFloat(filters.minPrice || '0')
        );
      }
      
      if (filters.maxPrice) {
        filtered = filtered.filter(property => 
          parseFloat(property.price) <= parseFloat(filters.maxPrice || '999999999')
        );
      }
      
      if (filters.bedrooms) {
        filtered = filtered.filter(property => 
          property.bedrooms >= parseInt(filters.bedrooms || '0')
        );
      }
      
      if (filters.location && filters.location !== '') {
        filtered = filtered.filter(property => 
          property.location === filters.location
        );
      }
      
      setFilteredProperties(filtered);
      setLoading(false);
    }, 500);
  };

  const addProperty = (property: Omit<Property, 'id'>): string => {
    const id = `property-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newProperty: Property = {
      ...property,
      id
    };
    
    setProperties(prev => [newProperty, ...prev]);
    setFilteredProperties(prev => [newProperty, ...prev]);
    
    return id;
  };

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        filteredProperties,
        watchlist,
        loading,
        getPropertyById,
        toggleWatchlist,
        applyFilters,
        addProperty
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};