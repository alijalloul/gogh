<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  current: number;
  totalPages: number;
}>();

const emit = defineEmits(["update:current"]);

const handlePagination = (newPage: number) => {
  emit("update:current", newPage);
};

// Calculate pages to display around the current page
const paginationRange = computed(() => {
  const range = [];

  if (props.current === 1) {
    for (let i = 1; i <= 4; i++) {
      if (i > props.totalPages) {
        return range;
      }

      range.push(i);
    }

    return range;
  }

  if (props.current === props.totalPages) {
    for (let i = 1; i <= 3; i++) {
      if (props.totalPages - 3 + i < 1) {
        return range;
      }

      range.push(props.totalPages - 3 + i);
    }

    return range;
  }

  for (let i = -1; i <= 1; i++) {
    const page = props.current + i;
    if (page > 0 && page < props.totalPages + 1) {
      range.push(page);
    }
  }
  return range;
});
</script>

<template>
  <div class="flex justify-center items-center space-x-2">
    <span v-if="current - 2 > 1">...</span>

    <button
      v-for="page in paginationRange"
      :key="page"
      @click="handlePagination(page)"
      :class="`w-8 aspect-square border border-gray-500 rounded-full flex justify-center items-center transition-all ${
        page === current
          ? 'bg-gray-300 hover:bg-gray-500 active:bg-gray-600'
          : 'bg-white hover:bg-gray-300 active:bg-gray-400'
      }`"
    >
      {{ page }}
    </button>

    <span v-if="current + 2 < totalPages">...</span>
  </div>
</template>
