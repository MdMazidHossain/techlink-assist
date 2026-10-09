import React, { useState } from 'react';
import {
  Search,
  Package,
} from 'lucide-react';
import { ProductItem, ProductCategory } from '../../types';
import { formatBDT } from '../../utils/currency';
import { handleImageError } from '../../utils/imageFallback';
import { AdBanner } from '../common/AdBanner';

interface ProductsPageProps {
  products: ProductItem[];
  onRequestQuote: (product: ProductItem) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  onRequestQuote,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Hardware' },
    { id: 'networking', label: 'Networking' },
    { id: 'cctv', label: 'CCTV & Surveillance' },
    { id: 'computer', label: 'Computer & Storage' },
    { id: 'office-it', label: 'Office IT & Printers' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.categoryId === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-900">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Certified Hardware & Infrastructure
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technology Products & Equipment
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Enterprise routers, PoE switches, 4K surveillance IP cameras, high-durability SSDs, and business office peripherals tested and verified by our engineering desk. All prices in Bangladeshi Taka (৳ BDT).
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, brand, SKU..."
            className="w-full rounded-lg bg-slate-900 border border-slate-800 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none min-h-[42px]"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setSelectedProduct(null);
            }}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[38px] ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Detail Modal / Drawer View */}
      {selectedProduct ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-10 space-y-8 animate-fade-in shadow-2xl">
          <button
            onClick={() => setSelectedProduct(null)}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-2 min-h-[40px]"
          >
            ← Back to product catalog
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Product Image */}
            <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-72 sm:h-80 object-cover"
                referrerPolicy="no-referrer"
                onError={handleImageError}
              />
            </div>

            {/* Info */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-400 mb-1">
                  <span>Category: {selectedProduct.categoryName}</span>
                  <span>·</span>
                  <span>Brand: {selectedProduct.brand}</span>
                  <span>·</span>
                  <span className="font-mono">SKU: {selectedProduct.sku}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedProduct.name}
                </h2>
                <div className="mt-3 flex items-center gap-4">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-blue-400">
                    {formatBDT(selectedProduct.price)}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
                    {selectedProduct.stockStatus === 'in_stock'
                      ? 'In Stock'
                      : selectedProduct.stockStatus === 'low_stock'
                      ? 'Low Stock (Inquire)'
                      : 'Backorder Available'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Description</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Specifications Table */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Technical Specifications</h3>
                <div className="rounded-xl border border-slate-800 bg-slate-950 divide-y divide-slate-800 text-xs">
                  {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-1 sm:grid-cols-3 p-3 gap-1">
                      <span className="text-slate-400 font-medium">{key}</span>
                      <span className="sm:col-span-2 text-white font-mono">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => onRequestQuote(selectedProduct)}
                  className="px-6 py-3 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/30 min-h-[44px]"
                >
                  Request Official Quote / Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-3">
          <Package className="h-10 w-10 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No products found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No items matched your search query. Please try another search term or reset the category filter.
          </p>
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="h-48 bg-slate-950 relative overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                  <div className="absolute top-3 right-3 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-slate-200 border border-slate-800">
                    {prod.stockStatus === 'in_stock' ? 'In Stock' : 'Low Stock'}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span>{prod.categoryName}</span>
                    <span>·</span>
                    <span>{prod.brand}</span>
                  </div>

                  <h3 className="text-base font-bold text-white line-clamp-1">{prod.name}</h3>
                  <div className="text-[11px] font-mono text-slate-500">SKU: {prod.sku}</div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed pt-1">
                    {prod.shortDescription}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 mt-3 border-t border-slate-800/60 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Pricing</span>
                  <span className="text-base sm:text-lg font-bold text-white font-mono">
                    {formatBDT(prod.price)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(prod)}
                    className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 rounded-lg transition-colors min-h-[38px]"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onRequestQuote(prod)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors min-h-[38px]"
                  >
                    Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Advertisement Banner on Products Page */}
      <AdBanner placement="products_banner" />
    </div>
  );
};
