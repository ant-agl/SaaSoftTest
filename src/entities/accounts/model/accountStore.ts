import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useStorage } from "@vueuse/core";
import cloneDeep from "lodash-es/cloneDeep";
import isEqual from "lodash-es/isEqual";
import { Account } from "./AccountTypes";

export const useAccountStore = defineStore("account", () => {
  const oldAccounts = useStorage<Account[]>("oldAccounts", []);
  const accounts = ref<Account[]>(cloneDeep(oldAccounts.value));

  const addAccount = (account: Account) => {
    accounts.value.push(account);
    oldAccounts.value = cloneDeep(accounts.value);
  };

  const deleteAccount = (id: number) => {
    accounts.value = accounts.value.filter((account) => account.id !== id);
  };

  const resetAccounts = () => {
    accounts.value = cloneDeep(oldAccounts.value);
  };

  const saveAccounts = () => {
    oldAccounts.value = cloneDeep(accounts.value);
  };

  const isFormDirty = computed(
    () => !isEqual(accounts.value, oldAccounts.value)
  );

  return {
    accounts,
    addAccount,
    deleteAccount,
    resetAccounts,
    saveAccounts,
    isFormDirty,
  };
});
