import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    /** Требуется ли авторизация для доступа к маршруту */
    auth?: boolean;
    /** Запрещен ли доступ для авторизованных пользователей */
    noAuth?: boolean;
    /** Название лейаута для рендера страницы */
    layout?: "main" | "auth";
    /** Заголовок страницы */
    title: string;
  }
}
