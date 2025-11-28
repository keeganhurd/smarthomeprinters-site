export interface LeadForm {
  name: string;
  email: string;
  phone: string;
  interest: 'printer' | 'smarthome' | 'consultation' | 'other';
}

export interface NavItem {
  label: string;
  path: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  asin: string;
  title: string;
  shortDescription: string; // For cards
  description: string[]; // Bullet points
  price: number;
  listPrice: number;
  rating: number;
  reviewCount: number;
  images: ProductImage[];
  amazonUrl: string;
  isFeatured?: boolean;
  
  // Long-form SEO Content
  overview?: string;
  features?: string[];
  targetAudience?: string[];
  setupText?: string;
}

export const COMPANY_INFO = {
  name: "HeloJet",
  legalName: "HeloJet Systems LLC",
  phone: "888-416-9212",
  address: "132 W International Speedway Blvd #44, Daytona Beach, FL 32114",
  email: "info@helojet.me"
};