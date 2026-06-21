import { z } from "zod";

export const registrationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  linkedin: z.string().optional(),
  cityCountry: z.string().min(2, "Please provide your city and country"),
  organization: z.string().min(2, "Please provide your organization"),
  role: z.string().min(2, "Please provide your role"),
  industry: z.string().min(1, "Please select an industry"),
  experience: z.string().optional(),
  source: z.string().optional(),
  goals: z.string().optional(),
  community: z.boolean(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
