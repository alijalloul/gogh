import type { ArtDto } from "@/Dto/artDto";
import { BASE_URL } from "@/utils/getBaseUrl";
import { defineStore } from "pinia";

interface AppState {
  art: ArtDto[] | null;
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
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
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
