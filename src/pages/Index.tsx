
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import Categories from "@/components/Categories";
import CategoryMenu from "@/components/CategoryMenu";
import ExceptionalPieces from "@/components/ExceptionalPieces";
import EssentialsCollection from "@/components/EssentialsCollection";
import FeaturedProducts from "@/components/FeaturedProducts";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    console.log("Noora Shawqi clone page mounted successfully");
  }, []);

  console.log("Noora Shawqi clone page rendering");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Collections />
      <ExceptionalPieces />
      <EssentialsCollection />
      <FeaturedProducts />
      <Categories />
      <CategoryMenu />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
