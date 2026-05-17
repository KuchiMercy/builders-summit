import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Workshop = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const workshop = {
    title: "Must You Become an Entrepreneur to Build Something Meaningful?",
    time: "Saturday, May 29, 2026 | 11:15 AM - 12:30 PM",
    duration: "75 Minutes",
    track: "Career, Leadership & Purpose",
    level: "All Levels",
    description: "This session challenges the modern societal pressure surrounding entrepreneurship. Together, we explore how professionals, leaders, creators, and entrepreneurs all contribute uniquely and meaningfully to society helping you identify exactly where you are wired to thrive.",
    facilitator: {
      name: "Mercy Duru",
      role: "Human Capital Developer & Strategist",
      bio: "Mercy Duru is a Human Capital Developer and Strategist with a unique voice that blends analytical logic with timeless career strategy. Committed to helping individuals and organizations unlock their potential, she creates transformative programs focused on high-impact soft skills, purposeful living, career acceleration, and leadership structures."
    },
    syllabus: [
      {
        topic: "Why Entrepreneurship is Glorified Today",
        detail: "Deconstruct the modern media narratives and cultural hype that elevate startup culture above all else, and examine the psychological impacts of this pressure."
      },
      {
        topic: "The Hidden Realities of Entrepreneurship",
        detail: "An honest, data-driven analysis of starting and scaling business ventures, evaluating the structural risks, capital demands, and mental health challenges."
      },
      {
        topic: "The Power of Professionals & Institutional Builders",
        detail: "Celebrating the high-impact career path of key operators and intrapreneurs who build systems, lead divisions, and drive major scale within established entities."
      },
      {
        topic: "Entrepreneurship vs. Employment: The Wrong Debate",
        detail: "Dismantling the false dichotomy of 'job vs. startup' and reframing the conversation around alignment, value creation, and structural impact."
      },
      {
        topic: "Discovering Where You Thrive Best",
        detail: "A hands-on self-assessment framework designed to analyze your risk tolerance, resource access, skill profile, and work style to identify your ideal builder persona."
      }
    ]
  };

  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-black selection:bg-gray-100">
      <Navbar theme="light" />

      <main className="grow pt-36 pb-24">
        <div className="max-w-4xl mx-auto px-6">

          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black mb-12 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          {/* Core Content */}
          <article className="space-y-16">

            {/* Header */}
            <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                <span>{workshop.track}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                <span>{workshop.duration}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                <span>{workshop.level}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black leading-tight tracking-tight uppercase">
                {workshop.title}
              </h1>

              <div className="pt-4 border-t border-gray-100 text-sm font-semibold text-gray-600">
                {workshop.time}
              </div>
            </header>

            {/* Premise */}
            <section className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light max-w-3xl">
              {workshop.description}
            </section>

            {/* Grid details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 border-t border-gray-100">

              {/* Syllabus (left 2 cols) */}
              <div className="md:col-span-2 space-y-8">
                <h2 className="text-xl font-bold uppercase tracking-widest text-black">
                  Syllabus Breakdown
                </h2>

                <ol className="divide-y divide-gray-100">
                  {workshop.syllabus.map((item, idx) => (
                    <li key={idx} className="py-6 first:pt-0 last:pb-0 flex gap-6">
                      <span className="text-lg font-bold text-gray-400 font-mono w-8 shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-black uppercase">
                          {item.topic}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed font-medium">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Facilitator & Actions (right 1 col) */}
              <div className="space-y-10">

                {/* Speaker Info */}
                <div className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Facilitator
                  </h2>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-black uppercase">
                      {workshop.facilitator.name}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {workshop.facilitator.role}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {workshop.facilitator.bio}
                  </p>
                </div>

                {/* Session Materials */}
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Session Archive
                  </h2>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    This summit has concluded. You can access the recording and slide presentation decks below.
                  </p>
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => triggerNotification("The workshop recording video will be available soon.")}
                      className="w-full py-4 bg-black text-white hover:bg-gray-900 transition-colors font-bold text-xs uppercase tracking-wider rounded-md cursor-pointer"
                    >
                      Watch Recording
                    </button>
                    <button
                      onClick={() => triggerNotification("The workbook slide will be available soon.")}
                      className="w-full py-4 border border-black text-black hover:bg-gray-50 transition-colors font-bold text-xs uppercase tracking-wider rounded-md cursor-pointer"
                    >
                      Download Slides
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </article>
        </div>
      </main>

      <Footer />

      {/* Understated notification alert */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-6 py-4 rounded-lg shadow-xl text-xs font-bold uppercase tracking-wider animate-fade-in border border-white/10">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Workshop;
