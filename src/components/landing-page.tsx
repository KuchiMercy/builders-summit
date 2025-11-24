import React, { useState, useRef, useCallback } from "react";
import { Menu, X, AlertCircle, CheckCircle } from "lucide-react";

// Type definitions
interface Colors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  error: string;
  success: string;
}

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  designation: string;
  message: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface SpeakerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  topicTitle: string;
  topicDescription: string;
}

interface FormStatus {
  type: "success" | "error" | "";
  message: string;
}

interface ValidationErrors {
  [key: string]: string;
}

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

interface FormTextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
}

interface FormStatusProps {
  status: FormStatus;
}

interface SectionRefs {
  speakers: React.RefObject<HTMLDivElement | null>;
  whyAttend: React.RefObject<HTMLDivElement | null>;
  partners: React.RefObject<HTMLDivElement | null>;
  contact: React.RefObject<HTMLDivElement | null>;
  register: React.RefObject<HTMLDivElement | null>;
}

interface AttendReason {
  title: string;
  desc: string;
}

interface FAQItem {
  q: string;
  a: string;
}

interface Partner {
  name: string;
}

// Environment-based color configuration
const COLORS: Colors = {
  primary: "#000000",
  secondary: "#FFFFFF",
  accent: "#1a1a1a",
  text: "#000000",
  error: "#DC2626",
  success: "#059669",
};

// Form validation utilities
const VALIDATION = {
  email: (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  name: (name: string): boolean => name.trim().length >= 2,
  phone: (phone: string): boolean => /^[\d\s\-\+\(\)]{10,}$/.test(phone),
};

// Form validation helper
const validateEmail = (email: string): string => {
  if (!email) return "Email is required";
  if (!VALIDATION.email(email)) return "Please enter a valid email address";
  return "";
};

const validateName = (name: string): string => {
  if (!name || name.trim().length === 0) return "Name is required";
  if (!VALIDATION.name(name)) return "Name must be at least 2 characters";
  return "";
};

const validatePhone = (phone: string): string => {
  if (!phone) return "Phone number is required";
  if (!VALIDATION.phone(phone)) return "Please enter a valid phone number";
  return "";
};

const validateForm = (
  data: Record<string, string> | RegistrationFormData | ContactFormData | SpeakerFormData,
  fields: string[]
): ValidationErrors => {
  const errors: ValidationErrors = {};
  const dataRecord = data as Record<string, string>;

  fields.forEach((field) => {
    if (field.includes("email")) {
      errors[field] = validateEmail(dataRecord[field]);
    } else if (field.includes("Name")) {
      errors[field] = validateName(dataRecord[field]);
    } else if (field.includes("phone")) {
      errors[field] = validatePhone(dataRecord[field]);
    } else if (!dataRecord[field]) {
      errors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
    }
  });

  return errors;
};

// Form Input Component
const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = true,
  disabled = false,
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 transition ${
        error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-opacity-50"
      }`}
      style={!error ? ({ "--tw-ring-color": COLORS.primary } as React.CSSProperties) : {}}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

// Form Textarea Component
const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  rows = 4,
  required = true,
  disabled = false,
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 transition ${
        error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-opacity-50"
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

// Form Status Component
const FormStatusComponent: React.FC<FormStatusProps> = ({ status }) => {
  if (!status.message) return null;

  const isError = status.type === "error";
  const Icon = isError ? AlertCircle : CheckCircle;

  return (
    <div
      className={`p-4 rounded flex gap-3 items-start ${
        isError ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200"
      }`}
    >
      <Icon size={20} className={isError ? "text-red-600" : "text-green-600"} />
      <p className={isError ? "text-red-700" : "text-green-700"}>{status.message}</p>
    </div>
  );
};

// Main Component
const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [registrationData, setRegistrationData] = useState<RegistrationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    designation: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "", message: "" });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const sections: SectionRefs = {
    speakers: useRef<HTMLDivElement>(null),
    whyAttend: useRef<HTMLDivElement>(null),
    partners: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
    register: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = useCallback((ref: React.RefObject<HTMLDivElement | null>): void => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  }, []);

  const handleRegistrationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setRegistrationData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRegistrationSubmit = async (e: React.FormEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    const requiredFields = ["firstName", "lastName", "email", "phone", "company", "designation"];
    const errors = validateForm(
      registrationData as unknown as Record<string, string>,
      requiredFields
    );

    if (Object.values(errors).some((err) => err)) {
      setValidationErrors(errors);
      setFormStatus({ type: "error", message: "Please fix the errors above" });
      return;
    }

    setIsSubmitting(true);
    setValidationErrors({});

    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch(process.env.REACT_APP_API_URL + '/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(registrationData),
      // });

      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      setFormStatus({
        type: "success",
        message: "Registration successful! Check your email for confirmation.",
      });
      setRegistrationData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        designation: "",
        message: "",
      });

      setTimeout(() => setFormStatus({ type: "", message: "" }), 5000);
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "Registration failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const objectives: string[] = [
    "Foster meaningful connections between builders, investors, and industry leaders",
    "Share best practices and strategies for scaling tech startups in emerging markets",
    "Provide access to funding opportunities and executive mentorship programs",
    "Inspire innovation through keynotes, panel discussions, and workshops",
  ];

  const attendReasons: AttendReason[] = [
    {
      title: "Networking",
      desc: "Connect with 500+ African tech leaders, founders, and investors",
    },
    {
      title: "Learning",
      desc: "Gain insights from industry experts through keynotes and workshops",
    },
    { title: "Funding", desc: "Discover investment opportunities and venture capital connections" },
    { title: "Visibility", desc: "Showcase your product and gain media exposure" },
  ];

  const partners: Partner[] = [
    { name: "Partner A" },
    { name: "Partner B" },
    { name: "Partner C" },
    { name: "Partner D" },
  ];

  const faqItems: FAQItem[] = [
    {
      q: "What is included in the summit ticket?",
      a: "Each ticket includes 3-day access to all keynotes, panel discussions, workshops, networking sessions, meals, and exclusive summit materials.",
    },
    {
      q: "Do you offer group discounts?",
      a: "Yes! Groups of 5 or more qualify for 15% discount. Contact us for corporate packages and sponsorship opportunities.",
    },
    {
      q: "Is accommodation provided?",
      a: "We have negotiated special rates with partner hotels. Details will be sent upon registration confirmation.",
    },
    {
      q: "Can I attend virtually?",
      a: "We offer premium virtual access for those unable to attend in person. Virtual pass includes live streaming and recorded sessions.",
    },
    {
      q: "What is the refund policy?",
      a: "Full refunds available up to 30 days before the event. After that, tickets are non-refundable but transferable.",
    },
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight" style={{ color: COLORS.primary }}>
            <span className="block text-sm uppercase font-semibold">Builders</span>
            <span className="block text-xs tracking-widest">SUMMIT 2025</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <button
              onClick={() => scrollToSection(sections.speakers)}
              className="hover:opacity-60 transition text-sm font-medium"
            >
              Speakers
            </button>
            <button
              onClick={() => scrollToSection(sections.whyAttend)}
              className="hover:opacity-60 transition text-sm font-medium"
            >
              Why Attend
            </button>
            <button
              onClick={() => scrollToSection(sections.partners)}
              className="hover:opacity-60 transition text-sm font-medium"
            >
              Partners
            </button>
            <button
              onClick={() => scrollToSection(sections.contact)}
              className="hover:opacity-60 transition text-sm font-medium"
            >
              Contact
            </button>
            <button
              style={{ backgroundColor: COLORS.primary }}
              className="text-white px-6 py-2 rounded text-sm font-medium hover:opacity-80 transition"
            >
              Become a Sponsor
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              <button
                onClick={() => scrollToSection(sections.speakers)}
                className="block w-full text-left text-sm font-medium"
              >
                Speakers
              </button>
              <button
                onClick={() => scrollToSection(sections.whyAttend)}
                className="block w-full text-left text-sm font-medium"
              >
                Why Attend
              </button>
              <button
                onClick={() => scrollToSection(sections.partners)}
                className="block w-full text-left text-sm font-medium"
              >
                Partners
              </button>
              <button
                onClick={() => scrollToSection(sections.contact)}
                className="block w-full text-left text-sm font-medium"
              >
                Contact
              </button>
              <button
                style={{ backgroundColor: COLORS.primary }}
                className="w-full text-white px-4 py-2 rounded text-sm font-medium"
              >
                Become a Sponsor
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        {/* Animated background creative elements */}

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div>
              <div className="mb-6 inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                🚀 Join Industry Leaders & Innovators
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
                Where Builders
                <span style={{ color: COLORS.primary }} className="block">
                  Connect & Scale
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                The premier summit for African tech builders. Network with 500+ entrepreneurs,
                investors, and industry leaders shaping the future of tech.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => scrollToSection(sections.register)}
                  style={{ backgroundColor: COLORS.primary }}
                  className="text-white px-8 py-4 rounded font-semibold hover:opacity-80 transition text-base shadow-lg hover:shadow-xl"
                >
                  Register Now
                </button>
                <button
                  onClick={() => scrollToSection(sections.whyAttend)}
                  className="border-2 px-8 py-4 rounded font-semibold hover:opacity-60 transition text-base"
                  style={{ borderColor: COLORS.primary, color: COLORS.primary }}
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Illustration - Creativity & Creatives */}
            <div className="hidden md:flex items-center justify-center relative h-160">
              {/* Main illustration box */}
              <div className="relative w-full h-full">
                {/* Central creative illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Bigger container box */}
                  <div className="relative w-xl h-144">
                    {/* 🎨 Paint splatter */}
                    <div className="absolute top-6 left-10">
                      <div className="text-8xl animate-bounce" style={{ animationDuration: "3s" }}>
                        🎨
                      </div>
                    </div>

                    {/* 📸 Camera */}
                    <div className="absolute top-12 right-12 rotate-12">
                      <div className="text-7xl animate-pulse" style={{ animationDuration: "2s" }}>
                        📸
                      </div>
                    </div>

                    {/* 💡 Light bulb */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
                      <div
                        className="text-8xl animate-bounce"
                        style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
                      >
                        💡
                      </div>
                    </div>

                    {/* ✏️ Pencil */}
                    <div className="absolute right-8 top-1/3 -rotate-45">
                      <div className="text-7xl animate-pulse" style={{ animationDelay: "1s" }}>
                        ✏️
                      </div>
                    </div>

                    {/* 🚀 Rocket */}
                    <div className="absolute bottom-20 left-14 rotate-45">
                      <div
                        className="text-7xl animate-bounce"
                        style={{ animationDuration: "2s", animationDelay: "0.7s" }}
                      >
                        🚀
                      </div>
                    </div>

                    {/* 🖌️ Brush */}
                    <div className="absolute bottom-14 right-10 rotate-12">
                      <div className="text-7xl animate-pulse" style={{ animationDelay: "1.5s" }}>
                        🖌️
                      </div>
                    </div>

                    {/* ✨ Sparkles */}
                    <div
                      className="absolute top-20 right-4 text-6xl animate-bounce"
                      style={{ animationDuration: "2s" }}
                    >
                      ✨
                    </div>

                    <div
                      className="absolute bottom-24 right-20 text-5xl animate-bounce"
                      style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
                    >
                      ⭐
                    </div>

                    <div
                      className="absolute top-1/3 left-1/2 text-5xl animate-bounce"
                      style={{ animationDuration: "2s", animationDelay: "1s" }}
                    >
                      ✨
                    </div>

                    {/* Creative flowing SVG lines */}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 320 320"
                      style={{ opacity: 0.4 }}
                    >
                      <defs>
                        <style>{`
              @keyframes flowLine {
                0%, 100% { stroke-dashoffset: 0; opacity: 0.6; }
                50% { stroke-dashoffset: 20; opacity: 1; }
              }
              .creative-path {
                stroke-dasharray: 20;
                animation: flowLine 3s ease-in-out infinite;
                fill: none;
              }
            `}</style>
                      </defs>

                      <path
                        d="M 40 160 Q 80 140 120 160 T 200 160"
                        stroke={COLORS.primary}
                        strokeWidth="3"
                        className="creative-path"
                      />
                      <path
                        d="M 50 200 Q 100 180 150 200 T 280 200"
                        stroke={COLORS.primary}
                        strokeWidth="2.5"
                        className="creative-path"
                        style={{ animationDelay: "1s" }}
                      />
                      <path
                        d="M 45 120 Q 95 100 145 120 T 270 120"
                        stroke={COLORS.primary}
                        strokeWidth="2"
                        className="creative-path"
                        style={{ animationDelay: "2s" }}
                      />
                      <path
                        d="M 80 80 Q 120 120 160 90 Q 200 60 240 100"
                        stroke={COLORS.primary}
                        strokeWidth="2"
                        className="creative-path"
                        style={{ animationDelay: "0.5s" }}
                      />
                    </svg>

                    {/* Dots */}
                    <div
                      className="absolute top-12 left-1/2 w-3 h-3 rounded-full opacity-70"
                      style={{ backgroundColor: COLORS.primary }}
                    />
                    <div
                      className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full opacity-60"
                      style={{ backgroundColor: COLORS.primary }}
                    />
                    <div
                      className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full opacity-70"
                      style={{ backgroundColor: COLORS.primary }}
                    />
                    <div
                      className="absolute bottom-12 right-1/4 w-4 h-4 rounded-full opacity-60"
                      style={{ backgroundColor: COLORS.primary }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Event Details</h2>
          <p className="text-center text-gray-600 mb-16">
            Join us online from anywhere in the world
          </p>

          {/* Main event info cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "📅",
                label: "Date",
                value: "March 15-17, 2025",
                subtext: "Friday - Sunday",
              },
              {
                icon: "🕐",
                label: "Time",
                value: "9:00 AM - 5:00 PM WAT",
                subtext: "Daily Schedule",
              },
              {
                icon: "🌍",
                label: "Format",
                value: "Fully Online",
                subtext: "Virtual Event",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 border-2 border-gray-200 rounded-xl hover:border-gray-400 hover:shadow-lg transition group cursor-pointer"
                style={{ borderColor: i === 0 ? COLORS.primary : undefined }}
              >
                <p className="text-5xl mb-4 group-hover:scale-110 transition">{item.icon}</p>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-600 mb-2">
                  {item.label}
                </p>
                <p className="text-2xl font-bold mb-1">{item.value}</p>
                <p className="text-xs text-gray-500">{item.subtext}</p>
              </div>
            ))}
          </div>

          {/* What to expect section */}
          <div className="bg-linear-to-r from-gray-50 to-gray-100 rounded-xl p-8 mb-8 border border-gray-200">
            <h3 className="text-2xl font-bold mb-6">What to Expect</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: "📹",
                  title: "Live Streaming",
                  desc: "Watch keynotes and panel discussions in real-time from the comfort of your space",
                },
                {
                  icon: "💬",
                  title: "Interactive Q&A",
                  desc: "Ask questions directly to speakers and participate in live discussions",
                },
                {
                  icon: "🤝",
                  title: "Networking Lounge",
                  desc: "Connect with other builders in dedicated virtual networking rooms",
                },
                {
                  icon: "🎓",
                  title: "Recordings",
                  desc: "Access recorded sessions for 30 days after the event ends",
                },
                {
                  icon: "🏆",
                  title: "Certificates",
                  desc: "Earn attendance certificates for your professional profile",
                },
                {
                  icon: "📦",
                  title: "Swag Bag",
                  desc: "Receive exclusive digital resources and event materials",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="text-3xl shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision/About Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{ backgroundColor: COLORS.accent, color: COLORS.secondary }}
      >
        {/* Decorative background elements */}
        <div
          className="absolute top-0 left-0 w-96 h-96 opacity-5"
          style={{ backgroundColor: COLORS.secondary }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 opacity-5"
          style={{ backgroundColor: COLORS.secondary }}
        ></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div>
              <div
                className="inline-block px-4 py-2 rounded-full mb-6"
                style={{ backgroundColor: `${COLORS.secondary}20` }}
              >
                <p className="text-sm font-semibold uppercase tracking-wide opacity-90">About Us</p>
              </div>

              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Our Vision for African Builders
              </h2>

              <p className="text-lg leading-relaxed mb-6 opacity-90">
                The Builders Summit is a movement dedicated to empowering African tech builders with
                the knowledge, networks, and resources to create world-class solutions. We believe
                in fostering a community where innovation thrives and entrepreneurs can scale their
                impact globally.
              </p>

              <p className="text-lg leading-relaxed mb-8 opacity-85">
                This year, we're bringing together the brightest minds in technology, business, and
                venture capital to share insights, forge partnerships, and inspire the next
                generation of African builders shaping the future.
              </p>

              {/* Key points */}
              <div className="space-y-4">
                {[
                  "Empower African tech entrepreneurs",
                  "Foster innovation & collaboration",
                  "Connect talent with opportunities",
                  "Build a thriving tech ecosystem",
                ].map((point, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: COLORS.secondary, color: COLORS.accent }}
                    >
                      ✓
                    </div>
                    <p className="text-base opacity-90">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Visual elements */}
            <div className="relative h-96 md:block space-y-5 gap-2">
              {/* Card 1 */}
              <div
                className="p-6 rounded-xl shadow-xl"
                style={{
                  backgroundColor: `${COLORS.secondary}10`,
                  border: `1px solid ${COLORS.secondary}30`,
                }}
              >
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                <p className="text-sm opacity-80">
                  Empower builders to create solutions that solve real African problems
                </p>
              </div>

              {/* Card 2 */}
              <div
                className="p-6 rounded-xl shadow-xl"
                style={{
                  backgroundColor: `${COLORS.secondary}10`,
                  border: `1px solid ${COLORS.secondary}30`,
                }}
              >
                <div className="text-4xl mb-3">🌱</div>
                <h3 className="text-xl font-bold mb-2">Our Impact</h3>
                <p className="text-sm opacity-80">
                  Building a sustainable ecosystem where African tech thrives
                </p>
              </div>

              {/* Card 3 */}
              <div
                className="p-6 rounded-xl shadow-2xl"
                style={{
                  backgroundColor: `${COLORS.secondary}15`,
                  border: `2px solid ${COLORS.secondary}50`,
                }}
              >
                <div className="text-5xl mb-3">🚀</div>
                <h3 className="text-xl font-bold mb-2">Our Goal</h3>
                <p className="text-sm opacity-80">Scale African innovation to global heights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Event Objectives</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            What we aim to achieve and why this summit matters
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {objectives.map((objective, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl border-2 border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-300 relative overflow-hidden bg-linear-to-br from-gray-50 to-white"
              >
                {/* Background accent */}

                {/* Number circle */}
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full text-white font-bold mb-4 group-hover:scale-110 transition"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  {i + 1}
                </div>

                {/* Content */}
                <p className="text-lg font-semibold text-gray-900 leading-relaxed relative z-10">
                  {objective}
                </p>

                {/* Hover line */}
                <div
                  className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: COLORS.primary }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section
        ref={sections.speakers}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-gray-50 to-white"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Featured Speaker</h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Hear insights from industry leaders who are shaping African tech
          </p>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
            {/* Speaker Image */}
            <div className="shrink-0 w-full lg:w-1/2">
              <div
                className="w-full h-96 rounded-xl overflow-hidden transform transition-transform duration-500 hover:scale-105"
                style={{ backgroundColor: COLORS.accent }}
              />
            </div>

            {/* Speaker Details */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h3 className="text-4xl font-bold">{`Chioma Adeleke`}</h3>
              <p className="text-xl font-semibold" style={{ color: COLORS.primary }}>
                Founder & CEO
              </p>
              <p className="text-gray-600 text-lg">
                TechNova • Africa's Leading Tech Innovation Hub
              </p>

              <p className="text-gray-700 text-base leading-relaxed">
                Chioma is a visionary tech leader with 10+ years of experience scaling startups
                across Africa. She'll be sharing insights on innovation, leadership, and building
                world-class teams.
              </p>

              <div className="flex gap-4 flex-col sm:flex-row">
                <a
                  href="#"
                  className="flex-1 px-6 py-3 rounded-lg font-semibold text-center text-white transition hover:opacity-80"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  Learn More
                </a>
                <a
                  href="#"
                  className="flex-1 px-6 py-3 rounded-lg font-semibold text-center border-2 transition hover:opacity-60"
                  style={{ borderColor: COLORS.primary, color: COLORS.primary }}
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Attend */}
      <section ref={sections.whyAttend} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Why Attend?</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Discover the tangible benefits of joining the Builders Summit
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {attendReasons.map((item, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl border-2 border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-300 relative overflow-hidden bg-linear-to-br from-gray-50 to-white"
              >
                {/* Background accent */}
                {/* <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition"
                  style={{ backgroundColor: COLORS.primary }}
                ></div> */}

                {/* Number circle */}
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full text-white font-bold mb-4 group-hover:scale-110 transition"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  {i + 1}
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-opacity-80 transition">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>

                {/* Hover line */}
                <div
                  className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: COLORS.primary }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners/Sponsors */}
      <section
        ref={sections.partners}
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: COLORS.accent, color: COLORS.secondary }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Our Partners & Sponsors</h2>
          <p className="text-center opacity-90 mb-16">
            Join leading organizations supporting African tech innovation
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {partners.map((partner, i) => (
              <div
                key={i}
                className="border-2 border-opacity-30 border-white rounded-lg p-6 text-center flex items-center justify-center min-h-24 hover:border-opacity-50 transition"
              >
                <p className="font-semibold">{partner.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              style={{ backgroundColor: COLORS.secondary, color: COLORS.primary }}
              className="px-8 py-3 rounded font-semibold hover:opacity-80 transition"
            >
              Become a Sponsor
            </button>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section ref={sections.register} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Register for the Summit</h2>
          <p className="text-center text-gray-600 mb-12">
            Secure your spot at Africa's premier builders event
          </p>
          <FormStatusComponent status={formStatus} />
          <div className="space-y-6 mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                label="First Name"
                name="firstName"
                value={registrationData.firstName}
                onChange={handleRegistrationChange}
                error={validationErrors.firstName}
                disabled={isSubmitting}
              />
              <FormInput
                label="Last Name"
                name="lastName"
                value={registrationData.lastName}
                onChange={handleRegistrationChange}
                error={validationErrors.lastName}
                disabled={isSubmitting}
              />
            </div>
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={registrationData.email}
              onChange={handleRegistrationChange}
              error={validationErrors.email}
              disabled={isSubmitting}
            />
            <FormInput
              label="Phone Number"
              name="phone"
              type="tel"
              value={registrationData.phone}
              onChange={handleRegistrationChange}
              error={validationErrors.phone}
              disabled={isSubmitting}
            />
            <FormInput
              label="Company/Organization"
              name="company"
              value={registrationData.company}
              onChange={handleRegistrationChange}
              error={validationErrors.company}
              disabled={isSubmitting}
            />
            <FormInput
              label="Job Title/Designation"
              name="designation"
              value={registrationData.designation}
              onChange={handleRegistrationChange}
              error={validationErrors.designation}
              disabled={isSubmitting}
            />
            <FormTextarea
              label="Additional Information"
              name="message"
              placeholder="Tell us about yourself (optional)"
              value={registrationData.message}
              onChange={handleRegistrationChange}
              required={false}
              disabled={isSubmitting}
            />
            <button
              onClick={handleRegistrationSubmit}
              disabled={isSubmitting}
              style={{ backgroundColor: COLORS.primary }}
              className="w-full text-white py-4 rounded font-semibold flex items-center justify-center gap-2 hover:opacity-80 transition disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Complete Registration"}
            </button>
            <p className="text-xs text-gray-500 text-center">
              We'll send a confirmation email with event details and a ticket to your inbox.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <details
                key={i}
                className="group border border-gray-200 rounded-lg p-6 cursor-pointer hover:border-gray-300 transition"
              >
                <summary className="flex justify-between items-center font-semibold text-lg">
                  {item.q}
                  <span className="text-gray-400 group-open:text-gray-600 transition">▼</span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: COLORS.primary, color: COLORS.secondary }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="font-bold text-lg mb-4">BUILDERS SUMMIT</h4>
              <p className="opacity-80 text-sm leading-relaxed">
                Empowering African tech builders to create, innovate, and scale world-class
                solutions.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-60 transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-60 transition">
                    Speakers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-60 transition">
                    Schedule
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-60 transition">
                    Partners
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Newsletter</h5>
              <p className="text-sm opacity-80 mb-3">Get updates about the summit</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm text-white rounded-l border border-white"
                />
                <button
                  style={{ backgroundColor: COLORS.secondary, color: COLORS.primary }}
                  className="px-3 py-2 rounded-r font-semibold"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-opacity-20 border-white pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-75">
            <p>© 2025 Builders Summit. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:opacity-60 transition">
                Twitter
              </a>
              <a href="#" className="hover:opacity-60 transition">
                LinkedIn
              </a>
              <a href="#" className="hover:opacity-60 transition">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
