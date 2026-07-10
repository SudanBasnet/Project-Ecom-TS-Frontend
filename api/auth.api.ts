import { TLoginInput } from "@/types/auth.types";
import type { IUser } from "@/contexts/auth.context";
import { http, unwrapData } from "./http";

//!login API
export const login = async (data: TLoginInput) => {
  const response = await http.post("/auth/login", data);
  return response.data;
};

export const registerAccount = async (data: {
  full_name: string;
  email: string;
  password: string;
}) => {
  const response = await http.post("/auth/register", data);
  return response.data;
};

export const getProfile = async () => {
  const response = await http.get("/auth/me");
  return unwrapData<IUser>(response);
};

export const logoutAccount = async () => {
  const response = await http.get("/auth/logout");
  return response.data;
};
