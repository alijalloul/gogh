import type { ArtDto } from "@/Dto/artDto";
import { BASE_URL } from "@/utils/getBaseUrl";
import { defineStore } from "pinia";
import { useUserStore } from "./useUserStore";

interface AppState {
  heroArt: { items: ArtDto[] | null; total: string | null };
  mainArt: { items: ArtDto[] | null; total: string | null };
  userArt: { items: ArtDto[] | null; total: string | null };
  isLiking: boolean;
}

function removeLikeLambda(
  artList: ArtDto[] | null,
  artId: string,
  userId: string
) {
  return (
    artList?.map((item) =>
      item.id === artId
        ? { ...item, Likes: item.Likes.filter((it) => it !== userId) }
        : item
    ) ?? null
  );
}

function likeLambda(artList: ArtDto[] | null, artId: string, userId: string) {
  artList?.filter((item) => item.id === artId)[0].Likes.push(userId);
}

function removeArtLambda(artList: ArtDto[] | null, artId: string) {
  return artList?.filter((item) => item.id !== artId) ?? null;
}

export const useArtStore = defineStore("art", {
  state: (): AppState => ({
    heroArt: { items: null, total: null },
    mainArt: { items: null, total: null },
    userArt: { items: null, total: null },
    isLiking: false,
  }),

  actions: {
    async fetchHeroArt() {
      try {
        const res = await fetch(
          `${BASE_URL}/api/art?page=${1}&limit=${16}&search=${""}`,
          {
            method: "GET",
          }
        );

        const data = await res.json();

        if (res.ok) {
          console.log("data.items: ", data.items);
          this.heroArt.items = data.items;
          this.heroArt.total = data.total;
        } else {
          throw new Error(data.message || "Fetch art failed");
        }
      } catch (error: any) {
        console.error("Fetch Hero Art Error:", error.message);
      }
    },

    async fetchArt({
      page = 1,
      limit = 8,
      search = "",
      userId,
    }: {
      page?: number;
      limit?: number;
      search?: string;
      userId?: string;
    }) {
      try {
        const res = await fetch(
          `${BASE_URL}/api/art?page=${page}&limit=${limit}&search=${search}&userId=${userId}`,
          {
            method: "GET",
          }
        );

        const data = await res.json();

        if (res.ok) {
          if (userId) {
            this.userArt.items = data.items;
            this.userArt.total = data.total;
          } else {
            this.mainArt.items = data.items;
            this.mainArt.total = data.total;
          }
        } else {
          throw new Error(data.message || "Fetch art failed");
        }
      } catch (error: any) {
        console.error("Fetch Main Art Error:", error.message);
      }
    },

    async like(artId: string) {
      try {
        this.isLiking = true;

        const res = await fetch(`${BASE_URL}/api/likes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${useUserStore().token}`,
          },
          body: JSON.stringify({ artId }),
        });

        if (res.ok) {
          const data = await res.json();

          likeLambda(this.heroArt.items, artId, data.userId);
          likeLambda(this.mainArt.items, artId, data.userId);
          likeLambda(this.userArt.items, artId, data.userId);
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
            authorization: `Bearer ${useUserStore().token}`,
          },
          body: JSON.stringify({ artId }),
        });

        if (res.ok) {
          const data = await res.json();

          this.heroArt.items = removeLikeLambda(
            this.heroArt.items,
            data.artId,
            data.userId
          );
          this.mainArt.items = removeLikeLambda(
            this.mainArt.items,
            data.artId,
            data.userId
          );
          this.userArt.items = removeLikeLambda(
            this.userArt.items,
            data.artId,
            data.userId
          );
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

    async removeArt(artId: string) {
      try {
        const res = await fetch(`${BASE_URL}/api/art/${artId}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${useUserStore().token}`,
          },
        });

        if (res.ok) {
          this.heroArt.items = removeArtLambda(this.heroArt.items, artId);

          this.mainArt.items = removeArtLambda(this.mainArt.items, artId);

          this.userArt.items = removeArtLambda(this.userArt.items, artId);
        }
      } catch (error) {
        console.log(
          "there was an error calling the DELETE art request: ",
          error
        );
      }
    },
  },
});
