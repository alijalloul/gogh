import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/signup",
      name: "signup",

      component: () => import("@/views/SingupView.vue"),
    },
    {
      path: "/login",
      name: "login",

      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/art",
      name: "art",

      component: () => import("@/views/MainArtView.vue"),
    },
    {
      path: "/art/create",
      name: "createArt",

      component: () => import("@/views/CreateView.vue"),
    },
    {
      path: "/art/edit/:id",
      name: "editArt",

      component: () => import("@/views/CreateView.vue"),
    },
    {
      path: "/art/:id",
      name: "oneArt",

      component: () => import("@/views/ArtView.vue"),
    },

    {
      path: "/users/:id",
      name: "users",

      component: () => import("@/views/UserView.vue"),
    },
  ],
});

export default router;
