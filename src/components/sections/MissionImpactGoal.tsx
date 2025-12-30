import { Target, Globe, Compass } from "lucide-react";

const MissionImpactGoal = () => {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-2 block">The Foundation</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            OUR CORE <span className="text-white border-b-4 border-white">PILLARS</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The driving forces behind every session, connection, and outcome at the summit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="group relative bg-white/5 border border-white/10 rounded-4xl p-8 hover:bg-white hover:text-black transition-all duration-500">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-5 transition-opacity">
              <Compass size={120} />
            </div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                <Compass size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4">Mission</h3>
              <p className="text-gray-400 group-hover:text-gray-600 leading-relaxed text-lg mb-8 transition-colors">
                To equip a new generation of leaders to build with excellence, resilience, and lasting influence.
              </p>
            </div>
          </div>

          {/* Impact */}
          <div className="group relative bg-white/5 border border-white/10 rounded-4xl p-8 hover:bg-white hover:text-black transition-all duration-500">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-5 transition-opacity">
              <Globe size={120} />
            </div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                <Globe size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4">Impact</h3>
              <p className="text-gray-400 group-hover:text-gray-600 leading-relaxed text-lg mb-8 transition-colors">
                Creating a collaborative platform for networking, mentorship, and partnerships that transcend borders.
              </p>
            </div>
          </div>

          {/* Goal */}
          <div className="group relative bg-white/5 border border-white/10 rounded-4xl p-8 hover:bg-white hover:text-black transition-all duration-500">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-5 transition-opacity">
              <Target size={120} />
            </div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4">Goal</h3>
              <p className="text-gray-400 group-hover:text-gray-600 leading-relaxed text-lg mb-8 transition-colors">
                To raise visionaries committed to building timeless structures and systems for sustainable growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionImpactGoal;
