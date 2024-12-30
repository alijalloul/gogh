import { BASE_URL } from "@/src/utils/getBaseUrl";
import { defineStore } from "pinia";

import router from "@/router";
import type { UserDto } from "@/src/Dto/userDto";

interface AppState {
  user: UserDto | null;
  token: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): AppState => ({
    user: null,
    token: nuxtStorage.localStorage.getData("token"),
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
          nuxtStorage.localStorage.setData("token", data.token);

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

          nuxtStorage.localStorage.setData("token", data.token);

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
      nuxtStorage.localStorage.removeItem("token");

      router.push("/");
    },
  },
});
