import { z } from "zod";

import { documentTypes } from "@/features/auth/types/auth.type";

export const signInSchema = z.object({
  documentType: z.enum(documentTypes, {
    error: "Selecciona un tipo de documento.",
  }),
  documentNumber: z
    .string()
    .trim()
    .min(1, "Ingresa tu numero de documento.")
    .max(20, "El documento no puede superar los 20 caracteres."),
  password: z
    .string()
    .min(1, "Ingresa tu contraseña.")
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

