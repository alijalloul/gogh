<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/store/useUserStore";
import { BASE_URL } from "@/utils/getBaseUrl";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const title = ref("");
const desc = ref("");
const file = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const { token } = storeToRefs(useUserStore());

const triggerFileInput = () => {
  fileInput.value?.click();
};

if (!token) {
  router.push("/login");
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    file.value = target.files[0];
    previewUrl.value = URL.createObjectURL(file.value);
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
    }
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
</script>

<template>
  <div class="flex-1 items-stretch min-h-0 w-screen flex justify-center">
    <div class="w-[90%] rounded-lg flex justify-between p-5 flex-col space-y-5">
      <div class="h-[70vh] items-stretch flex justify-between">
        <div class="w-2/5 flex flex-col space-y-5">
          <div class="flex flex-col space-y-2">
            <span>Title</span>

            <input
              v-model="title"
              type="text"
              class="w-full p-2 border border-gray-500 rounded-md outline-none"
            />
          </div>

          <div class="flex-1 flex flex-col space-y-2">
            <span>Description</span>

            <textarea
              v-model="desc"
              class="flex-1 w-full p-2 border border-gray-500 rounded-md outline-none"
            ></textarea>
          </div>
        </div>

        <div
          @click="triggerFileInput"
          class="h-full overflow-hidden aspect-[3/5] rounded-lg bg-gray-300 hover:cursor-pointer"
        >
          <img
            v-if="previewUrl"
            :src="previewUrl"
            :alt="file?.name"
            class="w-full h-full object-cover"
          />
          <input
            ref="fileInput"
            type="file"
            @change="handleFileUpload"
            class="hidden"
          />
        </div>
      </div>

      <div class="w-full flex justify-end items-center">
        <button
          @click="handleCreateArt"
          class="text-white bg-indigo-600 px-4 py-3 rounded-lg hover:bg-indigo-500 active:bg-indigo-400 hover:cursor-pointer transition-all duration-300"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>
