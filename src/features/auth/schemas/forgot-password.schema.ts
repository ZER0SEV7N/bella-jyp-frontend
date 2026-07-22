import { z } from "zod";

import { documentTypes } from "@/features/auth/types/auth.type";

export const forgotPasswordSchema = z.object({
  documentType: z.enum(documentTypes, {
    error: "Selecciona un tipo de documento.",
  }),
  documentNumber: z
    .string()
    .trim()
    .min(1, "Ingresa tu numero de documento.")
    .max(20, "El documento no puede superar los 20 caracteres."),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
