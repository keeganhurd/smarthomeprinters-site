import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

// Initial seed data (HeloJet C200)
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'helojet-c200',
    asin: 'HELOJET200',
    title: 'HeloJet C200 Wireless Smart Printer - All-in-One Home Office Solution',
    shortDescription: 'The HeloJet C200 is a compact wireless smart printer built for modern homes and small offices. Enjoy fast, reliable color printing, copying, and scanning from any device with simple Wi-Fi setup and quiet, energy-efficient performance.',
    description: [
      'Wireless All-in-One Printer: Print, copy, and scan from one compact color inkjet designed for home offices, students, and families.',
      'Easy Wi-Fi Setup: Connect to your home network in minutes and print wirelessly from laptops, phones, and tablets (iOS, Android, Windows, and macOS).',
      'Smart Mobile Printing: Send documents and photos to your HeloJet C200 from anywhere in your home using the companion app—no USB cable required.',
      'Crisp Color & Black Text: 0.92-inch wide print head delivers sharp black documents and vibrant color prints for schoolwork, photos, and everyday pages.',
      'Eco-Smart & Quiet: Auto-sleep mode reduces power usage when idle, and Quiet Mode keeps noise low so you can work, study, or sleep without distraction.',
      'Compact Minimalist Design: Clean white chassis with matte grey top and vertical paper feed fits neatly on a desk, shelf, or credenza.',
      'Low-Cost Ink Cartridges: Uses replaceable color and black ink cartridges engineered for consistent quality and predictable running costs.'
    ],
    price: 89.99,
    listPrice: 129.99,
    rating: 4.8,
    reviewCount: 124,
    amazonUrl: 'https://www.amazon.com/s?k=white+minimalist+printer', // Placeholder or generic search until actual ASIN is live
    isFeatured: true,
    images: [
      { src: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1500&q=80", alt: "HeloJet C200 Front View" },
      { src: "https://images.unsplash.com/photo-1563770095-39d468f9a51d?auto=format&fit=crop&w=1500&q=80", alt: "HeloJet C200 Workspace" },
      { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1500&q=80", alt: "HeloJet C200 Home Office" },
      { src: "https://images.unsplash.com/photo-1589820296156-2454bb8a6d54?auto=format&fit=crop&w=1500&q=80", alt: "Printing Document" },
      { src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1500&q=80", alt: "Product Detail" },
    ]
  }
];

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('shp_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('shp_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getProductBySlug = (slug: string) => {
    return products.find(p => p.slug === slug);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProductBySlug }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};