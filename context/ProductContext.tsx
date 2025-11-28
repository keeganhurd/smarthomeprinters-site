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
    price: 79.99,
    listPrice: 129.99,
    rating: 4.8,
    reviewCount: 124,
    amazonUrl: 'https://www.amazon.com/s?k=white+minimalist+printer', 
    isFeatured: true,
    images: [
      { src: "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_SL1500_.jpg", alt: "HeloJet C200 Front View White" },
      { src: "https://images.unsplash.com/photo-1589820296156-2454bb8a6d54?auto=format&fit=crop&w=1500&q=80", alt: "HeloJet C200 Document Printing" },
      { src: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1500&q=80", alt: "HeloJet C200 Home Office Setup" },
      { src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1500&q=80", alt: "HeloJet Product Detail" },
      { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1500&q=80", alt: "HeloJet Modern Desk" },
    ],
    overview: "The HeloJet C200 redefines home printing with a focus on simplicity and connectivity. Designed for the modern wireless household, this all-in-one inkjet eliminates the clutter of cables while providing robust performance for documents, homework, and creative projects. Its minimalist white and grey aesthetic seamlessly blends into any room decor, from home offices to living room shelves.",
    features: [
      "Wireless Freedom: Utilizing advanced Wi-Fi technology, the C200 allows you to print from any room. Whether you are on a laptop in the study or a smartphone in the kitchen, your documents are just a tap away.",
      "Compact Footprint: Space is a premium in many homes. The C200 features a vertical paper feed and retractable trays, minimizing its desk footprint when not in use.",
      "High-Quality Imaging: Equipped with a precision 0.92-inch print head, the printer produces sharp, legible text and vivid colors, ensuring your presentations and photos look professional."
    ],
    targetAudience: [
      "Remote Workers: Reliable scanning and printing for contracts and reports.",
      "Students: Fast, color-rich output for essays and school projects.",
      "Families: Easy mobile printing for everyone in the house without managing cables.",
      "Minimalists: A device that looks good and works well without taking up unnecessary space."
    ],
    setupText: "Setting up the HeloJet C200 is straightforward using the downloadable companion app, which guides you through connecting to your Wi-Fi network. Please Note: HeloJet.me is the official online store and support site for HeloJet™ printers and accessories. We provide full setup assistance and support for our hardware. For warranty claims or technical troubleshooting, you may contact our support team or refer to the documentation included in the box."
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
  // CHANGED KEY to 'helojet_products_v4' to ensure new schema loads and busts old cache
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('helojet_products_v4');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('helojet_products_v4', JSON.stringify(products));
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