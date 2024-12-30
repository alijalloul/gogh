<script setup lang="ts">
import { useRoute } from "nuxt/app";
import { ref } from "vue";

const route = useRoute();
const artId = ref(route.params.id);
</script>

<template>
  <div>
    <span>Art of id: {{ artId }}</span>
  </div>
</template>
