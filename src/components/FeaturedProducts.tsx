
const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Blue Sapphire Necklace",
      image: "/placeholder.svg",
      category: "Necklaces"
    },
    {
      id: 2,
      name: "Red Ruby Ring",
      image: "/placeholder.svg",
      category: "Rings"
    },
    {
      id: 3,
      name: "Yellow Morganite Earrings",
      image: "/placeholder.svg",
      category: "Earrings"
    },
    {
      id: 4,
      name: "Silver Emerald Bracelet",
      image: "/placeholder.svg",
      category: "Bracelets"
    }
  ];

  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">FEATURED COLLECTIONS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="text-center group cursor-pointer">
              <div className="bg-black text-white aspect-square rounded-lg overflow-hidden mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black opacity-80"></div>
                <div className="relative z-10 flex flex-col justify-between h-full p-6">
                  <h3 className="text-xl font-bold">{product.category}</h3>
                  <h4 className="text-lg font-medium">{product.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
