import type { User } from "firebase/auth";
import { signOut, updateProfile } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../firebase/firebaseConfig";

type UserStore = {
  user: User | null;
  loading: boolean;
  userName: string | null;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setUserName: (userName: string | null) => void;

  loadCurrentUser: () => void;
  updateUserName: (name: string) => Promise<void>;
  logout: () => Promise<void>;
};

const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  loading: false,
  userName: null,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setUserName: (userName) => set({ userName }),

  loadCurrentUser: () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      set({
        user: currentUser,
        userName: currentUser.displayName,
      });
    } else {
      set({
        user: null,
        userName: null,
      });
    }
  },

  updateUserName: async (name: string) => {
    const user = get().user;
    if (!user) return;

    try {
      set({ loading: true });

      await updateProfile(user, {
        displayName: name,
      });

      set({
        userName: name,
        loading: false,
      });
    } catch (error) {
      console.error("Error updating name:", error);
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true });

      await signOut(auth);

      set({
        user: null,
        userName: null,
        loading: false,
      });
    } catch (error) {
      console.error("Logout error:", error);
      set({ loading: false });
    }
  },
}));

export default useUserStore;
