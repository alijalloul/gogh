import type { ArtDto } from "@/Dto/artDto";
import { BASE_URL } from "@/utils/getBaseUrl";
import { defineStore } from "pinia";

interface AppState {
  art: ArtDto[] | null;
  total: number | null;
  isLiking: boolean;
}

const token = localStorage.getItem("token");

export const useArtStore = defineStore("art", {
  state: (): AppState => ({
    art: null,
    total: null,
    isLiking: false,
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

    async like(artId: string) {
      try {
        this.isLiking = true;

        const res = await fetch(`${BASE_URL}/api/likes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ artId }),
        });

        if (res.ok) {
          const data = await res.json();

          this.art
            ?.filter((item) => item.id === artId)[0]
            .Likes.push(data.userId);
        }

        this.isLiking = false;
      } catch (error) {
        console.log(
          "there was an error calling the POST like request: ",
          error
        );
        this.isLiking = false;
      } finally {
        this.isLiking = false;
      }
    },

    async removeLike(artId: string) {
      try {
        this.isLiking = true;

        const res = await fetch(`${BASE_URL}/api/likes`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ artId }),
        });

        if (res.ok) {
          const data = await res.json();

          this.art =
            this.art?.map((item) =>
              item.id === artId
                ? {
                    ...item,
                    Likes: item.Likes.filter((it) => it !== data.userId),
                  }
                : item
            ) ?? null;
        }

        this.isLiking = false;
      } catch (error) {
        console.log(
          "there was an error calling the DELETE like request: ",
          error
        );
        this.isLiking = false;
      } finally {
        this.isLiking = false;
      }
    },
  },
});
