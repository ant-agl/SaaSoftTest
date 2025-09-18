import { h, Component } from "vue";
import Icon from "@ant-design/icons-vue";

export const iconSlot = (icon: Component) => {
  return h(Icon, {}, { component: () => h(icon) });
};
