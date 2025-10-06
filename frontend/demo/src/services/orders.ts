import { api } from "@/lib/api";
import { Order } from "@/types/api";

export const ordersService = {
  getAll: () => api.get<Order[]>("/orders"),
  getById: (id: number) => api.get<Order>(`/orders/${id}`),
  create: (order: Omit<Order, "orderId">) =>
    api.post<Order, Omit<Order, "orderId">>("/orders", order),
  update: (id: number, order: Partial<Order>) =>
    api.put<Order, Partial<Order>>(`/orders/${id}`, order),
  delete: (id: number) => api.delete(`/orders/${id}`),
};
