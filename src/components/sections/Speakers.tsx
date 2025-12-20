import { User, Linkedin, Twitter, ArrowRight } from "lucide-react";

const Speakers = () => {
  return (
    <section id="speakers" className="py-24 bg-white relative overflow-hidden">
       {/* Decorative Background */}
       {/* <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-30"></div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white mb-6">
            <Sparkles size={16} className="text-yellow-400" />
            <span className="text-xs font-bold uppercase tracking-widest">The Lineup</span>
          </div> */}
          <h2 className="text-5xl md:text-7xl font-black text-black mb-6 tracking-tighter">
            KEYNOTE <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-500 to-black">SPEAKER</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-xl mx-auto font-medium">
            Learn from the visionaries who are redefining industries and building the future.
          </p>
        </div>

        {/* Keynote Speaker - Featured */}
        <div className="mb-24 relative">
          <div className="group relative rounded-[3rem] p-8 md:p-12 overflow-hidden">
             {/* Abstract Shapes */}
             {/* <div className="absolute top-0 right-0 w-96 h-96 bg-gray-800 rounded-full blur-[100px] opacity-50 pointer-events-none"></div> */}

            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="w-full md:w-1/2">
                <div className="aspect-4/5 rounded-4xl bg-gray-900 overflow-hidden relative shadow-2xl border border-gray-800">
                   {/* Placeholder for Keynote Image */}
                   <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                      <User size={120} className="text-gray-600" />
                   </div>
                   <div className="absolute bottom-6 left-6">
                      <span className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">Keynote Speaker</span>
                   </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">To Be Announced</h3>
                <p className="text-2xl text-gray-400 mb-8 font-medium">Visionary Leader & Industry Pioneer</p>
                <p className="text-lg text-gray-900 mb-10 leading-relaxed max-w-lg mx-auto md:mx-0">
                  Stay tuned for the reveal of our headline speaker. This individual represents the pinnacle of visionary building and sustainable innovation.
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                    <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">
                        <Linkedin size={24} />
                    </div>
                    <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">
                        <Twitter size={24} />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panelists Grid */}
        <div className="mb-16">
            <h3 className="text-3xl font-black text-black mb-12 text-center tracking-tight">
                FEATURED <span className="text-gray-400">PANELISTS</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    {
                        name: "Adora Nwodo",
                        role: "Founder",
                        org: "NexaScale",
                        image: "https://media.licdn.com/dms/image/v2/D4D03AQG0iYqOq2_bQA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714046660999?e=1738195200&v=beta&t=x-s2lO-K40sT8UJD-L4bQO-5O_U-5O-5O-5O-5O",
                        bio: "Software Engineer and Creator building the future of tech education in Africa.",
                        link: "https://nexascale.org"
                    },
                    {
                        name: "Favour Chukwuedo",
                        role: "Tech Lead",
                        org: "Digicore",
                        image: "https://media.licdn.com/dms/image/v2/D4D03AQG0iYqOq2_bQA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714046660999?e=1738195200&v=beta&t=x-s2lO-K40sT8UJD-L4bQO-5O_U-5O-5O-5O-5O",
                        bio: "Leading engineering teams to build scalable digital solutions.",
                        link: "#"
                    },
                    {
                        name: "Maya Horgan Famodu",
                        role: "Partner",
                        org: "Ingressive Capital",
                        image: "https://media.licdn.com/dms/image/v2/D4D03AQG0iYqOq2_bQA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714046660999?e=1738195200&v=beta&t=x-s2lO-K40sT8UJD-L4bQO-5O_U-5O-5O-5O-5O",
                        bio: "Empowering the next generation of African tech founders through venture capital.",
                        link: "https://ingressivecapital.com"
                    },
                    {
                        name: "Kelvin Umechukwu",
                        role: "Co-Founder",
                        org: "Bumpa",
                        image: "https://media.licdn.com/dms/image/v2/D4D03AQG0iYqOq2_bQA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714046660999?e=1738195200&v=beta&t=x-s2lO-K40sT8UJD-L4bQO-5O_U-5O-5O-5O-5O",
                        bio: "Revolutionizing commerce for African merchants with modern tools.",
                        link: "https://getbumpa.com"
                    },
                    {
                        name: "TBA Panelist",
                        role: "Industry Expert",
                        org: "Tech Co",
                        image: "", 
                        bio: "An industry veteran with deep expertise in scaling products.",
                        link: "#"
                    },
                     {
                        name: "TBA Moderator",
                        role: "Moderator",
                        org: "Builders Summit",
                        image: "",
                        bio: "Guiding the conversation to uncover deep insights.",
                        link: "#"
                    }
                ].map((speaker, index) => (
                    <div key={index} className="group relative bg-white rounded-3xl border border-gray-200 p-6 hover:border-black transition-all duration-300 hover:shadow-xl flex flex-col h-full">
                        <div className="flex items-start justify-between mb-6">
                            <div className="w-20 h-20 rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 group-hover:scale-105 transition-transform">
                                {speaker.image ? (
                                    <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                        <User size={32} className="text-gray-300" />
                                    </div>
                                )}
                            </div>
                            <a href={speaker.link} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-black hover:text-white transition-colors group-hover:-rotate-45">
                                <ArrowRight size={18} />
                            </a>
                        </div>
                        
                        <div className="mb-4">
                            <h4 className="text-xl font-bold text-black mb-1">{speaker.name}</h4>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{speaker.role} @ {speaker.org}</p>
                        </div>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-6 grow">
                            {speaker.bio}
                        </p>

                        <div className="flex gap-3 pt-6 border-t border-gray-100">
                             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-colors cursor-pointer">
                                <Linkedin size={14} />
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">
                                <Twitter size={14} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Speakers;
