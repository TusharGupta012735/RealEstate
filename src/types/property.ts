export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
  images: string[];
  seller: string;
  createdAt: number;
  isWatchlisted?: boolean;
}

export interface PropertyFilterOptions {
  search: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  location: string;
}