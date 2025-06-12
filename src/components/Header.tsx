
import { useState } from "react";
import { Search, User, ShoppingBag, ChevronDown, Instagram, Facebook, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { toast } = useToast();
  const { user, profile, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Success",
      description: "Signed out successfully!",
    });
    navigate('/');
  };

  const handleAdminPanel = () => {
    navigate('/admin');
  };

  const handleAuth = () => {
    navigate('/auth');
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

        <div className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border border-foreground rounded-full flex items-center justify-center mb-2">
              <span className="text-lg font-bold">NS</span>
            </div>
            <span className="text-sm tracking-widest">NOORA SHAWQI</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Button variant="outline" size="sm" onClick={handleAdminPanel} className="bg-red-50 hover:bg-red-100 border-red-200">
                  <Shield className="mr-2 h-4 w-4 text-red-600" />
                  <span className="text-red-600 font-medium">Admin Panel</span>
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled className="flex-col items-start">
                    <span className="font-medium">{profile?.email || user.email}</span>
                    <span className="text-xs text-muted-foreground capitalize">{profile?.role} Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleAuth}>
                Sign In
              </Button>
              <Button variant="outline" size="sm" onClick={handleAuth}>
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
    </header>
  );
};

export default Header;
