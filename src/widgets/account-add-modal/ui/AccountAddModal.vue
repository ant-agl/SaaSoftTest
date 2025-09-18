<script setup lang="ts">
import { ref } from "vue";
import { message } from "ant-design-vue";
import {
  Account,
  useAccountForm,
  useAccountStore,
  getRules,
} from "@/entities/accounts";

const open = defineModel<boolean>("open", { required: true });

const { addAccount } = useAccountStore();
const { accountTypeOptions } = useAccountForm();

const defaultData: Account = {
  id: -1,
  tags: [],
  type: "LOCAL",
  login: "",
  password: "",
};

const formData = ref<Account>({ ...defaultData });

const formRef = ref();
const sendForm = async () => {
  await formRef.value.validate();

  if (formData.value.type !== "LOCAL") {
    formData.value.password = null;
  }

  formData.value.id = new Date().getTime();

  addAccount(formData.value);

  formData.value = { ...defaultData };
  open.value = false;
  message.success("Аккаунт добавлен");
};
</script>

<template>
  <a-modal v-model:open="open" okText="Добавить" @ok="sendForm">
    <a-form
      ref="formRef"
      :model="formData"
      :rules="getRules()"
      layout="vertical"
    >
      <a-form-item label="Метки" name="tags">
        <a-select
          v-model:value="formData.tags"
          mode="tags"
          placeholder="Метки"
          :tokenSeparators="[';']"
          max-tag-count="responsive"
        />
      </a-form-item>

      <a-form-item label="Тип" name="type">
        <a-select v-model:value="formData.type" :options="accountTypeOptions" />
      </a-form-item>

      <a-form-item label="Логин" name="login">
        <a-input v-model:value="formData.login" placeholder="Логин" />
      </a-form-item>

      <a-form-item
        v-show="formData.type === 'LOCAL'"
        label="Пароль"
        name="password"
        :required="formData.type === 'LOCAL'"
      >
        <a-input-password
          v-model:value="formData.password"
          placeholder="Пароль"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="scss" scoped></style>
