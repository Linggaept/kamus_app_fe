import {
  deleteTermById,
  editTermById,
  getAllAdminTerms,
  getByIdTerm,
} from "@/services/admin/termAdminService";
import { create } from "zustand";

interface TermAdmin {
  term_id: number;
  term: string;
  definition: string;
}

interface TermAdminStore {
  terms: TermAdmin[];
  page: number;
  totalPages: number;
  selectedTerm: TermAdmin | null;
  setTerms: (data: TermAdmin[]) => void;
  setPage: (page: number) => void;
  getAllTermsAdmin: (page?: number) => Promise<void>;
  getByIdTerm: (id: number) => Promise<void>;
  editTermById: (id: number, term: string, definition: string) => Promise<void>;
  deleteTermById: (id: number) => Promise<void>;
}

export const useTermAdminStore = create<TermAdminStore>((set) => ({
  selectedTerm: null,
  terms: [],
  page: 1,
  totalPages: 1,
  setTerms: (data) => set({ terms: data }),
  setPage: (page) => set({ page }),
  getAllTermsAdmin: async (page = 1) => {
    try {
      const response = await getAllAdminTerms(page);
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

  getByIdTerm: async (id: number) => {
    try {
      const response = await getByIdTerm(id);
      set({ selectedTerm: response });
    } catch (error) {
      console.error("Failed to fetch terms:", error);
    }
  },

  editTermById: async (id: number, term: string, definition: string) => {
    try {
      const response = await editTermById(id, term, definition);
      return response;
    } catch (error) {
      console.error("Failed to fetch terms:", error);
    }
  },

  deleteTermById: async (id: number) => {
    try {
      const response = await deleteTermById(id);
      return response;
    } catch (error) {
      console.error("Failed to fetch terms:", error);
    }
  },
}));
