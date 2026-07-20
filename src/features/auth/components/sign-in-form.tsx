"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { signInDefaultValues } from "@/features/auth/data/auth.mock";
import {
  signInSchema,
  type SignInFormValues,
} from "@/features/auth/schemas/sign-in.schema";
import { documentTypes, type SignInCredentials } from "@/features/auth/types/auth.type";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

type SignInFormProps = {
  onSubmit?: (credentials: SignInCredentials) => void | Promise<void>;
};

export function SignInForm({ onSubmit }: SignInFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  // conecta zod con react hook form antes de enviar los datos.
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: signInDefaultValues,
  });

  // delega las credenciales validadas a la capa que integra el formulario.
  const submitForm = async (values: SignInFormValues) => {
    await onSubmit?.(values);
  };

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit(submitForm)}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="documentType">
          Documento
        </label>
        <div className="flex gap-2">
          <select
            aria-label="Tipo de documento"
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-primary focus:ring-3 focus:ring-primary/15"
            id="documentType"
            {...register("documentType")}
          >
            {documentTypes.map((documentType) => (
              <option key={documentType} value={documentType}>
                {documentType}
              </option>
            ))}
          </select>
          <div className="relative min-w-0 flex-1">
            <UserRound aria-hidden className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              aria-invalid={Boolean(errors.documentNumber)}
              className="h-11 pl-10"
              id="documentNumber"
              placeholder="Numero de documento"
              {...register("documentNumber")}
            />
          </div>
        </div>
        {errors.documentNumber && (
          <p className="text-sm text-destructive" role="alert">
            {errors.documentNumber.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="password">
          ContraseÃ±a
        </label>
        <div className="relative">
          <LockKeyhole aria-hidden className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            aria-invalid={Boolean(errors.password)}
            className="h-11 pr-11 pl-10"
            id="password"
            placeholder="Ingresa tu contraseÃ±a"
            type={isPasswordVisible ? "text" : "password"}
            {...register("password")}
          />
          <button
            aria-label={isPasswordVisible ? "Ocultar contraseÃ±a" : "Mostrar contraseÃ±a"}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700"
            onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
            type="button"
          >
            {isPasswordVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button className="h-11 w-full rounded-lg" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Ingresando..." : "Ingresar"}
      </Button>
    </form>
  );
}

