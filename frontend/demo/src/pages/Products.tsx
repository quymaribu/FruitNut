import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cartService } from "@/services/cart";
import { productsService } from "@/services/products";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import type { Product, CartItemCreate } from "@/types/api";
import { useEffect } from "react";
import greenSmoothie from "@/assets/green-smoothie.jpg";
import orangeSmoothie from "@/assets/orange-smoothie.jpg";
import berrySmoothie from "@/assets/berry-smoothie.jpg";
import type { CartItem } from "@/types/api";

const Products = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { toast } = useToast();

    // 🟢 Lấy danh sách sản phẩm
    const {
        data: products = [],
        isLoading: loadingProducts,
        error: productError,
    } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: productsService.getAll,
    });

    // 🟢 Lấy giỏ hàng từ Session API
    const { data: cartItems = [] } = useQuery<CartItem[]>({
        queryKey: ["cartItems"],
        queryFn: cartService.getAll,
    });

    // 🟢 Thêm sản phẩm vào giỏ
    const addItem = useMutation({
        mutationFn: (item: CartItemCreate) => cartService.addItem(item),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cartItems"] });
            toast({
                title: "Đã thêm vào giỏ hàng",
                description: "Sản phẩm đã được thêm thành công.",
            });
        },
    });


    const updateItem = useMutation({
        mutationFn: (data: { id: number; quantity: number }) => {
            const item = cartItems.find((i) => i.productId === data.id);
            if (!item) throw new Error("Item không tồn tại");

            const updateData: CartItemCreate = {
                productId: item.productId,
                quantity: data.quantity,
                unitPrice: item.unitPrice,
            };

            return cartService.update(data.id, updateData);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cartItems"] }),
    });


    const findItemInCart = (productId: number) =>
        cartItems.find((i) => i.productId === productId);

    const handleAddToCart = (product: Product) => {
        const existing = findItemInCart(product.productId);

        if (existing) {
            updateItem.mutate({
                id: existing.productId,
                quantity: existing.quantity + 1,
            });
        } else {
            addItem.mutate({
                productId: product.productId,
                quantity: 1,
                unitPrice: product.price,
            });
        }
    };
    const handleDecrease = (item: CartItem) => {
        if (item.quantity > 1) {
            updateItem.mutate({
                id: item.productId,
                quantity: item.quantity - 1,
            });
        } else {
            cartService.delete(item.productId).then(() => {
                queryClient.invalidateQueries({ queryKey: ["cartItems"] });
                toast({
                    title: "Đã xoá sản phẩm khỏi giỏ",
                    description: `${item.product?.name || "Sản phẩm"} đã bị xoá.`,
                });
            });
        }
    };


    const handleCheckout = () => navigate("/checkout");

    const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
    const totalAmount = cartItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

    const productImages = [greenSmoothie, orangeSmoothie, berrySmoothie];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                        Sản Phẩm
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Chọn sản phẩm yêu thích của bạn và đặt hàng ngay
                    </p>
                </div>

                {productError && (
                    <Alert variant="destructive" className="mb-8">
                        <AlertDescription>
                            Không thể tải sản phẩm. Vui lòng kiểm tra kết nối API.
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {loadingProducts ? (
                        <>
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Card key={i}>
                                    <Skeleton className="h-48 w-full" />
                                    <CardHeader>
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </CardHeader>
                                    <CardContent>
                                        <Skeleton className="h-4 w-full" />
                                    </CardContent>
                                </Card>
                            ))}
                        </>
                    ) : (
                        products
                            .filter((p) => p.isActive)
                            .map((product, index) => {
                                const inCart = findItemInCart(product.productId);
                                return (
                                    <Card
                                        key={product.productId}
                                        className="overflow-hidden hover:shadow-lg transition-shadow"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={productImages[index % productImages.length]}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <Badge className="absolute top-4 right-4 bg-primary">
                                                {product.category || "Sản phẩm"}
                                            </Badge>
                                        </div>

                                        <CardHeader>
                                            <h3 className="text-xl font-bold text-foreground">
                                                {product.name}
                                            </h3>
                                            <p className="text-2xl font-bold text-primary">
                                                {product.price.toLocaleString("vi-VN")}đ
                                            </p>
                                        </CardHeader>

                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                Còn lại:{" "}
                                                <span className="font-semibold">{product.stock}</span>{" "}
                                                sản phẩm
                                            </p>
                                        </CardContent>

                                        <CardFooter className="flex items-center justify-between">
                                            {!cartItems ? (
                                                <Skeleton className="h-10 w-full" />
                                            ) : inCart && inCart.quantity > 0 ? (
                                                <div className="flex items-center gap-3 w-full">
                                                    <Button size="icon" variant="outline" onClick={() => handleDecrease(inCart)}>
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="font-semibold text-lg flex-1 text-center">
                                                        {inCart.quantity}
                                                    </span>

                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        onClick={() => handleAddToCart(product)}
                                                        disabled={inCart.quantity >= product.stock}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>

                                                </div>
                                            ) : (
                                                <Button
                                                    className="w-full"
                                                    onClick={() => handleAddToCart(product)}
                                                    disabled={product.stock === 0}
                                                >
                                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                                    Thêm vào giỏ
                                                </Button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                );
                            })
                    )}

                </div>
                {totalItems > 0 && (
                    <div className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg z-50">
                        <div className="container mx-auto px-4 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        {totalItems} sản phẩm
                                    </p>
                                    <p className="text-2xl font-bold text-foreground">
                                        {totalAmount.toLocaleString("vi-VN")}đ
                                    </p>
                                </div>
                                <Button size="lg" onClick={handleCheckout} className="gap-2">
                                    <ShoppingCart className="h-5 w-5" />
                                    Thanh toán
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Products;
