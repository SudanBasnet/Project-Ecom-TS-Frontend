import axios from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ApiEnvelope<T> = {
  message: string;
  status: string;
  success: boolean;
  data: {
    data: T;
    pagination?: {
      total_count: number;
      total_pages: number;
      current_page: number;
      next_page: number | null;
      prev_page: number | null;
    };
  };
};

export const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const unwrapData = <T>(response: { data: ApiEnvelope<T> }) =>
  response.data.data.data;
