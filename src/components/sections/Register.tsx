import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    cityCountry: "",
    organization: "",
    role: "",
    industry: "",
    experience: "",
    source: "",
    goals: "",
    community: false,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Registration failed');

      setStatus("success");
      // Reset form after success
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        linkedin: "",
        cityCountry: "",
        organization: "",
        role: "",
        industry: "",
        experience: "",
        source: "",
        goals: "",
        community: false,
      });
    } catch (error) {
      console.error("Error submitting registration:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="register" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-30"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
         
          <h2 className="text-5xl md:text-7xl font-black text-black mb-6 tracking-tighter">
            REGISTER <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-500 to-black">NOW</span>
          </h2>
          <p className="text-xl text-gray-600 font-medium">Secure your spot at the Visionary Builders Summit.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
           {/* Ticket Cutout Effect (Visual only) */}
           <div className="absolute top-1/2 -left-3 w-6 h-6 bg-gray-50 rounded-full border-r border-gray-200"></div>
           <div className="absolute top-1/2 -right-3 w-6 h-6 bg-gray-50 rounded-full border-l border-gray-200"></div>

          {status === "success" ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                <CheckCircle size={48} className="text-green-600" />
              </div>
              <h3 className="text-4xl font-black text-black mb-4">You're In!</h3>
              <p className="text-xl text-gray-600">Your virtual pass has been confirmed. Check your email for details.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-black font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-black font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-black font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-black font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">LinkedIn Profile / Website</label>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-black font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  placeholder="linkedin.com/in/janedoe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">City & Country *</label>
                  <input
                    type="text"
                    name="cityCountry"
                    required
                    value={formData.cityCountry}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-black font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    placeholder="New York, USA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Organization *</label>
                  <input
                    type="text"
                    name="organization"
                    required
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-black font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    placeholder="Company Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Job Title / Role *</label>
                  <input
                    type="text"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-black font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    placeholder="Product Manager"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Industry / Sector *</label>
                  <select
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-black font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none"
                  >
                    <option value="">Select Industry</option>
                    <option value="Tech">Tech</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Startup">Startup</option>
                    <option value="NGO">NGO</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Years of Experience</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-black font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none"
                  >
                    <option value="">Select Experience</option>
                    <option value="0-2">0–2 years</option>
                    <option value="3-5">3–5 years</option>
                    <option value="6-10">6–10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">How did you hear about us?</label>
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-black font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none"
                  >
                    <option value="">Select Source</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Email">Email</option>
                    <option value="Friend/Colleague">Friend/Colleague</option>
                    <option value="Website">Website</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">What are your key goals for attending?</label>
                <textarea
                  name="goals"
                  rows={3}
                  value={formData.goals}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-black font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  placeholder="I want to learn about..."
                ></textarea>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <input
                  type="checkbox"
                  name="community"
                  id="community"
                  checked={formData.community}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black bg-white"
                />
                <label htmlFor="community" className="text-gray-700 text-sm font-medium cursor-pointer">
                  Would you like to join the Visionary Builders’ Community group?
                </label>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-black text-white font-bold py-5 rounded-xl hover:bg-gray-800 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl text-lg"
              >
                {status === "submitting" ? (
                  "Processing..."
                ) : (
                  <>
                    Complete Registration
                    <Send size={20} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Register;
