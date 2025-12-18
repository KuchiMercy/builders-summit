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
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    
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
    } catch (error: any) {
      console.error("Error submitting registration:", error);
      setStatus("error");
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="register" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-30"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
         
        <h2 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter">
            REGISTER NOW
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
              <h3 className="text-4xl font-black text-dark mb-4">You're In!</h3>
              <p className="text-xl text-gray-600">Your virtual pass has been confirmed. Check your email for details.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">LinkedIn Profile / Website</label>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg"
                  placeholder="linkedin.com/in/janedoe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">City & Country *</label>
                  <input
                    type="text"
                    name="cityCountry"
                    required
                    value={formData.cityCountry}
                    onChange={handleChange}
                    className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg"
                    placeholder="New York, USA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Organization *</label>
                  <input
                    type="text"
                    name="organization"
                    required
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg"
                    placeholder="Company Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Job Title / Role *</label>
                  <input
                    type="text"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg"
                    placeholder="Product Manager"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Industry / Sector *</label>
                  <select
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg appearance-none"
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
                  <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Years of Experience</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg appearance-none"
                  >
                    <option value="">Select Experience</option>
                    <option value="0-2">0–2 years</option>
                    <option value="3-5">3–5 years</option>
                    <option value="6-10">6–10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">How did you hear about us?</label>
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg appearance-none"
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
                <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">What are your key goals for attending?</label>
                <textarea
                  name="goals"
                  rows={3}
                  value={formData.goals}
                  onChange={handleChange}
                  className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg resize-none"
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
                  className="w-5 h-5 rounded border-gray-300 text-dark focus:ring-dark bg-white"
                />
                <label htmlFor="community" className="text-gray-700 text-sm font-medium cursor-pointer">
                  Would you like to join the Visionary Builders’ Community group?
                </label>
              </div>

              {status === "error" && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                   <p className="font-medium">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-primary text-white font-bold py-5 rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl text-lg"
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
