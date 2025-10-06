import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DrinkCardProps {
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  category: string;
}

const DrinkCard = ({ title, description, image, ingredients, category }: DrinkCardProps) => {
  return (
    <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
          {category}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ingredient) => (
            <Badge key={ingredient} variant="secondary" className="bg-muted text-muted-foreground">
              {ingredient}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DrinkCard;
