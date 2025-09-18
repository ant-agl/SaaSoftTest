import { h } from "vue";
import { notification } from "ant-design-vue";

export const errorNotify = (
  e: any,
  message: string = "Ошибка",
  duration: number = 8
) => {
  if (!e.errorFields) return;

  const description = () =>
    e.errorFields.map((field: any) =>
      h("p", { class: "mb-0" }, field.errors[0])
    );

  notification.error({
    message,
    description,
    duration,
  });
};
