export interface Product {
  productId: number;
  name: string;
  price: number;
  stock: number;
  isActive: boolean;
  category: string | null;
}

export interface User {
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  isActive: boolean;
}

export interface Category {
  categoryId: number;
  name: string;
  slug: string;
  parentId: number | null;
}

export interface Order {
  orderId: number;
  userId: number;
  status: string;
  totalAmount: number;
  createdAt: string;
  user?: User;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  orderItemId: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
}

export interface Cart {
  cartId: number;
  userId: number;
}

export interface CartItem {
  cartItemId: number;
  cartId: number;
  productId: number;
  quantity: number;
}

export interface Address {
  addressId: number;
  userId: number;
  street: string;
  city: string;
  country: string;
}

export interface Payment {
  paymentId: number;
  orderId: number;
  amount: number;
  provider: string;
  transactionId: string;
  status: string;
  processedAt: string;
}

export interface Role {
  roleId: number;
  roleName: string;
}

export interface UserRole {
  userRoleId: number;
  userId: number;
  roleId: number;
}
