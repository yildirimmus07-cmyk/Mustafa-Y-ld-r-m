import React, { useState } from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import { PropertyCard } from '../components/PropertyCard';
import { ALANYA_DISTRICTS, PROPERTY_TYPES, ROOM_OPTIONS } from '../data/initialProperties';
import { 
  Search, 
  RotateCcw, 
  SlidersHorizontal, 
  Heart, 
  Check, 
  ArrowUpDown,
  X
} from 'lucide-react';

export const ListingsPage: React.FC = () => {
  const { 
    filter, 
    setFilter, 
    resetFilter, 
    filteredProperties, 
    favorites, 
    properties 
  } = usePropertyContext();

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Apply favorites filter if toggled
  const displayedProperties = onlyFavorites
    ? filteredProperties.filter(p => favorites.includes(p.id))
    : filteredProperties;

  const hasActiveFilters = 
    filter.searchQuery !== '' ||
    filter.listingType !== 'all' ||
    filter.propertyType !== 'all' ||
    filter.district !== 'all' ||
    filter.rooms !== 'all' ||
    filter.minPrice !== undefined ||
    filter.maxPrice !== undefined ||
    filter.minArea !== undefined ||
    filter.maxArea !== undefined ||
    filter.citizenshipOnly ||
    filter.seaViewOnly ||
    onlyFavorites;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Alanya Emlak Portföyü
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Satılık ve Kiralık Gayrimenkuller
            </h1>
            
            {/* View Favorites button */}
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                onlyFavorites
                  ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${onlyFavorites ? 'fill-rose-600 text-rose-600' : 'text-slate-400'}`} />
              <span>Favorilerim ({favorites.length})</span>
            </button>
          </div>
        </div>

        {/* Layout: Sidebar Filter + Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden col-span-1">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-between shadow-xs"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                Filtreleme Seçenekleri
              </span>
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                {displayedProperties.length} İlan
              </span>
            </button>
          </div>

          {/* 1. FILTER SIDEBAR (Desktop & Mobile Drawer) */}
          <aside className={`lg:block ${showMobileFilters ? 'block' : 'hidden'} lg:col-span-1`}>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-6 sticky top-24">
              
              {/* Filter Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                  <span>Detaylı Filtreleme</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      resetFilter();
                      setOnlyFavorites(false);
                    }}
                    className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Temizle
                  </button>
                )}
              </div>

              {/* Search query keyword */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Kelime / İlan No İle Ara
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Örn: ALN-7812, deniz, havuz..."
                    value={filter.searchQuery}
                    onChange={(e) => setFilter(prev => ({ ...prev, searchQuery: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 pl-8"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  {filter.searchQuery && (
                    <button
                      onClick={() => setFilter(prev => ({ ...prev, searchQuery: '' }))}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Listing Type: Satılık / Kiralık / Tümü */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  İlan Türü
                </label>
                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl">
                  {(['all', 'satilik', 'kiralik'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFilter(prev => ({ ...prev, listingType: type }))}
                      className={`py-1.5 text-xs font-semibold rounded-lg transition-colors capitalize ${
                        filter.listingType === type
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {type === 'all' ? 'Tümü' : type === 'satilik' ? 'Satılık' : 'Kiralık'}
                    </button>
                  ))}
                </div>
              </div>

              {/* District Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Alanya Bölgesi
                </label>
                <select
                  value={filter.district || 'all'}
                  onChange={(e) => setFilter(prev => ({ ...prev, district: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="all">Tüm Bölgeler</option>
                  {ALANYA_DISTRICTS.filter(d => d !== 'Tümü').map((dist) => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>

              {/* Property Type Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Mülk Tipi
                </label>
                <select
                  value={filter.propertyType || 'all'}
                  onChange={(e) => setFilter(prev => ({ ...prev, propertyType: e.target.value as any }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {PROPERTY_TYPES.map((pt) => (
                    <option key={pt.value} value={pt.value}>{pt.label}</option>
                  ))}
                </select>
              </div>

              {/* Rooms Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Oda Sayısı
                </label>
                <select
                  value={filter.rooms || 'all'}
                  onChange={(e) => setFilter(prev => ({ ...prev, rooms: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="all">Farketmez</option>
                  {ROOM_OPTIONS.filter(r => r !== 'Tümü').map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Fiyat Aralığı (EUR €)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min €"
                    value={filter.minPrice || ''}
                    onChange={(e) => setFilter(prev => ({ 
                      ...prev, 
                      minPrice: e.target.value ? Number(e.target.value) : undefined 
                    }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="number"
                    placeholder="Maks €"
                    value={filter.maxPrice || ''}
                    onChange={(e) => setFilter(prev => ({ 
                      ...prev, 
                      maxPrice: e.target.value ? Number(e.target.value) : undefined 
                    }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Area Range (m²) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Metrekare Aralığı (m²)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min m²"
                    value={filter.minArea || ''}
                    onChange={(e) => setFilter(prev => ({ 
                      ...prev, 
                      minArea: e.target.value ? Number(e.target.value) : undefined 
                    }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="number"
                    placeholder="Maks m²"
                    value={filter.maxArea || ''}
                    onChange={(e) => setFilter(prev => ({ 
                      ...prev, 
                      maxArea: e.target.value ? Number(e.target.value) : undefined 
                    }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Special Toggles */}
              <div className="pt-2 space-y-2.5 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={filter.citizenshipOnly || false}
                    onChange={(e) => setFilter(prev => ({ ...prev, citizenshipOnly: e.target.checked }))}
                    className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                  />
                  <span>Vatandaşlığa Uygun</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={filter.seaViewOnly || false}
                    onChange={(e) => setFilter(prev => ({ ...prev, seaViewOnly: e.target.checked }))}
                    className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                  />
                  <span>Deniz Manzaralı</span>
                </label>
              </div>

            </div>
          </aside>

          {/* 2. RESULTS MAIN AREA */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Top Toolbar: Results count & Sort */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="text-xs font-bold text-slate-800">
                Toplam <span className="text-amber-600 font-mono">{displayedProperties.length}</span> ilan bulundu
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-500 font-medium">Sırala:</span>
                <select
                  value={filter.sortBy || 'newest'}
                  onChange={(e) => setFilter(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="newest">En Yeni İlanlar</option>
                  <option value="price-asc">Fiyata Göre (Artan)</option>
                  <option value="price-desc">Fiyata Göre (Azalan)</option>
                  <option value="area-desc">Metrekareye Göre (Büyükten Küçüğe)</option>
                </select>
              </div>
            </div>

            {/* Properties Grid */}
            {displayedProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Arama Kriterlerinize Uygun İlan Bulunamadı
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
                  Farklı bir bölge seçebilir, fiyat veya oda sayısı aralıklarını genişletebilirsiniz.
                </p>
                <button
                  onClick={() => {
                    resetFilter();
                    setOnlyFavorites(false);
                  }}
                  className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Tüm Filtreleri Sıfırla
                </button>
              </div>
            )}

          </main>

        </div>
      </div>
    </div>
  );
};
