import { defineStore } from "pinia";

import { useApi } from "@/shared/api";
import { signIn } from "./api";
import { LoginData } from "./Types";

export const useUserStore = defineStore("user", () => {
  const { execute: fetchSignin, loading: fetchSigninLoading } = useApi(
    async (data: LoginData) => {
      const token = await signIn(data);
      localStorage.setItem("token", token);

      return token;
    }
  );

  const logout = async () => {
    localStorage.removeItem("token");
  };

  return {
    fetchSignin,
    fetchSigninLoading,
    logout,
  };
});
