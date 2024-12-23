<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const artId = route.params.id as string;
</script>

<template>
  <div>
    <h1>Art ID: {{ artId }}</h1>
  </div>
</template>
