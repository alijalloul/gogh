<script setup lang="ts">
import Paginator from "@/components/Paginator.vue";
import type { ArtDto } from "@/Dto/artDto";
import type { UserDto } from "@/Dto/userDto";
import { useUserStore } from "@/store/useUserStore";
import { BASE_URL } from "@/utils/getBaseUrl";
import { onMounted, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const userId = route.params.id as string;

const user = ref<UserDto | null>(null);
const art = ref<ArtDto[] | null>(null);

const current = ref(1);
const totalPages = ref(0);
const limit = 8;

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

async function fetchArtByUser() {
  try {
    const res = await fetch(
      `${BASE_URL}/api/art?page=${current.value}&limit=${limit}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (res.ok) {
      const data = await res.json();

      art.value = data.items;
      totalPages.value = Math.ceil(data.total / limit);
    }
  } catch (error) {
    console.error("There was an error fetching the art by userId: ", error);
  }
}

watch(current, (newValue: number) => {
  console.log("new page: ", newValue);

  fetchArtByUser();
});
onMounted(() => {
  fetchUser();
  fetchArtByUser();
});
</script>

<template>
  <div class="relative w-full h-full overflow-x-hidden flex flex-col">
    <button class="relative w-full h-2/5">
      <img
        src="/images/art1.jpeg"
        alt="profile.png"
        class="w-full h-full object-cover"
      />
    </button>

    <div
      class="relative w-full -translate-y-1/2 h-60 flex justify-between items-end px-16"
    >
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
          to="/create"
          class="text-3xl rounded-xl px-6 py-3 border border-gray-500 bg-white hover:bg-gray-200 active:bg-gray-300 transition-all duration-300 hover:cursor-pointer"
          >Create</RouterLink
        >
      </div>
    </div>

    <div class="absolute top-[60%] flex flex-col space-y-4 p-16">
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2"
      >
        <RouterLink
          v-for="(item, index) in art"
          :to="{ name: 'art', params: { id: item.id } }"
          :key="item?.id"
          class="relative rounded-md overflow-hidden hover:cursor-pointer aspect-[3/2]"
        >
          <div
            class="opacity-0 hover:opacity-100 absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 text-white p-2 transition-all"
          >
            <h1 class="text-xl font-bold">{{ item.title }}</h1>
            <p class="text-sm">{{ item.desc }}</p>
          </div>

          <img
            :src="item.imageUrl"
            :alt="item.title"
            class="w-full h-full object-cover"
          />
        </RouterLink>
      </div>

      <div class="w-full flex justify-end items-center">
        <Paginator
          :current="current"
          @update:current="current = $event"
          :setCurrent="2"
          :totalPages="totalPages"
        />
      </div>
    </div>
  </div>
</template>
