import { Check } from "lucide-react";

const EventObjectives = () => {
  const objectives = [
    {
      title: "Raise Visionaries",
      desc: "To raise visionaries committed to building timeless structures and systems."
    },
    {
      title: "Real-World Strategy",
      desc: "To inspire participants with real-world strategies for building sustainable systems in business, career, and community life."
    },
    {
      title: "Practical Frameworks",
      desc: "To provide practical frameworks for personal development and leadership growth."
    },
    {
      title: "Collaborative Platform",
      desc: "To create a collaborative platform for networking, mentorship, and partnerships."
    },
    {
      title: "Long-Term Impact",
      desc: "To challenge participants to think beyond survival and build solutions with long-term impact."
    },
  ];

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] bg-size-[16px_16px] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left Side: Title */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
            
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
                OUR <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500">
                  OBJECTIVES
                </span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed font-medium">
                We are not just hosting an event; we are sparking a movement. These are the principles that guide our gathering.
              </p>
            </div>
          </div>
          
          {/* Right Side: List */}
          <div className="lg:w-2/3">
            <div className="space-y-4">
              {objectives.map((obj, index) => (
                <div key={index} className="group p-8 rounded-4xl border border-white/10 hover:bg-white hover:text-black transition-all duration-500 flex gap-6 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-500">
                      <Check size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-black transition-colors">{obj.title}</h3>
                    <p className="text-lg text-gray-400 group-hover:text-gray-600 transition-colors font-medium leading-relaxed">{obj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventObjectives;
