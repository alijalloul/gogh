<script setup lang="ts">
import type { ArtDto } from "@/Dto/artDto";
import { BASE_URL } from "@/utils/getBaseUrl";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const artId = route.params.id as string;

const art = ref<ArtDto | null>(null);

onMounted(() => {
  async function fetchArt() {
    try {
      const res = await fetch(`${BASE_URL}/api/art/${artId}`);
      if (res.ok) {
        const data = await res.json();

        art.value = data;
      }
    } catch (error) {
      console.log("error fetching the art with id: ", artId, ": ", error);
    }
  }

  fetchArt();
});
</script>

<template>
  <div class="w-full h-full px-16 py-4">
    <div class="w-full h-full rounded-xl relative overflow-hidden">
      <img
        :src="art?.imageUrl"
        :alt="art?.title"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>
