import React, { useState } from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  Building2, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { submitInquiry } = usePropertyContext();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState<'genel' | 'bilgi' | 'randevu' | 'fiyat_teklifi'>('genel');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    submitInquiry({
      fullName,
      email: email || 'Belirtilmedi',
      phone,
      inquiryType: subject,
      message: message || 'Web sitesi iletişim formundan mesaj gönderildi.'
    });

    setSubmitted(true);
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const whatsappUrl = `https://wa.me/905000000000?text=${encodeURIComponent(
    'Merhaba Mustafa Yıldırım, AlanyaMYıldırım gayrimenkul portföyünüz ve yatırım danışmanlığı hakkında bilgi almak istiyorum.'
  )}`;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
            7/24 Kesintisiz İletişim
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Mustafa Yıldırım ile İletişime Geçin
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            AlanyaMYıldırım olarak yeni bir ev arayışınızda, portföyünüzü satarken veya Türk vatandaşlığı şartlarını öğrenmek için ofisimizi ziyaret edebilir veya formu doldurabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Contact info & Office card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Merkez Ofis Bilgileri
              </h2>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Adres</div>
                    <div className="text-slate-500 mt-0.5 leading-relaxed">
                      Atatürk Caddesi No:124, 07400 Alanya / Antalya (AlanyaMYıldırım Merkez Binası)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Santral & Danışma</div>
                    <a href="tel:+90200000000" className="text-slate-500 hover:text-amber-700 block mt-0.5 font-mono">
                      +90 (200) 00 00 00
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Mobil & WhatsApp Hattı</div>
                    <a href="tel:+90500000000" className="text-slate-500 hover:text-amber-700 block mt-0.5 font-mono">
                      +90 500 00 00 00
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">E-Posta</div>
                    <a href="mailto:myildirim2024@ogr.iu.edu.tr" className="text-slate-500 hover:text-amber-700 block mt-0.5">
                      myildirim2024@ogr.iu.edu.tr
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Çalışma Saatleri</div>
                    <div className="text-slate-500 mt-0.5">
                      Pazartesi - Cumartesi: 09:00 - 19:00 <br />
                      Pazar: Mustafa Yıldırım ile Randevulu Görüşme
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Doğrudan WhatsApp İle Yazın (+90 500 00 00 00)
                </a>
              </div>
            </div>

            {/* Trust badge card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <div className="font-bold text-sm">Yasal Lisans & Tescil</div>
                <div className="text-slate-400 leading-relaxed">
                  Taşınmaz Ticareti Yetki Belgesi No: 0700000. Tüm işlemler Mustafa Yıldırım denetiminde noter ve tapu standartlarına tabidir.
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 mb-1">
                Danışman Talep Formu
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                İhtiyacınızı belirtin, kriterlerinize en uygun Alanya portföyünü 15 dakika içinde hazırlayalım.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Adınız ve Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Ahmet Yılmaz"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Telefon Numaranız *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Örn: +90 532 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      E-Posta Adresiniz
                    </label>
                    <input
                      type="email"
                      placeholder="Örn: ahmet@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Konu / Talep Türü
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                    >
                      <option value="genel">Genel Bilgi ve Danışmanlık</option>
                      <option value="randevu">Alanya’da Yerinde Mülk İnceleme</option>
                      <option value="fiyat_teklifi">Fiyat & Portföy Teklifi</option>
                      <option value="bilgi">Türk Vatandaşlığı / İkamet Danışmanlığı</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mesajınız veya İlgilendiğiniz Özellikler
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Bütçeniz, aradığınız oda sayısı, denize mesafe veya sormak istediğiniz sorular..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  Mesajı Gönder
                </button>

                {submitted && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium text-center animate-fade-in flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Talebiniz kaydedildi. AlanyaMYıldırım adına Mustafa Yıldırım en kısa sürede sizinle iletişime geçecektir.</span>
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
