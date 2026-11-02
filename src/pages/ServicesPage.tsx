import React from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import { 
  Building2, 
  ShieldCheck, 
  Compass, 
  Key, 
  Sofa, 
  Plane, 
  FileText, 
  Check, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { navigateTo } = usePropertyContext();

  const services = [
    {
      id: '01',
      title: 'Gayrimenkul Alım & Satım Danışmanlığı',
      description: 'Alanya’nın tüm mahallelerinde (Mahmutlar, Kargıcak, Cleopatra, Oba, Kestel) satılık ve kiralık lüks daire, villa ve arsa portföyü. Doğrudan inşaat firmasından komisyonsuz sıfır projeler.',
      icon: <Building2 className="w-6 h-6 text-amber-600" />,
      features: [
        'Resmi inşaat liste fiyatlarıyla şeffaf satış',
        'Detaylı bölge getiri ve amortisman analizi',
        'Bütçenize uygun özel portföy seçimi'
      ]
    },
    {
      id: '02',
      title: 'Türk Vatandaşlığı & İkametgah Rehberliği',
      description: 'Yabancı yatırımcılar için 400.000$ ve üzeri gayrimenkul alımlarında aile boyu Türk vatandaşlığı edinimi ve ikamet izinlerinin kurumsal avukatlarımız nezdinde eksiksiz takibi.',
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
      features: [
        'SPK lisanslı değerleme raporu temini',
        'Banka hesap açılışı & vergi numarası',
        'Avukatlık ve başvuru takip danışmanlığı'
      ]
    },
    {
      id: '03',
      title: 'Tapu Tescili & Hukuki Mülk Denetimi',
      description: 'Alanya Tapu Müdürlüğü ve noterler nezdinde güvenli devir. Alınacak mülkün üzerinde ipotek, haciz veya iskan engeli bulunmadığının resmi tescili.',
      icon: <FileText className="w-6 h-6 text-amber-600" />,
      features: [
        'İskan (Yapı Kullanım İzni) kontrolü',
        'Resmi tercüman eşliğinde tapu devri',
        'Elektrik, su ve internet aboneliklerinin taşınması'
      ]
    },
    {
      id: '04',
      title: 'Satış Sonrası Mobilya & Tasarım Desteği',
      description: 'Evinizi teslim aldıktan sonra yalnız değilsiniz. Alanya’nın önde gelen mobilya, beyaz eşya ve dekorasyon mağazalarından kurumsal indirimlerle alışveriş turu.',
      icon: <Sofa className="w-6 h-6 text-amber-600" />,
      features: [
        'Ücretsiz mobilya ve perde seçim rehberliği',
        'Beyaz eşya ve klima montaj koordinasyonu',
        'İç mimari ve peyzaj düzenleme desteği'
      ]
    },
    {
      id: '05',
      title: 'Profesyonel Kiralama & Gayrimenkul Yönetimi',
      description: 'Siz Alanya’da değilken mülkünüz size yüksek getiri sağlasın. Sezonluk veya uzun dönemli kiralama, misafir karşılama, temizlik ve aidat takibi tam güvenceyle.',
      icon: <Key className="w-6 h-6 text-amber-600" />,
      features: [
        'Yıllık %8-12 Euro bazlı kira getirisi hedefi',
        'Kira sözleşmesi ve depozito güvencesi',
        'Rutin daire kontrolü ve teknik bakım'
      ]
    },
    {
      id: '06',
      title: 'Ücretsiz Keşif Turu & VIP Havalimanı Karşılama',
      description: 'Gazipaşa-Alanya (GZP) ve Antalya (AYT) havalimanlarından VIP transfer. Projeleri yerinde incelemeniz için 3 gün konaklama ve bölge tanıtım turu desteği.',
      icon: <Plane className="w-6 h-6 text-amber-600" />,
      features: [
        'Özel şoförlü VIP transfer aracı',
        'Lüks otel veya rezidansta konaklama',
        'Tüm Alanya sahil ve inşaat projeleri turu'
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
            A'dan Z'ye Emlak Çözümleri
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            AlanyaMYıldırım Ayrıcalıklı Hizmetleri
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Mustafa Yıldırım güvencesiyle mülk arayışınızdan 1907 tapu devri deneyimine, satış sonrası ev yönetiminden vatandaşlık başvurusuna kadar her adımınızda profesyonel rehberiniziz.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-100">
                    {service.icon}
                  </div>
                  <span className="font-mono text-sm font-bold text-slate-300">
                    {service.id}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => navigateTo('contact')}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 group"
                >
                  <span>Detaylı Bilgi & Danışmanlık İste</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Discovery Tour Booking Banner */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              Özel Davet
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
              Alanya Gayrimenkul Keşif Turumuza Katılın
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Havalimanından karşılanıp Alanya’nın en prestijli villa ve rezidans projelerini 3 gün boyunca yerinde görün. Gayrimenkul satın almanız durumunda seyahat ve konaklama masraflarınız şirketimizce karşılanır.
            </p>
            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-2 shadow-lg"
            >
              <PhoneCall className="w-4 h-4" />
              Keşif Turu Rezervasyonu Yapın
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
