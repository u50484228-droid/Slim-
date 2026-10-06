import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Volume2, Play } from 'lucide-react';
import { recordClick, recordVideoWatchTime, recordVideoStarted } from '../utils/analytics';

export const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [secondsWatched, setSecondsWatched] = useState(0);
  const watchIntervalRef = useRef<any>(null);

  // Listen for YouTube iframe player state events
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (data && (data.event === 'onStateChange' || data.event === 'initialDelivery')) {
          if (data.info === 1) {
            // Playing
            setIsPlaying(true);
            setHasStarted(true);
            recordVideoStarted();
          } else if (data.info === 2 || data.info === 0) {
            // Paused or Ended
            setIsPlaying(false);
          }
        }
      } catch {
        // Not a JSON message or unrelated iframe
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Track elapsed seconds while playing
  useEffect(() => {
    if (isPlaying) {
      watchIntervalRef.current = setInterval(() => {
        setSecondsWatched((prev) => {
          const next = prev + 1;
          recordVideoWatchTime(1);
          return next;
        });
      }, 1000);
    } else {
      if (watchIntervalRef.current) {
        clearInterval(watchIntervalRef.current);
        watchIntervalRef.current = null;
      }
    }

    return () => {
      if (watchIntervalRef.current) {
        clearInterval(watchIntervalRef.current);
      }
    };
  }, [isPlaying]);

  const handleStartPlay = () => {
    setIsPlaying(true);
    setHasStarted(true);
    recordVideoStarted();
    recordClick('Deu Play no Vídeo Oficial', 'video');
  };

  const formatWatchTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="video" className="py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a182b] via-[#0d223c] to-[#0a182b] text-white border-y border-amber-500/20">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>EXCLUSIVE VIDEO PRESENTATION</span>
        </div>

        {/* Section Title & Subtitle */}
        <div className="max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Watch The Official <span className="text-amber-400">SodaSlim</span> Formula Breakdown
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Discover in detail how the five natural active ingredients work in synergy to support healthy metabolism and daily appetite control.
          </p>
        </div>

        {/* Video Player Container (16:9 Aspect Ratio) */}
        <div className="relative mx-auto rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-black max-w-3xl aspect-video group">
          
          {/* YouTube Embed without external links */}
          <iframe
            id="sodaslim-youtube-player"
            src={`https://www.youtube-nocookie.com/embed/HIvXTRbFr4g?enablejsapi=1&origin=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')}&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&controls=1${isPlaying ? '&autoplay=1' : ''}`}
            title="Official SodaSlim Presentation"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />

          {/* Initial Play Overlay for reliable 1-click play tracking */}
          {!hasStarted && (
            <div
              onClick={handleStartPlay}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex flex-col items-center justify-center cursor-pointer z-30 transition hover:bg-slate-950/40"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:scale-110 active:scale-95 transition">
                <Play className="w-10 h-10 text-slate-950 fill-slate-950 ml-1.5" />
              </div>
              <p className="mt-4 text-sm font-extrabold text-amber-300 tracking-wide uppercase">
                Clique Para Assistir à Apresentação
              </p>
              <span className="text-[11px] text-slate-300 mt-0.5">
                (Duração: ~3 minutos)
              </span>
            </div>
          )}

          {/* Invisible Anti-Redirect Shield Over YouTube Top Bar (Blocks title & share links to youtube.com) */}
          <div 
            className="absolute top-0 inset-x-0 h-16 z-20 cursor-default bg-transparent pointer-events-none sm:pointer-events-auto"
            title="SodaSlim Official Presentation"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Invisible Anti-Redirect Shield Over YouTube Bottom-Right Watermark (Blocks 'Watch on YouTube' logo) */}
          <div 
            className="absolute bottom-0 right-0 w-36 h-12 z-20 cursor-default bg-transparent pointer-events-none sm:pointer-events-auto"
            title="SodaSlim Player"
            onClick={(e) => e.stopPropagation()}
          />

        </div>

        {/* Video Note & Live Watch Time Counter */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-[11px] text-slate-400 pt-1">
          <div className="flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Make sure your device audio is turned on for the best viewing experience.</span>
          </div>

          {secondsWatched > 0 && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 font-mono text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Tempo assistido: {formatWatchTime(secondsWatched)}</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
