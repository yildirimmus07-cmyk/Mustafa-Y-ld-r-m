import React, { useState } from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import { PropertyCard } from '../components/PropertyCard';
import { 
  ArrowLeft, 
  MapPin, 
  Heart, 
  Share2, 
  Bed, 
  Maximize2, 
  Bath, 
  Building, 
  Calendar, 
  Waves, 
  Flame, 
  CheckCircle2, 
  Calculator, 
  Phone, 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  Compass,
  Check
} from 'lucide-react';

export const PropertyDetailPage: React.FC = () => {
  const { 
    properties, 
    selectedPropertyId, 
    navigateTo, 
    formatPrice, 
    isFavorite, 
    toggleFavorite,
    submitInquiry
  } = usePropertyContext();

  // Find selected property, or fallback to first
  const property = properties.find(p => p.id === selectedPropertyId) || properties[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);

  // Inquiry form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<'bilgi' | 'randevu' | 'fiyat_teklifi'>('randevu');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Mortgage Calculator state
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [loanTermYears, setLoanTermYears] = useState(10);
  const [interestRateMonthly, setInterestRateMonthly] = useState(1.4); // typical EUR/foreign or Turkish bank loan

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50">
        <div className="text-center">
          <p className="text-slate-600 mb-4">İlan bulunamadı.</p>
          <button 
            onClick={() => navigateTo('listings')}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs"
          >
            İlanlar Listesine Dön
          </button>
        </div>
      </div>
    );
  }

  const favorited = isFavorite(property.id);

  // Calculation for mortgage
  const price = property.priceEUR;
  const downPayment = (price * downPaymentPercent) / 100;
  const principal = price - downPayment;
  const totalMonths = loanTermYears * 12;
  const r = (interestRateMonthly / 100);
  // Monthly payment formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
  const monthlyPayment = r > 0 
    ? Math.round((principal * (r * Math.pow(1 + r, totalMonths))) / (Math.pow(1 + r, totalMonths) - 1))
    : Math.round(principal / totalMonths);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    submitInquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      fullName,
      email: email || 'Belirtilmedi',
      phone,
      inquiryType,
      message: message || `${property.refCode} kodlu ilan için randevu talebi oluşturuldu.`
    });

    setFormSubmitted(true);
    setTimeout(() => {
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setFormSubmitted(false);
    }, 4000);
  };

  // WhatsApp link generator with prefilled message
  const whatsappUrl = `https://wa.me/905000000000?text=${encodeURIComponent(
    `Merhaba Mustafa Yıldırım, AlanyaMYıldırım sitesinde yer alan "${property.title}" (Ref: ${property.refCode}) ilanı hakkında detaylı bilgi ve randevu rica ediyorum.`
  )}`;

  // Similar properties
  const similarProperties = properties
    .filter(p => p.id !== property.id && (p.location.district === property.location.district || p.type === property.type))
    .slice(0, 3);

  const imagesList = property.images && property.images.length > 0
    ? property.images
    : ['/src/assets/images/listing_mahmutlar_residence_1793604907502.jpg'];

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateTo('listings')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-amber-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tüm İlanlara Dön</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
              title="İlan Bağlantısını Kopyala"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedShare ? 'Kopyalandı!' : 'Paylaş'}</span>
            </button>

            <button
              onClick={() => toggleFavorite(property.id)}
              className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs ${
                favorited
                  ? 'bg-rose-50 border-rose-300 text-rose-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-rose-600'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`} />
              <span>{favorited ? 'Favorilerimde' : 'Favoriye Ekle'}</span>
            </button>
          </div>
        </div>

        {/* Title & Ref Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  Ref: {property.refCode}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-amber-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {property.location.district}, {property.location.city}
                </span>
                <span aria-hidden="true">·</span>
                <span className="capitalize">{property.type}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-semibold">
                  {property.listingType === 'satilik' ? 'Satılık' : 'Kiralık'}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {property.title}
              </h1>
            </div>

            {/* Price Box */}
            <div className="lg:text-right shrink-0">
              <div className="text-xs text-slate-500 font-medium">
                {property.listingType === 'kiralik' ? 'Aylık Kira Bedeli' : 'Portföy Satış Fiyatı'}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
                {formatPrice(property.priceEUR)}
              </div>
              {property.aidatMonthlyEUR > 0 && (
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                  Aylık Aidat: €{property.aidatMonthlyEUR}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PHOTO GALLERY SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
          {/* Main Large Image */}
          <div className="lg:col-span-9 aspect-16/9 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 relative group shadow-sm">
            <img
              src={imagesList[activeImageIndex] || imagesList[0]}
              alt={property.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-300"
            />
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-medium">
              Fotoğraf {activeImageIndex + 1} / {imagesList.length}
            </div>
          </div>

          {/* Thumbnails Column */}
          <div className="lg:col-span-3 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible">
            {imagesList.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-16/10 rounded-xl overflow-hidden border-2 transition-all shrink-0 w-28 lg:w-full ${
                  activeImageIndex === idx
                    ? 'border-amber-600 ring-2 ring-amber-500/30'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Görsel ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* TWO-COLUMN DETAILS & AGENT FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 8 COLS: Specs, Description, Features, Mortgage */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* KEY SPECS BADGES GRID */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                Mülk Temel Özellikleri
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <Bed className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Oda Sayısı</div>
                    <div className="text-xs font-bold text-slate-900">{property.rooms}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <Maximize2 className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Brüt Alan</div>
                    <div className="text-xs font-bold text-slate-900">{property.areaM2} m²</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <Bath className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Banyo</div>
                    <div className="text-xs font-bold text-slate-900">{property.bathrooms} Banyo</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <Building className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Kat Durumu</div>
                    <div className="text-xs font-bold text-slate-900">{property.floor}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Bina Yaşı</div>
                    <div className="text-xs font-bold text-slate-900">{property.buildingAge}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <Waves className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Denize Mesafe</div>
                    <div className="text-xs font-bold text-slate-900">{property.location.distanceToSeaMeters} Metre</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <Flame className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Isıtma Tipi</div>
                    <div className="text-xs font-bold text-slate-900 truncate">{property.heating}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Eşya Durumu</div>
                    <div className="text-xs font-bold text-slate-900">{property.furnished}</div>
                  </div>
                </div>

              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 mb-4">
                İlan Açıklaması & Detaylar
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line mb-6">
                {property.description}
              </p>

              <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-200/50 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <span className="font-bold">Hukuki Güvence:</span> Bu gayrimenkulün mülkiyet durumu, iskan belgesi ve borçsuzluk kaydı hukuk müşavirimiz tarafından doğrulanmıştır. Satış ve devir işlemleri Alanya Tapu Müdürlüğü nezdinde şeffafça yürütülmektedir.
                </div>
              </div>
            </div>

            {/* FEATURES CHECKLIST */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 mb-4">
                Site & Gayrimenkul Olanakları
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* MORTGAGE / FINANCING CALCULATOR */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 mb-2">
                <Calculator className="w-5 h-5 text-amber-600" />
                <span>Kredi & Taksit Hesaplama Aracı</span>
              </div>
              <p className="text-xs text-slate-500 mb-6">
                Mülk bedeli üzerinden örnek peşinat ve aylık finansman simülasyonu yapın.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {/* Down payment */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Peşinat Oranı</span>
                    <span>%{downPaymentPercent} (€{Math.round(downPayment).toLocaleString()})</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>

                {/* Term */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Vade Süresi</span>
                    <span>{loanTermYears} Yıl ({totalMonths} Ay)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={loanTermYears}
                    onChange={(e) => setLoanTermYears(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Aylık Faiz Oranı</span>
                    <span>%{interestRateMonthly}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="3.0"
                    step="0.1"
                    value={interestRateMonthly}
                    onChange={(e) => setInterestRateMonthly(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Calculation Result */}
              <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] text-slate-400">Tahmini Aylık Taksit:</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
                    €{monthlyPayment.toLocaleString('tr-TR')} / Ay
                  </div>
                </div>
                <div className="text-xs text-slate-300 text-center sm:text-right">
                  <div>Kullanılacak Kredi: <span className="font-mono text-white font-bold">€{Math.round(principal).toLocaleString()}</span></div>
                  <div>Toplam Geri Ödeme: <span className="font-mono text-white font-bold">€{(monthlyPayment * totalMonths).toLocaleString()}</span></div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT 4 COLS: STICKY AGENT CONTACT & INQUIRY FORM */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            
            {/* AGENT CARD */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-14 h-14 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-lg border-2 border-amber-500 shrink-0">
                  MY
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Mustafa Yıldırım</h3>
                  <div className="text-xs text-slate-500">Gayrimenkul & Yatırım Danışmanı</div>
                  <div className="text-[11px] text-amber-600 font-semibold mt-0.5">myildirim2024@ogr.iu.edu.tr</div>
                </div>
              </div>

              {/* Fast Direct Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-4 mb-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
                <a
                  href="tel:+90200000000"
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +90 (200) 00 00 00
                </a>
              </div>

              {/* INQUIRY FORM */}
              <form onSubmit={handleFormSubmit} className="space-y-3 pt-2">
                <div className="text-xs font-bold text-slate-800">
                  Randevu & Bilgi Formu
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Adınız ve Soyadınız *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Telefon Numaranız (+90...) *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="E-posta Adresiniz (Opsiyonel)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="randevu">Mülkü Yerinde Görmek İstiyorum</option>
                    <option value="bilgi">Detaylı Kat Planı & Bilgi İstiyorum</option>
                    <option value="fiyat_teklifi">Fiyat Teklifi Vermek İstiyorum</option>
                  </select>
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Mesajınız veya sormak istedikleriniz..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  Talep Gönder
                </button>

                {formSubmitted && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium text-center animate-fade-in">
                    Talebiniz danışmanımıza başarıyla iletildi. En kısa sürede sizinle iletişime geçilecektir.
                  </div>
                )}
              </form>

            </div>

          </div>

        </div>

        {/* SIMILAR PROPERTIES */}
        {similarProperties.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Bu İlana Benzer Diğer Fırsatlar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
