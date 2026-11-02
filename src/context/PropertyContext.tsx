import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, Currency, PropertyFilter, Inquiry, TimelapseProject, SiteSettings } from '../types/property';
import { INITIAL_PROPERTIES, TIMELAPSE_PROJECTS, DEFAULT_SITE_SETTINGS } from '../data/initialProperties';

export type PageName =
  | 'home'
  | 'listings'
  | 'property-detail'
  | 'timelapse'
  | 'about'
  | 'services'
  | 'contact'
  | 'admin'
  | 'login';

interface PropertyContextType {
  siteSettings: SiteSettings;
  updateSiteSettings: (newSettings: Partial<SiteSettings>) => void;
  properties: Property[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceEUR: number) => string;
  activePage: PageName;
  selectedPropertyId: string | null;
  navigateTo: (page: PageName, propertyId?: string) => void;
  favorites: string[];
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  filter: PropertyFilter;
  setFilter: React.Dispatch<React.SetStateAction<PropertyFilter>>;
  resetFilter: () => void;
  filteredProperties: Property[];
  // Property CRUD
  addProperty: (prop: Omit<Property, 'id' | 'createdAt'>) => void;
  updateProperty: (id: string, prop: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  resetToDefaultData: () => void;
  // Admin Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  // Inquiries
  inquiries: Inquiry[];
  submitInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  // Timelapse CRUD
  timelapseProjects: TimelapseProject[];
  updateTimelapseProject: (id: string, project: Partial<TimelapseProject>) => void;
  addTimelapseProject: (project: Omit<TimelapseProject, 'id'>) => void;
  deleteTimelapseProject: (id: string) => void;
}

const DEFAULT_FILTER: PropertyFilter = {
  searchQuery: '',
  listingType: 'all',
  propertyType: 'all',
  district: 'all',
  minPrice: undefined,
  maxPrice: undefined,
  rooms: 'all',
  minArea: undefined,
  maxArea: undefined,
  citizenshipOnly: false,
  seaViewOnly: false,
  maxDistanceToSea: undefined,
  sortBy: 'newest'
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

const LOCAL_STORAGE_PROPERTIES_KEY = 'alanyamyildirim_properties_v4';
const LOCAL_STORAGE_FAVORITES_KEY = 'alanyamyildirim_favorites_v4';
const LOCAL_STORAGE_INQUIRIES_KEY = 'alanyamyildirim_inquiries_v4';
const LOCAL_STORAGE_AUTH_KEY = 'alanyamyildirim_admin_auth_v4';
const LOCAL_STORAGE_SETTINGS_KEY = 'alanyamyildirim_settings_v4';
const LOCAL_STORAGE_TIMELAPSE_KEY = 'alanyamyildirim_timelapse_v4';

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Site Settings
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_SETTINGS_KEY);
      if (stored) return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(stored) };
    } catch {
      // ignore
    }
    return DEFAULT_SITE_SETTINGS;
  });

  // Properties state with LocalStorage
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_PROPERTIES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_PROPERTIES;
  });

  // Timelapse Projects state with LocalStorage
  const [timelapseProjects, setTimelapseProjects] = useState<TimelapseProject[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_TIMELAPSE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return TIMELAPSE_PROJECTS;
  });

  const [currency, setCurrency] = useState<Currency>('EUR');
  const [activePage, setActivePage] = useState<PageName>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Inquiries
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_INQUIRIES_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [
      {
        id: 'inq-1',
        propertyId: 'prop-1',
        propertyTitle: 'Kargıcak Hillside Lüks Villa',
        fullName: 'Mustafa Yıldırım',
        email: 'myildirim2024@ogr.iu.edu.tr',
        phone: '+90 500 00 00 00',
        inquiryType: 'randevu',
        message: 'Merhaba, bu villayı yerinde incelemek ve detayları öğrenmek için randevu rica ediyorum.',
        date: '2026-03-28 14:30',
        status: 'yeni'
      },
      {
        id: 'inq-2',
        propertyId: 'prop-2',
        propertyTitle: 'Mahmutlar Resort 2+1 Daire',
        fullName: 'Mustafa Yıldırım',
        email: 'myildirim2024@ogr.iu.edu.tr',
        phone: '+90 500 00 00 00',
        inquiryType: 'fiyat_teklifi',
        message: 'Dairenin tapu durumu ve taksit imkanı var mıdır? Bilgi rica ederim.',
        date: '2026-03-29 11:15',
        status: 'cevaplandi'
      }
    ];
  });

  // Filter state
  const [filter, setFilter] = useState<PropertyFilter>(DEFAULT_FILTER);

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(siteSettings));
    } catch (e) {
      console.warn('Storage failed', e);
    }
  }, [siteSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(properties));
    } catch (e) {
      console.warn('Storage failed', e);
    }
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_TIMELAPSE_KEY, JSON.stringify(timelapseProjects));
    } catch (e) {
      console.warn('Storage failed', e);
    }
  }, [timelapseProjects]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify(inquiries));
    } catch {
      // ignore
    }
  }, [inquiries]);

  // Update site settings
  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Navigation helper
  const navigateTo = (page: PageName, propertyId?: string) => {
    setActivePage(page);
    if (propertyId) {
      setSelectedPropertyId(propertyId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle favorite
  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev =>
      prev.includes(propertyId) ? prev.filter(id => id !== propertyId) : [...prev, propertyId]
    );
  };

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  // Currency converter
  const formatPrice = (priceEUR: number): string => {
    let rate = 1;
    let symbol = '€';
    if (currency === 'TRY') {
      rate = 41.5;
      symbol = '₺';
    } else if (currency === 'USD') {
      rate = 1.08;
      symbol = '$';
    } else if (currency === 'GBP') {
      rate = 0.85;
      symbol = '£';
    }

    const converted = Math.round(priceEUR * rate);
    return `${symbol} ${converted.toLocaleString('tr-TR')}`;
  };

  // Reset filter
  const resetFilter = () => {
    setFilter(DEFAULT_FILTER);
  };

  // Filtered properties
  const filteredProperties = properties.filter(prop => {
    if (filter.searchQuery.trim()) {
      const q = filter.searchQuery.toLowerCase();
      const matchTitle = prop.title.toLowerCase().includes(q);
      const matchDistrict = prop.location.district.toLowerCase().includes(q);
      const matchRef = prop.refCode.toLowerCase().includes(q);
      const matchDesc = prop.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDistrict && !matchRef && !matchDesc) return false;
    }

    if (filter.listingType && filter.listingType !== 'all') {
      if (prop.listingType !== filter.listingType) return false;
    }

    if (filter.propertyType && filter.propertyType !== 'all') {
      if (prop.type !== filter.propertyType) return false;
    }

    if (filter.district && filter.district !== 'all' && filter.district !== 'Tümü') {
      if (prop.location.district !== filter.district) return false;
    }

    if (filter.rooms && filter.rooms !== 'all' && filter.rooms !== 'Tümü') {
      if (!prop.rooms.includes(filter.rooms)) return false;
    }

    if (filter.minPrice !== undefined && filter.minPrice > 0) {
      if (prop.priceEUR < filter.minPrice) return false;
    }

    if (filter.maxPrice !== undefined && filter.maxPrice > 0) {
      if (prop.priceEUR > filter.maxPrice) return false;
    }

    if (filter.minArea !== undefined && filter.minArea > 0) {
      if (prop.areaM2 < filter.minArea) return false;
    }

    if (filter.maxArea !== undefined && filter.maxArea > 0) {
      if (prop.areaM2 > filter.maxArea) return false;
    }

    if (filter.citizenshipOnly) {
      if (!prop.citizenshipEligible) return false;
    }

    if (filter.seaViewOnly) {
      const hasSeaView =
        prop.features.some(f => f.toLowerCase().includes('deniz')) ||
        prop.title.toLowerCase().includes('deniz');
      if (!hasSeaView) return false;
    }

    if (filter.maxDistanceToSea !== undefined && filter.maxDistanceToSea > 0) {
      if (prop.location.distanceToSeaMeters > filter.maxDistanceToSea) return false;
    }

    return true;
  }).sort((a, b) => {
    if (filter.sortBy === 'price-asc') return a.priceEUR - b.priceEUR;
    if (filter.sortBy === 'price-desc') return b.priceEUR - a.priceEUR;
    if (filter.sortBy === 'area-desc') return b.areaM2 - a.areaM2;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Property CRUD actions
  const addProperty = (newProp: Omit<Property, 'id' | 'createdAt'>) => {
    const id = 'prop-' + Date.now();
    const createdAt = new Date().toISOString().split('T')[0];
    const created: Property = {
      ...newProp,
      id,
      createdAt
    };
    setProperties(prev => [created, ...prev]);
  };

  const updateProperty = (id: string, updated: Partial<Property>) => {
    setProperties(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  // Timelapse CRUD actions
  const updateTimelapseProject = (id: string, updated: Partial<TimelapseProject>) => {
    setTimelapseProjects(prev =>
      prev.map(proj => (proj.id === id ? { ...proj, ...updated } : proj))
    );
  };

  const addTimelapseProject = (projectData: Omit<TimelapseProject, 'id'>) => {
    const newProj: TimelapseProject = {
      ...projectData,
      id: 'tl-' + Date.now()
    };
    setTimelapseProjects(prev => [newProj, ...prev]);
  };

  const deleteTimelapseProject = (id: string) => {
    setTimelapseProjects(prev => prev.filter(proj => proj.id !== id));
  };

  const resetToDefaultData = () => {
    setProperties(INITIAL_PROPERTIES);
    setTimelapseProjects(TIMELAPSE_PROJECTS);
    setSiteSettings(DEFAULT_SITE_SETTINGS);
    try {
      localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(INITIAL_PROPERTIES));
      localStorage.setItem(LOCAL_STORAGE_TIMELAPSE_KEY, JSON.stringify(TIMELAPSE_PROJECTS));
      localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(DEFAULT_SITE_SETTINGS));
    } catch {
      // ignore
    }
  };

  // Admin Auth
  const loginAdmin = (password: string): boolean => {
    if (password === 'admin123' || password === 'alanya2026') {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, 'true');
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    } catch {
      // ignore
    }
  };

  // Submit Inquiry
  const submitInquiry = (inquiryData: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: 'inq-' + Date.now(),
      date: new Date().toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' }),
      status: 'yeni'
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries(prev =>
      prev.map(item => (item.id === id ? { ...item, status } : item))
    );
  };

  return (
    <PropertyContext.Provider
      value={{
        siteSettings,
        updateSiteSettings,
        properties,
        currency,
        setCurrency,
        formatPrice,
        activePage,
        selectedPropertyId,
        navigateTo,
        favorites,
        toggleFavorite,
        isFavorite,
        filter,
        setFilter,
        resetFilter,
        filteredProperties,
        addProperty,
        updateProperty,
        deleteProperty,
        resetToDefaultData,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        inquiries,
        submitInquiry,
        updateInquiryStatus,
        timelapseProjects,
        updateTimelapseProject,
        addTimelapseProject,
        deleteTimelapseProject
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};
