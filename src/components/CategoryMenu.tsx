
import { useNavigate } from "react-router-dom";

const CategoryMenu = () => {
  const navigate = useNavigate();
  
  const leftCategories = [
    { name: "NECKLACES", slug: "necklaces" },
    { name: "PENDANTS", slug: "pendants" }, 
    { name: "EARRINGS", slug: "earrings" },
    { name: "RINGS", slug: "rings" },
    { name: "BRACELETS", slug: "bracelets" },
    { name: "ANKLETS", slug: "anklets" },
    { name: "GIFT CARD", slug: "gift-card" }
  ];

  const rightCategories = [
    "LOVE IN TOKYO",
    "JAPAN",
    "MOROCCO", 
    "THE MALDIVES",
    "CEYLON"
  ];

  const handleCategoryClick = (slug: string) => {
    navigate(`/category/${slug}`);
  };

  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-light tracking-wide mb-6">SHOP BY CATEGORY</h3>
              <ul className="space-y-3">
                {leftCategories.map((category, index) => (
                  <li 
                    key={index} 
                    className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    onClick={() => handleCategoryClick(category.slug)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
            <div 
              className="w-full h-64 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80')`
              }}
            />
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-light tracking-wide mb-6">COLLECTIONS</h3>
              <ul className="space-y-3">
                {rightCategories.map((category, index) => (
                  <li key={index} className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div 
              className="w-full h-64 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1596944924616-7b8e6ba4e3d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80')`
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryMenu;
