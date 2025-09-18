<script lang="ts" setup>
const { isClearDisabled, confirm, clearFilters } = defineProps<{
  isClearDisabled: boolean;
  confirm: () => void;
  clearFilters: ({ confirm }: { confirm: boolean }) => void;
}>();
</script>

<template>
  <div style="padding: 8px">
    <slot />

    <a-flex class="filter-footer" justify="space-between" align="center">
      <a-button
        type="link"
        size="small"
        @click="clearFilters({ confirm: true })"
        :disabled="isClearDisabled"
      >
        Сбросить
      </a-button>
      <a-button type="primary" size="small" @click="confirm()"> ОК </a-button>
    </a-flex>
  </div>
</template>

<style lang="scss" scoped></style>
