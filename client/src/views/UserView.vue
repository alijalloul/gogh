<script setup lang="ts">
import Art from "@/components/Art.vue";
import Paginator from "@/components/Paginator.vue";
import type { UserDto } from "@/Dto/userDto";
import { useArtStore } from "@/store/useArtStore";
import { useUserStore } from "@/store/useUserStore";
import { BASE_URL } from "@/utils/getBaseUrl";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const userId = route.params.id as string;

const artStore = useArtStore();
const { userArt } = storeToRefs(artStore);

const user = ref<UserDto | null>(null);
const current = ref(1);
const limit = ref(8);

async function fetchUser() {
  try {
    const res = await fetch(`${BASE_URL}/api/users/${userId}`);

    if (res.ok) {
      const data = await res.json();

      user.value = data;
    }
  } catch (error) {
    console.error(error);
  }
}

watch(current, (newValue: number) => {
  artStore.fetchArt({ userId });
});

onMounted(() => {
  fetchUser();
  artStore.fetchArt({ page: current.value, limit: limit.value, userId });
});
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <button class="absolute top-0 left-0 w-full h-[40vh]">
      <img
        src="/images/art1.jpeg"
        alt="profile.png"
        class="w-full h-full object-cover"
      />
    </button>

    <div class="flex flex-col space-x-5 relative top-28">
      <div class="w-full h-60 flex justify-between items-end px-16">
        <div class="flex items-end space-x-4 h-full">
          <button
            class="h-full aspect-square rounded-full bg-gray-300 border-2 border-black"
          >
            <img
              src="/images/Bully.jpeg"
              alt="profile.png"
              class="w-full h-full object-cover rounded-full"
            />
          </button>

          <div class="h-1/2 flex justify-center items-center">
            <span class="text-5xl font-medium">{{
              `${user?.firstName} ${user?.lastName}`
            }}</span>
          </div>
        </div>

        <div class="flex justify-center items-center space-x-2">
          <button
            @click="useUserStore().logout()"
            class="text-3xl rounded-xl px-6 py-3 border border-gray-500 bg-white hover:bg-gray-200 active:bg-gray-300 transition-all duration-300 hover:cursor-pointer"
          >
            Log Out
          </button>
          <RouterLink
            to="/art/create"
            class="text-3xl rounded-xl px-6 py-3 border border-gray-500 bg-white hover:bg-gray-200 active:bg-gray-300 transition-all duration-300 hover:cursor-pointer"
            >Create</RouterLink
          >
        </div>
      </div>

      <div class="flex flex-col space-y-4 p-16">
        <div
          v-if="userArt.items"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2"
        >
          <Art
            :items="userArt.items"
            :userId="user?.id ?? ''"
            :customClass="`aspect-[3/2]`"
          />
        </div>

        <div class="w-full flex justify-end items-center">
          <Paginator
            v-if="userArt.total"
            :current="current"
            @update:current="current = $event"
            :setCurrent="2"
            :total="userArt.total"
            :limit="limit"
          />
        </div>
      </div>
    </div>
  </div>
</template>
