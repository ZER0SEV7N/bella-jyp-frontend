import type { SignInFormValues } from "@/features/auth/schemas/sign-in.schema";

export const signInDefaultValues: SignInFormValues = {
  documentType: "DNI",
  documentNumber: "",
  password: "",
};
