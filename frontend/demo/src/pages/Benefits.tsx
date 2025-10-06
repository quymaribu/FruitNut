import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Zap, Shield, Brain, Sparkles, Leaf } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Tốt cho tim mạch",
      description: "Giàu chất chống oxi hóa và omega-3 từ hạt giúp bảo vệ tim mạch khỏe mạnh.",
    },
    {
      icon: Zap,
      title: "Tăng năng lượng",
      description: "Vitamin và khoáng chất từ trái cây cung cấp năng lượng tự nhiên cho cả ngày.",
    },
    {
      icon: Shield,
      title: "Tăng cường miễn dịch",
      description: "Vitamin C và các chất dinh dưỡng giúp hệ miễn dịch mạnh mẽ.",
    },
    {
      icon: Brain,
      title: "Cải thiện trí não",
      description: "Omega-3 từ hạt giúp tăng cường trí nhớ và khả năng tập trung.",
    },
    {
      icon: Sparkles,
      title: "Làm đẹp da",
      description: "Chất chống oxi hóa giúp da sáng khỏe, chống lão hóa tự nhiên.",
    },
    {
      icon: Leaf,
      title: "Detox cơ thể",
      description: "Chất xơ và enzyme tự nhiên giúp làm sạch và thanh lọc cơ thể.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Lợi Ích Sức Khỏe
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Khám phá những lợi ích tuyệt vời từ đồ uống kết hợp trái cây và hạt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Info Section */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-center text-foreground">
              Tại sao kết hợp Trái cây & Hạt?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Trái cây tươi</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ Giàu vitamin và khoáng chất</li>
                  <li>✓ Chứa nhiều chất xơ tự nhiên</li>
                  <li>✓ Cung cấp năng lượng nhanh</li>
                  <li>✓ Hương vị tự nhiên thơm ngon</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Hạt dinh dưỡng</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ Giàu protein và chất béo lành mạnh</li>
                  <li>✓ Omega-3 tốt cho não bộ</li>
                  <li>✓ Tạo cảm giác no lâu</li>
                  <li>✓ Tăng cường sức khỏe tim mạch</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Benefits;
