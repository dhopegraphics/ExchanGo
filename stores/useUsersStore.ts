import { create } from "zustand";

export interface User {
  $id: string; // Appwrite document id
  user_id: string;
  first_name: string;
  middle_name?: string;
  last_name?: string;
  phone_number: string;
  date_of_birth: string; // ISO string, adjust if you use Date
  latitude: number;
  longitude: number;
  address: string;
  avatar_url?: string;
  featured?: boolean;
  bio?: string;
}

interface UsersState {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));
