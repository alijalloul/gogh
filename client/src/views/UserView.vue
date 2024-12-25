<script setup lang="ts">
import type { UserDto } from "@/Dto/userDto";
import { BASE_URL } from "@/utils/getBaseUrl";
import { onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const userId = route.params.id as string;

const user = ref<UserDto | null>(null);

onMounted(() => {
  async function fetchUser() {
    try {
      const res = await fetch(`${BASE_URL}/api/users/${userId}`);

      if (res.ok) {
        const data = await res.json();

        console.log("data: ", data);
        user.value = data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  fetchUser();
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

      <RouterLink
        to="/create"
        class="text-3xl rounded-xl px-6 py-3 border border-gray-500 bg-white hover:bg-gray-200 active:bg-gray-300 transition-all duration-300 hover:cursor-pointer"
        >Create</RouterLink
      >
    </div>

    <div
      class="absolute top-[55%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 p-16"
    >
      <RouterLink
        v-for="(item, index) in user?.art"
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
  </div>
</template>
