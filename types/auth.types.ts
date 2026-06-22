import { loginSchema, registerSchema } from "@/schema/auth.schema";
import * as yup from "yup";

export type TLoginInput = yup.InferType<typeof loginSchema>;
export type TRegisterInput = yup.InferType<typeof registerSchema>;
