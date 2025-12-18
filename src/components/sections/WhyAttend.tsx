import { Zap, Users, Lightbulb, TrendingUp } from "lucide-react";

const WhyAttend = () => {
  const reasons = [
    {
      icon: <Zap size={32} />,
      title: "Actionable Insights",
      desc: "Walk away with practical strategies you can implement immediately."
    },
    {
      icon: <Users size={32} />,
      title: "Elite Networking",
      desc: "Connect with fellow visionaries, potential partners, and industry leaders."
    },
    {
      icon: <Lightbulb size={32} />,
      title: "Fresh Perspectives",
      desc: "Challenge your thinking with new ideas and innovative approaches."
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Future Trends",
      desc: "Stay ahead of the curve by understanding where the industry is heading."
    }
  ];

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] bg-size-[16px_16px] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
         
            <h2 className="text-5xl md:text-7xl font-black text-light mb-6 tracking-tighter">
            WHY ATTEND?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            This isn't just another conference. It's an investment in your future as a builder.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="group p-8 rounded-4xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-5 transition-opacity">
                {reason.icon}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-500">
                {reason.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{reason.title}</h3>
              <p className="text-gray-400 group-hover:text-gray-600 font-medium leading-relaxed transition-colors">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAttend;
