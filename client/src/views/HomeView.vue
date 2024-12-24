<script setup lang="ts">
import ArtMarquee from "@/components/ArtMarquee.vue";
import { useArtStore } from "@/store/useArtStore";
import { useUserStore } from "@/store/useUserStore";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const items = ref(["Gogh", "Van", "Sunflowers", "Starry Night"]);

const isLoggedIn = ref(localStorage.getItem("token") !== null);
const { user } = storeToRefs(useUserStore());
const { art } = storeToRefs(useArtStore());

if (art.value === null) {
  useArtStore().fetchArt(1, 16);
} else {
  console.log("art: ", art.value);
}

watch(art, (value) => {
  console.log("art: ", value);
});
</script>

<template>
  <div
    class="w-full h-screen flex justify-center items-center overflow-hidden bg-slate-100"
  >
    <div
      v-if="art && art.length > 0"
      class="relative w-[90%] h-full flex justify-center items-center"
    >
      <ArtMarquee :items="art.slice(0, 3)" :isInverse="false" :position="0" />
      <ArtMarquee :items="art.slice(4, 7)" :isInverse="true" :position="1" />
      <ArtMarquee :items="art.slice(8, 11)" :isInverse="false" :position="2" />
      <ArtMarquee :items="art.slice(12, 15)" :isInverse="true" :position="3" />
    </div>
  </div>
</template>
