
import { Button } from "@/components/ui/button";

const Collections = () => {
  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light tracking-wide mb-4">EXPLORE OUR COLLECTIONS</h2>
          <p className="text-lg text-muted-foreground">Choose your destination & travel through jewellery</p>
        </div>

        <div className="relative">
          <div 
            className="w-full h-96 bg-cover bg-center rounded-lg relative overflow-hidden"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <p className="text-sm tracking-widest mb-2">NEW LAUNCH</p>
              <h3 className="text-4xl font-light tracking-wide">LOVE IN TOKYO</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collections;
