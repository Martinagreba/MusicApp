import axios from "axios";
import { create } from "zustand";

export type Track = {
  id: string;
  title: string;
  preview: string;
  artist: { name: string };
  album: { title: string; cover_xl: string };
};

export type Genre = {
  id: number;
  name: string;
};

export type GenreTracks = {
  id: number;
  name: string;
  tracks: Track[];
};

type MusicStore = {
  genreTracks: GenreTracks[];
  chartTracks: Track[];
  loading: boolean;

  filteredTracks: Track[];
  searching: boolean;

  setgenreTracks: (genres: GenreTracks[]) => void;
  setChartTracks: (tracks: Track[]) => void;
  setLoading: (loading: boolean) => void;

  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
};

const searchApi = axios.create({
  baseURL: "https://api.deezer.com",
  timeout: 3000,
});

let lastQuery = "";

const useMusicStore = create<MusicStore>((set) => ({
  genreTracks: [],
  chartTracks: [],
  loading: false,

  filteredTracks: [],
  searching: false,

  setgenreTracks: (genres) => set({ genreTracks: genres }),
  setChartTracks: (tracks) => set({ chartTracks: tracks }),
  setLoading: (loading) => set({ loading }),

  setSearchQuery: async (query: string) => {
    const q = query.trim();
    lastQuery = q;

    if (q.length < 2) {
      set({ filteredTracks: [], searching: false });
      return;
    }

    try {
      set({ searching: true });

      const response = await searchApi.get("/search", {
        params: { q },
      });

      if (lastQuery !== q) return;

      set({
        filteredTracks: response.data?.data ?? [],
        searching: false,
      });
    } catch (error) {
      console.error("Search error:", error);
      set({ filteredTracks: [], searching: false });
    }
  },

  clearSearch: () =>
    set({
      filteredTracks: [],
      searching: false,
    }),
}));

export default useMusicStore;
