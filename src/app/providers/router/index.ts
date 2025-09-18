import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { replaceTitle } from "./utils";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeResolve((to) => {
  const isRequireAuth = to.meta.auth;
  const isRequireNoAuth = to.meta.noAuth;

  if (isRequireAuth && !localStorage.token) return { name: "login" };
  if (isRequireNoAuth && localStorage.token) return { name: "main" };
});

router.afterEach((to) => {
  replaceTitle(to.meta.title as string);
});

export { router };
