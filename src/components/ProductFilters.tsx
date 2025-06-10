
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const ProductFilters = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              defaultValue={[1000, 50000]}
              max={100000}
              min={500}
              step={500}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹1,000</span>
              <span>₹50,000</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Material</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {['Gold', 'Silver', 'Platinum', 'Diamond', 'Pearl', 'Rose Gold'].map((material) => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox id={material} />
              <Label htmlFor={material}>{material}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {['4★ & above', '3★ & above', '2★ & above', '1★ & above'].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={rating} />
              <Label htmlFor={rating}>{rating}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Collection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {['Love in Tokyo', 'Japan', 'Morocco', 'The Maldives', 'Ceylon'].map((collection) => (
            <div key={collection} className="flex items-center space-x-2">
              <Checkbox id={collection} />
              <Label htmlFor={collection}>{collection}</Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductFilters;
