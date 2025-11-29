const About = () => {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
          
            <h2 className="text-4xl md:text-6xl font-black text-black mb-8 leading-tight">
              More Than Just <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-black">A Summit.</span>
            </h2>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-light">
              <p className="border-l-4 border-black pl-6">
                <strong className="text-black font-bold block mb-2">The Vision</strong>
                For any real change to occur, communities, businesses, and nations require visionary builders—individuals who can turn ideas into tangible impact.
              </p>
              <p>
                The Visionary Builders’ Summit is designed as a transformative platform where thought leaders, innovators, creatives, and industry professionals converge to share insights, strategies, and practical tools for sustainable growth.
              </p>
              <p>
                It is the catalyst for equipping a new generation of leaders to build with excellence, resilience, and lasting influence. It doesn't just end at building; it transcends to sustainability. Building systems that last and can become a laid-down pattern for the coming generation.
              </p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative z-10">
               {/* Placeholder for About Image - Use a high-quality Unsplash image */}
               <img 
                 src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80" 
                 alt="Conference Crowd" 
                 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute inset-0 bg-black/10"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-full h-full border-2 border-gray-200 rounded-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
