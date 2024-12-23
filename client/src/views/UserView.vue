<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const userId = route.params.id;
</script>

<template>
  <div>
    <h1>User ID: {{ userId }}</h1>
  </div>
</template>
