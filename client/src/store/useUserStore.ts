import { BASE_URL } from "@/utils/getBaseUrl";
import { defineStore } from "pinia";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AppState {
  user: User | null;
}
export const useUserStore = defineStore("user", {
  state: (): AppState => ({
    user: null,
  }),

  actions: {
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
          localStorage.setItem("token", data.token);
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
          localStorage.setItem("token", data.token);
          console.log("Signup Success:", data);
        } else {
          throw new Error(data.message || "Signup failed");
        }
      } catch (error: any) {
        console.error("Signup Error:", error.message);
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem("token");
    },
  },
});
