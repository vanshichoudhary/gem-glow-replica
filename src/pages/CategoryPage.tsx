import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";

// Mock product data
const generateProducts = (category: string) => {
  const products = [];
  for (let i = 1; i <= 24; i++) {
    products.push({
      id: `${category}-${i}`,
      name: `${category.charAt(0).toUpperCase() + category.slice(1)} ${i} - Elegant Design`,
      price: Math.floor(Math.random() * 50000) + 2000,
      originalPrice: Math.floor(Math.random() * 70000) + 5000,
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviews: Math.floor(Math.random() * 500) + 50,
      image: `https://images.unsplash.com/photo-${getImageId(category)}?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`,
      discount: Math.floor(Math.random() * 40) + 10
    });
  }
  return products;
};

const getImageId = (category: string) => {
  const imageIds = {
    necklaces: "1599643478518-a784e5dc4c8f",
    pendants: "1506630448388-4e683c67ddb0",
    bracelets: "1611591437281-460bfbe1220a",
    rings: "1605100804763-247f67b3557e",
    earrings: "1535632066927-ab7c9ab60908",
    anklets: "1515562141207-7a88fb7ce338"
  };
  return imageIds[category as keyof typeof imageIds] || imageIds.necklaces;
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [sortBy, setSortBy] = useState("popularity");
  const isMobile = useIsMobile();
  
  if (!category) return null;
  
  const products = generateProducts(category);
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-light mb-2">{categoryTitle}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Showing {products.length} products</p>
        </div>

        <div className="flex gap-4 sm:gap-8">
          {/* Mobile Filters */}
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="mb-4">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <ProductFilters />
              </SheetContent>
            </Sheet>
          ) : (
            /* Desktop Filters Sidebar */
            <div className="w-64 flex-shrink-0">
              <ProductFilters />
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-xs sm:text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  rating={parseFloat(product.rating)}
                  reviews={product.reviews}
                  image={product.image}
                  discount={product.discount}
                />
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-6 sm:mt-8">
              <Button variant="outline" size="lg">
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
