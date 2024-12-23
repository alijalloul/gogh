<script setup lang="ts">
import { useUserStore } from "@/store/useUserStore";

import { ref } from "vue";
import { RouterLink } from "vue-router";

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  console.log("clicked");
  await useUserStore().login(email.value, password.value);

  console.log("finished");
};
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <RouterLink
      to="/"
      className="absolute top-5 left-5 text-3xl border rounded-xl px-6 py-4 hover:bg-gray-400 active:bg-gray-500 transition-all duration-300 hover:cursor-pointer"
      >Back</RouterLink
    >
    <div
      class="w-[90%] lg:w-2/5 border rounded-lg p-5 flex flex-col space-y-5 shadow-lg shadow-gray-600"
    >
      <span class="text-3xl font-medium">Login</span>

      <form @submit.prevent="handleLogin" class="flex flex-col space-y-5">
        <div class="flex flex-col space-y-2">
          <span>Email</span>
          <input
            v-model="email"
            type="text"
            class="w-full p-2 border rounded-md outline-none"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <span>Password</span>
          <input
            v-model="password"
            type="password"
            class="w-full p-2 border rounded-md outline-none"
          />
        </div>

        <div class="w-full flex justify-start items-center">
          <button
            type="submit"
            class="text-white bg-indigo-600 px-4 py-3 rounded-lg hover:bg-indigo-500 active:bg-indigo-400 hover:cursor-pointer transition-all duration-300"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
