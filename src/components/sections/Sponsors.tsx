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

        <div className="flex flex-row justify-center items-center gap-12 md:gap-16 mb-16">
          {[
            {
              name: "SmcDao",
              logo: "/images/smcdao.jpeg",
              link: "https://smcdao.com/"
            },
            {
              name: "Falytom",
              logo: "/images/falytom.png",
              link: "https://falytom.com.ng/"
            },
            {
              name: "Kinplus",
              logo: "/images/kinplus.png",
              link: "https://www.kinplusgroup.com/"
            },

          ].map((sponsor, index) => (
            <a
              key={index}
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition-transform hover:scale-105"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-56 w-56 object-contain"
              />
            </a>
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
