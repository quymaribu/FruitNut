import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
    productId: number;
    quantity: number;
}

interface CartContextType {
    cart: Record<number, number>;
    addToCart: (productId: number, quantity: number) => void;
    updateQuantity: (productId: number, change: number) => void;
    clearCart: () => void;
    getCartItems: () => CartItem[];
    getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Record<number, number>>({});

    const addToCart = (productId: number, quantity: number) => {
        setCart(prev => ({
            ...prev,
            [productId]: (prev[productId] || 0) + quantity,
        }));
    };

    const updateQuantity = (productId: number, change: number) => {
        setCart(prev => {
            const currentQty = prev[productId] || 0;
            const newQty = Math.max(0, currentQty + change);

            if (newQty === 0) {
                const { [productId]: _, ...rest } = prev;
                return rest;
            }

            return { ...prev, [productId]: newQty };
        });
    };

    const clearCart = () => {
        setCart({});
    };

    const getCartItems = (): CartItem[] => {
        return Object.entries(cart).map(([productId, quantity]) => ({
            productId: parseInt(productId),
            quantity,
        }));
    };

    const getTotalItems = () => {
        return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                updateQuantity,
                clearCart,
                getCartItems,
                getTotalItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
};
