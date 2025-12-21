import { create } from "zustand";

export type Track = {
  id: number;
  title: string;
  preview: string;
  artist: { name: string };
  album: { title: string; cover_medium: string };
};

export type GenreTracks = {
  id: number;
  name: string;
  tracks: Track[];
};

export type Genre = {
  id: number;
  name: string;
};

type MusicStore = {
  genreTracks: GenreTracks[];
  loading: boolean;

  setgenreTracks: (genres: GenreTracks[]) => void;
  setLoading: (loading: boolean) => void;
};

const useMusicStore = create<MusicStore>((set) => ({
  genreTracks: [],
  loading: false,
  setgenreTracks: (genres) => set({ genreTracks: genres }),
  setLoading: (loading) => set({ loading }),
}));

export default useMusicStore;
