import React, { useState } from "react";
import { Send, Mail, MapPin, Sparkles } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
    console.log(formData);
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
       {/* Decorative Background */}
       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white mb-6">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-xs font-bold uppercase tracking-widest">Contact Us</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-black mb-8 tracking-tighter">
              GET IN <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-500 to-black">TOUCH</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 font-medium leading-relaxed">
              Have questions about the summit, partnership opportunities, or just want to say hello? We'd love to hear from you.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-500">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-black mb-1">Email Us</h4>
                  <a href="mailto:visionarybuilderssummit@gmail.com" className="text-gray-600 hover:text-black transition-colors text-lg">
                    visionarybuilderssummit@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-black mb-1">Location</h4>
                  <p className="text-gray-600 text-lg">
                    Virtual Event (Global)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-2xl relative">
             {/* Abstract Shape */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-gray-50 rounded-full blur-3xl -z-10"></div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-black font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-black font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-black font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg text-lg"
              >
                Send Message
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
