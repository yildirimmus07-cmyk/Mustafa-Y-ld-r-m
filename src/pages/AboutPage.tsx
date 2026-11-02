import React from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Globe2, 
  PhoneCall, 
  Briefcase 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo, siteSettings } = usePropertyContext();

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Banner */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden mb-16 shadow-xl">
          <div className="max-w-2xl relative z-10">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              Kurumsal Profilimiz
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              AlanyaMYıldırım: 23 Yıllık Güven ve Uzmanlık
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Mustafa Yıldırım öncülüğünde kurulan AlanyaMYıldırım Gayrimenkul, Türkiye ve dünyanın dört bir yanından gelen yatırımcılara şeffaf, hukuki açıdan kusursuz ve yüksek karlı gayrimenkul çözümleri üretmektedir.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden lg:flex items-center justify-center">
            <Building2 className="w-96 h-96 text-white" />
          </div>
        </div>

        {/* Quantified Impact Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-mono tabular-nums mb-1">
              23
            </div>
            <div className="text-xs font-bold text-slate-800">Yıllık Tecrübe</div>
            <div className="text-[11px] text-slate-400">Alanya yerel pazarında</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-mono tabular-nums mb-1">
              1907
            </div>
            <div className="text-xs font-bold text-slate-800">Başarılı Tapu Devri</div>
            <div className="text-[11px] text-slate-400">Mustafa Yıldırım Güvencesiyle</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-mono tabular-nums mb-1">
              %99.99
            </div>
            <div className="text-xs font-bold text-slate-800">Müşteri Memnuniyeti</div>
            <div className="text-[11px] text-slate-400">Doğrulanmış geri bildirim</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-mono tabular-nums mb-1">
              0700000
            </div>
            <div className="text-xs font-bold text-slate-800">Yetki Belge No</div>
            <div className="text-[11px] text-slate-400">T.C. Ticaret Bakanlığı Onaylı</div>
          </div>
        </div>

        {/* Two-Column Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Misyonumuz & İlkelerimiz
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Mustafa Yıldırım ile Huzurlu Bir Akdeniz Yaşamı
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Gayrimenkul yatırımı yapmak yalnızca bir bina seçmek değil, aynı zamanda geleceğinizi ve huzurunuzu güvence altına almaktır. AlanyaMYıldırım portföyündeki her yapıyı; iskan durumu, deprem yönetmeliğine uygunluğu ve malzeme kalitesi açısından 23 yıllık tecrübemizle denetliyoruz.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Türk vatandaşlığı, ikametgah başvuruları, vergi numarası temininden; evinizin teslimine kadar her aşamada bizzat Mustafa Yıldırım danışmanlığı ile yanınızdayız.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Taşınmaz Ticareti Yetki Belgesi No: 0700000</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Alanya Ticaret ve Sanayi Odası (ALTSO) Asil Üyeliği</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>İletişim: +90 (200) 00 00 00 & myildirim2024@ogr.iu.edu.tr</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src="/src/assets/images/listing_kargicak_villa_1793604907770.jpg"
                alt="AlanyaMYıldırım Ofis ve Portföy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Executive Team */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
              Yönetim & Kadro
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              AlanyaMYıldırım Gayrimenkul Ekibi
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center shadow-xs">
              <div className="w-20 h-20 rounded-full bg-slate-900 text-amber-400 font-bold text-2xl flex items-center justify-center mx-auto mb-4 border-2 border-amber-500">
                MY
              </div>
              <h3 className="font-bold text-slate-900 text-base">Mustafa Yıldırım</h3>
              <div className="text-xs text-amber-700 font-semibold mb-2">Kurucu & Genel Müdür</div>
              <p className="text-xs text-slate-500">23 yıllık Alanya gayrimenkul ve inşaat proje yönetimi deneyimi.</p>
              <div className="text-[11px] text-slate-400 mt-2 font-mono">myildirim2024@ogr.iu.edu.tr</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center shadow-xs">
              <div className="w-20 h-20 rounded-full bg-slate-900 text-amber-400 font-bold text-2xl flex items-center justify-center mx-auto mb-4 border-2 border-amber-500">
                MY
              </div>
              <h3 className="font-bold text-slate-900 text-base">Mustafa Yıldırım</h3>
              <div className="text-xs text-amber-700 font-semibold mb-2">Uluslararası Satış Direktörü</div>
              <p className="text-xs text-slate-500">Yabancı yatırımcılar ve VIP portföy ilişkileri yöneticisi.</p>
              <div className="text-[11px] text-slate-400 mt-2 font-mono">+90 500 00 00 00</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center shadow-xs">
              <div className="w-20 h-20 rounded-full bg-slate-900 text-amber-400 font-bold text-2xl flex items-center justify-center mx-auto mb-4 border-2 border-amber-500">
                MY
              </div>
              <h3 className="font-bold text-slate-900 text-base">Mustafa Yıldırım</h3>
              <div className="text-xs text-amber-700 font-semibold mb-2">Hukuk & Vatandaşlık Müşaviri</div>
              <p className="text-xs text-slate-500">1907 tapu devri tecrübesi ve vatandaşlık süreçleri uzmanı.</p>
              <div className="text-[11px] text-slate-400 mt-2 font-mono">+90 (200) 00 00 00</div>
            </div>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Mustafa Yıldırım ile Alanya’da Güvenli Yatırım Yapın</h3>
            <p className="text-xs text-slate-300">Portföyünüzü en şeffaf koşullarla değerlendirelim.</p>
          </div>
          <button
            onClick={() => navigateTo('contact')}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            Mustafa Yıldırım'a Ulaşın
          </button>
        </div>

      </div>
    </div>
  );
};
