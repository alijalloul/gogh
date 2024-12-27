import { BASE_URL } from "@/utils/getBaseUrl";
import { defineStore } from "pinia";

import type { ArtDto } from "@/Dto/artDto";
import type { UserDto } from "@/Dto/userDto";
import router from "@/router";

interface AppState {
  user: UserDto | null;
  art: ArtDto | null;
  token: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): AppState => ({
    user: null,
    token: localStorage.getItem("token"),
    art: null,
  }),

  actions: {
    async fetchUser() {
      try {
        const res = await fetch(`${BASE_URL}/api/users/me`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${this.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          this.user = data;
        } else {
          throw new Error(data.message);
        }
      } catch (error: any) {
        console.error("Fetch user error:", error.message);
      }
    },

    async fetchArByUser(
      userId: string,
      page: number = 1,
      limit: number = 4,
      search: string = ""
    ) {
      try {
        const res = await fetch(
          `${BASE_URL}/api/art?page=${page}&limit=${limit}&search=${search}&userId=${userId}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${this.token}`,
              "content-type": "application/json",
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          this.art = data;
        } else {
          throw new Error(data.message);
        }
      } catch (error: any) {
        console.error("Fetching art by user error:", error.message);
      }
    },

    async login(email: string, password: string) {
      try {
        const res = await fetch(`${BASE_URL}/api/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (res.ok) {
          this.user = data.user;
          this.token = data.token;
          localStorage.setItem("token", data.token);

          router.push("/");
        } else {
          throw new Error(data.message || "Login failed");
        }
      } catch (error: any) {
        console.error("Login Error:", error.message);
      }
    },

    async signup(
      firstName: string,
      lastName: string,
      email: string,
      password: string
    ) {
      try {
        const res = await fetch(`${BASE_URL}/api/users/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        });
        const data = await res.json();

        if (res.ok) {
          this.user = data.user;
          this.token = data.token;

          localStorage.setItem("token", data.token);

          router.push("/");
        } else {
          throw new Error(data.message || "Signup failed");
        }
      } catch (error: any) {
        console.error("Signup Error:", error.message);
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");

      router.push("/");
    },
  },
});
