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
  // If scrolled, always dark text (on white bg).
  // If not scrolled, depends on theme.
  const textColorClass = isScrolled || theme === "light" ? "text-dark" : "text-white";
  const buttonClass = isScrolled || theme === "light"
    ? "bg-primary text-white hover:opacity-90"
    : "bg-white text-dark hover:bg-primary/10";
  // const logoBgClass = isScrolled || theme === "light" ? "bg-primary" : "bg-white";
  // const logoTextClass = isScrolled || theme === "light" ? "text-white" : "text-primary";
  const logoSrc = isScrolled || theme === "light" ? "/images/vbs-logo.png" : "/images/vbs-light.png";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logoSrc} alt="VB Logo" width={100} height={100} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {["About", "Speakers"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`${textColorClass} hover:text-primary transition-all text-sm font-bold uppercase tracking-widest cursor-pointer`}
              >
                {item}
              </button>
            ))}
            <Link
              to="/workshop"
              className={`${textColorClass} hover:text-primary transition-all text-sm font-bold uppercase tracking-widest`}
            >
              Workshop
            </Link>
            {["Register", "FAQ"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`${textColorClass} hover:text-primary transition-all text-sm font-bold uppercase tracking-widest cursor-pointer`}
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
        <div className="md:hidden bg-white border-t border-dark/5 absolute w-full shadow-lg">
          <div className="px-4 py-6 space-y-4 flex flex-col">
            {["About", "Speakers"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-dark hover:text-primary text-left py-2 font-bold uppercase tracking-widest text-sm cursor-pointer"
              >
                {item}
              </button>
            ))}
            <Link
              to="/workshop"
              onClick={() => setIsMenuOpen(false)}
              className="text-dark hover:text-primary text-left py-2 font-bold uppercase tracking-widest text-sm"
            >
              Workshop
            </Link>
            {["Register", "FAQ"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-dark hover:text-primary text-left py-2 font-bold uppercase tracking-widest text-sm cursor-pointer"
              >
                {item}
              </button>
            ))}
            <Link
              to="/partner-with-us"
              onClick={() => setIsMenuOpen(false)}
              className="bg-primary text-white px-6 py-3 rounded-full font-medium text-center hover:opacity-90"
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
