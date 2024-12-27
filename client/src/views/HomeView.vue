<script setup lang="ts">
import ArtMarquee from "@/components/ArtMarquee.vue";
import { useArtStore } from "@/store/useArtStore";
import gsap from "gsap";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";

const { art } = storeToRefs(useArtStore());

const isView = ref(false);

if (art.value === null) {
  useArtStore().fetchArt(1, 16);
}

watch(isView, (value) => {
  if (value) {
    const tl = gsap.timeline();

    tl.to(".overlay", {
      opacity: 0,
      duration: 1,
    });

    tl.to(
      ".overlay",
      {
        display: "none",
        duration: 1,
      },
      "<"
    );
  }
});
</script>

<template>
  <div
    class="absolute top-0 left-0 w-screen h-screen flex justify-center items-center overflow-hidden"
  >
    <div
      class="overlay w-full h-full z-20 flex justify-center items-center absolute top-0 left-0 bg-black bg-opacity-70"
    >
      <div class="flex justify-between items-center space-x-4">
        <button
          @click="
            () => {
              isView = true;
            }
          "
          class="text-3xl rounded-xl px-6 py-3 text-white bg-black hover:bg-gray-900 active:bg-gray-800 transition-all duration-300 hover:cursor-pointer"
        >
          View
        </button>
        <RouterLink
          to="/create"
          class="text-3xl rounded-xl px-6 py-3 border bg-white hover:bg-gray-200 active:bg-gray-300 transition-all duration-300 hover:cursor-pointer"
          >Create</RouterLink
        >
      </div>
    </div>
    <div
      v-if="art && art.length > 0"
      class="relative w-[90%] h-full flex justify-center items-center"
    >
      <ArtMarquee
        :items="art.slice(0, 3)"
        :isInverse="false"
        :position="0"
        :isPlaying="isView"
      />
      <ArtMarquee
        :items="art.slice(4, 7)"
        :isInverse="true"
        :position="1"
        :isPlaying="isView"
      />
      <ArtMarquee
        :items="art.slice(8, 11)"
        :isInverse="false"
        :position="2"
        :isPlaying="isView"
      />
      <ArtMarquee
        :items="art.slice(12, 15)"
        :isInverse="true"
        :position="3"
        :isPlaying="isView"
      />
    </div>
  </div>
</template>
