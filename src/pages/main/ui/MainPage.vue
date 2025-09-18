<script setup lang="ts">
import { ref } from "vue";
import { Plus } from "lucide-vue-next";
import { message } from "ant-design-vue";

import { EditButtons } from "@/features/edit-buttons";
import { AccountsForm } from "@/widgets/accounts-form";
import { AccountAddModal } from "@/widgets/account-add-modal";
import { useAccountStore } from "@/entities/accounts";

const isEdit = ref(false);
const isAddModalOpen = ref(false);

const { resetAccounts, saveAccounts } = useAccountStore();

const accountsFormRef = ref();
const save = async () => {
  await accountsFormRef.value.validateForm();

  saveAccounts();
  isEdit.value = false;
  message.success("Аккаунты сохранены");
};

const reset = () => {
  accountsFormRef.value.resetFields();
  resetAccounts();
};
</script>

<template>
  <div>
    <a-flex justify="space-between" align="center" class="mb-5">
      <h1 class="title">Учетные записи</h1>

      <a-space>
        <EditButtons v-model:isEdit="isEdit" @save="save" @reset="reset" />
        <a-button
          @click="isAddModalOpen = true"
          type="primary"
          :icon="$iconSlot(Plus)"
        >
          Добавить
        </a-button>
      </a-space>
    </a-flex>

    <AccountsForm ref="accountsFormRef" :isEdit="isEdit" />

    <AccountAddModal v-model:open="isAddModalOpen" />
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
}
</style>
