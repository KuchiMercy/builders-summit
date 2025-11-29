import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavbarProps {
  theme?: "light" | "dark"; // light = black text, dark = white text
}

const Navbar = ({ theme = "light" }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  // Determine text color based on theme and scroll state
  // If scrolled, always black text (on white bg).
  // If not scrolled, depends on theme.
  const textColorClass = isScrolled || theme === "light" ? "text-black" : "text-white";
  const buttonClass = isScrolled || theme === "light" 
    ? "bg-black text-white hover:bg-gray-800" 
    : "bg-white text-black hover:bg-gray-200";
  const logoBgClass = isScrolled || theme === "light" ? "bg-black" : "bg-white";
  const logoTextClass = isScrolled || theme === "light" ? "text-white" : "text-black";

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${logoBgClass}`}>
                <span className={`font-bold text-xl ${logoTextClass}`}>VB</span>
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors ${textColorClass}`}>
              Visionary Builders Summit
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {["About", "Speakers", "Schedule", "FAQ"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`${textColorClass} hover:opacity-70 transition-all text-sm font-medium`}
              >
                {item}
              </button>
            ))}
            <Link
              to="/partner-with-us"
              className={`${buttonClass} px-6 py-2.5 rounded-full font-medium transition-all transform hover:scale-105 active:scale-95`}
            >
              Partner with Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${textColorClass}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-black/5 absolute w-full shadow-lg">
          <div className="px-4 py-6 space-y-4 flex flex-col">
            {["About", "Speakers", "Schedule", "FAQ"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-600 hover:text-black text-left py-2"
              >
                {item}
              </button>
            ))}
            <Link
              to="/partner-with-us"
              onClick={() => setIsMenuOpen(false)}
              className="bg-black text-white px-6 py-3 rounded-full font-medium text-center hover:bg-gray-800"
            >
              Partner with Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
