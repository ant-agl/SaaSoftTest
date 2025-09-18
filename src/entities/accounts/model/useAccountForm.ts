import { computed } from "vue";
import { AccountTypeEnum } from "./AccountTypes";

export const useAccountForm = () => {
  const accountTypeOptions = computed(() => {
    return Object.entries(AccountTypeEnum).map(([key, value]) => ({
      label: value,
      value: key,
    }));
  });

  return { accountTypeOptions };
};
