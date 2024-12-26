<script setup lang="ts">
import type { ArtDto } from "@/Dto/artDto";
import router from "@/router";
import { useArtStore } from "@/store/useArtStore";
import { useUserStore } from "@/store/useUserStore";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { gsap } from "gsap";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";

const dragginThreshold = 20;

const windowHeight = ref(window.innerHeight);
const isMouseDown = ref(false);
const lastYpercent = ref(0);
const initialMouseY = ref(0);
const deltaMouseY = ref(0);
const isDragging = ref(false);
const containerRef = ref<HTMLDivElement | null>(null);

const { user } = storeToRefs(useUserStore());
const { isLiking } = storeToRefs(useArtStore());

let tl: gsap.core.Timeline;

const props = withDefaults(
  defineProps<{
    items: ArtDto[];
    isInverse?: boolean;
    position: number;
    isPlaying: boolean;
  }>(),
  {
    isInverse: false,
  }
);

onMounted(() => {
  const direction = props.isInverse ? 50 : -50;

  tl = gsap.timeline({
    repeat: -1,
    defaults: { ease: "none", overwrite: "auto" },
  });

  tl.pause();

  tl.to(containerRef.value, {
    yPercent: direction,
    duration: 10,
  });
});

watch(
  () => props.isPlaying,
  (newValue) => {
    newValue ? tl.play() : tl.pause();
  }
);

watch(deltaMouseY, (newValue) => {
  const newYpercent = lastYpercent.value + (newValue / windowHeight.value) * 25;

  if (props.isInverse) {
    if (newYpercent > 1 && newYpercent < 49) {
      gsap.to(containerRef.value, {
        yPercent: newYpercent,
        duration: 0.1,
      });
    }
  } else {
    if (newYpercent < -1 && newYpercent > -49) {
      gsap.to(containerRef.value, {
        yPercent: newYpercent,
        duration: 0.1,
      });
    }
  }
});

const stopAnimation = () => {
  if (tl) {
    gsap.to(tl, { timeScale: 0, duration: 1 });
  }
};

const resumeAnimation = () => {
  if (tl) {
    gsap.to(tl, { timeScale: 1, duration: 1 });
  }
};

const handleMouseDown = (e: any) => {
  isMouseDown.value = true;
  initialMouseY.value = e.clientY;
  lastYpercent.value =
    (gsap.getProperty(containerRef.value, "yPercent") as number) || 0;
};
const handleMouseMove = (e: any) => {
  if (!isMouseDown.value) return;

  if (
    !isDragging.value &&
    Math.abs(e.clientY - initialMouseY.value) > dragginThreshold
  ) {
    console.log("isDragging: ");
    isDragging.value = true;
  }

  if (!isDragging.value) return;

  deltaMouseY.value = e.clientY - initialMouseY.value;
};
const handleMouseUp = (artId?: string) => {
  const wasDragging = isDragging.value;
  isMouseDown.value = false;
  isDragging.value = false;

  const currentY =
    (gsap.getProperty(containerRef.value, "yPercent") as number) || 0;
  const totalDistance = props.isInverse ? 50 : -50;
  const progress = Math.abs(currentY / totalDistance);

  tl.progress(progress);

  initialMouseY.value = 0;

  if (!wasDragging && artId) {
    router.push({ name: "art", params: { id: artId } });
  }
};

const handleLiking = (item: ArtDto) => {
  if (item.Likes.includes(user.value?.id as string)) {
    useArtStore().removeLike(item.id);
  } else {
    useArtStore().like(item.id);
  }
};
</script>

<template>
  <div
    ref="containerRef"
    :class="`art_container absolute flex flex-col space-y-5 select-none ${
      props.isInverse ? 'bottom-0' : 'top-0'
    }`"
    :style="{ left: `${props.position * 25}%` }"
    @mouseenter="stopAnimation"
    @mouseleave="resumeAnimation"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="() => handleMouseUp()"
  >
    <div
      v-for="(item, index) in [...items, ...items]"
      :key="item.id"
      class="item relative overflow-hidden w-72 aspect-[3/5] rounded-lg hover:cursor-pointer"
    >
      <div
        class="opacity-0 flex flex-col justify-between hover:opacity-100 absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 text-white p-2 transition-all"
      >
        <div>
          <h1 class="text-xl font-bold">{{ item.title }}</h1>
          <p class="text-sm">{{ item.desc }}</p>
        </div>

        <div class="w-full flex justify-end items-center">
          <div class="flex justify-center items-center space-x-4">
            <span class="text-white">
              {{ item.Likes.length }}
            </span>

            <FontAwesomeIcon
              icon="heart"
              @click="() => !isLiking && handleLiking(item)"
              size="lg"
              :class="` hover:text-red-200 transition-all duration-300 ${
              isLiking
                ? 'text-gray-300 hover:text-gray-300'
                : item.Likes.includes(user?.id as string)
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
        @mouseup="() => handleMouseUp(item.id)"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>
