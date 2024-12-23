<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    items: string[];
    isInverse?: boolean;
    position: number;
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

  tl.to(containerRef.value, {
    yPercent: direction,
    duration: 10,
  });
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
        class="w-72 aspect-[3/5] bg-gray-300 rounded-lg flex justify-center items-center"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>
