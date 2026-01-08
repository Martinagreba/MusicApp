import {
  loadAndPlay,
  pause,
  play,
  seekTo,
  stopAndUnload,
} from "@/services/audioPlayer";
import { create } from "zustand";
import { Track } from "./useMusicStore";

type PlayerStore = {
  playlist: Track[];
  currentIndex: number;
  currentTrackId?: string;

  isPlaying: boolean;
  position: number;
  duration: number;

  setQueueAndPlay: (tracks: Track[], startIndex?: number) => Promise<void>;
  playTrackAtIndex: (index: number) => Promise<void>;
  playNext: () => Promise<void>;
  playPrev: () => Promise<void>;
  togglePlayPause: () => Promise<void>;
  seekTo: (ms: number) => Promise<void>;
  stop: () => Promise<void>;
};

const usePlayerStore = create<PlayerStore>((set, get) => ({
  playlist: [],
  currentIndex: 0,
  currentTrackId: undefined,

  isPlaying: false,
  position: 0,
  duration: 1,

  setQueueAndPlay: async (tracks, startIndex = 0) => {
    set({ playlist: tracks });
    await get().playTrackAtIndex(startIndex);
  },

  playTrackAtIndex: async (index) => {
    const track = get().playlist[index];
    if (!track?.preview) return;

    set({
      currentIndex: index,
      currentTrackId: track.id,
      position: 0,
      duration: 1,
    });

    await loadAndPlay(track.preview, (status) => {
      set({
        isPlaying: status.isPlaying,
        position: status.positionMillis,
        duration: status.durationMillis ?? 1,
      });

      if (status.didJustFinish) {
        get().playNext();
      }
    });
  },

  playNext: async () => {
    const { playlist, currentIndex } = get();
    if (!playlist.length) return;

    const next = currentIndex + 1 < playlist.length ? currentIndex + 1 : 0;

    await get().playTrackAtIndex(next);
  },

  playPrev: async () => {
    const { playlist, currentIndex } = get();
    if (!playlist.length) return;

    const prev = currentIndex - 1 >= 0 ? currentIndex - 1 : playlist.length - 1;

    await get().playTrackAtIndex(prev);
  },

  togglePlayPause: async () => {
    const { isPlaying } = get();
    isPlaying ? await pause() : await play();
    set({ isPlaying: !isPlaying });
  },

  seekTo: async (ms) => {
    await seekTo(ms);
  },

  stop: async () => {
    await stopAndUnload();
    set({
      isPlaying: false,
      position: 0,
      duration: 1,
      currentTrackId: undefined,
    });
  },
}));

export default usePlayerStore;
