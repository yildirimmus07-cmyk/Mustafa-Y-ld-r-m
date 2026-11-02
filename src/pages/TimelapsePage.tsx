import React, { useState, useRef } from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import { 
  Play, 
  Pause, 
  Maximize2, 
  Video, 
  Film, 
  HardHat, 
  Layers, 
  Building2, 
  MapPin, 
  Calendar, 
  Volume2, 
  VolumeX, 
  Settings,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const TimelapsePage: React.FC = () => {
  const { 
    timelapseProjects, 
    isAdminLoggedIn, 
    navigateTo 
  } = usePropertyContext();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(timelapseProjects[0]?.id || 'tl-1');
  const activeProject = timelapseProjects.find(p => p.id === selectedProjectId) || timelapseProjects[0];

  // Video playback & control states
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Toggle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Handle speed change
  const handleSpeedChange = (rate: number) => {
    setPlaybackSpeed(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Handle fullscreen
  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const isYouTube = activeProject?.videoUrl?.includes('youtube.com') || activeProject?.videoUrl?.includes('youtu.be');

  // Convert youtube url to embed url if needed
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('embed/')) return url;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1` : url;
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen py-10 selection:bg-amber-500 selection:text-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP BANNER & HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
              <Film className="w-3.5 h-3.5" />
              <span>Dikey (9:16) İnşaat Timelapse Galerisi</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Şantiye Aşamaları & 9:16 Timelapse Videoları
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Alanya'nın seçkin projelerinin temel kazısından anahtar teslimine kadar olan inşaat süreçlerini 9:16 dikey reels formatında izleyin.
            </p>
          </div>

          {/* Admin shortcut button if admin is logged in */}
          {isAdminLoggedIn ? (
            <button
              onClick={() => navigateTo('admin')}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-600/20 cursor-pointer shrink-0 self-start md:self-center"
            >
              <Settings className="w-4 h-4" />
              <span>Yönetici Paneli: Videoları Düzenle</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 shrink-0 self-start md:self-center">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Mustafa Yıldırım Güvencesiyle Resmi Şantiye Kayıtları</span>
            </div>
          )}
        </div>

        {/* PROJECT SELECTOR CHIPS */}
        <div className="mt-8 flex items-center gap-2.5 overflow-x-auto pb-4 border-b border-slate-900 scrollbar-none">
          {timelapseProjects.map((project) => {
            const isSelected = project.id === (activeProject?.id || selectedProjectId);
            const hasVideo = Boolean(project.videoUrl && project.videoUrl.trim() !== '');

            return (
              <button
                key={project.id}
                onClick={() => {
                  setSelectedProjectId(project.id);
                  setIsPlaying(false);
                }}
                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all shrink-0 border cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 group-hover:text-amber-400'
                }`}>
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold truncate max-w-[190px]">{project.title}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span>{project.district.split('/')[0]}</span>
                    <span>·</span>
                    <span className={hasVideo ? 'text-emerald-400 font-medium' : 'text-amber-400/80'}>
                      {hasVideo ? '9:16 Video Hazır' : 'Hazırlanıyor'}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE PROJECT VIEWER: 9:16 VERTICAL FORMAT */}
        {activeProject && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 9:16 VERTICAL VIDEO PLAYER (5 Cols on desktop) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              {/* Phone / Reel Container in 9:16 Aspect Ratio */}
              <div className="w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] rounded-3xl overflow-hidden bg-black border-2 border-slate-800 shadow-2xl relative group flex items-center justify-center">
                
                {/* CASE 1: Vertical HTML5 Video Available */}
                {activeProject.videoUrl && !isYouTube && (
                  <>
                    <video
                      ref={videoRef}
                      src={activeProject.videoUrl}
                      playsInline
                      loop
                      muted={isMuted}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      className="w-full h-full object-cover bg-black"
                    />

                    {/* Gradient Overlays for readability */}
                    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                    {/* Top Overlay Info */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between text-xs z-10">
                      <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white text-[11px] font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>9:16 Timelapse</span>
                      </div>

                      <div className="bg-black/70 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10 text-amber-400 text-[11px] font-mono font-bold">
                        %{activeProject.currentProgressPercent}
                      </div>
                    </div>

                    {/* Center Click-To-Play Button */}
                    <button
                      onClick={togglePlay}
                      className={`absolute inset-0 flex items-center justify-center transition-opacity z-10 cursor-pointer ${
                        isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100 bg-black/40'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                        {isPlaying ? (
                          <Pause className="w-7 h-7 fill-current" />
                        ) : (
                          <Play className="w-7 h-7 fill-current ml-1" />
                        )}
                      </div>
                    </button>

                    {/* Bottom Floating Controls Strip */}
                    <div className="absolute bottom-4 inset-x-4 z-20 space-y-2.5">
                      
                      {/* Project info preview on player */}
                      <div className="pointer-events-none">
                        <div className="text-white text-xs font-bold truncate drop-shadow-md">
                          {activeProject.title}
                        </div>
                        <div className="text-[11px] text-slate-300 drop-shadow-md">
                          {activeProject.district}
                        </div>
                      </div>

                      {/* Interactive Control Buttons */}
                      <div className="bg-slate-950/85 backdrop-blur-md p-2 rounded-2xl border border-white/10 flex items-center justify-between gap-1 text-white">
                        
                        {/* Play/Pause */}
                        <button
                          onClick={togglePlay}
                          className="p-1.5 hover:bg-white/10 rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer"
                          title={isPlaying ? 'Durdur' : 'Oynat'}
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                        </button>

                        {/* Mute/Unmute */}
                        <button
                          onClick={toggleMute}
                          className="p-1.5 hover:bg-white/10 rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer"
                          title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>

                        {/* Speed Switcher */}
                        <div className="flex items-center gap-1 bg-white/5 px-1.5 py-0.5 rounded-lg border border-white/5">
                          {[1, 2, 4, 8].map((rate) => (
                            <button
                              key={rate}
                              onClick={() => handleSpeedChange(rate)}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                                playbackSpeed === rate
                                  ? 'bg-amber-500 text-slate-950 font-bold'
                                  : 'text-slate-400 hover:text-white'
                              }`}
                            >
                              {rate}x
                            </button>
                          ))}
                        </div>

                        {/* Fullscreen */}
                        <button
                          onClick={handleFullscreen}
                          className="p-1.5 hover:bg-white/10 rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer"
                          title="Tam Ekran"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>

                      </div>

                    </div>
                  </>
                )}

                {/* CASE 2: YouTube Embed in 9:16 */}
                {activeProject.videoUrl && isYouTube && (
                  <iframe
                    src={getEmbedUrl(activeProject.videoUrl)}
                    title={activeProject.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                )}

                {/* CASE 3: NO VIDEO YET - SOPHISTICATED 9:16 PLACEHOLDER (NO PUBLIC UPLOAD) */}
                {(!activeProject.videoUrl || activeProject.videoUrl.trim() === '') && (
                  <div className="absolute inset-0 flex flex-col items-center justify-between p-6 text-center bg-radial from-slate-900 to-slate-950">
                    <img 
                      src={activeProject.heroImage} 
                      alt={activeProject.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-xs"
                    />

                    {/* Top pill */}
                    <div className="relative z-10 w-full flex justify-between items-center text-xs">
                      <span className="bg-black/60 px-2.5 py-1 rounded-full border border-white/10 text-[11px] font-mono text-amber-400">
                        9:16 Dikey Format
                      </span>
                      <span className="bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full text-[10px] font-bold">
                        Hazırlanıyor
                      </span>
                    </div>

                    {/* Center message */}
                    <div className="relative z-10 space-y-3 px-2">
                      <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-inner">
                        <HardHat className="w-8 h-8 animate-pulse" />
                      </div>

                      <h3 className="text-base font-bold text-white">
                        Dikey Timelapse Videosu Hazırlanıyor
                      </h3>

                      <p className="text-xs text-slate-400 leading-relaxed max-w-[260px] mx-auto">
                        "{activeProject.title}" projesinin 9:16 dikey şantiye timelapse videosu yakında yayınlanacaktır.
                      </p>

                      {isAdminLoggedIn && (
                        <div className="pt-2">
                          <button
                            onClick={() => navigateTo('admin')}
                            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 mx-auto transition-colors cursor-pointer"
                          >
                            <Settings className="w-3.5 h-3.5" />
                            <span>Yönetici Panelinden Yükle</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Bottom disclaimer */}
                    <div className="relative z-10 text-[10px] text-slate-500">
                      AlanyaMYıldırım · Şantiye Takip Sistemi
                    </div>
                  </div>
                )}

              </div>

              {/* Format explanation pill below player */}
              <div className="mt-3 text-center">
                <span className="text-[11px] text-slate-500 font-medium">
                  📱 Mobil & Sosyal Medya Uyumlu 9:16 Dikey Video Oynatıcı
                </span>
              </div>

            </div>

            {/* PROJECT DETAILS & SPECIFICATIONS (7 Cols on desktop) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Primary Card */}
              <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-5">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                      <MapPin className="w-4 h-4" />
                      <span>{activeProject.district}</span>
                    </span>
                    <span className="font-mono bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded text-[11px]">
                      Kod: {activeProject.id.toUpperCase()}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                    {activeProject.title}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeProject.description}
                </p>

                {/* Construction Progress Bar */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200 flex items-center gap-2">
                      <HardHat className="w-4 h-4 text-amber-400" />
                      <span>Genel İnşaat İlerlemesi</span>
                    </span>
                    <span className="font-mono text-lg font-extrabold text-amber-400">
                      %{activeProject.currentProgressPercent}
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-700"
                      style={{ width: `${activeProject.currentProgressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Zemin ve Radye Temel: %100</span>
                    <span>Anahtar Teslim: {activeProject.deliveryDate}</span>
                  </div>
                </div>

                {/* Specifications Grid */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                    <div className="text-[11px] text-slate-400">Bağımsız Bölüm</div>
                    <div className="text-base font-bold text-white font-mono mt-0.5">
                      {activeProject.totalUnits} Ünite
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                    <div className="text-[11px] text-slate-400">Teslim Tarihi</div>
                    <div className="text-base font-bold text-amber-400 mt-0.5">
                      {activeProject.deliveryDate}
                    </div>
                  </div>
                </div>

                {/* WhatsApp & Mustafa Yıldırım Consultation CTA */}
                <div className="pt-2">
                  <a
                    href={`https://wa.me/905000000000?text=Merhaba Mustafa Bey, ${encodeURIComponent(activeProject.title)} projesinin güncel inşaat durumu, kat planları ve fiyatları hakkında bilgi rica ediyorum.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/20"
                  >
                    <span>💬 Mustafa Yıldırım ile WhatsApp'ta Bilgi Al (+90 500 00 00 00)</span>
                  </a>
                </div>

              </div>

              {/* Construction Milestones */}
              {activeProject.milestones && activeProject.milestones.length > 0 && (
                <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>İnşaat Fazları & Tarihçesi</span>
                  </h3>

                  <div className="space-y-3">
                    {activeProject.milestones.map((m, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3.5">
                        <div className="w-7 h-7 rounded-xl bg-amber-500/10 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-500/20">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-white">{m.title}</span>
                            <span className="text-[11px] text-slate-400 font-mono">{m.date}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {m.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* ALL PROJECTS 9:16 VERTICAL GRID */}
        <div className="mt-16 pt-12 border-t border-slate-900 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <span>Tüm Timelapse Projeleri ({timelapseProjects.length})</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Alanya genelindeki şantiyelerimizden 9:16 dikey formatlı videoları izlemek için bir proje seçin.
              </p>
            </div>

            {isAdminLoggedIn && (
              <button
                onClick={() => navigateTo('admin')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 border border-slate-700 transition-colors shrink-0 cursor-pointer"
              >
                <Settings className="w-4 h-4 text-amber-400" />
                <span>Yönetici Panelinden Proje Ekle / Düzenle</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {timelapseProjects.map((project) => {
              const hasVideo = Boolean(project.videoUrl && project.videoUrl.trim() !== '');
              const isSelected = project.id === activeProject?.id;

              return (
                <div 
                  key={project.id}
                  onClick={() => {
                    setSelectedProjectId(project.id);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  className={`group bg-slate-900 rounded-3xl p-3 border transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Vertical 9:16 Thumbnail */}
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black mb-3">
                    <img 
                      src={project.heroImage} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-black/40" />

                    {/* Top status */}
                    <div className="absolute top-2.5 right-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold backdrop-blur-md ${
                        hasVideo 
                          ? 'bg-emerald-500 text-slate-950' 
                          : 'bg-black/70 text-amber-300 border border-amber-400/30'
                      }`}>
                        {hasVideo ? '9:16 Video' : 'Hazırlanıyor'}
                      </span>
                    </div>

                    {/* Center Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom overlay inside 9:16 frame */}
                    <div className="absolute bottom-2.5 inset-x-2.5 text-white">
                      <div className="text-[10px] font-semibold text-amber-400">{project.district}</div>
                      <div className="text-xs font-bold truncate">{project.title}</div>
                      <div className="text-[10px] text-slate-300 font-mono mt-0.5">İlerleme: %{project.currentProgressPercent}</div>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-400 text-[11px] truncate">{project.district.split('/')[0]}</span>
                    <span className="text-amber-400 font-bold text-[11px] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>İzle</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
