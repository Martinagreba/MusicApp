import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { create } from "zustand";
import { auth, db } from "../firebase/firebaseConfig";

export type Track = {
  id: string;
  title: string;
  artist: { name: string };
  album: { cover_xl: string };
  preview?: string;
};

export type Playlist = {
  id: string;
  name: string;
  tracks: Track[];
  createdAt: number;
};

type PlaylistStore = {
  playlists: Playlist[];
  loading: boolean;

  fetchPlaylists: () => Promise<void>;
  createPlaylist: (name: string) => Promise<void>;
  deletePlaylist: (id: string) => Promise<void>;
  addTrackToPlaylist: (playlistId: string, track: Track) => Promise<void>;
  removeTrackFromPlaylist: (
    playlistId: string,
    trackId: string,
  ) => Promise<void>;
};

const usePlaylistStore = create<PlaylistStore>((set, get) => ({
  playlists: [],
  loading: false,

  fetchPlaylists: async () => {
    const user = auth.currentUser;
    if (!user) return;

    set({ loading: true });

    const snapshot = await getDocs(
      collection(db, "users", user.uid, "playlists"),
    );

    const playlists = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Playlist, "id">),
    }));

    set({ playlists, loading: false });
  },

  createPlaylist: async (name: string) => {
    const user = auth.currentUser;
    if (!user) return;

    const id = Date.now().toString();

    const playlist: Playlist = {
      id,
      name,
      tracks: [],
      createdAt: Date.now(),
    };

    await setDoc(doc(db, "users", user.uid, "playlists", id), playlist);

    set((state) => ({ playlists: [...state.playlists, playlist] }));
  },

  deletePlaylist: async (id: string) => {
    const user = auth.currentUser;
    if (!user) return;

    await deleteDoc(doc(db, "users", user.uid, "playlists", id));

    set((state) => ({
      playlists: state.playlists.filter((p) => p.id !== id),
    }));
  },

  addTrackToPlaylist: async (playlistId: string, track: Track) => {
    const user = auth.currentUser;
    if (!user) return;

    const playlist = get().playlists.find((p) => p.id === playlistId);
    if (!playlist) return;

    if (playlist.tracks.some((t) => t.id === track.id)) return;

    const updatedTracks = [...playlist.tracks, track];

    await updateDoc(doc(db, "users", user.uid, "playlists", playlistId), {
      tracks: updatedTracks,
    });

    set((state) => ({
      playlists: state.playlists.map((p) =>
        p.id === playlistId ? { ...p, tracks: updatedTracks } : p,
      ),
    }));
  },

  removeTrackFromPlaylist: async (playlistId: string, trackId: string) => {
    const user = auth.currentUser;
    if (!user) return;

    const playlist = get().playlists.find((p) => p.id === playlistId);
    if (!playlist) return;

    const updatedTracks = playlist.tracks.filter((t) => t.id !== trackId);

    await updateDoc(doc(db, "users", user.uid, "playlists", playlistId), {
      tracks: updatedTracks,
    });

    set((state) => ({
      playlists: state.playlists.map((p) =>
        p.id === playlistId ? { ...p, tracks: updatedTracks } : p,
      ),
    }));
  },
}));

export default usePlaylistStore;
