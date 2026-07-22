"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, UserRound } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { forgotPasswordDefaultValues } from "@/features/auth/data/auth.mock";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/features/auth/schemas/forgot-password.schema";
import {
  documentTypes,
  type ForgotPasswordCredentials,
} from "@/features/auth/types/auth.type";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

type ForgotPasswordDialogProps = {
  onSubmit?: (credentials: ForgotPasswordCredentials) => void | Promise<void>;
};

export function ForgotPasswordDialog({ onSubmit }: ForgotPasswordDialogProps) {
  const [open, setOpen] = useState(false);
  const {
    isForgotPasswordRequestSent,
    requestForgotPassword,
    resetForgotPasswordRequest,
  } = useAuth();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: forgotPasswordDefaultValues,
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) resetForgotPasswordRequest();
  };

  const submitForm = async (values: ForgotPasswordFormValues) => {
    await requestForgotPassword(values, onSubmit, () => setOpen(false));
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    // evita que el envio del modal valide tambien el formulario sign-in.
    event.stopPropagation();
    void handleSubmit(submitForm)(event);
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger
        render={
          <Button className="h-auto p-0 text-primary" type="button" variant="link" />
        }
      >
        ¿Olvidaste tu contraseña?
      </DialogTrigger>
      {isForgotPasswordRequestSent ? (
        <DialogContent className="gap-4 p-8 text-center" showCloseButton={false}>
          <div className="mx-auto grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
            <CircleCheck className="size-7" />
          </div>
          <DialogHeader className="items-center gap-2">
            <DialogTitle className="text-xl">Instrucciones enviadas</DialogTitle>
            <DialogDescription className="max-w-xs">
              Enviamos las instrucciones a tu correo. Este modal se cerrara automaticamente.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      ) : (
        <DialogContent className="gap-6 p-6" showCloseButton={false}>
          <DialogHeader className="gap-2">
            <DialogTitle className="text-xl">Recupera tu contraseña</DialogTitle>
            <DialogDescription>
              Ingresa tu documento para enviarte las indicaciones de recuperacion.
            </DialogDescription>
          </DialogHeader>
          <form id="forgot-password-form" noValidate onSubmit={handleFormSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="forgot-document-type">
                Documento
              </label>
              <div className="flex">
                <Controller
                  control={control}
                  name="documentType"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        aria-label="Tipo de documento para recuperar contraseña"
                        className="h-11! w-24 min-w-24 shrink-0 rounded-r-none border-r-0"
                        id="forgot-document-type"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent align="start">
                        {documentTypes.map((documentType) => (
                          <SelectItem key={documentType} value={documentType}>
                            {documentType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <div className="relative min-w-0 flex-1">
                  <UserRound aria-hidden className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    aria-invalid={Boolean(errors.documentNumber)}
                    className="h-11 rounded-l-none pl-10"
                    id="forgot-document-number"
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
          </form>
          <DialogFooter className="-mx-6 -mb-6 px-6">
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancelar
            </DialogClose>
            <Button form="forgot-password-form" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Enviando..." : "Enviar solicitud"}
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
