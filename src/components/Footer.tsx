import React from 'react';
import { usePropertyContext, PageName } from '../context/PropertyContext';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setFilter } = usePropertyContext();

  const handleDistrictFilter = (district: string) => {
    setFilter(prev => ({ ...prev, district }));
    navigateTo('listings');
  };

  const handleTypeFilter = (type: any) => {
    setFilter(prev => ({ ...prev, propertyType: type }));
    navigateTo('listings');
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Top Value Banner */}
      <div className="border-b border-slate-850 py-10 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            
            <div className="flex items-start gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-1">Resmi Lisanslı Danışmanlık</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  T.C. Ticaret Bakanlığı Taşınmaz Ticareti Yetki Belgesi No: 0700000. Alanya Emlakçılar Odası Üyesi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-1">Satış Sonrası 7/24 Destek</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Tapu devri, elektrik/su aboneliği, mobilya seçimi ve profesyonel kiralama yönetiminde tam rehberlik.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-1">Geniş Alanya Portföyü</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Mahmutlar, Cleopatra, Oba, Kargıcak ve Kestel'de 500+ doğrudan inşaat firmasından mülk seçeneği.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Alanya<span className="text-amber-500">MYıldırım</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Alanya’da 23 yıldır yerli ve yabancı yatırımcılara doğru gayrimenkulü, en şeffaf fiyat ve hukuki güvence ile sunan kurumsal emlak & yatırım şirketidir.
            </p>

            <div className="pt-2 text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Atatürk Caddesi No:124, 07400 Alanya / Antalya</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+90200000000" className="hover:text-white transition-colors">
                  +90 (200) 00 00 00
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:myildirim2024@ogr.iu.edu.tr" className="hover:text-white transition-colors">
                  myildirim2024@ogr.iu.edu.tr
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Popüler Bölgeler */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Alanya Bölgeleri
            </h5>
            <ul className="space-y-2.5 text-xs">
              {['Mahmutlar', 'Cleopatra / Merkez', 'Oba', 'Kargıcak', 'Kestel', 'Avsallar', 'Tepe / Bektaş'].map((district) => (
                <li key={district}>
                  <button
                    onClick={() => handleDistrictFilter(district)}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1 group"
                  >
                    <span>{district}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Mülk Tipleri */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Portföy Tipleri
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleTypeFilter('daire')} className="hover:text-amber-400 transition-colors">
                  Satılık Lüks Daireler
                </button>
              </li>
              <li>
                <button onClick={() => handleTypeFilter('villa')} className="hover:text-amber-400 transition-colors">
                  Müstakil & Özel Havuzlu Villalar
                </button>
              </li>
              <li>
                <button onClick={() => handleTypeFilter('penthouse')} className="hover:text-amber-400 transition-colors">
                  Panoramik Çatı Dubleksleri
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('timelapse')} className="hover:text-amber-400 transition-colors">
                  Proje İnşaat Aşamaları (Timelapse)
                </button>
              </li>
              <li>
                <button onClick={() => { setFilter(prev => ({ ...prev, citizenshipOnly: true })); navigateTo('listings'); }} className="hover:text-amber-400 transition-colors">
                  Türk Vatandaşlığına Uygun İlanlar
                </button>
              </li>
              <li>
                <button onClick={() => { setFilter(prev => ({ ...prev, listingType: 'kiralik' })); navigateTo('listings'); }} className="hover:text-amber-400 transition-colors">
                  Kiralık Daire & Villalar
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Hızlı Linkler */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Kurumsal
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  Hakkımızda
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">
                  Hizmetlerimiz
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('timelapse')} className="hover:text-white transition-colors">
                  Yapı Timelapse Videoları
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  İletişim & Ofis Konumu
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('login')} className="hover:text-amber-400 transition-colors font-medium">
                  Yönetici Girişi (Admin)
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} AlanyaMYıldırım Gayrimenkul & Yatırım. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-6 text-slate-400">
            <span>Gizlilik Politikası</span>
            <span>Kullanım Koşulları</span>
            <span>KVKK Aydınlatma Metni</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
