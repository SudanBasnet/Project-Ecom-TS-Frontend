import type { IImage } from "@/types/category.types";
import type { Role } from "@/types/enum.types";
import { createContext } from "react";

export interface IUser {
  _id: string;
  full_name: string;
  email: string;
  role: Role;
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
