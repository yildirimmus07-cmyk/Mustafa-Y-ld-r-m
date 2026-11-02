import React, { useState, useRef } from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import { Property, PropertyType, ListingType, Inquiry, TimelapseProject } from '../types/property';
import { ALANYA_DISTRICTS, PROPERTY_TYPES, ROOM_OPTIONS } from '../data/initialProperties';
import { 
  Building2, 
  Plus, 
  Edit3, 
  Trash2, 
  Star, 
  Search, 
  RotateCcw, 
  LogOut, 
  Check, 
  X, 
  Eye, 
  MessageSquare, 
  FileText, 
  TrendingUp, 
  Home, 
  Waves, 
  ShieldCheck, 
  Calendar,
  AlertTriangle,
  UploadCloud,
  Video,
  ImageIcon,
  Settings,
  HardHat,
  Save,
  CheckCircle2,
  Film
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { 
    properties, 
    addProperty, 
    updateProperty, 
    deleteProperty, 
    resetToDefaultData, 
    isAdminLoggedIn, 
    logoutAdmin, 
    navigateTo, 
    formatPrice,
    inquiries,
    updateInquiryStatus,
    siteSettings,
    updateSiteSettings,
    timelapseProjects,
    updateTimelapseProject,
    addTimelapseProject,
    deleteTimelapseProject
  } = usePropertyContext();

  const [activeTab, setActiveTab] = useState<'listings' | 'homepage' | 'timelapse' | 'inquiries'>('listings');
  const [adminSearch, setAdminSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  
  // Property Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  // Property Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formRefCode, setFormRefCode] = useState('');
  const [formListingType, setFormListingType] = useState<ListingType>('satilik');
  const [formType, setFormType] = useState<PropertyType>('daire');
  const [formPriceEUR, setFormPriceEUR] = useState<number>(150000);
  const [formDistrict, setFormDistrict] = useState('Mahmutlar');
  const [formAddress, setFormAddress] = useState('');
  const [formDistanceToSea, setFormDistanceToSea] = useState<number>(300);
  const [formAreaM2, setFormAreaM2] = useState<number>(110);
  const [formRooms, setFormRooms] = useState('2+1');
  const [formBathrooms, setFormBathrooms] = useState<number>(2);
  const [formFloor, setFormFloor] = useState('4. Kat');
  const [formBuildingAge, setFormBuildingAge] = useState('0 (Sıfır)');
  const [formHeating, setFormHeating] = useState('Klima');
  const [formAidatMonthlyEUR, setFormAidatMonthlyEUR] = useState<number>(50);
  const [formCitizenship, setFormCitizenship] = useState(false);
  const [formFurnished, setFormFurnished] = useState<'Tam Eşyalı' | 'Kısmen Eşyalı' | 'Boş / Sıfır'>('Tam Eşyalı');
  const [formFeatures, setFormFeatures] = useState<string>('Açık Yüzme Havuzu, Fitness Salonu, Sauna, 7/24 Güvenlik, Otopark');
  const [formImages, setFormImages] = useState<string>('/src/assets/images/listing_mahmutlar_residence_1793604907502.jpg');
  const [formVideoUrl, setFormVideoUrl] = useState<string>('');
  const [formDescription, setFormDescription] = useState('');
  const [formIsFeatured, setFormIsFeatured] = useState(false);

  // Delete confirmation modal state
  const [deletingPropertyId, setDeletingPropertyId] = useState<string | null>(null);

  // Homepage Settings Local Form State
  const [settingsSiteName, setSettingsSiteName] = useState(siteSettings.siteName);
  const [settingsHeroTitle, setSettingsHeroTitle] = useState(siteSettings.heroTitle);
  const [settingsHeroSubtitle, setSettingsHeroSubtitle] = useState(siteSettings.heroSubtitle);
  const [settingsHeroImage, setSettingsHeroImage] = useState(siteSettings.heroImage);
  const [settingsHeroVideoUrl, setSettingsHeroVideoUrl] = useState(siteSettings.heroVideoUrl || '');
  const [settingsPhoneLandline, setSettingsPhoneLandline] = useState(siteSettings.phoneLandline);
  const [settingsPhoneMobile, setSettingsPhoneMobile] = useState(siteSettings.phoneMobile);
  const [settingsEmail, setSettingsEmail] = useState(siteSettings.email);
  const [settingsLicenseNo, setSettingsLicenseNo] = useState(siteSettings.licenseNo);
  const [settingsExperienceYears, setSettingsExperienceYears] = useState(siteSettings.experienceYears);
  const [settingsSuccessfulDeeds, setSettingsSuccessfulDeeds] = useState(siteSettings.successfulDeeds);
  const [settingsSatisfactionRate, setSettingsSatisfactionRate] = useState(siteSettings.satisfactionRate);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Timelapse Project Modal Form State
  const [isTimelapseModalOpen, setIsTimelapseModalOpen] = useState(false);
  const [editingTimelapseId, setEditingTimelapseId] = useState<string | null>(null);
  const [tlTitle, setTlTitle] = useState('');
  const [tlDistrict, setTlDistrict] = useState('Kargıcak / Alanya');
  const [tlDeliveryDate, setTlDeliveryDate] = useState('Aralık 2026');
  const [tlTotalUnits, setTlTotalUnits] = useState(120);
  const [tlProgressPercent, setTlProgressPercent] = useState(80);
  const [tlHeroImage, setTlHeroImage] = useState('/src/assets/images/timelapse_project_emerald_1793604907854.jpg');
  const [tlVideoUrl, setTlVideoUrl] = useState('');
  const [tlDescription, setTlDescription] = useState('');

  // File Upload Input Refs
  const heroImageFileInputRef = useRef<HTMLInputElement | null>(null);
  const heroVideoFileInputRef = useRef<HTMLInputElement | null>(null);
  const propImagesFileInputRef = useRef<HTMLInputElement | null>(null);
  const propVideoFileInputRef = useRef<HTMLInputElement | null>(null);
  const tlVideoFileInputRef = useRef<HTMLInputElement | null>(null);
  const tlHeroImageFileInputRef = useRef<HTMLInputElement | null>(null);

  // File upload handlers (direct from user's disk/phone)
  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSettingsHeroImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleHeroVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSettingsHeroVideoUrl(url);
    e.target.value = '';
  };

  const handlePropertyImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormImages((prev) => {
            const arr = prev ? prev.split(',').map(s => s.trim()).filter(Boolean) : [];
            arr.push(event.target!.result as string);
            return arr.join(', ');
          });
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handlePropertyVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFormVideoUrl(url);
    e.target.value = '';
  };

  const handleTimelapseVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setTlVideoUrl(url);
    e.target.value = '';
  };

  const handleTimelapseHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setTlHeroImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // If not logged in, show access barrier
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-xl text-center">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-100">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Yönetici Girişi Gerekli</h2>
          <p className="text-xs text-slate-500 mb-6">
            Bu yönetim paneline erişmek için yetkili yönetici şifresiyle oturum açmalısınız.
          </p>
          <button
            onClick={() => navigateTo('login')}
            className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 transition-colors"
          >
            Giriş Sayfasına Git &rarr;
          </button>
        </div>
      </div>
    );
  }

  // Statistics calculation
  const totalListings = properties.length;
  const satilikCount = properties.filter(p => p.listingType === 'satilik').length;
  const kiralikCount = properties.filter(p => p.listingType === 'kiralik').length;
  const totalPortfolioValueEUR = properties
    .filter(p => p.listingType === 'satilik')
    .reduce((acc, curr) => acc + curr.priceEUR, 0);
  const pendingInquiriesCount = inquiries.filter(i => i.status === 'yeni').length;

  // Filter listings
  const filteredAdminListings = properties.filter(p => {
    if (filterType !== 'all' && p.listingType !== filterType) return false;
    if (adminSearch.trim()) {
      const q = adminSearch.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.refCode.toLowerCase().includes(q) ||
        p.location.district.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Open Property Add Modal
  const handleOpenAddModal = () => {
    setEditingPropertyId(null);
    setFormTitle('');
    setFormRefCode(`ALN-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormListingType('satilik');
    setFormType('daire');
    setFormPriceEUR(165000);
    setFormDistrict('Mahmutlar');
    setFormAddress('Alanya Sahil Yolu');
    setFormDistanceToSea(200);
    setFormAreaM2(110);
    setFormRooms('2+1');
    setFormBathrooms(2);
    setFormFloor('5. Kat');
    setFormBuildingAge('0 (Sıfır)');
    setFormHeating('Klima');
    setFormAidatMonthlyEUR(45);
    setFormCitizenship(false);
    setFormFurnished('Tam Eşyalı');
    setFormFeatures('Açık Yüzme Havuzu, Fitness Salonu, Sauna, Kapalı Otopark, 7/24 Güvenlik');
    setFormImages('/src/assets/images/listing_mahmutlar_residence_1793604907502.jpg');
    setFormVideoUrl('');
    setFormDescription('AlanyaMYıldırım portföyünde yer alan lüks, konforlu ve yüksek kira getirili daire.');
    setFormIsFeatured(false);
    setIsModalOpen(true);
  };

  // Open Property Edit Modal
  const handleOpenEditModal = (prop: Property) => {
    setEditingPropertyId(prop.id);
    setFormTitle(prop.title);
    setFormRefCode(prop.refCode);
    setFormListingType(prop.listingType);
    setFormType(prop.type);
    setFormPriceEUR(prop.priceEUR);
    setFormDistrict(prop.location.district);
    setFormAddress(prop.location.address || '');
    setFormDistanceToSea(prop.location.distanceToSeaMeters);
    setFormAreaM2(prop.areaM2);
    setFormRooms(prop.rooms);
    setFormBathrooms(prop.bathrooms);
    setFormFloor(prop.floor);
    setFormBuildingAge(prop.buildingAge);
    setFormHeating(prop.heating);
    setFormAidatMonthlyEUR(prop.aidatMonthlyEUR);
    setFormCitizenship(prop.citizenshipEligible);
    setFormFurnished(prop.furnished);
    setFormFeatures(prop.features.join(', '));
    setFormImages(prop.images.join(', '));
    setFormVideoUrl(prop.videoUrl || '');
    setFormDescription(prop.description);
    setFormIsFeatured(prop.isFeatured);
    setIsModalOpen(true);
  };

  // Save Property
  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();

    const featuresArray = formFeatures
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const imagesArray = formImages
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const propertyPayload = {
      title: formTitle,
      refCode: formRefCode || `ALN-${Math.floor(1000 + Math.random() * 9000)}`,
      listingType: formListingType,
      type: formType,
      priceEUR: Number(formPriceEUR),
      location: {
        district: formDistrict,
        city: 'Alanya / Antalya',
        distanceToSeaMeters: Number(formDistanceToSea),
        address: formAddress
      },
      areaM2: Number(formAreaM2),
      rooms: formRooms,
      bathrooms: Number(formBathrooms),
      floor: formFloor,
      buildingAge: formBuildingAge,
      heating: formHeating,
      aidatMonthlyEUR: Number(formAidatMonthlyEUR),
      citizenshipEligible: formCitizenship,
      residencePermitEligible: true,
      furnished: formFurnished,
      features: featuresArray.length > 0 ? featuresArray : ['Açık Havuz', 'Güvenlik', 'Otopark'],
      images: imagesArray.length > 0 ? imagesArray : ['/src/assets/images/listing_mahmutlar_residence_1793604907502.jpg'],
      videoUrl: formVideoUrl.trim() || undefined,
      description: formDescription,
      isFeatured: formIsFeatured
    };

    if (editingPropertyId) {
      updateProperty(editingPropertyId, propertyPayload);
    } else {
      addProperty(propertyPayload);
    }

    setIsModalOpen(false);
  };

  // Delete Property
  const handleDeleteConfirm = () => {
    if (deletingPropertyId) {
      deleteProperty(deletingPropertyId);
      setDeletingPropertyId(null);
    }
  };

  // Save Homepage & Settings
  const handleSaveHomepageSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      siteName: settingsSiteName,
      heroTitle: settingsHeroTitle,
      heroSubtitle: settingsHeroSubtitle,
      heroImage: settingsHeroImage,
      heroVideoUrl: settingsHeroVideoUrl.trim() || undefined,
      phoneLandline: settingsPhoneLandline,
      phoneMobile: settingsPhoneMobile,
      email: settingsEmail,
      licenseNo: settingsLicenseNo,
      experienceYears: Number(settingsExperienceYears),
      successfulDeeds: Number(settingsSuccessfulDeeds),
      satisfactionRate: settingsSatisfactionRate
    });

    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3000);
  };

  // Open Timelapse Modal
  const handleOpenAddTimelapse = () => {
    setEditingTimelapseId(null);
    setTlTitle('');
    setTlDistrict('Kargıcak / Alanya');
    setTlDeliveryDate('2027');
    setTlTotalUnits(80);
    setTlProgressPercent(75);
    setTlHeroImage('/src/assets/images/timelapse_project_emerald_1793604907854.jpg');
    setTlVideoUrl('');
    setTlDescription('Alanya şantiyesinde yükselen modern rezidans projesi.');
    setIsTimelapseModalOpen(true);
  };

  const handleOpenEditTimelapse = (proj: TimelapseProject) => {
    setEditingTimelapseId(proj.id);
    setTlTitle(proj.title);
    setTlDistrict(proj.district);
    setTlDeliveryDate(proj.deliveryDate);
    setTlTotalUnits(proj.totalUnits);
    setTlProgressPercent(proj.currentProgressPercent);
    setTlHeroImage(proj.heroImage);
    setTlVideoUrl(proj.videoUrl || '');
    setTlDescription(proj.description);
    setIsTimelapseModalOpen(true);
  };

  const handleSaveTimelapse = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTimelapseId) {
      updateTimelapseProject(editingTimelapseId, {
        title: tlTitle,
        district: tlDistrict,
        deliveryDate: tlDeliveryDate,
        totalUnits: Number(tlTotalUnits),
        currentProgressPercent: Number(tlProgressPercent),
        heroImage: tlHeroImage,
        videoUrl: tlVideoUrl.trim() || undefined,
        description: tlDescription
      });
    } else {
      addTimelapseProject({
        title: tlTitle,
        district: tlDistrict,
        deliveryDate: tlDeliveryDate,
        totalUnits: Number(tlTotalUnits),
        currentProgressPercent: Number(tlProgressPercent),
        heroImage: tlHeroImage,
        videoUrl: tlVideoUrl.trim() || undefined,
        description: tlDescription,
        milestones: [
          {
            stage: 'Aşama 1',
            title: 'Temel & Kaba İnşaat',
            date: '2025',
            description: 'Zemin kazısı ve betonarme karkas.',
            image: tlHeroImage,
            progressPercent: 30,
            concretePercent: 40,
            facadePercent: 10,
            interiorPercent: 0
          },
          {
            stage: 'Aşama 2 (Güncel)',
            title: 'Dış Cephe & İnce İşler',
            date: '2026',
            description: 'Cam cephe montajı ve havuz tesisatı.',
            image: tlHeroImage,
            progressPercent: Number(tlProgressPercent),
            concretePercent: 100,
            facadePercent: 80,
            interiorPercent: 65
          }
        ]
      });
    }
    setIsTimelapseModalOpen(false);
  };

  return (
    <div className="bg-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Bar */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
              Mustafa Yıldırım Yönetim & Kontrol Paneli
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {siteSettings.siteName} Emlak & Medya Yönetimi
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni İlan Ekle</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Tüm ilanlar, site ayarları ve timelapse projeleri varsayılan verilere sıfırlansın mı?')) {
                  resetToDefaultData();
                }
              }}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors border border-slate-200 flex items-center gap-1.5"
              title="Varsayılan Verileri Sıfırla"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Sıfırla</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="px-3.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs rounded-xl transition-colors border border-rose-200 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>

        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-medium text-slate-500 mb-1">Toplam İlan</div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">{totalListings}</div>
            <div className="text-[11px] text-slate-400 mt-1">Aktif yayında</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-medium text-slate-500 mb-1">Satılık Portföy</div>
            <div className="text-2xl font-extrabold text-amber-600 font-mono">{satilikCount}</div>
            <div className="text-[11px] text-slate-400 mt-1">Villa, Daire, Arsa</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-medium text-slate-500 mb-1">Kiralık Portföy</div>
            <div className="text-2xl font-extrabold text-emerald-600 font-mono">{kiralikCount}</div>
            <div className="text-[11px] text-slate-400 mt-1">Aylık / Sezonluk</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-medium text-slate-500 mb-1">Portföy Hacmi</div>
            <div className="text-lg font-extrabold text-slate-900 font-mono truncate">
              €{totalPortfolioValueEUR.toLocaleString('tr-TR')}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Toplam satış değeri</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs font-medium text-slate-500 mb-1">Müşteri Talepleri</div>
            <div className="text-2xl font-extrabold text-purple-600 font-mono">{inquiries.length}</div>
            <div className="text-[11px] text-slate-400 mt-1">
              {pendingInquiriesCount} adet yeni bekliyor
            </div>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex flex-wrap border-b border-slate-200 gap-6">
          <button
            onClick={() => setActiveTab('listings')}
            className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-2 ${
              activeTab === 'listings'
                ? 'text-slate-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Home className="w-4 h-4 text-amber-600" />
            <span>İlan Yönetimi ({properties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('homepage')}
            className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-2 ${
              activeTab === 'homepage'
                ? 'text-slate-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-blue-600" />
            <span>Ana Sayfa Görselleri & Ayarlar</span>
          </button>

          <button
            onClick={() => setActiveTab('timelapse')}
            className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-2 ${
              activeTab === 'timelapse'
                ? 'text-slate-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Video className="w-4 h-4 text-emerald-600" />
            <span>Timelapse Projeleri & Videolar ({timelapseProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'text-slate-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-purple-600" />
            <span>Müşteri Talepleri & Randevular</span>
            {pendingInquiriesCount > 0 && (
              <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {pendingInquiriesCount}
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: LISTINGS MANAGEMENT */}
        {activeTab === 'listings' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            
            {/* Table Search & Filter Toolbar */}
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  placeholder="Başlık, Ref No veya Bölge ara..."
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 pl-8"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Tür:</span>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="all">Tüm İlanlar</option>
                  <option value="satilik">Sadece Satılık</option>
                  <option value="kiralik">Sadece Kiralık</option>
                </select>
              </div>
            </div>

            {/* Listings Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Görsel / Ref</th>
                    <th className="py-3 px-4">İlan Başlığı</th>
                    <th className="py-3 px-4">Bölge & Tip</th>
                    <th className="py-3 px-4">Oda & m²</th>
                    <th className="py-3 px-4">Fiyat (€)</th>
                    <th className="py-3 px-4">Öne Çıkan</th>
                    <th className="py-3 px-4 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredAdminListings.map((prop) => (
                    <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* Image & Ref */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={prop.images[0] || '/src/assets/images/listing_mahmutlar_residence_1793604907502.jpg'}
                            alt={prop.title}
                            className="w-12 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                            {prop.refCode}
                          </span>
                        </div>
                      </td>

                      {/* Title */}
                      <td className="py-3 px-4 max-w-xs">
                        <div className="font-bold text-slate-900 line-clamp-1">{prop.title}</div>
                        <div className="text-[11px] text-slate-400">
                          {prop.buildingAge} · {prop.floor} {prop.videoUrl ? '· 🎥 Video Var' : ''}
                        </div>
                      </td>

                      {/* District & Type */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-semibold text-slate-800">{prop.location.district}</div>
                        <div className="text-[11px] text-amber-700 uppercase font-bold">
                          {prop.listingType} ({prop.type})
                        </div>
                      </td>

                      {/* Rooms & Area */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div>{prop.rooms}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{prop.areaM2} m²</div>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 whitespace-nowrap font-mono font-bold text-slate-900 text-sm">
                        €{prop.priceEUR.toLocaleString('tr-TR')}
                      </td>

                      {/* Featured toggle */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <button
                          onClick={() => updateProperty(prop.id, { isFeatured: !prop.isFeatured })}
                          className={`p-1.5 rounded-lg transition-colors ${
                            prop.isFeatured 
                              ? 'bg-amber-100 text-amber-700' 
                              : 'bg-slate-100 text-slate-400 hover:text-slate-600'
                          }`}
                          title={prop.isFeatured ? 'Öne Çıkarıldı (Kaldır)' : 'Öne Çıkar'}
                        >
                          <Star className={`w-4 h-4 ${prop.isFeatured ? 'fill-current' : ''}`} />
                        </button>
                      </td>

                      {/* Action buttons */}
                      <td className="py-3 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigateTo('property-detail', prop.id)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Sitede Görüntüle"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleOpenEditModal(prop)}
                            className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            title="İlanı & Görsellerini Düzenle"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeletingPropertyId(prop.id)}
                            className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors"
                            title="İlanı Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAdminListings.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-500">
                Arama kriterine uygun ilan bulunamadı.
              </div>
            )}

          </div>
        )}

        {/* TAB 2: HOMEPAGE VISUALS & SETTINGS */}
        {activeTab === 'homepage' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                <span>Ana Sayfa Görselleri, Video ve Kurumsal Bilgiler</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Buradan ana sayfa hero görselini, canlı arka plan videosunu ve şirket bilgilerini dilediğiniz gibi güncelleyebilirsiniz.
              </p>
            </div>

            <form onSubmit={handleSaveHomepageSettings} className="space-y-6">
              
              {/* Hero Visual Settings */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Film className="w-4 h-4 text-amber-600" />
                  <span>Ana Sayfa Hero Medya Ayarları</span>
                </h3>

                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 leading-relaxed">
                  <span className="font-bold">⚠️ Medya İzolasyon Güvencesi:</span> Buraya yükleyeceğiniz ana sayfa görseli veya videosu yalnızca ana sayfa karşılama ekranında gösterilir. Portföydeki emlak ilanlarının ve projelerin görsellerini <u>asla değiştirmez</u>; her içerik bağımsızdır.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Hero Arka Plan Görseli
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="file"
                        ref={heroImageFileInputRef}
                        accept="image/*"
                        onChange={handleHeroImageUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => heroImageFileInputRef.current?.click()}
                        className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <UploadCloud className="w-4 h-4" />
                        <span>📁 Bilgisayardan Görsel Yükle</span>
                      </button>
                      <span className="text-[11px] text-slate-500 truncate">veya URL girin</span>
                    </div>

                    <input
                      type="text"
                      value={settingsHeroImage}
                      onChange={(e) => setSettingsHeroImage(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                      placeholder="Görsel URL veya /src/assets/images/..."
                    />
                    <div className="mt-2 aspect-16/9 rounded-lg overflow-hidden bg-slate-200 border border-slate-300 max-w-xs">
                      <img
                        src={settingsHeroImage}
                        alt="Hero Önizleme"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/src/assets/images/hero_alanya_villa_1793604906893.jpg';
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Hero Canlı Arka Plan Videosu
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="file"
                        ref={heroVideoFileInputRef}
                        accept="video/*"
                        onChange={handleHeroVideoUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => heroVideoFileInputRef.current?.click()}
                        className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Video className="w-4 h-4" />
                        <span>📁 Video Dosyası Seç (.mp4, .webm)</span>
                      </button>
                      <span className="text-[11px] text-slate-500 truncate">veya URL</span>
                    </div>

                    <input
                      type="text"
                      value={settingsHeroVideoUrl}
                      onChange={(e) => setSettingsHeroVideoUrl(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                      placeholder="Örn: https://www.w3schools.com/html/mov_bbb.mp4 veya YouTube linki"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Video yüklediğinizde veya link girdiğinizde ana sayfa arka planında otomatik olarak sessiz döngüde oynatılır.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Hero Ana Başlığı
                    </label>
                    <input
                      type="text"
                      value={settingsHeroTitle}
                      onChange={(e) => setSettingsHeroTitle(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Hero Alt Açıklaması
                    </label>
                    <input
                      type="text"
                      value={settingsHeroSubtitle}
                      onChange={(e) => setSettingsHeroSubtitle(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Corporate & Identity Settings */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Şirket ve İletişim Bilgileri (Mustafa Yıldırım)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Site & Marka İsmi
                    </label>
                    <input
                      type="text"
                      value={settingsSiteName}
                      onChange={(e) => setSettingsSiteName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Santral Telefonu
                    </label>
                    <input
                      type="text"
                      value={settingsPhoneLandline}
                      onChange={(e) => setSettingsPhoneLandline(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobil & WhatsApp Numarası
                    </label>
                    <input
                      type="text"
                      value={settingsPhoneMobile}
                      onChange={(e) => setSettingsPhoneMobile(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kurumsal E-Posta
                    </label>
                    <input
                      type="email"
                      value={settingsEmail}
                      onChange={(e) => setSettingsEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Taşınmaz Ticareti Yetki Belgesi No
                    </label>
                    <input
                      type="text"
                      value={settingsLicenseNo}
                      onChange={(e) => setSettingsLicenseNo(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Yıllık Tecrübe
                    </label>
                    <input
                      type="number"
                      value={settingsExperienceYears}
                      onChange={(e) => setSettingsExperienceYears(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Başarılı Tapu Devri Sayısı
                    </label>
                    <input
                      type="number"
                      value={settingsSuccessfulDeeds}
                      onChange={(e) => setSettingsSuccessfulDeeds(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Müşteri Memnuniyet Oranı
                    </label>
                    <input
                      type="text"
                      value={settingsSatisfactionRate}
                      onChange={(e) => setSettingsSatisfactionRate(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                {settingsSavedToast && (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Ayarlar ve görseller başarıyla güncellendi!</span>
                  </div>
                )}
                {!settingsSavedToast && <div />}

                <button
                  type="submit"
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors ml-auto"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>Ayarları Kaydet ve Uygula</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 3: TIMELAPSE PROJECTS & VIDEOS */}
        {activeTab === 'timelapse' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Video className="w-5 h-5 text-emerald-600" />
                  <span>9:16 Dikey Timelapse Projeleri & Video Yönetimi</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Şantiyelerinize ait 9:16 dikey timelapse videolarını yükleyin. Ziyaretçiler sitede yalnızca izleyebilir, video ekleme/düzenleme yetkisi sadece bu paneldedir.
                </p>
              </div>

              <button
                onClick={handleOpenAddTimelapse}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 shadow-xs shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Yeni Proje / 9:16 Video Ekle</span>
              </button>
            </div>

            {/* 9:16 Format Guidance Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-950 flex items-start gap-3">
              <Film className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-bold">📱 9:16 Dikey Format Zorunluluğu:</span> Sitedeki timelapse oynatıcı ve kartlar 9:16 dikey formattadır. Telefonunuzla veya kameranızla dikey çekilmiş videoları (`.mp4`, `.mov`, `.webm`) veya dikey YouTube Shorts linklerini yükleyebilirsiniz. Ziyaretçilerin arayüzünde yükleme veya silme butonu bulunmaz.
              </div>
            </div>

            {/* Timelapse Projects Grid in 9:16 Vertical Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {timelapseProjects.map((proj) => (
                <div key={proj.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between">
                  <div>
                    {/* 9:16 Vertical Thumbnail Preview */}
                    <div className="aspect-[9/16] rounded-xl overflow-hidden bg-black mb-3 relative group">
                      <img
                        src={proj.heroImage}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                      <div className="absolute top-2.5 right-2.5">
                        {proj.videoUrl ? (
                          <div className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                            <Video className="w-3 h-3" />
                            <span>9:16 Video Yüklü</span>
                          </div>
                        ) : (
                          <div className="bg-black/70 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                            Video Bekleniyor
                          </div>
                        )}
                      </div>

                      <div className="absolute bottom-2.5 inset-x-2.5 text-white">
                        <div className="text-[10px] font-semibold text-amber-400">{proj.district}</div>
                        <div className="text-xs font-bold truncate">{proj.title}</div>
                        <div className="text-[10px] text-slate-300 font-mono mt-0.5">İlerleme: %{proj.currentProgressPercent}</div>
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1">{proj.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">{proj.description}</p>

                    {proj.videoUrl && (
                      <div className="p-2 bg-white rounded-lg border border-slate-200 text-[10px] font-mono text-slate-600 mb-3 truncate">
                        🎥 {proj.videoUrl}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <button
                      onClick={() => navigateTo('timelapse')}
                      className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Sitede Gör</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditTimelapse(proj)}
                        className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-blue-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>9:16 Video Düzenle</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`"${proj.title}" projesini silmek istediğinize emin misiniz?`)) {
                            deleteTimelapseProject(proj.id);
                          }
                        }}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Projeyi Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: INQUIRIES & APPOINTMENTS INBOX */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900 mb-2">
              Müşteri Randevu ve İletişim Talepleri ({inquiries.length})
            </h2>

            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div 
                  key={inq.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    inq.status === 'yeni'
                      ? 'bg-amber-50/40 border-amber-200'
                      : inq.status === 'cevaplandi'
                      ? 'bg-emerald-50/20 border-emerald-200'
                      : 'bg-slate-50 border-slate-200 opacity-75'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{inq.fullName}</span>
                      <span className="text-[11px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">
                        {inq.inquiryType}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-400 font-mono text-[11px]">{inq.date}</span>
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                        className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-800"
                      >
                        <option value="yeni">Yeni</option>
                        <option value="cevaplandi">Cevaplandı</option>
                        <option value="arsivlendi">Arşivlendi</option>
                      </select>
                    </div>
                  </div>

                  {inq.propertyTitle && (
                    <div className="text-xs text-amber-800 font-semibold mb-2">
                      İlgilenilen Mülk: {inq.propertyTitle}
                    </div>
                  )}

                  <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-100 mb-3">
                    "{inq.message}"
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
                    <div>Telefon: <a href={`tel:${inq.phone}`} className="text-blue-600 hover:underline">{inq.phone}</a></div>
                    {inq.email && inq.email !== 'Belirtilmedi' && (
                      <div>E-posta: <a href={`mailto:${inq.email}`} className="text-blue-600 hover:underline">{inq.email}</a></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT PROPERTY FORM */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl my-8">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingPropertyId ? 'İlanı & Medyasını Düzenle' : 'Yeni Gayrimenkul İlanı Ekle'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    İlan detaylarını, fotoğraflarını ve özel video bağlantısını ekleyin.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProperty} className="space-y-4">
                
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    İlan Başlığı *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Mahmutlar Denize 200m Full Eşyalı 2+1 Lüks Daire"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Referans Kodu
                    </label>
                    <input
                      type="text"
                      value={formRefCode}
                      onChange={(e) => setFormRefCode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      İlan Durumu
                    </label>
                    <select
                      value={formListingType}
                      onChange={(e) => setFormListingType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold"
                    >
                      <option value="satilik">Satılık</option>
                      <option value="kiralik">Kiralık</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mülk Türü
                    </label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold"
                    >
                      <option value="daire">Daire</option>
                      <option value="villa">Villa & Müstakil</option>
                      <option value="penthouse">Penthouse / Dubleks</option>
                      <option value="arsa">Arsa</option>
                      <option value="ticari">Ticari</option>
                    </select>
                  </div>
                </div>

                {/* Price & District & Sea Distance */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Fiyat (EUR €) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formPriceEUR}
                      onChange={(e) => setFormPriceEUR(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Bölge / Mahalle
                    </label>
                    <select
                      value={formDistrict}
                      onChange={(e) => setFormDistrict(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold"
                    >
                      {ALANYA_DISTRICTS.filter(d => d !== 'Tümü').map((dist) => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Denize Mesafe (m)
                    </label>
                    <input
                      type="number"
                      value={formDistanceToSea}
                      onChange={(e) => setFormDistanceToSea(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                    />
                  </div>
                </div>

                {/* Rooms, Area, Bathrooms */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Oda Sayısı
                    </label>
                    <select
                      value={formRooms}
                      onChange={(e) => setFormRooms(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                    >
                      {ROOM_OPTIONS.filter(r => r !== 'Tümü').map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Brüt Metrekare (m²) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formAreaM2}
                      onChange={(e) => setFormAreaM2(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Banyo Sayısı
                    </label>
                    <input
                      type="number"
                      value={formBathrooms}
                      onChange={(e) => setFormBathrooms(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                    />
                  </div>
                </div>

                {/* Floor, Building Age, Furnished */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Bulunduğu Kat
                    </label>
                    <input
                      type="text"
                      value={formFloor}
                      onChange={(e) => setFormFloor(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Bina Yaşı
                    </label>
                    <input
                      type="text"
                      value={formBuildingAge}
                      onChange={(e) => setFormBuildingAge(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Eşya Durumu
                    </label>
                    <select
                      value={formFurnished}
                      onChange={(e) => setFormFurnished(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                    >
                      <option value="Tam Eşyalı">Tam Eşyalı</option>
                      <option value="Kısmen Eşyalı">Kısmen Eşyalı</option>
                      <option value="Boş / Sıfır">Boş / Sıfır</option>
                    </select>
                  </div>
                </div>

                {/* Image URLs & Direct File Upload */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      İlan Görselleri (Bağımsız Fotoğraflar)
                    </label>
                    <input
                      type="file"
                      ref={propImagesFileInputRef}
                      accept="image/*"
                      multiple
                      onChange={handlePropertyImagesUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => propImagesFileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>📁 Bilgisayardan Fotoğraf(lar) Seç</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={formImages}
                    onChange={(e) => setFormImages(e.target.value)}
                    placeholder="Fotoğraf URL'leri veya dosya yükleyin (virgülle ayırın)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono text-[11px]"
                  />
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                    <span>Hızlı Hazır Görseller:</span>
                    <button
                      type="button"
                      onClick={() => setFormImages('/src/assets/images/listing_cleopatra_penthouse_1793608562299.jpg')}
                      className="underline text-amber-700 cursor-pointer"
                    >
                      Kleopatra Penthouse
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => setFormImages('/src/assets/images/listing_bektas_mansion_1793608562116.jpg')}
                      className="underline text-amber-700 cursor-pointer"
                    >
                      Bektaş Malikane
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => setFormImages('/src/assets/images/listing_mahmutlar_residence_1793604907502.jpg')}
                      className="underline text-amber-700 cursor-pointer"
                    >
                      Mahmutlar Rezidans
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => setFormImages('/src/assets/images/listing_kargicak_villa_1793604907770.jpg')}
                      className="underline text-amber-700 cursor-pointer"
                    >
                      Kargıcak Villası
                    </button>
                  </div>
                </div>

                {/* Video URL & Direct Video File Upload */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      İlanın Özel Videosu (Opsiyonel)
                    </label>
                    <input
                      type="file"
                      ref={propVideoFileInputRef}
                      accept="video/*"
                      onChange={handlePropertyVideoUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => propVideoFileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Video className="w-3.5 h-3.5 text-blue-600" />
                      <span>📁 Video Dosyası Yükle</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={formVideoUrl}
                    onChange={(e) => setFormVideoUrl(e.target.value)}
                    placeholder="Video dosyası yükleyin veya MP4/YouTube bağlantısı girin"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono text-[11px]"
                  />
                </div>

                {/* Features (Comma separated) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Özellikler & Sosyal Alanlar (Virgülle Ayırın)
                  </label>
                  <input
                    type="text"
                    value={formFeatures}
                    onChange={(e) => setFormFeatures(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    İlan Açıklaması
                  </label>
                  <textarea
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                  />
                </div>

                {/* Checkboxes */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formCitizenship}
                      onChange={(e) => setFormCitizenship(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded"
                    />
                    <span>Türk Vatandaşlığına Uygun</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsFeatured}
                      onChange={(e) => setFormIsFeatured(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded"
                    />
                    <span>Ana Sayfada Öne Çıkar</span>
                  </label>
                </div>

                {/* Modal Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs"
                  >
                    <Check className="w-4 h-4" />
                    <span>{editingPropertyId ? 'Değişiklikleri Kaydet' : 'İlanı Yayınla'}</span>
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT TIMELAPSE PROJECT & VIDEO */}
        {isTimelapseModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl my-8">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingTimelapseId ? 'Timelapse Projesi & Video Düzenle' : 'Yeni Timelapse Projesi & Video Ekle'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    İnşaat projesine kendi MP4 video linkinizi veya YouTube linkinizi ekleyebilirsiniz.
                  </p>
                </div>
                <button
                  onClick={() => setIsTimelapseModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveTimelapse} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Proje Başlığı *
                  </label>
                  <input
                    type="text"
                    required
                    value={tlTitle}
                    onChange={(e) => setTlTitle(e.target.value)}
                    placeholder="Örn: Emerald Coast Suites & Villas"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Bölge / Konum
                    </label>
                    <input
                      type="text"
                      value={tlDistrict}
                      onChange={(e) => setTlDistrict(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Teslim Tarihi
                    </label>
                    <input
                      type="text"
                      value={tlDeliveryDate}
                      onChange={(e) => setTlDeliveryDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      İlerleme Yüzdesi (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={tlProgressPercent}
                      onChange={(e) => setTlProgressPercent(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Toplam Bağımsız Bölüm
                    </label>
                    <input
                      type="number"
                      value={tlTotalUnits}
                      onChange={(e) => setTlTotalUnits(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                    />
                  </div>
                </div>

                {/* 9:16 Video URL & Direct Video File Upload */}
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-amber-950 flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-amber-600" />
                      <span>9:16 Dikey Timelapse Videosu</span>
                    </label>
                    <input
                      type="file"
                      ref={tlVideoFileInputRef}
                      accept="video/*"
                      onChange={handleTimelapseVideoUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => tlVideoFileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>📁 9:16 Video Dosyası Seç</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={tlVideoUrl}
                    onChange={(e) => setTlVideoUrl(e.target.value)}
                    placeholder="Dikey video dosyası seçin veya 9:16 linki (MP4 / YouTube Shorts) yapıştırın"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono text-[11px]"
                  />
                  <p className="text-[11px] text-amber-900 leading-relaxed">
                    Videolar sitedeki dikey oynatıcıda 9:16 oranında (Reels / Shorts) gösterilir. Sitedeki ziyaretçiler yalnızca izleyebilir.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Proje Kapak Görseli
                    </label>
                    <input
                      type="file"
                      ref={tlHeroImageFileInputRef}
                      accept="image/*"
                      onChange={handleTimelapseHeroImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => tlHeroImageFileInputRef.current?.click()}
                      className="text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer flex items-center gap-1"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Görsel Dosyası Yükle</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={tlHeroImage}
                    onChange={(e) => setTlHeroImage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Proje Açıklaması
                  </label>
                  <textarea
                    rows={2}
                    value={tlDescription}
                    onChange={(e) => setTlDescription(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsTimelapseModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs"
                  >
                    <Check className="w-4 h-4" />
                    <span>Projeyi & Videoyu Kaydet</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {deletingPropertyId && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-xl text-center space-y-4">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">İlanı Silmek İstediğinize Emin misiniz?</h3>
              <p className="text-xs text-slate-500">
                Bu ilan portföyden ve siteden kalıcı olarak kaldırılacaktır.
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setDeletingPropertyId(null)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Vazgeç
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold"
                >
                  Evet, Sil
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
