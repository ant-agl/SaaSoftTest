import { h, Component } from "vue";
import Icon from "@ant-design/icons-vue";

// Для корректной работы с иконками Lucide в Ant Design Vue
export const iconSlot = (icon: Component) => {
  return h(Icon, {}, { component: () => h(icon) });
};
