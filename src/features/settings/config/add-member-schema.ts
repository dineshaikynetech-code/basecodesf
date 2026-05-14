import { z } from "zod";

export const addTeamMemberSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  
  role: z
    .string()
    .min(1, "Role is required"),
  
  socialMedia: z
    .string()
    .optional(),
  
  locationHubs: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        subtitle: z.string(),
      })
    )
    .optional()
    .default([]),
});

export type AddTeamMemberFormData = z.infer<typeof addTeamMemberSchema>;