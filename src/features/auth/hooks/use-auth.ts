"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { ForgotPasswordCredentials } from "@/features/auth/types/auth.type";

const dashboardPath = "/contador/dashboard";
const closeDelay = 3000;

type ForgotPasswordSubmit = (
  credentials: ForgotPasswordCredentials,
) => void | Promise<void>;

export function useAuth() {
  const router = useRouter();
  const [isForgotPasswordRequestSent, setIsForgotPasswordRequestSent] =
    useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    return () => clearTimeout(closeTimer.current);
  }, []);

  const redirectToDashboard = () => {
    // reemplaza sign-in para evitar volver al formulario con el historial.
    router.replace(dashboardPath);
  };

  const resetForgotPasswordRequest = () => {
    clearTimeout(closeTimer.current);
    setIsForgotPasswordRequestSent(false);
  };

  const requestForgotPassword = async (
    credentials: ForgotPasswordCredentials,
    onSubmit: ForgotPasswordSubmit | undefined,
    onClose: () => void,
  ) => {
    clearTimeout(closeTimer.current);
    await onSubmit?.(credentials);
    setIsForgotPasswordRequestSent(true);

    // cierra el modal despues de mostrar el aviso de envio.
    closeTimer.current = setTimeout(() => {
      setIsForgotPasswordRequestSent(false);
      onClose();
    }, closeDelay);
  };

  return {
    isForgotPasswordRequestSent,
    redirectToDashboard,
    requestForgotPassword,
    resetForgotPasswordRequest,
  };
}
