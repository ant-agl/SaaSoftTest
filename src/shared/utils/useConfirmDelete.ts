import { createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";

export const useConfirmDelete = (
  title: string,
  okFunc: (id: number) => Promise<void>
) => {
  const confirmDelete = (id: number) => {
    Modal.confirm({
      title,
      icon: createVNode(ExclamationCircleOutlined),
      okButtonProps: {
        danger: true,
      },
      okText: "Удалить",
      async onOk() {
        await okFunc(id);
      },
    });
  };

  return { confirmDelete };
};
