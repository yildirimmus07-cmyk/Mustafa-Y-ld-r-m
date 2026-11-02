import { Property, TimelapseProject, SiteSettings } from '../types/property';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: 'AlanyaMYıldırım',
  phoneLandline: '+90 (200) 00 00 00',
  phoneMobile: '+90 500 00 00 00',
  email: 'myildirim2024@ogr.iu.edu.tr',
  licenseNo: '0700000',
  experienceYears: 23,
  successfulDeeds: 1907,
  satisfactionRate: '%99.99',
  primaryAgentName: 'Mustafa Yıldırım',
  heroTitle: 'Akdeniz’de Hayalinizdeki Yaşama Adım Atın',
  heroSubtitle: 'Alanya Kalesi ve deniz manzaralı lüks villalar, denize sıfır rezidanslar ve Türk vatandaşlığına uygun yüksek getirili yatırımlar.',
  heroImage: '/src/assets/images/hero_alanya_villa_1793604906893.jpg',
  heroVideoUrl: ''
};

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    refCode: 'ALN-7812',
    title: 'Kargıcak Hillside Panoramik Deniz & Alanya Kalesi Manzaralı Özel Lüks Villa',
    listingType: 'satilik',
    type: 'villa',
    priceEUR: 890000,
    location: {
      district: 'Kargıcak',
      city: 'Alanya / Antalya',
      distanceToSeaMeters: 1800,
      distanceToAirportKm: 25,
      address: 'Kargıcak Tepe Mah. Panoramik Villalar Bölgesi No:14',
      lat: 36.4678,
      lng: 32.1345,
    },
    areaM2: 420,
    rooms: '4+1 Dubleks',
    bathrooms: 4,
    floor: 'Müstakil 3 Kat',
    buildingAge: '0 (Yeni Proje)',
    heating: 'Yerden Isıtma & VRF Merkezi Klima',
    aidatMonthlyEUR: 90,
    citizenshipEligible: true,
    residencePermitEligible: true,
    furnished: 'Boş / Sıfır',
    features: [
      'Özel Sonsuzluk Havuzu',
      'Akıllı Ev Otomasyonu',
      'Özel Sauna & Jakuzi',
      'Kapalı Garaj (2 Araç)',
      'Panoramik Akdeniz & Kale Manzarası',
      'Geniş Barbekü Terası',
      'Güneşlenme Terası',
      'Yerden Isıtma Tesisatı',
      '7/24 Güvenlik Kamerası',
      'Özel Peyzaj Bahçesi'
    ],
    images: [
      '/src/assets/images/listing_kargicak_villa_1793604907770.jpg'
    ],
    description: 'Kargıcak tepelerinde, Toros Dağları ile Akdeniz’in eşsiz buluştuğu noktada konumlanan bu ultra lüks müstakil villa; sonsuzluk havuzu, geniş günbatımı terasları ve modern mimarisiyle hayalinizdeki yaşamı sunuyor. Türk vatandaşlığı kazanımına tam uygundur. Akıllı ev altyapısı, tüm odalarda ebeveyn banyosu ve kesintisiz deniz & Alanya Kalesi manzarası mevcuttur.',
    isFeatured: true,
    createdAt: '2026-03-15'
  },
  {
    id: 'prop-2',
    refCode: 'ALN-5420',
    title: 'Mahmutlar Denize 250m Lüks Resort Konseptli 2+1 Eşyalı Daire',
    listingType: 'satilik',
    type: 'daire',
    priceEUR: 165000,
    location: {
      district: 'Mahmutlar',
      city: 'Alanya / Antalya',
      distanceToSeaMeters: 250,
      distanceToAirportKm: 28,
      address: 'Barbaros Cad. 142. Sokak, Sunset Palms Residence',
      lat: 36.4912,
      lng: 32.0954,
    },
    areaM2: 115,
    rooms: '2+1',
    bathrooms: 2,
    floor: '6. Kat (Toplam 11)',
    buildingAge: '1 Yıllık',
    heating: 'Klima',
    aidatMonthlyEUR: 55,
    citizenshipEligible: false,
    residencePermitEligible: true,
    furnished: 'Tam Eşyalı',
    features: [
      'Büyük Açık Havuz & Su Kaydırağı',
      'Kapalı Isıtmalı Kış Havuzu',
      'Fitness Merkezi & Pilates Salonu',
      'Türk Hamamı, Sauna & Buhar Odası',
      'Tenis Kortu & Basketbol Sahası',
      'Site İçi Kafe & Havuz Bar',
      'Jeneratör & Çift Asansör',
      '7/24 Güvenlik ve Kapıcı Hizmeti',
      'Plaja Alt Geçitli Ulaşım'
    ],
    images: [
      '/src/assets/images/listing_mahmutlar_residence_1793604907502.jpg'
    ],
    description: 'Mahmutlar merkezde Barbaros Caddesi’ne ve Akdeniz sahiline sadece yürüme mesafesinde bulunan dairemiz, 5 yıldızlı otel konforunda sosyal olanaklara sahiptir. İtalyan marka beyaz eşyalar ve özel tasarım mobilyalarla donatılmıştır. Yüksek kira getirisi potansiyeliyle hem tatil evi hem de sağlam bir yatırım aracıdır.',
    isFeatured: true,
    createdAt: '2026-03-20'
  },
  {
    id: 'prop-3',
    refCode: 'ALN-9031',
    title: 'Cleopatra Beach Ön Sıra Panoramik Çatı Dubleksi (3+1 Lüks Penthouse)',
    listingType: 'satilik',
    type: 'penthouse',
    priceEUR: 440000,
    location: {
      district: 'Cleopatra / Merkez',
      city: 'Alanya / Antalya',
      distanceToSeaMeters: 80,
      distanceToAirportKm: 40,
      address: 'Atatürk Cad. Damlataş Mevkii No:48',
      lat: 36.5432,
      lng: 31.9892,
    },
    areaM2: 210,
    rooms: '3+1 Dubleks',
    bathrooms: 3,
    floor: '5 & 6. Çatı Katı',
    buildingAge: '2 Yıllık',
    heating: 'Klima & Elektrikli Yerden Isıtma',
    aidatMonthlyEUR: 75,
    citizenshipEligible: true,
    residencePermitEligible: true,
    furnished: 'Tam Eşyalı',
    features: [
      'Ünlü Kleopatra Plajına 80m Mesafe',
      'Özel Teras Jakuzisi',
      'Panoramik Gün Batımı Manzarası',
      'Damlataş Mağarası & Teleferiğe Yürüme Mesafesi',
      'Açık Havuz & Çocuk Havuzu',
      'Boutique Tasarım Bina',
      'Kapalı Otopark Alanı',
      'Granit Tezgahlı Ada Mutfak'
    ],
    images: [
      '/src/assets/images/listing_cleopatra_penthouse_1793608562299.jpg'
    ],
    description: 'Dünyaca ünlü Kleopatra Plajı’na birkaç adım mesafede yer alan bu ayrıcalıklı çatı dubleksi, Alanya Kalesi ve masmavi deniz manzarasına hakimdir. Üst katta geniş seyir terası, özel jakuzi ve ebeveyn süiti bulunmaktadır. Yıl boyunca kesintisiz turistik kiralama talebi mevcuttur.',
    isFeatured: true,
    createdAt: '2026-03-24'
  },
  {
    id: 'prop-4',
    refCode: 'ALN-3118',
    title: 'Oba Doğa İçinde Butik Rezidansta Lüks 1+1 Daire (Kiralık)',
    listingType: 'kiralik',
    type: 'daire',
    priceEUR: 750,
    location: {
      district: 'Oba',
      city: 'Alanya / Antalya',
      distanceToSeaMeters: 900,
      distanceToAirportKm: 35,
      address: 'Oba Çayı Yakını, Green Garden Rezidans',
      lat: 36.5367,
      lng: 32.0456,
    },
    areaM2: 65,
    rooms: '1+1',
    bathrooms: 1,
    floor: '2. Kat (Toplam 4)',
    buildingAge: '0 (Yeni)',
    heating: 'İnverter Klima',
    aidatMonthlyEUR: 35,
    citizenshipEligible: false,
    residencePermitEligible: true,
    furnished: 'Tam Eşyalı',
    features: [
      'Açık Havuz & Bahçe Dinlenme Kamelyaları',
      'Fitness & Sauna',
      'Fiber Optik Yüksek Hızlı İnternet',
      'Yeni Nesil A++ Enerji Tasarruflu Eşyalar',
      'Alanyum AVM ve Hastaneye Yakın',
      'Açık Otopark',
      'Kameralı Güvenlik'
    ],
    images: [
      '/src/assets/images/listing_mahmutlar_residence_1793604907502.jpg'
    ],
    description: 'Alanya’nın en nezih ve yeşil yerleşim bölgesi Oba’da, yeni tamamlanmış butik sitede uzun veya sezonluk kiralık 1+1 daire. Portakal bahçelerine bakan sessiz balkonu, modern dekorasyonu ve site içi havuzuyla huzurlu bir yaşam alanı sunar.',
    isFeatured: false,
    createdAt: '2026-03-26'
  },
  {
    id: 'prop-5',
    refCode: 'ALN-6204',
    title: 'Kestel Denize Sıfır Konumda Özel Plaj İskelesi Olan 3+1 Daire',
    listingType: 'satilik',
    type: 'daire',
    priceEUR: 295000,
    location: {
      district: 'Kestel',
      city: 'Alanya / Antalya',
      distanceToSeaMeters: 50,
      distanceToAirportKm: 30,
      address: 'Sahil Yolu Cad. Marina Residence Kestel',
      lat: 36.5189,
      lng: 32.0712,
    },
    areaM2: 155,
    rooms: '3+1',
    bathrooms: 2,
    floor: '3. Kat (Toplam 5)',
    buildingAge: '3 Yıllık',
    heating: 'Klima & Doğalgaz Hazır Altyapı',
    aidatMonthlyEUR: 65,
    citizenshipEligible: false,
    residencePermitEligible: true,
    furnished: 'Kısmen Eşyalı',
    features: [
      'Özel Site Plajı ve Şezlong İskelesi',
      'Açık ve Kapalı Yüzme Havuzu',
      'Tenis & Voleybol Sahaları',
      'Spa, Masaj Odası & Tuz Odası',
      'Sitede 24 Saat Canlı Güvenlik',
      'Kesintisiz Deniz Manzaralı Geniş Balkon'
    ],
    images: [
      '/src/assets/images/timelapse_project_emerald_1793604907854.jpg'
    ],
    description: 'Kestel’in sakin sahil şeridinde, az katlı Akdeniz mimarisine sahip sitede ön cephe daire. Sabahları balkonunuzda dalga sesleriyle uyanabilir, alt geçitle doğrudan sitenin özel plajına geçebilirsiniz. Kaliteli işçilik ve geniş salon hacmi.',
    isFeatured: true,
    createdAt: '2026-03-27'
  },
  {
    id: 'prop-6',
    refCode: 'ALN-8199',
    title: 'Tepe / Bektaş Yamaçlarında Özel Havuzlu Müstakil Malikane (Kiralık)',
    listingType: 'kiralik',
    type: 'villa',
    priceEUR: 3200,
    location: {
      district: 'Tepe / Bektaş',
      city: 'Alanya / Antalya',
      distanceToSeaMeters: 3500,
      distanceToAirportKm: 45,
      address: 'Bektaş Seyir Tepesi Yolu No:8',
      lat: 36.5621,
      lng: 32.0012,
    },
    areaM2: 380,
    rooms: '5+2 Lüks Villa',
    bathrooms: 4,
    floor: 'Müstakil 2 Kat',
    buildingAge: '2 Yıllık',
    heating: 'Yerden Isıtma & Şömine & VRF',
    aidatMonthlyEUR: 100,
    citizenshipEligible: true,
    residencePermitEligible: true,
    furnished: 'Tam Eşyalı',
    features: [
      'Isıtmalı Özel Sonsuzluk Havuzu',
      'Özel Türk Hamamı & Fin Saunası',
      'Doğal Taş Şömineli Büyük Salon',
      'Panoramik Şehir, Kale ve Deniz Işıkları',
      'Sinema Odası & Oyun Alanı',
      'Özel Şef Mutfağı'
    ],
    images: [
      '/src/assets/images/listing_bektas_mansion_1793608562116.jpg'
    ],
    description: 'Alanya’nın en prestijli tepe noktasında konuşlanan bu müstakil malikane, Alanya kalesinin gece aydınlatmasını ve Akdeniz körfezini 180 derece panoramik açıyla görür. Yıllık veya lüks sezonluk kiralamaya uygundur.',
    isFeatured: true,
    createdAt: '2026-03-28'
  },
  {
    id: 'prop-7',
    refCode: 'ALN-1045',
    title: 'Avsallar Çam Ormanı Yanında İncekum Plajına Yakın 2+1 Yazlık',
    listingType: 'satilik',
    type: 'daire',
    priceEUR: 128000,
    location: {
      district: 'Avsallar',
      city: 'Alanya / Antalya',
      distanceToSeaMeters: 800,
      distanceToAirportKm: 65,
      address: 'Avsallar Doğa Evleri No:22',
      lat: 36.6212,
      lng: 31.7823,
    },
    areaM2: 95,
    rooms: '2+1',
    bathrooms: 2,
    floor: '4. Kat (Toplam 8)',
    buildingAge: '0 (Sıfır)',
    heating: 'Klima',
    aidatMonthlyEUR: 40,
    citizenshipEligible: false,
    residencePermitEligible: true,
    furnished: 'Boş / Sıfır',
    features: [
      'İncekum Altın Kum Plajına Özel Servis',
      'Açık Havuz, Çocuk Havuzu & Aquapark',
      'Çam Ağaçları İçinde Oksijen Deposu Konum',
      'Açık & Kapalı Otopark',
      'Geniş Barbekülü Balkon'
    ],
    images: [
      '/src/assets/images/listing_mahmutlar_residence_1793604907502.jpg'
    ],
    description: 'Dünyaca ünlü İncekum sahilinin hemen arkasında çam ormanlarıyla çevrili projede, uygun fiyatlı ve sıfır 2+1 daire. Ailece sakin ve sağlıklı bir tatil geçirmek isteyenler için ideal.',
    isFeatured: false,
    createdAt: '2026-03-29'
  },
  {
    id: 'prop-8',
    refCode: 'ALN-4490',
    title: 'Kargıcak Denize Sıfır Kompleks İçi 1+1 Yatırımlık Rezidans (Kiralık)',
    listingType: 'kiralik',
    type: 'daire',
    priceEUR: 650,
    location: {
      district: 'Kargıcak',
      city: 'Alanya / Antalya',
      distanceToSeaMeters: 120,
      distanceToAirportKm: 24,
      address: 'Kargıcak Sahil Cad. No:90',
      lat: 36.4721,
      lng: 32.1287,
    },
    areaM2: 60,
    rooms: '1+1',
    bathrooms: 1,
    floor: '2. Kat (Toplam 6)',
    buildingAge: '1 Yıllık',
    heating: 'Klima',
    aidatMonthlyEUR: 50,
    citizenshipEligible: false,
    residencePermitEligible: true,
    furnished: 'Tam Eşyalı',
    features: [
      'Açık Havuz & Kapalı Kış Havuzu',
      'Deniz Manzaralı Geniş Balkon',
      'Fitness, Sauna & Masaj Odası',
      'Plaja Doğrudan Erişim',
      'Güvenlik ve Concierge Danışma'
    ],
    images: [
      '/src/assets/images/listing_kargicak_villa_1793604907770.jpg'
    ],
    description: 'Kargıcak sahilinde lüks kompleks içerisinde deniz manzaralı ferah 1+1 kiralık daire. Tüm mobilyalar ve beyaz eşyalar sıfır ayarındadır.',
    isFeatured: false,
    createdAt: '2026-03-30'
  }
];

export const TIMELAPSE_PROJECTS: TimelapseProject[] = [
  {
    id: 'tl-1',
    title: 'Emerald Coast Residences & Beach Club',
    district: 'Kargıcak / Alanya',
    deliveryDate: 'Aralık 2026',
    totalUnits: 180,
    currentProgressPercent: 82,
    heroImage: '/src/assets/images/timelapse_project_emerald_1793604907854.jpg',
    videoUrl: '', // Ready for user's uploaded video file
    description: 'Akdeniz sahilinde 22.000 m² arazi üzerinde yükselen, 5 yıldızlı otel konseptli ultra lüks rezidans ve sahil kulübü projesi.',
    milestones: [
      {
        stage: 'Aşama 1',
        title: 'Zemin Etüdü & Fore Kazık Temel',
        date: 'Mart 2025',
        description: 'Jeolojik zemin iyileştirmesi, 32 metre derinlikte fore kazık uygulaması ve su yalıtımlı radye temel tamamlandı.',
        image: '/src/assets/images/timelapse_project_emerald_1793604907854.jpg',
        progressPercent: 20,
        concretePercent: 25,
        facadePercent: 0,
        interiorPercent: 0
      },
      {
        stage: 'Aşama 2',
        title: 'Betonarme Karkas & Kat Tabliyeleri',
        date: 'Ekim 2025',
        description: 'C35/40 dayanımlı beton dökümleri ve 8. kat kaba inşaat imalatı tamamlandı.',
        image: '/src/assets/images/listing_mahmutlar_residence_1793604907502.jpg',
        progressPercent: 55,
        concretePercent: 95,
        facadePercent: 20,
        interiorPercent: 15
      },
      {
        stage: 'Aşama 3 (Güncel)',
        title: 'Dış Cephe Giydirme, Cam Balkon & İnce İşler',
        date: 'Nisan 2026',
        description: 'Isı yalıtımlı alüminyum doğramalar, sonsuzluk havuzları ve iç mimari uygulamaları devam ediyor.',
        image: '/src/assets/images/timelapse_project_emerald_1793604907854.jpg',
        progressPercent: 82,
        concretePercent: 100,
        facadePercent: 85,
        interiorPercent: 70
      }
    ]
  },
  {
    id: 'tl-2',
    title: 'Cleopatra Sky Luxury Suites & Towers',
    district: 'Cleopatra / Damlataş / Alanya',
    deliveryDate: 'Kasım 2026',
    totalUnits: 64,
    currentProgressPercent: 75,
    heroImage: '/src/assets/images/listing_cleopatra_penthouse_1793608562299.jpg',
    videoUrl: '', // Ready for user's uploaded video file
    description: 'Dünyaca ünlü Kleopatra Plajı’na yürüme mesafesinde, Akdeniz ve Alanya Kalesi panoramasına sahip rezidans projesi.',
    milestones: [
      {
        stage: 'Aşama 1',
        title: 'Hafriyat & Temel İzolasyonu',
        date: 'Mayıs 2025',
        description: 'Kentsel dönüşüm yıkım, hafriyat ve çift kat membran temel su yalıtımı yapıldı.',
        image: '/src/assets/images/listing_cleopatra_penthouse_1793608562299.jpg',
        progressPercent: 25,
        concretePercent: 30,
        facadePercent: 0,
        interiorPercent: 0
      },
      {
        stage: 'Aşama 2',
        title: 'Kaba Yapı Tamamlanması',
        date: 'Aralık 2025',
        description: 'Penthouse katları dahil tüm betonarme döşemeler tamamlandı.',
        image: '/src/assets/images/listing_cleopatra_penthouse_1793608562299.jpg',
        progressPercent: 60,
        concretePercent: 100,
        facadePercent: 40,
        interiorPercent: 25
      },
      {
        stage: 'Aşama 3 (Güncel)',
        title: 'Çatı Terasları & Havuz İmalatları',
        date: 'Nisan 2026',
        description: 'Çatı katı jakuzileri, cephe kaplamaları ve asansör montajları sürüyor.',
        image: '/src/assets/images/listing_cleopatra_penthouse_1793608562299.jpg',
        progressPercent: 75,
        concretePercent: 100,
        facadePercent: 80,
        interiorPercent: 55
      }
    ]
  },
  {
    id: 'tl-3',
    title: 'Panorama Hills Exclusive Sky Villas',
    district: 'Tepe / Bektaş / Alanya',
    deliveryDate: 'Eylül 2026',
    totalUnits: 14,
    currentProgressPercent: 68,
    heroImage: '/src/assets/images/listing_bektas_mansion_1793608562116.jpg',
    videoUrl: '', // Ready for user's uploaded video file
    description: 'Toros Dağları yamaçlarında Alanya Kalesi ve kesintisiz Akdeniz körfezi manzaralı 14 adet özel akıllı villa kompleksi.',
    milestones: [
      {
        stage: 'Aşama 1',
        title: 'Kaya Ankrajı & Yamaç Teraslama',
        date: 'Haziran 2025',
        description: 'Yamaç kademelendirme, kaya ankrajları ve zemin güçlendirme çalışmaları tamamlandı.',
        image: '/src/assets/images/listing_bektas_mansion_1793608562116.jpg',
        progressPercent: 25,
        concretePercent: 30,
        facadePercent: 0,
        interiorPercent: 0
      },
      {
        stage: 'Aşama 2',
        title: 'Müstakil Villa Karkasları & Sonsuzluk Havuzları',
        date: 'Ocak 2026',
        description: '14 bağımsız villanın taşıyıcı sistemleri ve havuz çanakları tamamlandı.',
        image: '/src/assets/images/listing_bektas_mansion_1793608562116.jpg',
        progressPercent: 55,
        concretePercent: 95,
        facadePercent: 35,
        interiorPercent: 20
      },
      {
        stage: 'Aşama 3 (Güncel)',
        title: 'Doğal Taş Kaplama & Akıllı Ev Altyapısı',
        date: 'Nisan 2026',
        description: 'Geniş cam cephelerin montajı, yerden ısıtma borulaması ve teras yalıtımları yapılıyor.',
        image: '/src/assets/images/listing_bektas_mansion_1793608562116.jpg',
        progressPercent: 68,
        concretePercent: 100,
        facadePercent: 70,
        interiorPercent: 50
      }
    ]
  },
  {
    id: 'tl-4',
    title: 'Sunset Horizon Beachfront Residence',
    district: 'Mahmutlar / Alanya',
    deliveryDate: 'Şubat 2027',
    totalUnits: 110,
    currentProgressPercent: 45,
    heroImage: '/src/assets/images/listing_mahmutlar_residence_1793604907502.jpg',
    videoUrl: '', // Ready for user's uploaded video file
    description: 'Mahmutlar sahil yolunda denize 50 metre mesafede modern mimari ve zengin sosyal donatılara sahip rezidans kompleksi.',
    milestones: [
      {
        stage: 'Aşama 1',
        title: 'Temel & Bodrum Katlar',
        date: 'Eylül 2025',
        description: 'Kapalı otopark, spa merkezi katları ve radye temel dökümleri tamamlandı.',
        image: '/src/assets/images/listing_mahmutlar_residence_1793604907502.jpg',
        progressPercent: 20,
        concretePercent: 35,
        facadePercent: 0,
        interiorPercent: 0
      },
      {
        stage: 'Aşama 2 (Güncel)',
        title: '5. Kat Betonarme Karkas',
        date: 'Mart 2026',
        description: 'Konut katlarının beton dökümleri hızla yükselmektedir.',
        image: '/src/assets/images/listing_mahmutlar_residence_1793604907502.jpg',
        progressPercent: 45,
        concretePercent: 70,
        facadePercent: 10,
        interiorPercent: 5
      }
    ]
  }
];

export const ALANYA_DISTRICTS = [
  'Tümü',
  'Mahmutlar',
  'Cleopatra / Merkez',
  'Oba',
  'Kargıcak',
  'Kestel',
  'Avsallar',
  'Tosmur',
  'Tepe / Bektaş',
  'Cikcilli',
  'Demirtaş'
];

export const PROPERTY_TYPES = [
  { value: 'all', label: 'Tüm Tipler' },
  { value: 'daire', label: 'Daire' },
  { value: 'villa', label: 'Villa & Müstakil' },
  { value: 'penthouse', label: 'Penthouse / Çatı Dubleksi' },
  { value: 'arsa', label: 'Arsa & Tarla' },
  { value: 'ticari', label: 'Ticari & Dükkan' }
];

export const ROOM_OPTIONS = [
  'Tümü',
  '1+1',
  '2+1',
  '3+1',
  '4+1 Dubleks',
  '5+2 Lüks Villa'
];
