import { defineStore } from "pinia";
import { computed, watchEffect, watch } from "vue";
import { useStorage, usePreferredDark } from "@vueuse/core";
import { theme as themeAnt } from "ant-design-vue";

export const useThemeStore = defineStore("theme", () => {
  const theme = useStorage<"system" | "light" | "dark">("theme", "system");
  const isDark = usePreferredDark();

  const themeOptions = [
    { label: "Системная", value: "system" },
    { label: "Светлая", value: "light" },
    { label: "Темная", value: "dark" },
  ];

  const currentTheme = computed(() => {
    if (theme.value == "system") return isDark.value ? "dark" : "light";
    return theme.value;
  });

  watchEffect(() => {
    if (currentTheme.value == "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  });

  const { token } = themeAnt.useToken();
  watch(
    token,
    (newToken) => {
      for (const [key, val] of Object.entries(newToken)) {
        if (typeof val === "string" || typeof val === "number") {
          document.documentElement.style.setProperty(
            `--ant-${key}`,
            val.toString()
          );
        }
      }
    },
    {
      immediate: true,
    }
  );

  const themeLight = {
    token: {},
  };

  const { darkAlgorithm } = themeAnt;
  const themeDark = {
    algorithm: darkAlgorithm,
    token: {},
  };

  const currentThemeToken = computed(() => {
    if (currentTheme.value == "dark") return themeDark;
    return themeLight;
  });

  return { themeOptions, currentThemeToken };
});
