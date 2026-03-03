import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { CheckCircle2, Send, ArrowRight, BarChart3, Users, Award, Handshake } from "lucide-react";
import { Link } from "react-router-dom";

const PartnerWithUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    orgName: "",
    email: "",
    phone: "",
    partnershipType: "",
    reason: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      setStatus("success");
      // Reset form
      setFormData({
        fullName: "",
        orgName: "",
        email: "",
        phone: "",
        partnershipType: "",
        reason: "",
      });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Error submitting partnership form:", error);
      alert("Failed to submit. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen bg-white text-dark selection:bg-primary selection:text-white">
      <Navbar theme="dark" />

      <main>
        {/* Hero Section - Sponsorship Deck Cover Style */}
        <section className="relative py-32 md:py-48 text-center overflow-hidden bg-dark text-white">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/leadership-labs.jpg"
              alt="Partnership Meeting"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-linear-to-b from-dark/80 via-dark/50 to-dark"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4">
            <span className="inline-block py-1 px-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-sm font-bold tracking-widest uppercase mb-6">
              Official Partnership Proposal
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-none">
              PARTNER <br /> WITH THE FUTURE
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed mb-12">
              Join the Visionary Builders Summit as a strategic partner. Position your brand at the intersection of innovation, leadership, and sustainable growth.
            </p>
            <button
              onClick={() => document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-dark rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
            >
              Become a Partner <ArrowRight size={20} />
            </button>
          </div>
        </section>

        {/* Value Proposition Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-dark mb-6">Why Partner With Us?</h2>
              <p className="text-xl text-dark/80 max-w-2xl mx-auto">
                Unlock exclusive opportunities to engage, influence, and grow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Users size={32} />,
                  title: "High-Value Visibility",
                  desc: "Direct access to a curated audience of emerging leaders and industry professionals."
                },
                {
                  icon: <Handshake size={32} />,
                  title: "Targeted Engagement",
                  desc: "Connect meaningfully with individuals actively investing in their growth."
                },
                {
                  icon: <Award size={32} />,
                  title: "Brand Authority",
                  desc: "Align your brand with excellence, innovation, and sustainable development."
                },
                {
                  icon: <BarChart3 size={32} />,
                  title: "Lasting Impact",
                  desc: "Go beyond the event. Build relationships that drive long-term business results."
                }
              ].map((item, index) => (
                <div key={index} className="p-8 rounded-3xl bg-primary/5 border border-dark/5 hover:border-primary hover:bg-white hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-dark/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-dark">{item.title}</h3>
                  <p className="text-dark/80 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Should Partner - Checklist Style */}
        <section className="py-24 bg-dark text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-black opacity-30 skew-x-12 transform origin-top-right"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/3">
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                  WHO WE ARE <br />
                  <span className="text-white/40">LOOKING FOR</span>
                </h2>
                <p className="text-xl text-white/60 mb-8">
                  We are seeking partners who share our vision for a sustainable future. If you are ready to make an impact, you belong here.
                </p>
                <div className="h-1 w-20 bg-white"></div>
              </div>

              <div className="lg:w-2/3">
                <div className="grid grid-cols-1 gap-6">
                  {[
                    "Corporate Organizations & Companies seeking visibility and social impact.",
                    "Educational Institutions committed to talent development.",
                    "Startups & Tech Companies connecting with early adopters.",
                    "NGOs & Foundations driving community development.",
                    "Media Houses interested in strategic storytelling.",
                    "Professional Communities desiring ecosystem impact.",
                    "Consulting Firms focused on organizational growth."
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                        <CheckCircle2 size={18} />
                      </div>
                      <p className="text-lg font-medium text-white/90">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Form */}
        <section id="partner-form" className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-bold tracking-widest text-dark/40 uppercase mb-2 block">Take the Next Step</span>
              <h2 className="text-4xl md:text-5xl font-black text-dark mb-6">Partnership Interest</h2>
              <p className="text-dark/70">
                Fill out the form below to receive our full partnership deck and start the conversation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] border border-dark/10 shadow-2xl relative overflow-hidden">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark uppercase tracking-wider">Organization</label>
                  <input
                    type="text"
                    required
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg"
                    placeholder="Company Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark uppercase tracking-wider">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-dark uppercase tracking-wider">Partnership Type</label>
                <select
                  required
                  value={formData.partnershipType}
                  onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                  className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg appearance-none"
                >
                  <option value="">Select Partnership Category</option>
                  <option value="Sponsorship">Sponsorship</option>
                  <option value="Media Partnership">Media Partnership</option>
                  <option value="Community Partnership">Community Partnership</option>
                  <option value="Learning/Training Partnership">Learning/Training Partnership</option>
                  <option value="Corporate/Brand Partnership">Corporate/Brand Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-dark uppercase tracking-wider">Partnership Goals</label>
                <textarea
                  rows={4}
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg resize-none"
                  placeholder="Tell us why you want to partner with us..."
                ></textarea>
              </div>



              <div className="text-center text-dark/50 text-sm">
                By submitting interest, you agree to our{" "}
                <Link to="/privacy-policy" target="_blank" className="text-primary font-bold hover:underline">
                  Privacy Policy
                </Link>.
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-primary text-white font-bold py-5 rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 text-lg shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Submitting..." : status === "success" ? "Submitted Successfully!" : "Submit Interest"}
                <Send size={20} />
              </button>
            </form>
          </div>
        </section>

        {/* Contact Strip */}
        <section className="py-16 bg-primary/5 border-t border-dark/5 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-dark mb-4">Direct Inquiries</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <a href="mailto:contact@visionarybuilderssummit.com" className="text-lg font-medium text-dark/70 hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1">
                contact@visionarybuilderssummit.com
              </a>
              <span className="hidden md:inline text-dark/20">|</span>
              <p className="text-lg font-medium text-dark/70">
                +234 903 755 2527
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PartnerWithUs;
