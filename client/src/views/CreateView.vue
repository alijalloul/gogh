<script setup lang="ts"></script>

<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <RouterLink
      to="/"
      className="absolute top-5 left-5 text-3xl border rounded-xl px-6 py-4 hover:bg-gray-400 active:bg-gray-500 transition-all duration-300 hover:cursor-pointer"
      >Back</RouterLink
    >
    <div
      class="w-[90%] lg:w-2/5 border rounded-lg p-5 flex flex-col space-y-5 shadow-lg shadow-gray-600"
    ></div>
  </div>
</template>
