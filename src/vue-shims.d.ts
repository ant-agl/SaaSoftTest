import "vue";

declare module "vue" {
  interface ComponentCustomProperties {
    $iconSlot: (icon: import("vue").Component) => any;
  }
}
