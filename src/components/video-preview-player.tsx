"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

interface VideoPreviewPlayerProps {
  url: string;
  thumbnail?: string;
  title?: string;
  className?: string;
}

export function VideoPreviewPlayer({ url, thumbnail, title, className = "" }: VideoPreviewPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFullscreenChange = useCallback(() => {
    setFullscreen(!!document.fullscreenElement);
  }, []);

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [handleFullscreenChange]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!fullscreen) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative group rounded-lg overflow-hidden bg-black ${className}`}
    >
      <video
        ref={videoRef}
        src={url}
        poster={thumbnail}
        muted={muted}
        playsInline
        preload="metadata"
        onCanPlay={() => setLoaded(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        className="w-full aspect-video object-contain"
      />

      {/* Play overlay when not playing */}
      {!playing && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity group-hover:bg-black/40"
          onClick={togglePlay}
        >
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Play className="h-6 w-6 text-[#E52222] ml-1" fill="#E52222" />
          </div>
        </div>
      )}

      {/* Controls overlay */}
      {loaded && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button onClick={togglePlay} className="text-white hover:text-[#E52222] transition-colors">
                {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              <button onClick={toggleMute} className="text-white hover:text-[#E52222] transition-colors">
                {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              {title && <span className="text-white text-xs truncate max-w-[200px]">{title}</span>}
            </div>
            <button onClick={toggleFullscreen} className="text-white hover:text-[#E52222] transition-colors">
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
