<script setup lang="ts">
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { RouterView } from "vue-router";
import Nav from "./components/Nav.vue";
import { useArtStore } from "./store/useArtStore";
import { useUserStore } from "./store/useUserStore";

const token = localStorage.getItem("token");
const { user } = storeToRefs(useUserStore());

if (token && !user.value) {
  useUserStore().fetchUser();
}

watch(user, (newValue) => {
  if (newValue) {
    useArtStore().fetchArt({ userId: newValue.id });
  }
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-100">
    <Nav />

    <RouterView />
  </div>
</template>
