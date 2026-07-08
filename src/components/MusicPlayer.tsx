/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Music, Music4 } from "lucide-react";

interface MusicPlayerProps {
  shouldPlay: boolean;
}

export default function MusicPlayer({ shouldPlay }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (shouldPlay) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log("Autoplay blocked or audio interrupted:", err);
            setIsPlaying(false);
          });
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [shouldPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Failed to play audio:", err));
    }
  };

  return (
    <div id="music-player-container" className="fixed bottom-6 right-6 z-50">
      <button
        id="btn-music-toggle"
        onClick={togglePlay}
        className={`flex h-12 w-12 items-center justify-center rounded-full border border-amber-200 bg-[#1e1610]/90 text-amber-200 shadow-xl transition-all duration-300 hover:scale-115 active:scale-95 ${
          isPlaying ? "animate-[spin_8s_linear_infinite]" : "hover:bg-[#1e1610]"
        }`}
        title={isPlaying ? "Musiqani to'xtatish" : "Musiqani tinglash"}
      >
        {isPlaying ? (
          <Music4 id="icon-music-playing" className="h-5 w-5" />
        ) : (
          <Music id="icon-music-paused" className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
