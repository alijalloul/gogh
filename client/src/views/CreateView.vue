<script setup lang="ts">
import router from "@/router";
import { BASE_URL } from "@/utils/getBaseUrl";
import { ref } from "vue";

const title = ref("");
const desc = ref("");
const file = ref<File | null>(null);

const token = localStorage.getItem("token");

if (!token) {
  router.push("/login");
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    file.value = target.files[0];
  }
};

const handleCreateArt = async () => {
  if (!file.value) {
    console.error("No file selected");
    return;
  }

  const formData = new FormData();
  formData.append("file", file.value);
  formData.append("title", title.value);
  formData.append("desc", desc.value);

  try {
    const res = await fetch(`${BASE_URL}/api/art`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Upload Success:", data);
    }
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
</script>

<template>
  <div class="w-screen flex justify-center items-center">
    <div
      class="w-[90%] lg:w-2/5 border rounded-lg p-5 flex flex-col space-y-5 shadow-lg shadow-gray-600"
    >
      <span class="text-3xl font-medium">Create Art</span>

      <form @submit.prevent="handleCreateArt" class="flex flex-col space-y-5">
        <div class="flex flex-col space-y-2">
          <span>Titile</span>

          <input
            v-model="title"
            type="text"
            class="w-full p-2 border rounded-md outline-none"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <span>Description</span>
          <input
            v-model="desc"
            type="text"
            class="w-full p-2 border rounded-md outline-none"
          />
        </div>

        <div>
          <input type="file" @change="handleFileUpload" />
        </div>

        <div class="w-full flex justify-start items-center">
          <button
            type="submit"
            class="text-white bg-indigo-600 px-4 py-3 rounded-lg hover:bg-indigo-500 active:bg-indigo-400 hover:cursor-pointer transition-all duration-300"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
