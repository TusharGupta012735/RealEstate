import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { PropertyFilterOptions } from '../../types/property';

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilterOptions) => void;
}

const PropertyFilters = ({ onFilterChange }: PropertyFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<PropertyFilterOptions>({
    search: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    location: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  };

  const resetFilters = () => {
    const resetValues = {
      search: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      location: '',
    };
    setFilters(resetValues);
    onFilterChange(resetValues);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Find Your Dream Property</h2>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="md:hidden flex items-center gap-2 bg-gray-800 p-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
        >
          <SlidersHorizontal size={20} />
          Filters
        </button>
      </div>

      {/* Search bar - always visible */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleInputChange}
          placeholder="Search by property name, city, or type..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Filter section - hidden on mobile unless toggled */}
      <div className={`transition-all duration-300 ease-in-out ${
        isFilterOpen || window.innerWidth >= 768 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:max-h-96 md:opacity-100 overflow-hidden'
      }`}>
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-white">Filters</h3>
            {isFilterOpen && (
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="md:hidden text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Min Price (ETH)
              </label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Max Price (ETH)
              </label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleInputChange}
                placeholder="No limit"
                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Bedrooms
              </label>
              <select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Location
              </label>
              <select
                name="location"
                value={filters.location}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Any</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="New York">New York</option>
                <option value="Miami">Miami</option>
                <option value="Seattle">Seattle</option>
                <option value="San Francisco">San Francisco</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4 gap-3">
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;