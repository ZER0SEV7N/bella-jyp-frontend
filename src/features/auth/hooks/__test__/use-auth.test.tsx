import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useAuth } from "../use-auth";

const mocks = vi.hoisted(() => ({ replace: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mocks.replace }),
}));

describe("useAuth", () => {
  it("redirige al dashboard del contador", () => {
    const { result } = renderHook(() => useAuth());

    // confirma que la redireccion no deja sign-in en el historial.
    result.current.redirectToDashboard();

    expect(mocks.replace).toHaveBeenCalledWith("/contador/dashboard");
  });
});

