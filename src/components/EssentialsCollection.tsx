
const EssentialsCollection = () => {
  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <div className="bg-gray-100 aspect-square rounded-lg overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="Lotti Hoops in Gold"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-medium mb-2">Lotti Hoops in Gold</h3>
              <p className="text-muted-foreground mb-2">Limited Release</p>
              <p className="text-lg font-semibold">$198.00</p>
              <div className="flex justify-center gap-2 mt-3">
                <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 lg:p-16 rounded-lg text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              THE ESSENTIALS COLLECTION
            </h2>
            <p className="text-lg text-white/90">
              Recycled gold, AAA-grade gemstones, and ethically sourced diamonds
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="bg-gray-100 aspect-square rounded-lg overflow-hidden mb-4">
              <img 
                src="/placeholder.svg" 
                alt="Ilona Earrings in Gold"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-medium mb-2">Ilona Earrings in Gold</h3>
            <p className="text-lg font-semibold">$168.00</p>
            <div className="flex justify-center gap-2 mt-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gray-100 aspect-square rounded-lg overflow-hidden mb-4">
              <img 
                src="/placeholder.svg" 
                alt="Adelaide Hoops in Sterling Silver"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-medium mb-2">Adelaide Hoops in Sterling Silver</h3>
            <p className="text-lg font-semibold">$115.00</p>
            <div className="flex justify-center gap-2 mt-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EssentialsCollection;
