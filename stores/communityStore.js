import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCommunityStore = create(
  persist(
    (set, get) => ({
      lastVisitedCommunity: null,
      setLastVisitedCommunity: (community) =>
        set({ lastVisitedCommunity: community }),
    }),
    {
      name: "community-storage",
      storage: createJSONStorage(() => localStorage), // or AsyncStorage for React Native
    }
  )
);
