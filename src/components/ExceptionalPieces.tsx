
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ExceptionalPieces = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const pieces = [
    {
      id: 1,
      name: "Miro Signet Ring in Sterling Silver",
      image: "/placeholder.svg",
      badge: null
    },
    {
      id: 2,
      name: "Emelie Grande Ring in Sterling Silver",
      image: "/placeholder.svg",
      badge: "NEW"
    },
    {
      id: 3,
      name: "Sonder Ring in Gold",
      image: "/placeholder.svg",
      badge: null
    },
    {
      id: 4,
      name: "Ophidian Signet Ring in Sterling Silver",
      image: "/placeholder.svg",
      badge: null
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pieces.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + pieces.length) % pieces.length);
  };

  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">EXCEPTIONAL PIECES</h2>
            <p className="text-muted-foreground text-lg">Soon-to-be staples in your rotation</p>
          </div>
          <div className="flex gap-4">
            <span className="text-lg font-medium border-b-2 border-foreground pb-1">RINGS</span>
            <span className="text-lg text-muted-foreground">EARRINGS</span>
          </div>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            {pieces.map((piece, index) => (
              <div 
                key={piece.id} 
                className="flex-shrink-0 w-80 relative"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                <div className="relative bg-gray-100 aspect-square rounded-lg overflow-hidden mb-4">
                  {piece.badge && (
                    <span className="absolute top-4 left-4 bg-white text-black px-2 py-1 text-xs font-medium rounded">
                      {piece.badge}
                    </span>
                  )}
                  <img 
                    src={piece.image} 
                    alt={piece.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium text-center">{piece.name}</h3>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full bg-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full bg-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExceptionalPieces;
