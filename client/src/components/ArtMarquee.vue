<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted, ref, watch } from "vue";

interface Art {
  id: string;
  title: string;
  desc: string;
  imageUrl: string;
  createdAt: Date;
}

const props = withDefaults(
  defineProps<{
    items: Art[];
    isInverse?: boolean;
    position: number;
    isPlaying: boolean;
  }>(),
  {
    isInverse: false,
  }
);

const containerRef = ref(null);
let tl: gsap.core.Timeline;

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

watch(() => props.isPlaying, (newValue) => {
  newValue ? tl.play() : tl.pause();
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
</script>

<template>
  <div
    ref="containerRef"
    :class="`art_container absolute flex flex-col space-y-5 ${
      props.isInverse ? 'bottom-0' : 'top-0'
    }`"
    :style="{ left: `${props.position * 25}%` }"
    @mouseenter="stopAnimation"
    @mouseleave="resumeAnimation"
  >
    <div
      v-for="(item, index) in [...items, ...items]"
      :key="index"
      class="item"
    >
      <div
        class="relative overflow-hidden w-72 aspect-[3/5] rounded-lg hover:cursor-pointer"
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
      </div>
    </div>
  </div>
</template>
