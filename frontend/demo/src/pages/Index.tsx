import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DrinkCard from "@/components/DrinkCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/services/products";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import greenSmoothie from "@/assets/green-smoothie.jpg";
import orangeSmoothie from "@/assets/orange-smoothie.jpg";
import berrySmoothie from "@/assets/berry-smoothie.jpg";
import { Product } from "@/types/api";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();

  // 🚫 Không render nếu chưa biết user (đang loading)
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [authLoading, user, navigate]);

  // 🧠 useQuery vẫn được gọi unconditionally
  const {
    data: products = [],
    isLoading: productsLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: productsService.getAll,
    enabled: !!user && !authLoading, // ✅ Chỉ gọi nếu đã login và đã xong auth loading
  });

  // 👀 Hiển thị màn hình loading trong khi kiểm tra đăng nhập
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Đang kiểm tra đăng nhập...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;



  const productImages = [greenSmoothie, orangeSmoothie, berrySmoothie];
  const featuredProducts = products.filter((p) => p.isActive).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Featured Drinks Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Công Thức Nổi Bật
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Những công thức được yêu thích nhất từ cộng đồng
            </p>
          </div>

          {isError && (
            <Alert variant="destructive" className="mb-8">
              <AlertDescription>
                Không thể tải sản phẩm. Vui lòng kiểm tra kết nối API.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {productsLoading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </>
            ) : (
              featuredProducts.map((product, index) => (
                <DrinkCard
                  key={product.productId}
                  title={product.name}
                  description={`Giá: ${product.price.toLocaleString("vi-VN")}đ | Còn ${product.stock} sản phẩm`}
                  image={productImages[index % productImages.length]}
                  ingredients={[`Mã: ${product.productId}`]}
                  category={product.category || "Sản phẩm"}
                />
              ))
            )}
          </div>

          <div className="text-center">
            <Link to="/recipes">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 group"
              >
                Xem tất cả công thức
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Tại Sao Chọn FruitNut?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi mang đến giải pháp dinh dưỡng hoàn hảo cho lối sống
              healthy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-3xl">
                🥑
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">
                100% Tự Nhiên
              </h3>
              <p className="text-muted-foreground">
                Chỉ sử dụng nguyên liệu tươi ngon, không chất bảo quản
              </p>
            </div>

            <div
              className="text-center p-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-secondary to-secondary-glow rounded-full flex items-center justify-center text-3xl">
                💪
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Dinh Dưỡng Cân Bằng
              </h3>
              <p className="text-muted-foreground">
                Kết hợp hoàn hảo giữa vitamin và protein từ hạt
              </p>
            </div>

            <div
              className="text-center p-6 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center text-3xl">
                ⭐
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Dễ Thực Hiện
              </h3>
              <p className="text-muted-foreground">
                Hướng dẫn chi tiết, dễ làm theo ngay tại nhà
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
