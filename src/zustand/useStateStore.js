import { create } from "zustand";

export const useStateStore = create((set) => ({
    loading: false,
  setLoading: (loading) => set({loading}),
}))