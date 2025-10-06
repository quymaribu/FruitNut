import Navbar from "@/components/Navbar";
import DrinkCard from "@/components/DrinkCard";
import greenSmoothie from "@/assets/green-smoothie.jpg";
import orangeSmoothie from "@/assets/orange-smoothie.jpg";
import berrySmoothie from "@/assets/berry-smoothie.jpg";

const Recipes = () => {
  const recipes = [
    {
      id: 1,
      title: "Green Power",
      description: "Tăng cường năng lượng với rau xanh và hạnh nhân",
      image: greenSmoothie,
      ingredients: ["Cải xoăn", "Chuối", "Hạnh nhân", "Bơ"],
      category: "Detox",
    },
    {
      id: 2,
      title: "Tropical Sunshine",
      description: "Vị nhiệt đới tươi mát với xoài và hạt điều",
      image: orangeSmoothie,
      ingredients: ["Xoài", "Dứa", "Hạt điều", "Dừa"],
      category: "Năng lượng",
    },
    {
      id: 3,
      title: "Berry Blast",
      description: "Giàu chất chống oxi hóa từ các loại quả mọng",
      image: berrySmoothie,
      ingredients: ["Dâu tây", "Việt quất", "Hạt phỉ", "Chia"],
      category: "Antioxidant",
    },
    {
      id: 4,
      title: "Green Power",
      description: "Tăng cường năng lượng với rau xanh và hạnh nhân",
      image: greenSmoothie,
      ingredients: ["Cải xoăn", "Chuối", "Hạnh nhân", "Bơ"],
      category: "Detox",
    },
    {
      id: 5,
      title: "Tropical Sunshine",
      description: "Vị nhiệt đới tươi mát với xoài và hạt điều",
      image: orangeSmoothie,
      ingredients: ["Xoài", "Dứa", "Hạt điều", "Dừa"],
      category: "Năng lượng",
    },
    {
      id: 6,
      title: "Berry Blast",
      description: "Giàu chất chống oxi hóa từ các loại quả mọng",
      image: berrySmoothie,
      ingredients: ["Dâu tây", "Việt quất", "Hạt phỉ", "Chia"],
      category: "Antioxidant",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Công Thức Đồ Uống
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Khám phá bộ sưu tập công thức đồ uống healthy của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <DrinkCard
                key={recipe.id}
                title={recipe.title}
                description={recipe.description}
                image={recipe.image}
                ingredients={recipe.ingredients}
                category={recipe.category}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Recipes;
