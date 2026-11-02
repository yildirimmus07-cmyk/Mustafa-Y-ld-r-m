import React, { useState } from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import { 
  Building2, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  Sparkles 
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginAdmin, navigateTo, isAdminLoggedIn } = usePropertyContext();

  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // If already logged in, show shortcut to admin
  if (isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-xl text-center">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Zaten Giriş Yapıldı</h2>
          <p className="text-xs text-slate-500 mb-6">Yönetici oturumunuz şu anda aktif durumdadır.</p>
          <button
            onClick={() => navigateTo('admin')}
            className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 transition-colors"
          >
            Yönetim Paneline Git &rarr;
          </button>
        </div>
      </div>
    );
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (success) {
      setError(false);
      navigateTo('admin');
    } else {
      setError(true);
    }
  };

  const fillDemoPassword = () => {
    setPassword('admin123');
    setError(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-16">
      <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full border border-slate-200 shadow-xl">
        
        {/* Brand Icon */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-amber-400 mx-auto mb-3 shadow-sm">
            <Building2 className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Yönetici Girişi
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            AlanyaMYıldırım İlan ve Portföy Yönetim Paneli
          </p>
        </div>

        {/* Demo Credentials Helper Box */}
        <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200/60 mb-6 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900">
            <div className="font-bold mb-0.5">Ders & Demo Kullanıcı Bilgisi:</div>
            <div>Şifre: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-amber-800 border border-amber-200">admin123</code></div>
            <button
              type="button"
              onClick={fillDemoPassword}
              className="mt-2 text-[11px] font-bold text-amber-800 hover:text-amber-950 underline cursor-pointer"
            >
              Şifreyi Otomatik Doldur
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Yönetici Şifresi
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Yönetici şifrenizi girin..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 pl-9"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Hatalı şifre. Lütfen <strong>admin123</strong> yazarak tekrar deneyin.</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Panele Giriş Yap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Back to Home */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <button
            onClick={() => navigateTo('home')}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            &larr; Ana Sayfaya Geri Dön
          </button>
        </div>

      </div>
    </div>
  );
};
