import {
  addHistory,
  deleteHistory,
  getHistory,
} from "@/services/historyService";
import { searchKeyword } from "@/services/searchService";
import { create } from "zustand";

interface ResultItem {
  term_id: number;
  term: string;
  definition: string;
}

interface HistoryItem {
  term: string;
  id: number;
}

interface SearchStore {
  search: string;
  history: HistoryItem[];
  result: ResultItem[];
  isLoading: boolean;
  error: string | null;
  focus: boolean;

  setFocus: (value: boolean) => void;
  setSearch: (value: string) => void;
  addToHistory: (id: number) => void;
  fetchResult: (term: string) => Promise<void>;
  loadHistoryFromServer: () => Promise<void>;
  deleteHistory: (id: number) => Promise<void>;
}

export const useSearchStore = create<SearchStore>((set) => ({
  search: "",
  history: [],
  result: [],
  isLoading: false,
  error: null,
  focus: false,

  setSearch: (value) => set({ search: value }),
  setFocus: (value) => set({ focus: value }),
  addToHistory: async (value: number) => {
    try {
      await addHistory(value);
    } catch (err) {
      console.error("Failed to add history to server:", err);
    }
  },

  fetchResult: async (term: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await searchKeyword(term);
      set({ result: response, isLoading: false });
    } catch (err) {
      set({
        error: "Terjadi kesalahan saat mencari data.",
        isLoading: false,
      });
    }
  },

  loadHistoryFromServer: async () => {
    try {
      const serverHistory = await getHistory();
      const historyTerms = serverHistory
        .sort(
          (a: any, b: any) =>
            new Date(b.search_at).getTime() - new Date(a.search_at).getTime()
        )
        .map((item: any) => ({
          term: item.term,
          id: item.history_id,
        }));
      set({ history: historyTerms });
    } catch (err) {
      console.error("Failed to load history from server:", err);
    }
  },

  deleteHistory: async (id: number) => {
    try {
      await deleteHistory(id);
      set((state) => ({
        history: state.history.filter((item: any) => item.id !== id),
      }));
    } catch (e) {
      console.error("Failed to delete history from server");
    }
  },
}));
