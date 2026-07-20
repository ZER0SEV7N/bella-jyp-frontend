import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SignInForm } from "../sign-in-form";
import { SignInScreen } from "../sign-in-screen";

describe("SignInForm", () => {
  it("muestra mensajes cuando se envia sin credenciales", async () => {
    render(<SignInForm />);

    // verifica las reglas de zod antes de enviar el formulario.
    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

    expect(await screen.findByText("Ingresa tu numero de documento.")).toBeInTheDocument();
    expect(screen.getByText("Ingresa tu contrasena.")).toBeInTheDocument();
  });

  it("envia las credenciales validadas", async () => {
    const onSubmit = vi.fn();
    render(<SignInForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText("Tipo de documento"), { target: { value: "Pasaporte" } });
    fireEvent.change(screen.getByPlaceholderText("Numero de documento"), { target: { value: "AB123456" } });
    fireEvent.change(screen.getByLabelText("ContraseÃ±a"), { target: { value: "secreto" } });
    // envia las credenciales validas al callback.
    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

    // espera el envio asincrono para confirmar las credenciales recibidas.
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        documentType: "Pasaporte",
        documentNumber: "AB123456",
        password: "secreto",
      });
    });
  });

  it("permite mostrar y ocultar la contrasena", () => {
    render(<SignInForm />);

    const password = screen.getByLabelText("ContraseÃ±a");
    expect(password).toHaveAttribute("type", "password");

    // confirma el cambio de estado de visibilidad de la contrasena.
    fireEvent.click(screen.getByRole("button", { name: "Mostrar contraseÃ±a" }));
    expect(password).toHaveAttribute("type", "text");
  });
});



describe("SignInScreen", () => {
  it("muestra la pantalla de acceso", () => {
    render(<SignInScreen />);

    expect(screen.getByRole("heading", { name: "Bienvenido" })).toBeInTheDocument();
    expect(screen.getByText("Ingresa tus credenciales para continuar")).toBeInTheDocument();
  });
});





