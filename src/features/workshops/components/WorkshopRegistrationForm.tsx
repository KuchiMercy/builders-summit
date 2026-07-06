import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { useRegisterWorkshop } from "../hooks/useRegisterWorkshop";
import { workshopRegistrationSchema } from "../../../schema/workshopRegistrationSchema";
import type { WorkshopRegistrationFormData } from "../../../schema/workshopRegistrationSchema";
import type { WorkshopData } from "../../../data/workshops";

interface WorkshopRegistrationFormProps {
  workshop: WorkshopData;
}

export const WorkshopRegistrationForm = ({ workshop }: WorkshopRegistrationFormProps) => {
  const { status, error, registerForWorkshop } = useRegisterWorkshop();
  const successRef = useRef<HTMLDivElement>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<WorkshopRegistrationFormData>({
    resolver: zodResolver(workshopRegistrationSchema),
    defaultValues: {
      registrationType: "workshop",
      workshopId: workshop.id,
    }
  });

  // Reset form when workshop ID changes
  useEffect(() => {
    reset({ registrationType: "workshop", workshopId: workshop.id });
  }, [workshop.id, reset]);

  // Manage focus for accessibility when registration succeeds
  useEffect(() => {
    if (status === "success" && successRef.current) {
      successRef.current.focus();
    }
  }, [status]);

  const onSubmit = async (data: WorkshopRegistrationFormData) => {
    // Bot protection: if the honeypot field is filled out, silently abort.
    if (data.botField) {
      console.warn("Bot detected: honeypot field was filled.");
      // We don't call the API, just simulate success to the bot
      reset();
      return;
    }

    await registerForWorkshop(data);
    if (status !== "error") {
      reset();
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-2xl border border-gray-200/60 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-black/5 relative overflow-hidden animate-fade-in-up" style={{ animationDelay: "200ms" }}>
      {/* Ticket Cutout Effect */}
      <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#FAFAFA] rounded-full border-r border-gray-200/60 pointer-events-none" aria-hidden="true"></div>
      <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#FAFAFA] rounded-full border-l border-gray-200/60 pointer-events-none" aria-hidden="true"></div>

      <div className="space-y-2 mb-8">
        <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
          Register for Workshop
        </h2>
        <h3 className="text-3xl md:text-4xl font-black text-dark leading-snug tracking-tighter">
          Secure Your Seat
        </h3>
        <p className="text-gray-600 font-medium pt-1">
          Reserve your spot for this live interactive workshop with {workshop.facilitator.name}.
        </p>
      </div>

      {status === "success" ? (
        <div 
          ref={successRef} 
          tabIndex={-1} 
          className="text-center py-20 animate-fade-in focus:outline-none"
          aria-live="polite"
        >
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-scale-in">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h4 className="text-4xl font-black text-dark mb-4">You're registered!</h4>
          <p className="text-xl text-gray-600 mb-4">An email will be sent to you a few days to the workshop, but you can join the community for live updates.</p>
          <p className="text-sm text-gray-500 mb-8 font-semibold uppercase tracking-wider">
            Join us live on <time>{workshop.time.split(' | ')[0]}</time> at <time>{workshop.time.split(' | ')[1].split(' - ')[0]}</time>
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://chat.whatsapp.com/IFxxRgwP0cQCWq00VjAt1M"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer text-center uppercase text-sm tracking-wider focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
            >
              Join Community
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
          <input type="hidden" {...register("registrationType")} value="workshop" />
          <input type="hidden" {...register("workshopId")} value={workshop.id} />
          
          {/* Honeypot field - visually hidden but accessible to bots */}
          <div aria-hidden="true" className="opacity-0 absolute -z-50 pointer-events-none" style={{ left: '-9999px' }} tabIndex={-1}>
            <label htmlFor="botField">Leave this field blank</label>
            <input
              id="botField"
              type="text"
              {...register("botField")}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group">
              <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 tracking-wide mb-2">First Name *</label>
              <input
                id="firstName"
                type="text"
                {...register("firstName")}
                aria-invalid={errors.firstName ? "true" : "false"}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                className={`w-full bg-white border ${errors.firstName ? 'border-red-500' : 'border-gray-200 focus:border-primary'} px-4 py-4 text-dark focus:outline-none transition-all font-medium text-lg rounded-xl focus:ring-1 focus:ring-primary shadow-inner`}
                placeholder="Jane"
              />
              {errors.firstName && <p id="firstName-error" className="text-red-500 text-sm mt-2 font-medium animate-fade-in" aria-live="polite">{errors.firstName.message}</p>}
            </div>
            <div className="relative group">
              <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 tracking-wide mb-2">Last Name *</label>
              <input
                id="lastName"
                type="text"
                {...register("lastName")}
                aria-invalid={errors.lastName ? "true" : "false"}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
                className={`w-full bg-white border ${errors.lastName ? 'border-red-500' : 'border-gray-200 focus:border-primary'} px-4 py-4 text-dark focus:outline-none transition-all font-medium text-lg rounded-xl focus:ring-1 focus:ring-primary shadow-inner`}
                placeholder="Doe"
              />
              {errors.lastName && <p id="lastName-error" className="text-red-500 text-sm mt-2 font-medium animate-fade-in" aria-live="polite">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group">
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 tracking-wide mb-2">Email Address *</label>
              <input
                id="email"
                type="email"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-primary'} px-4 py-4 text-dark focus:outline-none transition-all font-medium text-lg rounded-xl focus:ring-1 focus:ring-primary shadow-inner`}
                placeholder="jane@example.com"
              />
              {errors.email && <p id="email-error" className="text-red-500 text-sm mt-2 font-medium animate-fade-in" aria-live="polite">{errors.email.message}</p>}
            </div>
            <div className="relative group">
              <label htmlFor="phone" className="block text-sm font-bold text-gray-700 tracking-wide mb-2">Phone Number *</label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={`w-full bg-white border ${errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-primary'} px-4 py-4 text-dark focus:outline-none transition-all font-medium text-lg rounded-xl focus:ring-1 focus:ring-primary shadow-inner`}
                placeholder="+1 (555) 000-0000"
              />
              {errors.phone && <p id="phone-error" className="text-red-500 text-sm mt-2 font-medium animate-fade-in" aria-live="polite">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group">
              <label htmlFor="organization" className="block text-sm font-bold text-gray-700 tracking-wide mb-2">Organization / School *</label>
              <input
                id="organization"
                type="text"
                {...register("organization")}
                aria-invalid={errors.organization ? "true" : "false"}
                aria-describedby={errors.organization ? "organization-error" : undefined}
                className={`w-full bg-white border ${errors.organization ? 'border-red-500' : 'border-gray-200 focus:border-primary'} px-4 py-4 text-dark focus:outline-none transition-all font-medium text-lg rounded-xl focus:ring-1 focus:ring-primary shadow-inner`}
                placeholder="Company or Institution"
              />
              {errors.organization && <p id="organization-error" className="text-red-500 text-sm mt-2 font-medium animate-fade-in" aria-live="polite">{errors.organization.message}</p>}
            </div>
            <div className="relative group">
              <label htmlFor="role" className="block text-sm font-bold text-gray-700 tracking-wide mb-2">Job Title / Role *</label>
              <input
                id="role"
                type="text"
                {...register("role")}
                aria-invalid={errors.role ? "true" : "false"}
                aria-describedby={errors.role ? "role-error" : undefined}
                className={`w-full bg-white border ${errors.role ? 'border-red-500' : 'border-gray-200 focus:border-primary'} px-4 py-4 text-dark focus:outline-none transition-all font-medium text-lg rounded-xl focus:ring-1 focus:ring-primary shadow-inner`}
                placeholder="e.g. Software Engineer"
              />
              {errors.role && <p id="role-error" className="text-red-500 text-sm mt-2 font-medium animate-fade-in" aria-live="polite">{errors.role.message}</p>}
            </div>
          </div>

          <div className="relative group">
            <label htmlFor="workshopQuestion" className="block text-sm font-bold text-gray-700 tracking-wide mb-2">Your Question for {workshop.facilitator.name} (Optional)</label>
            <textarea
              id="workshopQuestion"
              {...register("workshopQuestion")}
              rows={4}
              className="w-full bg-white border border-gray-200 px-4 py-4 text-dark focus:outline-none focus:border-primary transition-all font-medium text-lg resize-none rounded-xl focus:ring-1 focus:ring-primary shadow-inner"
              placeholder={`Is there a specific career, leadership, or entrepreneurship question you would like ${workshop.facilitator.name} to answer?`}
            />
          </div>

          <div className="relative group flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center h-6">
              <input
                id="registerForAll"
                type="checkbox"
                {...register("registerForAll")}
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
              />
            </div>
            <div>
              <label htmlFor="registerForAll" className="font-bold text-dark cursor-pointer text-sm tracking-wide">
                Register for all upcoming workshops
              </label>
              <p className="text-gray-500 text-xs mt-1">
                Check this box to automatically reserve your spot for all future monthly sessions.
              </p>
            </div>
          </div>

          {status === "error" && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-center gap-3 shadow-sm" aria-live="assertive">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 shrink-0 text-red-500"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
              <p className="font-semibold text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || status === "submitting"}
            className="w-full bg-primary text-white font-bold py-5 rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl text-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
          >
            {isSubmitting || status === "submitting" ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : "Complete Registration"}
          </button>
        </form>
      )}
    </div>
  );
};
