<script setup lang="ts">
import type { ArtDto } from "@/src/Dto/artDto";
import { useUserStore } from "@/src/store/useUserStore";
import { gsap } from "gsap";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import Art from "./Art.vue";

const dragginThreshold = 20;

const windowHeight = ref(window.innerHeight);
const lastYpercent = ref(0);
const initialMouseY = ref(0);
const deltaMouseY = ref(0);
const isDragging = ref(false);
const wasDragging = ref(false);
const containerRef = ref<HTMLDivElement | null>(null);

const { user } = storeToRefs(useUserStore());

let tl: gsap.core.Timeline;

const props = withDefaults(
  defineProps<{
    items: ArtDto[];
    isInverse?: boolean;
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

  if (!props.isPlaying) {
    tl.pause();
  }

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
    if (newYpercent > 0 && newYpercent < 50) {
      gsap.to(containerRef.value, {
        yPercent: newYpercent,
        duration: 0.1,
      });
    }
  } else {
    if (newYpercent < 0 && newYpercent > -50) {
      gsap.to(containerRef.value, {
        yPercent: newYpercent,
        duration: 0.1,
      });
    }
  }
});

const handleMouseEnter = () => {
  if (tl) {
    gsap.to(tl, { timeScale: 0, duration: 1 });
  }
};

const handleMouseLeave = () => {
  handleMouseUp();
  if (tl) {
    gsap.to(tl, { timeScale: 1, duration: 1 });
  }
};

const handleMouseDown = (e: any) => {
  wasDragging.value = false;
  isDragging.value = true;
  initialMouseY.value = e.clientY;
  lastYpercent.value =
    (gsap.getProperty(containerRef.value, "yPercent") as number) || 0;
};
const handleMouseMove = (e: any) => {
  if (!isDragging.value) return;

  if (
    !wasDragging.value &&
    Math.abs(e.clientY - initialMouseY.value) > dragginThreshold
  ) {
    wasDragging.value = true;
  }

  deltaMouseY.value = e.clientY - initialMouseY.value;
};
const handleMouseUp = () => {
  isDragging.value = false;

  const currentY =
    (gsap.getProperty(containerRef.value, "yPercent") as number) || 0;
  const totalDistance = props.isInverse ? 50 : -50;
  const progress = Math.abs(currentY / totalDistance);

  tl.progress(progress);

  initialMouseY.value = 0;
};
</script>

<template>
  <div
    ref="containerRef"
    :class="`art_container z-20 relative flex flex-col space-y-5 select-none ${
      props.isInverse ? 'bottom-1/2' : 'top-1/2'
    }`"
    @pointerenter="handleMouseEnter"
    @pointerleave="handleMouseLeave"
    @pointerdown="handleMouseDown"
    @pointermove="handleMouseMove"
    @pointerup="handleMouseUp"
  >
    <Art
      :items="[...items, ...items]"
      :userId="user?.id ?? null"
      :wasDragging="wasDragging"
      :customClass="`w-72 aspect-[3/5] rounded-lg`"
    />
  </div>
</template>
