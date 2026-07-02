import { TLoginInput } from "@/types/auth.types";
import { http } from "./http";

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
