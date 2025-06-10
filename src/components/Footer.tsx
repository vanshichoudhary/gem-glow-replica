
import { Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const destinations = ["JAPAN", "MOROCCO", "CEYLON", "THE MALDIVES"];

  return (
    <footer className="bg-background border-t border-border">
      {/* Destinations */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
        {destinations.map((destination, index) => (
          <div key={index} className="text-center py-8 border-r border-border last:border-r-0">
            <h3 className="text-2xl font-light tracking-wide">{destination}</h3>
            <Button variant="outline" className="mt-4">DISCOVER</Button>
          </div>
        ))}
      </div>

      {/* Footer content */}
      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Information */}
          <div>
            <h4 className="text-lg font-light tracking-wide mb-6">INFORMATION</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer">CONTACT US</li>
              <li className="hover:text-foreground cursor-pointer">FAQ</li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-lg font-light tracking-wide mb-6">OUR POLICIES</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer">TERMS OF SERVICE</li>
              <li className="hover:text-foreground cursor-pointer">PRIVACY POLICY</li>
              <li className="hover:text-foreground cursor-pointer">RETURNS & EXCHANGE</li>
              <li className="hover:text-foreground cursor-pointer">SHIPPING POLICY</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2">
            <h4 className="text-lg font-light tracking-wide mb-6">SIGN UP AND SAVE</h4>
            <p className="text-muted-foreground mb-6">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <div className="flex gap-2 mb-6">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1"
              />
              <Button type="submit">Subscribe</Button>
            </div>
            <div className="flex gap-4">
              <Instagram size={20} className="cursor-pointer hover:text-muted-foreground" />
              <Facebook size={20} className="cursor-pointer hover:text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 noorashawqi.com By MarketMinds
          </p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">We accept</span>
            <div className="flex gap-2">
              <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">VISA</div>
              <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center">MC</div>
              <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center">AE</div>
              <div className="w-8 h-5 bg-gray-800 rounded text-white text-xs flex items-center justify-center">AP</div>
              <div className="w-8 h-5 bg-green-500 rounded text-white text-xs flex items-center justify-center">GP</div>
              <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center">TB</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
