import { addHistory } from "@/services/historyService";
import { getAllTerms } from "@/services/termService";
import { create } from "zustand";

interface TermItem {
  term_id: number;
  term: string;
  definition: string;
}

interface TermStore {
  terms: TermItem[];
  page: number;
  totalPages: number;
  setTerms: (data: TermItem[]) => void;
  setPage: (page: number) => void;
  clearTerms: () => void;
  getAllTerms: (page?: number) => Promise<void>;
  addToHistory: (id: number) => void;
}

export const useTermStore = create<TermStore>((set) => ({
  terms: [],
  page: 1,
  totalPages: 1,

  setTerms: (data) => set({ terms: data }),
  setPage: (page) => set({ page }),

  clearTerms: () => set({ terms: [] }),

  getAllTerms: async (page = 1) => {
      try {
        const response = await getAllTerms(page);
        const sortByNewDate = response.data.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
  
        set({
          terms: sortByNewDate,
          page: response.currentPage,
          totalPages: response.totalPages,
        });
      } catch (error) {
        console.error("Failed to fetch terms:", error);
      }
    },

  addToHistory: async (id: number) => {
    try {
      await addHistory(id);
    } catch (error) {
      console.error("Failed to add history to server:", error);
    }
  },
}));
