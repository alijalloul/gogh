import type { UserDto } from "@/Dto/userDto";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { useCookie, useRouter } from "nuxt/app";
import { defineStore } from "pinia";
import { ref } from "vue";

interface AppState {
  user: UserDto | null;
  token: string | null;
}

export const useUserStore = defineStore("user", () => {
  const BASE_URL = getBaseUrl();
  const router = useRouter();
  const tokenCookie = useCookie('token');  // Cookie reference

  const state = ref<AppState>({
    user: null,
    token: useCookie('token').value,
  });

  const fetchUser = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/users/me`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${state.value.token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        state.value.user = data;
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      console.error("Fetch user error:", error.message);
    }
  };

  const login = async (email: string, password: string) => {
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
        state.value.user = data.user;
        state.value.token = data.token;
        useCookie("token", data.token);
        router.push("/");
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login Error:", error.message);
    }
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
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
        state.value.user = data.user;
        state.value.token = data.token;
        tokenCookie.value = data.token
        router.push("/");
      } else {
        throw new Error(data.message || "Signup failed");
      }
    } catch (error: any) {
      console.error("Signup Error:", error.message);
    }
  };

  const logout = () => {
    state.value.user = null;
    state.value.token = null;
    tokenCookie.value = null;

    router.push("/");
  };

  return {
    state,
    fetchUser,
    login,
    signup,
    logout,
  };
});
