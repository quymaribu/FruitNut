import axios, { AxiosInstance } from "axios";
// import { API_CONFIG } from "@/config/api.config";



// const API_BASE_URL = API_CONFIG.BASE_URL;
const API_BASE_URL = import.meta.env.VITE_API_URL; 
// Khởi tạo instance axios
const instance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Wrapper API
export const api = {
  async get<TResponse>(endpoint: string): Promise<TResponse> {
    const response = await instance.get<TResponse>(endpoint);
    return response.data;
  },

  async post<TResponse, TRequest>(endpoint: string, data: TRequest): Promise<TResponse> {
    const response = await instance.post<TResponse>(endpoint, data);
    return response.data;
  },

  async put<TResponse, TRequest>(endpoint: string, data: TRequest): Promise<TResponse> {
    const response = await instance.put<TResponse>(endpoint, data);
    return response.data;
  },

  async delete<TResponse = void>(endpoint: string): Promise<TResponse> {
    const response = await instance.delete<TResponse>(endpoint);
    return response.data;
  },
};
