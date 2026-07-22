"use client";

import { useRouter } from "next/navigation";

const dashboardPath = "/contador/dashboard";

export function useAuth() {
  const router = useRouter();

  const redirectToDashboard = () => {
    // reemplaza sign-in para evitar volver al formulario con el historial.
    router.replace(dashboardPath);
  };

  return { redirectToDashboard };
}
