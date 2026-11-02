import React, { useState, useRef } from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import { TimelapseProject } from '../types/property';
import { 
  Play, 
  Pause, 
  Maximize2, 
  UploadCloud, 
  Video, 
  Film, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  HardHat, 
  Layers, 
  Building2, 
  MapPin, 
  Calendar, 
  Trash2, 
  Edit3, 
  RotateCcw,
  Sparkles,
  Link,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';

export const TimelapsePage: React.FC = () => {
  const { 
    timelapseProjects, 
    updateTimelapseProject, 
    addTimelapseProject, 
    deleteTimelapseProject,
    navigateTo 
  } = usePropertyContext();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(timelapseProjects[0]?.id || 'tl-1');
  const activeProject = timelapseProjects.find(p => p.id === selectedProjectId) || timelapseProjects[0];

  // Video playback & control states
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [uploadToast, setUploadToast] = useState<string | null>(null);

  // Hidden file inputs refs
  const mainVideoFileInputRef = useRef<HTMLInputElement | null>(null);
  const newProjectFileInputRef = useRef<HTMLInputElement | null>(null);

  // Add New Project Modal state
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDistrict, setNewDistrict] = useState<string>('Mahmutlar / Alanya');
  const [newDeliveryDate, setNewDeliveryDate] = useState<string>('Aralık 2026');
  const [newProgressPercent, setNewProgressPercent] = useState<number>(75);
  const [newTotalUnits, setNewTotalUnits] = useState<number>(90);
  const [newDescription, setNewDescription] = useState<string>('');
  const [newVideoUrl, setNewVideoUrl] = useState<string>('');
  const [newVideoFileName, setNewVideoFileName] = useState<string>('');

  // Handle direct file upload for active project
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, projectId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Use createObjectURL for smooth, instant local playback without memory limits
    const objectUrl = URL.createObjectURL(file);
    
    updateTimelapseProject(projectId, {
      videoUrl: objectUrl
    });

    setUploadToast(`"${file.name}" başarıyla yüklendi ve projeye bağlandı.`);
    setTimeout(() => setUploadToast(null), 4000);

    // Auto-play the newly uploaded video
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }

    // Reset input
    e.target.value = '';
  };

  // Handle file select in the "Add New Project" modal
  const handleNewProjectFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setNewVideoUrl(objectUrl);
    setNewVideoFileName(file.name);
  };

  const handleCreateNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProject: Omit<TimelapseProject, 'id'> = {
      title: newTitle.trim(),
      district: newDistrict.trim(),
      deliveryDate: newDeliveryDate.trim(),
      totalUnits: Number(newTotalUnits) || 50,
      currentProgressPercent: Number(newProgressPercent) || 50,
      heroImage: '/src/assets/images/timelapse_project_emerald_1793604907854.jpg',
      videoUrl: newVideoUrl,
      description: newDescription.trim() || `${newTitle} projesinin güncel inşaat ve şantiye aşamaları.`,
      milestones: [
        {
          stage: 'Aşama 1',
          title: 'Temel & Kaba İnşaat',
          date: '2025',
          description: 'Zemin güçlendirme ve taşıyıcı karkas imalatı.',
          image: '/src/assets/images/timelapse_project_emerald_1793604907854.jpg',
          progressPercent: 30,
          concretePercent: 50,
          facadePercent: 0,
          interiorPercent: 0
        },
        {
          stage: 'Aşama 2 (Güncel)',
          title: 'Dış Cephe & İnce İmalatlar',
          date: '2026',
          description: 'Cephe giydirme ve peyzaj çalışmaları.',
          image: '/src/assets/images/listing_mahmutlar_residence_1793604907502.jpg',
          progressPercent: Number(newProgressPercent) || 70,
          concretePercent: 100,
          facadePercent: 60,
          interiorPercent: 40
        }
      ]
    };

    addTimelapseProject(newProject);
    setIsNewProjectModalOpen(false);
    
    // Reset modal form
    setNewTitle('');
    setNewVideoUrl('');
    setNewVideoFileName('');
    setNewDescription('');

    setUploadToast('Yeni video projesi başarıyla eklendi!');
    setTimeout(() => setUploadToast(null), 4000);
  };

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

        {/* TOP BANNER & ACTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
              <Film className="w-3.5 h-3.5" />
              <span>Şantiye & Yapı Timelapse Galerisi</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              İnşaat Aşamaları & Timelapse Videoları
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Alanya genelinde yükselen projelerimizin yapım aşamalarını izleyin. Kendi video dosyalarınızı doğrudan dosya seçerek sisteme yükleyebilir ve yüksek hızda timelapse olarak izleyebilirsiniz.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Direct upload button for active project */}
            <input
              type="file"
              ref={mainVideoFileInputRef}
              accept="video/*"
              onChange={(e) => activeProject && handleFileChange(e, activeProject.id)}
              className="hidden"
            />
            <button
              onClick={() => mainVideoFileInputRef.current?.click()}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-600/20 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>📁 Bu Projeye Video Dosyası Yükle</span>
            </button>

            {/* Add New Project Modal Trigger */}
            <button
              onClick={() => setIsNewProjectModalOpen(true)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition-colors border border-slate-700 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>+ Yeni Video Projesi Ekle</span>
            </button>
          </div>
        </div>

        {/* TOAST NOTIFICATION */}
        {uploadToast && (
          <div className="mt-4 p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{uploadToast}</span>
          </div>
        )}

        {/* PROJECT SELECTOR TABS */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-4 border-b border-slate-900 scrollbar-none">
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
                    ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/5'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 group-hover:text-amber-400'
                }`}>
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold truncate max-w-[180px]">{project.title}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span>{project.district.split('/')[0]}</span>
                    <span>·</span>
                    <span className={hasVideo ? 'text-emerald-400 font-medium' : 'text-amber-400/80'}>
                      {hasVideo ? '🎥 Video Hazır' : '⏳ Video Yükle'}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE PROJECT VIEWER */}
        {activeProject && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* VIDEO PLAYER COLUMN (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl aspect-16/9 group">
                
                {/* CASE 1: Video is available (direct file / blob or external link) */}
                {activeProject.videoUrl && !isYouTube && (
                  <>
                    <video
                      ref={videoRef}
                      src={activeProject.videoUrl}
                      controls
                      playsInline
                      muted={isMuted}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      className="w-full h-full object-cover bg-black"
                    />

                    {/* Floating Speed & Control Strip Overlay */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white text-xs font-bold flex items-center gap-2 pointer-events-auto">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Timelapse Oynatıcı</span>
                      </div>

                      <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white text-xs font-bold flex items-center gap-2 pointer-events-auto">
                        <span className="text-[11px] text-slate-400">Hız:</span>
                        {[1, 2, 4, 8].map((rate) => (
                          <button
                            key={rate}
                            onClick={() => handleSpeedChange(rate)}
                            className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                              playbackSpeed === rate
                                ? 'bg-amber-500 text-slate-950 font-extrabold'
                                : 'hover:bg-white/10 text-slate-300'
                            }`}
                          >
                            {rate}x
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* CASE 2: YouTube Embed */}
                {activeProject.videoUrl && isYouTube && (
                  <iframe
                    src={getEmbedUrl(activeProject.videoUrl)}
                    title={activeProject.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                )}

                {/* CASE 3: NO VIDEO YET - DROPZONE & DIRECT FILE UPLOAD */}
                {(!activeProject.videoUrl || activeProject.videoUrl.trim() === '') && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-radial from-slate-900 to-slate-950">
                    <img 
                      src={activeProject.heroImage} 
                      alt={activeProject.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-xs"
                    />
                    <div className="relative z-10 max-w-md space-y-4">
                      <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-inner">
                        <UploadCloud className="w-8 h-8 animate-bounce" />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">
                          Bu Proje İçin Video Dosyası Yükleyin
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          "{activeProject.title}" inşaatına ait timelapse veya drone videonuzu bilgisayarınızdan veya telefonunuzdan direkt seçin.
                        </p>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <input
                          type="file"
                          accept="video/*"
                          id={`file-input-${activeProject.id}`}
                          onChange={(e) => handleFileChange(e, activeProject.id)}
                          className="hidden"
                        />
                        <label
                          htmlFor={`file-input-${activeProject.id}`}
                          className="w-full sm:w-auto px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-amber-500/20"
                        >
                          <Film className="w-4 h-4" />
                          <span>Video Dosyası Seç (.mp4, .mov, .webm)</span>
                        </label>
                      </div>

                      {/* Direct Link Input Fallback */}
                      <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-center gap-2">
                        <Link className="w-3.5 h-3.5 text-slate-400" />
                        <span>veya bir MP4 / YouTube linki yapıştırın:</span>
                        <button
                          onClick={() => {
                            const url = prompt('Video URL adresini girin (MP4 veya YouTube):');
                            if (url && url.trim()) {
                              updateTimelapseProject(activeProject.id, { videoUrl: url.trim() });
                            }
                          }}
                          className="text-amber-400 underline font-semibold cursor-pointer"
                        >
                          Link Ekle
                        </button>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              {/* VIDEO TOOLBAR UNDER PLAYER */}
              <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* File Upload Trigger */}
                  <input
                    type="file"
                    accept="video/*"
                    id={`file-input-bar-${activeProject.id}`}
                    onChange={(e) => handleFileChange(e, activeProject.id)}
                    className="hidden"
                  />
                  <label
                    htmlFor={`file-input-bar-${activeProject.id}`}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>{activeProject.videoUrl ? 'Videoyu Değiştir (Dosya Seç)' : 'Video Dosyası Yükle'}</span>
                  </label>

                  {/* Remove Video if set */}
                  {activeProject.videoUrl && (
                    <button
                      onClick={() => {
                        if (confirm('Bu projenin videosunu kaldırmak istediğinize emin misiniz?')) {
                          updateTimelapseProject(activeProject.id, { videoUrl: '' });
                        }
                      }}
                      className="px-3 py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Videoyu Kaldır</span>
                    </button>
                  )}
                </div>

                {/* Timelapse Fast Forward Speed Switcher */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Oynatma Hızı:</span>
                  {[0.5, 1, 2, 4, 8].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => handleSpeedChange(rate)}
                      className={`px-2 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        playbackSpeed === rate
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* PROJECT DETAILS & STATS COLUMN (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Main Card */}
              <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-5">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{activeProject.district}</span>
                    </span>
                    <span className="font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      ID: {activeProject.id}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white leading-snug">
                    {activeProject.title}
                  </h2>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeProject.description}
                </p>

                {/* Progress Bar */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300 flex items-center gap-1.5">
                      <HardHat className="w-3.5 h-3.5 text-amber-400" />
                      <span>İnşaat İlerleme Oranı</span>
                    </span>
                    <span className="font-mono text-base font-extrabold text-amber-400">
                      %{activeProject.currentProgressPercent}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
                      style={{ width: `${activeProject.currentProgressPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Zemin Hazırlığı: %100</span>
                    <span>Hedef Teslim: {activeProject.deliveryDate}</span>
                  </div>
                </div>

                {/* Project Specs */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <div className="text-[11px] text-slate-400">Bağımsız Bölüm</div>
                    <div className="text-base font-bold text-white font-mono mt-0.5">
                      {activeProject.totalUnits} Daire / Villa
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <div className="text-[11px] text-slate-400">Anahtar Teslim</div>
                    <div className="text-base font-bold text-amber-400 mt-0.5">
                      {activeProject.deliveryDate}
                    </div>
                  </div>
                </div>

                {/* WhatsApp & Inquiry CTA */}
                <div className="pt-2">
                  <a
                    href={`https://wa.me/905000000000?text=Merhaba Mustafa Bey, ${encodeURIComponent(activeProject.title)} projesinin inşaat durumu ve fiyatları hakkında bilgi alabilir miyim?`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/20"
                  >
                    <span>💬 Mustafa Yıldırım ile WhatsApp'ta Görüş</span>
                  </a>
                </div>

              </div>

              {/* Construction Milestones Preview */}
              {activeProject.milestones && activeProject.milestones.length > 0 && (
                <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>İnşaat Fazları & Tarihçesi</span>
                  </h3>

                  <div className="space-y-3">
                    {activeProject.milestones.map((m, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                        <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-[11px] flex items-center justify-center shrink-0 border border-amber-500/20">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-white">{m.title}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{m.date}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
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

        {/* ALL PROJECTS VIDEO GRID */}
        <div className="mt-16 pt-12 border-t border-slate-900 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <span>Tüm Timelapse Projeleri ({timelapseProjects.length})</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Her bir projenin üzerine tıklayarak oynatıcıda açabilir veya doğrudan kendi video dosyanızı yükleyebilirsiniz.
              </p>
            </div>

            <button
              onClick={() => setIsNewProjectModalOpen(true)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 border border-slate-700 transition-colors shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Yeni Proje Yuvası Aç</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelapseProjects.map((project) => {
              const hasVideo = Boolean(project.videoUrl && project.videoUrl.trim() !== '');

              return (
                <div 
                  key={project.id}
                  className={`group bg-slate-900 rounded-3xl p-4 border transition-all flex flex-col justify-between ${
                    project.id === activeProject?.id
                      ? 'border-amber-500 shadow-xl shadow-amber-500/10'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    {/* Thumbnail & Video Badge */}
                    <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-950 mb-3">
                      <img 
                        src={project.heroImage} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                      <div className="absolute top-2.5 right-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold backdrop-blur-md ${
                          hasVideo 
                            ? 'bg-emerald-500/90 text-slate-950' 
                            : 'bg-black/70 text-amber-300 border border-amber-400/30'
                        }`}>
                          {hasVideo ? '▶ Video Var' : 'Dosya Bekleniyor'}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white font-medium">
                        <span>{project.district}</span>
                        <span className="font-mono text-amber-400 font-bold">%{project.currentProgressPercent}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-white text-sm mb-1.5 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setSelectedProjectId(project.id);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-bold rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>İzle</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <input
                        type="file"
                        accept="video/*"
                        id={`card-upload-${project.id}`}
                        onChange={(e) => handleFileChange(e, project.id)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`card-upload-${project.id}`}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs cursor-pointer transition-colors"
                        title="Video Dosyası Yükle"
                      >
                        <UploadCloud className="w-3.5 h-3.5 text-amber-400" />
                      </label>

                      {timelapseProjects.length > 1 && (
                        <button
                          onClick={() => {
                            if (confirm(`"${project.title}" projesini silmek istediğinize emin misiniz?`)) {
                              deleteTimelapseProject(project.id);
                            }
                          }}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="Projeyi Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* MODAL: ADD NEW TIMELAPSE VIDEO PROJECT */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-white my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold">Yeni Timelapse Video Projesi Ekle</h3>
              </div>
              <button
                onClick={() => setIsNewProjectModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Proje Adı *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Cleopatra Marina Sky Suites"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-medium focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Bölge / Konum
                  </label>
                  <input
                    type="text"
                    value={newDistrict}
                    onChange={(e) => setNewDistrict(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Hedef Teslim
                  </label>
                  <input
                    type="text"
                    value={newDeliveryDate}
                    onChange={(e) => setNewDeliveryDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    İlerleme Oranı (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newProgressPercent}
                    onChange={(e) => setNewProgressPercent(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Toplam Ünite
                  </label>
                  <input
                    type="number"
                    value={newTotalUnits}
                    onChange={(e) => setNewTotalUnits(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* Video File Upload Slot */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="block text-xs font-bold text-amber-400">
                  Video Dosyası Yükleyin (.mp4, .mov, .webm)
                </label>
                
                <input
                  type="file"
                  ref={newProjectFileInputRef}
                  accept="video/*"
                  onChange={handleNewProjectFileChange}
                  className="hidden"
                />

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => newProjectFileInputRef.current?.click()}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Dosya Seç</span>
                  </button>

                  <span className="text-xs text-slate-400 truncate">
                    {newVideoFileName || 'Henüz dosya seçilmedi (isteğe bağlı)'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Proje Açıklaması
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Proje hakkında kısa bilgi..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewProjectModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Projeyi Ekle</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
