import React, { useState } from "react";
import { Send, Mail, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      setStatus("success");
      // Reset form
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to send message. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
       {/* Decorative Background */}
       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1D1D1D_1px,transparent_1px)] bg-size-[16px_16px] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
           
            <h2 className="text-5xl md:text-7xl font-black text-dark mb-8 tracking-tighter">
              GET IN <span className="text-transparent bg-clip-text bg-linear-to-r from-dark/60 to-dark">TOUCH</span>
            </h2>
            <p className="text-xl text-dark/70 mb-12 font-medium leading-relaxed">
              Have questions about the summit, partnership opportunities, or just want to say hello? We'd love to hear from you.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-dark mb-1">Email Us</h4>
                  <a href="mailto:visionarybuilderssummit@gmail.com" className="text-dark/70 hover:text-primary transition-colors text-lg">
                    visionarybuilderssummit@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-dark mb-1">Location</h4>
                  <p className="text-dark/70 text-lg">
                    Virtual Event (Global)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-dark/5 shadow-2xl relative">
             {/* Abstract Shape */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10"></div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg resize-none"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-primary text-white font-bold py-5 rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl text-lg"
              >
                {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
