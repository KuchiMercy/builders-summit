import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Sponsors = () => {
  return (
    <section id="sponsors" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        <h2 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter">
          OUR SPONSORS
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-16 font-medium">
          We are proud to partner with organizations that share our vision for building a sustainable future.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16 items-center">
          {[
            {
              name: "Falytom",
              logo: "/images/falytom.png",
              link: "https://falytom.com.ng/"
            }
          ].map((sponsor, index) => (
            <a
              key={index}
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-video bg-white rounded-3xl flex items-center justify-center p-0 overflow-hidden border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group grayscale hover:grayscale-0"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="w-full h-full object-cover opacity-70 transition-opacity transform "
              />
            </a>
          ))}

          {/* Placeholders for other sponsors */}
          {/* {[1, 2, 3].map((i) => (
            <div key={`placeholder-${i}`} className="aspect-video bg-gray-50 rounded-3xl flex items-center justify-center border border-dashed border-gray-200">
              <span className="text-gray-300 font-bold text-sm">SPONSOR SLOT</span>
            </div>
          ))} */}
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
