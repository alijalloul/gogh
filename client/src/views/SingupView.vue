<script setup lang="ts">
import { useUserStore } from "@/store/useUserStore";
import { ref } from "vue";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const userStore = useUserStore();

const handleSignup = async () => {
  await userStore.signup(
    firstName.value,
    lastName.value,
    email.value,
    password.value
  );
};
</script>

<template>
  <div class="w-screen flex justify-center items-center">
    <div
      class="w-[90%] lg:w-2/5 border rounded-lg p-5 flex flex-col space-y-5 shadow-lg shadow-gray-600"
    >
      <span class="text-3xl font-medium">Signup</span>

      <form @submit.prevent="handleSignup" class="flex flex-col space-y-5">
        <div class="flex justify-between items-center space-x-2">
          <div class="w-1/2 flex flex-col space-y-2">
            <span>First Name</span>
            <input
              v-model="firstName"
              type="text"
              class="w-full p-2 border rounded-md outline-none"
            />
          </div>

          <div class="w-1/2 flex flex-col space-y-2">
            <span>Last Name</span>
            <input
              v-model="lastName"
              type="text"
              class="w-full p-2 border rounded-md outline-none"
            />
          </div>
        </div>
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

        <div class="w-full flex justify-between items-center">
          <button
            type="submit"
            class="text-white bg-indigo-600 px-4 py-3 rounded-lg hover:bg-indigo-500 active:bg-indigo-400 hover:cursor-pointer transition-all duration-300"
          >
            Signup
          </button>

          <div>
            <span>Already have an account? </span>
            <RouterLink
              to="/login"
              class="text-indigo-600 hover:underline hover:cursor-pointer"
              >Log in</RouterLink
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
