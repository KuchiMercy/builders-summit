import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Who should join the Visionary Builders’ Community?",
      a: "The community is designed for entrepreneurs, innovators, professionals, leaders, and students who want to build sustainable systems, expand their network, and gain visionary insights to scale their impact.",
    },
    {
      q: "Can I still access the 2026 Summit content?",
      a: "Yes! By joining the community, you'll gain access to event highlights, session summaries, and key resources shared during the 2026 Summit. We will communicate any future hybrid or in-person formats through our community channels.",
    },
    {
      q: "How can I join the Visionary Builders’ community?",
      a: "Simply fill out the form in the 'Join the Community' section. After registration, you'll receive an invitation to join our platform (WhatsApp or Telegram) where you can network, access resources, and engage with other builders.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] bg-size-[16px_16px] opacity-20"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
        
        <h2 className="text-5xl md:text-7xl font-black text-light mb-6 tracking-tighter">
            GOT QUESTIONS?
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
