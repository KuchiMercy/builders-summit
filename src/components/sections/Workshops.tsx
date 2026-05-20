import { useState } from "react";
import { Clock, BookOpen, Play, FileText, Sparkles, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Workshops = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamically check if the workshop is upcoming (May 29, 2026 at 12:30 PM)
  const isUpcoming = new Date() < new Date(2026, 4, 29, 12, 30);

  const workshop = {
    id: "ws-1",
    time: "11:15 AM - 12:30 PM",
    track: "Career & Purpose",
    title: "Must You Become an Entrepreneur to Build Something Meaningful?",
    description: "This session challenges the societal pressure surrounding entrepreneurship and explores how professionals, leaders, creators, and entrepreneurs all contribute meaningfully to society in different ways.",
    facilitator: {
      name: "Mercy Duru",
      role: "Human Capital Developer & Strategist",
      avatar: "/images/mercy_duru.jpg",
    },
    level: "All Levels",
    duration: "75 Mins",
    takeaways: [
      "Why entrepreneurship is glorified today",
      "The hidden realities of entrepreneurship",
      "The power of professionals and institutional builders",
      "Entrepreneurship vs employment: the wrong debate",
      "Discovering where you thrive best"
    ]
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <section id="workshops" className="py-24 bg-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[20px_20px] opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary mb-4 font-bold text-xs uppercase tracking-wider">
              <Sparkles size={14} className="animate-pulse" />
              Featured Masterclass
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-none">
              interactive <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-orange-600">
                WORKSHOP
              </span>
            </h2>
          </div>
          <p className="text-xl text-dark/70 max-w-md font-medium border-l-4 border-primary pl-6">
            An intensive, high-impact session designed to challenge current career dogmas and help you construct a systems-driven path to lifelong impact.
          </p>
        </div>

        {/* Full-width Premium Workshop Card */}
        <div className="group bg-gray-50 rounded-[3rem] border-2 border-gray-100 hover:border-primary/20 hover:bg-white transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl">
          <div className="p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12">
            
            {/* Left Column: Details & Speaker */}
            <div className="lg:w-1/2 flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-dark text-white text-xs font-black uppercase tracking-wider">
                    <Clock size={12} />
                    {workshop.time} ({workshop.duration})
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider">
                    <BookOpen size={12} />
                    {workshop.track}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gray-200 text-dark/70 text-xs font-black uppercase tracking-wider">
                    <Award size={12} />
                    {workshop.level}
                  </span>
                </div>

                <h3 className="text-4xl md:text-5xl font-black text-dark tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
                  {workshop.title}
                </h3>

                <p className="text-lg text-dark/70 font-medium leading-relaxed">
                  {workshop.description}
                </p>
              </div>

              {/* Facilitator Card */}
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm w-fit">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                  {workshop.facilitator.avatar ? (
                    <img
                      src={workshop.facilitator.avatar}
                      alt={workshop.facilitator.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${workshop.facilitator.name}`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {workshop.facilitator.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs text-dark/40 font-bold uppercase tracking-wider">Facilitator</p>
                  <h4 className="text-lg font-black text-dark leading-tight">{workshop.facilitator.name}</h4>
                  <p className="text-xs text-dark/60 font-semibold">{workshop.facilitator.role}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Key Takeaways & Action Resources */}
            <div className="lg:w-1/2 flex flex-col justify-between bg-white/60 backdrop-blur-sm p-8 md:p-10 rounded-[2.5rem] border border-gray-200/50 shadow-inner gap-10">
              {/* Takeaways */}
              <div>
                <h4 className="text-xl font-black text-dark uppercase tracking-wider mb-6 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  Key Takeaways
                </h4>
                <ul className="space-y-4">
                  {workshop.takeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs mt-0.5 shadow-sm border border-primary/20">
                        {idx + 1}
                      </span>
                      <span className="text-dark/90 font-medium text-lg leading-relaxed">
                        {takeaway}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Status Action / Materials */}
              <div className="pt-8 border-t border-gray-100 flex flex-col gap-6">
                {isUpcoming ? (
                  <>
                    <div>
                      <h5 className="text-sm font-black text-dark uppercase tracking-wider mb-2">
                        Live Interactive Masterclass
                      </h5>
                      <p className="text-xs text-dark/50 font-medium leading-relaxed">
                        Reserve your free ticket now. Join Mercy Duru live to discover if you must become an entrepreneur to build something meaningful, or how to thrive as an intrapreneur and leader.
                      </p>
                    </div>
                    <div>
                      <Link
                        to="/workshop"
                        className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary text-white hover:bg-dark transition-all duration-300 rounded-2xl font-bold text-sm tracking-wide transform active:scale-95 shadow-md shadow-primary/20 text-center uppercase cursor-pointer"
                      >
                        Register for Masterclass
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h5 className="text-sm font-black text-dark uppercase tracking-wider mb-2">
                        Session Resources
                      </h5>
                      <p className="text-xs text-dark/50 font-medium leading-relaxed">
                        The 2026 Summit has concluded. As an attendee or community member, you can access the archived recordings and session slide decks below.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => triggerToast("The workshop recording video is currently being processed and will be available soon!")}
                        className="flex items-center justify-center gap-2 px-6 py-4 bg-dark text-white hover:bg-primary transition-all duration-300 rounded-2xl font-bold text-sm tracking-wide transform active:scale-95 shadow-md shadow-dark/10 cursor-pointer"
                      >
                        <Play size={16} />
                        Watch Recording
                      </button>
                      <button
                        onClick={() => triggerToast("The slide deck is currently loading. Please check back in a few moments!")}
                        className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-dark hover:bg-gray-200 transition-all duration-300 rounded-2xl font-bold text-sm tracking-wide transform active:scale-95 border border-gray-200 cursor-pointer"
                      >
                        <FileText size={16} />
                        Download Slides
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-dark text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 animate-in max-w-md">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
            <Sparkles size={16} />
          </div>
          <div>
            <p className="text-sm font-bold tracking-wide">Workshop Archive</p>
            <p className="text-xs text-gray-400 mt-0.5">{toastMessage}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Workshops;
