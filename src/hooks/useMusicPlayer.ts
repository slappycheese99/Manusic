import { useState, useRef, useEffect, useCallback } from 'react';
import { Track } from '@/data/sampleTracks';

export const useMusicPlayer = (playlist: Track[] = []) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [shuffledPlaylist, setShuffledPlaylist] = useState<Track[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentPlaylist = isShuffled ? shuffledPlaylist : playlist;
  const currentTrack = currentPlaylist[currentTrackIndex];

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      handleNext();
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, []);

  // Update audio source when track changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.load();
    }
  }, [currentTrack]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Time update interval
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  // Shuffle playlist
  const shuffleArray = useCallback((array: Track[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  }, [isPlaying, currentTrack]);

  const handleNext = useCallback(() => {
    if (repeatMode === 'one') {
      // Repeat current track
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(console.error);
      }
      return;
    }

    const nextIndex = currentTrackIndex + 1;
    if (nextIndex < currentPlaylist.length) {
      setCurrentTrackIndex(nextIndex);
    } else if (repeatMode === 'all') {
      setCurrentTrackIndex(0);
    } else {
      setIsPlaying(false);
    }
  }, [currentTrackIndex, currentPlaylist.length, repeatMode]);

  const handlePrevious = useCallback(() => {
    const prevIndex = currentTrackIndex - 1;
    if (prevIndex >= 0) {
      setCurrentTrackIndex(prevIndex);
    } else if (repeatMode === 'all') {
      setCurrentTrackIndex(currentPlaylist.length - 1);
    }
  }, [currentTrackIndex, currentPlaylist.length, repeatMode]);

  const selectTrack = useCallback((trackId: number) => {
    const trackIndex = currentPlaylist.findIndex(track => track.id === trackId);
    if (trackIndex !== -1) {
      setCurrentTrackIndex(trackIndex);
    }
  }, [currentPlaylist]);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const toggleShuffle = useCallback(() => {
    if (!isShuffled) {
      // Enable shuffle
      const shuffled = shuffleArray(playlist);
      setShuffledPlaylist(shuffled);
      // Find current track in shuffled playlist
      const currentTrackId = currentTrack?.id;
      if (currentTrackId) {
        const newIndex = shuffled.findIndex(track => track.id === currentTrackId);
        setCurrentTrackIndex(newIndex !== -1 ? newIndex : 0);
      }
    } else {
      // Disable shuffle
      const currentTrackId = currentTrack?.id;
      if (currentTrackId) {
        const newIndex = playlist.findIndex(track => track.id === currentTrackId);
        setCurrentTrackIndex(newIndex !== -1 ? newIndex : 0);
      }
    }
    setIsShuffled(!isShuffled);
  }, [isShuffled, playlist, currentTrack, shuffleArray]);

  const toggleRepeat = useCallback(() => {
    const modes: Array<'off' | 'all' | 'one'> = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  }, [repeatMode]);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    // State
    currentTrack,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffled,
    repeatMode,
    playlist: currentPlaylist,
    
    // Actions
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
  };
};

