import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    fullName: string,
    email: string,
    password: string,
    phone: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const BASE_URL = import.meta.env.VITE_API_URL;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Find user by email
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) throw new Error("Không thể kết nối đến server");

    const users: User[] = await response.json();
    const foundUser = users.find((u) => u.email === email && u.isActive);

    if (!foundUser) {
      throw new Error("Email hoặc mật khẩu không đúng");
    }

    // Store user
    setUser(foundUser);
    localStorage.setItem("user", JSON.stringify(foundUser));
  };

  const signup = async (
    fullName: string,
    email: string,
    password: string,
    phone: string
  ) => {
    // Check if email exists
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) throw new Error("Không thể kết nối đến server");

    const users: User[] = await response.json();
    if (users.some((u) => u.email === email)) {
      throw new Error("Email đã được sử dụng");
    }

    // Create new user
    const newUserResponse = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        email,
        phone,
        passwordHash: password, // In production, hash this!
        isActive: true,
      }),
    });

    if (!newUserResponse.ok) throw new Error("Không thể tạo tài khoản");

    const newUser: User = await newUserResponse.json();
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
