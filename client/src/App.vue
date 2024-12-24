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
  <div class="flex flex-col w-screen h-screen bg-slate-100">
    <Nav />

    <div class="flex-1 min-h-0">
      <RouterView />
    </div>
  </div>
</template>
