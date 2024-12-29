<script setup lang="ts">
import { useUserStore } from "@/store/useUserStore";
import { gsap } from "gsap";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { RouterLink } from "vue-router";

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

      <RouterLink to="/" class="pointer-events-auto">
        <img
          src="/images/ear.png"
          alt="gogh's_ear.png"
          class="image w-14 h-auto"
        />
      </RouterLink>
    </div>

    <div class="pointer-events-auto w-[10%] flex justify-center">
      <RouterLink
        v-if="user?.id"
        :to="{ name: 'users', params: { id: user.id } }"
        class="text-3xl rounded-xl px-6 py-3 text-white bg-black hover:bg-gray-900 active:bg-gray-800 transition-all duration-300 hover:cursor-pointer"
        >Profile</RouterLink
      >
      <RouterLink
        v-else
        to="/login"
        class="text-3xl rounded-xl px-6 py-3 text-white bg-black hover:bg-gray-900 active:bg-gray-800 transition-all duration-300 hover:cursor-pointer"
        >Login</RouterLink
      >
    </div>
  </header>
</template>
