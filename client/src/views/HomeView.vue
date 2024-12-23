<script setup lang="ts">
import ArtMarquee from "@/components/ArtMarquee.vue";
import { useUserStore } from "@/store/useUserStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const items = ref(["Gogh", "Van", "Sunflowers", "Starry Night"]);

const isLoggedIn = ref(localStorage.getItem("token") !== null);
const { user } = storeToRefs(useUserStore());
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center overflow-hidden">
    <div class="relative w-[90%] h-full flex justify-center items-center">
      <ArtMarquee :items="items" :isInverse="false" :position="0" />
      <ArtMarquee :items="items" :isInverse="true" :position="1" />
      <ArtMarquee :items="items" :isInverse="false" :position="2" />
      <ArtMarquee :items="items" :isInverse="true" :position="3" />
    </div>
  </div>
</template>
