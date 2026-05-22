import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ArrowLeft, CheckCircle, Clock, Award, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Workshop = () => {
  const [notification, setNotification] = useState<string | null>(null);

  // Dynamically check if the workshop is upcoming (May 29, 2026 at 9:00 PM)
  const isUpcoming = new Date() < new Date(2026, 4, 29, 21, 0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    role: "",
    workshopQuestion: "",
    registrationType: "workshop"
  });

  const [regStatus, setRegStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [regError, setRegError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (regStatus === "error") {
      setRegStatus("idle");
      setRegError("");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegStatus("submitting");
    setRegError("");

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setRegStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        organization: "",
        role: "",
        workshopQuestion: "",
        registrationType: "workshop"
      });
    } catch (error: any) {
      console.error("Error submitting workshop registration:", error);
      setRegStatus("error");
      setRegError(error.message || "Something went wrong. Please try again.");
    }
  };

  const workshop = {
    title: "Must You Become an Entrepreneur to Build Something Meaningful?",
    time: "Saturday, May 29, 2026 | 8:00 PM - 9:00 PM",
    duration: "60 Minutes",
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

      <main className="grow pb-24 bg-gray-50/30">

        {/* Editorial Hero Banner */}
        <div className="bg-white border-b border-gray-100 pt-36 pb-16 mb-16">
          <div className="max-w-6xl mx-auto px-6">

            {/* Back button */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-black mb-10 transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Home
            </Link>

            {/* Header info */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-wider">
                  {workshop.track}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-wider bg-white">
                  <Clock size={10} className="text-gray-400" />
                  {workshop.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-wider bg-white">
                  <Award size={10} className="text-gray-400" />
                  {workshop.level}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-black leading-tight tracking-tight uppercase max-w-4xl">
                {workshop.title}
              </h1>

              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider pt-2">
                <Calendar size={14} className="text-gray-400" />
                <span>{workshop.time}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto px-6">

          <article className="space-y-16">

            {/* Premise / Description */}
            <section className="border-l-2 border-black pl-6 py-1 max-w-4xl">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                {workshop.description}
              </p>
            </section>

            {/* Syllabus Breakdown Section */}
            <section className="space-y-8 pt-12 border-t border-gray-100">
              <div className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Syllabus Breakdown
                </h2>
                <h3 className="text-2xl font-black text-black uppercase tracking-tight">
                  What You'll Learn
                </h3>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm shadow-black/[0.01]">
                <ol className="divide-y divide-gray-100">
                  {workshop.syllabus.map((item, idx) => (
                    <li key={idx} className="py-6 first:pt-0 last:pb-0 flex gap-6 hover:bg-gray-50/20 transition-colors rounded-xl px-2">
                      <span className="text-lg font-bold text-gray-400 font-mono w-8 shrink-0 pt-0.5">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="space-y-2">
                        <h4 className="text-md font-bold text-black uppercase tracking-wide">
                          {item.topic}
                        </h4>
                        <p className="text-gray-500 text-sm leading-relaxed font-medium">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Facilitator Section */}
            <section className="space-y-6 pt-12 border-t border-gray-100">
              <div className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Facilitator
                </h2>
                <h3 className="text-2xl font-black text-black uppercase tracking-tight">
                  Meet the Masterclass Leader
                </h3>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start shadow-sm shadow-black/[0.01]">
                {/* Modern Dark Avatar */}
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center font-black text-xl shrink-0 uppercase tracking-widest shadow-md">
                  MD
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-black uppercase tracking-wide">
                      {workshop.facilitator.name}
                    </h4>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {workshop.facilitator.role}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">
                    {workshop.facilitator.bio}
                  </p>
                </div>
              </div>
            </section>

            {/* Registration Form / Session Materials Section */}
            <section className="pt-12 border-t border-gray-100">
              {isUpcoming ? (
                <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                  {/* Ticket Cutout Effect */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 bg-gray-50/30 rounded-full border-r border-gray-200"></div>
                  <div className="absolute top-1/2 -right-3 w-6 h-6 bg-gray-50/30 rounded-full border-l border-gray-200"></div>

                  <div className="space-y-2 mb-8">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      Register for Masterclass
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-black text-dark uppercase leading-snug tracking-tighter">
                      Secure Your Seat
                    </h3>
                    <p className="text-gray-600 font-medium pt-1">
                      Reserve your spot for this live interactive masterclass with Mercy Duru. Space is limited.
                    </p>
                  </div>

                  {regStatus === "success" ? (
                    <div className="text-center py-20">
                      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle size={48} className="text-green-600" />
                      </div>
                      <h4 className="text-4xl font-black text-dark mb-4">You're registered!</h4>
                      <p className="text-xl text-gray-600 mb-4">Your spot has been reserved. Check your email for a confirmation and details.</p>
                      <p className="text-sm text-gray-500 mb-8 font-semibold uppercase tracking-wider">
                        Join us live on Saturday, May 29 at 8:00 PM
                      </p>
                      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <a
                          href="https://meet.google.com/jyb-apjt-dyu"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg hover:scale-105 cursor-pointer text-center uppercase text-sm tracking-wider"
                        >
                          Google Meet Link
                        </a>
                        <a
                          href="https://chat.whatsapp.com/IFxxRgwP0cQCWq00VjAt1M"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg hover:scale-105 cursor-pointer text-center uppercase text-sm tracking-wider"
                        >
                          Join WhatsApp Group
                        </a>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleRegisterSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">First Name *</label>
                          <input
                            type="text"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg"
                            placeholder="Jane"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg"
                            placeholder="jane@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Organization / School *</label>
                          <input
                            type="text"
                            name="organization"
                            required
                            value={formData.organization}
                            onChange={handleInputChange}
                            className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg"
                            placeholder="Company or Institution"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Job Title / Role *</label>
                          <input
                            type="text"
                            name="role"
                            required
                            value={formData.role}
                            onChange={handleInputChange}
                            className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg"
                            placeholder="e.g. Software Engineer"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Your Question for Mercy Duru (Optional)</label>
                        <textarea
                          name="workshopQuestion"
                          rows={4}
                          value={formData.workshopQuestion}
                          onChange={handleInputChange}
                          className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg resize-none"
                          placeholder="Is there a specific career, leadership, or entrepreneurship question you would like Mercy Duru to answer?"
                        />
                      </div>

                      {regStatus === "error" && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                          <p className="font-medium">{regError}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={regStatus === "submitting"}
                        className="w-full bg-primary text-white font-bold py-5 rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl text-lg"
                      >
                        {regStatus === "submitting" ? "Processing..." : "Complete Registration"}
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                  <div className="space-y-2 mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      Session Archive
                    </h2>
                    <h3 className="text-3xl font-black text-dark uppercase leading-snug tracking-tighter">
                      Resources & Recording
                    </h3>
                    <p className="text-gray-600 font-medium pt-1">
                      This summit has concluded. You can access the recording and slide presentation decks below.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      onClick={() => triggerNotification("The workshop recording video will be available soon.")}
                      className="px-8 py-4 bg-primary text-white hover:opacity-90 transition-all font-bold text-sm uppercase tracking-wider rounded-xl cursor-pointer shadow-xl hover:scale-[1.02]"
                    >
                      Watch Recording
                    </button>
                    <button
                      onClick={() => triggerNotification("The workbook slide will be available soon.")}
                      className="px-8 py-4 border-2 border-dark text-dark hover:bg-gray-50 transition-colors font-bold text-sm uppercase tracking-wider rounded-xl cursor-pointer"
                    >
                      Download Slides
                    </button>
                  </div>
                </div>
              )}
            </section>


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
