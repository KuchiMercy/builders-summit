import { Zap, Users, Network, FileText } from "lucide-react";

const WhatToExpect = () => {
  const tracks = [
    {
      icon: <Zap size={40} />,
      title: "Practical Empowerment",
      description: "Walk away with actionable strategies, not just theory. Our sessions are designed to equip you with the tools to build immediately.",
      tag: "Track 01",
      color: "bg-yellow-400"
    },
    {
      icon: <Users size={40} />,
      title: "Strategic Collaborations",
      description: "Connect with potential co-founders, partners, and mentors who are as committed to building the future as you are.",
      tag: "Track 02",
      color: "bg-blue-400"
    },
    {
      icon: <Network size={40} />,
      title: "Builder Network",
      description: "Join an exclusive ecosystem of innovators. Access a support system that extends far beyond the summit.",
      tag: "Track 03",
      color: "bg-purple-400"
    },
    {
      icon: <FileText size={40} />,
      title: "Impact Documentation",
      description: "Gain access to our post-summit playbook—a curated collection of insights, frameworks, and resources.",
      tag: "Track 04",
      color: "bg-green-400"
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] background-size:16px_16px opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-3xl">
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white mb-6">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-xs font-bold uppercase tracking-widest">The Summit Experience</span>
            </div> */}

          
            <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter leading-none">
              WHAT TO <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-500 to-black">EXPECT</span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-md mt-8 md:mt-0 text-right md:text-left font-medium border-l-4 border-black pl-6">
            An immersive ecosystem designed to equip, connect, and inspire the next generation of builders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track, index) => (
            <div
              key={index}
              className="group relative bg-gray-50 rounded-[2.5rem] p-10 hover:bg-black hover:text-white transition-all duration-500 overflow-hidden border border-gray-100 hover:border-black"
            >
              <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-10 transition-opacity transform translate-x-10 group-hover:translate-x-0 duration-500">
                {track.icon}
              </div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-black flex items-center justify-center text-black group-hover:scale-110 transition-transform duration-500 shadow-lg">
                      {track.icon}
                    </div>
                    
                  </div>
                  
                  <h3 className="text-3xl font-black mb-4 leading-tight">
                    {track.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-300 text-lg leading-relaxed font-medium transition-colors">
                    {track.description}
                  </p>
                </div>

         
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatToExpect;
