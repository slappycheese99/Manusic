'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Shuffle, 
  Repeat, 
  Repeat1,
  Music,
  Settings,
  LogOut,
  Info
} from 'lucide-react';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import { useAuth } from '@/contexts/AuthContext';
import { Track } from '@/data/sampleTracks';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MusicPlayerProps {
  playlist: Track[];
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ playlist = [] }) => {
  const { logout, user } = useAuth();
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffled,
    repeatMode,
    togglePlay,
    handleNext,
    handlePrevious,
    selectTrack,
    seekTo,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    toggleMute,
    formatTime
  } = useMusicPlayer(playlist);

  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleProgressChange = (value: number[]) => {
    seekTo(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
  };

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 'one':
        return <Repeat1 className="w-5 h-5" />;
      case 'all':
        return <Repeat className="w-5 h-5" />;
      default:
        return <Repeat className="w-5 h-5" />;
    }
  };

  const getRepeatTitle = () => {
    switch (repeatMode) {
      case 'one':
        return 'Repeat One';
      case 'all':
        return 'Repeat All';
      default:
        return 'Repeat Off';
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-white/20 shadow-2xl">
      <CardContent className="p-6">
        {/* Album Art */}
        <motion.div
          className="relative mb-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-64 h-64 mx-auto bg-gradient-to-br from-purple-400 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Music className="w-24 h-24 text-white/80" />
          </div>
          
          {/* Animated visualizer */}
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(147, 51, 234, 0.3)",
                  "0 0 40px rgba(147, 51, 234, 0.5)",
                  "0 0 20px rgba(147, 51, 234, 0.3)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>

        {/* Track Info */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-foreground mb-1 truncate">
            {currentTrack?.title || 'No Track Selected'}
          </h2>
          <p className="text-muted-foreground truncate">
            {currentTrack?.artist || 'Unknown Artist'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleProgressChange}
            className="w-full mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleShuffle}
            className={`${isShuffled ? 'text-purple-600' : 'text-muted-foreground'} hover:text-purple-600`}
            title={isShuffled ? 'Shuffle On' : 'Shuffle Off'}
          >
            <Shuffle className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            className="text-muted-foreground hover:text-foreground"
          >
            <SkipBack className="w-6 h-6" />
          </Button>

          <Button
            size="icon"
            onClick={togglePlay}
            className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="text-muted-foreground hover:text-foreground"
          >
            <SkipForward className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleRepeat}
            className={`${repeatMode !== 'off' ? 'text-purple-600' : 'text-muted-foreground'} hover:text-purple-600`}
            title={getRepeatTitle()}
          >
            {getRepeatIcon()}
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="text-muted-foreground hover:text-foreground"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume * 100]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="flex-1"
          />
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-between">
          <DropdownMenu open={showPlaylist} onOpenChange={setShowPlaylist}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                Choose Song
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 max-h-64 overflow-y-auto">
              {playlist.map((track) => (
                <DropdownMenuItem
                  key={track.id}
                  onClick={() => selectTrack(track.id)}
                  className={`${currentTrack?.id === track.id ? 'bg-purple-50 dark:bg-purple-900/20' : ''}`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium truncate">{track.title}</span>
                    <span className="text-xs text-muted-foreground truncate">{track.artist}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex gap-2">
            <DropdownMenu open={showAbout} onOpenChange={setShowAbout}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" title="About">
                  <Info className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80">
                <div className="p-4">
                  <h3 className="font-semibold mb-2">About Manusic</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Simple music player created by Manus, from the ideas of "088-Sena". 
                    All songs are original copyright of "088-Sena" please do not use anywhere else without permission. 
                    But please enjoy listening to your hearts content (with a little catch).
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Any ideas, suggestions, or just saying hi, contact me at [contact info]
                  </p>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu open={showSettings} onOpenChange={setShowSettings}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" title="Settings">
                  <Settings className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem disabled>
                  <span className="text-sm">Logged in as: {user?.username}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;

