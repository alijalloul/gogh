<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useUserStore } from "../store/useUserStore";
import { useNuxtApp } from "nuxt/app";

const { $gsap: gsap } = useNuxtApp();

const { user } = storeToRefs(useUserStore());

onMounted(() => {
  const tl = gsap.timeline();

  tl.to(".header_container", {
    opacity: 1,
    duration: 1,
    ease: "power4.inOut",
  });

  tl.to(
    ".title",
    {
      width: 0,
      duration: 0.5,
      delay: 1,
      ease: "power4.inOut",
    },
    "<"
  );
});
</script>

<template>
  <header
    class="relative z-30 w-full flex justify-between items-center py-5 pointer-events-none"
  >
    <div
      class="header_container flex justify-center items-center space-x-2 opacity-0 px-8"
    >
      <div class="title overflow-hidden h-20" ref="title">
        <h1 class="text-6xl font-medium text-black">Gogh</h1>
      </div>

      <NuxtLink to="/" class="pointer-events-auto">
        <img
          src="/images/ear.png"
          alt="gogh's_ear.png"
          class="image w-14 h-auto"
        />
      </NuxtLink>
    </div>

    <div class="pointer-events-auto w-[10%] flex justify-center">
      <NuxtLink
        v-if="user?.id"
        :to="{ name: 'users', params: { id: user.id } }"
        class="text-3xl rounded-xl px-6 py-3 text-white bg-black hover:bg-gray-900 active:bg-gray-800 transition-all duration-300 hover:cursor-pointer"
        >Profile</NuxtLink
      >
      <NuxtLink
        v-else
        to="/auth/login"
        class="text-3xl rounded-xl px-6 py-3 text-white bg-black hover:bg-gray-900 active:bg-gray-800 transition-all duration-300 hover:cursor-pointer"
        >Login</NuxtLink
      >
    </div>
  </header>
</template>
