import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Wand2, Save, X, Plus, Trash, Upload, Link as LinkIcon, GripHorizontal, FileText } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { Product, ProductImage } from '../../types';
import AdminLayout from './AdminLayout';

const ProductEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct } = useProducts();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [amazonLinkInput, setAmazonLinkInput] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  const initialProduct: Product = {
    id: '',
    slug: '',
    asin: '',
    title: '',
    shortDescription: '',
    description: [''],
    price: 0,
    listPrice: 0,
    rating: 4.5,
    reviewCount: 100,
    images: [],
    amazonUrl: '',
    // New fields default
    overview: '',
    features: [''],
    targetAudience: [''],
    setupText: ''
  };

  const [formData, setFormData] = useState<Product>(initialProduct);

  useEffect(() => {
    if (id) {
      const found = products.find(p => p.id === id);
      if (found) {
        // Ensure arrays exist even if old data
        setFormData({
          ...found,
          features: found.features || [''],
          targetAudience: found.targetAudience || [''],
          overview: found.overview || '',
          setupText: found.setupText || ''
        });
      }
    } else {
      // Generate random ID for new product
      setFormData(prev => ({ ...prev, id: Math.random().toString(36).substr(2, 9) }));
    }
  }, [id, products]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleArrayChange = (field: 'description' | 'features' | 'targetAudience', index: number, value: string) => {
    const newArray = [...(formData[field] || [])];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: 'description' | 'features' | 'targetAudience') => {
    setFormData(prev => ({ ...prev, [field]: [...(prev[field] || []), ''] }));
  };

  const removeArrayItem = (field: 'description' | 'features' | 'targetAudience', index: number) => {
    const newArray = [...(formData[field] || [])];
    newArray.splice(index, 1);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleImageAddUrl = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, { src: url, alt: 'Product Image' }]
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic size check (approx 1MB limit recommendation for localStorage performance)
    if (file.size > 1000000) {
      alert("Warning: This image is large (>1MB). It may fill up your browser storage quickly. Consider resizing it first.");
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, { src: base64String, alt: file.name }]
      }));
    };
    reader.readAsDataURL(file);
    
    // Reset input so same file can be selected again if needed
    e.target.value = '';
  };

  const handleImageRemove = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  // --- Drag and Drop Logic ---
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const updatedImages = [...formData.images];
    const itemToMove = updatedImages[draggedIndex];

    updatedImages.splice(draggedIndex, 1);
    updatedImages.splice(targetIndex, 0, itemToMove);

    setFormData(prev => ({ ...prev, images: updatedImages }));
    setDraggedIndex(null);
  };

  const handleAISimulation = async () => {
    if (!amazonLinkInput) {
      alert("Please enter an Amazon URL first.");
      return;
    }

    setIsLoadingAI(true);
    
    // Extract ASIN using Regex
    const asinMatch = amazonLinkInput.match(/(?:dp|gp\/product)\/([A-Z0-9]{10})/);
    const asin = asinMatch ? asinMatch[1] : 'UNKNOWN_ASIN';

    // Simulate AI Processing Delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mainImageUrl = `https://images-na.ssl-images-amazon.com/images/P/${asin}.01._SCLZZZZZZZ_.jpg`;

    // Simulate AI Data Generation with 5 images total
    const simulatedData: Partial<Product> = {
      asin: asin,
      amazonUrl: amazonLinkInput,
      title: `AI Generated: Premium Smart Home Device (${asin})`,
      shortDescription: "This content was automatically generated. The product features reliable connectivity and simple setup.",
      description: [
        "Reliable Connectivity: Features self-healing Wi-Fi for uninterrupted performance.",
        "Smart App Integration: Works seamlessly with companion mobile app for easy management.",
        "Compact Design: Fits perfectly in any home office or living room environment.",
        "Energy Efficient: Designed to reduce power consumption while maintaining high performance.",
        "Secure: Built with industry-standard security features to protect your data."
      ],
      price: 89.99,
      listPrice: 119.99,
      slug: `product-${asin.toLowerCase()}`,
      images: [
        { src: mainImageUrl, alt: "Main Product View" },
        { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80", alt: "Lifestyle Office Context" },
        { src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80", alt: "Product Detail Shot" },
        { src: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=1000&q=80", alt: "Usage Context" },
        { src: "https://images.unsplash.com/photo-1629757697332-9cb52c418706?auto=format&fit=crop&w=1000&q=80", alt: "Packaging / In the Box" }
      ],
      // Fill simulated SEO content
      overview: "Experience the next level of smart home integration with this device. It combines sleek aesthetics with powerful performance, ensuring it not only looks good but works flawlessly.",
      features: [
        "Voice Control: Compatible with major voice assistants.",
        "Automated Scheduling: Set routines to automate your day.",
        "Remote Access: Control from anywhere via the cloud."
      ],
      targetAudience: [
        "Tech Enthusiasts: Love bleeding edge tech.",
        "Busy Families: Need automation to save time.",
        "Remote Workers: Enhance productivity."
      ],
      setupText: "Setup takes less than 5 minutes. Download the app, scan the QR code on the device, and follow the on-screen instructions."
    };

    setFormData(prev => ({ ...prev, ...simulatedData }));
    setIsLoadingAI(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      updateProduct(formData);
    } else {
      addProduct(formData);
    }
    navigate('/admin');
  };

  return (
    <AdminLayout>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
        
        {/* AI Section */}
        {!id && (
          <div className="mb-8 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Wand2 className="text-purple-600" size={20} />
              AI Page Builder
            </h3>
            <div className="flex gap-2">
              <input 
                type="text"
                placeholder="Paste Amazon Product URL..."
                className="flex-1 p-2 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                value={amazonLinkInput}
                onChange={(e) => setAmazonLinkInput(e.target.value)}
              />
              <button 
                onClick={handleAISimulation}
                disabled={isLoadingAI}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isLoadingAI ? 'Crawling...' : 'Generate Page'}
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Product Title</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full p-2 rounded border dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">URL Slug</label>
              <input type="text" name="slug" required value={formData.slug} onChange={handleChange} className="w-full p-2 rounded border dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">ASIN</label>
              <input type="text" name="asin" required value={formData.asin} onChange={handleChange} className="w-full p-2 rounded border dark:bg-slate-900 dark:border-slate-600 dark:text-white font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Price ($)</label>
              <input type="number" step="0.01" name="price" required value={formData.price} onChange={handleNumberChange} className="w-full p-2 rounded border dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">List Price ($)</label>
              <input type="number" step="0.01" name="listPrice" required value={formData.listPrice} onChange={handleNumberChange} className="w-full p-2 rounded border dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Amazon Affiliate URL</label>
            <input type="url" name="amazonUrl" required value={formData.amazonUrl} onChange={handleChange} className="w-full p-2 rounded border dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Short Description (Card View)</label>
            <textarea name="shortDescription" rows={3} value={formData.shortDescription} onChange={handleChange} className="w-full p-2 rounded border dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Bullet Points (Above Fold)</label>
            {formData.description.map((bullet, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input 
                  type="text" 
                  value={bullet} 
                  onChange={(e) => handleArrayChange('description', idx, e.target.value)}
                  className="flex-1 p-2 rounded border dark:bg-slate-900 dark:border-slate-600 dark:text-white"
                />
                <button type="button" onClick={() => removeArrayItem('description', idx)} className="text-red-500 hover:text-red-700"><X size={20} /></button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem('description')} className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-2">
              <Plus size={16} /> Add Bullet Point
            </button>
          </div>

          {/* Long Form SEO Section */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="text-blue-600" size={20} />
              Long-Form SEO Content (Lower Page)
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Product Overview</label>
                <textarea name="overview" rows={4} value={formData.overview} onChange={handleChange} className="w-full p-2 rounded border dark:bg-slate-900 dark:border-slate-600 dark:text-white" placeholder="Detailed intro paragraph..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Key Features & Benefits (List)</label>
                {formData.features?.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input 
                      type="text" 
                      value={item} 
                      onChange={(e) => handleArrayChange('features', idx, e.target.value)}
                      className="flex-1 p-2 rounded border dark:bg-slate-900 dark:border-slate-600 dark:text-white"
                      placeholder="Title: Description"
                    />
                    <button type="button" onClick={() => removeArrayItem('features', idx)} className="text-red-500 hover:text-red-700"><X size={20} /></button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('features')} className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-2">
                  <Plus size={16} /> Add Feature Paragraph
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Audience (List)</label>
                {formData.targetAudience?.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input 
                      type="text" 
                      value={item} 
                      onChange={(e) => handleArrayChange('targetAudience', idx, e.target.value)}
                      className="flex-1 p-2 rounded border dark:bg-slate-900 dark:border-slate-600 dark:text-white"
                      placeholder="Audience: Why it's good for them"
                    />
                    <button type="button" onClick={() => removeArrayItem('targetAudience', idx)} className="text-red-500 hover:text-red-700"><X size={20} /></button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('targetAudience')} className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-2">
                  <Plus size={16} /> Add Audience Item
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Setup & Support Text</label>
                <textarea name="setupText" rows={3} value={formData.setupText} onChange={handleChange} className="w-full p-2 rounded border dark:bg-slate-900 dark:border-slate-600 dark:text-white" placeholder="Support policy details..." />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Images (Drag to Reorder)</label>
            
            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="image/*" 
              className="hidden" 
            />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              {formData.images.map((img, idx) => (
                <div 
                  key={idx} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={(e) => handleDrop(e, idx)}
                  className={`relative group border rounded p-2 dark:border-slate-700 bg-white dark:bg-slate-900 h-32 flex items-center justify-center cursor-move transition-all ${
                    draggedIndex === idx ? 'opacity-40 border-dashed border-blue-500' : 'opacity-100'
                  }`}
                >
                  <img src={img.src} alt={img.alt} className="max-w-full max-h-full object-contain pointer-events-none" />
                  <div className="absolute top-1 left-1 text-slate-300"><GripHorizontal size={14} /></div>
                  <button 
                    type="button" 
                    onClick={() => handleImageRemove(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded flex flex-col items-center justify-center h-32 text-slate-500 hover:border-blue-500 hover:text-blue-500 transition-colors bg-slate-50 dark:bg-slate-800/50"
              >
                <Upload size={24} className="mb-2" />
                <span className="text-xs font-medium">Upload File</span>
              </button>

              <button 
                type="button"
                onClick={handleImageAddUrl}
                className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded flex flex-col items-center justify-center h-32 text-slate-500 hover:border-blue-500 hover:text-blue-500 transition-colors bg-slate-50 dark:bg-slate-800/50"
              >
                <LinkIcon size={24} className="mb-2" />
                <span className="text-xs font-medium">Add URL</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-4">
            <button 
              type="button" 
              onClick={() => navigate('/admin')}
              className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-800"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <Save size={18} />
              Save Product
            </button>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
};

export default ProductEditor;