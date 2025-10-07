import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { cartService } from "@/services/cart";
import { CartItem } from "@/types/api";
import { CheckCircle, ArrowLeft, ShoppingBag, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import greenSmoothie from "@/assets/green-smoothie.jpg";
import orangeSmoothie from "@/assets/orange-smoothie.jpg";
import berrySmoothie from "@/assets/berry-smoothie.jpg";
const Checkout = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [bankCode, setBankCode] = useState("TPBank");
    const [bankNumber, setBankNumber] = useState("29909032002");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ show: boolean; text: string; type: string }>({
        show: false,
        text: "",
        type: "",
    });
    const [invoiceNumber, setInvoiceNumber] = useState("");

    const totalAmount = cartItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const invoice = params.get("invoiceNumber") || "INV-" + Date.now();
        setInvoiceNumber(invoice);
    }, []);

    const loadCart = async () => {
        try {
            const data = await cartService.getAll();
            console.log("🚀 cartItems:", data);
            setCartItems(data);
        } catch (err) {
            toast({
                title: "Lỗi",
                description: "Không thể tải giỏ hàng.",
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const handleConfirmPayment = async () => {
        try {
            setIsLoading(true);

            await axios.put(`/api/Invoice/confirm-invoice-by-customer`, {
                InvoiceNumber: invoiceNumber,
                Status: "pending",
            });

            await cartService.clearCart();
            setCartItems([]);
            setMessage({ show: true, text: "Xác nhận thanh toán thành công!", type: "success" });
            setIsLoading(false);

            setTimeout(() => {
                navigate("/products");
            }, 1000);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            setMessage({
                show: true,
                text: "Lỗi khi xác nhận thanh toán. Vui lòng thử lại.",
                type: "error",
            });
        }
    };

    if (message.type === "success") {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <CheckCircle className="text-green-500 w-12 h-12 mb-3" />
                <h2 className="text-2xl font-bold mb-2">Thanh toán đã được ghi nhận!</h2>
                <p className="text-muted-foreground mb-6">Cảm ơn bạn đã thanh toán. Đơn hàng đang được xử lý.</p>
                <div className="flex gap-3">
                    <button onClick={() => navigate("/order-history")} className="bg-primary text-white px-4 py-2 rounded-lg">
                        Xem đơn hàng
                    </button>
                    <button onClick={() => navigate("/")} className="bg-gray-200 px-4 py-2 rounded-lg">
                        Quay về trang chủ
                    </button>
                </div>
            </div>
        );
    }
    const productImages = [greenSmoothie, orangeSmoothie, berrySmoothie];
    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm">
                    <ArrowLeft size={16} />
                    Quay lại
                </button>
            </div>

            <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

            {message.show && (
                <div className={`mb-4 p-3 rounded-md ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {message.text}
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-10">
                {/* BÊN TRÁI - Thanh toán */}
                <div className="border rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock size={18} />
                        <h2 className="font-semibold text-lg">Thông tin thanh toán</h2>
                    </div>

                    <div className="space-y-2 mb-6">
                        <p>Ngân hàng: <strong>{bankCode}</strong></p>
                        <p>Số tài khoản: <strong>{bankNumber}</strong></p>
                        <p>
                            Số tiền:{" "}
                            <span className="text-primary font-bold">{totalAmount.toLocaleString("vi-VN")}đ</span>
                        </p>
                        <p>Nội dung: Thanh toan don hang {invoiceNumber}</p>
                    </div>

                    <div className="text-center mb-6">
                        <h3 className="font-semibold mb-2">Quét mã QR để thanh toán</h3>
                        <img
                            src={`https://api.vietqr.io/image/970423-29909032002-Z1g3aKF.jpg?accountName=LAI%20NGOC%20QUY&amount=${totalAmount}&addInfo=Thanh%20Toan`}
                            alt="QR Thanh toán"
                            className="mx-auto w-60 h-60 rounded-lg border"
                        />
                    </div>

                    <button
                        onClick={handleConfirmPayment}
                        disabled={isLoading}
                        className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:opacity-90"
                    >
                        {isLoading ? "Đang xử lý..." : "Xác nhận thanh toán"}
                    </button>
                </div>

                {/* BÊN PHẢI - Đơn hàng */}
                <div className="border rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <ShoppingBag size={18} />
                        <h2 className="font-semibold text-lg">Đơn hàng của bạn</h2>
                    </div>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                        {cartItems.map((item, index) => (
                            <div key={item.productId} className="flex justify-between items-center border-b pb-2">
                                <div className="flex items-center gap-4">
                                    {item.product && (
                                        <>
                                            <img
                                                src={productImages[index % productImages.length]}
                                                alt={item.product.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />

                                            <div>
                                                <p className="font-semibold">{item.product.name}</p>
                                                <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <p className="font-bold text-primary">
                                    {(item.unitPrice * item.quantity).toLocaleString("vi-VN")}đ
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="border-t mt-4 pt-4 flex justify-between text-lg font-semibold">
                        <span>Tổng cộng:</span>
                        <span className="text-primary">{totalAmount.toLocaleString("vi-VN")}đ</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
