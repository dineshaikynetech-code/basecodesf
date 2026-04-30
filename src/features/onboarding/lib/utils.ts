// @/features/onboarding/lib/utils.ts
import { z } from "zod";
import type { FormSchema, FormField } from "@/shared/lib/types";

export const buildZodSchema = (schema: FormSchema) => {
  const shape: Record<string, z.ZodTypeAny> = {};

  schema.fields.forEach((field: FormField) => {
    const customMessage = field.validation?.message || `${field.label} is required`;
    const isRequired = field.validation?.required !== false;

    let zodField: z.ZodTypeAny;

    if (field.type === "text" || field.type === "select") {
      if (isRequired) {
        // Use an object for the error map to ensure Zod picks up the message
        zodField = z.string().trim().min(1, { message: customMessage });
      } else {
        zodField = z.string().optional().or(z.literal(""));
      }
    } 
    else if (field.type === "file") {
      zodField = z.any().optional();
    } 
    else {
      zodField = z.any().optional();
    }

    shape[field.name] = zodField;
  });

  return z.object(shape);
};