import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputField from "./inputField";

describe("InputField", () => {
  it("renders label and placeholder", () => {
    render(
      <InputField
        label="Nombre"
        name="name"
        type="text"
        placeholder="Nombre"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
  });

  it("calls onChange when the user types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <InputField
        label="Nombre"
        name="name"
        type="text"
        placeholder="Nombre"
        value=""
        onChange={handleChange}
      />
    );
    await user.type(screen.getByPlaceholderText("Nombre"), "a");
    expect(handleChange).toHaveBeenCalled();
  });

  it("does not render an error message when no error is provided", () => {
    render(
      <InputField
        label="Nombre"
        name="name"
        type="text"
        placeholder="Nombre"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.queryByText(/requerido/i)).not.toBeInTheDocument();
  });

  it("renders the error message when an error is provided", () => {
    render(
      <InputField
        label="Nombre"
        name="name"
        type="text"
        placeholder="Nombre"
        value=""
        onChange={() => {}}
        error="El nombre es requerido"
      />
    );
    expect(screen.getByText("El nombre es requerido")).toBeInTheDocument();
  });
});
