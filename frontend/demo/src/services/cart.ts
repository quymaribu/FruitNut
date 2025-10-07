import { api } from "@/lib/api";
import type { CartItemCreate, CartItem } from "@/types/api";

export const cartService = {
  // 🔹 Lấy toàn bộ giỏ hàng từ session (GET /cartitems)
  getAll: () => api.get<CartItemCreate[]>("/cartitems"),

  // 🔹 Thêm sản phẩm vào giỏ (POST /cartitems)
  addItem: (item: CartItemCreate) =>
    api.post<CartItemCreate[], CartItemCreate>("/cartitems", item),

  // 🔹 Cập nhật sản phẩm trong giỏ (PUT /cartitems/{productId})
  update: (productId: number, item: CartItemCreate) =>
    api.put<void, CartItemCreate>(`/cartitems/${productId}`, item),

  // 🔹 Xóa sản phẩm khỏi giỏ (DELETE /cartitems/{productId})
  delete: (productId: number) => api.delete<void>(`/cartitems/${productId}`),

  // 🔹 Xóa toàn bộ giỏ hàng (DELETE /cartitems/clear)
  clearCart: () => api.delete<void>("/cartitems/clear"),
};
