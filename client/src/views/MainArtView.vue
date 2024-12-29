<script setup lang="ts">
import Art from "@/components/Art.vue";
import Paginator from "@/components/Paginator.vue";
import { useArtStore } from "@/store/useArtStore";
import { useUserStore } from "@/store/useUserStore";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";

const artStore = useArtStore();
const { mainArt } = storeToRefs(artStore);
const { user } = storeToRefs(useUserStore());

const limit = ref(16);
const current = ref(1);

function fetchArt() {
  artStore.fetchArt({ page: current.value, limit: limit.value });
}

onMounted(() => {
  fetchArt();
});

watch(current, (newValue: number) => {
  fetchArt();
});
</script>

<template>
  <div class="flex flex-col space-y-4 p-16">
    <div
      v-if="mainArt.items"
      class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2"
    >
      <Art
        :items="mainArt.items"
        :userId="user?.id ?? ''"
        :customClass="`aspect-[3/2]`"
      />
    </div>

    <div class="w-full flex justify-end items-center">
      <Paginator
        v-if="mainArt.total"
        :current="current"
        @update:current="current = $event"
        :total="mainArt.total"
        :limit="limit"
      />
    </div>
  </div>
</template>
