<script setup lang="ts">
import { useRoute } from "nuxt/app";
import { ref } from "vue";

const route = useRoute();
const userId = ref(route.params.id);
</script>

<template>
  <div>
    <span>Viewing user of ID: {{ userId }}</span>
  </div>
</template>
