import { Send, CheckCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../../schema/registrationSchema";
import type { RegistrationFormData } from "../../schema/registrationSchema";
import { useRegistration } from "../../hooks/useRegistration";

const Register = () => {
  const { status, errorMessage, submitRegistration } = useRegistration();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      community: false,
    }
  });

  const onSubmit = async (data: RegistrationFormData) => {
    const success = await submitRegistration(data);
    if (success) {
      reset();
    }
  };

  return (
    <section id="register" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-30"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter">
            JOIN THE COMMUNITY
          </h2>
          <p className="text-xl text-gray-600 font-medium">Become a part of the Visionary Builders Network.</p>
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
              <h3 className="text-4xl font-black text-dark mb-4">Welcome to the Community!</h3>
              <p className="text-xl text-gray-600 mb-8">Your membership request has been confirmed. Check your email for next steps.</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://chat.whatsapp.com/IFxxRgwP0cQCWq00VjAt1M"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#25D366] text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg hover:transform hover:scale-105"
                >
                  <MessageCircle size={20} />
                  Join WhatsApp Group
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">First Name *</label>
                  <input
                    id="firstName"
                    type="text"
                    {...register("firstName")}
                    aria-invalid={errors.firstName ? "true" : "false"}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    className={`w-full bg-primary/5 border-b-2 ${errors.firstName ? 'border-red-500' : 'border-dark/10'} px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg`}
                    placeholder="Jane"
                  />
                  {errors.firstName && <p id="firstName-error" className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Last Name *</label>
                  <input
                    id="lastName"
                    type="text"
                    {...register("lastName")}
                    aria-invalid={errors.lastName ? "true" : "false"}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    className={`w-full bg-primary/5 border-b-2 ${errors.lastName ? 'border-red-500' : 'border-dark/10'} px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p id="lastName-error" className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`w-full bg-primary/5 border-b-2 ${errors.email ? 'border-red-500' : 'border-dark/10'} px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg`}
                    placeholder="jane@example.com"
                  />
                  {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={`w-full bg-primary/5 border-b-2 ${errors.phone ? 'border-red-500' : 'border-dark/10'} px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg`}
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.phone && <p id="phone-error" className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="linkedin" className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">LinkedIn Profile / Website</label>
                <input
                  id="linkedin"
                  type="text"
                  {...register("linkedin")}
                  className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg"
                  placeholder="linkedin.com/in/janedoe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="cityCountry" className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">City & Country *</label>
                  <input
                    id="cityCountry"
                    type="text"
                    {...register("cityCountry")}
                    aria-invalid={errors.cityCountry ? "true" : "false"}
                    aria-describedby={errors.cityCountry ? "cityCountry-error" : undefined}
                    className={`w-full bg-primary/5 border-b-2 ${errors.cityCountry ? 'border-red-500' : 'border-dark/10'} px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg`}
                    placeholder="New York, USA"
                  />
                  {errors.cityCountry && <p id="cityCountry-error" className="text-red-500 text-sm mt-1">{errors.cityCountry.message}</p>}
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Organization *</label>
                  <input
                    id="organization"
                    type="text"
                    {...register("organization")}
                    aria-invalid={errors.organization ? "true" : "false"}
                    aria-describedby={errors.organization ? "organization-error" : undefined}
                    className={`w-full bg-primary/5 border-b-2 ${errors.organization ? 'border-red-500' : 'border-dark/10'} px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg`}
                    placeholder="Company Name"
                  />
                  {errors.organization && <p id="organization-error" className="text-red-500 text-sm mt-1">{errors.organization.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="role" className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Job Title / Role *</label>
                  <input
                    id="role"
                    type="text"
                    {...register("role")}
                    aria-invalid={errors.role ? "true" : "false"}
                    aria-describedby={errors.role ? "role-error" : undefined}
                    className={`w-full bg-primary/5 border-b-2 ${errors.role ? 'border-red-500' : 'border-dark/10'} px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg`}
                    placeholder="Product Manager"
                  />
                  {errors.role && <p id="role-error" className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Industry / Sector *</label>
                  <select
                    id="industry"
                    {...register("industry")}
                    aria-invalid={errors.industry ? "true" : "false"}
                    aria-describedby={errors.industry ? "industry-error" : undefined}
                    className={`w-full bg-primary/5 border-b-2 ${errors.industry ? 'border-red-500' : 'border-dark/10'} px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg appearance-none`}
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
                  {errors.industry && <p id="industry-error" className="text-red-500 text-sm mt-1">{errors.industry.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="experience" className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">Years of Experience</label>
                  <select
                    id="experience"
                    {...register("experience")}
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
                  <label htmlFor="source" className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">How did you hear about us?</label>
                  <select
                    id="source"
                    {...register("source")}
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
                <label htmlFor="goals" className="block text-sm font-bold text-dark uppercase tracking-wide mb-2">What are your key goals for attending?</label>
                <textarea
                  id="goals"
                  {...register("goals")}
                  rows={3}
                  className="w-full bg-primary/5 border-b-2 border-dark/10 px-4 py-4 text-dark focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-lg resize-none"
                  placeholder="How can we help you build?"
                ></textarea>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <input
                  type="checkbox"
                  id="community"
                  {...register("community")}
                  className="w-5 h-5 rounded border-gray-300 text-dark focus:ring-dark bg-white"
                />
                <label htmlFor="community" className="text-gray-700 text-sm font-medium cursor-pointer">
                  Would you like to join the Visionary Builders’ Community group?
                </label>
              </div>

              {status === "error" && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-2 animate-in">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                  <p className="font-medium">{errorMessage}</p>
                </div>
              )}

              <div className="text-center text-gray-500 text-sm">
                By clicking "Complete Registration", you agree to our{" "}
                <Link to="/privacy-policy" target="_blank" className="text-primary font-bold hover:underline">
                  Privacy Policy
                </Link>.
              </div>

              <button
                type="submit"
                disabled={isSubmitting || status === "submitting"}
                className="w-full bg-primary text-white font-bold py-5 rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl text-lg"
              >
                {isSubmitting || status === "submitting" ? (
                  "Processing..."
                ) : (
                  <>
                    Join the Community
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
