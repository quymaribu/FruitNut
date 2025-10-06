import Navbar from "@/components/Navbar";
import DrinkCard from "@/components/DrinkCard";
import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/services/products";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Recipes = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productsService.getAll,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Sản Phẩm Đồ Uống
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Khám phá bộ sưu tập đồ uống healthy từ API backend
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-8 max-w-3xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Lỗi kết nối API</AlertTitle>
              <AlertDescription>
                Không thể kết nối tới backend tại https://localhost:7258. 
                <br />
                Vui lòng kiểm tra:
                <ul className="list-disc ml-4 mt-2">
                  <li>Backend .NET đang chạy</li>
                  <li>CORS đã được cấu hình để cho phép origin từ {window.location.origin}</li>
                </ul>
                <br />
                Chi tiết: {error instanceof Error ? error.message : 'Unknown error'}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-lg" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))
            ) : products && products.length > 0 ? (
              products.map((product) => (
                <DrinkCard
                  key={product.productId}
                  title={product.name}
                  description={`Giá: ${product.price.toLocaleString('vi-VN')}đ - Còn lại: ${product.stock} sản phẩm`}
                  image={`https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&h=300&fit=crop`}
                  ingredients={[product.category || "Đồ uống", `Giá: ${product.price}đ`]}
                  category={product.isActive ? "Đang bán" : "Hết hàng"}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">Chưa có sản phẩm nào trong hệ thống</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Recipes;
