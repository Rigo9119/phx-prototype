import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateTransactionForm from "./createProyectForm";

async function fillValidCoreFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByPlaceholderText("ID del proyecto"), "TX-001");
  await user.type(screen.getByPlaceholderText("Deudor"), "Juan Perez");
  await user.type(screen.getByPlaceholderText("Acreedor"), "Ana Gomez");
  await user.type(screen.getByPlaceholderText("Capital"), "1000000");
  await user.type(screen.getByPlaceholderText("Cuota"), "50000");
  await user.type(screen.getByPlaceholderText("Descripción"), "Prestamo de capital de trabajo");
  await user.type(screen.getByPlaceholderText("Desembolso"), "2024-01-05");
  await user.type(screen.getByPlaceholderText("Fecha final"), "2025-01-05");
  await user.type(screen.getByPlaceholderText("Garantia"), "Hipoteca");
  await user.type(screen.getByPlaceholderText("Interes N.M.V"), "1.5");
  await user.type(screen.getByPlaceholderText("Pagare"), "PN-001");
  await user.type(screen.getByPlaceholderText("PLazo"), "12");
}

async function selectStatus(user: ReturnType<typeof userEvent.setup>, optionLabel: string) {
  await user.click(screen.getByRole("combobox"));
  await user.click(await screen.findByRole("option", { name: optionLabel }));
}

describe("CreateTransactionForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("blocks submit and shows an error when a required field is empty", async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<CreateTransactionForm />);

    await user.click(screen.getByRole("button", { name: /crear/i }));

    expect(await screen.findByText(/el id del proyecto es requerido/i)).toBeInTheDocument();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("blocks submit and shows an error when capital is not numeric", async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<CreateTransactionForm />);

    await fillValidCoreFields(user);
    await user.clear(screen.getByPlaceholderText("Capital"));
    await user.type(screen.getByPlaceholderText("Capital"), "not-a-number");
    await selectStatus(user, "Abierto");

    await user.click(screen.getByRole("button", { name: /crear/i }));

    expect(await screen.findByText(/el capital debe ser un valor numerico/i)).toBeInTheDocument();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("includes the selected status in the submitted values (bug #3)", async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<CreateTransactionForm />);

    await fillValidCoreFields(user);
    await selectStatus(user, "Cerrado");

    await user.click(screen.getByRole("button", { name: /crear/i }));

    await waitFor(() => expect(consoleSpy).toHaveBeenCalled());
    const call = consoleSpy.mock.calls.find((args) => args[0] === "create transaction: ");
    expect(call?.[1]?.status).toBe("closed");
  });
});
