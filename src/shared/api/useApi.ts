import { ref } from "vue";
import { ApiError, UseApiOptions } from "./Types";
import { handleApiError } from "./handleApiError";
import { notification } from "ant-design-vue";

export function useApi<ApiFn extends (...args: any[]) => Promise<any>>(
  apiCall: ApiFn,
  options: UseApiOptions = {}
) {
  type DataType = Awaited<ReturnType<ApiFn>>;
  type ParamsType = Parameters<ApiFn>;

  const data = ref<DataType | null>(null);
  const loading = ref(false);
  const error = ref<ApiError | null>(null);
  const controller = ref<AbortController | null>(null);

  const execute = async (...params: ParamsType): Promise<DataType> => {
    if (controller.value && options.isSignal) {
      controller.value.abort();
    }
    controller.value = new AbortController();
    const signal = controller.value.signal;

    // setTimeout(() => {
    loading.value = true;
    error.value = null;
    // });

    try {
      const args = options.isSignal ? [...params, signal] : params;
      const result: DataType = await apiCall(...(args as ParamsType));

      data.value = result;

      if (options.resetOnSuccess) {
        setTimeout(() => {
          data.value = null;
        }, 2000);
      }

      return result;
    } catch (e) {
      console.log("e", e);

      error.value = handleApiError(e);

      if (
        options.isMessageError !== false &&
        error.value.message != "canceled"
      ) {
        const errorMessage = options.messagesError?.[error.value.code];
        // message.error(errorMessage || error.value.message);
        notification.error({
          message: "Ошибка",
          description: errorMessage || error.value.message,
          duration: 8,
        });
      }

      throw e;
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    execute,
    controller,
  };
}
