<script setup lang="ts">
import router from "@/router";
import type { ArtDto } from "@/src/Dto/artDto";
import { useArtStore } from "@/src/store/useArtStore";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";

const { isLiking } = storeToRefs(useArtStore());

const props = withDefaults(
  defineProps<{
    items: ArtDto[] | null;
    userId: string | null;
    wasDragging?: boolean;
    customClass?: string;
  }>(),
  {
    wasDragging: false,
    customClass: "",
  }
);

const handleLiking = (item: ArtDto) => {
  if (item.Likes.includes(props.userId as string)) {
    useArtStore().removeLike(item.id);
  } else {
    useArtStore().like(item.id);
  }
};

const handleMouseUp = (artId?: string) => {
  if (!props.wasDragging && artId) {
    router.push({ name: "oneArt", params: { id: artId } });
  }
};
</script>

<template>
  <div
    v-for="(item, index) in items"
    :key="item.id"
    :class="`item relative overflow-hidden hover:cursor-pointer ${customClass}`"
  >
    <div
      class="opacity-0 flex flex-col justify-between hover:opacity-100 absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 text-white p-4 transition-all"
    >
      <div
        class="absolute top-0 left-0 w-full h-full z-10"
        @mouseup="() => handleMouseUp(item.id)"
      ></div>

      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-xl font-bold">{{ item.title }}</h1>
          <p class="text-sm">{{ item.desc }}</p>
        </div>

        <div class="z-20">
          <FontAwesomeIcon
            v-if="item.userId === props.userId"
            icon="pen"
            @click="
              () => {
                router.push({ name: 'editArt', params: { id: item.id } });
              }
            "
            :class="`hover:text-orange-500 active:text-orange-600
          transition-all duration-300`"
          />
        </div>
      </div>

      <div class="w-full flex justify-between items-end">
        <div class="z-20">
          <FontAwesomeIcon
            v-if="item.userId === props.userId"
            icon="trash"
            @click="() => useArtStore().removeArt(item.id)"
            :class="`hover:text-red-500 active:text-red-600 `"
          />
        </div>

        <div class="flex justify-center items-center space-x-3 z-20">
          <span class="text-white">
            {{ item.Likes.length }}
          </span>

          <FontAwesomeIcon
            icon="heart"
            @click="() => !isLiking && handleLiking(item)"
            size="lg"
            :class="` hover:text-red-400 transition-all duration-300 ${
              isLiking
                ? 'text-gray-300 hover:text-gray-300'
                : item.Likes.includes(props.userId as string)
                ? 'text-red-500'
                : 'text-white'
            }`"
          />
        </div>
      </div>
    </div>

    <img
      :src="item.imageUrl"
      :alt="item.title"
      class="w-full h-full object-cover"
    />
  </div>
</template>
