import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

// Initial seed data (The HP Printer)
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'hp-deskjet-4255e',
    asin: 'B0CT2QHQVF',
    title: 'HP DeskJet 4255e Wireless All-in-One Color Inkjet Printer, Scanner, Copier, Best-for-Home, 3 Month Instant Ink Trial Included, AI-Enabled (588S6A)',
    shortDescription: 'The perfect all-in-one solution for home offices. Wireless printing, scanning, and easy setup via smartphone.',
    description: [
      'Simple, Stress-Free Printing: Best for home to print basic color documents like recipes, forms, and travel documents.',
      'Key Features: Print, copy, scan, wireless, auto document feeder, mobile fax.',
      'Includes 3 Months Instant Ink: Subscribe to Instant Ink within 7 days of setting up the printer to get your first 3 months included.',
      'Wireless Connectivity: Dual-band Wi-Fi® with self-reset automatically detects and resolves connectivity issues.',
      'HP App: Print, scan, copy, or fax right from your smartphone with the easiest-to-use print app.'
    ],
    price: 79.89,
    listPrice: 109.99,
    rating: 4.5,
    reviewCount: 4967,
    amazonUrl: 'https://www.amazon.com/HP-DeskJet-Wireless-included-588S6A/dp/B0CT2QHQVF',
    isFeatured: true,
    images: [
      { src: "https://m.media-amazon.com/images/I/61Zl5g5yJdL._AC_SL1500_.jpg", alt: "HP DeskJet 4255e Front" },
      { src: "https://m.media-amazon.com/images/I/71wX7w7yM9L._AC_SL1500_.jpg", alt: "Lifestyle usage" },
      { src: "https://m.media-amazon.com/images/I/71i4D7-C7UL._AC_SL1500_.jpg", alt: "Dimensions" },
      { src: "https://m.media-amazon.com/images/I/71O3rLhJ33L._AC_SL1500_.jpg", alt: "In the box" },
      { src: "https://m.media-amazon.com/images/I/712SBK+h8iL._AC_SL1500_.jpg", alt: "App usage" },
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