import { z } from "zod";

export const workshopRegistrationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  organization: z.string().min(2, "Organization is required"),
  role: z.string().min(2, "Role is required"),
  workshopQuestion: z.string().optional(),
  botField: z.string().optional(), // Honeypot field
  registrationType: z.literal("workshop"),
  workshopId: z.string().optional(), // Links registration to a specific monthly workshop (optional if registerForAll)
  registerForAll: z.boolean().optional(),
});

export type WorkshopRegistrationFormData = z.infer<typeof workshopRegistrationSchema>;
