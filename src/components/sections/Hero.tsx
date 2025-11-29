import { ArrowRight, Calendar, MapPin } from "lucide-react";

const Hero = () => {
  const scrollToRegister = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 h-full">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" 
          alt="Modern Architecture" 
          className="w-full h-full object-cover"
        />
        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center h-full pt-20">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white mb-8 animate-fade-in-up shadow-xl hover:scale-105 transition-transform cursor-default">
          <span className="text-xs font-bold tracking-widest uppercase">
            Summit 2026
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-black tracking-tighter mb-6 animate-fade-in-up delay-100 leading-[0.9]">
          BUILDING <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-500 to-black">
            SYSTEMS
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-12 animate-fade-in-up delay-200 font-medium leading-relaxed">
          The gathering of visionary builders, innovators, and leaders shaping the future of technology and infrastructure.
        </p>

        {/* Event Details Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up delay-300">
          <div className="flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-md border border-white/50 rounded-full shadow-sm hover:bg-white transition-colors">
            <Calendar size={20} className="text-black" />
            <span className="font-bold text-sm md:text-base text-gray-900">March 28, 2026</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-md border border-white/50 rounded-full shadow-sm hover:bg-white transition-colors">
            <MapPin size={20} className="text-black" />
            <span className="font-bold text-sm md:text-base text-gray-900">Zoom (Virtual)</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-500 w-full sm:w-auto">
          <button
            onClick={scrollToRegister}
            className="w-full sm:w-auto px-10 py-5 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-900 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-2xl hover:shadow-black/20"
          >
            Register Now
            <ArrowRight size={20} />
          </button>
          <button 
             onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth'})}
             className="w-full sm:w-auto px-10 py-5 bg-white/40 backdrop-blur-md border border-black/10 text-black rounded-full font-bold text-lg hover:bg-white transition-all shadow-lg hover:shadow-xl"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
