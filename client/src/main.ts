import "./main.css";

import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

library.add([faHeart, faTrash, faPen]);

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount("#app");
