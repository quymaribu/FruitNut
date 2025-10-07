import axios, { AxiosInstance } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const instance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const api = {
  async get<TResponse>(endpoint: string): Promise<TResponse> {
    const res = await instance.get<TResponse>(endpoint);
    return res.data;
  },

  async post<TResponse, TRequest = unknown>(
    endpoint: string,
    data: TRequest
  ): Promise<TResponse> {
    const res = await instance.post<TResponse>(endpoint, data);
    return res.data;
  },

  async put<TResponse, TRequest = unknown>(
    endpoint: string,
    data: TRequest
  ): Promise<TResponse> {
    const res = await instance.put<TResponse>(endpoint, data);
    return res.data;
  },

  async delete<TResponse = void>(endpoint: string): Promise<TResponse> {
    const res = await instance.delete<TResponse>(endpoint);
    return res.data;
  },
};
