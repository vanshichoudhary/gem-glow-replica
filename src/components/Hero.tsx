
const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source
          src="https://ik.imagekit.io/cn0lbrbin/0613.mp4?updatedAt=1749784621964"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="text-center text-white max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4">Exquisite Jewelry</h1>
          <p className="text-lg sm:text-xl md:text-2xl">Discover our stunning collection</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
