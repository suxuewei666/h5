import { createApp } from "vue";
import "@/plugins/vant";
import "@/assets/styles/index.scss";
import App from "./App.vue";
import store from "@/store/index";
import router from "@/router/index";
import "@/assets/styles/vant-variables.scss";

createApp(App).use(store).use(router).mount("#app");
