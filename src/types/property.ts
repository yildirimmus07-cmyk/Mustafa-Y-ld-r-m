export type PropertyType = 'daire' | 'villa' | 'penthouse' | 'arsa' | 'ticari';

export type ListingType = 'satilik' | 'kiralik';

export type Currency = 'EUR' | 'TRY' | 'USD' | 'GBP';

export interface PropertyLocation {
  district: string; // e.g. "Mahmutlar", "Oba", "Kargıcak", "Cleopatra / Merkez"
  city: string; // "Alanya / Antalya"
  distanceToSeaMeters: number; // e.g. 150, 450
  distanceToAirportKm?: number; // Gazipaşa (GZP) or Antalya (AYT)
  address?: string;
  lat?: number;
  lng?: number;
}

export interface Property {
  id: string;
  refCode: string; // e.g. "ALN-2045"
  title: string;
  listingType: ListingType; // satılık or kiralık
  type: PropertyType; // daire, villa, penthouse, etc.
  priceEUR: number; // base price in EUR (standard in Alanya)
  location: PropertyLocation;
  areaM2: number;
  rooms: string; // "1+1", "2+1", "3+1", "4+1 Dubleks", "5+2 Lüks Villa"
  bathrooms: number;
  floor: string; // "3. Kat (Toplam 10)", "Giriş Kat", "En Üst Kat Dubleks"
  buildingAge: string; // "0 (Sıfır Proje)", "2 Yıllık", "5 Yıllık"
  heating: string; // "Klima & Yerden Isıtma", "VRF Sistem"
  aidatMonthlyEUR: number;
  citizenshipEligible: boolean; // Türk Vatandaşlığına Uygun
  residencePermitEligible: boolean; // İkamet İznine Uygun
  furnished: 'Tam Eşyalı' | 'Kısmen Eşyalı' | 'Boş / Sıfır';
  features: string[];
  images: string[];
  videoUrl?: string; // Optional property video or 3D tour
  description: string;
  isFeatured: boolean;
  createdAt: string;
}

export interface PropertyFilter {
  searchQuery: string;
  listingType?: ListingType | 'all';
  propertyType?: PropertyType | 'all';
  district?: string | 'all';
  minPrice?: number;
  maxPrice?: number;
  rooms?: string | 'all';
  minArea?: number;
  maxArea?: number;
  citizenshipOnly?: boolean;
  seaViewOnly?: boolean;
  maxDistanceToSea?: number;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'area-desc';
}

export interface Inquiry {
  id: string;
  propertyId?: string;
  propertyTitle?: string;
  fullName: string;
  email: string;
  phone: string;
  inquiryType: 'bilgi' | 'randevu' | 'fiyat_teklifi' | 'genel';
  message: string;
  date: string;
  status: 'yeni' | 'cevaplandi' | 'arsivlendi';
}

export interface ConstructionMilestone {
  stage: string;
  title: string;
  date: string;
  description: string;
  image: string;
  videoUrl?: string;
  progressPercent: number;
  concretePercent: number;
  facadePercent: number;
  interiorPercent: number;
}

export interface TimelapseProject {
  id: string;
  title: string;
  district: string;
  deliveryDate: string;
  totalUnits: number;
  currentProgressPercent: number;
  heroImage: string;
  videoUrl?: string; // User's own video URL (MP4 / WebM / Youtube)
  description: string;
  milestones: ConstructionMilestone[];
}

export interface SiteSettings {
  siteName: string;
  phoneLandline: string;
  phoneMobile: string;
  email: string;
  licenseNo: string;
  experienceYears: number;
  successfulDeeds: number;
  satisfactionRate: string;
  primaryAgentName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroVideoUrl?: string;
}
