
import { Search, User, ShoppingBag, ChevronDown, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full bg-background">
      {/* Top bar */}
      <div className="flex justify-between items-center px-6 py-2 text-sm border-b border-border">
        <div className="flex items-center gap-6">
          <span>CONTACT US</span>
          <span>FAQ</span>
        </div>
        <div className="flex items-center gap-4">
          <Instagram size={16} />
          <Facebook size={16} />
          <span>AED</span>
          <ChevronDown size={16} />
        </div>
      </div>

      {/* Main header */}
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center">
          <Search size={20} className="text-muted-foreground" />
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border border-foreground rounded-full flex items-center justify-center mb-2">
              <span className="text-lg font-bold">NS</span>
            </div>
            <span className="text-sm tracking-widest">NOORA SHAWQI</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <User size={20} />
          <ShoppingBag size={20} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex justify-center items-center gap-8 px-6 py-4 border-t border-border">
        <div className="flex items-center gap-1">
          <span className="tracking-wide">JEWELLERY</span>
          <ChevronDown size={16} />
        </div>
        <div className="flex items-center gap-1">
          <span className="tracking-wide">CAMPAIGNS</span>
          <ChevronDown size={16} />
        </div>
        <span className="tracking-wide">PRESS</span>
        <span className="tracking-wide">ABOUT US</span>
        <span className="tracking-wide">PRIVATE VIEWING</span>
        <div className="flex items-center gap-1">
          <span className="tracking-wide">OUR STORY</span>
          <ChevronDown size={16} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
