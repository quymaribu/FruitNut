import { api } from "@/lib/api";
import { Product } from "@/types/api";

export const productsService = {
  getAll: () => api.get<Product[]>("/products"),
  getById: (id: number) => api.get<Product>(`/products/${id}`),
  create: (product: Omit<Product, "productId">) => api.post<Product>("/products", product),
  update: (id: number, product: Partial<Product>) => api.put<Product>(`/products/${id}`, product),
  delete: (id: number) => api.delete(`/products/${id}`),
};
