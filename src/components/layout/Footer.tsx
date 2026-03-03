import { Twitter, Instagram, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white border-t border-white/10 py-20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] bg-size-[16px_16px] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-md">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <img src="/images/vbs-light.png" alt="VB Logo" width={100} height={100} />
            </Link>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Empowering today and tomorrow’s innovators to build sustainable systems. Join the movement.
            </p>
            <div className="flex gap-4">
              <a href="https://x.com/vbuilderssummit?s=21" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/visionarybuilderssummit?igsh=MXY0YXdjbnRsZDFlaQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white/40 uppercase tracking-widest">Explore</h4>
              <ul className="space-y-4">
                {['About', 'Speakers', 'Sponsors'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-lg font-medium hover:text-primary flex items-center gap-1 group">
                      {item}
                      <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-sm font-medium">
          <p>&copy; {new Date().getFullYear()} Visionary Builders Summit. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <p>Designed for Visionaries.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
