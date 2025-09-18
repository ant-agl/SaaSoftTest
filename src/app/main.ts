import { createApp } from "vue";
import App from "./App.vue";
import "./styles/tailwindcss.css";
import "ant-design-vue/dist/reset.css";
import { router } from "./providers/router";
import { store } from "./providers/store";
import { iconSlot } from "@/shared/utils/iconSlot";

const app = createApp(App);

app.use(store).use(router);

// Для корректной работы с иконками Lucide в Ant Design Vue
app.config.globalProperties.$iconSlot = iconSlot;

app.mount("#app");
