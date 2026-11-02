import React, { useState } from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import { PropertyCard } from '../components/PropertyCard';
import { ALANYA_DISTRICTS, PROPERTY_TYPES, ROOM_OPTIONS } from '../data/initialProperties';
import { 
  Search, 
  MapPin, 
  Home, 
  SlidersHorizontal, 
  Play, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Users, 
  FileCheck2, 
  Check, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    properties, 
    filter, 
    setFilter, 
    navigateTo, 
    timelapseProjects,
    siteSettings 
  } = usePropertyContext();

  // Local quick search form state
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedListingType, setSelectedListingType] = useState<'all' | 'satilik' | 'kiralik'>('satilik');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedRooms, setSelectedRooms] = useState<string>('all');
  const [maxPriceInput, setMaxPriceInput] = useState<string>('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilter(prev => ({
      ...prev,
      listingType: selectedListingType,
      propertyType: selectedType as any,
      district: selectedDistrict,
      rooms: selectedRooms,
      maxPrice: maxPriceInput ? Number(maxPriceInput) : undefined
    }));
    navigateTo('listings');
  };

  const featuredProperties = properties.filter(p => p.isFeatured).slice(0, 4);
  const latestProperties = [...properties]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center bg-slate-950 overflow-hidden">
        {/* Background Visual (Video or Image) */}
        <div className="absolute inset-0">
          {siteSettings.heroVideoUrl ? (
            <video
              src={siteSettings.heroVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center opacity-70"
            />
          ) : (
            <img
              src={siteSettings.heroImage || "/src/assets/images/hero_alanya_villa_1793604906893.jpg"}
              alt="Alanya Lüks Gayrimenkul"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-70"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          
          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wide uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AlanyaMYıldırım · {siteSettings.primaryAgentName} Güvencesiyle</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight mb-4 text-balance">
            {siteSettings.heroTitle}
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mb-10 leading-relaxed font-normal">
            {siteSettings.heroSubtitle}
          </p>

          {/* Comprehensive Search Widget */}
          <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-6 border border-white/30 text-left">
            
            {/* Listing Type Tabs (Satılık / Kiralık / Tümü) */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedListingType('satilik')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  selectedListingType === 'satilik'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Satılık İlanlar
              </button>
              <button
                type="button"
                onClick={() => setSelectedListingType('kiralik')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  selectedListingType === 'kiralik'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Kiralık İlanlar
              </button>
              <button
                type="button"
                onClick={() => setSelectedListingType('all')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  selectedListingType === 'all'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tüm Portföy
              </button>
            </div>

            {/* Filter Inputs Grid */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              
              {/* District */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Bölge / Mahalle
                </label>
                <div className="relative">
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer"
                  >
                    <option value="all">Tüm Bölgeler</option>
                    {ALANYA_DISTRICTS.filter(d => d !== 'Tümü').map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Emlak Türü
                </label>
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer"
                  >
                    {PROPERTY_TYPES.map((pt) => (
                      <option key={pt.value} value={pt.value}>{pt.label}</option>
                    ))}
                  </select>
                  <Home className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Rooms */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Oda Sayısı
                </label>
                <select
                  value={selectedRooms}
                  onChange={(e) => setSelectedRooms(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer"
                >
                  <option value="all">Farketmez</option>
                  {ROOM_OPTIONS.filter(r => r !== 'Tümü').map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Maks. Bütçe (€)
                </label>
                <input
                  type="number"
                  placeholder="Örn: 250000"
                  value={maxPriceInput}
                  onChange={(e) => setMaxPriceInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
                >
                  <Search className="w-4 h-4" />
                  İlanları Ara
                </button>
              </div>

            </form>

            {/* Quick Popular Filters */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Hızlı Filtre:</span>
              <button
                type="button"
                onClick={() => {
                  setFilter(prev => ({ ...prev, citizenshipOnly: true, listingType: 'satilik' }));
                  navigateTo('listings');
                }}
                className="hover:text-amber-700 transition-colors cursor-pointer"
              >
                Vatandaşlığa Uygun
              </button>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <button
                type="button"
                onClick={() => {
                  setFilter(prev => ({ ...prev, seaViewOnly: true }));
                  navigateTo('listings');
                }}
                className="hover:text-amber-700 transition-colors cursor-pointer"
              >
                Deniz Manzaralı
              </button>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <button
                type="button"
                onClick={() => {
                  setFilter(prev => ({ ...prev, district: 'Kargıcak', propertyType: 'villa' }));
                  navigateTo('listings');
                }}
                className="hover:text-amber-700 transition-colors cursor-pointer"
              >
                Kargıcak Villaları
              </button>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <button
                type="button"
                onClick={() => {
                  setFilter(prev => ({ ...prev, district: 'Mahmutlar', rooms: '2+1' }));
                  navigateTo('listings');
                }}
                className="hover:text-amber-700 transition-colors cursor-pointer"
              >
                Mahmutlar 2+1
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 2. REGIONAL ADVANTAGES STRIP */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{siteSettings.experienceYears} Yıllık Tecrübe</div>
                <div className="text-xs text-slate-500">Alanya Gayrimenkul Lideri</div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{siteSettings.successfulDeeds} Başarılı Tapu Devri</div>
                <div className="text-xs text-slate-500">Mustafa Yıldırım Güvencesiyle</div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Yetki Belge No: {siteSettings.licenseNo}</div>
                <div className="text-xs text-slate-500">T.C. Ticaret Bakanlığı Onaylı</div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{siteSettings.satisfactionRate} Memnuniyet</div>
                <div className="text-xs text-slate-500">Doğrulanmış Yatırımcılar</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES (ÖNE ÇIKAN EVLER) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
              Özel Seçki Portföy
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Öne Çıkan Gayrimenkuller
            </h2>
          </div>

          <button
            onClick={() => {
              setFilter(prev => ({ ...prev, listingType: 'all' }));
              navigateTo('listings');
            }}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>Tüm İlanları Görüntüle</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 4. TIMELAPSE SHOWCASE BANNER ("Ayrıca bi sayfada yapıların fotoğraflarından timelapse videoları olsun") */}
      <section className="bg-slate-900 text-white py-14 overflow-hidden relative border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>9:16 Dikey Şantiye Videoları</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                Projelerin İnşaat Gelişimini 9:16 Dikey Timelapse Videolarıyla İzleyin
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Temel kazıklarından kaba inşaata, dış cephe giydirmeden lüks iç mimariye kadar Alanya’daki yeni yapıların ay ay gelişimini mobil ve reels uyumlu 9:16 dikey formatta kesintisiz izleyin.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => navigateTo('timelapse')}
                  className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>9:16 Timelapse Galerisini Aç</span>
                </button>
                <button
                  onClick={() => navigateTo('listings')}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  <span>Projeleri Keşfet</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div 
                onClick={() => navigateTo('timelapse')} 
                className="group relative w-full max-w-[240px] sm:max-w-[260px] aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer shadow-2xl border-2 border-slate-700 bg-black hover:border-amber-500 transition-all duration-300"
              >
                <img
                  src="/src/assets/images/timelapse_project_emerald_1793604907854.jpg"
                  alt="Emerald Coast 9:16 Timelapse"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-black/30 group-hover:opacity-80 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between text-[10px]">
                  <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-white font-bold">
                    9:16 Reels
                  </span>
                  <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                    %82
                  </span>
                </div>

                {/* Big Center Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 inset-x-3 bg-slate-950/80 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 text-xs">
                  <div className="font-bold text-white text-[11px] truncate">Emerald Coast Residences</div>
                  <div className="text-[10px] text-amber-400">Kargıcak · 9:16 Video İzle</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. LATEST LISTINGS (YENİ EKLENEN İLANLAR) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
              Güncel Portföy
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Yeni Eklenen İlanlar
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setFilter(prev => ({ ...prev, listingType: 'satilik' }));
                navigateTo('listings');
              }}
              className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
            >
              Satılıklar
            </button>
            <button
              onClick={() => {
                setFilter(prev => ({ ...prev, listingType: 'kiralik' }));
                navigateTo('listings');
              }}
              className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
            >
              Kiralıklar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setFilter(prev => ({ ...prev, listingType: 'all' }));
              navigateTo('listings');
            }}
            className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center gap-2"
          >
            <span>Tüm Alanya İlanlarını İncele ({properties.length} Mülk)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 6. POPULAR ALANYA DISTRICTS (MAHALLELER) */}
      <section className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
              Bölge Rehberi
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              Alanya’nın En Değerli Yerleşim Alanları
            </h2>
            <p className="text-xs text-slate-500">
              İster hareketli sahil hayatı, ister Toros Dağları’nın serin yamaçlarında sakin bir villa arayın.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* District 1: Mahmutlar */}
            <div 
              onClick={() => {
                setFilter(prev => ({ ...prev, district: 'Mahmutlar' }));
                navigateTo('listings');
              }}
              className="group relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-900 cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <img
                src="/src/assets/images/listing_mahmutlar_residence_1793604907502.jpg"
                alt="Mahmutlar"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 inset-x-4 text-white">
                <h3 className="font-bold text-base group-hover:text-amber-400 transition-colors">Mahmutlar</h3>
                <p className="text-xs text-slate-300">Modern rezidanslar & hareketli sahil şeridi</p>
              </div>
            </div>

            {/* District 2: Kargıcak */}
            <div 
              onClick={() => {
                setFilter(prev => ({ ...prev, district: 'Kargıcak' }));
                navigateTo('listings');
              }}
              className="group relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-900 cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <img
                src="/src/assets/images/listing_kargicak_villa_1793604907770.jpg"
                alt="Kargıcak"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 inset-x-4 text-white">
                <h3 className="font-bold text-base group-hover:text-amber-400 transition-colors">Kargıcak</h3>
                <p className="text-xs text-slate-300">Özel havuzlu lüks villalar & panoramik deniz</p>
              </div>
            </div>

            {/* District 3: Cleopatra / Merkez */}
            <div 
              onClick={() => {
                setFilter(prev => ({ ...prev, district: 'Cleopatra / Merkez' }));
                navigateTo('listings');
              }}
              className="group relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-900 cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <img
                src="/src/assets/images/listing_cleopatra_penthouse_1793608562299.jpg"
                alt="Cleopatra"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 inset-x-4 text-white">
                <h3 className="font-bold text-base group-hover:text-amber-400 transition-colors">Cleopatra / Merkez</h3>
                <p className="text-xs text-slate-300">Altın kum plaj, kale manzarası & teleferik</p>
              </div>
            </div>

            {/* District 4: Oba & Kestel */}
            <div 
              onClick={() => {
                setFilter(prev => ({ ...prev, district: 'Oba' }));
                navigateTo('listings');
              }}
              className="group relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-900 cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <img
                src="/src/assets/images/timelapse_project_emerald_1793604907854.jpg"
                alt="Oba & Kestel"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 inset-x-4 text-white">
                <h3 className="font-bold text-base group-hover:text-amber-400 transition-colors">Oba & Kestel</h3>
                <p className="text-xs text-slate-300">Butik az katlı projeler, hastane & kolejler</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. WHY BUY REAL ESTATE IN ALANYA */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              Neden Alanya’da Yatırım?
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
              Yüksek Değer Artışı & Yıllık %8-12 Euro Bazlı Kira Getirisi
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Alanya, Gazipaşa Havalimanı’nın uluslararası uçuş ağı, 10 ayı aşkın güneşli mevsimi, gelişmiş sağlık altyapısı ve yabancı mülk edinimine açıklığı ile tüm Akdeniz havzasında en çok talep gören gayrimenkul merkezidir.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Gazipaşa-Alanya Havalimanına 20-30 dk mesafe</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Türk vatandaşlığı ve ikamet izni avantajı</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Gelişmiş otel konseptli rezidans altyapısı</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Avrupa standartlarında yaşam maliyeti konforu</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-2 shadow-lg"
            >
              <PhoneCall className="w-4 h-4" />
              Ücretsiz Yatırım Danışmanlığı Alın
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
