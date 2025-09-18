import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "main",
    meta: {
      auth: true,
      layout: "main",
      title: "Главная",
    },
    component: () => import("@/pages/main"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      noAuth: true,
      layout: "auth",
      title: "Вход",
    },
    component: () => import("@/pages/login"),
  },
];
