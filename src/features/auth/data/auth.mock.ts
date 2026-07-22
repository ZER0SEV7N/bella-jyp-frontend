import type { ForgotPasswordFormValues } from "@/features/auth/schemas/forgot-password.schema";
import type { SignInFormValues } from "@/features/auth/schemas/sign-in.schema";

export const signInDefaultValues: SignInFormValues = {
  documentType: "DNI",
  documentNumber: "",
  password: "",
};

export const forgotPasswordDefaultValues: ForgotPasswordFormValues = {
  documentType: "DNI",
  documentNumber: "",
};
