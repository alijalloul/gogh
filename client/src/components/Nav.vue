<script>
import { gsap } from "gsap";
import { RouterLink } from "vue-router";

export default {
  mounted() {
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
  },
};
</script>

<template>
  <header
    class="absolute z-10 w-full flex justify-between items-center top-5 px-12"
  >
    <div
      class="header_container flex justify-center items-center space-x-2 opacity-0"
    >
      <div class="title overflow-hidden h-20" ref="title">
        <h1 class="text-6xl font-medium">Gogh</h1>
      </div>

      <RouterLink to="/">
        <img
          src="/images/ear.png"
          alt="gogh's_ear.png"
          class="image w-14 h-auto"
        />
      </RouterLink>
    </div>

    <div class="flex space-x-4">
      <RouterLink
        to="/create"
        class="text-3xl rounded-xl px-6 py-3 text-white border bg-white hover:bg-gray-100 active:bg-gray-200 transition-all duration-300 hover:cursor-pointer"
        >Create</RouterLink
      >

      <RouterLink
        to="/login"
        class="text-3xl rounded-xl px-6 py-3 text-white bg-black hover:bg-gray-900 active:bg-gray-800 transition-all duration-300 hover:cursor-pointer"
        >Login</RouterLink
      >
    </div>
  </header>
</template>
