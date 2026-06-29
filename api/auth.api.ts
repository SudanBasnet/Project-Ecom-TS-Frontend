import { TLoginInput } from "@/types/auth.types";
import axios from "axios";

//!login API
export const login = async (data: TLoginInput) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/auth/login",
      data,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
