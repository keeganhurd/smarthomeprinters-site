import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Check, AlertCircle, Star, MapPin, Lock, ChevronRight, Info } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

// Array of different high-quality fallback images so they don't all look the same
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1000&q=80", // Printer
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80", // Working on laptop
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80", // Tech Office
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80", // Product Shot
  "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=1000&q=80"  // Payment/App
];

const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getProductBySlug } = useProducts();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [qty, setQty] = useState(1);

  const product = getProductBySlug(slug || '');

  // Reset image selection when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [slug]);

  if (!product) {
    return <div className="p-20 text-center dark:text-white">Product not found.</div>;
  }
  
  // Smart Image Fallback: Pick a different image based on the index so they aren't identical
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, index: number) => {
    // Use modulo to cycle through fallbacks if there are more product images than fallbacks
    e.currentTarget.src = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
    e.currentTarget.onerror = null;
  };

  // Calculate savings
  const savings = product.listPrice - product.price;
  const savingsPercent = Math.round((savings / product.listPrice) * 100);

  return (
    <div className="bg-white dark:bg-slate-950 py-6 transition-colors duration-200">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb */}
        <nav className="flex mb-4 text-xs text-slate-500 dark:text-slate-400 overflow-x-auto">
          <a href="/" className="hover:text-slate-700 hover:underline whitespace-nowrap">Home</a>
          <ChevronRight className="w-3 h-3 mx-1 mt-0.5" />
          <span className="hover:text-slate-700 hover:underline cursor-pointer whitespace-nowrap">Electronics</span>
          <ChevronRight className="w-3 h-3 mx-1 mt-0.5" />
          <span className="hover:text-slate-700 hover:underline cursor-pointer whitespace-nowrap">Printers</span>
          <ChevronRight className="w-3 h-3 mx-1 mt-0.5" />
          <span className="font-bold text-slate-700 dark:text-slate-300 truncate">{product.title.substring(0, 50)}...</span>
        </nav>

        <div className="lg:flex lg:gap-8">
          
          {/* LEFT COLUMN: Images */}
          <div className="lg:w-5/12 flex gap-4 mb-8 lg:mb-0">
            {/* Thumbnails (Desktop) */}
            <div className="hidden lg:flex flex-col gap-3">
              {product.images.map((img, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => setSelectedImageIndex(idx)}
                  className={`w-12 h-12 border rounded cursor-pointer p-1 bg-white flex items-center justify-center overflow-hidden ${
                    selectedImageIndex === idx 
                      ? 'border-blue-500 shadow-sm ring-1 ring-blue-400' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageError(e, idx)}
                  />
                </div>
              ))}
            </div>

            {/* Main Image Stage */}
            <div className="flex-1 relative">
              <div className="aspect-square flex items-center justify-center bg-white rounded-lg overflow-hidden">
                 <img 
                   src={product.images[selectedImageIndex]?.src} 
                   alt={product.images[selectedImageIndex]?.alt} 
                   className="max-w-full max-h-[600px] object-contain transition-opacity duration-200"
                   referrerPolicy="no-referrer"
                   onError={(e) => handleImageError(e, selectedImageIndex)}
                 />
                 <div className="absolute top-2 right-2">
                   <button className="p-2 bg-white/80 rounded-full shadow hover:bg-white text-slate-600">
                     <Info className="w-5 h-5" />
                   </button>
                 </div>
              </div>
              
              {/* Mobile Thumbnails */}
              <div className="lg:hidden flex gap-2 overflow-x-auto py-4 mt-2 no-scrollbar">
                {product.images.map((img, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`flex-shrink-0 w-16 h-16 border rounded cursor-pointer p-1 bg-white flex items-center justify-center overflow-hidden ${
                      selectedImageIndex === idx ? 'border-blue-500' : 'border-slate-200'
                    }`}
                  >
                     <img 
                        src={img.src} 
                        alt={img.alt} 
                        className="w-full h-full object-contain" 
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, idx)}
                     />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Details */}
          <div className="lg:w-5/12 mb-8 lg:mb-0">
             <div className="border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
                <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-2 leading-tight">
                  {product.title}
                </h1>
                <div className="flex items-center gap-2 text-sm mb-2">
                  <div className="flex text-amber-400">
                    {[1,2,3,4].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                    <Star className={`w-4 h-4 fill-current ${product.rating >= 5 ? 'text-amber-400' : 'text-slate-300'}`} />
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">{product.reviewCount.toLocaleString()} ratings</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  2K+ bought in past month
                </div>
             </div>

             <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-red-700 dark:text-red-500 text-3xl font-light">-{savingsPercent}%</span>
                  <span className="text-3xl font-medium text-slate-900 dark:text-white">
                    <sup className="text-sm">$</sup>{Math.floor(product.price)}<sup className="text-sm">{(product.price % 1).toFixed(2).substring(2)}</sup>
                  </span>
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  List Price: <span className="line-through">${product.listPrice.toFixed(2)}</span>
                </div>

                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md mb-4">
                  <div className="font-bold text-slate-900 dark:text-white text-sm mb-2">Item Description</div>
                  <div className="text-slate-700 dark:text-slate-300 text-sm">{product.shortDescription}</div>
                </div>
             </div>

             <div className="prose dark:prose-invert prose-sm text-slate-900 dark:text-slate-200">
                <h3 className="font-bold text-base mb-2">About this item</h3>
                <ul className="space-y-2 marker:text-slate-400 list-disc pl-4">
                  {product.description.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
             </div>
          </div>

          {/* RIGHT COLUMN: Buy Box */}
          <div className="lg:w-2/12">
            <div className="border border-slate-300 dark:border-slate-600 rounded-lg p-4 bg-white dark:bg-slate-900 shadow-sm">
              <div className="mb-4">
                <div className="text-2xl font-medium text-slate-900 dark:text-white">
                  <sup className="text-xs">$</sup>{Math.floor(product.price)}<sup className="text-xs">{(product.price % 1).toFixed(2).substring(2)}</sup>
                </div>
                <div className="flex items-center gap-1 mt-1 mb-2">
                   <span className="text-sky-600 font-bold italic text-sm">prime</span>
                   <span className="text-slate-500 dark:text-slate-400 text-sm">Two-Day</span>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                  FREE delivery <span className="font-bold">Tomorrow</span>.
                </div>
                <div className="text-xs text-green-700 dark:text-green-500 mb-4 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Deliver to Customer - USA
                </div>
                <div className="text-lg text-green-700 dark:text-green-500 font-medium mb-4">
                  In Stock
                </div>
                
                <div className="mb-4">
                  <select 
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value))}
                    className="block w-full p-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-800 rounded-md shadow-sm text-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {[1,2,3,4,5].map(n => (
                      <option key={n} value={n}>Quantity: {n}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2.5">
                   <a 
                    href={product.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center bg-[#FFD814] hover:bg-[#F7CA00] text-black text-sm py-2 px-4 rounded-full shadow-sm font-medium cursor-pointer"
                   >
                     Add to Cart
                   </a>
                   <a 
                    href={product.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center bg-[#FFA41C] hover:bg-[#FA8900] text-black text-sm py-2 px-4 rounded-full shadow-sm font-medium cursor-pointer"
                   >
                     Buy Now
                   </a>
                </div>

                <div className="mt-4 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                   <div className="flex justify-between">
                     <span className="text-slate-500 dark:text-slate-500">Ships from</span>
                     <span>Amazon.com</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-500 dark:text-slate-500">Sold by</span>
                     <span>Amazon.com</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-500 dark:text-slate-500">Returns</span>
                     <span className="text-blue-600 dark:text-blue-400 truncate ml-2">Returnable until Jan 31...</span>
                   </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                 <div className="flex items-start gap-2">
                   <input type="checkbox" className="mt-1 rounded border-slate-300" />
                   <div>
                     <span className="text-sm font-medium text-slate-900 dark:text-white">Add a Protection Plan:</span>
                     <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                       <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">3-Year Protection</a> for <span className="text-red-700 dark:text-red-500">$9.99</span>
                     </div>
                   </div>
                 </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded p-2 bg-slate-50 dark:bg-slate-900">
                <Lock className="w-3 h-3" />
                Secure transaction
              </div>
            </div>
          </div>

        </div>
        
        {/* Independent Retailer Disclosure Section */}
        <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8">
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-blue-900 dark:text-blue-200 text-sm">
             <AlertCircle className="h-5 w-5 text-blue-800 dark:text-blue-400 flex-shrink-0" />
             <div>
               <p className="font-semibold mb-1">Independent Retailer Notice</p>
               <p>SmartHomePrinters.com is an independent retailer. We provide planning and purchase assistance. We do not manufacture this product. Warranty claims, technical support, and returns must be handled via Amazon or HP directly.</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductPage;