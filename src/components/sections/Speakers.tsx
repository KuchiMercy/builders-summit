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
          <h2 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter">
            KEYNOTE SPEAKER
          </h2>
          <p className="text-xl text-dark/80 max-w-xl mx-auto font-medium">
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
                <div className="aspect-4/5 rounded-4xl bg-dark overflow-hidden relative shadow-2xl border border-dark/20">
                   {/* Placeholder for Keynote Image */}
                   <div className="absolute inset-0 flex items-center justify-center bg-dark">
                      <User size={120} className="text-dark/40" />
                   </div>
                   <div className="absolute bottom-6 left-6">
                      <span className="px-4 py-2 bg-white text-primary text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">Keynote Speaker</span>
                   </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">To Be Announced</h3>
                <p className="text-2xl text-dark/60 mb-8 font-medium">Visionary Leader & Industry Pioneer</p>
                <p className="text-lg text-dark mb-10 leading-relaxed max-w-lg mx-auto md:mx-0">
                  Stay tuned for the reveal of our headline speaker. This individual represents the pinnacle of visionary building and sustainable innovation.
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                    <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-dark transition-all cursor-pointer">
                        <Linkedin size={24} />
                    </div>
                    <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-dark transition-all cursor-pointer">
                        <Twitter size={24} />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Convener Section */}
        <div className="mb-24 relative">
          <div className="group relative bg-primary/5 rounded-[3rem] p-8 md:p-12 overflow-hidden border border-dark/5">
             
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 relative z-10">
              <div className="w-full md:w-1/2">
                <div className="aspect-4/5 rounded-4xl bg-white overflow-hidden relative shadow-xl border border-dark/5">
                   {/* Placeholder for Convener Image */}
                   <img src="/images/mercy_duru.jpg" alt="mercy_duru" />
                   <div className="absolute bottom-6 right-6">
                      <span className="px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">The Convener</span>
                   </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-dark">Mercy Duru</h3>
                <p className="text-xl text-dark/60 mb-8 font-medium">Human Capital Developer & Strategist</p>
                <p className="text-lg text-dark/90 mb-10 leading-relaxed max-w-lg mx-auto md:mx-0">
                  Mercy Duru is a Human Capital Developer with a unique voice that blends logic and timeless strategy. With a passion for helping individuals and organizations unlock their full potential, she creates content, programs, and training that focus on soft skills, purposeful living, career development, and leadership.
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                    <div className="w-14 h-14 rounded-full bg-white border border-dark/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm">
                        <Linkedin size={24} />
                    </div>
                    <div className="w-14 h-14 rounded-full bg-white border border-dark/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm">
                        <Twitter size={24} />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panelists Grid */}
        <div className="mb-16">
            <h3 className="text-4xl md:text-5xl font-black text-dark mb-16 text-center tracking-tighter">
                FEATURED PANELISTS
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[
                    {
                        name: "Ikeoba Ihechi Pius",
                        role: "CEO and Co-Founder",
                        org: "I-Swipe Technologies Ltd.",
                        image: "/images/pius_ikeoba.jpeg",
                        bio: "Ikeoba Ihechi Pius is a Nigerian tech entrepreneur, educator, and product innovator. Renowned for his visionary leadership and passion for youth development, Pius continues to design innovative solutions that bridge skill gaps, accelerate digital adoption, and inspire the next generation of African tech talent.",
                        link: "#"
                    },
                    {
                        name: "Nafiu Ishaq",
                        role: "CEO and Founder",
                        org: "Saurinku Delivery Service",
                        image: "/images/nafiu.jpeg",
                        bio: "Nafiu Ishaq is a youth development advocate with over a decade of experience driving innovation across Africa. He is also the Founder & CEO of SAURINKU Delivery Service, a logistics startup transforming last-mile delivery through technology.",
                        link: "#"
                    },
                    {
                        name: "Chinecherem Nduka",
                        role: "Founder",
                        org: "Nuxalle",
                        image: "/images/chinecherem_nduka.PNG",
                        bio: "Chinecherem Nduka is the founder of Nuxalle, an entrepreneur, digital transformation strategist, media and marketing executive passionate about leveraging technology to drive business growth.",
                        link: "#"
                    }
                ].map((speaker, index) => (
                    <div key={index} className="group relative bg-linear-to-br from-white via-white to-primary/5 rounded-4xl border-2 border-dark/10 p-8 hover:border-primary hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden">
                        {/* Decorative gradient overlay */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/20 to-transparent rounded-bl-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Profile Image - Larger and more prominent */}
                        <div className="relative mb-8 -mt-4">
                            <div className="w-full aspect-square rounded-3xl bg-linear-to-br from-primary/10 to-primary/5 overflow-hidden border-2 border-dark/10 group-hover:border-primary/30 transition-all duration-500 group-hover:scale-[1.02] shadow-lg group-hover:shadow-2xl">
                                {speaker.image ? (
                                    <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-primary/5">
                                        <User size={64} className="text-primary/20" />
                                    </div>
                                )}
                            </div>
                            {/* Featured badge */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                                <span className="px-5 py-2 bg-linear-to-r from-primary to-primary/80 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg border-2 border-white">
                                    Featured
                                </span>
                            </div>
                        </div>
                        
                        {/* Content */}
                        <div className="mb-6 mt-4 relative z-10">
                            <h4 className="text-2xl font-black text-dark mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">{speaker.name}</h4>
                            <p className="text-sm font-bold text-primary uppercase tracking-wider mb-1">{speaker.role}</p>
                            <p className="text-xs font-semibold text-dark/60 uppercase tracking-wider">@ {speaker.org}</p>
                        </div>
                        
                        <p className="text-dark/80 text-sm leading-relaxed mb-8 grow relative z-10">
                            {speaker.bio}
                        </p>

                        {/* Footer with social links and arrow */}
                        <div className="flex items-center justify-between pt-6 border-t-2 border-dark/10 group-hover:border-primary/30 transition-colors relative z-10">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer hover:scale-110 shadow-sm">
                                    <Linkedin size={16} />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer hover:scale-110 shadow-sm">
                                    <Twitter size={16} />
                                </div>
                            </div>
                            <a href={speaker.link} className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-primary/80 text-white flex items-center justify-center hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-45">
                                <ArrowRight size={20} className="font-bold" />
                            </a>
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
