<script lang="ts" setup>
import { Dayjs } from "dayjs";
import FilterTableWrapper from "./FilterTableWrapper.vue";

const { setSelectedKeys, selectedKeys, confirm, clearFilters } = defineProps<{
  setSelectedKeys: (val: any) => void;
  selectedKeys: any[] | undefined;
  confirm: () => void;
  clearFilters: ({ confirm }: { confirm: boolean }) => void;
}>();
</script>

<template>
  <FilterTableWrapper
    :confirm="confirm"
    :clearFilters="clearFilters"
    :isClearDisabled="!selectedKeys?.length"
  >
    <a-range-picker
      :value="selectedKeys"
      format="DD.MM.YYYY"
      @change="(dates: [Dayjs, Dayjs]) => setSelectedKeys([dates[0].startOf('day'), dates[1].endOf('day')])"
    />
  </FilterTableWrapper>
</template>

<style lang="scss" scoped></style>
