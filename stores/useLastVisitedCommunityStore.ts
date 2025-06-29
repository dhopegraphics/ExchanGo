import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LastVisitedCommunityState = {
  lastVisitedCommunity: any | null;
  setLastVisitedCommunity: (community: any) => void;
  loadLastVisitedCommunity: () => Promise<void>;
};

export const useLastVisitedCommunityStore = create<LastVisitedCommunityState>(
  (set) => ({
    lastVisitedCommunity: null,
    setLastVisitedCommunity: (community) => {
      set({ lastVisitedCommunity: community });
      AsyncStorage.setItem("lastVisitedCommunity", JSON.stringify(community));
    },
    loadLastVisitedCommunity: async () => {
      const stored = await AsyncStorage.getItem("lastVisitedCommunity");
      if (stored) set({ lastVisitedCommunity: JSON.parse(stored) });
    },
  })
);
