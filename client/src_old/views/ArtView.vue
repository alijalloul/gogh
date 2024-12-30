<script setup lang="ts">
import type { ArtDto } from "@/src/Dto/artDto";
import { BASE_URL } from "@/src/utils/getBaseUrl";
import dayjs from "dayjs";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const artId = route.params.id as string;

const art = ref<ArtDto | null>(null);

const formattedTime = computed(() =>
  dayjs(art?.value?.createdAt).format("h:mm A")
);
const formattedDate = computed(() =>
  dayjs(art?.value?.createdAt).format("YYYY-MM-DD")
);

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
  <div class="flex-1 min-h-0 w-full h-full px-16 py-4">
    <div class="relative w-full h-[80vh] rounded-xl overflow-hidden">
      <div
        class="absolute left-5 bottom-5 bg-black bg-opacity-70 px-8 py-6 rounded-xl text-white flex flex-col justify-between items-start space-y-4"
      >
        <span
          >Creator: {{ art?.User?.firstName }} {{ art?.User?.lastName }}</span
        >

        <div class="flex flex-col space-y-3">
          <span class="text-3xl font-medium">{{ art?.title }}</span>
          <span class="max-w-64" v-if="art?.desc">{{ art?.desc }}</span>
        </div>

        <span v-if="art?.createdAt"
          >{{ formattedTime }} {{ formattedDate }}</span
        >
      </div>
      <img
        :src="art?.imageUrl"
        :alt="art?.title"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>
