import React from 'react';
import { PropertyProvider, usePropertyContext } from './context/PropertyContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { TimelapsePage } from './pages/TimelapsePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { MessageSquare, PhoneCall } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activePage } = usePropertyContext();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'listings':
        return <ListingsPage />;
      case 'property-detail':
        return <PropertyDetailPage />;
      case 'timelapse':
        return <TimelapsePage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  const whatsappUrl = `https://wa.me/905000000000?text=${encodeURIComponent(
    'Merhaba AlanyaMYıldırım ekibi, satılık ve kiralık emlak portföyünüz hakkında bilgi almak istiyorum.'
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <Navbar />
      
      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer />

      {/* Floating Quick WhatsApp Chat Widget */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile canlı destek alın"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center group"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          Canlı WhatsApp Destek
        </span>
      </a>
    </div>
  );
};

export default function App() {
  return (
    <PropertyProvider>
      <MainContent />
    </PropertyProvider>
  );
}
