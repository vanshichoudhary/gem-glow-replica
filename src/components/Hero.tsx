
const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://videos.pexels.com/video-files/6964253/6964253-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-20" />
    </section>
  );
};

export default Hero;
