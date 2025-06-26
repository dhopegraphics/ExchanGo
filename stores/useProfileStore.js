import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useProfileStore = create(
  persist(
    (set) => ({
      profile: {},
      setProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: {} }),
    }),
    {
      name: "profile-storage", // storage key
      getStorage: () => AsyncStorage,
    }
  )
);
