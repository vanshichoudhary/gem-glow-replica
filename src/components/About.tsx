
const About = () => {
  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-light tracking-wide">ABOUT THE BRAND</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Delivering a vision of modern elegance, Noora Shawqi epitomizes effortless femininity through 
                clean designs, exquisite craftsmanship and unique styles. Drawing inspiration from the designer's 
                love of travelling, Noora Shawqi showcases fine jewelry collections that combine cultural 
                references with impeccable quality, creating statement pieces with a timeless aesthetic.
              </p>
              <p>
                Noora Shawqi's designs are constructed in the finest materials of gold, diamonds and vibrant stones. The 
                brand's eponymous collection is made primarily in Dubai, working closely with highly skilled 
                artisans. Noora Shawqi's distinctive collections encourage women to be brilliant, adventurous 
                and unique. A woman who is modern, confident and who chooses meaningful jewelry as an 
                everyday companion or to make special occasions in her life.
              </p>
            </div>
          </div>
          <div 
            className="w-full h-96 bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80')`
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
