import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useAuth } from "../use-auth";

const mocks = vi.hoisted(() => ({ replace: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mocks.replace }),
}));

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe("useAuth", () => {
  it("redirige al dashboard del contador", () => {
    const { result } = renderHook(() => useAuth());

    result.current.redirectToDashboard();

    expect(mocks.replace).toHaveBeenCalledWith("/contador/dashboard");
  });

  it("muestra el aviso y cierra el modal despues de enviar", async () => {
    vi.useFakeTimers();
    const onSubmit = vi.fn();
    const onClose = vi.fn();
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.requestForgotPassword(
        { nro_documento: "12345678" },
        onSubmit,
        onClose,
      );
    });

    expect(result.current.isForgotPasswordRequestSent).toBe(true);
    expect(onSubmit).toHaveBeenCalledWith({
      nro_documento: "12345678",
    });

    act(() => vi.advanceTimersByTime(3000));

    expect(onClose).toHaveBeenCalledOnce();
    expect(result.current.isForgotPasswordRequestSent).toBe(false);
  });
});
