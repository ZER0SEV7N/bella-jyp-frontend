import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ForgotPasswordDialog } from "../forgot-password-dialog";

describe("ForgotPasswordDialog", () => {
  it("abre el modal y valida el documento", async () => {
    render(<ForgotPasswordDialog />);

    fireEvent.click(screen.getByRole("button", { name: "¿Olvidaste tu contraseña?" }));

    expect(await screen.findByRole("heading", { name: "Recupera tu contraseña" })).toBeInTheDocument();

    // valida el documento antes de enviar la solicitud.
    fireEvent.click(screen.getByRole("button", { name: "Enviar solicitud" }));

    expect(await screen.findByText("Ingresa tu numero de documento.")).toBeInTheDocument();
  });

  it("muestra el aviso despues de enviar el documento", async () => {
    render(<ForgotPasswordDialog />);

    fireEvent.click(screen.getByRole("button", { name: "¿Olvidaste tu contraseña?" }));
    fireEvent.change(screen.getByPlaceholderText("Numero de documento"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Enviar solicitud" }));

    expect(await screen.findByText("Instrucciones enviadas")).toBeInTheDocument();
  });
});
