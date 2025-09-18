import { Ref, h } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";

export const useBeforeunload = (isFormDirty: Ref<boolean>) => {
  const messageDefault =
    "У вас есть несохраненные изменения. Вы уверены, что хотите покинуть страницу?";

  const funcBeforeunload = (e: Event) => {
    if (!isFormDirty.value) return undefined;

    e.preventDefault();
    return messageDefault;
  };

  const funcCloseConfirm = (
    onOk: () => void,
    onCancel?: () => void,
    message?: string
  ) => {
    if (!isFormDirty.value) {
      onOk();
      return;
    }

    Modal.confirm({
      title: "Предупреждение",
      icon: h(ExclamationCircleOutlined),
      content: message ?? messageDefault,
      onOk: (close) => {
        onOk();
        close();
      },
      onCancel,
    });
  };

  const addEventBeforeUnload = () => {
    window.addEventListener("beforeunload", funcBeforeunload);

    onBeforeRouteLeave((_to, _from, next) => {
      funcCloseConfirm(next, () => next(false));
    });
  };

  const removeEventBeforeUnload = () => {
    window.removeEventListener("beforeunload", funcBeforeunload);
  };

  return { addEventBeforeUnload, removeEventBeforeUnload, funcCloseConfirm };
};
