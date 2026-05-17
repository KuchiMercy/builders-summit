import { ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToRegister = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 h-full">
        <img
          src="/images/conference.jpg"
          alt="Modern Architecture"
          className="w-full h-full object-cover"
        />
        {/* Premium Overlay - Adjusted for better readability */}
        <div className="absolute inset-0 bg-linear-to-b from-white/90 via-white/50 to-white/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center h-full pt-20">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white mb-8 animate-fade-in-up shadow-xl hover:scale-105 transition-transform cursor-default">
          <span className="text-xs font-bold tracking-widest uppercase">
            Summit 2026 Concluded
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-dark tracking-tighter mb-6 animate-fade-in-up delay-100 leading-[0.9] drop-shadow-sm">
          BUILDING <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-dark/70 to-dark">
            SYSTEMS
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-dark max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200 font-medium leading-relaxed drop-shadow-sm">
          The 2026 Visionary Builders Summit has concluded, but the journey continues. Join our growing community of visionary builders, innovators, and leaders.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-fade-in-up delay-300 w-full sm:w-auto">
          <button
            onClick={scrollToRegister}
            className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-full font-bold text-lg hover:opacity-90 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-2xl hover:shadow-primary/20"
          >
            Join the Community
            <ArrowRight size={20} />
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-10 py-5 bg-white text-dark border border-dark/10 rounded-full font-bold text-lg hover:bg-primary/5 transition-all shadow-lg hover:shadow-xl"
          >
            Learn More
          </button>
        </div>


      </div>
    </section>
  );
};

export default Hero;
