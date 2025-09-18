<script setup lang="ts">
import { ThemeSelect } from "@/features/theme-select";
</script>

<template>
  <a-layout class="layout">
    <a-layout-header class="layout__header">
      <a-flex justify="space-between" align="center">
        <span class="header">SaaSoft</span>

        <ThemeSelect />
      </a-flex>
    </a-layout-header>

    <a-layout-content class="layout__content">
      <a-card>
        <router-view v-slot="{ Component }">
          <Transition appear>
            <component :is="Component" />
          </Transition>
        </router-view>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<style lang="scss" scoped>
.layout {
  height: 100vh;

  &__header {
    background: var(--ant-colorBgContainer);
    border-bottom: 1px solid var(--ant-colorBorderSecondary);
  }

  &__content {
    padding: 20px 30px;
  }
}
.header {
  font-size: 22px;
}
</style>
