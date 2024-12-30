// src/utils/getBaseUrl.ts
import { useRuntimeConfig } from "nuxt/app";

export const getBaseUrl = () => {
  const config = useRuntimeConfig();
  return config.public.baseUrl || "http://localhost:5000";
};
