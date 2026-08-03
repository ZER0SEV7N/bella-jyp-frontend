"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  SolicitudRecuperacionSchema,
  type SolicitudRecuperacionDTO,
} from "@jyp/shared-contracts";
import { CircleCheck, UserRound } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useForm } from "react-hook-form";

import { forgotPasswordDefaultValues } from "@/features/auth/data/auth.mock";
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

type ForgotPasswordDialogProps = {
  onSubmit?: (
    credentials: SolicitudRecuperacionDTO,
  ) => void | Promise<void>;
};

export function ForgotPasswordDialog({ onSubmit }: ForgotPasswordDialogProps) {
  const [open, setOpen] = useState(false);
  const {
    isForgotPasswordRequestSent,
    requestForgotPassword,
    resetForgotPasswordRequest,
  } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SolicitudRecuperacionDTO>({
    resolver: zodResolver(SolicitudRecuperacionSchema),
    defaultValues: forgotPasswordDefaultValues,
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) resetForgotPasswordRequest();
  };

  const submitForm = async (values: SolicitudRecuperacionDTO) => {
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
          <Button
            className="h-auto p-0 text-primary"
            type="button"
            variant="link"
          />
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
              Enviamos las instrucciones a tu correo. Este modal se cerrara
              automaticamente.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      ) : (
        <DialogContent className="gap-6 p-6" showCloseButton={false}>
          <DialogHeader className="gap-2">
            <DialogTitle className="text-xl">
              Recupera tu contraseña
            </DialogTitle>
            <DialogDescription>
              Ingresa tu documento para enviarte las indicaciones de
              recuperacion.
            </DialogDescription>
          </DialogHeader>
          <form id="forgot-password-form" noValidate onSubmit={handleFormSubmit}>
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="forgot-document-number"
              >
                Numero de documento
              </label>
              <div className="relative">
                <UserRound
                  aria-hidden
                  className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"
                />
                <Input
                  aria-invalid={Boolean(errors.nro_documento)}
                  className="h-11 pl-10"
                  id="forgot-document-number"
                  placeholder="Numero de documento"
                  {...register("nro_documento")}
                />
              </div>
              {errors.nro_documento && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.nro_documento.message}
                </p>
              )}
            </div>
          </form>
          <DialogFooter className="-mx-6 -mb-6 px-6">
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancelar
            </DialogClose>
            <Button
              form="forgot-password-form"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Enviando..." : "Enviar solicitud"}
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
