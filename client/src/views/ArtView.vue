<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const artId = route.params.id;
</script>

<template>
  <div>
    <h1>Art ID: {{ artId }}</h1>
  </div>
</template>
