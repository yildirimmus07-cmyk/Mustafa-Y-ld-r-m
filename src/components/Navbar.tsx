import React, { useState } from 'react';
import { usePropertyContext, PageName } from '../context/PropertyContext';
import { Currency } from '../types/property';
import { 
  Building2, 
  Heart, 
  Menu, 
  X, 
  UserCheck, 
  Compass, 
  PhoneCall, 
  Layers
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    navigateTo, 
    currency, 
    setCurrency, 
    favorites, 
    isAdminLoggedIn, 
    logoutAdmin 
  } = usePropertyContext();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { name: string; page: PageName; icon?: React.ReactNode }[] = [
    { name: 'Ana Sayfa', page: 'home' },
    { name: 'İlanlar', page: 'listings' },
    { name: 'Timelapse Projeler', page: 'timelapse' },
    { name: 'Hizmetlerimiz', page: 'services' },
    { name: 'Hakkımızda', page: 'about' },
    { name: 'İletişim', page: 'contact' },
  ];

  const handleNavClick = (page: PageName) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => handleNavClick('home')} 
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-sm">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
                  Alanya<span className="text-amber-600">MYıldırım</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-600">
                  Gayrimenkul & Yatırım
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`relative py-1.5 whitespace-nowrap transition-colors hover:text-slate-900 ${
                    isActive 
                      ? 'text-slate-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-500' 
                      : ''
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Currency, Favorites, Admin Portal) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            
            {/* Currency Selector */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs font-semibold">
              {(['EUR', 'TRY', 'USD', 'GBP'] as Currency[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                    currency === cur
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title={`${cur} para birimine geç`}
                >
                  {cur}
                </button>
              ))}
            </div>

            {/* Favorites Icon */}
            <button
              onClick={() => handleNavClick('listings')}
              className="relative p-2 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-slate-100 transition-colors"
              title="Favorilerim"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Admin or Login Button */}
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    activePage === 'admin'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-amber-300" />
                  Yönetim Paneli
                </button>
                <button
                  onClick={logoutAdmin}
                  className="px-2.5 py-2 text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Çıkış Yap"
                >
                  Çıkış
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap border border-slate-200"
              >
                Yönetici Girişi
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 rounded-lg shadow-xs hover:shadow transition-all whitespace-nowrap flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Bize Ulaşın
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Currency selector on mobile */}
            <div className="flex items-center bg-slate-100 rounded p-0.5 text-[11px] font-bold">
              {(['EUR', 'TRY'] as Currency[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`px-1.5 py-0.5 rounded ${
                    currency === cur ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Menüyü aç"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-left ${
                  activePage === link.page
                    ? 'bg-amber-50 text-amber-900 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.name}</span>
                {link.page === 'timelapse' && (
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                    Canlı Video
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between px-2 text-xs text-slate-500 font-medium">
              <span>Para Birimi:</span>
              <div className="flex items-center gap-1">
                {(['EUR', 'TRY', 'USD', 'GBP'] as Currency[]).map((cur) => (
                  <button
                    key={cur}
                    onClick={() => setCurrency(cur)}
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      currency === cur ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {isAdminLoggedIn ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="flex-1 py-2.5 text-center text-xs font-bold text-white bg-slate-900 rounded-lg"
                  >
                    Yönetim Paneli
                  </button>
                  <button
                    onClick={logoutAdmin}
                    className="px-4 py-2.5 text-center text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg"
                  >
                    Çıkış
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNavClick('login')}
                  className="w-full py-2.5 text-center text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
                >
                  Yönetici Girişi
                </button>
              )}

              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-amber-600 rounded-lg"
              >
                Danışmanla İletişime Geç
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
