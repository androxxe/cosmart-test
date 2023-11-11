import { Work } from "@/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUseBookBorrowStore {
  bookBorrowed: Array<{
    start_date: Date;
    end_date: Date;
    work: Work;
  }>;
  addBookBorrowed: (start_date: Date, end_date: Date, data: Work) => void;
  returnBookBorrowed: (start_date: Date, end_date: Date, data: Work) => void;
}

export const useBookBorrowStore = create<IUseBookBorrowStore>()(
  persist(
    (set) => ({
      bookBorrowed: [],
      addBookBorrowed: (start_date, end_date, data) =>
        set((state) => {
          let bookBorrowed = state.bookBorrowed;
          bookBorrowed.push({ start_date, end_date, work: data });

          return { bookBorrowed: bookBorrowed };
        }),
      returnBookBorrowed: (start_date, end_date, data) =>
        set((state) => {
          let bookBorrowed = state.bookBorrowed;
          bookBorrowed = bookBorrowed.filter((item) => {
            return item.start_date !== start_date && item.end_date !== end_date && item.work !== data;
          });

          return { bookBorrowed: bookBorrowed };
        }),
    }),
    {
      name: "book-borrow-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
