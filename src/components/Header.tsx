
import { useState, useEffect } from "react";
import { Search, User, ShoppingBag, ChevronDown, Instagram, Facebook, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SignInModal from "@/components/auth/SignInModal";
import SignUpModal from "@/components/auth/SignUpModal";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('userToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
    toast({
      title: "Success",
      description: "Signed out successfully!",
    });
  };

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
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsSignInOpen(true)}>
                Sign In
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsSignUpOpen(true)}>
                Sign Up
              </Button>
            </div>
          )}
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

      {/* Auth Modals */}
      <SignInModal 
        isOpen={isSignInOpen} 
        onClose={() => setIsSignInOpen(false)}
      />
      <SignUpModal 
        isOpen={isSignUpOpen} 
        onClose={() => setIsSignUpOpen(false)}
      />
    </header>
  );
};

export default Header;
