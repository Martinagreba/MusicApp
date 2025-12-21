import type { User } from "firebase/auth";
import { create } from "zustand";

type UserStore = {
  user: User | null;
  loading: boolean;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
};
const useUserStore = create<UserStore>((set) => ({
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  user: null,
  loading: false,
}));

export default useUserStore;
