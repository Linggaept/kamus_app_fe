import { searchAdminKeyword } from "@/services/admin/searchAdminService";
import { create } from "zustand";

interface SearchStore {
  search: string;
  setSearch: (search: string) => void;
  focus: boolean;
  setFocus: (focus: boolean) => void;
  result: any;

  searchByKeyword: (query: string) => Promise<void>;
}

export const useSearchAdminStore = create<SearchStore>((set) => ({
  search: "",
  result: [],
  setSearch: (search) => set({ search: search }),
  focus: false,
  setFocus: (focus) => set({ focus: focus }),

  searchByKeyword: async (query: string) => {
    try {
      const response = await searchAdminKeyword(query);
      set({ search: query, result: response });
    } catch (error) {
      console.error("Search API error:", error);
    }
  },
}));
