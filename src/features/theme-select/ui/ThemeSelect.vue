<script setup lang="ts">
import { Sun } from "lucide-vue-next";
import { useThemeStore } from "@/shared/store";

const themeStore = useThemeStore();
</script>

<template>
  <a-select
    v-model:value="themeStore.theme"
    :options="themeStore.themeOptions"
    class="w-[140px]"
  >
    <template #suffixIcon>
      <Sun />
    </template>
  </a-select>
</template>

<style lang="scss" scoped></style>
