import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Sponsors = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      
        <h2 className="text-5xl md:text-7xl font-black text-black mb-8 tracking-tighter">
          OUR <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-500 to-black">SPONSORS</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-16 font-medium">
          We are proud to partner with organizations that share our vision for building a sustainable future.
        </p>

        {/* Sponsor Grid Placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
           {[1, 2, 3, 4].map((i) => (
             <div key={i} className="aspect-video bg-gray-100 rounded-3xl flex items-center justify-center">
                <span className="text-gray-400 font-bold text-xl">LOGO {i}</span>
             </div>
           ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/partner-with-us"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95 shadow-xl"
          >
            Partner with us
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
