import React, { useState } from "react";
import { Play, Pause, Volume2, VolumeX, Music, Clock } from "lucide-react";
import type { MusicTrack } from "../data/music";

interface MusicPlayerProps {
  tracks: MusicTrack[];
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ tracks }) => {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [simulatedProgress, setSimulatedProgress] = useState(0);

  const currentTrack = tracks[selectedTrackIndex] || tracks[0];

  const handlePlayToggle = () => {
    // If no audioSrc provided, track is coming soon
    if (!currentTrack.audioSrc) {
      alert("This original piece is currently in recording and will be available to listen here soon!");
      return;
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
      {/* Track Selection List */}
      <div className="space-y-4 mb-8">
        <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E]">
          Original Compositions
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tracks.map((track, index) => {
            const isSelected = selectedTrackIndex === index;
            return (
              <div
                key={track.id}
                onClick={() => {
                  setSelectedTrackIndex(index);
                  setIsPlaying(false);
                  setSimulatedProgress(0);
                }}
                className={`cursor-pointer p-4 rounded-sm border transition-all ${
                  isSelected
                    ? "border-[#856E4E] bg-[#F7F3EB]"
                    : "border-[#EFE9DD] bg-white hover:border-[#D5CCBC]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#EFE9DD] flex items-center justify-center text-[#736B61]">
                      <Music className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-medium text-[#221E1B]">
                        {track.title}
                      </h4>
                      <p className="text-[11px] text-[#736B61]">{track.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#EFE9DD] text-[#736B61]">
                    {track.status === "coming_soon" ? "Coming Soon" : track.duration}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Playback Deck */}
      <div className="pt-6 border-t border-[#EFE9DD] flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#968D81] font-mono">
              Now Selected
            </span>
            <h3 className="font-serif text-2xl text-[#221E1B] font-medium">
              {currentTrack.title}
            </h3>
            <p className="text-xs text-[#736B61] italic mt-0.5">
              {currentTrack.description}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Play / Pause Button */}
            <button
              onClick={handlePlayToggle}
              className="w-12 h-12 rounded-full bg-[#221E1B] text-[#FDFBF7] hover:bg-[#856E4E] flex items-center justify-center shadow transition-colors focus:outline-none focus:ring-2 focus:ring-[#856E4E]"
              aria-label={isPlaying ? "Pause track" : "Play track"}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
          </div>
        </div>

        {/* Progress Bar (Scrubber) */}
        <div className="space-y-1">
          <div className="w-full bg-[#EFE9DD] h-1.5 rounded-full overflow-hidden relative">
            <div
              className="bg-[#856E4E] h-full transition-all duration-300"
              style={{ width: `${simulatedProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-[#968D81]">
            <span>00:00</span>
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {currentTrack.duration}
            </span>
          </div>
        </div>

        {/* Bottom Audio Status Note & Volume Control */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#736B61] pt-2 gap-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 text-[#736B61] hover:text-[#221E1B]"
              aria-label="Toggle mute"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                setIsMuted(false);
              }}
              className="w-24 accent-[#856E4E] h-1 bg-[#EFE9DD] rounded-lg cursor-pointer"
              aria-label="Volume slider"
            />
          </div>

          <div className="bg-[#F7F3EB] px-3 py-1.5 rounded border border-[#EFE9DD] text-[11px] text-[#736B61]">
            <span className="font-semibold text-[#856E4E]">Notice:</span> Authentic original tracks will be playable here upon release. No placeholder audio is auto-played.
          </div>
        </div>
      </div>
    </div>
  );
};
