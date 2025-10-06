import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            FruitNut
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              to="/recipes"
              className="text-foreground hover:text-primary transition-colors"
            >
              Công thức
            </Link>
            <Link
              to="/benefits"
              className="text-foreground hover:text-primary transition-colors"
            >
              Lợi ích
            </Link>
            <Link
              to="/login"
              className="text-foreground hover:text-primary transition-colors"
            >
              Đăng nhập
            </Link>
            <Button
              variant="default"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              Bắt đầu ngay
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Trang chủ
              </Link>
              <Link
                to="/recipes"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Công thức
              </Link>
              <Link
                to="/benefits"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Lợi ích
              </Link>
              <Button
                variant="default"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                Bắt đầu ngay
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
