import { api } from "@/lib/api";
import { User } from "@/types/api";

export const usersService = {
  getAll: () => api.get<User[]>("/users"),
  getById: (id: number) => api.get<User>(`/users/${id}`),
  create: (user: Omit<User, "userId">) => api.post<User, Omit<User, "userId">>("/users", user),
  update: (id: number, user: Partial<User>) => api.put<User, Partial<User>>(`/users/${id}`, user),
  delete: (id: number) => api.delete(`/users/${id}`),
};
