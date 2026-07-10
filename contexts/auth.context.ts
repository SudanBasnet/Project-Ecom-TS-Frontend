import type { IImage } from "@/types/category.types";
import { createContext } from "react";

export type UserRole = "ADMIN" | "USER" | "SUPER_ADMIN";

export interface IUser {
  _id: string;
  full_name: string;
  email: string;
  role: UserRole;
  profile_image?: IImage;
  createdAt: string;
  updatedAt: string;
}

type AuthContextValue = {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export default AuthContext;
