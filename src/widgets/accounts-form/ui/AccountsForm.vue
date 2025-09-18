<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref } from "vue";
import { Trash } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import type { FormInstance } from "ant-design-vue";

import { useBeforeunload } from "@/shared/utils/useBeforeunload";
import {
  useAccountForm,
  useAccountStore,
  AccountTypeEnum,
  getRules,
} from "@/entities/accounts";

const { accountTypeOptions } = useAccountForm();
const { isEdit } = defineProps<{ isEdit: boolean }>();

const accountStore = useAccountStore();
const { deleteAccount } = accountStore;
const { accounts, isFormDirty } = storeToRefs(accountStore);

const { addEventBeforeUnload, removeEventBeforeUnload } =
  useBeforeunload(isFormDirty);

const formRef = ref<FormInstance>();

const validateForm = () => {
  return formRef.value?.validate();
};
const resetFields = () => {
  return formRef.value?.resetFields();
};

defineExpose({
  validateForm,
  resetFields,
});

onMounted(() => {
  addEventBeforeUnload();
});
onUnmounted(() => {
  removeEventBeforeUnload();
});

// Вычисление высоты списка на основе количества элементов
const heightList = computed(() => {
  const rows = 56 * accounts.value.length;
  return rows > 0 ? rows + 30 : 0;
});
</script>

<template>
  <div>
    <a-form
      v-if="accounts.length > 0"
      ref="formRef"
      :model="accounts"
      layout="vertical"
    >
      <TransitionGroup
        name="list"
        tag="div"
        class="list-container"
        :style="{
          maxHeight: heightList + 'px',
          minHeight: heightList + 'px',
        }"
      >
        <a-flex
          v-for="(item, i) in accounts"
          :key="item.id"
          :gap="8"
          justify="center"
        >
          <a-form-item
            :label="i == 0 ? 'Метки' : ''"
            class="field"
            :name="[i, 'tags']"
            tooltip="Для указания меток для одной пары логин/пароль используйте разделитель ;"
            :rules="getRules().tags"
          >
            <a-select
              v-if="isEdit"
              v-model:value="item.tags"
              mode="tags"
              placeholder="Метки"
              max-tag-count="responsive"
              :tokenSeparators="[';']"
            />
            <span v-else>{{ item.tags.join("; ") }}</span>
          </a-form-item>

          <a-form-item
            :label="i == 0 ? 'Тип' : ''"
            class="field"
            :name="[i, 'type']"
          >
            <a-select
              v-if="isEdit"
              v-model:value="item.type"
              placeholder="Выберите тип"
              :options="accountTypeOptions"
            />
            <span v-else>{{ AccountTypeEnum[item.type] }}</span>
          </a-form-item>

          <a-form-item
            :label="i == 0 ? 'Логин' : ''"
            class="field"
            :class="{ 'no-password': item.type !== 'LOCAL' }"
            :name="[i, 'login']"
            :rules="getRules(isEdit).login"
          >
            <a-input
              v-if="isEdit"
              v-model:value="item.login"
              placeholder="Введите логин"
            />
            <span v-else>{{ item.login }}</span>
          </a-form-item>

          <a-form-item
            v-show="item.type === 'LOCAL'"
            :label="i == 0 ? 'Пароль' : ''"
            class="field"
            :name="[i, 'password']"
            :rules="getRules(isEdit, item.type === 'LOCAL').password"
          >
            <a-input-password
              v-if="isEdit"
              v-model:value="item.password"
              placeholder="Введите пароль"
            />
            <span v-else>*****</span>
          </a-form-item>

          <a-form-item v-if="isEdit" :label="i == 0 ? ' ' : ''">
            <a-popconfirm
              title="Вы уверены, что хотите удалить этот аккаунт?"
              okText="Удалить"
              :okButtonProps="{ danger: true }"
              placement="topRight"
              @confirm="() => deleteAccount(item.id)"
            >
              <a-button type="text" danger :icon="$iconSlot(Trash)" />
            </a-popconfirm>
          </a-form-item>
        </a-flex>
      </TransitionGroup>
    </a-form>

    <a-empty v-else />
  </div>
</template>

<style lang="scss" scoped>
.field {
  --width: 220px;
  width: var(--width);
}
.no-password {
  width: calc(var(--width) * 2 + 8px);
}
</style>
