import { api, ResponseData } from "@/shared/api";
import { LoginData } from "./Types";

export const signIn = async (data: LoginData): Promise<string> => {
  // Заглушка
  return "123";

  const res = await api.post<ResponseData<{ token: string }>>("/sign-in", data);

  return res.data.data.token;
};
