import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUseAuthStore {
  type: "user" | "librarian" | undefined;
  setType: (type: "user" | "librarian" | undefined) => void;
}

export const useAuthStore = create<IUseAuthStore>()(
  persist(
    (set) => ({
      type: undefined,
      setType: (type) => set(() => ({ type: type })),
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
