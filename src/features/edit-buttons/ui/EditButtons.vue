<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { X, Pen, Save } from "lucide-vue-next";

const isEdit = defineModel<boolean>("isEdit", { default: false });
const emit = defineEmits<{
  (e: "save"): void;
  (e: "reset"): void;
}>();

const handleGlobalKeydown = (event: KeyboardEvent) => {
  // сохранение
  if (
    isEdit.value &&
    (event.ctrlKey || event.metaKey) &&
    event.key === "Enter"
  ) {
    event.preventDefault();
    event.stopPropagation();
    emit("save");
  }

  // режим редактирования
  if ((event.ctrlKey || event.metaKey) && ["e", "у"].includes(event.key)) {
    event.preventDefault();
    event.stopPropagation();
    isEdit.value = true;
  }

  // выйти из режима редактирования
  if (event.key === "Escape") {
    event.preventDefault();
    event.stopPropagation();
    emit("reset");
    isEdit.value = false;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleGlobalKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleGlobalKeydown);
});
</script>

<template>
  <div>
    <Transition mode="out-in">
      <div v-if="!isEdit">
        <a-tooltip title="ctrl (⌘) + E">
          <a-button @click="isEdit = true" :icon="$iconSlot(Pen)" />
        </a-tooltip>
      </div>

      <a-space v-else>
        <a-tooltip title="Esc">
          <a-button
            @click="
              emit('reset');
              isEdit = false;
            "
            type="text"
            :icon="$iconSlot(X)"
            danger
          />
        </a-tooltip>

        <a-tooltip title="ctrl (⌘) + Enter">
          <a-button @click="emit('save')" :icon="$iconSlot(Save)" />
        </a-tooltip>
      </a-space>
    </Transition>
  </div>
</template>

<style lang="scss" scoped></style>
