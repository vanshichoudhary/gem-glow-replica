
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
          src="https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
        <source
          src="https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_25fps.mp4"
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
