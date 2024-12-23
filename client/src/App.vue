<script setup lang="ts">
import { storeToRefs } from "pinia";
import { RouterView } from "vue-router";
import Nav from "./components/Nav.vue";
import { useUserStore } from "./store/useUserStore";

const token = localStorage.getItem("token");
const { user } = storeToRefs(useUserStore());

if (token && !user.value) {
  useUserStore().fetchUser();
}
</script>

<template>
  <Nav />

  <RouterView />
</template>
