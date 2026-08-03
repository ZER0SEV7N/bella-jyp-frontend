import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ForgotPasswordDialog } from "../forgot-password-dialog";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn() }),
}));

describe("ForgotPasswordDialog", () => {
  it("valida el documento con el contrato compartido", async () => {
    render(<ForgotPasswordDialog />);

    fireEvent.click(
      screen.getByRole("button", { name: "¿Olvidaste tu contraseña?" }),
    );
    fireEvent.click(
      await screen.findByRole("button", { name: "Enviar solicitud" }),
    );

    expect(
      await screen.findByText(/debe tener al menos 8 caracteres/),
    ).toBeInTheDocument();
  });

  it("envia el SolicitudRecuperacionDTO", async () => {
    const onSubmit = vi.fn();
    render(<ForgotPasswordDialog onSubmit={onSubmit} />);

    fireEvent.click(
      screen.getByRole("button", { name: "¿Olvidaste tu contraseña?" }),
    );
    fireEvent.change(screen.getByPlaceholderText("Numero de documento"), {
      target: { value: "ab123456" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Enviar solicitud" }),
    );

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        nro_documento: "AB123456",
      });
    });
    expect(
      await screen.findByText("Instrucciones enviadas"),
    ).toBeInTheDocument();
  });
});
