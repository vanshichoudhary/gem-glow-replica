
import { useState } from "react";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CheckoutModal from "@/components/checkout/CheckoutModal";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  discount?: number;
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  rating, 
  reviews, 
  image, 
  discount 
}: ProductCardProps) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleBuyNow = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <Card className="group hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-3 sm:p-4">
          <div className="relative mb-3 sm:mb-4">
            <img 
              src={image} 
              alt={name}
              className="w-full h-48 sm:h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            <button className="absolute top-2 right-2 p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            </button>
            {discount && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs sm:text-sm font-medium">
                {discount}% OFF
              </div>
            )}
          </div>
          
          <h3 className="font-medium text-xs sm:text-sm mb-2 line-clamp-2">{name}</h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs sm:text-sm font-medium ml-1">{rating}</span>
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground ml-2">({reviews})</span>
          </div>
          
          <div className="flex items-center mb-3 sm:mb-4">
            <span className="text-base sm:text-lg font-bold">₹{price.toLocaleString()}</span>
            {originalPrice && (
              <span className="text-xs sm:text-sm text-muted-foreground line-through ml-2">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <div className="space-y-2">
            <Button 
              className="w-full text-xs sm:text-sm h-8 sm:h-10" 
              variant="default"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
            <Button className="w-full text-xs sm:text-sm h-8 sm:h-10" variant="outline">
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={{ name, price, image }}
      />
    </>
  );
};

export default ProductCard;
