import { BASE_URL } from "@/utils/getBaseUrl";
import { defineStore } from "pinia";

interface Art {
  id: string;
  title: string;
  desc: string;
  imageUrl: string;
  createdAt: Date;
}

interface AppState {
  art: Art[] | null;
  total: number | null;
}

export const useArtStore = defineStore("art", {
  state: (): AppState => ({
    art: null,
    total: null,
  }),

  actions: {
    async fetchArt(page: number = 1, limit: number = 4, search: string = "") {
      try {
        const res = await fetch(
          `${BASE_URL}/api/art?page=${page}&limit=${limit}&search=${search}`,
          {
            method: "GET",
          }
        );

        const data = await res.json();

        if (res.ok) {
          this.art = data.items;
          this.total = data.total;
        } else {
          throw new Error(data.message || "Fetch art failed");
        }
      } catch (error: any) {
        console.error("Fetch Art Error:", error.message);
      }
    },
  },
});
