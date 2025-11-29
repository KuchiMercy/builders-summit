import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Who should attend the Visionary Builders’ Summit?",
      a: "The summit is designed for entrepreneurs, innovators, professionals, leaders, and students who want to build sustainable systems, expand their network, and gain visionary insights to scale their impact.",
    },
    {
      q: "Is the summit in-person, virtual, or both?",
      a: "Currently, the Visionary Builders’ Summit is a fully virtual event. During registration, you can secure your virtual attendance and will receive a secure access link before the summit. In the future, we plan to expand to hybrid or in-person formats.",
    },
    {
      q: "How can I become a partner or sponsor?",
      a: "You can partner with us by visiting the “Partner With Us” page. There, you’ll find information about partnership benefits, categories, and a form to submit your interest. Our team will reach out to discuss the best way to collaborate.",
    },
    {
      q: "Will there be networking opportunities?",
      a: "Yes! The summit is designed for meaningful connections. Attendees will have access to networking sessions, panel discussions, breakout sessions, and community groups to connect with like-minded builders and industry leaders.",
    },
    {
      q: "How can I join the Visionary Builders’ community?",
      a: "After registering, you’ll receive an invitation to join our community group via your preferred platform (WhatsApp and Telegram). This group allows you to continue networking, access resources, and engage with other attendees before, during, and after the summit.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] bg-size-[16px_16px] opacity-20"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white mb-6">
            <HelpCircle size={16} className="text-yellow-400" />
            <span className="text-xs font-bold uppercase tracking-widest">FAQ</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            GOT <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500">QUESTIONS?</span>
          </h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-4xl overflow-hidden transition-all duration-300 ${
                openIndex === index 
                  ? "bg-white text-black border-white" 
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-8 text-left"
              >
                <span className={`text-xl font-bold pr-8 ${openIndex === index ? "text-black" : "text-white"}`}>
                  {faq.q}
                </span>
                {openIndex === index ? (
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                     <Minus size={20} />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
                     <Plus size={20} />
                  </div>
                )}
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-8 pt-0 text-lg leading-relaxed font-medium text-gray-600">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
