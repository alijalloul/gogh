<script setup lang="ts">
import { useUserStore } from "@/store/useUserStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isLoggedIn = ref(localStorage.getItem("token") !== null);
const { user } = storeToRefs(useUserStore());
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <div class="flex flex-col items-center space-y-5">
      <span class="text-2xl font-semibold">
        {{
          isLoggedIn
            ? `Welcome back ${user?.firstName}`
            : "Please log in or sign up"
        }}
      </span>

      <div class="flex space-x-4">
        <RouterLink
          to="/signup"
          class="text-3xl border rounded-xl px-6 py-4 hover:bg-gray-400 active:bg-gray-500 transition-all duration-300 hover:cursor-pointer"
          >Signup</RouterLink
        >

        <RouterLink
          to="/login"
          class="text-3xl border rounded-xl px-6 py-4 hover:bg-gray-400 active:bg-gray-500 transition-all duration-300 hover:cursor-pointer"
          >Login</RouterLink
        >
      </div>
    </div>
  </div>
</template>
